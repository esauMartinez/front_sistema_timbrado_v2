import type { Empresa } from '@/interfaces/empresa.model'
import type { Caja } from '@/modules/cajas/interfaces/caja'
import type { Cliente } from '@/modules/clientes/interfaces/cliente'
import type { Operador } from '@/modules/operadores/interfaces/operador'
import type { Patio } from '@/modules/patios/interfaces/patio'
import type { Tractor } from '@/modules/tractores/interfaces/tractor'
import type { Mercancia } from '@/modules/trips/interfaces/mercancia'
import type { Timbre } from '@/modules/trips/interfaces/timbre'
import type { Trip } from '@/modules/trips/interfaces/trip'
import { generateMercancias } from './mercancias'
import { generateConceptos } from './conceptos'
import type { Concepto } from '@/modules/trips/interfaces/concepto'

export const pdfTimbre = async (
  empresa: Empresa,
  trip: Trip,
  operador: Operador,
  tractor: Tractor,
  cliente: Cliente,
  caja: Caja,
  origen: Patio,
  destino: Patio,
  mercancias: Mercancia[],
  timbre: Timbre,
  conceptos: Concepto[]
): Promise<any> => {
  const docDefinition: any = {
    pageMargins: [10, 10, 10, 10],
    content: [
      {
        text: empresa.razon_social,
        fontSize: 18,
        bold: true,
        alignment: 'center'
      },
      '\n',
      {
        text: empresa.calle,
        fontSize: 14,
        bold: true,
        alignment: 'center'
      },
      '\n',
      {
        text: empresa.rfc,
        fontSize: 14,
        bold: true,
        alignment: 'center'
      },
      '-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------',
      {
        text: `RAZON SOCIAL: ${cliente.razon_social}`,
        fontSize: 9,
        alignment: 'left'
      },
      {
        text: `RFC: ${cliente.rfc}`,
        fontSize: 9,
        alignment: 'left'
      },
      {
        text: `DIRECCION: ${cliente.calle}`,
        fontSize: 9,
        alignment: 'left'
      },
      {
        text: `ESTADO: ${cliente.estado}`,
        fontSize: 9,
        alignment: 'left'
      },
      {
        text: `PAIS: ${cliente.pais}`,
        fontSize: 9,
        alignment: 'left'
      },
      {
        text: `CODIGO POSTAL: ${cliente.codigo_postal}`,
        fontSize: 9,
        alignment: 'left'
      },
      '-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------',
      {
        table: {
          widths: ['*', '*', '*', '*', '*', '*', '*', '*'],
          body: [
            [
              {
                text: 'CANTIDAD',
                fontSize: 9
              },
              {
                text: 'CVE. PRODUCTO',
                fontSize: 9
              },
              {
                text: 'CVE. UNIDAD',
                fontSize: 9
              },
              {
                text: 'CONCEPTO',
                fontSize: 9
              },
              {
                text: 'UNITARIO',
                fontSize: 9
              },
              {
                text: 'IVA',
                fontSize: 9
              },
              {
                text: 'RETENCION',
                fontSize: 9
              },
              {
                text: 'SUBTOTAL',
                fontSize: 9
              }
            ],
            ...(await generateConceptos(conceptos))
          ]
        }
      },
      '\n',
      {
        text: 'ESTE DOCUMENTO ES UNA PRESENTACION IMPRESA DE UN CFDI',
        fontSize: 10
      },
      '\n',
      {
        columns: [
          {
            width: '*',
            text: [
              {
                text: `USO DE CFDI: ${cliente.uso_cfdi} \n`,
                fontSize: 10
              },
              {
                text: `METODO DE PAGO: ${cliente.metodo_pago} \n`,
                fontSize: 10
              },
              {
                text: `FORMA DE PAGO: ${cliente.forma_pago} \n`,
                fontSize: 10
              },
              {
                text: `REGIMEN FISCAL RECEPTOR: ${cliente.regimen_fiscal} \n`,
                fontSize: 10
              },
              {
                text: `MONEDA: ${trip.moneda} \n`,
                fontSize: 10
              },
              {
                text: `TIPO DE CAMBIO: 0 \n`,
                fontSize: 10
              }
            ]
          }
        ]
      },
      '-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------',
      {
        columns: [
          {
            image: `data:image/jpeg;base64,${timbre.codigo_qr}`,
            width: 100
          }
        ]
      },
      {
        table: {
          widths: ['*', '*', '*', '*'],
          body: [
            [
              {
                text: 'CADENA ORIGINAL DE COMPLEMENTO DE CERTIFICADO DIGITAL DE SAT',
                fontSize: 8,
                alignment: 'center',
                colSpan: 4
              },
              {},
              {},
              {}
            ],
            [
              {
                text: timbre.cadena_original_sat,
                fontSize: 5,
                alignment: 'left',
                colSpan: 4
              },
              {},
              {},
              {}
            ],
            [
              {
                text: 'SELLO DIGITAL DEL CFDI',
                fontSize: 8,
                alignment: 'center',
                colSpan: 4
              },
              {},
              {},
              {}
            ],
            [
              {
                text: timbre.sello_cfdi,
                fontSize: 5,
                alignment: 'left',
                colSpan: 4
              },
              {},
              {},
              {}
            ],
            [
              {
                text: 'SELLO DEL SAT',
                fontSize: 8,
                alignment: 'center',
                colSpan: 4
              },
              {},
              {},
              {}
            ],
            [
              {
                text: timbre.sello_sat,
                fontSize: 5,
                alignment: 'left',
                colSpan: 4
              },
              {},
              {},
              {}
            ],
            [
              {
                text: 'CERTIFICADO SAT',
                fontSize: 7,
                colSpan: 2,
                alignment: 'center'
              },
              {},
              {
                text: 'FOLIO FISCAL',
                fontSize: 7,
                colSpan: 2,
                alignment: 'center'
              },
              {}
            ],
            [
              {
                text: timbre.numero_certificado_sat,
                fontSize: 7,
                colSpan: 2,
                alignment: 'center'
              },
              {},
              {
                text: timbre.uuid,
                fontSize: 7,
                colSpan: 2,
                alignment: 'center'
              },
              {}
            ],
            [
              {
                text: 'IDCCP',
                fontSize: 7,
                colSpan: 2,
                alignment: 'center'
              },
              {},
              {
                text: 'FECHA CERTIFICADO',
                fontSize: 7,
                colSpan: 2,
                alignment: 'center'
              },
              {}
            ],
            [
              { text: 'test', fontSize: 7, colSpan: 2, alignment: 'center' },
              {},
              {
                text: timbre.fecha_timbrado,
                fontSize: 7,
                colSpan: 2,
                alignment: 'center'
              },
              {}
            ]
          ]
        }
      },
      {
        text: 'COMPLEMENTO CARTA PORTE',
        alignment: 'center',
        fontSize: 10,
        pageBreak: 'before'
      },
      '\n',
      {
        table: {
          widths: ['*', '*'],
          body: [
            [
              {
                text: 'LOS BIENES/MERCANCIAS TRANSPORTADOS INGRESAN O SALEN DEL TERRITORIO NACIONAL',
                fontSize: 8,
                alignment: 'center'
              },
              {
                text: 'TOTAL DE DISTANCIAS RECORRIDAS (KM)',
                fontSize: 8,
                alignment: 'center'
              }
            ],
            [
              {
                text: trip.tipo_viaje,
                fontSize: 8,
                alignment: 'center'
              },
              {
                text: trip.kilometros,
                fontSize: 8,
                alignment: 'center'
              }
            ]
          ]
        }
      },
      '\n',
      {
        text: 'UBICACIONES',
        alignment: 'center',
        fontSize: 10
      },
      '\n',
      {
        text: 'UBICACION 1',
        alignment: 'center',
        fontSize: 10
      },
      {
        table: {
          body: [
            [
              {
                text: 'TIPO DE UBICACION',
                fontSize: 8,
                alignment: 'center'
              },
              {
                text: 'RFC REMITENTE/DESTINATARIO',
                fontSize: 8,
                alignment: 'center'
              },
              {
                text: 'NOMBRE DEL REMITENTE/DESTINATARIO',
                fontSize: 8,
                alignment: 'center'
              },
              {
                text: 'FECHA Y HORA ESTIMADA DE SALIDA/LLEGADA DE LOS BIENES',
                fontSize: 8,
                alignment: 'center'
              }
            ],
            [
              {
                text: 'ORIGEN',
                fontSize: 8,
                alignment: 'center'
              },
              {
                text: origen.rfc,
                fontSize: 8,
                alignment: 'center'
              },
              {
                text: origen.nombre,
                fontSize: 8,
                alignment: 'center'
              },
              {
                text: trip.ventana_carga,
                fontSize: 8,
                alignment: 'center'
              }
            ],
            [
              {
                text: 'CALLE',
                fontSize: 8,
                alignment: 'center',
                colSpan: 2
              },
              {},
              {
                text: 'NUMERO EXT.',
                fontSize: 8,
                alignment: 'center'
              },
              {
                text: 'COLONIA',
                fontSize: 8,
                alignment: 'center'
              }
            ],
            [
              {
                text: origen.calle,
                fontSize: 8,
                alignment: 'center',
                colSpan: 2
              },
              {},
              {
                text: origen.numero_exterior,
                fontSize: 8,
                alignment: 'center'
              },
              {
                text: origen.colonia,
                fontSize: 8,
                alignment: 'center'
              }
            ],
            [
              {
                text: 'MUNICIPIO',
                fontSize: 8,
                alignment: 'center'
              },
              {
                text: 'ESTADO',
                fontSize: 8,
                alignment: 'center'
              },
              {
                text: 'PAIS',
                fontSize: 8,
                alignment: 'center'
              },
              {
                text: 'CODIGO POSTAL',
                fontSize: 8,
                alignment: 'center'
              }
            ],
            [
              {
                text: origen.municipio,
                fontSize: 8,
                alignment: 'center'
              },
              {
                text: origen.estado,
                fontSize: 8,
                alignment: 'center'
              },
              {
                text: origen.pais,
                fontSize: 8,
                alignment: 'center'
              },
              {
                text: origen.codigo_postal,
                fontSize: 8,
                alignment: 'center'
              }
            ]
          ]
        }
      },
      '\n',
      {
        text: 'UBICACION 2',
        alignment: 'center',
        fontSize: 10
      },
      {
        table: {
          body: [
            [
              {
                text: 'TIPO DE UBICACION',
                fontSize: 8,
                alignment: 'center'
              },
              {
                text: 'RFC REMITENTE/DESTINATARIO',
                fontSize: 8,
                alignment: 'center'
              },
              {
                text: 'NOMBRE DEL REMITENTE/DESTINATARIO',
                fontSize: 8,
                alignment: 'center'
              },
              {
                text: 'FECHA Y HORA ESTIMADA DE SALIDA/LLEGADA DE LOS BIENES',
                fontSize: 8,
                alignment: 'center'
              }
            ],
            [
              {
                text: 'ORIGEN',
                fontSize: 8,
                alignment: 'center'
              },
              {
                text: destino.rfc,
                fontSize: 8,
                alignment: 'center'
              },
              {
                text: destino.nombre,
                fontSize: 8,
                alignment: 'center'
              },
              {
                text: trip.ventana_entrega,
                fontSize: 8,
                alignment: 'center'
              }
            ],
            [
              {
                text: 'CALLE',
                fontSize: 8,
                alignment: 'center',
                colSpan: 2
              },
              {},
              {
                text: 'NUMERO EXT.',
                fontSize: 8,
                alignment: 'center'
              },
              {
                text: 'COLONIA',
                fontSize: 8,
                alignment: 'center'
              }
            ],
            [
              {
                text: destino.calle,
                fontSize: 8,
                alignment: 'center',
                colSpan: 2
              },
              {},
              {
                text: destino.numero_exterior,
                fontSize: 8,
                alignment: 'center'
              },
              {
                text: destino.colonia,
                fontSize: 8,
                alignment: 'center'
              }
            ],
            [
              {
                text: 'MUNICIPIO',
                fontSize: 8,
                alignment: 'center'
              },
              {
                text: 'ESTADO',
                fontSize: 8,
                alignment: 'center'
              },
              {
                text: 'PAIS',
                fontSize: 8,
                alignment: 'center'
              },
              {
                text: 'CODIGO POSTAL',
                fontSize: 8,
                alignment: 'center'
              }
            ],
            [
              {
                text: destino.municipio,
                fontSize: 8,
                alignment: 'center'
              },
              {
                text: destino.estado,
                fontSize: 8,
                alignment: 'center'
              },
              {
                text: destino.pais,
                fontSize: 8,
                alignment: 'center'
              },
              {
                text: destino.codigo_postal,
                fontSize: 8,
                alignment: 'center'
              }
            ]
          ]
        }
      },
      '\n',
      {
        text: 'AUTOTRANSPORTE',
        alignment: 'center',
        fontSize: 10
      },
      '\n',
      {
        table: {
          widths: ['*', '*', '*'],
          body: [
            [
              {
                text: 'PERMISO SCT',
                fontSize: 8,
                colSpan: 2,
                alignment: 'center'
              },
              {},
              {
                text: 'NUMERO PERMISO SCT',
                fontSize: 8,
                alignment: 'center'
              }
            ],
            [
              {
                text: empresa.permiso_sct,
                fontSize: 8,
                colSpan: 2,
                alignment: 'center'
              },
              {},
              {
                text: empresa.numero_permiso_sct,
                fontSize: 8,
                alignment: 'center'
              }
            ],
            [
              {
                text: 'VEHICULO',
                fontSize: 8,
                alignment: 'center',
                colSpan: 3
              }
            ],
            [
              {
                text: 'CLAVE VEHICULAR',
                fontSize: 8,
                alignment: 'center'
              },
              {
                text: 'PLACA VEHICULAR',
                fontSize: 8,
                alignment: 'center'
              },
              {
                text: 'AÑO',
                fontSize: 8,
                alignment: 'center'
              }
            ],
            [
              {
                text: tractor.id,
                fontSize: 8,
                alignment: 'center'
              },
              {
                text: tractor.matricula,
                fontSize: 8,
                alignment: 'center'
              },
              {
                text: tractor.modelo,
                fontSize: 8,
                alignment: 'center'
              }
            ],
            [
              {
                text: 'ASEGURADORA RESPONSABILIDAD CIVIL',
                fontSize: 8,
                colSpan: 2,
                alignment: 'center'
              },
              {},
              {
                text: 'POLIZA RESPONSABILIDAD CIVIL',
                fontSize: 8,
                alignment: 'center'
              }
            ],
            [
              {
                text: tractor.aseguradora,
                fontSize: 8,
                colSpan: 2,
                alignment: 'center'
              },
              {},
              {
                text: tractor.numero_poliza,
                fontSize: 8,
                alignment: 'center'
              }
            ],
            [
              {
                text: 'REMOLQUE',
                fontSize: 8,
                colSpan: 3,
                alignment: 'center'
              },
              {},
              {}
            ],
            [
              {
                text: 'NUMERO ECONOMICO',
                fontSize: 8,
                alignment: 'center',
                colSpan: 2
              },
              {},
              {
                text: 'PLACA',
                fontSize: 8,
                alignment: 'center'
              }
            ],
            [
              {
                text: caja.numero_economico,
                fontSize: 8,
                alignment: 'center',
                colSpan: 2
              },
              {},
              {
                text: caja.matricula,
                fontSize: 8,
                alignment: 'center'
              }
            ],
            [
              {
                text: 'CONFIGURACION VEHICULAR',
                fontSize: 8,
                alignment: 'center',
                colSpan: 3
              },
              {},
              {}
            ],
            [
              {
                text: tractor.configuracion,
                fontSize: 8,
                alignment: 'center',
                colSpan: 2
              },
              {},
              {}
            ],
            [
              {
                text: 'SUBTIPO REMOLQUE',
                fontSize: 8,
                alignment: 'center',
                colSpan: 3
              },
              {},
              {}
            ],
            [
              {
                text: caja.configuracion,
                fontSize: 8,
                alignment: 'center',
                colSpan: 3
              },
              {},
              {}
            ]
          ]
        }
      },
      '\n',
      {
        text: 'FUGURA AUTOTRANSPORTE',
        alignment: 'center',
        fontSize: 10
      },
      '\n',
      {
        table: {
          widths: ['*', '*', '*'],
          body: [
            [
              {
                text: 'FIGURA',
                fontSize: 8,
                alignment: 'center'
              },
              {
                text: 'RFC',
                fontSize: 8,
                alignment: 'center'
              },
              {
                text: 'LICENCIA',
                fontSize: 8,
                alignment: 'center'
              }
            ],
            [
              {
                text: '01-OPERADOR',
                fontSize: 8,
                alignment: 'center'
              },
              {
                text: operador.rfc,
                fontSize: 8,
                alignment: 'center'
              },
              {
                text: operador.licencia,
                fontSize: 8,
                alignment: 'center'
              }
            ],
            [
              {
                text: 'NOMBRE',
                fontSize: 8,
                alignment: 'center'
              },
              {},
              {}
            ],
            [
              {
                text: `${operador.nombre} ${operador.paterno} ${operador.materno}`,
                fontSize: 8,
                alignment: 'center'
              },
              {},
              {}
            ]
          ]
        }
      },
      '\n',
      {
        text: 'MERCANCIAS',
        alignment: 'center',
        fontSize: 10,
        pageBreak: 'before'
      },
      '\n',
      {
        table: {
          body: [
            [
              {
                text: 'Producto',
                fontSize: 9
              },
              {
                text: 'U. Medida',
                fontSize: 9
              },
              {
                text: 'Peso',
                fontSize: 9
              },
              {
                text: 'Canitidad',
                fontSize: 9
              },
              {
                text: 'M. Peligroso',
                fontSize: 9
              },
              {
                text: 'T. Documento',
                fontSize: 9
              },
              {
                text: 'T. Materia',
                fontSize: 9
              },
              {
                text: 'Pedimento',
                fontSize: 9
              },
              {
                text: 'F. Arancelaria',
                fontSize: 9
              },
              {
                text: 'D. Materia',
                fontSize: 9
              },
              {
                text: 'I. Aduanero',
                fontSize: 9
              }
            ],
            ...(await generateMercancias(mercancias))
          ]
        }
      }
    ]
  }

  return docDefinition
}
