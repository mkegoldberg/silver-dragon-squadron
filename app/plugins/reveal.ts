// Registers the `v-reveal` directive — declarative scroll reveal for a single
// element. Usage:
//   <img v-reveal="'bounceInUp'" />
//   <img v-reveal="{ effect: 'bounceInDown', delay: 100 }" />
//
// The mounted hook runs on the client only; getSSRProps keeps static
// generation from warning about an unhandled custom directive.

type RevealBinding = string | { effect: string; delay?: number }

export default defineNuxtPlugin((nuxtApp) => {
  const { reveal } = useScrollReveal()

  nuxtApp.vueApp.directive<HTMLElement, RevealBinding>('reveal', {
    mounted(el, binding) {
      const value = binding.value
      const effect = typeof value === 'string' ? value : value?.effect
      const delay = typeof value === 'object' ? value?.delay : undefined
      if (effect) reveal(el, effect, { delay })
    },
    getSSRProps() {
      return {}
    },
  })
})
