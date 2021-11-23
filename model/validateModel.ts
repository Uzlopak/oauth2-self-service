import { ServerError } from "../errors";
import { IModel } from "../interfaces";

export function validateModel(model: IModel) {

	const methods: (keyof IModel)[] = [
		"generateAccessToken",
		"generateAuthorizationCode",
		"getAccessToken",
		"getAuthorizationCode",
		"addClient",
		"getClient",
		"getRefreshToken",
		"addUser",
		"getUser",
		"revokeAuthorizationCode",
		"revokeRefreshToken",
		"saveAuthorizationCode",
	];

	for (let i = 0, il = methods.length; i < il; i++) {
		if (!model[methods[i]]) {
			throw new ServerError(`Invalid argument: model does not implement '${methods[i]}'`);
		}
	}
}
