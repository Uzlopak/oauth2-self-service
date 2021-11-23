import { FastifyPluginAsync } from "fastify";
import * as fastifyHelmet from "fastify-helmet";
import fp from "fastify-plugin";

export const helmet: FastifyPluginAsync<never> = async (fastify) => {
	fastify.register(fastifyHelmet.fastifyHelmet);
};

export default fp(helmet, "3.x");
