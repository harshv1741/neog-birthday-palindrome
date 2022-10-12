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

// Checks is string in palindrome
isStringPalindrome = (str) => {
  var reversedString = str.split("").reverse().join("");
  return str === reversedString;
};

// Returns String Date
convertDatetoString = (date) => {
  var strDate = { day: "", month: "", year: "" };

  if (date.day < 10) {
    strDate.day = "0" + date.day;
  } else {
    strDate.day = date.day.toString();
  }

  if (date.month < 10) {
    strDate.month = "0" + date.month;
  } else {
    strDate.month = date.month.toString();
  }

  strDate.year = date.year.toString();
  return strDate;
};

// All Date Formats
checkDateFormat = (date) => {
  var ddmmyyyy = date.day + date.month + date.year;
  var mmddyyyy = date.month + date.day + date.year;
  var yyyymmdd = date.year + date.month + date.day;
  var ddmmyy = date.day + date.month + date.year.slice(-2);
  var mmddyy = date.month + date.day + date.year.slice(-2);
  var yyddmm = date.year.slice(-2) + date.day + date.month;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
};

// The main Palindrome Checker
checkPalindrome = (date) => {
  var dateFormatList = checkDateFormat(date);
  var palindromeList = [];

  for (var i = 0; i < dateFormatList.length; i++) {
    var result = isStringPalindrome(dateFormatList[i]);
    palindromeList.push(result);
  }
  return palindromeList;
};

// Checks for leap year
isLeapYear = (year) => {
  if (year % 400 === 0) return true;

  if (year % 100 === 0) return false;

  if (year % 4 === 0) return true;

  return false;
};

// Returns Next Date
getNextDate = (date) => {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
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
    if (day > daysInMonth[month - 1]) {
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
}

// Returns next palindrome date
getNextPalindromeDate = (date) => {
  var nextDate = getNextDate(date);
  var dayCounter = 0;

  while (1) {
    dayCounter++;
    var dateStr = convertDatetoString(nextDate);
    var resultList = checkPalindrome(dateStr);

    for (let i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        return [dayCounter, nextDate];
      }
    }
    nextDate = getNextDate(nextDate);
  }
};

// Returns previous date from selected
getPreviousDate = (date) => {
  var day = date.day - 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (day === 0) {
    month--;

    if (month === 0) {
      month = 12;
      day = 31;
      year--;
    } else if (month === 2) {
      if (isLeapYear(year)) {
        day = 29;
      } else {
        day = 28;
      }
    } else {
      day = daysInMonth[month - 1];
    }
  }

  return {
    day: day,
    month: month,
    year: year,
  };
};

// Returns previous palindrome date
getPreviousPalindromeDate = (date) => {
  var previousDate = getPreviousDate(date);
  var dayCounter = 0;

  while (1) {
    dayCounter++;
    var dateStr = convertDatetoString(previousDate);
    var resultList = checkPalindrome(dateStr);

    for (let i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        return [dayCounter, previousDate];
      }
    }
    previousDate = getPreviousDate(previousDate);
  }
};

// Submit Button Function
check.addEventListener("click", () => {
  var dateString = dob.value;
  if (dateString !== "") {
    console.log("Date: " + dateString);
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

    var strDate = convertDatetoString(date);
    var list = checkPalindrome(strDate);
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
      } else {
        text = `Nearest Palindrome Date = ${nextDate.day}/${nextDate.month}/${nextDate.year}\n Missed by ${daysCounter1} days`;
        showMsg(text, "fail");
      }
    } else {
      text = "Your birthday is palindrome!";
      showMsg(text, "success");
    }
  } else {
    showMsg("Please! select your date", "info");
  }
});

// Reset button function
reset.addEventListener("click", () => {
  showMsg("", "reset");
});