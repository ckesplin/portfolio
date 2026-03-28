import { useState, useEffect } from 'react'

const useTheme = () => {
  const [dark, setDark] = useState(
    () => localStorage.getItem('theme') !== 'light'
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return { dark, toggle: () => setDark(d => !d) }
}

export default useTheme