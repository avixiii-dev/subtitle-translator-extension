document.addEventListener('DOMContentLoaded', function() {
  const startButton = document.getElementById('startTranslate');
  const languageSelect = document.getElementById('targetLanguage');
  const statusDiv = document.getElementById('status');

  startButton.addEventListener('click', async () => {
    const targetLanguage = languageSelect.value;
    
    // Update status
    statusDiv.style.display = 'block';
    statusDiv.className = 'processing';
    statusDiv.textContent = 'Processing...';

    try {
      // Send message to content script
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      await chrome.tabs.sendMessage(tab.id, {
        action: 'startTranslation',
        targetLanguage: targetLanguage
      });

      // Update status to success
      statusDiv.className = 'completed';
      statusDiv.textContent = 'Translation started!';
    } catch (error) {
      // Update status to error
      statusDiv.className = 'error';
      statusDiv.textContent = 'Error: ' + error.message;
    }
  });
});
