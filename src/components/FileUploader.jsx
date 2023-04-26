import { useFilePicker } from "use-file-picker";
import React from "react";
import { addImages } from "../solid-backend/SolidCalls";

const FileUploader = () => {
  /**
   * Upload images (to the Solid backend)
   */
  const upload = (data) => {
    console.log("uploaded successfully");
    console.log(data);
    // TODO: convert to upload format?
	 // TODO: get metadata?
    addImages();
  };

  /**
   * Select files
   * - uses https://github.com/Jaaneek/useFilePicker
   */
  const [openFileSelector, { filesContent, loading, errors }] = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: true,
    //limitFilesConfig: { max: 1 },
    // minFileSize: 0.1,
    //maxFileSize: 50,
    //imageSizeRestrictions: {}
    onFilesSelected: (data) => console.log(data),
    onFilesSuccessfulySelected: (data) => upload(data),
    onFilesRejected: (data) => console.log(data),
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errors.length) {
    console.log(errors);
    return <div>Error...</div>;
  }

  // MAYBE add icon to upload button
  return (
    <div>
      <button
        className="bg-solid text-white p-2 italic font-medium"
        onClick={() => openFileSelector()}
      >
        Upload Images
      </button>
      <br />
      {filesContent.map((file, index) => (
        <div key={index}>
          <h2>{file.name}</h2>
          <img alt={file.name} src={file.content}></img>
          <br />
        </div>
      ))}
    </div>
  );
};

export default FileUploader;
