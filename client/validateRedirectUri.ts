import { URL } from "url";
import { ServerError } from "../errors";
import type { TRedirectUri } from "./TRedirectUri";

/**
 * A.6.  "redirect_uri" Syntax
 * 
 * The "redirect_uri" element is defined in Sections 4.1.1, 4.1.3,
 * and 4.2.1:
 *
 *     redirect-uri      = URI-reference
 */
export function validateRedirectUri(redirectUri: TRedirectUri) {
	try {
		const parsedUrl = new URL(redirectUri).toString();
		if (redirectUri !== parsedUrl) {
			throw new ServerError();
		}
	} catch (e) {
		throw new ServerError("Invalid redirection endpoint url.");
	}
}
