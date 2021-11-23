import { compare, hash } from "bcrypt";
import { IClient } from "../client/IClient";
import { IUser } from "../interfaces/IUser";
import generateRandomToken from "../utils/generateRandomToken";
import { IAccessToken, IAuthorizationCode, IModel, IRefreshToken } from "../interfaces";
import { accessTokenSigner } from "../jwt/accessTokenSigner";

const authorizationCodeMap: Map<string, IAuthorizationCode> = new Map();
const clientMap: Map<string, IClient> = new Map();
const accessTokenMap: Map<string, IAccessToken> = new Map();
const refreshTokenMap: Map<string, IRefreshToken> = new Map();
const userMap: Map<string, IUser> = new Map();

if (process.env.NODE_ENV === "production") {
	console.error("This model is not designed to be used in production. Terminating for security.");
	process.exit(1);
}

export const InMemoryModel: IModel = {
	addUser: async (user) => {
		const email = user.email.toLowerCase().trim();
		if (userMap.has(email)) {
			throw new Error("User already exists");
		}
		user.password = await hash(user.password, Number(process.env.BCRYPT_SALT_WORK_FACTOR) || 12);
		userMap.set(email, user);
	},
	getAccessToken: async (accessToken) => {
		return accessTokenMap.get(accessToken)!;
	},
	getAuthorizationCode: async (authorizationCode) => {
		return authorizationCodeMap.get(authorizationCode);
	},
	getClient: async (clientId) => {
		return clientMap.get(clientId);
	},
	addClient: async (client) => {
		if (clientMap.has(client.id)) {
			return 0;
		}
		clientMap.set(client.id, client);
		return 1;
	},
	revokeAuthorizationCode: async (code) => {
		return authorizationCodeMap.delete(code.authorizationCode);
	},
	// @ts-ignore
	saveAuthorizationCode: async (client, user, code) => {
		authorizationCodeMap.set(code.authorizationCode, code);

		if (code.expiresAt) {
			setTimeout(function () { authorizationCodeMap.delete(code.authorizationCode!); }, (code.expiresAt.getTime() - Date.now()));
		}
		return code;
	},
	revokeRefreshToken: async (refreshToken) => {
		return refreshTokenMap.delete(refreshToken.id);
	},
	// @ts-ignore
	generateAccessToken: async (client, user, scope) => {
		return await accessTokenSigner({
			id: user.id,
			scope,
		});
	},
	// @ts-ignore
	generateRefreshToken: async (client, user, scope) => {
		return generateRandomToken(32);
	},
	// @ts-ignore
	generateAuthorizationCode: async (client, user, scope) => {
		return generateRandomToken(32);
	},
	getRefreshToken: async (refreshToken) => {
		return refreshTokenMap.get(refreshToken);
	},
	getUser: async (username, password) => {
		const user = userMap.get(username);
		return (
			(user && await compare(password, user.password))
				? user
				: undefined
		);
	},
	// @ts-ignore
	saveAccessToken: async (client, user, token) => {
		accessTokenMap.set(token.id, token);
	},
	// @ts-ignore
	saveRefreshToken: async (client, user, token) => {
		refreshTokenMap.set(token.id, token);
	},
	// @ts-ignore
	updateRefreshToken: async (client, user, token) => {
		refreshTokenMap.set(token.id, token);
		return true;
	}
};

export function clear() {
	userMap.clear();
	clientMap.clear();
	authorizationCodeMap.clear();
	accessTokenMap.clear();
	refreshTokenMap.clear();
}

export default InMemoryModel;
