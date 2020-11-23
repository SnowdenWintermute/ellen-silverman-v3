import React, { useRef, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as navActions from "../../store/actions/nav-actions";

const PageLabel = (props) => {
  const [pageLabelHeight, setPageLabelHeight] = useState();
  const dispatch = useDispatch();
  const pageLabelEl = useRef();

  const handleResize = useCallback(() => {
    setPageLabelHeight(pageLabelEl.current.clientHeight);
    dispatch(navActions.setNavHeight(pageLabelHeight));
  }, [pageLabelHeight, dispatch]);

  useEffect(() => {
    handleResize();
  }, [handleResize]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  useEffect(() => {
    window.addEventListener("onorientationchange", handleResize);
    return () => {
      window.removeEventListener("onorientationchange", handleResize);
    };
  });

  let currentPage, category, paintingName;
  let capitalizedCategory, capitalizedCurrentPage;
  if (props.match.params) {
    currentPage = props.match.params.page;
    category = props.match.params.category;
    paintingName = props.match.params.painting;
  }
  if (currentPage) {
    capitalizedCurrentPage =
      currentPage.charAt(0).toUpperCase() + currentPage.slice(1);
  }
  if (category) {
    capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  }
  return (
    <div className="pageLabel" id="pageLabel" ref={pageLabelEl}>
      <p>
        <Link to={`/`}>Lucretia E. McGuff-Silverman</Link>
        {currentPage ? " - " : ""}
        <Link to={`/${currentPage}`}>{capitalizedCurrentPage}</Link>
        {capitalizedCategory ? " - " : ""}
        {capitalizedCategory && (
          <Link to={`/${currentPage}/${category}`}>{capitalizedCategory}</Link>
        )}
        {paintingName && " - "}
        {paintingName && (
          <Link to={`/${currentPage}/${category}/${paintingName}`}>
            {paintingName}
          </Link>
        )}
      </p>
      <hr />
    </div>
  );
};
export default PageLabel;
