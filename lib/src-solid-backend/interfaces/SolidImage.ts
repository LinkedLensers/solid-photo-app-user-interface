import { Quad } from "n3";

export type SolidImage = {
    /**
     * The URL of the image.
     */
    imageURL: string
    /**
     * The metadata RDF graph that corresponds with the image, represented as an array of Quads.
     */
    metadataRaw: Quad[]
    /**
     * The metadata of the image, but now in a format that is easier to work with in the frontend.
     */
    metadata: ImageMetadata
}

export type ImageMetadata = {
    /**
     * The name that must be displayed in the frontend.
     * 
     * If none is given, this corresponds to the name of the image (before the file extension).
     */
    name: string
    /**
     * The created data of the image.
     * 
     * Corresponds to DateTimeOriginal, DateTimeDigitized or DateTime of the {@link https://www.media.mit.edu/pia/Research/deepview/exif.html Exif Standard}.
     * They should all correspond to the same value.
     */
    createdDate?: Date
    /**
     * The date when the metadata has been last updated.
     */
    editedDate?: Date
    /**
     * The creator if the image
     */
    author?: string
    /**
     * Custom user added tags of the image.
     */
    tags?: string[]
    /**
     * The geographic location of where the image was taken.
     */
    location?: Coordinate
    /**
     * The description of the image.
     */
    description?: string
}
/**
 * Coordinates according to the geographic coordinate system (GCS).
 * Contains latitude and longitude.
 * Might contain elevation.
 */
export type Coordinate = {
    /**
     * Latitude in decimal degrees. (e.g. 51.5634, which equals 51°33'48.24"N)
     * 
     * {@link https://en.wikipedia.org/wiki/Latitude Definition}: The coordinate that specifies the north–south position of a point on the surface of the Earth. 
     */
    latitude: number,
    /**
     * Longitude in decimal degrees. (e.g. 51.5634, which equals 51°33'48.24"E)
     * 
     * {@link https://en.wikipedia.org/wiki/Longitude Definition}: The coordinate that specifies the east–west position of a point on the surface of the Earth. 
     */
    longitude: number,
    /**
     * The heigh above the sea level in meters.
     * 
     * {@link https://en.wikipedia.org/wiki/Elevation Definition}
     */
    elevation: number
}