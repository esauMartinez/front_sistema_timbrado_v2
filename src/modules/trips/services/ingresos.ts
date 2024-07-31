export const ingresos = (): Promise<any> => {
  const ingresos: any = []

  ingresos.forEach((x: any) => {
    ingresos.push([
      { text: x.concepto, fontSize: 9 },
      { text: '*', fontSize: 9 },
      { text: '*', fontSize: 9 },
      { text: '*', fontSize: 9 },
      {
        text: '*',
        fontSize: 9
      }
    ])
  })

  return ingresos
}
