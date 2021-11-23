import { IOAuthErrorProperties, OAuthError } from "./OAuthError";

/**
 * The provided authorization grant (e.g., authorization
 * code, resource owner credentials) or refresh token is
 * invalid, expired, revoked, does not match the redirection
 * URI used in the authorization request, or was issued to
 * another client.
 * 
 * @see https://datatracker.ietf.org/doc/html/rfc6749#section-5.2
 */
export class InvalidGrantError extends OAuthError {
	constructor(
		message = "The provided authorization grant (e.g., authorization code, resource owner credentials) or refresh token is invalid, expired, revoked, does not match the redirection URI used in the authorization request, or was issued to another client.",
		properties = { statusCode: "BAD_REQUEST" } as IOAuthErrorProperties
	) {
		const prop: IOAuthErrorProperties = {
			statusCode: "BAD_REQUEST",
			...properties
		};

		super(
			message,
			prop
		);

		this.name = "invalid_grant";
	}
}

export default InvalidGrantError;
