import * as pdfMake from 'pdfmake/build/pdfmake'

import { useTimbradoStore } from '@/store/timbrado'
import { storeToRefs } from 'pinia'
import { useTripStore } from '@/store/trip'

export const usePDFTimbre = () => {
  const timbradoStore = useTimbradoStore()
  const tripStore = useTripStore()
  const {
    pdf,
    empresa,
    cliente,
    conceptos,
    mercancias,
    timbres,
    movimientos,
    tractor,
    caja,
    operador
  } = storeToRefs(timbradoStore)
  const { trip } = storeToRefs(tripStore)

  const getConceptos = () => {
    const array: any = []
    conceptos.value.forEach((concepto) => {
      const total = +concepto.monto + +concepto.iva - +concepto.retencion
      const c = [
        { text: 1, fontSize: 8 },
        { text: concepto.clave, fontSize: 8 },
        { text: '', fontSize: 8 },
        { text: concepto.nombre, fontSize: 8 },
        { text: concepto.monto, fontSize: 8 },
        { text: concepto.iva, fontSize: 8 },
        { text: concepto.retencion, fontSize: 8 },
        { text: total, fontSize: 8 }
      ]
      array.push(c)
    })
    return array
  }

  const getMercancias = () => {
    const array: any = []

    mercancias.value.forEach((mercancia) => {
      const m = [
        { text: mercancia.producto, fontSize: 8 },
        { text: mercancia.unidad_medida, fontSize: 8 },
        { text: mercancia.peso, fontSize: 8 },
        { text: mercancia.cantidad, fontSize: 8 },
        { text: mercancia.material_peligroso, fontSize: 8 },
        { text: mercancia.tipo_documento, fontSize: 8 },
        { text: mercancia.tipo_materia, fontSize: 8 },
        { text: mercancia.pedimento, fontSize: 8 },
        { text: mercancia.fraccion_arancelaria, fontSize: 8 },
        { text: mercancia.descripcion_materia, fontSize: 8 },
        { text: mercancia.identificador_documento_aduanero, fontSize: 8 }
      ]

      array.push(m)
    })
    return array
  }

  const pdfTimbre = async () => {
    const timbre = timbres.value[0]
    const origen = movimientos.value[0]
    const destino = movimientos.value[movimientos.value.length - 1]

    const docDefinition = {
      content: [
        {
          text: empresa.value.razon_social,
          fontSize: 18,
          bold: true,
          alignment: 'center'
        },
        '\n',
        {
          text: empresa.value.calle,
          fontSize: 14,
          bold: true,
          alignment: 'center'
        },
        '\n',
        {
          text: empresa.value.rfc,
          fontSize: 14,
          bold: true,
          alignment: 'center'
        },
        '-----------------------------------------------------------------------------------------------------------------------------------------------------------',
        {
          text: `RAZON SOCIAL: ${cliente.value.razon_social}`,
          fontSize: 9,
          alignment: 'left'
        },
        {
          text: `RFC: ${cliente.value.rfc}`,
          fontSize: 9,
          alignment: 'left'
        },
        {
          text: `DIRECCION: ${cliente.value.calle}`,
          fontSize: 9,
          alignment: 'left'
        },
        {
          text: `ESTADO: ${cliente.value.estado}`,
          fontSize: 9,
          alignment: 'left'
        },
        {
          text: `PAIS: ${cliente.value.pais}`,
          fontSize: 9,
          alignment: 'left'
        },
        {
          text: `CODIGO POSTAL: ${cliente.value.codigo_postal}`,
          fontSize: 9,
          alignment: 'left'
        },
        '-----------------------------------------------------------------------------------------------------------------------------------------------------------',
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
              ...getConceptos()
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
                  text: `USO DE CFDI: ${cliente.value.uso_cfdi} \n`,
                  fontSize: 10
                },
                {
                  text: `METODO DE PAGO: ${cliente.value.metodo_pago} \n`,
                  fontSize: 10
                },
                {
                  text: `FORMA DE PAGO: ${cliente.value.forma_pago} \n`,
                  fontSize: 10
                },
                {
                  text: `REGIMEN FISCAL RECEPTOR: ${cliente.value.regimen_fiscal} \n`,
                  fontSize: 10
                },
                {
                  text: `MONEDA: ${trip.value.moneda} \n`,
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
        '-----------------------------------------------------------------------------------------------------------------------------------------------------------',
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
                  text: trip.value.tipo_viaje,
                  fontSize: 8,
                  alignment: 'center'
                },
                {
                  text: trip.value.kilometros,
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
                  text: trip.value.ventana_carga,
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
                  text: trip.value.ventana_entrega,
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
                  text: empresa.value.permiso_sct,
                  fontSize: 8,
                  colSpan: 2,
                  alignment: 'center'
                },
                {},
                {
                  text: empresa.value.numero_permiso_sct,
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
                  text: tractor.value.id,
                  fontSize: 8,
                  alignment: 'center'
                },
                {
                  text: tractor.value.matricula,
                  fontSize: 8,
                  alignment: 'center'
                },
                {
                  text: tractor.value.modelo,
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
                  text: tractor.value.aseguradora,
                  fontSize: 8,
                  colSpan: 2,
                  alignment: 'center'
                },
                {},
                {
                  text: tractor.value.numero_poliza,
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
                  text: caja.value.numero_economico,
                  fontSize: 8,
                  alignment: 'center',
                  colSpan: 2
                },
                {},
                {
                  text: caja.value.matricula,
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
                  text: tractor.value.configuracion,
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
                  text: caja.value.configuracion,
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
                  text: operador.value.rfc,
                  fontSize: 8,
                  alignment: 'center'
                },
                {
                  text: operador.value.licencia,
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
                  text: `${operador.value.nombre} ${operador.value.paterno} ${operador.value.materno}`,
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
              ...getMercancias()
            ]
          }
        }
      ]
    }

    const pdfDocGenerator = pdfMake.createPdf(docDefinition)
    pdfDocGenerator.getDataUrl(async (dataUrl) => {
      timbradoStore.setPDF(dataUrl)
    })
  }

  return { pdf, pdfTimbre }
}
