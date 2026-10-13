export class TeacherAudioRecorder {
  private recorder: MediaRecorder | null = null;
  private stream: MediaStream | null = null;
  constructor(private onRecording: (blob: Blob) => void) {}

  async start() {
    if (this.recorder?.state === 'recording') return;
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
      throw new Error('Audio recording is not supported in this browser.');
    }
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.recorder = new MediaRecorder(this.stream);
    const parts: BlobPart[] = [];
    this.recorder.ondataavailable = (event) => { if (event.data.size) parts.push(event.data); };
    this.recorder.onstop = () => {
      this.onRecording(new Blob(parts, { type: this.recorder?.mimeType || 'audio/webm' }));
      this.stream?.getTracks().forEach((track) => track.stop());
      this.stream = null;
    };
    this.recorder.start();
  }

  stop() { if (this.recorder?.state === 'recording') this.recorder.stop(); }
  get isRecording() { return this.recorder?.state === 'recording'; }
}
