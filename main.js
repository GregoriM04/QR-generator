// qr generation
const input = document.getElementById("user-input");
const qrResponse = document.getElementById("qr-response");
const generateButton = document.getElementById("generate-btn");

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
    setTimeout(() => {
      input.classList.remove("error");
      generateButton.classList.remove("error");
      generateButton.innerHTML = "Generate";
    }, 2000);
  } else {
    newQrCode();
    generateButton.classList.add("success");
    generateButton.innerHTML = "Done!";
    setTimeout(() => {
      generateButton.classList.remove("success");
      generateButton.innerHTML = "Generate";
    }, 2500);
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
