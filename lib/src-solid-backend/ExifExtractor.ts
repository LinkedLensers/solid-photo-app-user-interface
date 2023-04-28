import * as RDF from '@rdfjs/types'

import {DataFactory, Quad} from 'rdf-data-factory';
import {Quad as n3Quad} from 'n3'

const factory: RDF.DataFactory = new DataFactory();

export class SemanticImage implements ToRdf {
    private date: Date | undefined;
    private location: GeoLocalisation | undefined;
    private tags: Set<string> = new Set();
    private exifTags: any;
    private name: string;

    public constructor(exifTags: any, fileName: string) {
        this.exifTags = exifTags;
        this.name = fileName;
    }

    public async build() {
        await this.extractExif()
    }

    public toRdf(iri_subject: string): Quad[] {
        const rdfDescription: Quad[] = [];
        const subject = factory.namedNode(iri_subject);
        const imagesType = factory.quad(subject, factory.namedNode(Vocabulary.Type), factory.namedNode(Vocabulary.Image));
        rdfDescription.push(imagesType);
        if (this.date) {
            const datePublication = factory.quad(subject, factory.namedNode(Vocabulary.Date),
                factory.literal(this.date.toISOString(),
                    factory.namedNode(Vocabulary.DateTime)));
            rdfDescription.push(datePublication);

        }

        if (this.location) {
            const latitude = factory.quad(subject, factory.namedNode(Vocabulary.Latitude),
                factory.literal(this.location.latitude.toString(),
                    factory.namedNode(Vocabulary.Double)));
            rdfDescription.push(latitude);

            const longitude = factory.quad(subject, factory.namedNode(Vocabulary.Longitude),
                factory.literal(this.location.longitude.toString(),
                    factory.namedNode(Vocabulary.Double)));
            rdfDescription.push(longitude);
            // wkt string
            const geowkt = factory.quad(subject, factory.namedNode('http://example.org/location'),
                factory.literal(`POINT (${this.location.longitude.toString()} ${this.location.latitude.toString()})`,
                    factory.namedNode('http://www.opengis.net/ont/geosparql#wktLiteral')));
            rdfDescription.push(geowkt);
        }

        const name = factory.quad(subject, factory.namedNode('http://example.org/name'),
            factory.literal(this.name));
        rdfDescription.push(name);
        return rdfDescription;
    }

    public addTags(tag: string) {
        this.tags.add(tag);
    }

    public getDate(): Date | undefined {
        return this.date;
    }

    public getTags(): Set<string> | undefined {
        return this.tags;
    }

    public getLocation(): GeoLocalisation | undefined {
        return this.location;
    }

    private async extractExif() {
        const tags = this.exifTags

        if (tags) {
            const exif = tags['exif'];
            console.log(exif)
            console.log(tags['gps'])
            if (exif && exif['DateTimeOriginal']) {
                this.date = new Date(this.formatExifDate(exif.DateTimeOriginal.value[0]));
            } else {
                console.warn("There is no data available");
            }
            if (tags['gps']) {
                this.location = {
                    longitude: tags['gps']['Longitude'],
                    latitude: tags['gps']['Latitude'],
                };
            } else {
                console.warn("There is no location available");
            }
        }
    }

    private formatExifDate(date: string): Date {
        date = date.replace(' ', "T");
        for (let i = 0; i < 2; i++) {
            date = date.replace(':', '-')
        }
        return new Date(date);
    }

}

export interface GeoLocalisation {
    longitude: number,
    latitude: number,
}

export interface ToRdf {
    toRdf(iri_subject: string): Quad[]
}

enum Vocabulary {
    Image = "http://xmlns.com/foaf/0.1/Image",
    Type = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
    Date = "http://purl.org/dc/terms/date",
    Latitude = "http://www.w3.org/2003/01/geo/wgs84_pos#lat",
    Longitude = "http://www.w3.org/2003/01/geo/wgs84_pos#long",
    DateTime = "http://www.w3.org/TR/xmlschema-2/#dateTime",
    Double = "http://www.w3.org/TR/xmlschema-2/#double",
}
