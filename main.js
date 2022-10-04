const dob = document.querySelector("#dob");

const check = document.querySelector("#submit");
const reset = document.querySelector("#reset");
const msg = document.querySelector("#output");

check.addEventListener("click", () => {
  date = dob.value;
  msg.innerText = date;
});

reset.addEventListener("click", () => {
  msg.innerText = "";
});
