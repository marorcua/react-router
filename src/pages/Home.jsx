import { Link } from '../Link'

export default function HomePage() {
  return (
    <>
      <h1>Ejemplo</h1>
      <p>Página de ejemplo</p>
      <Link to='/about' title='Sobre la página' />
    </>
  )
}
