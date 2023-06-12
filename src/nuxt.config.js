import colors from 'vuetify/es5/util/colors'

let API_URL

// if (process.env.NODE_ENV === 'development') {
  API_URL = process.env.BASE_URL_DEVELOPMENT
// }

const axiosConfig = {
  baseURL: API_URL,
  withCredentials: true,
}

export default {
  // server: {
  //   port: 8088 // default: 3000
  // },
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - foundation-ui',
    title: 'foundation-ui',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/composition-api/module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: axiosConfig,

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: API_URL,
    },
  },

  privateRuntimeConfig: {
    axios: axiosConfig,
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  router: {
    // middleware: ['isAuthenticated']
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue')
      })
    }
  },

  auth: {
    watchLoggedIn: true,
    rewriteRedirects: true,
    fullPathRedirect: true,
    // plugins custom made for CA
    plugins: [],
    // stategum
    strategies: {
      local: {
        token: {
          property: 'data.token',
          global: true,
          required: true,
          type: 'Bearer'
        },
        user: {
          property: false,
          autoFetch: true
        },
        endpoints: {
          login: { url: `${API_URL + '/login'}`, method: 'post', propertyName: "data.token"},
          logout: { url: `${API_URL + '/logout'}`, method: 'post' },
          user: { url: `${API_URL + '/user'}`, method: 'get', propertyName: "data.user"}
        }
      },
      google: {
        clientId: '109019455855-hjv5klrhc7ugf0dd0j1e4u3dim6fcicf.apps.googleusercontent.com',
        codeChallengeMethod: '',
        responseType: 'code',
        redirectUri: `${process.env.NODE_ENV === 'development' ? 'http://localhost:8088/login' :
        process.env.NODE_ENV === 'staging' ? 'https://foundation-dev.wm4d.com/social-login' : 'https://foundation.wm4d.com/social-login' }`,
        token: {
          property: 'data.token',
          global: true,
          required: true,
          type: 'Bearer'
        },
        userInfo: {
          property: false,
          autoFetch: true
        },
        endpoints: {
          token: API_URL + '/social-login', // some backend url to resolve your auth with google and give you the token back
          userInfo: '/user?noswal' // the endpoint to get the user info after you received the token 
        },
      },
    },
    redirect: false,
  },
}
