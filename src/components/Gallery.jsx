import { useState } from "react";
import GalleryFilter from "./GalleryFilter";
import FileUploader from "./FileUploader";
import Picture from "./Picture";
import GalleryPredefinedFilters from "./GalleryPredefinedFilters";

const n = 6; // number of images to show (Debug)

// TODO: split into smaller components; keep this clean and pure!
// MAYBE show the upload button in the center IF no images uploaded yet
// MAYBE show the upload button as floating button in the corner?

const Gallery = () => {
  const imageList = (
    <div className="flex flex-row flex-wrap gap-2 bg-yellow-200">
      {
        // TEST create element n times
        // https://stackoverflow.com/questions/34189370/how-to-repeat-an-element-n-times-using-jsx-and-lodash
        // TODO pass image props?
        [...Array(n)].map((e, i) => (
          <Picture data={null} id={i} key={i} />
        ))
      }
    </div>
  );

  return (
    <div className="bg-green-200">
      <p className="">Gallery</p>
      <FileUploader />
      <GalleryFilter />
      <GalleryPredefinedFilters />
      {imageList}
    </div>
  );
};

export default Gallery;
