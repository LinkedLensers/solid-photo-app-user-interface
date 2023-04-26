import rdfParser from "rdf-parse";
import { storeStream } from "rdf-store-stream";
import { PIM } from "./Vocabulary";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const streamifyString = require('streamify-string');
export class UrlRoutes {
    constructor(webID) {
        this.webID = webID;
        this._storageURL = "None";
    }
    init(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield options.fetch(this.webID);
            if (response.status !== 200)
                throw Error('could net fetch WebID');
            const store = yield parseResponse(response);
            const storages = store.getQuads(this.webID, PIM.storage, null, null);
            if (storages.length < 1)
                throw Error('no storage found');
            this._storageURL = storages[0].object.value;
        });
    }
    get storageURL() {
        return this._storageURL;
    }
    get photoContainer() {
        return this.storageURL + "photos/";
    }
    get sharedContainer() {
        return this.photoContainer + "shared/";
    }
    get photoIndex() {
        return this.photoContainer + "imageIndex.ttl";
    }
}
// util function to parse response as store
export function parseResponse(response) {
    return __awaiter(this, void 0, void 0, function* () {
        const contentType = response.headers.get('content-type');
        const text = yield response.text();
        const textStream = streamifyString(text);
        const quadStream = rdfParser.parse(textStream, {
            contentType,
            baseIRI: response.url
        });
        const store = (yield storeStream(quadStream));
        return store;
    });
}
//# sourceMappingURL=Util.js.map
