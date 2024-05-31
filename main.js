// qr generation
const input = document.getElementById("user-input");
const qrResponse = document.getElementById("qr-response");
const generateButton = document.getElementById("generate-btn");
const downloadButton = document.getElementById("download-btn");

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
    newQrCode();
    generateButton.classList.add("success");
    generateButton.innerHTML = "Done!";
    setTimeout(() => {
      generateButton.classList.remove("success");
      generateButton.innerHTML = "Generate";
    }, 2000);
    checkIfActive();
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

function fetchURL(url) {
  fetch(url).then((res) =>
    res.blob().then((image) => {
      let tempUrl = URL.createObjectURL(image);
      let aTag = document.createElement("a");
      aTag.href = tempUrl;
      aTag.download = "qr";
      document.body.appendChild(aTag);
      aTag.click();
      aTag.remove();
    })
  );
}

downloadButton.addEventListener("click", (e) => {
  e.preventDefault();
  fetchURL(qrURL);
});

// check if download button has 'active' attribute
function checkIfActive() {
  if (downloadButton.hasAttribute("active")) {
    downloadButton.classList.remove("active");
  }
  setTimeout(() => {
    downloadButton.classList.add("active");
  }, 2000);
}

//erase generated QR if next input is empty
function eraseQrResponse() {
  qrResponse.src = "";
  downloadButton.classList.remove("active");
}
