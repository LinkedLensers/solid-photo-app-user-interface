import {Fetch} from "./interfaces/Types";
import {Quad, Store, Writer} from "n3";
import {ImageMetadata, SolidImage} from './interfaces/SolidImage'
import {UrlRoutes} from "./Util";
import * as ExifReader from 'exifreader'
import {SemanticImage} from "./ExifExtractor";
import * as url from "url";

/**
 * Extract image metadata
 * Add image to the /photos/ container
 * Add image metadata to the /photos/imageindex.ttl
 * @param image
 * @param options
 */
export async function addImage(
    image: { plainFile: any, fileContent: any }, // image
    options: {
        webid: string,
        fetch: Fetch
    }
): Promise<SolidImage> { // returns the location url + metadata
    const tags = await ExifReader.load(image.plainFile, {includeUnknown: true, expanded: true});

    // get photo URL
    const urls = new UrlRoutes(options.webid)
    await urls.init(options);

    // upload image
    const response = await options.fetch(urls.photoContainer, {
        method: "POST",
        headers: {
            'content-type': 'image/jpeg'
        },
        body: image.plainFile
    })

    const location = response.headers.get("location");

    // extract metadata
    const fileName = image.fileContent['name'].split(".").slice(0,-1).join()
    const semanticImage = new SemanticImage(tags, fileName)
    await semanticImage.build()

    const metadata: ImageMetadata = {
        createdDate: semanticImage.getDate(),
        location: semanticImage.getLocation(),
        name: fileName,
        tags: [...semanticImage.getTags()]
    }

    const solidImage: SolidImage = {
        imageURL: location,
        metadata: metadata,
        metadataRaw: new Store(semanticImage.toRdf(location)).getQuads(null, null, null, null)
    }
    await options.fetch(urls.photoIndex, {
        method: "PATCH",
        headers: {
            'content-type': 'application/sparql-update'
        },
        body: `INSERT DATA {
            ${new Writer().quadsToString(solidImage.metadataRaw)}
        }`
    })
    return solidImage
}


/**
 * For each image, add the image separately in order to the solid pod,
 * @param images
 * @param options
 */
export async function addImages(
    images: any, // list of images; uploaded in frontend
    options: {
        webid: string,
        fetch: Fetch
    }
): Promise<SolidImage[]> { // returns the location urls + metadata
    const solidImages = []
    for (const image of images) {
        const solidImage = await addImage(image, options)
        solidImages.push(solidImage)
    }
    return solidImages
}

/**
 * Receive metadata update from the front-end
 * Create a N3-patch request
 * Update the PATCH request on the metadata file
 * @param solidImage
 * @param options
 */
export async function editMetadata(
    solidImage: SolidImage,
    options: {
        fetch: Fetch
    }
): Promise<SolidImage> {
    throw Error('not implemented yet')
}

type FilterOptions = {
    imageTitle: string, // fileName if title not present
    startDate?: Date,
    endDate?: Date,
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
export async function listImages(
    amount: number,
    filterOptions: FilterOptions,
    options: {
        fetch: Fetch
    }): Promise<SolidImage[]> {
    throw Error('not implemented yet')
}

/**
 * Copy the image with a random UUID to /photos/sharing/
 * Return the link to the frontend
 * @param solidImage
 * @param options
 */
export async function shareImage(
    solidImage: SolidImage,
    options: {
        fetch: Fetch
    }): Promise<string> {// Returns the URL of a copy with public access in the sharing folder (/photos/sharing/)
    throw Error('not implemented yet')

}
