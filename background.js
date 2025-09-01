// This script runs in the background to decide when to show the widget.

// Function to check if a URL matches any of the saved patterns
const checkUrlAgainstPatterns = (url, patterns) => {
  if (!patterns || !Array.isArray(patterns)) return false;
  // Use .some() to see if at least one pattern matches
  return patterns.some(pattern => url.includes(pattern));
};

// Listen for when a tab is updated (e.g., new page loaded)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Ensure the page is fully loaded and has a URL
  if (changeInfo.status === 'complete' && tab.url && (tab.url.startsWith('http:') || tab.url.startsWith('https:'))) {
    
    // Get the list of approved websites from storage
    chrome.storage.sync.get(['allowedSites'], (result) => {
      const patterns = result.allowedSites || [];
      
      // If the current URL matches a pattern, inject the content scripts
      if (checkUrlAgainstPatterns(tab.url, patterns)) {
        
        // Inject CSS for the widget
        chrome.scripting.insertCSS({
          target: { tabId: tabId },
          files: ['style.css']
        });
        
        // Inject the JavaScript files
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ['filler.js', 'content.js']
        });
      }
    });
  }
});

// Open settings when the extension icon is clicked
chrome.action.onClicked.addListener((tab) => {
    chrome.runtime.openOptionsPage();
});
