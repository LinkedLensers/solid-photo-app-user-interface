var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        throw Error('not implemented yet');
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
        throw Error('not implemented yet');
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