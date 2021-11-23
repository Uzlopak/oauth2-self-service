// @ts-nocheck
import { FastifyInstance, FastifyRequest } from "fastify";
import * as fastifyRateLimit from "fastify-rate-limit";
// import * as Redis from "ioredis";
import fp from "fastify-plugin";

/**
 * Brute Force Protection.
 */
export const rateLimit = async (fastify: FastifyInstance) => {
	const redis = process.env.REDIS_HOST ? new Redis({
		host                : process.env.REDIS_HOST,
		password            : process.env.REDIS_PASSWORD,
		port                : Number(process.env.REDIS_PORT),
		db                  : Number(process.env.REDIS_DB),
		/**
		 * Settings suggested by fastify-rate-limit
		 * @see https://github.com/fastify/fastify-rate-limit/blob/master/example/example.js
		 */
		connectTimeout      : 500,
		maxRetriesPerRequest: 1
	}) : undefined;

	const config = {
		redis,
		max                 : 1,
		timeWindow          : "5 minutes",
		// @ts-ignore
		errorResponseBuilder: function (req: FastifyRequest, context) {
			return {
				code             : 429,
				error            : "access_denied",
				error_description: "Global rate limit exceeded",
				date             : Date.now(),
				expiresIn        : context.ttl // milliseconds
			};
		},
		keyGenerator: function (req: FastifyRequest) {
			return (
				(req.headers["x-real-ip"] && req.headers["x-real-ip"][0]) || // nginx
				(req.headers["x-client-ip"] && req.headers["x-client-ip"][0]) ||  // apache
				(req.headers["x-forwarded-for"] && req.headers["x-forwarded-for"][0]) || // use this only if you trust the header
				req.ip // fallback to default
			);
		}
	};

	fastify.register(fastifyRateLimit.default);
};

export default fp(rateLimit, "3.x");
