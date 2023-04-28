import { Fetch } from "./interfaces/Types";
/**
 * 1. If no pim:storage triple -> tough luck
 * 2. Create a /photos/ container
 * 3. Create a /photos/sharing/ container
 * (optional)Add the /photos/ container to the typeindex if present; If no typeindex just skip this one
 * 4. Create an index file in the /photos/ container called imageindex.ttl (This is a hard-coded file that we know where to find.)
 * @param options
 */
export declare function initialize(options: {
    webid: string;
    fetch: Fetch;
}): Promise<void>;
