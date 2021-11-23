import { IOAuthErrorProperties, OAuthError } from "./OAuthError";

/**
 * The authorization server encountered an unexpected
 * condition that prevented it from fulfilling the request.
 * (This error code is needed because a 500 Internal Server
 * Error HTTP status code cannot be returned to the client
 * via an HTTP redirect.)
 * 
 * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.2.1
 * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.2.2.1
 */
export class ServerError extends OAuthError {
	constructor(
		message = "The authorization server encountered an unexpected condition that prevented it from fulfilling the request.",
		properties = { statusCode: "INTERNAL_SERVER_ERROR" } as IOAuthErrorProperties
	) {
		const prop: IOAuthErrorProperties = {
			statusCode: "INTERNAL_SERVER_ERROR",
			...properties
		};

		super(
			message,
			prop
		);

		this.name = "server_error";
	}
}

export default ServerError;
