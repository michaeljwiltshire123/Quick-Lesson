class GlobalAudioManager {
  public audioCtx: AudioContext | null = null;
  public stream: MediaStream | null = null;
  public analyser: AnalyserNode | null = null;
  public isConnected = false;
  public isBlocked = false;
  public currentVolume = 0;
  private frameId = 0;
  private generation = 0;
  private listeners: Set<(vol: number) => void> = new Set();
  private statusListeners: Set<(connected: boolean, blocked: boolean) => void> = new Set();

  public async initialize() {
    if (this.isConnected && this.audioCtx?.state === 'running') return;
    const generation = this.generation;
    try {
      if (!this.stream) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        if (generation !== this.generation) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }
        this.stream = stream;
      }
      if (!this.audioCtx) {
        this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (this.audioCtx.state === 'suspended') {
        await this.audioCtx.resume();
      }
      if (generation !== this.generation) return;
      if (!this.analyser && this.stream && this.audioCtx) {
        const source = this.audioCtx.createMediaStreamSource(this.stream);
        this.analyser = this.audioCtx.createAnalyser();
        this.analyser.fftSize = 512;
        this.analyser.smoothingTimeConstant = 0.2;
        source.connect(this.analyser);
        this.startProcessing();
      }
      this.isConnected = true;
      this.isBlocked = false;
      this.notifyStatus();
    } catch {
      if (generation !== this.generation) return;
      this.isConnected = false;
      this.isBlocked = true;
      this.notifyStatus();
    }
  }

  private startProcessing() {
    if (!this.analyser) return;
    const timeData = new Uint8Array(this.analyser.fftSize);
    const loop = () => {
      if (!this.analyser) return;
      if (this.analyser) {
        this.analyser.getByteTimeDomainData(timeData);
        let sumSquares = 0;
        for (let i = 0; i < timeData.length; i++) {
          const norm = (timeData[i] - 128) / 128;
          sumSquares += norm * norm;
        }
        const rms = Math.sqrt(sumSquares / timeData.length);
        this.currentVolume = Math.min(100, Math.round(rms * 450));
        this.listeners.forEach((fn) => fn(this.currentVolume));
      }
      this.frameId = requestAnimationFrame(loop);
    };
    loop();
  }

  public shutdown() {
    this.generation += 1;
    if (this.frameId) cancelAnimationFrame(this.frameId);
    this.frameId = 0;
    this.stream?.getTracks().forEach((track) => track.stop());
    this.stream = null;
    this.analyser = null;
    if (this.audioCtx) void this.audioCtx.close();
    this.audioCtx = null;
    this.isConnected = false;
    this.currentVolume = 0;
    this.notifyStatus();
    this.listeners.forEach((fn) => fn(0));
  }

  private notifyStatus() {
    this.statusListeners.forEach((fn) => fn(this.isConnected, this.isBlocked));
  }

  public subscribe(fn: (vol: number) => void) {
    this.listeners.add(fn);
    return () => { this.listeners.delete(fn); };
  }

  public subscribeStatus(fn: (connected: boolean, blocked: boolean) => void) {
    this.statusListeners.add(fn);
    fn(this.isConnected, this.isBlocked);
    return () => { this.statusListeners.delete(fn); };
  }
}

export const globalAudio = new GlobalAudioManager();
