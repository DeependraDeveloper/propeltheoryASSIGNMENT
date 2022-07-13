const mongoose = require("mongoose");

function isValid(value) {
  if (typeof value === "undefined" || typeof value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
}

function isValidrequestBody(requestBody) {
  return Object.keys(requestBody).length !== 0;
}

function isValidObjectId(objectId) {
  return mongoose.Types.ObjectId.isValid(objectId);
}

function isValidlength(id) {
  return id.length === 24;
}

function isValidName(s) {
  if (s.length == 0) return false;
  if (s.length > 30) return false;
  var letters = /^[A-Za-z ]+$/;
  for (let i = 0; i < s.length; i++) {
    if (!s[i].match(letters)) return false;
  }
  return true;
}

function isValidComapanyName(s) {
  if (s.length == 0) return false;
  if (s.length > 30) return false;
  var letters = /^[A-Za-z0-9 ]+$/;
  for (let i = 0; i < s.length; i++) {
    if (!s[i].match(letters)) return false;
  }
  return true;
}

function isValidIndianNumber(number) {
  if (!/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/.test(number))
    return false;
  return true;
}

function isValidEmail(email) {
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    return false;
  return true;
}

function isValidUrl(url) {
  const urlRegex =
    /^((http(s?)?):\/\/)?([wW]{3}\.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/g;
  const result = url.match(urlRegex);
  return result !== null;
}

function isValidSocialUrl(url) {
  const regex =
    /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;
  const result = url.match(regex);
  return result !== null;
}

module.exports = {
  isValid,
  isValidObjectId,
  isValidlength,
  isValidrequestBody,
  isValidName,
  isValidComapanyName,
  isValidIndianNumber,
  isValidEmail,
  isValidUrl,
  isValidSocialUrl,
};
