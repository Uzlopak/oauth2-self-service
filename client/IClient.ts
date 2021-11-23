import type { TGrantType } from "../interfaces";
import type { TRedirectUri } from "./TRedirectUri";

export type IClient =
	{
		id: string;
		scope: string;
		accessTokenLifetime?: number;
		refreshTokenLifetime?: number;
		authorizationCodeLifetime?: number;
	} &
	(
		/**
		 * 2.1.  Client Types
		 * 
		 * OAuth defines two client types, based on their ability to
		 * authenticate securely with the authorization server (i.e., ability to
		 * maintain the confidentiality of their client credentials):
		 * 
		 *    confidential
		 *        Clients capable of maintaining the confidentiality of their
		 *        credentials (e.g., client implemented on a secure server with
		 *        restricted access to the client credentials), or capable of secure
		 *        client authentication using other means.
		 */
		{
			type: "confidential";
			secret: string;
		} & ({
			grants: Permutations<Exclude<TGrantType, "implicit">[]>,
			redirectUris?: never;
		} | {
			grants: Permutations<Extract<TGrantType, "implicit">[]>,
			redirectUris: TRedirectUri[];
		})
		/**
		 *    public
		 *        Clients incapable of maintaining the confidentiality of their
		 *        credentials (e.g., clients executing on the device used by the
		 *        resource owner, such as an installed native application or a web
		 *        browser-based application), and incapable of secure client
		 *        authentication via any other means.
		 */
		|
		{
			type: "public";
			secret?: never;
			grants: TGrantType[];
			/**
			 * 3.1.2.2.  Registration Requirements
			 *
			 * The authorization server MUST require the following clients to
			 * register their redirection endpoint:
			 * o  Public clients.
			 */
			redirectUris: TRedirectUri[];
		}
	);
