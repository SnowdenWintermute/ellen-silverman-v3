import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";

import ColorFlash from "./ColorFlash";
import CameraFlash from "./CameraFlash";
import ScrollIndicator from "./ScrollIndicator";

const BunStoryImages = (props) => {
  const [animating, setAnimating] = useState(false);
  const [colorFlashActiveClass, setColorFlashActiveClass] = useState();
  const [cameraFlashActiveClass, setCameraFlashActiveClass] = useState(
    "camera-flash-inactive"
  );
  const [scrollIndicatorShowClass, setScrollIndicatorShowClass] = useState("");
  const [cameraFlashTriggered, setCameraFlashTriggered] = useState(false);
  const [flashColor, setFlashColor] = useState("white");
  const [museumFlashTriggered, setMuseumFlashTriggered] = useState(false);
  const [harrysFlashTriggered, setHarrysFlashTriggered] = useState(false);
  const [directorsFlashTriggered, setDirectorsFlashTriggered] = useState(false);
  const [italianFlashTriggered, setItalianFlashTriggered] = useState(false);
  const [lydiasFlashTriggered, setLydiasFlashTriggered] = useState(false);
  const [teaTimeClass, setTeaTimeClass] = useState("teaTime-pos-1");
  const [museumClass, setMuseumClass] = useState("museum-pos-1");
  const [harrysLRClass, setHarrysLRClass] = useState("harrys-pos-1");
  const [directorsClass, setDirectorsClass] = useState("directors-pos-1");
  const [italianClass, setItalianClass] = useState("italian-pos-1");
  const [lydiasClass, setLydiasClass] = useState("lydias-pos-1");
  const [porchClass, setPorchClass] = useState("porch-pos-1");
  const [studyClass, setStudyClass] = useState("study-pos-1");

  const textRefs = useSelector((state) => state.story.textRefs);
  const textRefsCurrent = textRefs.current;

  const appearZone = window.innerHeight / 3;
  const windowHeightPercent = window.innerHeight / 100;

  const getTextTop = useCallback(
    (elName) => {
      if (!textRefsCurrent) return;
      if (!textRefsCurrent[elName]) return;
      return textRefsCurrent[elName].getBoundingClientRect().top;
    },
    [textRefsCurrent]
  );

  useEffect(() => {
    setTimeout(() => {
      setColorFlashActiveClass("color-flash-inactive");
    }, [2000]);
  }, []);

  const updateImages = useCallback(() => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setAnimating(false);
    }, 1000);
    if (!textRefs.current) return;

    if (getTextTop("text2") > appearZone) {
      setScrollIndicatorShowClass("");
      setTeaTimeClass("teaTime-pos-1");
    }
    if (getTextTop("text2") < appearZone) {
      setScrollIndicatorShowClass("scroll-indicator-hidden");
      setTeaTimeClass("teaTime-pos-2");
    }
    if (getTextTop("text3") < appearZone - windowHeightPercent * 20)
      setTeaTimeClass("teaTime-pos-3");
    if (getTextTop("text4") < appearZone - windowHeightPercent * 40)
      setTeaTimeClass("teaTime-pos-4");
    if (getTextTop("text4") < appearZone - windowHeightPercent * 60)
      setTeaTimeClass("teaTime-pos-5");
    if (getTextTop("text4") < appearZone - windowHeightPercent * 80)
      setTeaTimeClass("teaTime-pos-6");
    if (getTextTop("text7") < appearZone) setTeaTimeClass("teaTime-pos-7");
    if (getTextTop("text7") + 100 < appearZone)
      setTeaTimeClass("teaTime-pos-8");
    if (getTextTop("text7") + 250 > appearZone) {
      setMuseumFlashTriggered(false);
      setMuseumClass("museum-pos-1");
    }
    if (getTextTop("text7") + 250 < appearZone) {
      if (!museumFlashTriggered) {
        setMuseumFlashTriggered(true);
        setColorFlashActiveClass("");
        setFlashColor("#eb9c26");
        setTimeout(() => {
          setColorFlashActiveClass("color-flash-inactive");
        }, 1000);
      }
      setMuseumClass("museum-pos-2");
    }
    if (getTextTop("text8") < appearZone) {
      setMuseumClass("museum-pos-3");
    }
    if (getTextTop("text9") < appearZone) setMuseumClass("museum-pos-4");
    if (getTextTop("text11") < appearZone) setMuseumClass("museum-pos-5");
    if (getTextTop("text12") < appearZone) setMuseumClass("museum-pos-6");
    if (getTextTop("text13") < appearZone) setMuseumClass("museum-pos-7");
    if (getTextTop("text13") < appearZone - windowHeightPercent * 20)
      setMuseumClass("museum-pos-8");
    if (getTextTop("text14") > appearZone) {
      setHarrysFlashTriggered(false);
      setHarrysLRClass("harrys-pos-1");
    }
    if (getTextTop("text14") < appearZone) {
      if (!harrysFlashTriggered) {
        setHarrysFlashTriggered(true);
        setColorFlashActiveClass("");
        setFlashColor("rgba(100,100,100,.9)");
        setTimeout(() => {
          setColorFlashActiveClass("color-flash-inactive");
        }, 1000);
      }
      setHarrysLRClass("harrys-pos-2");
    }
    if (getTextTop("text15") < appearZone) setHarrysLRClass("harrys-pos-3");
    if (getTextTop("text18") < appearZone) setHarrysLRClass("harrys-pos-4");
    if (getTextTop("text18") < appearZone - windowHeightPercent * 10)
      setHarrysLRClass("harrys-pos-5");
    if (getTextTop("text18") < appearZone - windowHeightPercent * 20)
      setHarrysLRClass("harrys-pos-6");
    if (getTextTop("text18") < appearZone - windowHeightPercent * 30)
      setHarrysLRClass("harrys-pos-7");
    if (getTextTop("text19") < appearZone) setHarrysLRClass("harrys-pos-8");
    if (getTextTop("text19") < appearZone - windowHeightPercent * 30)
      setHarrysLRClass("harrys-pos-9");
    if (getTextTop("text20") > appearZone) {
      setDirectorsFlashTriggered(false);
      setDirectorsClass("directors-pos-1");
    }
    if (getTextTop("text20") < appearZone) {
      if (!directorsFlashTriggered) {
        setDirectorsFlashTriggered(true);
        setColorFlashActiveClass("");
        setFlashColor("rgba(50,50,50,.7)");
        setTimeout(() => {
          setColorFlashActiveClass("color-flash-inactive");
        }, 3000);
      }
      setDirectorsClass("directors-pos-2");
    }
    if (getTextTop("text21") < appearZone) setDirectorsClass("directors-pos-3");
    if (getTextTop("text22") < appearZone) setDirectorsClass("directors-pos-4");
    if (getTextTop("text23") < appearZone) setDirectorsClass("directors-pos-5");
    if (getTextTop("text24") < appearZone) setDirectorsClass("directors-pos-6");
    if (getTextTop("text25") < appearZone) setDirectorsClass("directors-pos-7");
    if (getTextTop("text26") < appearZone && !getTextTop("text27") < appearZone)
      setDirectorsClass("directors-pos-8");
    if (getTextTop("text27") < appearZone) setDirectorsClass("directors-pos-9");
    if (getTextTop("text29") < appearZone)
      setDirectorsClass("directors-pos-10");
    if (getTextTop("text31") < appearZone)
      setDirectorsClass("directors-pos-11");
    if (getTextTop("text31") > appearZone) {
      //dissapearing
      setItalianFlashTriggered(false);
      setItalianClass("italian-pos-1");
    }
    if (getTextTop("text31") < appearZone) {
      //appearing
      if (!italianFlashTriggered) {
        setItalianFlashTriggered(true);
        setColorFlashActiveClass("");
        setFlashColor("rgba(252, 255, 184,.7)");
        setTimeout(() => {
          setColorFlashActiveClass("color-flash-inactive");
        }, 3000);
      }
      setItalianClass("italian-pos-2");
    }
    if (getTextTop("text34") < appearZone) setItalianClass("italian-pos-3");
    if (getTextTop("text36") > appearZone) {
      setCameraFlashTriggered(false);
    }
    if (getTextTop("text36") < appearZone) {
      if (!cameraFlashTriggered) {
        setCameraFlashTriggered(true);
        setCameraFlashActiveClass("");
        setTimeout(() => {
          setCameraFlashActiveClass("camera-flash-inactive");
        }, 700);
      }
      setItalianClass("italian-pos-4");
    }
    if (getTextTop("text38") < appearZone) setItalianClass("italian-pos-5");
    if (getTextTop("text39") < appearZone) setItalianClass("italian-pos-6");
    if (getTextTop("text49") < appearZone) setItalianClass("italian-pos-7");
    if (getTextTop("text60") < appearZone) setItalianClass("italian-pos-8");
    if (getTextTop("text62") < appearZone) setItalianClass("italian-pos-9");
    if (getTextTop("text64") < appearZone) setItalianClass("italian-pos-10");
    if (getTextTop("text64") < appearZone - windowHeightPercent * 14)
      setItalianClass("italian-pos-11");
    if (getTextTop("text64") > appearZone - windowHeightPercent * 14) {
      setLydiasFlashTriggered(false);
      setLydiasClass("lydias-pos-1");
    }
    if (getTextTop("text64") < appearZone - windowHeightPercent * 14) {
      //appearing
      if (!lydiasFlashTriggered) {
        setLydiasFlashTriggered(true);
        setColorFlashActiveClass("");
        setFlashColor("rgba(57, 138, 230,.9)");
        setTimeout(() => {
          setColorFlashActiveClass("color-flash-inactive");
        }, 3000);
      }
      setLydiasClass("lydias-pos-2");
    }
    if (getTextTop("text65") < appearZone) setLydiasClass("lydias-pos-3");
    if (getTextTop("text66") < appearZone) setLydiasClass("lydias-pos-4");
    if (getTextTop("text67") < appearZone) setLydiasClass("lydias-pos-5");
    if (getTextTop("text69") < appearZone) setLydiasClass("lydias-pos-6");
    if (getTextTop("text70") < appearZone) setLydiasClass("lydias-pos-7");
    if (getTextTop("text71") < appearZone) setLydiasClass("lydias-pos-8");
    if (getTextTop("text72") < appearZone) setLydiasClass("lydias-pos-9");
    if (getTextTop("text75") < appearZone) setLydiasClass("lydias-pos-10");
    if (getTextTop("text76") < appearZone) setLydiasClass("lydias-pos-11");
    if (getTextTop("text77") < appearZone) setLydiasClass("lydias-pos-12");
    if (getTextTop("text79") < appearZone) setLydiasClass("lydias-pos-13");
    if (getTextTop("text79") < appearZone - windowHeightPercent * 15)
      setLydiasClass("lydias-pos-14");
    if (getTextTop("text81") > appearZone) setPorchClass("porch-pos-1");
    if (getTextTop("text81") < appearZone) setPorchClass("porch-pos-2");
    if (getTextTop("text83") < appearZone) setPorchClass("porch-pos-3");
    if (getTextTop("text88") < appearZone) setPorchClass("porch-pos-4");
    if (getTextTop("text90") < appearZone) setPorchClass("porch-pos-5");
    if (getTextTop("text90") > appearZone) setStudyClass("study-pos-1");
    if (getTextTop("text90") < appearZone) setStudyClass("study-pos-2");
    if (getTextTop("text91") < appearZone) setStudyClass("study-pos-3");
    if (getTextTop("text93") < appearZone) setStudyClass("study-pos-4");
    if (getTextTop("text95") < appearZone) setStudyClass("study-pos-5");
    if (getTextTop("text98") < appearZone) setStudyClass("study-pos-6");
    if (getTextTop("text101") < appearZone) {
      setStudyClass("story-image-small study-end-grid-1");
      setTeaTimeClass("story-image-small teaTime-end-grid-1");
      setMuseumClass("story-image-small museum-end-grid-1");
      setHarrysLRClass("story-image-small harrysLR-end-grid-1");
      setDirectorsClass("story-image-small directors-end-grid-1");
      setItalianClass("story-image-small italian-end-grid-1");
      setLydiasClass("story-image-small lydias-end-grid-1");
      setPorchClass("story-image-small porch-end-grid-1");
    }
    if (getTextTop("text102") < appearZone) {
      setStudyClass("story-image-small-2 study-end-grid-2");
      setTeaTimeClass("story-image-small-2 teaTime-end-grid-2");
      setMuseumClass("story-image-small-2 museum-end-grid-2");
      setHarrysLRClass("story-image-small-2 harrysLR-end-grid-2");
      setDirectorsClass("story-image-small-2 directors-end-grid-2");
      setItalianClass("story-image-small-2 italian-end-grid-2");
      setLydiasClass("story-image-small-2 lydias-end-grid-2");
      setPorchClass("story-image-small-2 porch-end-grid-2");
    }
  }, [
    textRefs,
    appearZone,
    windowHeightPercent,
    animating,
    getTextTop,
    museumFlashTriggered,
    harrysFlashTriggered,
    directorsFlashTriggered,
  ]);

  const handleScroll = useCallback(
    (e) => {
      updateImages();
    },
    [updateImages]
  );

  useEffect(() => {
    updateImages();
  }, [updateImages]);

  // const handleResize = useCallback(() => {}, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // window.addEventListener("resize", handleResize);
    return function cleanup() {
      window.removeEventListener("scroll", handleScroll);
      // window.removeEventListener("resize", handleResize);
    };
  }, [handleScroll]);

  return (
    <div className="bun-story">
      <ScrollIndicator showClass={scrollIndicatorShowClass} />
      <ColorFlash showClass={colorFlashActiveClass} color={flashColor} />
      <CameraFlash showClass={cameraFlashActiveClass} />
      <div className={`bun-story-page`}>
        <img
          src={
            "../img/The Professor's Interiors/Tea Time at the Professor's.jpg"
          }
          className={`bun-story-img teaTime ${teaTimeClass}`}
          alt="Tea Time at the Professor's"
        />
      </div>
      <div className={`bun-story-page`}>
        <img
          src={"../img/The Professor's Interiors/Museum Court Yard.jpg"}
          className={`bun-story-img museum ${museumClass}`}
          alt="Museum Court Yard"
        />
      </div>
      <div className={`bun-story-page`}>
        <img
          src={"../img/The Professor's Interiors/Harry's Living Room.jpg"}
          className={`bun-story-img harrysLR ${harrysLRClass}`}
          alt="Harry's Living Room"
        />
      </div>
      <div className={`bun-story-page`}>
        <img
          src={"../img/The Professor's Interiors/Director's Office.jpg"}
          className={`bun-story-img directors ${directorsClass}`}
          alt="Director's Office"
        />
      </div>
      <div className={`bun-story-page`}>
        <img
          src={
            "../img/The Professor's Interiors/Favorite Restaurant in Italy.jpg"
          }
          className={`bun-story-img italian ${italianClass}`}
          alt="Italian Restaurant"
        />
        <div className={`bun-story-page`}>
          <img
            src={
              "../img/The Professor's Interiors/Lydia's for Thanksgiving.jpg"
            }
            className={`bun-story-img lydias ${lydiasClass}`}
            alt="Lydia's Room"
          />
        </div>
        <div className={`bun-story-page`}>
          <img
            src={
              "../img/The Professor's Interiors/The Professor's Unattached Porch.jpg"
            }
            className={`bun-story-img porch ${porchClass}`}
            alt="The Professor's Unattached Porch"
          />
        </div>
        <div className={`bun-story-page`}>
          <img
            src={"../img/The Professor's Interiors/The Professor's Study.jpg"}
            className={`bun-story-img study ${studyClass}`}
            alt="The Professor's Study"
          />
        </div>
      </div>
    </div>
  );
};

export default BunStoryImages;
