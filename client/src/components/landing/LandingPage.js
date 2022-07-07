import React from "react";
// import AnimatedLandingLinks from "./AnimatedLandingLinks";
import ImageFaderWithTitles from "./ImageFaderWithTitles/ImageFaderWithTitles";
import './landing.css'
import TitleText from "./TitleText/TitleText";
import ViewCollectionButton from "./ViewCollectionButton/ViewCollectionButton";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <TitleText />
      <ViewCollectionButton />
      <ImageFaderWithTitles
        delayInMiliseconds={8000}
        titlesInfo={[
          {
            series: "Salt Marsh",
            title: "Salt Marsh, Birds",
            composition: "acrylic on canvas",
            linkToPaintingDetailPage: "/artworks/salt-marsh/"
          },
          {
            series: "South Dakota Trip",
            title: "Devil's Tower",
            composition: "acrylic on canvas",
            linkToPaintingDetailPage: "/artworks/salt-marsh/"
          },
          {
            series: "The Professor's Interiors",
            title: "Director's Office",
            composition: "acrylic on paper",
            linkToPaintingDetailPage: "/artworks/salt-marsh/"
          },
          {
            series: "Forest Path",
            title: "A Walk in the Woods",
            composition: "acrylic on canvas",
            linkToPaintingDetailPage: "/artworks/salt-marsh/"
          },
          {
            series: "Cold River Camp",
            title: "Cold River Vatican City",
            composition: "watercolor on paper",
            linkToPaintingDetailPage: "/artworks/salt-marsh/"
          },
        ]}
        imageSourceArray={[
          "./img/Salt Marsh/Salt Marsh, Birds.jpg",
          "./img/South Dakota Trip/Devil's Tower.jpg",
          "./img/The Professor's Interiors/Director's Office.jpg",
          "./img/Forest Path/A Walk in the Woods.jpg",
          "./img/Cold River Camp/Cold River Vatican City.jpg",
        ]}
      />
      {/* <AnimatedLandingLinks /> */}
    </div>
  );
}

export default LandingPage
