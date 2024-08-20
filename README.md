# Dani

<!-- MarkdownTOC -->

* [What is this?](#what-is-this)
* [What does this look like?](#what-does-this-look-like)
* [Who is this for?](#who-is-this-for)
* [How do I get started?](#how-do-i-get-started)
* [What are some included features?](#what-are-some-included-features)
* [How do I...](#how-do-i)
* [Why did you make this?](#why-did-you-make-this)
* [The site: appearance and themes](#the-site-appearance-and-themes)
* [Out of the box: built with / set up with](#out-of-the-box-built-with--set-up-with)
* [See also](#see-also)
* [Thanks](#thanks)
* [Dedicated to](#dedicated-to)

<!-- /MarkdownTOC -->

## What is this?
A starting point for developing, documenting and showcasing your JavaScript library. You can work on your JS library source code and the demo site at the same time, and see the changes live as you edit. Your library is built and testable along with your site in development as you make changes.

When you're ready, one command bundles and minifies your JS library (in `/dist`) and makes a deployment-ready version of your site (in `/site/dist`) in one go. You can then publish your library and deploy your site using whatever method or channel you prefer.

## What does this look like?
www.example.com

## Who is this for?
Anyone making a JavaScript library who also wants to have a user-friendly demo / docs site. It's ideal if you want:
- a setup that bundles your library code
- to start documenting your library quickly
- your users to quickly see how your library works
- an easy way to show different options
- your users to try out your library in the browser

Fork it, modify it any way you like and consider a [donation](https://www.paypal.com/donate?hosted_button_id=T8Q8AHYNNXELW) if you feel it has helped you. The site uses Vue as a UI component library, so knowledge about that framework is an advantage.       

## How do I get started?
1. Fork this repo
2. `git clone` your fork to your computer
3. `cd dani`
4. `npm i && cd site && npm i && cd ..`
5. Run `npm run dev` to start developing
6. Develop your JS library in `/src` and your accompanying site in `/site/src`
7. See the site and test your library live on `localhost:8080`
8. Run tests using `npm run test`
9. `npm run build` makes deployment-ready code in `/dist` and site in `/site/dist`

## What are some included features?
- An elegant, responsive site to present and share your library
- Integrated code playground on the site for visitors to try features
- A feature-rich UI component library, routing and state management
- Multi-language support for your site
- Rather fancy and fine-grained theme switcher
- Command palette for CMD+K keyboard navigation

## How do I...
- add my own JS library instead of that silly cat zoom thing?
    - change `/src/index.js` to be the entry point to your JS source code
- add content to the pages?
    - edit the files in `/site/src/views`
    - refer to [PrimeVue documentation](https://primevue.org/autocomplete/) on how to use their components
- add a page?
    - add a file to `/site/src/views`
    - add the url and view to vue-router in `/site/src/router`
    - optionally add it to the menu in `/site/src/components/navigation/MenuWrapper.vue`
- add demo code blocks?
    - see `/site/src/components/demos/DemoBlockDemo.vue` for an example
- add other languages?
    - add a JSON file to `/site/src/locales`
    - add the language to the selector in `site/src/components/navigation/NavBar.vue`
- ... (more recipes to be added if requested)

## Why did you make this?
This was made to present a rather ambitious JavaScript library I was working on. Then, life happened, with ups and downs. I realised that while the library wasn't going to see daylight, I could with little effort share the site framework itself to others. It's part of my bucket list of creative things to accomplish and share before dying (happily):
- [x] Draw a programming font from scratch: [Victor Mono](https://rubjo.github.io/victor-mono/)
- [x] Create a software development resource (this one)
- [ ] Compose, perform and record music
- [ ] Learn to draw and paint and make art
- [ ] Create a game
- [ ] Write a book

## The site: appearance and themes
The styling and appearance of this site started out as a simple light/dark
toggle, like the one you see so many other places. Then I started thinking
about what it would look like if the theme selector instead was a seamless
brightness slider, with the interesting challenges with contrast which
arise when the values are in the middle range.

After that, it was only natural to extend this further with hue and
saturation controls. Finally, a color mode selection was made to support a
few different looks, mainly for the code views.

## Out of the box: built with / set up with 
Some of the many libraries and resources used:
- [Vue](https://vuejs.org/)
- [PrimeVue](https://primevue.org/)
- [vue-sidebar-menu](https://yaminncco.github.io/vue-sidebar-menu/)
- [Tabler icons](https://tabler.io/docs/icons/vue)
- [Pinia](https://pinia.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [vue-i18n](https://vue-i18n.intlify.dev/)
- [vue-codemirror](https://github.com/surmon-china/vue-codemirror) / [Codemirror](https://codemirror.net/)
- [ninjakeys](https://github.com/ssleptsov/ninja-keys)
- [Atropos](https://atroposjs.com/)
- [Vite](https://vitejs.dev/) with [Vite Devtools](https://devtools-next.vuejs.org/)
- [Rollup](https://rollupjs.org/)
- [Vitest](https://vitest.dev/)
- [Babel](https://babeljs.io/)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)
- [Stylelint](https://stylelint.io/)

## See also
- My free programming font [Victor Mono](https://rubjo.github.io/victor-mono/) (also on [Google Fonts](https://fonts.google.com/specimen/Victor+Mono))
- My editor theme Ultimate Dark Neo for [VS Code](https://marketplace.visualstudio.com/items?itemName=rubjo.ultimate-dark-neo&ssr=false#overview), [Sublime Text](https://packagecontrol.io/packages/Ultimate%20Dark%20Neo) and [Zed](https://github.com/rubjo/ultimate-dark-neo-zed)

## Thanks
You're welcome. [Donations are very much appreciated](https://www.paypal.com/donate?hosted_button_id=T8Q8AHYNNXELW), if you should be so inclined. Also, I welcome PRs to improve the usefulness of Dani overall.

<hr>

## Dedicated to
M 🌸
M 💪🏼
D ⚽️
V 🎮
