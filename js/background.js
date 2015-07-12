var menuClickHandler = function(info, tab) {
	var text = info.srcUrl || info.linkUrl || info.selectionText || info.pageUrl || "";
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		chrome.tabs.sendMessage(tabs[0].id, { "generate_qr": true, "text": text })
	});
};

chrome.contextMenus.create({
	"title": "Generate QR Code",
	"onclick": menuClickHandler,
	"contexts": [ "page", "frame", "editable", "browser_action", "page_action" ]
});
chrome.contextMenus.create({
	"title": "Generate QR Code from URL",
	"onclick": menuClickHandler,
	"contexts": [ "link", "image", "video", "audio" ]
});
chrome.contextMenus.create({
	"title": "Generate QR Code from Selection",
	"onclick": menuClickHandler,
	"contexts": [ "selection" ]
});