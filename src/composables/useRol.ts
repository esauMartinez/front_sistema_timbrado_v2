import { storeToRefs } from 'pinia';
import { instance } from '../helpers/axiosInstance';
import { handleError, question } from '../helpers/messages';
import { useRolStore } from '../store/rol';
import { router } from '../router';
import { useToast } from 'primevue/usetoast';

export const useRol = () => {
  const rolStore = useRolStore();
  const { rol, roles, selectedKey, nodes } = storeToRefs(rolStore);
  const toast = useToast();
  let array_permisos = [];

  const getRoles = async () => {
    try {
      const { data } = await instance.get('/roles');
      rolStore.setRoles(data);
    } catch (error) {
      handleError(error);
    }
  };

  const getRol = async (id: number) => {
    try {
      const { data } = await instance.get(`/roles/${id}`);
      let obj = {};
      data.permisos.forEach((x) => {
        obj[x.key] = { checked: true, partialChecked: false };
        if (x.ver) {
          obj[`${x.key}-0`] = { checked: true, partialChecked: false };
        }
        if (x.crear) {
          obj[`${x.key}-1`] = { checked: true, partialChecked: false };
        }
        if (x.modificar) {
          obj[`${x.key}-2`] = { checked: true, partialChecked: false };
        }
        if (x.eliminar) {
          obj[`${x.key}-3`] = { checked: true, partialChecked: false };
        }
      });

      selectedKey.value = obj;
      rol.value.id = data.id;
      rol.value.nombre = data.nombre;
    } catch (error) {
      handleError(error);
    }
  };

  const postRol = async (permisos, nodos) => {
    array_permisos = [];
    await buscar_permiso(permisos, nodos);
    const nuevo_rol = {
      nombre: rol.value.nombre,
      permisos: array_permisos,
    };
    const { data } = await instance.post('/roles', nuevo_rol);
    router.go(-1);
    getRoles();
    return data;
  };

  const putRol = async (permisos, nodos) => {
    array_permisos = [];
    await buscar_permiso(permisos, nodos);
    const modificar_rol = {
      id: rol.value.id,
      nombre: rol.value.nombre,
      permisos: array_permisos,
    };
    console.log(modificar_rol);
    const { data } = await instance.put('/roles', modificar_rol);
    router.go(-1);
    getRoles();
    return data;
  };

  const deleteRol = async (id: number) => {
    try {
      const response = await question();
      if (response.isConfirmed) {
        await instance.delete(`/roles/${id}`);
        toast.add({
          severity: 'success',
          summary: 'Unidad',
          detail: 'Rol eliminado correctamente',
          life: 3000,
        });
        getRoles();
      }
    } catch (error) {
      handleError(error);
    }
  };

  const buscar_permiso = async (permisos, nodos) => {
    nodos.forEach((nodo) => {
      for (const key in permisos) {
        if (key === nodo.key) {
          const obj = {
            permiso: nodo.data,
            key: nodo.key,
            ver: false,
            crear: false,
            modificar: false,
            eliminar: false,
          };
          array_permisos.push(obj);
          buscar_opciones(permisos, nodo.children);
        }
      }
    });
    return true;
  };

  const buscar_opciones = (permisos, nodos) => {
    nodos.forEach((nodo) => {
      for (const key in permisos) {
        if (key === nodo.key) {
          array_permisos.map((x) => {
            if (x.key === nodo.key.split('-')[0]) {
              x[nodo.data.toLowerCase()] = true;
            }
          });
        }
      }
    });
  };

  const resetRolForm = () => {
    rolStore.setRol({
      id: null,
      nombre: null,
    });

    rolStore.selectedKey = null;
  };

  return {
    rol,
    roles,
    selectedKey,
    nodes,
    getRoles,
    getRol,
    postRol,
    putRol,
    deleteRol,
    resetRolForm,
  };
};
