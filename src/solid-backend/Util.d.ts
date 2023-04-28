import { Fetch } from "./interfaces/Types";
import { Store } from "n3";
export declare class UrlRoutes {
    private webID;
    private _storageURL;
    constructor(webID: string);
    init(options: {
        fetch: Fetch;
    }): Promise<void>;
    get storageURL(): string;
    get photoContainer(): string;
    get sharedContainer(): string;
    get photoIndex(): string;
}
export declare function parseResponse(response: Response): Promise<Store>;
