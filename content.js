let notifiedForCompletion = false;

function checkCIStatus() {
  const ciStatusElements = document.querySelectorAll('.merge-status-item');
  
  if (ciStatusElements.length === 0) {
    return;
  }

  let allChecksComplete = true;
  let allChecksPassed = true;

  ciStatusElements.forEach((element) => {
    const inProgress = element.querySelector('svg.anim-rotate');
    const completed = element.querySelector('svg.octicon-check.color-fg-success');

    if (inProgress) {
      allChecksComplete = false;
      notifiedForCompletion = false;
    }

    if (completed === null) {
      allChecksPassed = false;
    }
  });

  if (allChecksComplete && allChecksPassed && !notifiedForCompletion) {
    console.log("All checks complete and passed. Sending message to background.");
    chrome.runtime.sendMessage({action: "allChecksComplete"});
    notifiedForCompletion = true;
  } else if (allChecksComplete && !allChecksPassed && !notifiedForCompletion) {
    console.log("All checks complete but some failed. Sending message to background.");
    chrome.runtime.sendMessage({action: "someChecksFailed"});
    notifiedForCompletion = true;
}

setInterval(checkCIStatus, 5000);
