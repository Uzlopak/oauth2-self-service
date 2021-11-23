import { IOAuthErrorProperties, OAuthError } from "./OAuthError";

/**
 * The authenticated client is not authorized to use this
 * authorization grant type.
 * 
 * @see https://datatracker.ietf.org/doc/html/rfc6749#section-5.2
 */
export class UnauthorizedClientError extends OAuthError {
	constructor(
		message = "The authenticated client is not authorized to use this authorization grant type.",
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

		this.name = "unauthorized_client";
	}
}

export default UnauthorizedClientError;
