# Video Subtitle Translator Chrome Extension

This Chrome Extension automatically translates video subtitles in real-time using AI technology.

## Features

- Extract audio from video elements on web pages
- Convert speech to text using AI
- Translate subtitles to multiple languages
- Display synchronized subtitles over videos
- Support for popular video platforms

## Installation

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension directory

## Usage

1. Navigate to a webpage with a video
2. Click the extension icon in your Chrome toolbar
3. Select your desired target language from the dropdown
4. Click "Start Translation" to begin
5. Wait for the subtitles to appear on the video

## Configuration

To use this extension, you'll need to:

1. Set up API keys for OpenAI (or Google Cloud) services
2. Add your API keys to the extension settings (coming soon)

## Technical Notes

- The extension uses the MediaRecorder API to capture audio
- Speech-to-text conversion uses OpenAI's Whisper API
- Translation is handled by ChatGPT API
- Subtitles are synchronized using video.currentTime

## Known Limitations

- Currently works best with single video elements
- Processing time depends on video length and API response time
- Requires active internet connection

## Contributing

Feel free to submit issues and enhancement requests!
