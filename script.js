let numItem = document.querySelectorAll(".number-item");
let optItem = document.querySelectorAll(".item-red");
let iptCalcKecil = document.querySelector(".result-input-kecil");
let iptCalcBesar = document.querySelector(".result-input-besar");
let removeAllItem = document.querySelector(".remove-all-item");
let removeOneItem = document.querySelector(".remove-one-item");
let resultItem = document.querySelector(".result-item");

function calculateStr(fn) {
  return new Function("return " + fn)();
}

function resetIptVal() {
  iptCalcBesar.value = "0";
  iptCalcKecil.value = "0";
}

numItem.forEach((m) => {
  m.addEventListener("click", function () {
    iptNum = m.dataset.value;
    if (iptCalcKecil.value == "0") {
      iptCalcKecil.value = "";
    }

    iptCalcKecil.value += iptNum;

    if (
      iptCalcKecil.value == "00" ||
      iptCalcKecil.value == "000"
    ) {
      iptCalcKecil.value = "0";
    }
  });
});

function iptPersen() {
  iptCalcKecil.value = calculateStr(iptCalcKecil.value);
  iptCalcBesar.value = calculateStr(iptCalcKecil.value);
}

optItem.forEach((m) => {
  let opt = m.dataset.value;

  m.addEventListener("click", function () {
    const optReg = /[+*\/-]/g;
    let matchWithOpt = iptCalcKecil.value.match(optReg);

    if (matchWithOpt == null) {
      iptCalcKecil.value += opt;
      if (iptCalcKecil.value.match("/100")) {
        iptPersen();
        DisplayRiwayatCode();
      }
    } else {
      if (iptCalcKecil.value.slice(-1).match(optReg)) {
        let removeIptOpt = iptCalcKecil.value
          .split("")
          .reverse()
          .join("")
          .substr(1, iptCalcKecil.value.length);

        iptCalcKecil.value = removeIptOpt
          .split("")
          .reverse()
          .join("");

        iptCalcKecil.value += opt;

        if (iptCalcKecil.value.match("/100")) {
          iptPersen();
          DisplayRiwayatCode();
          matchWithOpt = null;
        }
        matchWithOpt = null;
      } else {
        iptCalcKecil.value += opt;
        if (iptCalcKecil.value.match("/100")) {
          iptPersen();
          DisplayRiwayatCode();
          matchWithOpt = null;
        }
        matchWithOpt = null;
      }
    }
  });
});

removeAllItem.addEventListener("click", function () {
  resetIptVal();
  
});


const iptCalcArr = [];

function riwayatCode(i) {
  return `<div class="riwayat-kalkulator">
                ${iptCalcArr[i]?.iptKecil} = ${iptCalcArr[i]?.iptBesar}
            </div>`;
}

function DisplayRiwayatCode() {
  addRiwayat();

  let bodyRiwayat = document.querySelector(".body-riwayat");
  let riwayatCodes = "";

  if (bodyRiwayat.innerHTML == "Belum Ada Riwayat") {
    bodyRiwayat.innerHTML = "";
  }

  for (let i = 0; i < iptCalcArr.length; i++) {
    riwayatCodes += riwayatCode(i).trim();
  }

  bodyRiwayat.innerHTML = riwayatCodes;

  let riwayatKalkulator = document.querySelectorAll(".riwayat-kalkulator");

  riwayatKalkulator.forEach((m) => {
    m.addEventListener("click", function () {
      let riwayatKalkulatorSplit = m.innerHTML.split(" = ");
      let riwayatContainer = document.querySelector(".riwayat-container");
      let riwayatBox = document.querySelector(".riwayat-box");

      iptCalcKecil.value = riwayatKalkulatorSplit[0].trim();
      iptCalcBesar.value = riwayatKalkulatorSplit[1].trim();

      riwayatContainer.style.opacity = "0";
      riwayatContainer.style.visibility = "hidden";
      riwayatBox.style.right = "-300px";
    });
  });
}

function addRiwayat() {
  iptCalcArr.push({
    iptKecil: iptCalcKecil.value,
    iptBesar: iptCalcBesar.value,
  });
}

resultItem.addEventListener("click", function () {
  const iptOutput = iptCalcKecil.value;
  const optReg = /[+*\/-]/g;

  if (iptOutput.slice(-1).match(optReg)) {
    let errorText = `ERROR\n${iptOutput}?\nPERSAMAAN TIDAK LENGKAP !`;

    alert(errorText);
    resetIptVal();
  } else {
    let result = calculateStr(iptOutput);
    iptCalcBesar.value = result;
  }

  DisplayRiwayatCode();
});


  iptCalcBesar.select();
  iptCalcBesar.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(iptCalcBesar.value);

let riwayatContainer = document.querySelector(".riwayat-container");
let riwayatBox = document.querySelector(".riwayat-box");

function closeSidebar() {
  riwayatContainer.style.opacity = "0";
  riwayatContainer.style.visibility = "hidden";
  riwayatBox.style.right = "-300px";
}


document.querySelector(".close-riwayat").addEventListener("click", function () {
  closeSidebar();
});

document.querySelector(".btn-trash").addEventListener("click", function () {
  let bodyRiwayat = document.querySelector(".body-riwayat");
  if (bodyRiwayat.innerHTML == "Belum Ada Riwayat") {
    bodyRiwayat.innerHTML = "Belum Ada Riwayat";
  } else {
    bodyRiwayat.innerHTML = "";
    bodyRiwayat.innerHTML = "Belum Ada Riwayat";
    closeSidebar();
  }
});

riwayatContainer.addEventListener("click", function (e) {
  if (e.target.classList.value == "riwayat-container") {
    closeSidebar();
  }
});
