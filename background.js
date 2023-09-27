console.log("Background script loaded");  // This should appear in the background script's Developer Tools console

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'allChecksComplete') {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icon.png',
      title: 'CI Checks Complete',
      message: 'All CI checks for the GitHub pull request are complete!'
    });
  }
});

