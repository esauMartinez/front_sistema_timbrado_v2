export const logotipo = () => {
  const data = JSON.parse(localStorage.getItem('usuario')!)
  if (data.role.nombre === 'USER_SUPER_ADMIN' || data.role.nombre === 'USER_CLIENT') {
    return {
      find: false,
      razon_social: 'SUPER'.substring(0, 2)
    }
  } else {
    if (data.empresa.logotipo === null) {
      return {
        find: false,
        razon_social: data.empresa.razon_social.substring(0, 2)
      }
    } else {
      return { find: true, logotipo: data.empresa.logotipo }
    }
  }
}
