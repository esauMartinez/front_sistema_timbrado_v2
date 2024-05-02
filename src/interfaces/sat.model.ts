export interface MercanciasSat {
  id: number;
  clave: string;
  descripcion: string;
  material_peligroso: string;
}

export interface UnidadPeso {
  id: number;
  clave: string;
  nombre: string;
  descripcion: string;
}

export interface Peligroso {
  id: number;
  clave: string;
  descripcion: string;
}