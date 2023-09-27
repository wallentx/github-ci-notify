console.log("Background script loaded");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'allChecksComplete') {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icon.png',
      title: 'CI Checks Complete',
      message: 'All CI checks for the GitHub pull request are complete and passed!'
    });
  } else if (message.action === 'someChecksFailed') {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'iconFail.png',
      title: 'CI Checks Complete',
      message: 'All CI checks for the GitHub pull request are complete, but some failed.'
    });
  }
});
