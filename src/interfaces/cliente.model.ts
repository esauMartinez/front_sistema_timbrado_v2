export interface Cliente {
  id?: number;
  razon_social?: string;
  origen?: string;
  codigo_postal?: string;
  colonia?: string;
  municipio?: string;
  estado?: string;
  pais?: string;
  calle?: string;
  numero_exterior?: string;
  numero_interior?: string;
  rfc?: string;
  tax_id?: string;
  email?: string;
  metodo_pago?: string;
  forma_pago?: string;
  uso_cfdi?: string;
  estatus?: boolean;
  regimen_fiscal?: string;
}

export interface FormasPago {
  id?: number;
  clave?: string;
  descripcion?: string;
}

export interface MetodosPago {
  id?: number;
  clave?: string;
  descripcion?: string;
}

export interface UsoCfdi {
  id?: number;
  clave?: string;
  descripcion?: string;
}

export interface RegimenFiscal {
  id?: number;
  clave?: string;
  descripcion?: string;
}