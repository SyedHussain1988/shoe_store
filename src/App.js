import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet, useParams } from "react-router-dom";
import Gallery from "react-photo-gallery";
import { render } from "react-dom";
import Carousel, { Modal, ModalGateway } from "react-images";

const photos = [
  {
    src: 'https://images.nike.com/is/image/DotCom/CT3890_101',

  },
  {
    src: 'https://images.nike.com/is/image/DotCom/AA8030_111',
  },
  {
    src: 'https://images.nike.com/is/image/DotCom/BQ0234_102',
  },

  {
    src: 'https://images.nike.com/is/image/DotCom/AR0496_302',

  },

  {
    src: 'https://images.nike.com/is/image/DotCom/AO7351_005',

  },

  {
    src: 'https://images.nike.com/is/image/DotCom/BQ0130_100',

  },

  {
    src: 'https://images.nike.com/is/image/DotCom/AA8018_302',

  },

  {
    src: 'https://images.nike.com/is/image/DotCom/AR8835_406',
  },
  {
    src: 'https://images.nike.com/is/image/DotCom/CT3890_101',

  }
]


const shoes = {
  "1": {
    name: "NikeCourt Air Max Vapor Wing Premium Men's Tennis Shoe",
    img:
      "https://images.nike.com/is/image/DotCom/CT3890_101"
  },
  "2": {
    name: "NikeCourt Air Zoom Vapor X Men's Hard Court Tennis Shoe",
    img:
      "https://images.nike.com/is/image/DotCom/AA8030_111"
  },
  "3": {
    name: "NikeCourt Tech Challenge 20 Men's Tennis Shoe",
    img:
      "https://images.nike.com/is/image/DotCom/BQ0234_102"
  },
  "4":
  {
    name: "NikeCourt Air Zoom Vapor X Knit Men's Hard Court Tennis Shoe",
    img: "https://images.nike.com/is/image/DotCom/AR0496_302"
  },
  "5":
  {
    name: "NikeCourt Air Max Wildcard Men's Tennis Shoe",
    img: "https://images.nike.com/is/image/DotCom/AO7351_005"
  },
  "6":
  {
    name: "NikeCourt Vapor X TC Knit Men's Tennis Shoe",
    img: "https://images.nike.com/is/image/DotCom/BQ0130_100"
  },
  "7":
  {
    name: "NikeCourt Air Zoom Zero Men's Tennis Shoe",
    img: "https://images.nike.com/is/image/DotCom/AA8018_302"
  },
  "8":
  {
    name: "NikeCourt Air Zoom Vapor X Knit Women's Hard Court Tennis Shoe",
    img: "https://images.nike.com/is/image/DotCom/AR8835_406"
  }
};


function Launch() {
  return (
    <div><h1>Welcome Launch</h1>
      <Outlet />
    </div>
  );

}

function LaunchIndex() {
  return (
    <ul>
      {
        Object.entries(shoes).map(([key, { name, img }]) => (
          <Link to={`/launch/${key}`}>
            <li key={key}>
              <h4>{name}</h4>
              <img src={img} alt={name}></img>
            </li>
          </Link>
        ))}
    </ul>
  );
}

function LaunchShoe() {

  const { key } = useParams();

  const shoe = shoes[key];
  if (!shoe) {
    return (
      <div>No shoe found</div>
    );
  }


  const { img, name } = shoe;

  return (
    <div>
      <h4>{name}</h4>
      <img src={img} alt={name} />
    </div>
  );
}




function NotFound() {
  return (
    <div><h1>Not found!</h1>
      <p>Page does not exist...</p>
    </div>
  );

}

function Home() {

  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  return (
    // <div><Gallery photos={photos}  ></Gallery></div>
    <div>
      <Gallery photos={photos} onClick={openLightbox} margin={2} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map(x => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );

}

function App() {
  return (
    <Router>
      <nav style={{ backgroundColor: "lightblue",height:35,fontSize:22 }}>
      <Link to="/">Home</Link>
      {" | "}
        <Link to="/">Gallery</Link>
        {" | "}
        <Link to="launch">Details</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="launch" element={<Launch />}>
          <Route path="/" element={<LaunchIndex />}></Route>
          <Route path=":key" element={<LaunchShoe />}></Route>
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
