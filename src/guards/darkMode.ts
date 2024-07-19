export const darkMode = (darkMode: boolean) => {
  const body = document.body

  if (darkMode) {
    body.classList.remove('light-mode')
    body.classList.add('dark-mode')
  } else {
    body.classList.remove('dark-mode')
    body.classList.add('light-mode')
  }

  localStorage.setItem('dark-mode', JSON.stringify(darkMode))
}
