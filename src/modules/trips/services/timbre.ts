import type { Timbre } from '@/modules/trips/interfaces/timbre'

export const generateTimbre = async (timbre: Timbre): Promise<any> => {
  const data: any = [
    {
      columns: [
        {},
        {
          image: `data:image/jpeg;base64,${timbre.codigo_qr}`,
          width: 100
        }
      ]
    },
    {
      table: {
        // widths: ['*', '*', '*', '*'],
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
              alignment: 'center',
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
    }
  ]

  return data
}
