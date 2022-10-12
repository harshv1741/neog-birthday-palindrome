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

function isLeapYear(year) {
  if (year % 400 === 0) return true;

  if (year % 100 === 0) return false;

  if (year % 4 === 0) return true;

  return false;
}
const getPreviousDate = (date) => {
  var day = date.day - 1;
  var month = date.month;
  var year = date.year;

  var daysInaMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (day === 0) month--;

  if (month === 0) {
    month = 12;
    day = 31;
    year--;
  } else if (month === 2) {
    if (isLeapYear(year)) day = 29;
    else day = 28;
  } else {
    day = daysInaMonth[month - 1];
  }

  return {
    day: day,
    month: month,
    year: year,
  };
};

const getNextDate = (date) => {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInaMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month == 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month = 3;
      }
    } else {
      if (day > 28) {
        day = 1;
        month = 3;
      }
    }
  } else {
    if (day > daysInaMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
};

const getPreviousPalindromeDate = (date) => {
  var previousDate = getPreviousDate(date);
  var daysCounter = 0;

  while (1) {
    daysCounter++;
    var strDate = stringDate(previousDate);
    var listResult = dateFormatList(strDate);

    for (let i = 0; i < listResult.length; i++) {
      if (listResult[i]) {
        return [ctr, previousDate];
      }
    }
    previousDate = getPreviousDate(previousDate);
  }
};
const getNextPalindromeDate = (date) => {
  var nextDate = getNextDate(date);
  var daysCounter = 0;

  while (1) {
    daysCounter++;
    var strDate = stringDate(nextDate);
    var listResult = dateFormatList(strDate);

    for (let i = 0; i < listResult.length; i++) {
      if (listResult[i]) {
        return [ctr, nextDate];
      }
    }
    nextDate = getNextDate(nextDate);
  }
};

const dateFormatList = (strDate) => {
  // full format
  var ddmmyyyy = strDate.day + strDate.month + strDate.year;
  console.log("ddmmyyyy: " + ddmmyyyy);
  var mmddyyyy = strDate.month + strDate.day + strDate.year;
  console.log("mmddyyyy: " + mmddyyyy);

  // half format
  var ddmmyy = strDate.day + strDate.month + strDate.year.slice(-2);
  console.log("ddmmyyyy: " + ddmmyy);
  var mmddyy = strDate.month + strDate.day + strDate.year.slice(-2);
  console.log("mmddyy: " + mmddyy);

  return [ddmmyyyy, mmddyyyy, ddmmyy, mmddyy];
};

const checkDateFormat = (strDate) => {
  const stringPalindromeChecker = (str) => {
    var reverseDate = str.split("").reverse().join("");
    return str === reverseDate;
  };

  var dFL = dateFormatList(strDate);
  var palindromeDateList = [];

  for (let i = 0; i < dFL.length; i++) {
    var result = stringPalindromeChecker(dFL[i]);
    palindromeDateList.push(result);
  }

  return palindromeDateList;
};

// Converting date to string
const stringDate = (date) => {
  var dateInString = { year: "", month: "", day: "" };

  if (date.day < 10) dateInString.day = "0" + date.day;
  else dateInString.day = date.day.toString();

  if (date.month < 10) dateInString.date = "0" + date.month;
  else dateInString.month = date.month.toString();

  dateInString.year = date.year.toString();

  return dateInString;
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
      day: Number(dd),
    };

    // console.log("Date: " + date.day + " Type: " + typeof date.day);
    // console.log("Month " + date.month + " Type: " + typeof date.month);
    // console.log("Year " + date.year + " Type: " + typeof date.year);

    var strDate = stringDate(date);
    // console.log("Date: " + strDate.day + " Type: " + typeof strDate.day);
    // console.log("Month " + strDate.month + " Type: " + typeof strDate.month);
    // console.log("Year " + strDate.year + " Type: " + typeof strDate.year);

    var list = checkDateFormat(strDate);
    console.log("List: " + list + " Type: " + typeof list);
    var isPalindrome = false;

    for (let i = 0; i < list.length; i++) {
      if (list[i]) {
        isPalindrome = true;
        break;
      }
    }
    if (!isPalindrome) {
      const [daysCounter1, nextDate] = getNextPalindromeDate(date);
      const [daysCounter2, previousDate] = getPreviousPalindromeDate(date);
      if (daysCounter1 > daysCounter2) {
        text = `Nearest Palindrome Date = ${previousDate.day}/${previousDate.month}/${previousDate.year}\n Missed by ${daysCounter2} days`;
        showMsg(text, "fail");
      }
      else {
        text = `Nearest Palindrome Date = ${nextDate.day}/${nextDate.month}/${nextDate.year}\n Missed by ${daysCounter1} `;
        showMsg(text, "fail");
      }
    }
    else {
      text = "Your birthday is palindrome!";
      showMsg(text, "success");
    }
  } else {
    showMsg("Please! select your date", "info");
  }
});

reset.addEventListener("click", () => {
  showMsg("", "reset");
});
