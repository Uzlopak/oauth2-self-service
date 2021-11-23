import { ServerError } from "../errors";
import { validateScopeToken } from "../scope/validateScopeToken";
import { validateClientId } from "./validateClientId";
import { validateClientSecret } from "./validateClientSecret";
import { validateRedirectUri } from "./validateRedirectUri";
import type{ IClient } from "../interfaces";

export function validateClient(client: IClient) {

	if (
		typeof client !== "object" ||
		client === null
	) {
		throw new ServerError("Client is not an Object.");
	}
	/**
	  * The client type designation is based on the authorization server's
	  * definition of secure authentication and its acceptable exposure
	  * levels of client credentials.  The authorization server SHOULD NOT
	  * make assumptions about the client type.
	  * 
	  * @see https://datatracker.ietf.org/doc/html/rfc6749#section-2.1
	  */
	if (["public", "confidential"].includes(client.type) === false) {
		throw new ServerError("A Client needs a type of 'public' or 'confidential'");
	}
	/**
	 * 3.1.2.2.  Registration Requirements
	 *
	 * The authorization server MUST require the following clients to
	 * register their redirection endpoint:
	 *
	 * o  Public clients.
	 * 
	 * @see https://datatracker.ietf.org/doc/html/rfc6749#section-3.1.2.2
	 */
	if (
		client.type === "public" &&
		!client.redirectUris
	) {
		throw new ServerError("A public Client requires atleast one redirection endpoint.");
	}
	/**
	 * o  Confidential clients utilizing the implicit grant type.
	 * 
	 * @see https://datatracker.ietf.org/doc/html/rfc6749#section-3.1.2.2
	 */
	if (
		client.type === "confidential" &&
		client.grants.includes("implicit") &&
		!client.redirectUris
	) {
		throw new ServerError("A public Client requires atleast one redirection endpoint.");
	}
	/**
	 * The authorization server SHOULD require all clients to register their
	 * redirection endpoint prior to utilizing the authorization endpoint.
	 *
	 * The authorization server SHOULD require the client to provide the
	 * complete redirection URI (the client MAY use the "state" request
	 * parameter to achieve per-request customization).  If requiring the
	 * registration of the complete redirection URI is not possible, the
	 * authorization server SHOULD require the registration of the URI
	 * scheme, authority, and path (allowing the client to dynamically vary
	 * only the query component of the redirection URI when requesting
	 * authorization).
	 * 
	 * The authorization server MAY allow the client to register multiple
	 * redirection endpoints.
	 * 
	 * @see https://datatracker.ietf.org/doc/html/rfc6749#section-3.1.2.2
	 */
	if (client.redirectUris) {
		for (let i = 0, il = client.redirectUris.length; i < il; i++) {
			validateRedirectUri(client.redirectUris[i]);
		}
	}

	validateClientId(client.id);

	/**
	 * @see https://datatracker.ietf.org/doc/html/rfc6749#section-2.3.1
	 */
	if (client.type === "confidential") {
		validateClientSecret(client.secret);
	}

	if (client.scope) {
		if (typeof client.scope !== "string") {
			throw new ServerError("Scope has to be a String.");
		}
		for (let i = 0, il = client.scope.length; i < il; i++) {
			validateScopeToken(client.scope[i]);
		}
	}
}
