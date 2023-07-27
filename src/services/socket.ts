import { Socket, io } from 'socket.io-client';
import { state } from "../composables/useSocket";


class SocketClass {
	socket: Socket;

	connect(namespace) {
		this.socket = io(`http://localhost:3000/${namespace}`);

		this.socket.on('connect', () => {
			state.connected = true;
		});
	}
}

export const socket = new SocketClass();
