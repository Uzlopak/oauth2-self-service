import { FastifyPluginAsync } from "fastify";
import fastifyCors from "fastify-cors";
import fp from "fastify-plugin";

export const cors: FastifyPluginAsync<never> = async (fastify) => {
	if (process.env.CORS_ALLOWED_ORIGINS) {
		fastify.register(fastifyCors, {
			origin: process.env.CORS_ALLOWED_ORIGINS.split(",")
		});
	} else {
		fastify.log.warn("No CORS_ALLOWED_ORIGINS set as ENV-variable. CORS not activated.");
	}
};

export default fp(cors, "3.x");
