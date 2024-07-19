import { lazy, Suspense } from 'react'
import './App.css'
// import HomePage from './pages/Home'
// import About from './pages/About'
import { Router } from './components/Router'
import Route from './components/Route'

const LazyAbout = lazy(() => import('./pages/About'))
const LazyHome = lazy(() => import('./pages/Home'))

const routes = [
  {
    path: '/:lang/about',
    Component: LazyAbout,
  },
  {
    path: '/search/:query',
    Component: function ReturnComponent({ routeParams }) {
      return <h1>Buscador de rutas {routeParams?.query}</h1>
    },
  },
]

function App() {
  return (
    <main>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Router routes={[]}>
          <Route Component={LazyHome} path='/' />
          <Route Component={LazyAbout} path='/about' />
        </Router>
      </Suspense>
    </main>
  )
}

export default App
