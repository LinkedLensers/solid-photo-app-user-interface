import { __awaiter } from "tslib";
import { Store, Writer } from "n3";
import { UrlRoutes } from "./Util";
import * as ExifReader from 'exifreader';
import { SemanticImage } from "./ExifExtractor";
/**
 * Extract image metadata
 * Add image to the /photos/ container
 * Add image metadata to the /photos/imageindex.ttl
 * @param image
 * @param options
 */
export function addImage(image, // image
options) {
    return __awaiter(this, void 0, void 0, function* () {
        const tags = yield ExifReader.load(image.plainFile, { includeUnknown: true, expanded: true });
        // get photo URL
        const urls = new UrlRoutes(options.webid);
        yield urls.init(options);
        // upload image
        const response = yield options.fetch(urls.photoContainer, {
            method: "POST",
            headers: {
                'content-type': 'image/jpeg'
            },
            body: image.plainFile
        });
        const location = response.headers.get("location");
        // extract metadata
        const fileName = image.fileContent['name'].split(".").slice(0, -1).join();
        const semanticImage = new SemanticImage(tags, fileName);
        yield semanticImage.build();
        const metadata = {
            createdDate: semanticImage.getDate(),
            location: semanticImage.getLocation(),
            name: fileName,
            tags: [...semanticImage.getTags()]
        };
        const solidImage = {
            imageURL: location,
            metadata: metadata,
            metadataRaw: new Store(semanticImage.toRdf(location)).getQuads(null, null, null, null)
        };
        yield options.fetch(urls.photoIndex, {
            method: "PATCH",
            headers: {
                'content-type': 'application/sparql-update'
            },
            body: `INSERT DATA {
            ${new Writer().quadsToString(solidImage.metadataRaw)}
        }`
        });
        return solidImage;
    });
}
/**
 * For each image, add the image separately in order to the solid pod,
 * @param images
 * @param options
 */
export function addImages(images, // list of images; uploaded in frontend
options) {
    return __awaiter(this, void 0, void 0, function* () {
        const solidImages = [];
        for (const image of images) {
            const solidImage = yield addImage(image, options);
            solidImages.push(solidImage);
        }
        return solidImages;
    });
}
/**
 * Receive metadata update from the front-end
 * Create a N3-patch request
 * Update the PATCH request on the metadata file
 * @param solidImage
 * @param options
 */
export function editMetadata(solidImage, options) {
    return __awaiter(this, void 0, void 0, function* () {
        throw Error('not implemented yet');
    });
}
/**
 * Fetch /photos/imageindex.ttl
 * For every possible filter, we have a mapping to a FILTER statement for the SPARQL query
 * Query the /photos/imageindex.ttl file with a default SPARQL query with the added filter statements
 * Sort the images on their date
 * return the list of SolidImages (which have the urls of the filtered images)
 *
 * @param amount
 * @param filterOptions
 * @param options
 */
export function listImages(amount, filterOptions, options) {
    return __awaiter(this, void 0, void 0, function* () {
        throw Error('not implemented yet');
    });
}
/**
 * Copy the image with a random UUID to /photos/sharing/
 * Return the link to the frontend
 * @param solidImage
 * @param options
 */
export function shareImage(solidImage, options) {
    return __awaiter(this, void 0, void 0, function* () {
        throw Error('not implemented yet');
    });
}
//# sourceMappingURL=SolidCalls.js.map