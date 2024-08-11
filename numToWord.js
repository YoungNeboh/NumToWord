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

    let words = [thousand, hundred];
    let suffixes = [" thousand, ", ""];

    let indicesToRemove = []; //an array to store the indice of elements that are empty (only have 000)
    for (let word in words) {
      if (words[word] === "") {
        indicesToRemove.push(word);
      }
    }
    let sorted = indicesToRemove.sort((a, b) => b - a);
    //sort the indicesToRemove array in reverse so that removing the indices from words does not cause clashes due to rearranging index
    for (let index of sorted) {
      words.splice(Number(index), 1); //remove any empty value from the array
      suffixes.splice(Number(index), 1); // do the same to the suffixes array
    }
    if (words.includes(hundred)) {
      if ((newnum % 1000).toString().length < 3) {
        //check if hundred is less than three digits
        let hunIndex = words.indexOf(hundred);
        let toEditIndex = hunIndex - 1; //find the index of the element before hundred
        suffixes[toEditIndex] = suffixes[toEditIndex].replace(", ", " and "); //replace ',' with ' and ' for grammar
        const resultArray = []; //create array to hold the words and their suffixes
        for (i = 0; i < words.length; i++) {
          resultArray.push(words[i]);
          resultArray.push(suffixes[i]);
        }
        let result = resultArray.join(""); //join everything into one sentence
        return result[0].toUpperCase() + result.slice(1) + "."; //make first letter uppercase and add full stop
      }
    }
    let resultArray = []; //create array to hold the words and their suffixes
    for (i = 0; i < words.length; i++) {
      resultArray.push(words[i]);
      resultArray.push(suffixes[i]);
    }
    console.log(resultArray);
    resultArray[resultArray.length - 1] = resultArray[
      resultArray.length - 1
    ].replace(", ", ""); //replace ',' with empty string '' for the last suffix since there is no hundred
    let result = resultArray.join(""); //join everything into one sentence
    return result[0].toUpperCase() + result.slice(1) + "."; //make first letter uppercase and add full stop
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

    let words = [million, thousand, hundred];
    let suffixes = [" million, ", " thousand, ", ""];

    let indicesToRemove = []; //an array to store the indice of elements that are empty (only have 000)
    for (let word in words) {
      if (words[word] === "") {
        indicesToRemove.push(word);
      }
    }
    let sorted = indicesToRemove.sort((a, b) => b - a);
    //sort the indicesToRemove array in reverse so that removing the indices from words does not cause clashes due to rearranging index
    for (let index of sorted) {
      words.splice(Number(index), 1); //remove any empty value from the array
      suffixes.splice(Number(index), 1); // do the same to the suffixes array
    }
    if (words.includes(hundred)) {
      if ((remainder % 1000).toString().length < 3) {
        //check if hundred is less than three digits
        let hunIndex = words.indexOf(hundred);
        let toEditIndex = hunIndex - 1; //find the index of the element before hundred
        suffixes[toEditIndex] = suffixes[toEditIndex].replace(", ", " and "); //replace ',' with ' and ' for grammar
        const resultArray = []; //create array to hold the words and their suffixes
        for (i = 0; i < words.length; i++) {
          resultArray.push(words[i]);
          resultArray.push(suffixes[i]);
        }
        let result = resultArray.join(""); //join everything into one sentence
        return result[0].toUpperCase() + result.slice(1) + "."; //make first letter uppercase and add full stop
      }
    }
    let resultArray = []; //create array to hold the words and their suffixes
    for (i = 0; i < words.length; i++) {
      resultArray.push(words[i]);
      resultArray.push(suffixes[i]);
    }
    console.log(resultArray);
    resultArray[resultArray.length - 1] = resultArray[
      resultArray.length - 1
    ].replace(", ", ""); //replace ',' with empty string '' for the last suffix since there is no hundred
    let result = resultArray.join(""); //join everything into one sentence
    return result[0].toUpperCase() + result.slice(1) + "."; //make first letter uppercase and add full stop
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

    let words = [billion, million, thousand, hundred];
    let suffixes = [" billion, ", " million, ", " thousand, ", ""];

    let indicesToRemove = []; //an array to store the indice of elements that are empty (only have 000)
    for (let word in words) {
      if (words[word] === "") {
        indicesToRemove.push(word);
      }
    }
    let sorted = indicesToRemove.sort((a, b) => b - a);
    //sort the indicesToRemove array in reverse so that removing the indices from words does not cause clashes due to rearranging index
    for (let index of sorted) {
      words.splice(Number(index), 1); //remove any empty value from the array
      suffixes.splice(Number(index), 1); // do the same to the suffixes array
    }
    if (words.includes(hundred)) {
      if ((remainderB % 1000).toString().length < 3) {
        //check if hundred is less than three digits
        let hunIndex = words.indexOf(hundred);
        let toEditIndex = hunIndex - 1; //find the index of the element before hundred
        suffixes[toEditIndex] = suffixes[toEditIndex].replace(", ", " and "); //replace ',' with ' and ' for grammar
        const resultArray = []; //create array to hold the words and their suffixes
        for (i = 0; i < words.length; i++) {
          resultArray.push(words[i]);
          resultArray.push(suffixes[i]);
        }
        let result = resultArray.join(""); //join everything into one sentence
        return result[0].toUpperCase() + result.slice(1) + "."; //make first letter uppercase and add full stop
      }
    }
    let resultArray = []; //create array to hold the words and their suffixes
    for (i = 0; i < words.length; i++) {
      resultArray.push(words[i]);
      resultArray.push(suffixes[i]);
    }
    console.log(resultArray);
    resultArray[resultArray.length - 1] = resultArray[
      resultArray.length - 1
    ].replace(", ", ""); //replace ',' with empty string '' for the last suffix since there is no hundred
    let result = resultArray.join(""); //join everything into one sentence
    return result[0].toUpperCase() + result.slice(1) + "."; //make first letter uppercase and add full stop
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

    let words = [trillion, billion, million, thousand, hundred];
    let suffixes = [
      " trillion, ",
      " billion, ",
      " million, ",
      " thousand, ",
      "",
    ];

    let indicesToRemove = []; //an array to store the indice of elements that are empty (only have 000)
    for (let word in words) {
      if (words[word] === "") {
        indicesToRemove.push(word);
      }
    }
    let sorted = indicesToRemove.sort((a, b) => b - a);
    //sort the indicesToRemove array in reverse so that removing the indices from words does not cause clashes due to rearranging index
    for (let index of sorted) {
      words.splice(Number(index), 1); //remove any empty value from the array
      suffixes.splice(Number(index), 1); // do the same to the suffixes array
    }
    if (words.includes(hundred)) {
      if ((remainderC % 1000).toString().length < 3) {
        //check if hundred is less than three digits
        let hunIndex = words.indexOf(hundred);
        let toEditIndex = hunIndex - 1; //find the index of the element before hundred
        suffixes[toEditIndex] = suffixes[toEditIndex].replace(", ", " and "); //replace ',' with ' and ' for grammar
        const resultArray = []; //create array to hold the words and their suffixes
        for (i = 0; i < words.length; i++) {
          resultArray.push(words[i]);
          resultArray.push(suffixes[i]);
        }
        let result = resultArray.join(""); //join everything into one sentence
        return result[0].toUpperCase() + result.slice(1) + "."; //make first letter uppercase and add full stop
      }
    }
    let resultArray = []; //create array to hold the words and their suffixes
    for (i = 0; i < words.length; i++) {
      resultArray.push(words[i]);
      resultArray.push(suffixes[i]);
    }
    console.log(resultArray);
    resultArray[resultArray.length - 1] = resultArray[
      resultArray.length - 1
    ].replace(", ", ""); //replace ',' with empty string '' for the last suffix since there is no hundred
    let result = resultArray.join(""); //join everything into one sentence
    return result[0].toUpperCase() + result.slice(1) + "."; //make first letter uppercase and add full stop
  }
  if (newnum >= 1000000000000000) {
    return "Plese type a number from 1 - 999999999999999";
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

document.addEventListener("DOMContentLoaded", function () {
  inputElement = document.getElementById("rawNum");

  inputElement.addEventListener("input", (event) => {
    const inputValue = event.target.value;
    document.getElementById("convertNum").textContent = convertNum(inputValue);
  });
});
