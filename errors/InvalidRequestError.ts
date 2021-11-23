import { IOAuthErrorProperties, OAuthError } from "./OAuthError";

/**
 * The request is missing a required parameter, includes an
 * unsupported parameter value (other than grant type),
 * repeats a parameter, includes multiple credentials,
 * utilizes more than one mechanism for authenticating the
 * client, or is otherwise malformed.
 * 
 * @see https://datatracker.ietf.org/doc/html/rfc6749#section-5.2
 * @see https://datatracker.ietf.org/doc/html/rfc6750#section-3.1
 */
export class InvalidRequestError extends OAuthError {
	constructor(
		message = "The request is missing a required parameter, includes an unsupported parameter value (other than grant type), repeats a parameter, includes multiple credentials, utilizes more than one mechanism for authenticating the client, or is otherwise malformed.",
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

		this.name = "invalid_request";
	}
}

export default InvalidRequestError;
