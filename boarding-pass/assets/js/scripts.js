fetch("./database.json")
  .then((response) => response.json())
  .then((data) => localStorage.setItem("voo-data", JSON.stringify(data.voo)));

function generateQR(str) {
  let qrCodeImage = document.getElementById("qr-code");

  qrCodeImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${str}`;
}

function callData() {
  const data = JSON.parse(localStorage.getItem("voo-data"));
  const paragraphs = [...document.querySelectorAll(".ticket__paragraph")];
  const span1 = document.createElement("span");
  const span2 = document.createElement("span");
  const span3 = document.createElement("span");
  const span4 = document.createElement("span");

  let voo = data[Math.round(Math.random() * 2)];

  paragraphs[1].innerText = voo.id;
  paragraphs[3].innerText = voo.data;
  paragraphs[4].innerText = voo.boarding;
  paragraphs[7].innerText = voo.destiny;
  paragraphs[5].innerText = voo.boardingAcronym;
  paragraphs[8].innerText = voo.destinyAcronym;
  paragraphs[6].innerText = voo.exit;
  paragraphs[9].innerHTML = voo.arrival;
  span1.className = "ticket__span--styles1";
  span1.innerText = voo.timeZone;
  paragraphs[9].append(span1);
  paragraphs[11].innerText = voo.passenger;
  paragraphs[13].innerText = voo.seat;
  span2.className = "ticket__span--styles2";
  span2.innerText = voo.boardingTime;
  paragraphs[15].append(span2);
  paragraphs[17].innerText = voo.terminal;
  paragraphs[19].innerText = voo.gate;
  span3.innerText = voo.boardingGroup;
  paragraphs[20].append(span3);
  span4.innerText = voo.closedGate;
  paragraphs[21].append(span4);

  generateQR(JSON.stringify(voo));
}

callData();
