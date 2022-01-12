/* To convert timestamp into date */
export const getDate = (dateToConvert) => {
  const dateConverted = new Date(parseInt(dateToConvert)).toLocaleDateString();
  return dateConverted;
};

/* To convert timestamp into date and time */
function timeConverter(UNIX_timestamp) {
  const a = new Date(UNIX_timestamp * 1000);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = a.getHours();
  const min = a.getMinutes();
  const sec = a.getSeconds();
  // var time = date + ' ' + month + ' ' + year + ' ' +'at'+' '+ hour + ':' + min ;
  const time = `${date} ${month} ${year} `;
  return time;
}

export const TimeConverter = timeConverter;

function timeConverterInMinutes(UNIX_timestamp) {
  const a = new Date(UNIX_timestamp * 1000);
  const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = days[a.getDay()];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  let hour = a.getHours();
  let min = a.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";
  hour %= 12;
  hour = hour || 12; // the hour '0' should be '12'
  min = min < 10 ? `0${min}` : min;
  const formattedMinuteValue = `0${min}`.slice(-2);
  const sec = a.getSeconds();
  const time =
    `${date} ${month} ` + `at` + ` ${hour}:${formattedMinuteValue} ${ampm}`;
  return time;
}

export const TimeConverterInMinutes = timeConverterInMinutes;

function dateTimeFormat(UNIX_timestamp) {
  const a = new Date(UNIX_timestamp * 1000);
  const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = days[a.getDay()];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  let hour = a.getHours();
  let min = a.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";
  hour %= 12;
  hour = hour || 12; // the hour '0' should be '12'
  min = min < 10 ? `0${min}` : min;
  const formattedMinuteValue = `0${min}`.slice(-2);
  const sec = a.getSeconds();
  const time =
    `${day}, ${date} ${month} ${year},` +
    ` ${hour}:${formattedMinuteValue} ${ampm}`;
  return time;
}

export const DateTimeFormatting = dateTimeFormat;

function dayDateFormat(UNIX_timestamp) {
  const a = new Date(UNIX_timestamp * 1000);
  const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = days[a.getDay()];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  let hour = a.getHours();
  let min = a.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";
  hour %= 12;
  hour = hour || 12; // the hour '0' should be '12'
  min = min < 10 ? `0${min}` : min;
  const formattedMinuteValue = `0${min}`.slice(-2);
  const sec = a.getSeconds();
  const time = `${day} , ${date} ${month} ${year}`;
  return time;
}

export const DayDateFormatting = dayDateFormat;

function getMinuteValue(UNIX_timestamp) {
  const a = new Date(UNIX_timestamp * 1000);
  let hour = a.getHours();
  let min = a.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";
  hour %= 12;
  hour = hour || 12; // the hour '0' should be '12'
  min = min < 10 ? `0${min}` : min;
  const formattedMinuteValue = `0${min}`.slice(-2);
  const time = `${hour}:${formattedMinuteValue} ${ampm}`;
  return time;
}

export const GetMinuteValue = getMinuteValue;

/* To convert date object into specific format '24 May 2020' */
const currentDate = new Date().toString().split(" ").splice(1, 3).join(" ");
export const GetCurrentDate = currentDate;

/* To get time duration '2d ago' */
const timeDuration = (current, previous) => {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return `${Math.round(elapsed / 1000)} sec`;
  }
  if (elapsed < msPerHour) {
    return `${Math.round(elapsed / msPerMinute)} min`;
  }
  if (elapsed < msPerDay) {
    return `${Math.round(elapsed / msPerHour)} hr`;
  }
  if (elapsed < msPerMonth) {
    return `${Math.round(elapsed / msPerDay)} day`;
  }
  if (elapsed < msPerYear) {
    return `${Math.round(elapsed / msPerMonth)} mon`;
  }
  return `${Math.round(elapsed / msPerYear)} yr`;
};
export const TimeDuration = timeDuration;

/* To check if msg contains only empty spaces */
export const isMsgValid = (msg) =>
  msg &&
  msg.replace(/\s/g, "")
    .length; /* for checking all empty spaces, if g is not included it only checks first letter */

/* To group array */
const groupBy = (list, keyGetter) => {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
};
export const GroupBy = groupBy;

