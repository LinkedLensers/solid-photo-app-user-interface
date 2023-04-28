import {useFilePicker} from "use-file-picker";
import React from "react";
//import { addImages } from "SolidCalls";
import {getDefaultSession} from "@inrupt/solid-client-authn-browser";
import {UrlRoutes} from "../solid-backend/Util";
import {addImage, addImages} from "../solid-backend";
import ExifReader from "exifreader"
const FileUploader = () => {
    /**
     * Upload images (to the Solid backend)
     */
    const upload = (data) => {
        console.log("uploaded successfully");
        console.log(data);

        // upload to solid
        const session = getDefaultSession();

        const images = []
        for (let i = 0; i < data.filesContent.length; i++) {
            images.push(
                {plainFile: data.plainFiles[i], fileContent: data.filesContent[i]},
            )
        }
        // ExifReader.load(data.plainFiles[0], {includeUnknown: true, expanded: true}).then(async (tags) => {
        //     console.log(Object.keys(tags));
        //     console.log(tags['exif'])
        //     console.log(tags['file'])
        // })
        addImages(images, {fetch: session.fetch, webid: session.info.webId}).then(solidImages => {
            for (const solidImage of solidImages) {
                // log location
                // console.log(solidImage.imageURL)
            }
            window.location.reload() // Note: this is not performant at all
        })
    };

    /**
     * Select files
     * - uses https://github.com/Jaaneek/useFilePicker
     */
    const [openFileSelector, {filesContent, loading, errors}] = useFilePicker({
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

    // TODO error handling when upload fails?
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
            <br/>
            {filesContent.map((file, index) => (
                <div key={index}>
                    <h2>{file.name}</h2>
                    {/* <img alt={file.name} src={file.content}></img> */}
                </div>
            ))}
        </div>
    );
};

export default FileUploader;
