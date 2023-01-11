const container = document.querySelector(".container");
const userInput = document.getElementById("userInput");
const submitBtn = document.getElementById("submit");
const downloadBtn = document.getElementById("download");
const sizeOptions = document.querySelector(".sizeOptions");
const BGColor = document.getElementById("BGColor");
const FGColor = document.getElementById("FGColor");
let QR_Code;
let sizeChoice, BGColorChoice, FGColorChoice;
BGColor.value = BGColorChoice = "#ebebeb";
FGColor.value = FGColorChoice = "#817e8a";

// Sizing
sizeOptions.addEventListener("change", () => {
  sizeChoice = sizeOptions.value;
});

// Background color of QR Code
BGColor.addEventListener("input", () => {
  BGColorChoice = BGColor.value;
});

// Foreground color of QR Code
FGColor.addEventListener("input", () => {
  FGColorChoice = FGColor.value;
});

// Input
const inputFormatter = (value) => {
  value = value.replace(/[^a-z0-9A-Z]+/g, "");
  return value;
};

submitBtn.addEventListener("click", async () => {
  container.innerHTML = "";
  //QR code genertion
  QR_Code = await new QRCode(container, {
    text: userInput.value,
    width: sizeChoice,
    height: sizeChoice,
    colorDark: FGColorChoice,
    colorLight: BGColorChoice,
  });

  // Url for download
  const src = container.firstChild.toDataURL("image/pmg");
  downloadBtn.href = src;
  let userValue = userInput.value;
  try {
    userValue = new URL(userValue).hostname;
  } catch (_) {
    userValue = inputFormatter(userValue);
    downloadBtn.download = `${userValue}QR`;
    downloadBtn.classList.remove("hide");
  }
});

userInput.addEventListener("input", () => {
  if (userInput.value.trim().length < 1) {
    submitBtn.disabled = true;
    downloadBtn.href = "";
    downloadBtn.classList.add("hide");
  } else {
    submitBtn.disabled = false;
  }
});

function hideElement() {
  const hiddenElement = document.getElementById("container");
  const showButton = document.getElementById("submit");

  // initially hide the element
  hiddenElement.style.display = "none";

  showButton.addEventListener("click", function() {
    hiddenElement.style.display = "block";
  });
}

window.onload = () => {
  window.onload = hideElement();
  container.innerHTML = "";
  sizeChoice = 150;
  sizeOptions.value = 150;
  userInput.value = "";
  BGColor.value = BGColorChoice = "#ebebeb";
  FGColor.value = FGColorChoice = "#817e8a";
  downloadBtn.classList.add("hide");
  submitBtn.disabled = true;
};



document.getElementById("userInput").addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.key === 'Enter') {
      document.getElementById("submit").click();
  }
});


