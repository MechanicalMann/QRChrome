// Create the elements on the page
var overlay = document.createElement("div");
overlay.id = "__qr_code_overlay";
overlay.className = "qrchrome-overlay";
overlay.style.display = "none";

var content = document.createElement("div");
content.id = "__qr_code_content";
content.className = "qrchrome-content";
overlay.appendChild(content);

var loader = document.createElement("div");
loader.id = "__qr_code_loader";
loader.className = "qrchrome-loader";
loader.style.display = "none";
content.appendChild(loader);

var image = document.createElement("div");
image.id = "__qr_code";
image.className = "qrchrome-code";
image.style.display = "none";
content.appendChild(image);

document.body.appendChild(overlay);

var hideOverlay = function (ev) {
	overlay.style.display = "none";
	image.style.display = "none";
	loader.style.display = "none";
};

// Close the overlay on click
overlay.addEventListener("click", hideOverlay);

// Instantiate QRCode.js
var qrCode = new QRCode(image, {
	width: 256,
	height: 256
});

// Add our message listener
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (!request.generate_qr)
		return;
	if (!request.text || request.text == "") {
		console.log("You must select some text or use this extension within a page with a URL.");
		return;
	}
	
	// Show the overlay and loading spinner.
	overlay.style.display = "block";
	loader.style.display = "block";
	
	// Generate the QR code.
	try	{
		qrCode.makeCode(request.text);
	} catch (err) {
		console.log(err);
		hideOverlay();
		alert("An error occurred and the QR code could not be generated.", "Error");
	}
	
	// Show the code
	loader.style.display = "none";
	image.style.display = "block";
});