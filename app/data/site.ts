// Site-wide chrome content: navigation, hero, footer.

export const nav = [
  { label: 'HOME', to: '/' },
  { label: 'About Steve', to: '/about-steve' },
  { label: 'About The Plane', to: '/about-the-plane' },
  { label: 'What This Project Means to Steve', to: '/what-this-project-means-to-steve' },
  { label: 'Piece By Piece', to: '/sample-page' },
]

export const site = {
  name: 'Silver Dragon Squadron',
  url: 'https://silverdragonsquadron.com',
  hero: {
    eyebrow: 'FLIGHT TESTING EMINENT',
    subtitle: 'An aviation project by Steve Kim',
  },
  quote: {
    text: 'Strive not to be a success, but rather to be of value',
    author: 'Albert Einstein',
  },
  footer: {
    copyright: 'All Rights Reserved.',
  },
}
