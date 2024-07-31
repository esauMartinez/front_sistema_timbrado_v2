import type { Empresa } from '@/interfaces/empresa.model'
import type { Caja } from '@/modules/cajas/interfaces/caja'
import type { Cliente } from '@/modules/clientes/interfaces/cliente'
import type { Operador } from '@/modules/operadores/interfaces/operador'
import type { Patio } from '@/modules/patios/interfaces/patio'
import type { Tractor } from '@/modules/tractores/interfaces/tractor'
import type { Trip } from '@/modules/trips/interfaces/trip'
import type { Mercancia } from '@/modules/trips/interfaces/mercancia'
import moment from 'moment'
import { generateMercancias } from './mercancias'
import { ingresos } from './ingresos'
import { generateTimbre } from './timbre'
import type { Timbre } from '../interfaces/timbre'

export const pdfTrip = async (
  empresa: Empresa,
  trip: Trip,
  operador: Operador,
  tractor: Tractor,
  cliente: Cliente,
  caja: Caja,
  origen: Patio,
  destino: Patio,
  mercancias: Mercancia[],
  timbre: Timbre
): Promise<any> => {
  const docDefinition: any = {
    pageMargins: [10, 10, 10, 10],
    content: [
      {
        alignment: 'center',
        columns: [
          {
            text: [
              {
                text: 'CFDI DE INGRESO CON COMPLEMENTO CARTA PORTE \n',
                fontSize: 10
              },
              {
                text: `Empresa: ${empresa.razon_social} \n`,
                fontSize: 9
              },
              {
                text: `Dirección: ${empresa.calle} \n`,
                fontSize: 9
              }
            ]
          },
          {},
          {
            text: [
              {
                text: `Fecha de impresion: ${moment().format('YYYY/MM/DD hh:mm:ss')}  \n`,
                fontSize: 9
              },
              { text: `Informe de guia  \n`, fontSize: 9 },
              { text: `RFC: ${empresa.rfc} \n`, fontSize: 9 },
              {
                text: `Lugar de expedicion: ${empresa.calle}, ${empresa.estado}, ${empresa.pais}, ${empresa.codigo_postal}`,
                fontSize: 9
              }
            ]
          }
        ],
        columnGap: 10
      },
      '-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------',
      {
        alignment: 'justify',
        columns: [
          {
            text: [
              {
                text: 'TRIP \n',
                fontSize: 11
              },
              { text: `${trip.id} \n`, fontSize: 9 }
            ]
          },
          {
            text: [
              { text: 'ESTATUS \n', fontSize: 11 },
              { text: 'TRANSITO \n', fontSize: 9 }
            ]
          },
          {
            text: [
              { text: 'SERVICIO \n', fontSize: 11 },
              { text: 'CARRETERA \n', fontSize: 9 }
            ]
          },
          {
            text: [
              { text: 'Referencia \n', fontSize: 11 },
              {
                text: `${trip.referencia} \n`,
                fontSize: 9
              }
            ]
          },
          {
            text: [
              { text: 'FECHA \n', fontSize: 11 },
              {
                text: `${moment(trip.createdAt).format('DD/MM/YYYY')} \n`,
                fontSize: 9
              }
            ]
          }
        ],
        columnGap: 10
      },
      '-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------',
      {
        alignment: 'justify',
        columns: [
          {
            text: [
              {
                text: 'OPERADOR \n',
                fontSize: 10
              },
              {
                text: `${operador.nombre} ${operador.paterno} ${operador.materno} \n`,
                fontSize: 9
              }
            ]
          },
          {
            text: [
              { text: 'TRACTOR \n', fontSize: 10 },
              { text: `${tractor.numero_economico} \n`, fontSize: 9 }
            ]
          },
          {
            text: [
              { text: 'PLACAS \n', fontSize: 10 },
              { text: `${tractor.matricula} \n`, fontSize: 9 }
            ]
          },
          {
            text: [
              { text: 'CAJA \n', fontSize: 10 },
              {
                text: `${caja.numero_economico}/${caja.marca} \n`,
                fontSize: 9
              }
            ]
          }
        ],
        columnGap: 10
      },
      '-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------',
      {
        alignment: 'justify',
        columns: [
          {
            text: [
              {
                text: 'CLIENTE \n',
                fontSize: 10
              },
              {
                text: `NOMBRE: ${cliente.razon_social} \n`,
                fontSize: 9
              },
              { text: `CALLE: ${cliente.calle} \n`, fontSize: 9 },
              { text: `COLONIA: ${cliente.colonia} \n`, fontSize: 9 },
              {
                text: `ESTADO: ${cliente.estado}, ${cliente.pais}, ${cliente.codigo_postal}`,
                fontSize: 9
              }
            ]
          },
          {
            text: [
              { text: 'Documentos \n', fontSize: 10 },
              { text: '1.-NOTA C \n', fontSize: 9 },
              { text: '2.-CARTA PORTE \n', fontSize: 9 },
              { text: '3.-FACTURA DE ORIGEN \n', fontSize: 9 }
            ]
          }
        ],
        columnGap: 20
      },
      '-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------',
      {
        alignment: 'justify',
        columns: [
          {
            text: [
              { text: 'ORIGEN \n', fontSize: 10 },
              {
                text: `NOMBRE: ${origen.nombre} \n`,
                fontSize: 9
              },
              { text: `CALLE: ${origen.calle} \n`, fontSize: 9 },
              {
                text: `COLONIA: ${origen.colonia} \n`,
                fontSize: 9
              },
              {
                text: `C.P.: ${origen.codigo_postal} ${origen.municipio}, ${origen.estado}, ${origen.pais} \n`,
                fontSize: 9
              }
            ]
          },
          {
            text: [
              { text: 'DESTINO \n', fontSize: 10 },
              {
                text: `NOMBRE: ${destino.nombre} \n`,
                fontSize: 9
              },
              { text: `CALLE: ${destino.calle} \n`, fontSize: 9 },
              {
                text: `COLONIA: ${destino.colonia} \n`,
                fontSize: 9
              },
              {
                text: `C.P.: ${destino.codigo_postal} ${destino.municipio}, ${destino.estado}, ${destino.pais} \n`,
                fontSize: 9
              }
            ]
          }
        ],
        columnGap: 20
      },
      '-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------',
      {
        table: {
          widths: ['*'],
          headerRows: 1,
          body: [
            [
              {
                text: 'OBSERVACIONES',
                fontSize: 10,
                colSpan: 1
              }
            ],
            [
              {
                text: trip.observaciones,
                fontSize: 7
              }
            ]
          ]
        }
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
      },
      '\n',
      {
        columns: [
          {
            width: '*',
            table: {
              body: [
                [
                  { text: 'Gastos', fontSize: 10 },
                  { text: 'Monto', fontSize: 10 }
                ],
                [
                  { text: 'KMS', fontSize: 9 },
                  {
                    text: '*',
                    fontSize: 9
                  }
                ],
                [
                  { text: 'Combustible', fontSize: 9 },
                  {
                    text: '*',
                    fontSize: 9
                  }
                ],
                [
                  { text: 'Viaticos', fontSize: 9 },
                  { text: '*', fontSize: 9 }
                ],
                [
                  { text: 'Casetas', fontSize: 9 },
                  { text: '*', fontSize: 9 }
                ],
                [
                  {
                    text: 'Nota: horario de caseta sabinas de 19:00 pm a 7:00 am.',
                    colSpan: 2,
                    fontSize: 10
                  }
                ],
                [
                  {
                    text: `Ventana carga: ${moment(trip.ventana_carga).format(
                      'DD/MM/YYYY hh:mm:ss A'
                    )}.`,
                    colSpan: 2,
                    fontSize: 10
                  }
                ],
                [
                  {
                    text: `Ventana entrega: ${moment(trip.ventana_entrega).format(
                      'DD/MM/YYYY hh:mm:ss A'
                    )}.`,
                    colSpan: 2,
                    fontSize: 10
                  }
                ]
              ]
            }
          },
          {
            width: 'auto',
            table: {
              body: [
                [
                  { text: 'Concepto', fontSize: 10 },
                  { text: 'Monto', fontSize: 10 },
                  { text: 'IVA', fontSize: 10 },
                  { text: 'Retencion', fontSize: 10 },
                  { text: 'Total', fontSize: 10 }
                ],
                ...(await ingresos()),
                [
                  { text: '', colSpan: 3 },
                  {},
                  {},
                  {
                    text: `Subtotal: *`,
                    fontSize: 9,
                    colSpan: 2
                  }
                ],
                [
                  { text: '', colSpan: 3 },
                  {},
                  {},
                  {
                    text: `IVA: *`,
                    fontSize: 9,
                    colSpan: 2
                  }
                ],
                [
                  { text: '', colSpan: 3 },
                  {},
                  {},
                  {
                    text: `Retencion: *`,
                    fontSize: 9,
                    colSpan: 2
                  }
                  // { text: '*' },
                ],
                [
                  { text: '', colSpan: 3 },
                  {},
                  {},
                  {
                    text: `Total: *`,
                    fontSize: 9,
                    colSpan: 2
                  }
                ]
              ]
            }
          }
        ]
      },
      ...(await generateTimbre(timbre))
    ]
  }

  return docDefinition
}
