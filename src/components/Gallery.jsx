import GalleryFilter from "./GalleryFilter";
import FileUploader from "./FileUploader";
import LightBox from "./LightBox";
import PhotoGallery from "./PhotoGallery";
import Picture from "./Picture";
import GalleryPredefinedFilters from "./GalleryPredefinedFilters";
import beadyEyes from "../assets/beady-eyes.png";
import { listImages } from "./../solid-backend/SolidCalls";
import { useEffect, useState } from "react";
import {getDefaultSession} from "@inrupt/solid-client-authn-browser";

const data = {
  src: beadyEyes,
  alt: "Beady Eyes",
  key: -1,
  desc: "",
};

// TODO: split into smaller components; keep this clean and pure!
// MAYBE show the upload button in the center IF no images uploaded yet
// MAYBE show the upload button as floating button in the corner?
const Gallery = () => {
  const [images, setImages] = useState([]);
  useEffect(() => {
      const session = getDefaultSession()
    const images = listImages(100000, {}, {
        fetch:session.fetch,
        webid: session.info.webId
    });
    setImages([data]);
    // setImages(images); // FIXME
  }, []);

  const lightboxes = () =>
    // TODO add key (filename?)
    images.map((img) => {
      console.log(img);
      return (
        <LightBox className="bg-white p-2 w-36" key={img.key} data={img}>
          <Picture data={img} />
        </LightBox>
      );
    });

  return (
    <div className="bg-green-200">
      <p className="">Gallery</p>
      <FileUploader />
      <PhotoGallery />
      <GalleryFilter />
      <GalleryPredefinedFilters />
      <div className="flex flex-row flex-wrap gap-2 bg-yellow-200">
        {lightboxes()}
      </div>
    </div>
  );
};

export default Gallery;
