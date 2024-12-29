class SubtitleTranslator {
  constructor() {
    this.subtitles = [];
    this.currentVideo = null;
    this.subtitleOverlay = null;
    this.mediaRecorder = null;
    this.audioChunks = [];
  }

  initialize(video) {
    this.currentVideo = video;
    this.createSubtitleOverlay();
    this.setupVideoEventListeners();
  }

  createSubtitleOverlay() {
    this.subtitleOverlay = document.createElement('div');
    this.subtitleOverlay.className = 'subtitle-overlay';
    this.currentVideo.parentElement.appendChild(this.subtitleOverlay);
  }

  setupVideoEventListeners() {
    this.currentVideo.addEventListener('timeupdate', () => {
      this.updateSubtitles(this.currentVideo.currentTime);
    });
  }

  async startRecording() {
    try {
      const stream = this.currentVideo.captureStream();
      const audioTrack = stream.getAudioTracks()[0];
      
      if (!audioTrack) {
        throw new Error('No audio track found in video');
      }

      const mediaStream = new MediaStream([audioTrack]);
      this.mediaRecorder = new MediaRecorder(mediaStream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        await this.processAudio(audioBlob);
      };

      this.mediaRecorder.start();
    } catch (error) {
      console.error('Error starting recording:', error);
      throw error;
    }
  }

  async processAudio(audioBlob) {
    // TODO: Implement API calls to Whisper and ChatGPT/Google
    // This is a placeholder for the actual API implementation
    console.log('Processing audio...');
    
    // Simulate API response
    this.subtitles = [
      { start: 0, end: 5, text: "Sample subtitle 1" },
      { start: 5, end: 10, text: "Sample subtitle 2" },
    ];
  }

  updateSubtitles(currentTime) {
    const currentSubtitle = this.subtitles.find(
      sub => currentTime >= sub.start && currentTime <= sub.end
    );

    if (currentSubtitle) {
      this.subtitleOverlay.textContent = currentSubtitle.text;
      this.subtitleOverlay.style.display = 'block';
    } else {
      this.subtitleOverlay.style.display = 'none';
    }
  }

  stop() {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }
  }
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'startTranslation') {
    const videos = document.getElementsByTagName('video');
    if (videos.length > 0) {
      const translator = new SubtitleTranslator();
      translator.initialize(videos[0]);
      translator.startRecording()
        .catch(error => console.error('Failed to start translation:', error));
    }
  }
});
