import { IOAuthErrorProperties, OAuthError } from "./OAuthError";

/**
 * The resource owner or authorization server denied the
 * request.
 * 
 * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.2.1
 * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.2.2.1
 */
export class AccessDeniedError extends OAuthError {
	constructor(
		message = "The resource owner or authorization server denied the request",
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

		this.name = "access_denied";
	}
}

export default AccessDeniedError;
