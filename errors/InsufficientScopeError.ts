import { IOAuthErrorProperties, OAuthError } from "./OAuthError";

/**
 * The request requires higher privileges than provided by the
 * access token.  The resource server SHOULD respond with the HTTP
 * 403 (Forbidden) status code and MAY include the "scope"
 * attribute with the scope necessary to access the protected
 * resource.
 * 
 * @see https://datatracker.ietf.org/doc/html/rfc6750#section-3.1
 */
export class InsufficientScopeError extends OAuthError {
	constructor(
		message = "The request requires higher privileges than provided by the access token.",
		properties = { statusCode: "FORBIDDEN" } as IOAuthErrorProperties
	) {
		const prop: IOAuthErrorProperties = {
			statusCode: "FORBIDDEN",
			...properties
		};

		super(
			message,
			prop
		);

		this.name = "insufficient_scope";
	}
}

export default InsufficientScopeError;
