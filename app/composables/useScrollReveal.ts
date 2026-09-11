// Reveals an element with an animate.css effect when it scrolls into view.
// Desktop-only (>=768px), skipped under prefers-reduced-motion, fires once.
//
// A single module-level IntersectionObserver is shared by every reveal target.
// Elements already in view when observed (above the fold) fire immediately,
// so those animate on load.

interface RevealOptions {
  /** Extra delay before the animation starts, in milliseconds. */
  delay?: number
}

let observer: IntersectionObserver | null = null
const pending = new WeakMap<Element, { effect: string; delay: number }>()

/** True only on the client, on a desktop viewport, without reduced-motion. */
function shouldAnimate(): boolean {
  if (!import.meta.client) return false
  if (!('IntersectionObserver' in window)) return false
  const desktop = window.matchMedia('(min-width: 768px)').matches
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return desktop && !reduced
}

function getObserver(): IntersectionObserver {
  if (observer) return observer
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const el = entry.target as HTMLElement
        const info = pending.get(el)
        observer!.unobserve(el)
        pending.delete(el)
        if (!info) continue
        // Reveal + animate in the same frame so there is no flash of the
        // final (opacity 1) state before the keyframes take over.
        el.classList.remove('reveal-hidden')
        if (info.delay) el.style.animationDelay = `${info.delay}ms`
        el.classList.add('animate__animated', `animate__${info.effect}`)
      }
    },
    { threshold: 0.15 },
  )
  return observer
}

export function useScrollReveal() {
  /**
   * Hide `el` and reveal it with `animate__<effect>` when it enters the
   * viewport. No-op (element stays visible/in place) when shouldAnimate() is
   * false. Call from a client lifecycle hook (onMounted / directive mounted).
   */
  function reveal(el: HTMLElement, effect: string, opts: RevealOptions = {}) {
    if (!shouldAnimate()) return
    el.classList.add('reveal-hidden')
    pending.set(el, { effect, delay: opts.delay ?? 0 })
    getObserver().observe(el)
  }

  return { reveal }
}
