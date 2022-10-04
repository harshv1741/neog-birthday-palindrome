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

const isPalindrome = (date) => {
  plainDate = date.replaceAll("-", "");
  // console.log("plainDate: " + plainDate);
  reversedDate = plainDate.split("").reverse().join("");
  // console.log("reversedDate: " + reversedDate);
  if (plainDate === reversedDate) {
    text = "The date is palindrome.";
    showMsg(text, "success");
  } else {
    text = "The date is not palindrome.";
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
