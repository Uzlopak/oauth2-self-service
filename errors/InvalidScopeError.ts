import { IOAuthErrorProperties, OAuthError } from "./OAuthError";

/**
 * The requested scope is invalid, unknown, malformed, or
 * exceeds the scope granted by the resource owner.
 * 
 * @see https://datatracker.ietf.org/doc/html/rfc6749#section-5.2
 */
export class InvalidScopeError extends OAuthError {
	constructor(
		message = "The requested scope is invalid, unknown, malformed, or exceeds the scope granted by the resource owner.",
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

		this.name = "invalid_scope";
	}
}

export default InvalidScopeError;
