import {Fetch} from "./interfaces/Types";
import {UrlRoutes} from "./Util";

/**
 * 1. If no pim:storage triple -> tough luck
 * 2. Create a /photos/ container
 * 3. Create a /photos/sharing/ container
 * (optional)Add the /photos/ container to the typeindex if present; If no typeindex just skip this one
 * 4. Create an index file in the /photos/ container called imageindex.ttl (This is a hard-coded file that we know where to find.)
 * @param options
 */
export async function initialize(options: {
    webid: string,
    fetch: Fetch
}): Promise<void> {
    // get storage id
    const urls = new UrlRoutes(options.webid)
    await urls.init(options);

    const photoContainerExists = await options.fetch(urls.photoContainer, {
        method: "HEAD"
    })

    if (photoContainerExists.status === 200) return

    const photoContainerResponse = await options.fetch(urls.photoContainer, {
        method: "PUT",
        headers: {'Content-type': 'text/turtle'}
    })


    const sharedContainerResponse = await options.fetch(urls.sharedContainer, {
        method: "PUT",
        headers: {'Content-type': 'text/turtle'}
    })

    const indexCreated = await options.fetch(urls.photoIndex, {
        method: "PUT",
        headers: {'Content-type': 'text/turtle'}
    })



}

