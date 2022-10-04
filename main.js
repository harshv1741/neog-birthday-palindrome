const dob = document.querySelector("#dob");

const check = document.querySelector("#submit");
const reset = document.querySelector("#reset");
const msg = document.querySelector("#output");

const isPalindrome = (date) => {
  plainDate = date.replaceAll("-", "");
  //   console.log("plainDate: " + plainDate);
  reversedDate = plainDate.split("").reverse().join("");
  //   console.log("reversedDate: " + reversedDate);
  if (plainDate === reversedDate) {
    msg.innerText = "Palindrome";
  } else {
    msg.innerText = "notPalindrome";
  }
};

check.addEventListener("click", () => {
  date = dob.value;
  console.log(date);
  isPalindrome(date);
});

reset.addEventListener("click", () => {
  msg.innerText = "";
});
