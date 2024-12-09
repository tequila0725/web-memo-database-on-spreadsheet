async function loadEnvVars() {
  const response = await fetch(chrome.runtime.getURL(".env"));
  const text = await response.text();

  const envVars = {};
  text.split("\n").forEach((line) => {
    const [key, value] = line.split("=");
    if (key && value) {
      envVars[key.trim()] = value.trim();
    }
  });
  return envVars;
}

let API_KEY, SPREADSHEET_ID, SPREADSHEET_TAB_NAME, CLIENT_ID;

loadEnvVars().then((envVars) => {
  API_KEY = envVars.API_KEY;
  SPREADSHEET_ID = envVars.SPREADSHEET_ID;
  SPREADSHEET_TAB_NAME = envVars.SPREADSHEET_TAB_NAME;
  CLIENT_ID = envVars.CLIENT_ID;
});

const DISCOVERY_DOCS = [
  "https://sheets.googleapis.com/$discovery/rest?version=v4",
];

let cellValue = null;

function savePageInfo(title, url, tags, notes) {
  return new Promise((resolve, reject) => {
    chrome.identity.getAuthToken({ interactive: true }, function (token) {
      if (chrome.runtime.lastError) {
        console.error("Auth Token取得エラー:", chrome.runtime.lastError);
        reject(chrome.runtime.lastError);
        return;
      }

      fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SPREADSHEET_TAB_NAME}!A:D:append?valueInputOption=RAW`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            values: [[title, url, tags, notes]],
          }),
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("ページ情報を保存しました:", data);
          resolve(data);
        })
        .catch((error) => {
          console.error("ページ情報の保存中にエラーが発生しました:", error);
          reject(error);
        });
    });
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(`Received action: ${request.action} from ${sender.id}`);

  if (request.action === "savePageInfo") {
    savePageInfo(request.title, request.url, request.tags, request.notes)
      .then(() => sendResponse({ success: true }))
      .catch(() => sendResponse({ success: false }));
    return true;
  } else {
    console.error(`未知のアクション: ${request.action}`);
    sendResponse({ success: false, error: "未知のアクション" });
  }
});
