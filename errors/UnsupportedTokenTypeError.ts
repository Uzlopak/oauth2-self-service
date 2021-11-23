import { IOAuthErrorProperties, OAuthError } from "./OAuthError";

/**
 * The authorization server does not support
 * the revocation of the presented token type.  That is, the
 * client tried to revoke an access token on a server not
 * supporting this feature.
 * 
 * @see https://datatracker.ietf.org/doc/html/rfc7009#section-2.2.1
 */
export class UnsupportedTokenTypeError extends OAuthError {
	constructor(
		message = "The authorization server does not support the revocation of the presented token type.",
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

		this.name = "unsupported_token_type";
	}
}

export default UnsupportedTokenTypeError;
