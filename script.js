let scanner = null;
let lastScan = "";


/* =========================
   CAMERA SCANNER
========================= */

function startScanner() {

  if (scanner) {
    scanner.clear().catch(() => {});
  }

  scanner = new Html5Qrcode("reader");

  document.getElementById("status").textContent =
    "📷 Starting camera...";

  scanner.start(
    { facingMode: "environment" },

    {
      fps: 10,
      qrbox: {
        width: 250,
        height: 250
      }
    },

    function (decodedText) {

      if (decodedText === lastScan) {
        return;
      }

      lastScan = decodedText;

      stopScanner();

      analyzeQR(decodedText);
    },

    function () {
      // Continuous scan errors ignored.
    }

  ).then(() => {

    document.getElementById("status").textContent =
      "Point the camera at a QR code.";

  }).catch(() => {

    document.getElementById("status").textContent =
      "Camera permission is required.";

  });
}


/* =========================
   STOP CAMERA
========================= */

function stopScanner() {

  if (!scanner) {
    return;
  }

  scanner.stop().catch(() => {});
}


/* =========================
   IMAGE QR SCANNER
========================= */

document
  .getElementById("file")
  .addEventListener("change", async function (event) {

    const file = event.target.files[0];

    if (!file) {
      return;
    }

    try {

      const imageScanner =
        new Html5Qrcode("reader");

      const decoded =
        await imageScanner.scanFile(file, true);

      analyzeQR(decoded);

      imageScanner.clear();

    } catch (error) {

      document.getElementById("status").textContent =
        "❌ No readable QR code found.";

    }

  });


/* =========================
   QR ANALYSIS
========================= */

function analyzeQR(payload) {

  document.getElementById("result").style.display =
    "block";

  document.getElementById("rawPayload").textContent =
    payload;


  let type = "Text";
  let provider = "Not encoded";
  let bank = "Not encoded";
  let merchant = "Not encoded";
  let amount = "Not encoded";
  let currency = "Not encoded";
  let reference = "Not encoded";
  let country = "Not encoded";

  let risk = 10;


  /* URL detection */

  if (/^https?:\/\//i.test(payload)) {

    type = "Website / Payment URL";

    const httpsStatus =
      document.getElementById("httpsStatus");

    if (payload.startsWith("https://")) {

      httpsStatus.textContent = "HTTPS ✓";
      httpsStatus.className = "value safe";

    } else {

      httpsStatus.textContent =
        "HTTP — Review";

      httpsStatus.className =
        "value warning";

      risk += 25;
    }
  }


  /* Payment payload parsing */

  try {

    const queryPart =
      payload.includes("?")
        ? payload.split("?")[1]
        : payload;

    const params =
      new URLSearchParams(queryPart);


    if (params.has("provider"))
      provider = params.get("provider");

    if (params.has("bank"))
      bank = params.get("bank");

    if (params.has("merchant"))
      merchant = params.get("merchant");

    if (params.has("amount"))
      amount = params.get("amount");

    if (params.has("currency"))
      currency = params.get("currency");

    if (params.has("ref"))
      reference = params.get("ref");

    if (params.has("country"))
      country = params.get("country");


    if (
      payload.toLowerCase().includes("payment")
    ) {
      type = "Payment QR";
    }

  } catch (error) {
    console.log("Payload parsing skipped.");
  }


  /* Suspicious keyword detection */

  const suspicious =
    /urgent|verify|password|login|claim|free|gift|wallet|otp/i
      .test(payload);


  if (suspicious) {

    risk += 45;

    const riskStatus =
      document.getElementById("riskStatus");

    riskStatus.textContent =
      "Review Required";

    riskStatus.className =
      "value warning";

  } else {

    const riskStatus =
      document.getElementById("riskStatus");

    riskStatus.textContent =
      "Low";

    riskStatus.className =
      "value safe";
  }


  if (risk > 100) {
    risk = 100;
  }


  /* Risk display */

  const riskScore =
    document.getElementById("riskScore");

  const riskLabel =
    document.getElementById("riskLabel");


  riskScore.textContent =
    risk + "/100";


  if (risk >= 70) {

    riskLabel.textContent =
      "HIGH RISK";

    riskScore.style.color =
      "#ff737e";

    riskLabel.style.color =
      "#ff737e";

  } else if (risk >= 40) {

    riskLabel.textContent =
      "REVIEW";

    riskScore.style.color =
      "#f0b336";

    riskLabel.style.color =
      "#f0b336";

  } else {

    riskLabel.textContent =
      "LOW RISK";

    riskScore.style.color =
      "#24e084";

    riskLabel.style.color =
      "#24e084";
  }


  /* Update result cards */

  document.getElementById("qrType").textContent =
    type;

  document.getElementById("provider").textContent =
    provider;

  document.getElementById("bank").textContent =
    bank;

  document.getElementById("merchant").textContent =
    merchant;

  document.getElementById("amount").textContent =
    amount;

  document.getElementById("currency").textContent =
    currency;

  document.getElementById("reference").textContent =
    reference;

  document.getElementById("country").textContent =
    country;


  /* Scroll to result */

  document.getElementById("result").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}


/* =========================
   GENERATE REPORT
========================= */

function generateReport() {

  const payload =
    document.getElementById("rawPayload").textContent;


  if (
    !payload ||
    payload === "Waiting for scan..."
  ) {

    alert("Scan a QR code first.");

    return;
  }


  window.location.href =
    "report.html?type=qr&data=" +
    encodeURIComponent(payload);
}
