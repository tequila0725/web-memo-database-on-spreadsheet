document.addEventListener("DOMContentLoaded", function () {
  // 現在のタブのタイトルとURLを取得して表示
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs && tabs.length > 0) {
      const activeTab = tabs[0];
      document.getElementById("pageTitle").value = activeTab.title || "";
      document.getElementById("pageUrl").value = activeTab.url || "";
      console.log("タブ情報を取得しました:", { title: activeTab.title, url: activeTab.url });
    } else {
      console.error("アクティブなタブが見つかりませんでした");
      document.getElementById("pageTitle").placeholder = "タイトルを取得できませんでした";
      document.getElementById("pageUrl").placeholder = "URLを取得できませんでした";
    }
  });

  // 保存ボタンのクリックイベント
  document.getElementById("writeButton").addEventListener("click", function () {
    const title = document.getElementById("pageTitle").value;
    const url = document.getElementById("pageUrl").value;
    const tags = document.getElementById("pageTags").value;
    const notes = document.getElementById("pageNotes").value;
    console.log("保存をリクエストします:", { title, url, tags, notes });
    chrome.runtime.sendMessage({ action: "savePageInfo", title, url, tags, notes }, function (response) {
      if (chrome.runtime.lastError) {
        console.error("メッセージ送信エラー:", chrome.runtime.lastError);
        alert("保存に失敗しました");
      } else if (response && response.success) {
        console.log("保存に成功しました");
        alert("ページ情報を保存しました");
      } else {
        console.error("保存に失敗しました:", response.error);
        alert("保存に失敗しました");
      }
    });
  });
});
