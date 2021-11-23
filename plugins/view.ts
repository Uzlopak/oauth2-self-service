import { FastifyInstance } from "fastify";
import * as fastifyStatic from "fastify-static";
import * as fastifyPointOfView from "point-of-view";
import * as handlebars from "handlebars";
import { join } from "path";
import fp from "fastify-plugin";

handlebars.registerHelper("eq", function (arg1, arg2, options) {
	// @ts-ignore
	return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});
export const view = async (fastify: FastifyInstance) => {
	fastify.register(fastifyPointOfView.default, {
		engine: {
			handlebars: handlebars,
		},
		includeViewExtension: true,
		layout              : "./views/layouts/main.hbs",
		options             : {
			layoutsDir: "./views/layouts/",
			partials  : {
				footer       : "./views/partials/footer.hbs",
				form         : "./views/partials/form.hbs",
				messages     : "./views/partials/messages.hbs",
				passwordField: "./views/partials/ui_node_input_password.hbs",
				defaultField : "./views/partials/ui_node_input_default.hbs",
				button       : "./views/partials/ui_node_input_button.hbs",
			}
		}
	});
	fastify.register(fastifyStatic.default, {
		root: join(__dirname, "..", "public"),
	});
};

export default fp(view, "3.x");
