import { IOAuthErrorProperties, OAuthError } from "./OAuthError";

/**
 * The authorization grant type is not supported by the
 * authorization server.
 * 
 * @see https://datatracker.ietf.org/doc/html/rfc6749#section-5.2
 */
export class UnsupportedGrantTypeError extends OAuthError {
	constructor(
		message = "The authorization grant type is not supported by the authorization server.",
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

		this.name = "unsupported_grant_type";
	}
}

export default UnsupportedGrantTypeError;
