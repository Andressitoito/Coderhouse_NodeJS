import express from "express";
import __dirname from "./utils.js";
import { engine } from "express-handlebars";
import router from "./routes/index.js";
import { Server } from "socket.io";

const server = express();

const port = 8080;

server.engine("handlebars", engine());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static('../public'));

server.use("/", router);

server.set("view engine", "handlebars");
server.set("views", __dirname + "/views");

let http_server = server.listen(port, () => {
	console.log("Server listen in port 8080");
});

const socket_server = new Server(http_server);

let contador = 0;

socket_server.on(
	// on sirve para escuchar los mensjes que llegan del cliente
	"connection", // identificador del mensaje a escuchar
	(socket) => {
		console.log(socket.client.id);
		console.log(`client connected`);
		socket.on("primer_conexion", (data) => {
			console.log(data.name);
			contador++;
			// socket.emit('contador', { contador }) // si uso solo socket le manda a uicamente uno solo
			socket_server.emit("contador", { contador }); // le manda a todos
		});
	}
);
