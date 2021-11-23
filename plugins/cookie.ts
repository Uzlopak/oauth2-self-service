import { FastifyInstance } from "fastify";
import * as fastifyCookie from "fastify-cookie";
import fp from "fastify-plugin";

export const cookie = async (fastify: FastifyInstance) => {
	fastify.register(fastifyCookie.fastifyCookie, {
		secret: process.env.COOKIE_SECRET,
	});
};

export default fp(cookie, "3.x");
