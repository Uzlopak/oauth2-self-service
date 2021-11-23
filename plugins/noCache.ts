import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

const noCache: FastifyPluginAsync<never> = async (fastify) => {
	// @ts-ignore
	fastify.addHook("onSend", async (request, reply) => {
		reply.header("Cache-Control", "no-store");
		reply.header("Pragma", "no-cache");
	});
};

export default fp(noCache, "3.x");
