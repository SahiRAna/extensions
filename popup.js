document.addEventListener('DOMContentLoaded', function () {
  const getInfoBtn = document.getElementById('getInfoBtn');
  const titleElement = document.getElementById('title');
  const bodyElement = document.body;

  if (getInfoBtn) {
    getInfoBtn.addEventListener('click', function () {
      // Get the current active tab
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const activeTab = tabs[0];

        // Fetch the tab title
        const tabTitle = activeTab.title;
        titleElement.textContent = `Title: ${tabTitle}`;
////------////----
        // Fetch the background color of the active tab's webpage
        chrome.scripting.executeScript({
          target: { tabId: activeTab.id },
          func: () => getComputedStyle(document.body).backgroundColor
        }, (results) => {
          if (results && results[0]) {
            const bgColor = results[0].result;
            // Apply the fetched background color to the extension's popup
            bodyElement.style.backgroundColor = bgColor;
          }
        });
      });
    });
  }
});
