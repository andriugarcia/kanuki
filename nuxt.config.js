module.exports = {

  head: {
    titleTemplate: '%s - Kanuki',
    link: [{
      rel: "stylesheet",
      href: 'https://use.fontawesome.com/releases/v5.8.1/css/all.css',
      integrity: "sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf",
      crossorigin: "anonymous"
    }],
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      }
    ]
  },

  loading: { color: '#339CD3' },

  manifest: {
    name: 'PWA Template',
    short_name: 'PWA',
    theme_color: '#339CD3'
  },

  plugins: [
    { src: '@/plugins/vue-quill', ssr: false },
    { src: '@/plugins/vue-masonry-css', ssr: false },
    { src: '@/plugins/vue-draggable', ssr: false }
  ],

  "presets": ['es2015', 'stage-0',
    "@babel/env",
    {
      targets: {
        "browsers": "> 5%"
      },
      useBuiltIns: "usage",
    },
  ],
  extractCSS: {
      allChunks: true
    },

    "html.minify": {
      collapseBooleanAttributes: true,
      decodeEntities: true,
      minifyCSS: true,
      minifyJS: true,
      processConditionalComments: true,
      removeEmptyAttributes: true,
      removeRedundantAttributes: true,
      trimCustomFragments: true,
      useShortDoctype: true
    },

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/router',
    '@nuxtjs/pwa',
    'nuxt-babel',
    ['@nuxtjs/vuetify', {
      materialIcons: true,
      theme: {
        primary: '#339CD3',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        lit: '#F0F0F0',

        cardred: '#D95F4A',
        cardgreen: '#64C270',
        cardblue: '#489AD8',
        cardpurple: '#9068B4',
        cardyellow: '#EDC233',
        cardorange: '#EA9F33',
        cardolive: '#55B599',
        cardgrey: '#818A8E',
        cardbrown: '#6D4C41',
        cardnavy: '#546E7A',
        cardturquese: '#00ACC1'
      }
    }],
    ['nuxt-i18n', {
      seo: false,
      locales: ['en', 'es'],
      defaultLocale: 'en',
      vueI18n: {
        messages: {
          en: require('./locales/en.json'),
          es: require('./locales/es.json')
        }
      }
    }]
  ],

}
