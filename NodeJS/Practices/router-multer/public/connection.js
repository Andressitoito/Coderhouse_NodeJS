const socket = io();

function emit_data() {
	socket.emit(
		// envia mensaje desde le cliente hcia el servidor
		"primer_conexion", // identificador del mensaje

		{
			name: "andy",
			age: 32,
		}
	);
}

emit_data()

let selectors = document.querySelectorAll("span");

console.log("selectors ", selectors.length)
selectors.forEach((element) => {
	element.addEventListener('click', () => {
		emit_data()
	})
});

socket.on("contador", (data) => console.log(data));

console.log('from socket')
