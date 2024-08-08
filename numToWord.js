const convertNum = (num) => {
  ones = {
    0: "",
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
    10: "ten",
    11: "eleven",
    12: "twelve",
    13: "thirteen",
    14: "fourteen",
    15: "fifteen",
    16: "sixteen",
    17: "seventeen",
    18: "eighteen",
    19: "nineteen",
  };
  multiples = {
    20: "twenty",
    30: "thirty",
    40: "forty",
    50: "fifty",
    60: "sixty",
    70: "seventy",
    80: "eighty",
    90: "ninety",
  };
  magnitude = {
    "000": "thousand",
    "000000": "million",
    "000000000": "billion",
    "000000000000": "trillion",
  };
  const convertTens = (tensVal) => {
    return tensVal + 0 < 0 ? "" : ones[tensVal];
  };
  const convertMultiples = (multiplesVal) => {
    if (multiplesVal.toString()[0] === "1") {
      return convertTens(multiplesVal); // handle teen numbers eg. 10, 11, 12...
    } else {
      return (
        multiples[Math.floor(multiplesVal / 10).toString() + "0"] +
        " " +
        (multiplesVal % 10 !== 0 ? ones[multiplesVal % 10] : "")
      );
    }
  };
  const convertHundreds = (hundredsVal) => {
    return (
      ones[Math.floor(hundredsVal / 100)] +
      " hundred " +
      (hundredsVal.toString()[1] !== "0"
        ? convertMultiples(Number(hundredsVal.toString().slice(1)))
        : convertTens(Number(hundredsVal.toString()[2])))
    );
  };

  let newnum = String(Number(num.replace(/^0+/, ""))); //remove any zeroes that might be at the beginning

  if (isNaN(newnum)) {
    return "Please type a number";
  }

  if (newnum < 20 && newnum.toString().length < 3) {
    return convertTens(newnum);
  }
  if (newnum < 100 && newnum.toString().length < 3) {
    return convertMultiples(newnum);
  }
  if (newnum < 1000) {
    return convertHundreds(newnum);
  }
  if (newnum < 1000000) {
    let thousand = "";
    let hundred = "";
    if (Math.floor(newnum / 1000).toString().length < 3) {
      thousand =
        Math.floor(newnum / 1000).toString().length === 2
          ? convertMultiples(Math.floor(newnum / 1000))
          : convertTens(Math.floor(newnum / 1000));
    } else {
      thousand = convertHundreds(Math.floor(newnum / 1000));
    }
    if ((newnum % 1000).toString().length < 3) {
      hundred =
        (newnum % 1000).toString().length === 2
          ? convertMultiples(newnum % 1000)
          : convertTens(newnum % 1000);
    } else {
      hundred = convertHundreds(newnum % 1000);
    }
    const suffixMap = new Map();

    suffixMap.set(thousand, " thousand, ");
    suffixMap.set(hundred, "");

    for (const key of suffixMap.keys()) {
      if (key === "") {
        suffixMap.delete(key);
      }
    }
    if (suffixMap.has(hundred)) {
      if ((newnum % 1000).toString().length < 3) {
        //check if hundred is less than three digits
        const fullWordsArray = Array.from(suffixMap); // convert suffixMap into an array
        const index = fullWordsArray.findIndex((array) => array[1] === "");
        let toEditIndex = fullWordsArray[index - 1];
        let editedIndex = toEditIndex[1].replace(",", " and"); // replace , with 'and' for any suffix that appears before hundred
        const indexToReplace = fullWordsArray.findIndex((innerArray) =>
          innerArray.every((value, index) => value === toEditIndex[index])
        );
        fullWordsArray[indexToReplace][1] = editedIndex; // replace the suffix in the original array with the modified one

        const stringArray = fullWordsArray.map((subarray) => subarray.join("")); // convert the array of arrays into an array of strings
        let result = stringArray.join(""); //converts the array of strings into one string
        return result[0].toUpperCase() + result.slice(1) + ".";
      }
      const fullWordsArray = Array.from(suffixMap);
      const stringArray = fullWordsArray.map((subarray) => subarray.join(""));
      let result = stringArray.join("");
      return result[0].toUpperCase() + result.slice(1) + "."; // handle the punctuation when hundred is three digits long
    }
  }

  if (newnum < 1000000000) {
    let million = "";
    let thousand = "";
    let hundred = "";
    if (Math.floor(newnum / 1000000).toString().length < 3) {
      million =
        Math.floor(newnum / 1000000).toString().length === 2
          ? convertMultiples(Math.floor(newnum / 1000000))
          : convertTens(Math.floor(newnum / 1000000));
    } else {
      million = convertHundreds(Math.floor(newnum / 1000000));
    }
    let remainder = newnum % 1000000;
    if (Math.floor(remainder / 1000).toString().length < 3) {
      thousand =
        Math.floor(remainder / 1000).toString().length === 2
          ? convertMultiples(Math.floor(remainder / 1000))
          : convertTens(Math.floor(remainder / 1000));
    } else {
      thousand = convertHundreds(Math.floor(remainder / 1000));
    }
    if ((remainder % 1000).toString().length < 3) {
      hundred =
        (remainder % 1000).toString().length === 2
          ? convertMultiples(remainder % 1000)
          : convertTens(remainder % 1000);
    } else {
      hundred = convertHundreds(remainder % 1000);
    }
    const suffixMap = new Map();

    suffixMap.set(million, " million, ");
    suffixMap.set(thousand, " thousand, ");
    suffixMap.set(hundred, "");

    for (const key of suffixMap.keys()) {
      if (key === "") {
        suffixMap.delete(key);
      }
    }
    if (suffixMap.has(hundred)) {
      if ((remainder % 1000).toString().length < 3) {
        //check if hundred is less than three digits
        const fullWordsArray = Array.from(suffixMap); // convert suffixMap into an array
        const index = fullWordsArray.findIndex((array) => array[1] === "");
        let toEditIndex = fullWordsArray[index - 1];
        let editedIndex = toEditIndex[1].replace(",", " and"); // replace , with 'and' for any suffix that appears before hundred
        const indexToReplace = fullWordsArray.findIndex((innerArray) =>
          innerArray.every((value, index) => value === toEditIndex[index])
        );
        fullWordsArray[indexToReplace][1] = editedIndex; // replace the suffix in the original array with the modified one

        const stringArray = fullWordsArray.map((subarray) => subarray.join("")); // convert the array of arrays into an array of strings
        let result = stringArray.join(""); //converts the array of strings into one string
        return result[0].toUpperCase() + result.slice(1) + ".";
      }
      const fullWordsArray = Array.from(suffixMap);
      const stringArray = fullWordsArray.map((subarray) => subarray.join(""));
      let result = stringArray.join("");
      return result[0].toUpperCase() + result.slice(1) + "."; // handle the punctuation when hundred is three digits long
    }
  }

  if (newnum < 1000000000000) {
    let billion = "";
    let million = "";
    let thousand = "";
    let hundred = "";
    if (Math.floor(newnum / 1000000000).toString().length < 3) {
      billion =
        Math.floor(newnum / 1000000000).toString().length === 2
          ? convertMultiples(Math.floor(newnum / 1000000000))
          : convertTens(Math.floor(newnum / 1000000000));
    } else {
      billion = convertHundreds(Math.floor(newnum / 1000000000));
    }
    let remainder = newnum % 1000000000;
    if (Math.floor(remainder / 1000000).toString().length < 3) {
      million =
        Math.floor(remainder / 1000000).toString().length === 2
          ? convertMultiples(Math.floor(remainder / 1000000))
          : convertTens(Math.floor(remainder / 1000000));
    } else {
      million = convertHundreds(Math.floor(remainder / 1000000));
    }
    let remainderB = remainder % 1000000;
    if (Math.floor(remainderB / 1000).toString().length < 3) {
      thousand =
        Math.floor(remainderB / 1000).toString().length === 2
          ? convertMultiples(Math.floor(remainderB / 1000))
          : convertTens(Math.floor(remainderB / 1000));
    } else {
      thousand = convertHundreds(Math.floor(remainderB / 1000));
    }
    if ((remainderB % 1000).toString().length < 3) {
      hundred =
        (remainderB % 1000).toString().length === 2
          ? convertMultiples(remainderB % 1000)
          : convertTens(remainderB % 1000);
    } else {
      hundred = convertHundreds(remainderB % 1000);
    }

    const suffixMap = new Map();

    suffixMap.set(billion, " billion, ");
    suffixMap.set(million, " million, ");
    suffixMap.set(thousand, " thousand, ");
    suffixMap.set(hundred, "");

    for (const key of suffixMap.keys()) {
      if (key === "") {
        suffixMap.delete(key);
      }
    }
    if (suffixMap.has(hundred)) {
      if ((remainderB % 1000).toString().length < 3) {
        //check if hundred is less than three digits
        const fullWordsArray = Array.from(suffixMap); // convert suffixMap into an array
        const index = fullWordsArray.findIndex((array) => array[1] === "");
        let toEditIndex = fullWordsArray[index - 1];
        let editedIndex = toEditIndex[1].replace(",", " and"); // replace , with 'and' for any suffix that appears before hundred
        const indexToReplace = fullWordsArray.findIndex((innerArray) =>
          innerArray.every((value, index) => value === toEditIndex[index])
        );
        fullWordsArray[indexToReplace][1] = editedIndex; // replace the suffix in the original array with the modified one

        const stringArray = fullWordsArray.map((subarray) => subarray.join("")); // convert the array of arrays into an array of strings
        let result = stringArray.join(""); //converts the array of strings into one string
        return result[0].toUpperCase() + result.slice(1) + ".";
      }
      const fullWordsArray = Array.from(suffixMap);
      const stringArray = fullWordsArray.map((subarray) => subarray.join(""));
      let result = stringArray.join("");
      return result[0].toUpperCase() + result.slice(1) + "."; // handle the punctuation when hundred is three digits long
    }
  }

  if (newnum < 1000000000000000) {
    let trillion = "";
    let billion = "";
    let million = "";
    let thousand = "";
    let hundred = "";

    if (Math.floor(newnum / 1000000000000).toString().length < 3) {
      trillion =
        Math.floor(newnum / 1000000000000).toString().length === 2
          ? convertMultiples(Math.floor(newnum / 1000000000000))
          : convertTens(Math.floor(newnum / 1000000000000));
    } else {
      trillion = convertHundreds(Math.floor(newnum / 1000000000000));
    }
    let remainder = newnum % 1000000000000;
    if (Math.floor(remainder / 1000000000).toString().length < 3) {
      billion =
        Math.floor(remainder / 1000000000).toString().length === 2
          ? convertMultiples(Math.floor(remainder / 1000000000))
          : convertTens(Math.floor(remainder / 1000000000));
    } else {
      billion = convertHundreds(Math.floor(remainder / 1000000000));
    }
    let remainderB = remainder % 1000000000;
    if (Math.floor(remainderB / 1000000).toString().length < 3) {
      million =
        Math.floor(remainderB / 1000000).toString().length === 2
          ? convertMultiples(Math.floor(remainderB / 1000000))
          : convertTens(Math.floor(remainderB / 1000000));
    } else {
      million = convertHundreds(Math.floor(remainderB / 1000000));
    }
    let remainderC = remainderB % 1000000;
    if (Math.floor(remainderC / 1000).toString().length < 3) {
      thousand =
        Math.floor(remainderC / 1000).toString().length === 2
          ? convertMultiples(Math.floor(remainderC / 1000))
          : convertTens(Math.floor(remainderC / 1000));
    } else {
      thousand = convertHundreds(Math.floor(remainderC / 1000));
    }
    if ((remainderC % 1000).toString().length < 3) {
      hundred =
        (remainderC % 1000).toString().length === 2
          ? convertMultiples(remainderC % 1000)
          : convertTens(remainderC % 1000);
    } else {
      hundred = convertHundreds(remainderC % 1000);
    }
    const suffixMap = new Map();

    suffixMap.set(trillion, " trillion, ");
    suffixMap.set(billion, " billion, ");
    suffixMap.set(million, " million, ");
    suffixMap.set(thousand, " thousand, ");
    suffixMap.set(hundred, "");

    for (const key of suffixMap.keys()) {
      if (key === "") {
        suffixMap.delete(key);
      }
    }
    if (suffixMap.has(hundred)) {
      if ((remainderC % 1000).toString().length < 3) {
        //check if hundred is less than three digits
        const fullWordsArray = Array.from(suffixMap); // convert suffixMap into an array
        const index = fullWordsArray.findIndex((array) => array[1] === "");
        let toEditIndex = fullWordsArray[index - 1];
        let editedIndex = toEditIndex[1].replace(",", " and"); // replace , with 'and' for any suffix that appears before hundred
        const indexToReplace = fullWordsArray.findIndex((innerArray) =>
          innerArray.every((value, index) => value === toEditIndex[index])
        );
        fullWordsArray[indexToReplace][1] = editedIndex; // replace the suffix in the original array with the modified one

        const stringArray = fullWordsArray.map((subarray) => subarray.join("")); // convert the array of arrays into an array of strings
        let result = stringArray.join(""); //converts the array of strings into one string
        return result[0].toUpperCase() + result.slice(1) + ".";
      }
      const fullWordsArray = Array.from(suffixMap);
      const stringArray = fullWordsArray.map((subarray) => subarray.join(""));
      let result = stringArray.join("");
      return result[0].toUpperCase() + result.slice(1) + "."; // handle the punctuation when hundred is three digits long
    }
  }
};

let rawNum;

document.getElementById("submitBtn").onclick = function () {
  rawNum = document.getElementById("rawNum").value;
  document.getElementById("convertNum").textContent = convertNum(rawNum);
};

document.getElementById("resetBtn").onclick = function () {
  window.location.href = window.location.href;
};
