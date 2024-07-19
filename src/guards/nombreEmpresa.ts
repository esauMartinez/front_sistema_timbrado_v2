export const nombreEmpresa = () => {
  const data = JSON.parse(localStorage.getItem('usuario')!)
  return data.empresa.razon_social
}
