// Centralized Audio Manager for Desktop Background Music & Coffee Modal Music
// Guarantees strict mutual exclusion, safe audio promise handling, position memory, and zero memory leaks.

export interface CoffeeTrackInfo {
  id: string;
  title: string;
  artist: string;
  fileCandidates: string[];
  isMain?: boolean;
  notes: number[];
}

const baseUrl = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : import.meta.env.BASE_URL + '/';

export const COFFEE_TRACKS: CoffeeTrackInfo[] = [
  {
    id: 'track-1',
    title: 'Трек 1 • Кофейная пауза',
    artist: 'public/track1.mp3',
    fileCandidates: [`${baseUrl}track1.mp3`],
    isMain: true,
    notes: [130.81, 164.81, 196.00, 246.94],
  },
  {
    id: 'track-2',
    title: 'Трек 2 • Уютный Дзэн',
    artist: 'public/track2.mp3',
    fileCandidates: [`${baseUrl}track2.mp3`],
    isMain: false,
    notes: [174.61, 220.00, 261.63, 329.63],
  },
  {
    id: 'track-3',
    title: 'Трек 3 • Глубокая Концентрация',
    artist: 'Synthesized Chill Ambient',
    fileCandidates: [`${baseUrl}track1.mp3`, `${baseUrl}track2.mp3`], // Fallback gracefully if separate file absent
    isMain: false,
    notes: [110.00, 164.81, 220.00, 277.18],
  },
  {
    id: 'track-4',
    title: 'Трек 4 • Атмосферный Эмбиент',
    artist: 'Synthesized Warm Ambient',
    fileCandidates: [`${baseUrl}track2.mp3`, `${baseUrl}track1.mp3`], // Fallback gracefully
    isMain: false,
    notes: [146.83, 185.00, 220.00, 293.66],
  },
];

const BG_CANDIDATES = [`${baseUrl}music.mp3`];

class SafeAudioPlayer {
  private audio: HTMLAudioElement | null = null;
  private playPromise: Promise<void> | null = null;
  private isPendingPause = false;
  private currentSrc = '';

  public isPlaying = false;
  public isMuted = false;

  public loadAndPlay(
    candidates: string[],
    options: { loop?: boolean; muted?: boolean; candidateIdx?: number },
    onFallbackSynth?: () => void,
    onEnded?: () => void
  ): void {
    const candidateIdx = options.candidateIdx || 0;
    if (candidateIdx >= candidates.length) {
      this.stop();
      if (onFallbackSynth) {
        onFallbackSynth();
      }
      return;
    }

    const src = candidates[candidateIdx];
    this.isPendingPause = false;

    // Reuse existing HTMLAudioElement if same src
    if (!this.audio || this.currentSrc !== src) {
      if (this.audio) {
        this.audio.pause();
        this.audio.onended = null;
        this.audio.onerror = null;
        this.audio.src = '';
      }
      this.audio = new Audio(src);
      this.currentSrc = src;
    }

    this.audio.loop = !!options.loop;
    this.audio.muted = !!options.muted;

    if (onEnded) {
      this.audio.onended = onEnded;
    }

    const promise = this.audio.play();
    if (promise !== undefined) {
      this.playPromise = promise;
      promise
        .then(() => {
          this.playPromise = null;
          if (this.isPendingPause) {
            this.audio?.pause();
            this.isPendingPause = false;
            this.isPlaying = false;
          } else {
            this.isPlaying = true;
          }
        })
        .catch(() => {
          this.playPromise = null;
          this.isPendingPause = false;
          this.isPlaying = false;
          // Try next candidate or fallback
          this.loadAndPlay(candidates, { ...options, candidateIdx: candidateIdx + 1 }, onFallbackSynth, onEnded);
        });
    } else {
      this.isPlaying = true;
    }
  }

