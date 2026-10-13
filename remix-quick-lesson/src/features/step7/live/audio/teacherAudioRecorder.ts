import { saveRecording, SlideMarker } from './recordingStore';

export class TeacherAudioRecorder {
  private recorder: MediaRecorder | null = null;
  private stream: MediaStream | null = null;
  private parts: BlobPart[] = [];
  private markers: SlideMarker[] = [];
  private startedAt = 0;
  private lessonTitle = '';
  constructor(readonly sessionId: string) {}

  async start(lessonTitle: string, slideIndex: number, slideTitle: string) {
    if (this.isRecording) return;
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) throw new Error('Audio recording is not supported in this browser.');
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.lessonTitle = lessonTitle;
    this.parts = [];
    this.markers = [];
    this.startedAt = Date.now();
    this.markSlide(slideIndex, slideTitle);
    const type = ['audio/mpeg', 'audio/webm;codecs=opus', 'audio/webm', 'audio/mp4'].find((item) => MediaRecorder.isTypeSupported(item));
    this.recorder = new MediaRecorder(this.stream, type ? { mimeType: type } : undefined);
    this.recorder.ondataavailable = (event) => { if (event.data.size) this.parts.push(event.data); };
    this.recorder.onstop = () => void this.persist();
    this.recorder.start();
  }
  markSlide(slideIndex: number, slideTitle: string) {
    if (!this.isRecording) return;
    this.markers.push({ elapsedMs: Date.now() - this.startedAt, slideIndex, slideTitle });
  }
  stop() { if (this.isRecording) this.recorder?.stop(); }
  get isRecording() { return this.recorder?.state === 'recording'; }
  private async persist() {
    const blob = new Blob(this.parts, { type: this.recorder?.mimeType || 'audio/webm' });
    this.stream?.getTracks().forEach((track) => track.stop());
    this.stream = null;
    try {
      await saveRecording({ id: crypto.randomUUID(), sessionId: this.sessionId, lessonTitle: this.lessonTitle,
        createdAt: new Date().toISOString(), mimeType: blob.type, blob, markers: this.markers });
      window.dispatchEvent(new CustomEvent('teacher-audio-recording-saved', { detail: this.sessionId }));
    } catch (error) {
      window.dispatchEvent(new CustomEvent('teacher-audio-recording-error', { detail: error instanceof Error ? error.message : 'Could not save audio.' }));
    }
  }
}
