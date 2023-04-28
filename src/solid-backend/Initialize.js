import { __awaiter } from "tslib";
import { UrlRoutes } from "./Util";
/**
 * 1. If no pim:storage triple -> tough luck
 * 2. Create a /photos/ container
 * 3. Create a /photos/sharing/ container
 * (optional)Add the /photos/ container to the typeindex if present; If no typeindex just skip this one
 * 4. Create an index file in the /photos/ container called imageindex.ttl (This is a hard-coded file that we know where to find.)
 * @param options
 */
export function initialize(options) {
    return __awaiter(this, void 0, void 0, function* () {
        // get storage id
        const urls = new UrlRoutes(options.webid);
        yield urls.init(options);
        const photoContainerExists = yield options.fetch(urls.photoContainer, {
            method: "HEAD"
        });
        if (photoContainerExists.status === 200)
            return;
        const photoContainerResponse = yield options.fetch(urls.photoContainer, {
            method: "PUT",
            headers: { 'Content-type': 'text/turtle' }
        });
        const sharedContainerResponse = yield options.fetch(urls.sharedContainer, {
            method: "PUT",
            headers: { 'Content-type': 'text/turtle' }
        });
        const indexCreated = yield options.fetch(urls.photoIndex, {
            method: "PUT",
            headers: { 'Content-type': 'text/turtle' }
        });
    });
}
//# sourceMappingURL=Initialize.js.map