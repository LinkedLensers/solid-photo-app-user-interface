import { useState } from "react";
import beadyEyes from "../assets/beady-eyes.png";
import Button from "./_Button";

const n = 6; // number of images to show (Debug)

// TODO: split into smaller components; keep this clean and pure!

const Gallery = () => {
  const [filesUploaded, setFilesUploaded] = useState(false);

  // TODO: filepicker/upload
  // no images : show the upload button in the center
  // images : show the upload button as floating button in the corner?
  const uploadFiles = () => {
    setFilesUploaded(true);
    console.log("uploadFiles clicked");
  };

    // TODO: pass data: img + description
  const showImageDetails = () => {
    alert("test");
  };

  const img = (
    <div className="bg-white p-2 w-36" onClick={showImageDetails}>
      <picture className="aspect-square">
        <img src={beadyEyes} alt="" />
      </picture>
    </div>
  );

  const imageList = (
    <div className="flex flex-row flex-wrap gap-2 bg-yellow-200">
      {
        // create element n times
        // https://stackoverflow.com/questions/34189370/how-to-repeat-an-element-n-times-using-jsx-and-lodash
        [...Array(n)].map((e, i) => img)
      }
    </div>
  );

  return (
    <div className="bg-green-200">
      <p className="">Gallery</p>
      <Button
        click={uploadFiles}
        style="bg-solid text-white p-2 m-2 italic font-medium"
        name="Upload Images"
      />
      {
        /* List of images, dummy: only show after upload */
        filesUploaded ? imageList : null
      }
    </div>
  );
};

export default Gallery;
