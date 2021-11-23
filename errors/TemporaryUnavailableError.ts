import { IOAuthErrorProperties, OAuthError } from "./OAuthError";

/**
 * The authorization server is currently unable to handle
 * the request due to a temporary overloading or maintenance
 * of the server.  (This error code is needed because a 503
 * Service Unavailable HTTP status code cannot be returned
 * to the client via an HTTP redirect.)
 * 
 * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.2.1
 * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.2.2.1
 */
export class TemporaryUnavailableError extends OAuthError {
	constructor(
		message = "The authorization server is currently unable to handle the request due to a temporary overloading or maintenance of the server.",
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

		this.name = "temporary_unavailable";
	}
}

export default TemporaryUnavailableError;
