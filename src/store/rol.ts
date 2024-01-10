import { defineStore } from 'pinia';
import { Rol } from '../interfaces/rol.model';

interface Children {
	key: string;
	label: string;
	data: string;
	icon: string;
}

interface Node {
	key: string;
	label: string;
	data: string;
	icon: string;
	children: Children[];
}

interface RolStore {
	roles: Rol[];
	rol: Rol;
	selectedKey: null;
	nodes: Node[];
}

export const useRolStore = defineStore('roles', {
	state: (): RolStore => ({
		roles: [],
		rol: {
			id: null,
			nombre: null,
		},
		selectedKey: null,
		nodes: [
			{
				key: '0',
				label: 'Clientes',
				data: 'CLIENTES',
				icon: 'fa fa-briefcase',
				children: [
					{
						key: '0-0',
						label: 'Ver',
						data: 'VER',
						icon: 'fa fa-eye',
					},
					{
						key: '0-1',
						label: 'Crear',
						data: 'CREAR',
						icon: 'fa fa-plus',
					},
					{
						key: '0-2',
						label: 'Modificar',
						data: 'MODIFICAR',
						icon: 'fa fa-pencil',
					},
					{
						key: '0-3',
						label: 'Eliminar',
						data: 'ELIMINAR',
						icon: 'fa fa-trash',
					},
				],
			},
			{
				key: '1',
				label: 'Operadores',
				data: 'OPERADORES',
				icon: 'fa fa-user-astronaut',
				children: [
					{
						key: '1-0',
						label: 'Ver',
						data: 'VER',
						icon: 'fa fa-eye',
					},
					{
						key: '1-1',
						label: 'Crear',
						data: 'CREAR',
						icon: 'fa fa-plus',
					},
					{
						key: '1-2',
						label: 'Modificar',
						data: 'MODIFICAR',
						icon: 'fa fa-pencil',
					},
					{
						key: '1-3',
						label: 'Eliminar',
						data: 'ELIMINAR',
						icon: 'fa fa-trash',
					},
				],
			},
			{
				key: '2',
				label: 'Tractores',
				data: 'TRACTORES',
				icon: 'fa fa-truck',
				children: [
					{
						key: '2-0',
						label: 'Ver',
						data: 'VER',
						icon: 'fa fa-eye',
					},
					{
						key: '2-1',
						label: 'Crear',
						data: 'CREAR',
						icon: 'fa fa-plus',
					},
					{
						key: '2-2',
						label: 'Modificar',
						data: 'MODIFICAR',
						icon: 'fa fa-pencil',
					},
					{
						key: '2-3',
						label: 'Eliminar',
						data: 'ELIMINAR',
						icon: 'fa fa-trash',
					},
				],
			},
			{
				key: '3',
				label: 'Cajas',
				data: 'CAJAS',
				icon: 'fa fa-trailer',
				children: [
					{
						key: '3-0',
						label: 'Ver',
						data: 'VER',
						icon: 'fa fa-eye',
					},
					{
						key: '3-1',
						label: 'Crear',
						data: 'CREAR',
						icon: 'fa fa-plus',
					},
					{
						key: '3-2',
						label: 'Modificar',
						data: 'MODIFICAR',
						icon: 'fa fa-pencil',
					},
					{
						key: '3-3',
						label: 'Eliminar',
						data: 'ELIMINAR',
						icon: 'fa fa-trash',
					},
				],
			},
			{
				key: '4',
				label: 'Patios',
				data: 'PATIOS',
				icon: 'fa fa-globe',
				children: [
					{
						key: '4-0',
						label: 'Ver',
						data: 'VER',
						icon: 'fa fa-eye',
					},
					{
						key: '4-1',
						label: 'Crear',
						data: 'CREAR',
						icon: 'fa fa-plus',
					},
					{
						key: '4-2',
						label: 'Modificar',
						data: 'MODIFICAR',
						icon: 'fa fa-pencil',
					},
					{
						key: '4-3',
						label: 'Eliminar',
						data: 'ELIMINAR',
						icon: 'fa fa-trash',
					},
				],
			},
			{
				key: '5',
				label: 'Servicios',
				data: 'SERVICIOS',
				icon: 'fa fa-box-open',
				children: [
					{
						key: '5-0',
						label: 'Ver',
						data: 'VER',
						icon: 'fa fa-eye',
					},
					{
						key: '5-1',
						label: 'Crear',
						data: 'CREAR',
						icon: 'fa fa-plus',
					},
					{
						key: '5-2',
						label: 'Modificar',
						data: 'MODIFICAR',
						icon: 'fa fa-pencil',
					},
					{
						key: '5-3',
						label: 'Eliminar',
						data: 'ELIMINAR',
						icon: 'fa fa-trash',
					},
				],
			},
			{
				key: '6',
				label: 'Usuarios',
				data: 'USUARIOS',
				icon: 'fa fa-users',
				children: [
					{
						key: '6-0',
						label: 'Ver',
						data: 'VER',
						icon: 'fa fa-eye',
					},
					{
						key: '6-1',
						label: 'Crear',
						data: 'CREAR',
						icon: 'fa fa-plus',
					},
					{
						key: '6-2',
						label: 'Modificar',
						data: 'MODIFICAR',
						icon: 'fa fa-pencil',
					},
					{
						key: '6-3',
						label: 'Eliminar',
						data: 'ELIMINAR',
						icon: 'fa fa-trash',
					},
				],
			},
			{
				key: '7',
				label: 'Roles',
				data: 'ROLES',
				icon: 'fa fa-address-book',
				children: [
					{
						key: '7-0',
						label: 'Ver',
						data: 'VER',
						icon: 'fa fa-eye',
					},
					{
						key: '7-1',
						label: 'Crear',
						data: 'CREAR',
						icon: 'fa fa-plus',
					},
					{
						key: '7-2',
						label: 'Modificar',
						data: 'MODIFICAR',
						icon: 'fa fa-pencil',
					},
					{
						key: '7-3',
						label: 'Eliminar',
						data: 'ELIMINAR',
						icon: 'fa fa-trash',
					},
				],
			},
			{
				key: '8',
				label: 'Trips',
				data: 'TRIPS',
				icon: 'fa fa-plane-departure',
				children: [
					{
						key: '8-0',
						label: 'Ver',
						data: 'VER',
						icon: 'fa fa-eye',
					},
					{
						key: '8-1',
						label: 'Crear',
						data: 'CREAR',
						icon: 'fa fa-plus',
					},
					{
						key: '8-2',
						label: 'Modificar',
						data: 'MODIFICAR',
						icon: 'fa fa-pencil',
					},
					{
						key: '8-3',
						label: 'Eliminar',
						data: 'ELIMINAR',
						icon: 'fa fa-trash',
					},
				],
			},
			{
				key: '9',
				label: 'Usuario Cliente',
				data: 'USER_CLIENT',
				icon: 'fa fa-warehouse',
				children: [],
			},
		],
	}),
	actions: {
		setRoles(roles: any) {
			this.roles = roles;
		},
		setRol(rol: Rol) {
			this.rol = rol;
		}
	},
});
