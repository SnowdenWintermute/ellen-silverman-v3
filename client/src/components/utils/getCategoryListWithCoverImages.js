module.exports = function getCategoryListWithCoverImages(paintings) {
  let categoryListWithCoverImages = [];
  paintings.forEach(painting => {
    let addCategoryBool = true;
    categoryListWithCoverImages.forEach(categoryAndImage => {
      if (categoryAndImage.category === painting["Category"]) {
        addCategoryBool = false;
      }
    });
    if (addCategoryBool) {
      categoryListWithCoverImages.push({
        category: painting["Category"],
        coverImg: `../img/${painting["Category"]}/thumbs/${painting["Name"]}.jpg`
      });
    }
  });

  return categoryListWithCoverImages;
};
