import { FastifyPluginAsync } from "fastify";
import * as fastifySession from "@fastify/session";
import fp from "fastify-plugin";

export const session: FastifyPluginAsync<never> = async (fastify) => {
	fastify.register(fastifySession.default, {
		secret: process.env.SESSION_SECRET,
		cookie: {
			secure: process.env.ENSURE_SSL === "1",
		}
	});
};
declare module "fastify" {
	interface FastifyRequest {
		/** Allows to access or modify the session data. */
		session: Session;
	}
	interface Session {
		aras: string;
		sessionId: string;
		encryptedSessionId: string;
		/** Updates the `expires` property of the session. */
		touch(): void;
		/** Regenerates the session by generating a new `sessionId`. */
		regenerate(): void;
	}
}

export default fp(session, "3.x");
