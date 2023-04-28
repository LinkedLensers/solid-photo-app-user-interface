import { __awaiter } from "tslib";
import { DataFactory } from 'rdf-data-factory';
const factory = new DataFactory();
export class SemanticImage {
    constructor(exifTags, fileName) {
        this.tags = new Set();
        this.exifTags = exifTags;
        this.name = fileName;
    }
    build() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.extractExif();
        });
    }
    toRdf(iri_subject) {
        const rdfDescription = [];
        const subject = factory.namedNode(iri_subject);
        const imagesType = factory.quad(subject, factory.namedNode(Vocabulary.Type), factory.namedNode(Vocabulary.Image));
        rdfDescription.push(imagesType);
        if (this.date) {
            const datePublication = factory.quad(subject, factory.namedNode(Vocabulary.Date), factory.literal(this.date.toString(), factory.namedNode(Vocabulary.DateTime)));
            rdfDescription.push(datePublication);
        }
        if (this.location) {
            const latitude = factory.quad(subject, factory.namedNode(Vocabulary.Latitude), factory.literal(this.location.latitude.toString(), factory.namedNode(Vocabulary.Double)));
            rdfDescription.push(latitude);
            const longitude = factory.quad(subject, factory.namedNode(Vocabulary.Longitude), factory.literal(this.location.longitude.toString(), factory.namedNode(Vocabulary.Double)));
            rdfDescription.push(longitude);
            // wkt string
            const geowkt = factory.quad(subject, factory.namedNode('http://example.org/location'), factory.literal(`POINT (${this.location.longitude.toString()} ${this.location.latitude.toString()})`, factory.namedNode('http://www.opengis.net/ont/geosparql#wktLiteral')));
            rdfDescription.push(geowkt);
        }
        return rdfDescription;
    }
    addTags(tag) {
        this.tags.add(tag);
    }
    getDate() {
        return this.date;
    }
    getTags() {
        return this.tags;
    }
    getLocation() {
        return this.location;
    }
    extractExif() {
        return __awaiter(this, void 0, void 0, function* () {
            const tags = this.exifTags;
            if (tags) {
                const exif = tags['exif'];
                console.log(exif);
                console.log(tags['gps']);
                if (exif && exif['DateTimeOriginal']) {
                    this.date = new Date(this.formatExifDate(exif.DateTimeOriginal.value[0]));
                }
                else {
                    console.warn("There is no data available");
                }
                if (tags['gps']) {
                    this.location = {
                        longitude: tags['gps']['Longitude'],
                        latitude: tags['gps']['Latitude'],
                    };
                }
                else {
                    console.warn("There is no location available");
                }
            }
        });
    }
    formatExifDate(date) {
        date = date.replace(' ', "T");
        for (let i = 0; i < 2; i++) {
            date = date.replace(':', '-');
        }
        return new Date(date);
    }
}
var Vocabulary;
(function (Vocabulary) {
    Vocabulary["Image"] = "http://xmlns.com/foaf/0.1/Image";
    Vocabulary["Type"] = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";
    Vocabulary["Date"] = "http://purl.org/dc/terms/date";
    Vocabulary["Latitude"] = "http://www.w3.org/2003/01/geo/wgs84_pos#lat";
    Vocabulary["Longitude"] = "http://www.w3.org/2003/01/geo/wgs84_pos#long";
    Vocabulary["DateTime"] = "http://www.w3.org/TR/xmlschema-2/#dateTime";
    Vocabulary["Double"] = "http://www.w3.org/TR/xmlschema-2/#double";
})(Vocabulary || (Vocabulary = {}));
//# sourceMappingURL=ExifExtractor.js.map