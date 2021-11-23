import { IOAuthErrorProperties, OAuthError } from "./OAuthError";

export class MFARequiredError extends OAuthError {

	constructor(
		message = "mfa_required",
		properties = { statusCode: "UNPROCESSABLE_ENTITY" } as IOAuthErrorProperties
	) {
		const prop: IOAuthErrorProperties = {
			statusCode: "UNPROCESSABLE_ENTITY",
			...properties
		};

		super(
			message,
			prop
		);

		this.name = "mfa_required";
	}
}

export default MFARequiredError;
