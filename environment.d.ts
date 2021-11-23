declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PORT: string;
			ADDRESS: string;
			ENSURE_SSL: "0" | "1";
			DISABLE_RATE_LIMIT: "0" | "1";
			PWNED_DB_PATH: string;
			REDIS_HOST: string;
			REDIS_PORT: string;
			REDIS_PASSWORD: string;
			REDIS_DB: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15";
			CORS_ALLOWED_ORIGINS: string;
			JWT_SECRET: string;
			COOKIE_SECRET: string;
			SESSION_SECRET: string;
			JWT_ISSUER: string;

			BCRYPT_SALT_WORK_FACTOR: string;
		}
	}
}

export { };
