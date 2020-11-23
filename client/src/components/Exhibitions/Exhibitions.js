import React from "react";
// import Carousel from "nuka-carousel";
// import CarouselButton from "./CarouselButton";
import ExhibitionViewer from "./ExhibitionViewer";

export default function Exhibitions() {
  return (
    <div className="exhibitions-parent">
      <div className="exhibitions-container">
        {/* <Carousel
          className={"story-carousel"}
          dragging={true}
          // decorators={decorators}
        >
          ---content---
        </Carousel> */}

        <ExhibitionViewer
          title="Fence Line Gallery"
          subtitle="Roosevelt, NJ 2020"
          description="During the lockdown Ellen displayed her artwork along the garden fence in her front yard. During this time she asked visitors to submit stories inspired by her art. Linked below is one of those stories which was turned into an animated scrollable story for the web."
          link={{
            title: "The Professor (Scrollable Story)",
            url: "/the-professor",
          }}
          background=""
          sideImages={[
            "../img/Art Show Pictures 2020/Fence Line 1.jpg",
            "../img/Art Show Pictures 2020/Fence Line 2.jpg",
            "../img/Art Show Pictures 2020/Fence Line 3.jpg",
          ]}
        />
        <ExhibitionViewer
          title="Art in the Woods"
          subtitle="Roosevelt, NJ 2018"
          description="Community members adorned a local nature trail with artwork to create a walkable gallery. Ellen posted a series of artworks from the Acrylic Collage and Stone in the Middle of the Road series."
          background=""
          sideImages={[
            "../img/Art Show Pictures 2018/Roosevelt Art in the Woods 2018 4.jpg",
            "../img/Art Show Pictures 2018/Roosevelt Art in the Woods 2018 5.jpg",
            "../img/Art Show Pictures 2018/Roosevelt Art in the Woods 2018 3.jpg",
          ]}
        />
        <ExhibitionViewer
          title="Art All Day "
          subtitle="Trenton Artworks - Trenton, NJ 2019"
          background=""
          sideImages={[
            "../img/Art Show Pictures 2019/Art All Day Trent House 2.jpg",
            "../img/Art Show Pictures 2019/Art All Day Trent House 4.jpg",
            "../img/Art Show Pictures 2019/Art All Day Trent House.jpg",
          ]}
        />
      </div>
      <div className="exhibitions-list">
        <h2>Past Exhibitions</h2>
        <br></br>
        <p>Roebling Gallery - Trenton, NJ 2019</p>
        <p>Ellarslie Furniture and Interior Theme Show, Spring 2017</p>
        <p>Garden State Watercolor Society Juried Show, 2016 - 2017</p>
        <p>Monmouth Museum Winter Juried Show, Winter 2016</p>
        <p>Art Alliance Fall Juried Shows, 2015 – 2017 and other theme shows</p>
        <p>Studio Montclair Fauvism Show, Fall 2015</p>
        <p>Monmouth Museum Portrait Show Fall 2015</p>
        <p>New Hope Art Council Juried Show, May 2015 and 2016</p>
        <p>
          “A Sense of Place,” Solo Show, The Grand, In Wilmington DE. Sept. 2014
        </p>
        <p>Noyes Museum, Signature Artist Show 2013 to present</p>
        <p>Ellarslie Opening, Trenton Art Museum, May – June 2014 and 2016</p>
        <p>Mercer County Artist Show, March 2014 and 2016</p>
        <p>New Jersey State Arts Service Award 2007</p>
        <p>
          State of New Jersey State Council on the Arts Artist in the Schools
          Artist Residency Program 1999-2001
        </p>
        <p>
          The Phillips Mill Annual Juried Exhibition 1997, September 20 through
          October 26, 1997; Award: Renee Brezkier McNelly Memorial Award for
          Representational Oil Painting
        </p>
        <p>
          Four Artist Show; Landscapes: Varations on a Theme, Stony Brook
          Gallery, September 27 through November 7, 1997.
        </p>
        <p>
          Small Works of Nature, Stony Brook Gallery, January 17 through March
          9, 1997
        </p>
        <p>
          67th Annual Fall Exhibition, Phillips Mill Art Gallery, Sept. 20 -
          Oct. 27 1996
        </p>
        <p>
          Group Show, Reggio Gallery, 26 West 17th, New York, New York Jan. 1996
        </p>
        <p>Thompson Park, Monmouth Co., NJ, solo exhibit, April, 1996</p>
        <p>
          Farms and Farming in New Jersey, Stony Brook Gallery, Aug.-Sept. 1996,
          First Place
        </p>
      </div>
    </div>
  );
}
