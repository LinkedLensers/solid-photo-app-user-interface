import {Fetch} from "./interfaces/Types";
import {Store} from "n3";
import rdfParser from "rdf-parse";
import {storeStream} from "rdf-store-stream";
import {PIM, RDF} from "./Vocabulary";

const streamifyString = require('streamify-string');

export class UrlRoutes {
    private webID: string;
    private _storageURL: string;

    public constructor(webID: string) {
        this.webID = webID
        this._storageURL = "None"
    }

    public async init(options: {
        fetch: Fetch
    }): Promise<void> {
        const response = await options.fetch(this.webID);
        if (response.status !== 200) throw Error('could net fetch WebID');
        const store = await parseResponse(response)

        const storages = store.getQuads(this.webID, PIM.storage, null, null)
        if (storages.length < 1) throw Error('no storage found')
        this._storageURL = storages[0].object.value
    }

    get storageURL(): string {
        return this._storageURL
    }

    get photoContainer(): string {
        return this.storageURL + "photos/"
    }

    get sharedContainer(): string {
        return this.photoContainer + "shared/"
    }

    get photoIndex(): string {
        return this.photoContainer + "imageIndex.ttl"
    }
}


// util function to parse response as store
export async function parseResponse(response: Response): Promise<Store> {
    const contentType = response.headers.get('content-type')

    const text = await response.text()
    const textStream = streamifyString(text);

    const quadStream = rdfParser.parse(textStream, {
        contentType,
        baseIRI: response.url
    });
    const store = (await storeStream(quadStream)) as any as Store;
    return store
}
