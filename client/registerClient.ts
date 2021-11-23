import { validateClient } from "./validateClient";
import model from "../model";
import { ServerError } from "../errors";
import type { IClient } from "./IClient";

/**
 * 
 * 2.  Client Registration
 * 
 * Before initiating the protocol, the client registers with the
 * authorization server.  The means through which the client registers
 * with the authorization server are beyond the scope of this
 * specification but typically involve end-user interaction with an HTML
 * registration form.
 * 
 * Client registration does not require a direct interaction between the
 * client and the authorization server.  When supported by the
 * authorization server, registration can rely on other means for
 * establishing trust and obtaining the required client properties
 * (e.g., redirection URI, client type).  For example, registration can
 * be accomplished using a self-issued or third-party-issued assertion,
 * or by the authorization server performing client discovery using a
 * trusted channel.
 * 
 * @see https://datatracker.ietf.org/doc/html/rfc6749#section-2
 */
export async function registerClient(client: IClient) {

	validateClient(client);

	const success = await model.addClient(client);

	/**
	 * 2.2.  Client Identifier
	 *
	 * The authorization server issues the registered client a client
	 * identifier -- a unique string representing the registration
	 * information provided by the client.  The client identifier is not a
	 * secret; it is exposed to the resource owner and MUST NOT be used
	 * alone for client authentication.  The client identifier is unique to
	 * the authorization server.
	 * 
	 * @see https://datatracker.ietf.org/doc/html/rfc6749#section-2.2
	 */
	if (!success) {
		throw new ServerError("A Client with specified id already exists.");
	}
}
