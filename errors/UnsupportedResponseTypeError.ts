import { IOAuthErrorProperties, OAuthError } from "./OAuthError";

/**
 * The authorization server does not support obtaining an
 * access token using this method.
 * 
 * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.2.1
 * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.2.2.1
 */
export class UnsupportedResponseTypeError extends OAuthError {
	constructor(
		message = "The authorization server does not support obtaining an access token using this method.",
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

		this.name = "unsupported_response_type";
	}
}

export default UnsupportedResponseTypeError;
