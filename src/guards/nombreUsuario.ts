export const nombreUsuario = () => {
  const data = JSON.parse(localStorage.getItem('usuario')!)
  return `${data.nombre} ${data.paterno}`
}