  public resume(): Promise<boolean> {
    if (!this.audio) return Promise.resolve(false);
    this.isPendingPause = false;
    this.audio.muted = this.isMuted;
    
    const promise = this.audio.play();
    if (promise !== undefined) {
      this.playPromise = promise;
      return promise
        .then(() => {
          this.playPromise = null;
          if (this.isPendingPause) {
            this.audio?.pause();
            this.isPendingPause = false;
            this.isPlaying = false;
            return false;
          } else {
            this.isPlaying = true;
            return true;
          }
        })
        .catch(() => {
          this.playPromise = null;
          this.isPendingPause = false;
          this.isPlaying = false;
          return false;
        });
    } else {
      this.isPlaying = true;
      return Promise.resolve(true);
    }
  }

  public pause(): void {
    this.isPlaying = false;
    if (this.playPromise) {
      this.isPendingPause = true;
    } else if (this.audio) {
      this.audio.pause();
    }
  }

  public stop(): void {
    this.isPlaying = false;
    if (this.playPromise) {
      this.isPendingPause = true;
    } else if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (this.audio) {
      this.audio.muted = muted;
    }
  }

  public hasAudio(): boolean {
    return !!this.audio && this.currentSrc !== '';
  }
}

export class AudioManagerService {
  private static instance: AudioManagerService;

  // Background Music State
  public bgPlaying = false;
  public bgUserWantsPlaying = true;
  public bgMuted = false;
  private bgWasPlayingBeforeModal = false;

  // Coffee Modal State
  public coffeeModalOpen = false;
  public coffeePlaying = false;
  public coffeeMuted = false;
  public coffeeTrackIndex = 0;

  // Audio Players
  private bgPlayer = new SafeAudioPlayer();
  private coffeePlayer = new SafeAudioPlayer();

  // Web Audio Synthesizer Fallbacks
  private bgAudioCtx: AudioContext | null = null;
  private bgGainNode: GainNode | null = null;
  private bgOscNodes: OscillatorNode[] = [];

  private coffeeAudioCtx: AudioContext | null = null;
  private coffeeGainNode: GainNode | null = null;
  private coffeeOscNodes: OscillatorNode[] = [];

  // Listeners
  private listeners: Set<() => void> = new Set();
  private isInitialized = false;

  private constructor() {}

  public static getInstance(): AudioManagerService {
    if (!AudioManagerService.instance) {
      AudioManagerService.instance = new AudioManagerService();
    }
    return AudioManagerService.instance;
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    this.listeners.forEach(l => l());
  }

