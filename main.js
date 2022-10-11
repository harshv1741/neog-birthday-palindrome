const dob = document.querySelector("#dob");
const check = document.querySelector("#submit");
const reset = document.querySelector("#reset");
const msg = document.querySelector("#output");

const showMsg = (text, sound_selector) => {
  const infoSE = document.querySelector("#infoSE");
  const failSE = document.querySelector("#failSE");
  const successSE = document.querySelector("#successSE");
  const resetSE = document.querySelector("#resetSE");

  switch (sound_selector) {
    case "info":
      msg.style.color = "blue";
      msg.innerText = text;
      infoSE.play();
      break;

    case "success":
      msg.style.color = "green";
      msg.innerText = text;
      successSE.play();
      break;

    case "fail":
      msg.style.color = "red";
      msg.innerText = text;
      failSE.play();
      break;

    case "reset":
      msg.innerText = "";
      resetSE.play();
      break;

    default:
      console.log("No Message");
      break;
  }
};

check.addEventListener("click", () => {
  var dateString = dob.value;
  if (dateString) {
    console.log("Date: " + dateString);
    showMsg("The text is now working", "info");
    var dateSplitter = dateString.split("-");
    var yyyy = dateSplitter[0];
    var mm = dateSplitter[1];
    var dd = dateSplitter[2];

    console.log("YYYY: " + yyyy + "\nMM: " + mm + "\nDD: " + dd);

    var date = {
      year: Number(yyyy),
      month: Number(mm),
      date: Number(dd),
    };

    console.log(typeof date.month);
  } else {
    showMsg("Please! select your date", "info");
  }
});

reset.addEventListener("click", () => {
  showMsg("", "reset");
});
