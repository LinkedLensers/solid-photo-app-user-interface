import { Quad } from 'rdf-data-factory';
export declare class SemanticImage implements ToRdf {
    private date;
    private location;
    private tags;
    private exifTags;
    private name;
    constructor(exifTags: any, fileName: string);
    build(): Promise<void>;
    toRdf(iri_subject: string): Quad[];
    addTags(tag: string): void;
    getDate(): Date | undefined;
    getTags(): Set<string> | undefined;
    getLocation(): GeoLocalisation | undefined;
    private extractExif;
    private formatExifDate;
}
export interface GeoLocalisation {
    longitude: number;
    latitude: number;
}
export interface ToRdf {
    toRdf(iri_subject: string): Quad[];
}
