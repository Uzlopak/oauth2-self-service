import { FastifyPluginAsync } from "fastify";
import * as fastifyFormBody from "fastify-formbody";
import fp from "fastify-plugin";

export const formBody: FastifyPluginAsync<never> = async (fastify) => {
	fastify.register(fastifyFormBody.default);
};

export default fp(formBody, "3.x");
