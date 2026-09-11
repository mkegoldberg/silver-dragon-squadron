// Shared reactive state for the slide-out nav (replaces jQuery pageslide).
export function useNav() {
  const isOpen = useState<boolean>('nav-open', () => false)
  const open = () => (isOpen.value = true)
  const close = () => (isOpen.value = false)
  const toggle = () => (isOpen.value = !isOpen.value)
  return { isOpen, open, close, toggle }
}
