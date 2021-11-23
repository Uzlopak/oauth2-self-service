import HttpStatusCode from "../utils/HttpStatusCode";
import { nqchar, uri, vschar } from "../utils/Validation";

export interface IOAuthErrorProperties {
	statusCode?: keyof typeof HttpStatusCode;
	state?: string;
	error_uri?: string;
}

type TOAuthError =
	"insufficient_scope" |
	"invalid_token" |
	"invalid_client" |
	"invalid_grant" |
	"invalid_request" |
	"unauthorized_client" |
	"access_denied" |
	"unsupported_response_type" |
	"unsupported_grant_type" |
	"invalid_scope" |
	"server_error" |
	"temporarily_unavailable" |
	"unsupported_token_type" |
	"temporary_unavailable" |
	"mfa_required";

export class OAuthError extends Error {

	name: TOAuthError;

	statusCode: number;

	/**
	 * OPTIONAL.  Human-readable ASCII [USASCII] text providing
	 * additional information, used to assist the client developer in
	 * understanding the error that occurred.
	 * 
	 * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.2.1
	 * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.2.2.1
	 */

	error_description?: string;

	/**
	 * REQUIRED if a "state" parameter was present in the client
	 * authorization request.  The exact value received from the
	 * client.
	 * 
	 * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.2.1
	 * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.2.2.1
	 */
	state?: string;

	/**
	 * OPTIONAL.  A URI identifying a human-readable web page with
	 * information about the error, used to provide the client
	 * developer with additional information about the error.
	 * Values for the "error_uri" parameter MUST conform to the
	 * URI-reference syntax and thus MUST NOT include characters
	 * outside the set %x21 / %x23-5B / %x5D-7E.
	 * 
	 * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.2.1
	 * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.2.2.1
	 */
	error_uri?: string;

	constructor(message: string, properties = {} as IOAuthErrorProperties) {
		super(message);
		this.name = "server_error";
		this.statusCode = HttpStatusCode[properties.statusCode || "INTERNAL_SERVER_ERROR"];

		/**
		 * The "error_description" element is defined in Sections 4.1.2.1,
		 * 4.2.2.1, 5.2, and 7.2: 
		 * 
		 * error-description = 1*NQSCHAR
		 * 
		 * @see https://datatracker.ietf.org/doc/html/rfc6749#appendix-A.8
		 */
		this.error_description = nqchar(this.message) ? this.message : "";

		/**
		 * The "error_uri" element is defined in Sections 4.1.2.1,
		 * 4.2.2.1, 5.2, and 7.2: 
		 * 
		 * error-uri = URI-Reference
		 * 
		 * @see https://datatracker.ietf.org/doc/html/rfc6749#appendix-A.9
		 */
		this.error_uri = properties.error_uri && uri(properties.error_uri) ? properties.error_uri : "";

		/**
		 * The "state" element is defined in Sections 4.1.1, 4.1.2, 4.1.2.1,
		 * 4.2.1, 4.2.2, and 4.2.2.1:
		 * 
		 * state      = 1*VSCHAR
		 * 
		 * @see https://datatracker.ietf.org/doc/html/rfc6749#appendix-A.5
		 */
		this.state = properties.state && vschar(properties.state) ? properties.state : undefined;

		Error.captureStackTrace(
			this,
			OAuthError
		);

	}
}

export default OAuthError;
