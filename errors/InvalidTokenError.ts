import { IOAuthErrorProperties, OAuthError } from "./OAuthError";

/**
 * The access token provided is expired, revoked, malformed, or
 * invalid for other reasons.  The resource SHOULD respond with
 * the HTTP 401 (Unauthorized) status code.  The client MAY
 * request a new access token and retry the protected resource
 * request.
 *
 * @see https://datatracker.ietf.org/doc/html/rfc6750#section-3.1
 */
export class InvalidTokenError extends OAuthError {
	constructor(
		message = "The access token provided is expired, revoked, malformed, or invalid for other reasons.",
		properties = { statusCode: "UNAUTHORIZED" } as IOAuthErrorProperties
	) {
		const prop: IOAuthErrorProperties = {
			statusCode: "UNAUTHORIZED",
			...properties
		};

		super(
			message,
			prop
		);

		this.name = "invalid_token";
	}
}

export default InvalidTokenError;
