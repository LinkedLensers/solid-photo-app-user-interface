import * as React from "react";
import beadyEyes from "../assets/beady-eyes.png";

import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";

export default function PhotoGallery() {
  const [index, setIndex] = React.useState(-1);

  // FIXME
  const photo = (i) => ({ key: { i }, src: beadyEyes, width: 400, height: 400 })
  const photos = () => [...Array(7)].map((e, i) => photo(i));

  return (
    <>
      <PhotoAlbum
        layout="rows"
        photos={photos}
        targetRowHeight={150}
        onClick={({ index }) => setIndex(index)}
      />

      <Lightbox open={index >= 0} index={index} close={() => setIndex(-1)} />
    </>
  );
}
