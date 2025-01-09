// 2. background.js
chrome.runtime.onInstalled.addListener(() => {
  console.log("Productivity Tracker installed.");
  chrome.storage.sync.set({ goals: [], usageData: {} });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    const url = new URL(tab.url);
    const domain = url.hostname;

    chrome.storage.sync.get(["usageData"], ({ usageData }) => {
      const currentDate = new Date().toISOString().split("T")[0];
      if (!usageData[currentDate]) usageData[currentDate] = {};
      if (!usageData[currentDate][domain]) usageData[currentDate][domain] = 0;

      usageData[currentDate][domain] += 1; // Increment time spent (in seconds)
      chrome.storage.sync.set({ usageData });
    });
  }
});
