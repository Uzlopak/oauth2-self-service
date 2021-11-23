import {
	FastifyPluginAsync,
	preHandlerAsyncHookHandler,
} from "fastify";
import fp from "fastify-plugin";

declare module "fastify" {
	interface FastifyInstance {
		ensureSSL: () => preHandlerAsyncHookHandler;
	}
}

const ensureSSL: FastifyPluginAsync<never> = async (fastify) => {
	fastify.addHook("onRequest", async (request, reply) => {
		if (
			(
				request.headers["x-forwarded-proto"] &&
				request.headers["x-forwarded-proto"] !== "https"
			) ||
			(
				!request.headers["x-forwarded-proto"] &&
				request.protocol !== "https"
			)
		) {
			reply.code(426);
			throw new Error("SSL required.");
		}
	});
};

export default fp(ensureSSL, "3.x");
