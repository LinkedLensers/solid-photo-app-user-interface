import { Fetch } from "./interfaces/Types";

/**
 *
 * @param options
 */
export async function initialize(options: {
    webid: string,
	fetch: Fetch
}) : Promise<void> {
    console.log('contents of webid:', options.webid)
    const response = await fetch(options.webid)
    console.log(await response.text())
}
