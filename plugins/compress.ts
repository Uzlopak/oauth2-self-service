import { FastifyPluginAsync } from "fastify";
import fastifyCompress from "fastify-compress";
import fp from "fastify-plugin";

export const compress: FastifyPluginAsync<never> = async (fastify) => {
	fastify.register(fastifyCompress,
		{
			global: true,
		}
	);
};

export default fp(compress, "3.x");
