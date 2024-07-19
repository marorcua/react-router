import { useState } from 'react'
import { Link } from '../Link'

const i18n = {
  es: {
    description: 'Hola estoy creando un clon de react-router',
    title: 'Sobre la página',
  },
  en: {
    description: 'Hello I am creating a react-router clone',
    title: 'About',
  },
}

const useI18n = (lang) => {
  return i18n[lang] || i18n.en
}

export default function About({ routeParams }) {
  const i18n = useI18n(routeParams?.lang)
  return (
    <>
      <h1>{i18n.title}</h1>
      <p>{i18n.description}</p>
      <Link to='/' title='Inicio' />
    </>
  )
}
