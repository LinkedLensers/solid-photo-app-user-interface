import GalleryFilter from "./GalleryFilter";
import FileUploader from "./FileUploader";
import LightBox from "./LightBox";
import PhotoGallery from "./PhotoGallery";
import Picture from "./Picture";
import GalleryPredefinedFilters from "./GalleryPredefinedFilters";
import beadyEyes from "../assets/beady-eyes.png";

const n = 6; // number of images to show (Debug)

// TODO: split into smaller components; keep this clean and pure!
// MAYBE show the upload button in the center IF no images uploaded yet
// MAYBE show the upload button as floating button in the corner?

const Gallery = () => {
  // TODO get from Solid backend
  const data = {
    src: beadyEyes,
    alt: "Beady Eyes",
    key: -1,
  };

  const imageList = (
    <div className="flex flex-row flex-wrap gap-2 bg-yellow-200">
      {
        // TEST create element n times
        // https://stackoverflow.com/questions/34189370/how-to-repeat-an-element-n-times-using-jsx-and-lodash
        // TODO: DRY! (don't pass data twice? pass to children instead?)
        // FIXME no idea what I am doing with the destructuring assignment :))
        [...Array(n)].map((e, i) => (
          <LightBox
            className="bg-white p-2 w-36"
            data={{ key: i, ...data }}
            key={i}
          >
            <Picture data={{ key: i, ...data }} />
          </LightBox>
        ))
      }
    </div>
  );

  return (
    <div className="bg-green-200">
      <p className="">Gallery</p>
      <FileUploader />
      <PhotoGallery />
      <GalleryFilter />
      <GalleryPredefinedFilters />
      {imageList}
    </div>
  );
};

export default Gallery;
