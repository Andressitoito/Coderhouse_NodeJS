import fs from "fs";

class Usermanager {
	constructor(path) {
		this.users = [];
		this.path = path;
		this.init(path);
	}
	init(path) {
		let file = fs.existsSync(path);
		if (!file) {
			fs.promises
				.writeFile(path, "[]")
				.then((res) => console.log("File created"))
				.catch((err) => console.log(err));
		} else {
			fs.promises
				.readFile(path, "utf-8")
				.then((res) => {
					this.users = JSON.parse(res);
				})
				.catch((err) => console.log(err));
		}
	}
	// revisar lo del path o del this.path ya esta como variable
	add_user({ name, last_name, age, carts }) {
		let data = { name, last_name, age, carts };
		data.id = 1;

		this.users.push(data);

		let data_json = JSON.stringify(this.users, null, 2);
		fs.promises
			.writeFile(this.path, data_json)

			.then((res) => {
				console.log("User created");
			})
			.catch((err) => console.log(err));
	}
	read_users(quantity) {
		quantity = quantity ?? 4;

		let slice_users = this.users.slice(0, quantity);
		return slice_users;
	}

	read_user(id) {
		let one = this.users.find((each) => each.id === id);

		if (!one) {
			return null;
		}

		return one;
	}

	async update_user(id, data) {
		try {
			let one = this.read_user(id);
			if (!one) {
				return "error: not user found to update";
			}
			if (data === {}) {
				return "error: no data to update";
			}

			for (let prop in data) {
				if (
					prop !== "name" ||
					prop !== "last_name" ||
					prop !== "age" ||
					prop !== "carts"
				) {
					return `error: ${prop} is a wrong property`;
				}
				one[prop] = data[prop];
			}

			let data_json = JSON.stringify(this.users, null, 2);

			await fs.promises.writeFile(this.path, data_json);
			return "updated user: " + id;
		} catch (err) {}
	}

	async destroy_user(id) {
		try {
			let one = this.read_user(id);
			if (!one) {
				return "error: not user found";
			}

			this.users = this.users.filter((each) => each.id !== id);

			let data_json = JSON.stringify(this.users, null, 2);
			await fs.promises.writeFile(this.path, data_json);
			return "deleted user: " + id;
		} catch (err) {}
	}
}

let manager = new Usermanager("./data/users.json");

// once defined the instance, is exported to define routes

export default manager;
