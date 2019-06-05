var  services = {
  0: {
    "name":"Birth Declarations",
    "letter":"B",
    "color":"#734396",
  },
  1: {
    "name":"Civil Unions",
    "letter":"U",
    "color":"#6ebeb9",
  },
  2: {
    "name":"Divorces",
    "letter":"D",
    "color":"#ed868c",
  },
  3: {
    "name":"ID Card",
    "letter":"L",
    "color":"#76b12c",
  },
  4: {
    "name":"Certificates",
    "letter":"C",
    "color":"#e26d22",
  },
  5: {
    "name":"Electoral Card",
    "letter":"E",
    "color":"#723c2c",
  },
  6: {
    "name":"Emigration",
    "letter":"M",
    "color":"#107db6",
  },
  7: {
    "name":"Citizenships",
    "letter":"T",
    "color":"#ae2956",
  },
  8: {
    "name":"Address Change",
    "letter":"A",
    "color":"#e8aa15",
  },
}

function bodyOnLoad() {
  var randomTicket = Math.floor(Math.random() * (6-124) + 124);
  var randomQueue = Math.floor(Math.random() * (3-42) + 42);
  var randomService = Math.floor(Math.random() * (8-0) + 0);
  // var serviceSel = 8;

   document.body.style.backgroundColor = services[randomService].color;
   document.getElementById("num").innerHTML=services[randomService].letter+randomTicket;
   document.getElementById("ticketType").innerHTML=services[randomService].name.toUpperCase();
   document.getElementById("ticketRemaining").innerHTML=randomQueue+" people remaining";
}
