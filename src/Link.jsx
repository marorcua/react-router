import { EVENTS } from './consts'

export function navigate(ref) {
  window.history.pushState({}, '', ref)

  const navigationEvent = new Event(EVENTS.PUSHSTATE)
  window.dispatchEvent(navigationEvent)
}

export function Link({ to, title, target, ...props }) {
  const handleClick = (e) => {
    const isMainEvent = e.button === 0 //primary click
    const isModifiedEvent = e.metaKey || e.ctrlKey || e.altKey || e.shiftKey
    const isManageableEvent = target === undefined || target === '_self'

    if (isMainEvent && isManageableEvent && !isModifiedEvent) {
      e.preventDefault()
      navigate(to)
    }
  }

  return <a href={to} onClick={handleClick} target={target} {...props} />
}
