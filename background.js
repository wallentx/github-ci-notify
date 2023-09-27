console.log("Background script loaded");

let tabIdForNotification = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  tabIdForNotification = sender.tab.id;

  if (message.action === 'allChecksComplete') {
    chrome.notifications.create('completeNotification', {
      type: 'basic',
      iconUrl: 'icon.png',
      title: 'CI Checks Complete',
      message: 'All CI checks for the GitHub pull request are complete!'
    });
  } else if (message.action === 'someChecksFailed') {
    chrome.notifications.create('failedNotification', {
      type: 'basic',
      iconUrl: 'iconFailed.png',
      title: 'CI Checks Complete',
      message: 'All CI checks for the GitHub pull request are complete, but some failed.'
    });
  }
});

chrome.notifications.onClicked.addListener((notificationId) => {
  if (notificationId === 'completeNotification' || notificationId === 'failedNotification') {
    // Focus the tab that sent the notification
    chrome.tabs.update(tabIdForNotification, { active: true });
  }
});
