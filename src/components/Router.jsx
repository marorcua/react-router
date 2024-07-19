import { Children, useEffect, useState } from 'react'
import { EVENTS } from '../consts'
import Page404 from '../pages/404Page'
import { match } from 'path-to-regexp'
import { getLocationPath } from '../utils'

export function Router({
  children,
  routes = [],
  defaultComponent: DefaultComponent = () => <Page404 />,
}) {
  const [currentPath, setCurrentPath] = useState(getLocationPath())
  useEffect(() => {
    const onLocationChange = () => setCurrentPath(getLocationPath())

    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
    window.addEventListener(EVENTS.POPSTATE, onLocationChange)
    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
    }
  }, [])

  const routesFromChildren = Children.map(children, (child) => {
    const {
      props,
      type: { name },
    } = child

    const isRoute = name === 'Route'

    return isRoute ? props : null
  })
  const routesToUse = routes.concat(routesFromChildren).filter(Boolean)

  let routeParams = {}

  const Page = routesToUse.find(({ path }) => {
    if (path === currentPath) return true

    const matcherUrl = match(path, { decode: decodeURIComponent })
    const matched = matcherUrl(currentPath)

    if (!matched) return false
    routeParams = matched.params
    return true
  })?.Component
  console.log(Page ? true : false)
  return Page ? (
    <Page routeParams={routeParams} />
  ) : (
    <DefaultComponent routeParams={routeParams} />
  )
}
