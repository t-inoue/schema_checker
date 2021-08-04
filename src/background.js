const parseString = (str) => {
  const regexp = /((h?)(ttps?:\/\/[a-zA-Z0-9.\-_@:/~?%&;=+#',()*!]+))/g;
  return str.match(regexp) ?? [];
};

const getStructuredDataTestingToolUrl = (url) => {
  return `https://search.google.com/structured-data/testing-tool/u/0/?hl=ja#url=${encodeURI(url)}`;
};

const getRichResultTestToolUrl = (url, isSmartPhone = true) => {
  return `https://search.google.com/test/rich-results?hl=ja&url=${encodeURI(url)}&user_agent=${isSmartPhone ? '1' : '2'}`;
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'SchemaChecker-root',
    title: '構造化データ検索',
    contexts: ['selection'],
  });
  chrome.contextMenus.create({
    id: 'SchemaChecker-child1',
    parentId: 'SchemaChecker-root',
    title: '構造化データテストツール',
    contexts: ['selection'],
  });
  chrome.contextMenus.create({
    id: 'SchemaChecker-child2',
    parentId: 'SchemaChecker-root',
    title: 'リッチリザルトテストツール',
    contexts: ['selection'],
  });
});

chrome.contextMenus.onClicked.addListener((item) => {
  const { selectionText, menuItemId } = item;
  parseString(selectionText || '').forEach((url) => {
    switch (menuItemId) {
      case 'SchemaChecker-child1':
        return chrome.tabs.create({ active: false, url: getStructuredDataTestingToolUrl(url) });
      case 'SchemaChecker-child2':
        return chrome.tabs.create({ active: false, url: getRichResultTestToolUrl(url) });
      default:
        return;
    }
  });
});
