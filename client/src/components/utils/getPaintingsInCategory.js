import getLowerCaseNoDash from "./getLowerCaseNoDash";

export default function getPaintingsInCategory(paintingList, categoryName) {
  let newArr = [];
  paintingList.forEach(painting => {
    const lowerCaseCategory = painting["Category"]
      ? getLowerCaseNoDash(painting["Category"])
      : "";
    if (lowerCaseCategory === getLowerCaseNoDash(categoryName))
      newArr.push(painting);
  });
  return newArr;
}
