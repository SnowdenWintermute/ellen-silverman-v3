module.exports = function getLowerCaseNoDash(words) {
  let wordArr = words.split("");
  wordArr.forEach((letter, i) => {
    if (letter === "-") wordArr.splice(i, 1, " ");
    // if (letter == "'") wordArr.splice(i, 1);
  });
  return wordArr
    .join("")
    .toLowerCase()
    .trim();
};
