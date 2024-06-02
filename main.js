// qr generation
const input = document.getElementById("user-input");
const qrResponse = document.getElementById("qr-response");
const generateButton = document.getElementById("generate-btn");
const downloadButton = document.getElementById("download-btn");
const success = document.getElementById("success");

function newQrCode() {
  qrResponse.src =
    "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" +
    input.value;
}

function mainProcess() {
  if (input.value == "" || input.value == " ") {
    generateButton.classList.add("error");
    input.classList.add("error");
    generateButton.innerHTML = "Not valid!";
    eraseQrResponse();
    setTimeout(() => {
      input.classList.remove("error");
      generateButton.classList.remove("error");
      generateButton.innerHTML = "Generate";
    }, 1500);
  } else {
    generateButton.classList.add("blink");
    setTimeout(() => {
      newQrCode();
      generateButton.classList.remove("blink");
      success.classList.add("showUp");
      input.classList.add("success-color");
    }, 2000);
    checkIfActive();
    setTimeout(() => {
      success.classList.remove("showUp");
      input.classList.remove("success-color");
    }, 5000);
  }
}

// run the mainProcess function when hit Generate button and Enter key
generateButton.addEventListener("click", mainProcess);
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    mainProcess();
  }
});

// download functionality
const qrURL =
  "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" +
  input.value;

// function fetchURL(url) {
//   fetch(url).then((res) =>
//     res.blob().then((image) => {
//       let tempUrl = URL.createObjectURL(image);
//       let aTag = document.createElement("a");
//       aTag.href = tempUrl;
//       aTag.download = "qr";
//       document.body.appendChild(aTag);
//       aTag.click();
//       aTag.remove();
//     })
//   );
// }

function downloadQr(url) {
  let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function(){
        let urlCreator = window.URL || window.webkitURL;
        let imageUrl = urlCreator.createObjectURL(this.response);
        let tag = document.createElement('a');
        tag.href = imageUrl;
        tag.download = 'qr';
        document.body.appendChild(tag);
        tag.click();
        document.body.removeChild(tag);
    }
    xhr.send();
}

downloadButton.addEventListener("click", (e) => {
  e.preventDefault();
  downloadQr(qrURL);
});

// check if download button has 'active' attribute
function checkIfActive() {
  if (downloadButton.hasAttribute("active")) {
    downloadButton.classList.remove("active");
  }
  setTimeout(() => {
    downloadButton.classList.add("active");
  }, 3000);
}

//erase generated QR if next input is empty
function eraseQrResponse() {
  qrResponse.src = "";
  downloadButton.classList.remove("active");
}