  public initUserGestureHandler(): void {
    if (this.isInitialized) return;
    this.isInitialized = true;

    // Handle tab visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (this.bgPlaying) {
          this.bgPlayer.pause();
          if (this.bgAudioCtx && this.bgAudioCtx.state === 'running') {
            this.bgAudioCtx.suspend();
          }
        }
        if (this.coffeePlaying) {
          this.coffeePlayer.pause();
          if (this.coffeeAudioCtx && this.coffeeAudioCtx.state === 'running') {
            this.coffeeAudioCtx.suspend();
          }
        }
      } else {
        if (this.coffeeModalOpen && this.coffeePlaying) {
          if (this.coffeeAudioCtx && this.coffeeAudioCtx.state === 'suspended') {
            this.coffeeAudioCtx.resume();
          } else {
            this.coffeePlayer.resume();
          }
        } else if (!this.coffeeModalOpen && this.bgUserWantsPlaying) {
          if (this.bgAudioCtx && this.bgAudioCtx.state === 'suspended') {
            this.bgAudioCtx.resume();
          } else if (this.bgPlaying) {
            this.bgPlayer.resume();
          }
        }
      }
    });

    // Attempt initial autoplay
    this.playBgMusic();

    const handleFirstGesture = () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);

      // Resume AudioContexts if suspended
      if (this.bgAudioCtx && this.bgAudioCtx.state === 'suspended') {
        this.bgAudioCtx.resume();
      }
      if (this.coffeeAudioCtx && this.coffeeAudioCtx.state === 'suspended') {
        this.coffeeAudioCtx.resume();
      }

      // If background music wants to play but isn't actually playing in audio element/synth
      if (!this.coffeeModalOpen && this.bgUserWantsPlaying) {
        if (!this.bgPlayer.isPlaying && this.bgOscNodes.length === 0) {
          this.playBgMusic();
        } else if (this.bgPlayer.hasAudio() && !this.bgPlayer.isPlaying) {
          this.bgPlayer.resume().then((success) => {
            if (!success) {
              this.playBgMusic();
            }
          });
        }
      }
    };

    window.addEventListener('click', handleFirstGesture, { passive: true });
    window.addEventListener('keydown', handleFirstGesture, { passive: true });
    window.addEventListener('touchstart', handleFirstGesture, { passive: true });
  }

  // --- BACKGROUND MUSIC METHODS ---

  public playBgMusic(): void {
    if (this.coffeeModalOpen) {
      return;
    }

    this.stopCoffeeSynth();
    this.coffeePlayer.pause();
    this.coffeePlaying = false;

    this.bgUserWantsPlaying = true;

    if (this.bgPlayer.hasAudio()) {
      this.bgPlayer.resume().then((success) => {
        if (success) {
          this.bgPlaying = true;
        } else {
          // If resume failed, reload candidates or synth
          this.bgPlayer.loadAndPlay(
            BG_CANDIDATES,
            { loop: true, muted: this.bgMuted },
            () => this.playBgSynthFallback(),
            undefined
          );
          this.bgPlaying = true;
        }
        this.notify();
      });
    } else {
      this.bgPlayer.loadAndPlay(
        BG_CANDIDATES,
        { loop: true, muted: this.bgMuted },
        () => this.playBgSynthFallback(),
        undefined
      );
      this.bgPlaying = true;
      this.notify();
    }
  }

  public pauseBgMusic(): void {
    this.bgPlayer.pause();
    this.stopBgSynth();
    this.bgPlaying = false;
    this.notify();
  }

  public toggleBgMusic(): void {
    if (this.bgPlaying) {
      this.bgUserWantsPlaying = false;
      this.bgWasPlayingBeforeModal = false;
      this.pauseBgMusic();
    } else {
      this.playBgMusic();
    }
  }

  public toggleBgMute(): void {
    this.bgMuted = !this.bgMuted;
    this.bgPlayer.setMuted(this.bgMuted);
    if (this.bgGainNode && this.bgAudioCtx) {
      this.bgGainNode.gain.setValueAtTime(this.bgMuted ? 0 : 0.08, this.bgAudioCtx.currentTime);
    }
    this.notify();
  }

  // --- COFFEE MODAL MUSIC METHODS ---

  public openCoffeeModal(): void {
    this.coffeeModalOpen = true;
    this.bgWasPlayingBeforeModal = this.bgPlaying;

    // Automatically pause background music without resetting bgUserWantsPlaying
    this.pauseBgMusic();

    // Start coffee track 0
    this.playCoffeeTrack(0);
  }

  public closeCoffeeModal(): void {
    this.coffeeModalOpen = false;

    // Stop coffee music completely
    this.coffeePlayer.stop();
    this.stopCoffeeSynth();
    this.coffeePlaying = false;

    // If background music was playing before opening the modal AND user didn't disable it manually, resume it!
    if (this.bgWasPlayingBeforeModal && this.bgUserWantsPlaying) {
      this.playBgMusic();
    }

    this.bgWasPlayingBeforeModal = false;
    this.notify();
  }

  public playCoffeeTrack(index: number): void {
    this.coffeeTrackIndex = index;
    const track = COFFEE_TRACKS[index] || COFFEE_TRACKS[0];

    // Pause bg music strictly
    this.pauseBgMusic();

    this.coffeePlayer.loadAndPlay(
      track.fileCandidates,
      { loop: false, muted: this.coffeeMuted },
      () => this.playCoffeeSynthFallback(track),
      () => {
        // Auto-play next track in Coffee Modal on ended
        const nextIndex = (this.coffeeTrackIndex + 1) % COFFEE_TRACKS.length;
        this.playCoffeeTrack(nextIndex);
      }
    );

    this.coffeePlaying = true;
    this.notify();
  }

  public pauseCoffeeMusic(): void {
    this.coffeePlayer.pause();
    this.stopCoffeeSynth();
    this.coffeePlaying = false;
    this.notify();
  }

  public toggleCoffeeMusic(): void {
    if (this.coffeePlaying) {
      this.pauseCoffeeMusic();
    } else {
      if (this.coffeePlayer.hasAudio()) {
        this.pauseBgMusic();
        this.coffeePlayer.resume().then((success) => {
          if (success) {
            this.coffeePlaying = true;
          } else {
            this.playCoffeeTrack(this.coffeeTrackIndex);
          }
          this.notify();
        });
      } else {
        this.playCoffeeTrack(this.coffeeTrackIndex);
      }
    }
  }

  public toggleCoffeeMute(): void {
    this.coffeeMuted = !this.coffeeMuted;
    this.coffeePlayer.setMuted(this.coffeeMuted);
    if (this.coffeeGainNode && this.coffeeAudioCtx) {
      this.coffeeGainNode.gain.setValueAtTime(this.coffeeMuted ? 0 : 0.12, this.coffeeAudioCtx.currentTime);
    }
    this.notify();
  }

  // --- SYNTHESIZER FALLBACKS (Web Audio API) ---

  private playBgSynthFallback(): void {
    this.stopBgSynth();
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      this.bgAudioCtx = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(this.bgMuted ? 0 : 0.08, ctx.currentTime);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, ctx.currentTime);

      masterGain.connect(filter);
      filter.connect(ctx.destination);
      this.bgGainNode = masterGain;

      const freqs = [110.00, 164.81, 196.00, 246.94]; // A2, E3, G3, B3
      const oscillators = freqs.map(freq => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(0.2, ctx.currentTime);

        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.1 + Math.random() * 0.15, ctx.currentTime);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(0.04, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(oscGain.gain);
        lfo.start();

        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();
        return osc;
      });

      this.bgOscNodes = oscillators;
      this.bgPlaying = true;
      this.notify();
    } catch (e) {
      console.warn('BG Synth fallback failed:', e);
    }
  }

  private stopBgSynth(): void {
    this.bgOscNodes.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {
        // ignore
      }
    });
    this.bgOscNodes = [];
    if (this.bgAudioCtx && this.bgAudioCtx.state !== 'closed') {
      this.bgAudioCtx.close();
      this.bgAudioCtx = null;
    }
  }

  private playCoffeeSynthFallback(track: CoffeeTrackInfo): void {
    this.stopCoffeeSynth();
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      this.coffeeAudioCtx = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(this.coffeeMuted ? 0 : 0.12, ctx.currentTime);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, ctx.currentTime);

      masterGain.connect(filter);
      filter.connect(ctx.destination);
      this.coffeeGainNode = masterGain;

      const oscillators = track.notes.map(freq => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(0.25, ctx.currentTime);

        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.1 + Math.random() * 0.2, ctx.currentTime);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(0.05, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(oscGain.gain);
        lfo.start();

        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();
        return osc;
      });

      this.coffeeOscNodes = oscillators;
      this.coffeePlaying = true;
      this.notify();
    } catch (e) {
      console.warn('Coffee Synth fallback failed:', e);
    }
  }

  private stopCoffeeSynth(): void {
    this.coffeeOscNodes.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {
        // ignore
      }
    });
    this.coffeeOscNodes = [];
    if (this.coffeeAudioCtx && this.coffeeAudioCtx.state !== 'closed') {
      this.coffeeAudioCtx.close();
      this.coffeeAudioCtx = null;
    }
  }
}

export const audioManager = AudioManagerService.getInstance();

