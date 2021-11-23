import { InvalidClientError } from "../errors";
import { vschar } from "../utils/Validation";
import type { IClient } from "../interfaces";

/**
 * A.2.  "client_secret" Syntax
 *
 * The "client_secret" element is defined in Section 2.3.1:
 *
 *   client-secret = *VSCHAR
 * 
 * @see https://datatracker.ietf.org/doc/html/rfc6749#appendix-A.2
 */
export function validateClientSecret(clientSecret: Required<IClient>["secret"]) {
	if (!vschar(clientSecret)) {
		throw new InvalidClientError("Invalid Client secret.");
	}
}