export const checkHttps = (str) => {
  const regex =
    /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  if (!regex.test(str)) {
    return false;
  }
  return true;
};

/* To identify if string is text or link */
export const ValidURL = (str) => {
  // var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  const regex = /((\w+:\/\/\S+)|(\w+[\.:]\w+\S+))[^\s,\.]/gi;
  if (!regex.test(str)) {
    return false;
  }
  return true;
};

const extractLinkFromText = (string) => {
  const link = string
    ? string.match(
        /[-a-zA-Z0-9@:%._\+~#=]+\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
      )
    : "";
  // const link = string.match()
  return link;
};
export const ExtractLinkFromText = extractLinkFromText;

/* Separate link from text */
const URL_REGEX = /((\w+:\/\/\S+)|(\w+[\.:]\w+\S+))[^\s,\.]/gi;
// const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
const renderText = (txt) =>
  txt.split(" ").filter((part) => URL_REGEX.test(part))[0];
export const SeparateLink = renderText;

/* Convert bytes into kb,gb,.. */
const bytesToSize = (bytes) => {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 Byte";
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return `${Math.round(bytes / Math.pow(1024, i), 2)} ${sizes[i]}`;
};
export const BytesToSize = bytesToSize;

/* Generate uuid */
function createUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const CreateUUID = createUUID;

const createUUIDWithoutDash = () => createUUID().replace(/-/g, "");

export const CreateUUIDWithoutDash = createUUIDWithoutDash;

/* For converting enum */
const convertEnum = (text) =>
  text
    .replace(/\w+/g, function (w) {
      return w[0].toUpperCase() + w.slice(1).toLowerCase();
    })
    .replace(/_/g, " ");
export const ConvertEnum = convertEnum;

// Eliminate those items that are not in both arrays
function arrDifference(a1, a2) {
  const a = [];
  const diff = [];
  for (var i = 0; i < a1.length; i++) {
    a[a1[i]] = true;
  }
  for (var i = 0; i < a2.length; i++) {
    if (a[a2[i]]) {
      delete a[a2[i]];
    } else {
      a[a2[i]] = true;
    }
  }
  for (const k in a) {
    diff.push(k);
  }
  return diff;
}

export const ArrDifference = arrDifference;

// Merge two arrays and remove duplicate
function mergeArray(array1, array2) {
  const result_array = [];
  const arr = array1.concat(array2);
  let len = arr.length;
  const assoc = {};
  while (len--) {
    const item = arr[len];

    if (!assoc[item]) {
      result_array.unshift(item);
      assoc[item] = true;
    }
  }
  return result_array;
}

export const MergeArray = mergeArray;

// Convert decimal into half eg: 2.8 --> 3 ,2.2 -->2.5
function roundByNum(num, rounder) {
  const multiplier = 1 / (rounder || 0.5);
  return Math.round(num * multiplier) / multiplier;
}

export const RoundByNum = roundByNum;

// convert timestamp into minute
function convertTimestampToMinute(timestamp) {
  const hours = Math.floor(timestamp / 60 / 60);
  const minutes = Math.floor(timestamp / 60) - hours * 60;
  const seconds = timestamp % 60;

  // return hours + ':' + minutes + ':' + seconds;
  return `${minutes}:${seconds}`;
}

export const ConvertTimestampToMinute = convertTimestampToMinute;

// Format phone number
function phoneFormat(input) {
  // Strip all characters from the input except digits
  input = input ? input.replace(/\D/g, "") : null;

  // Trim the remaining input to ten characters, to preserve phone number format
  input = input ? input.substring(0, 15) : null;

  // Based upon the length of the string, we add formatting as necessary
  const size = input ? input.length : 0;
  if (size == 0) {
    input = input;
  } else if (size < 4) {
    input = `(${input}`;
  } else if (size < 7) {
    input = `(${input.substring(0, 3)}) ${input.substring(3, 6)}`;
  } else {
    input = `(${input.substring(0, 3)}) ${input.substring(
      3,
      6
    )} - ${input.substring(6, 9)} - ${input.substring(9, 15)}`;
  }
  return input;
}

export const PhoneFormat = phoneFormat;

// Validate Phone Number
function validatePhoneNumber(inputtxt) {
  const phoneno = /^\d{10}$/;
  if (inputtxt.match(phoneno)) {
    return true;
  }
  return false;
}

export const ValidatePhoneNumber = validatePhoneNumber;

function getBase64Image(img) {
  // Create an empty canvas element
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  // Copy the image contents to the canvas
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  // Get the data-URL formatted image
  // Firefox supports PNG and JPEG. You could check img.src to
  // guess the original format, but be aware the using "image/jpg"
  // will re-encode the image.
  const dataURL = canvas.toDataURL("image/png");

  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  // return dataURL;
}
export const GetBase64Image = getBase64Image;

function getImageDataUrl(img) {
  return `data:image/png;base64,${img}`;
}
export const GetImageDataUrl = getImageDataUrl;

function removeImageDataUrl(imgUrl) {
  return imgUrl.replace(/^data:image\/(png|jpg);base64,/, "");
}
export const RemoveImageDataUrl = removeImageDataUrl;

function convertTimeStampToReadableTime(timestamp) {
  const hours = Math.floor(timestamp / 60 / 60);
  const minutes = Math.floor(timestamp / 60) - hours * 60;
  const seconds = Math.floor(timestamp % 60);
  if (hours !== 0 && minutes !== 0 && seconds !== 0) {
    return `${hours} hr ${minutes} ${
      minutes === 1 ? "min" : "mins"
    } ${seconds} ${seconds === 1 ? "sec" : "secs"}`;
  } else if (hours === 0 && minutes !== 0 && seconds !== 0) {
    return `${minutes} ${minutes === 1 ? "min" : "mins"} ${seconds} ${
      seconds === 1 ? "sec" : "secs"
    }`;
  } else {
    return `${seconds} ${seconds === 1 ? "sec" : "secs"}`;
  }
}

export const ConvertTimeStampToReadableTime = convertTimeStampToReadableTime;

// Calculate yesterday's timestamp
const getYesterdayTimestamp = () => {
  const todayTimeStamp = +new Date(); // Unix timestamp in milliseconds
  const oneDayTimeStamp = 1000 * 60 * 60 * 24; // Milliseconds in a day
  const diff = todayTimeStamp - oneDayTimeStamp;
  return diff;
};
export const GetYesterdayTimestamp = getYesterdayTimestamp;

function timeConverterFunc(UNIX_timestamp) {
  const a = new Date(UNIX_timestamp * 1000);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = days[a.getDay()];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  let hour = a.getHours();
  let min = a.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";
  hour %= 12;
  hour = hour || 12; // the hour '0' should be '12'
  min = min < 10 ? `0${min}` : min;
  const formattedMinuteValue = `0${min}`.slice(-2);
  const sec = a.getSeconds();
  // var time = date + ' ' + month + ' ' + year + ' ' +'at'+' '+ hour + ':' + min ;
  const time = `${date} ${month} ${year} ${day}`;
  return [date, month, year, day, hour, ampm, min];
}
export const TimeConverterFunc = timeConverterFunc;

const dateFormatter = (timestamp) => {
  return DayDateFormatting(new Date() / 1000) ===
    DayDateFormatting(timestamp / 1000)
    ? "Today"
    : DayDateFormatting(GetYesterdayTimestamp() / 1000) ===
      DayDateFormatting(timestamp / 1000)
    ? "Yesterday"
    : `${TimeConverterFunc(timestamp / 1000)[0]} ${
        TimeConverterFunc(timestamp / 1000)[1]
      }`;
};
export const DateFormatter = dateFormatter;

// Get random item from an array
const getRandomItem = (arr) => {
  // get random index value
  const randomIndex = Math.floor(Math.random() * arr.length);

  // get random item
  const randomItem = arr[randomIndex];

  return randomItem;
};

export const SelectRandomItem = getRandomItem;

export const getItemFromLocalStorage = (key) => {
  const item = localStorage.getItem(key);
  return JSON.parse(item);
};

export const setItemToLocalStorage = (key, item) => {
  let stringifiedItem;
  if (typeof item !== "string") {
    stringifiedItem = JSON.stringify(item);
  } else {
    stringifiedItem = item;
  }
  localStorage.setItem(key, stringifiedItem);
  return true;
};

export const getUrlSearchParams = (url, params) => {
  const searchParams = new URLSearchParams(url);
  const responseObj = {};
  for (const item in params) {
    const value = searchParams.get(params[item]);
    responseObj[item] = value;
  }
  return responseObj;
};

export const fireTimerAction = (action) => {
  console.log(`${action} timer action fired`);
  const startEl = document.getElementById("start-timer");
  const pauseEl = document.getElementById("pause-timer");
  const resumeEl = document.getElementById("resume-timer");
  const stopEl = document.getElementById("stop-timer");
  const resetEl = document.getElementById("reset-timer");

  switch (action) {
    case "start":
      startEl.click();
      break;
    case "pause":
      pauseEl.click();
      break;
    case "resume":
      resumeEl.click();
      break;
    case "stop":
      stopEl.click();
      break;
    case "reset":
      resetEl.click();
      break;
    default:
      break;
  }
};

export function TimeoutEvent(time, callback) {
  console.log("timeout event started");
  this.timeout = undefined;

  this.startTimeout = () => {
    this.timeout = setTimeout(() => callback(), time);
  };

  this.stopTimeout = () => {
    clearTimeout(this.timeout);
    console.log("Timeout stopped");
  };
}

export const devLog = (msg) => {
  if (process.env.NODE_ENV !== "production") {
    return console.log(msg);
  }
  return false;
};

// ['tile height', ["tile width"]]
export const gridSizes = {
  2: ["calc((100vh - 120px) / 2)", [6, 6, 6]],
  3: ["calc((100vh - 120px) / 2)", [6, 6, 6, 6]],
  4: ["calc((100vh - 120px) / 2)", [6, 6, 6, 6, 6]],
  5: ["calc((100vh - 120px) / 2)", [4, 4, 4, 4, 4, 4]],
  6: ["calc((100vh - 120px) / 2)", [4, 4, 4, 4, 4, 4]],
  7: ["calc((100vh - 120px) / 3)", [4, 4, 4, 4, 4, 4, 4]],
  8: ["calc((100vh - 120px) / 3)", [4, 4, 4, 4, 4, 4, 4, 4]],
  9: ["calc((100vh - 120px) / 3)", [4, 4, 4, 4, 4, 4, 4, 4, 4]],
  10: ["calc((100vh - 120px) / 4)", [4, 4, 4, 4, 4, 4, 4, 4, 4, 4]],
  11: ["calc((100vh - 120px) / 4)", [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]],
  12: ["calc((100vh - 120px) / 4)", [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]],
};

export const getTileOptions = (participants) => {
  if (participants.length > 9) {
    return {
      width: "55px",
      height: "55px",
      fontSize: "14px",
    };
  } else if (participants.length > 6) {
    return {
      width: "80px",
      height: "80px",
      fontSize: "18px",
    };
  }
  return {
    width: "100px",
    height: "100px",
    fontSize: "24px",
  };
};

export const isAudioVideo = (codec) => {
  const { audio_codec, video_codec } = codec;
  if (audio_codec && video_codec) return "audiovideo";
  else if (audio_codec) return "audio";
  else if (video_codec) return "video";
  else return null;
};

export const getParticipantData = (participantDetails) => {
  const requiredFormat = {
    fullName:
      participantDetails.user &&
      participantDetails.user.employee &&
      participantDetails.user.employee.account.fullName,
    accountId:
      participantDetails.user &&
      participantDetails.user.employee &&
      participantDetails.user.employee.account.accountId,
    profilePic:
      participantDetails.user &&
      participantDetails.user.employee &&
      participantDetails.user.employee.account.profilePic,
  };
  return requiredFormat;
};

export const getOwnParticipantData = (participantDetails) => {
  const requiredFormat = {
    fullName:
      participantDetails.user &&
      participantDetails.user.employee &&
      participantDetails.user.employee.account.fullname,
    accountId:
      participantDetails.user &&
      participantDetails.user.employee &&
      participantDetails.user.employee.account.accountid,
    profilePic:
      participantDetails.user &&
      participantDetails.user.employee &&
      participantDetails.user.employee.account.profilepic,
  };
  return requiredFormat;
};

export const getFormattedInboxUsers = (user) => ({
  fullName: user.name,
  accountId: user.id,
  profilePic: user.image,
});

export function ChangeArrayPosition(arr, fromIndex, toIndex) {
  let element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
  return arr;
}

export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
