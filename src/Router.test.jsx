import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import { Router } from './components/Router'
import { getLocationPath } from './utils'
import Route from './components/Route'
import { Link } from './Link'

vi.mock('./utils.js', () => ({
  getLocationPath: vi.fn(),
}))

describe('Router', () => {
  beforeEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('should work', () => {
    render(<Router routes={[]} />)
    expect(true).toBeTruthy()
  })

  it('should render 404 if no route is found', () => {
    render(<Router routes={[]} defaultComponent={() => <h1>404</h1>} />)
    console.log(screen.debug())
    expect(screen.getByText(404)).toBeTruthy()
  })

  it('should render the first route that matches', () => {
    getLocationPath.mockReturnValueOnce('/')

    const routes = [
      {
        path: '/',
        Component: () => <h1>Home</h1>,
      },
      {
        path: '/about',
        Component: () => <h1>About</h1>,
      },
    ]

    render(<Router routes={routes} />)
    expect(screen.getByText('Home')).toBeTruthy()
  })

  it('should render the first route that matches', () => {
    getLocationPath.mockReturnValueOnce('/about')

    const routes = [
      {
        path: '/',
        Component: () => <h1>Home</h1>,
      },
      {
        path: '/about',
        Component: () => <h1>About</h1>,
      },
    ]

    render(<Router routes={routes} />)
    expect(screen.getByText('About')).toBeTruthy()
  })

  it('should navigate using links', () => {
    getLocationPath.mockReturnValueOnce('/')

    render(
      <Router>
        <Route
          path='/'
          Component={() => (
            <>
              <h1>Home</h1>
              <Link to={'/about'}>link a Sobre</Link>
            </>
          )}
        />
        <Route
          path='/about'
          Component={() => (
            <>
              <h1>Sobre</h1>
              <Link to={'/'}>link a Home</Link>
            </>
          )}
        />
      </Router>,
    )

    const button = screen.getByText(/link a Sobre/)
    fireEvent.click(button)

    const titleAbout = screen.findByText('Sobre')

    expect(titleAbout).toBeTruthy()
  })
})
