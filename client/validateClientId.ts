import { ServerError } from "../errors";
import { vschar } from "../utils/Validation";
import type { IClient } from "../interfaces";

/**
 * A.1.  "client_id" Syntax
 *
 * The "client_id" element is defined in Section 2.3.1:
 *
 *    client-id     = *VSCHAR
 * 
 * @see https://datatracker.ietf.org/doc/html/rfc6749#appendix-A.1
 */
export function validateClientId(clientId: IClient["id"]) {
	if (!vschar(clientId)) {
		throw new ServerError("Invalid Client id.");
	}
}
