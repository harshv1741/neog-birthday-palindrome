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

const dateFormat = (date) => {
  var splitDate = {
    year: "",
    month: "",
    date: "",
  };
  plainDate = date.replaceAll("-", "");
  console.log("plain date: " + plainDate);
  splitDateArray = plainDate.split("");
  console.log("split array: " + splitDateArray);

  for (let i = 0; i < splitDateArray.length; i++) {
    if (i === 0 || i <= 3) {
      splitDate.year += splitDateArray[i];
    } else if (i === 4 || i <= 5) {
      splitDate.month += splitDateArray[i];
    } else if (i === 6 || i <= 7) {
      splitDate.date += splitDateArray[i];
    }
  }

  // console.log("Date: " + splitDate.date);
  // console.log("Month: " + splitDate.month);
  // console.log("Year: " + splitDate.year);

  const dd_mm_yyyy =
    splitDate.date + "/" + splitDate.month + "/" + splitDate.year;
  console.log(dd_mm_yyyy);
  console.log(typeof dd_mm_yyyy);

  return dd_mm_yyyy;
};

const isPalindrome = (date) => {
  plainDate = date.replaceAll("-", "");
  // console.log("plainDate: " + plainDate);
  reversedDate = plainDate.split("").reverse().join("");
  // console.log("reversedDate: " + reversedDate);
  formatedDate = dateFormat(date);
  if (plainDate === reversedDate) {
    text = formatedDate + " is a palindrome date.";
    showMsg(text, "success");
  } else {
    text = formatedDate + " is not a palindrome date.";
    showMsg(text, "fail");
  }
};

check.addEventListener("click", () => {
  date = dob.value;
  if (date) {
    console.log(date);
    isPalindrome(date);
  } else {
    showMsg("Please! select your date", "info");
  }
});

reset.addEventListener("click", () => {
  showMsg("", "reset");
});
