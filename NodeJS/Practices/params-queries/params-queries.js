// THIS IS BECAUSE NEW ESCMASCRIPT
import express from "express";
import manager from "./users.js";

let server = express();

let PORT = 8080;

let ready = () => {
	console.log(`Server ready on port ${PORT}`);
};

server.listen(PORT, ready);
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

let index_route = "/";

let index_function = (req, res) => {
	let quantity = manager.read_users().length;
	// to all functions always a response must be returned

	return res.send(`There are ${quantity} users`);
};

server.get(index_route, index_function);

let one_route = "/users/:id";

let one_function = (req, res) => {
	let params = req.params;
	console.log(params);

	let id = Number(params.id);
	console.log("//////////////////////", id);

	let one = manager.read_user(id);

	console.log("One user ", one);

	if (one) {
		return res.send({
			success: true,
			user: one,
		});
	} else {
		return res.send({
			success: false,
			user: "Not found",
		});
	}
};

server.get(one_route, one_function);

let query_route = "/users";

let query_function = (req, res) => {
	let quantity = req.query.quantity ?? 5;

	let users = manager.read_users().slice(0, quantity);

	if (users.length > 0) {
		return res.send({
			success: true,
			users,
		});
	} else {
		return res.send({
			success: false,
			user: "Not found",
		});
	}
};

server.get(query_route, query_function);

server.post("/users", async (req, res) => {
	try {
		console.log("GET INTO POST");
		console.log(req.body);
		let name = req.body.name ?? null;
		let last_name = req.body.last_name ?? null;
		let age = req.body.age ?? null;
		let carts = req.body.carts;

		if (name && last_name && age) {
			let user = await manager.add_user({ name, last_name, age, carts });

			return res.json({
				status: 201,
				message: "User created",
				user,
			});
		} else {
			return res.json({
				status: 400,
				message: "check data",
			});
		}
	} catch (err) {
		console.log(err);
		return res.json({
			status: 500,
			message: "error",
		});
	}
});

server.put("/users/:uid", async (req, res) => {

 console.log(req.body)
	try {
		if (req.body && req.params.uid) {
			let id = Number(req.params.uid);
			let data = req.body;
			let user = await manager.update_user(id, data);

			return res.json({
				status: 200,
				message: "user updated",
				user,
			});
		} else {
			return res.json({
				status: 400,
				message: "check data",
			});
		}
	} catch (err) {
		return res.json({
			status: 500,
			error: err,
		});
	}
});
