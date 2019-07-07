import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { nuxtI18nSeo } from './seo-head'

Vue.use(VueI18n)

export default async ({ app, route, store, req }) => {
  // Options
  const lazy = false
  const vuex = {"moduleName":"i18n","mutations":{"setLocale":"I18N_SET_LOCALE","setMessages":"I18N_SET_MESSAGES"},"preserveState":false}

  // Helpers
  const LOCALE_CODE_KEY = 'code'
  const LOCALE_DOMAIN_KEY = 'domain'
  const getLocaleCodes = (locales = []) => {
  if (locales.length) {
    // If first item is a sting, assume locales is a list of codes already
    if (typeof locales[0] === 'string') {
      return locales
    }
    // Attempt to get codes from a list of objects
    if (typeof locales[0][LOCALE_CODE_KEY] === 'string') {
      return locales.map(locale => locale[LOCALE_CODE_KEY])
    }
  }
  return []
}
  const getLocaleFromRoute = (route = {}, routesNameSeparator = '', defaultLocaleRouteNameSuffix = '', locales = []) => {
  const codes = getLocaleCodes(locales)
  const localesPattern = `(${codes.join('|')})`
  const defaultSuffixPattern = `(?:${routesNameSeparator}${defaultLocaleRouteNameSuffix})?`
  // Extract from route name
  if (route.name) {
    const regexp = new RegExp(`${routesNameSeparator}${localesPattern}${defaultSuffixPattern}$`, 'i')
    const matches = route.name.match(regexp)
    if (matches && matches.length > 1) {
      return matches[1]
    }
  } else if (route.path) {
    // Extract from path
    const regexp = new RegExp(`^/${localesPattern}/`, 'i')
    const matches = route.path.match(regexp)
    if (matches && matches.length > 1) {
      return matches[1]
    }
  }
  return null
}
  const getHostname = () => (
  process.browser ? window.location.href.split('/')[2] : req.headers.host // eslint-disable-line
)
  const getForwarded = () => (
  process.browser ? window.location.href.split('/')[2] : (req.headers['x-forwarded-host'] ? req.headers['x-forwarded-host'] : req.headers.host)
)
  const getLocaleDomain = () => {
  const hostname = app.i18n.forwardedHost ? getForwarded() : getHostname()
  if (hostname) {
    const localeDomain = app.i18n.locales.find(l => l[LOCALE_DOMAIN_KEY] === hostname) // eslint-disable-line
    if (localeDomain) {
      return localeDomain[LOCALE_CODE_KEY]
    }
  }
  return null
}
  const syncVuex = (locale = null, messages = null) => {
  if (vuex && store) {
    if (locale !== null && vuex.mutations.setLocale) {
      store.dispatch(vuex.moduleName + '/setLocale', locale)
    }
    if (messages !== null && vuex.mutations.setMessages) {
      store.dispatch(vuex.moduleName + '/setMessages', messages)
    }
  }
}

  // Register Vuex module
  if (store) {
    store.registerModule(vuex.moduleName, {
      namespaced: true,
      state: () => ({
        locale: '',
        messages: {}
      }),
      actions: {
        setLocale ({ commit }, locale) {
          commit(vuex.mutations.setLocale, locale)
        },
        setMessages ({ commit }, messages) {
          commit(vuex.mutations.setMessages, messages)
        }
      },
      mutations: {
        [vuex.mutations.setLocale] (state, locale) {
          state.locale = locale
        },
        [vuex.mutations.setMessages] (state, messages) {
          state.messages = messages
        }
      }
    }, { preserveState: vuex.preserveState })
  }

  // Set instance options
  app.i18n = new VueI18n({"messages":{"en":{"notifications":"Notifications","settings":"Settings","addSubject":"Add subject","login":"Log in","logout":"Log out","publications":"YOUR PUBLICATIONS","saved":"SAVED","administrator":"ADMINISTERING","search":"Search","contract":"Contract","expand":"Expand","tags":"Tags","visibility":"Visibility","descripcion":"Description (optional)","create":"Create","share":"Share","addAdmin":"Add administrator","deleteSubject":"Delete subject","new":"New","delete":"Delete","deleteText":"Are you sure to delete ","cancel":"Cancel","select":"Select","admins":"Admins","id":"Id","public":"Public","private":"Private","isPublic":"Is public","isPrivate":"It can only be seen by you","isAdmin":"It can only be seen by super admins","page":"Page ","nextPage":"Next page","backPage":"Back page","comments":"Comments","loginGoogle":"Log in with Google","signup":"Sign up","signupGoogle":"Sign up with Google","subjectSaved":"Subject Saved","subjectNotSaved":"Save Subject","addSection":"Create section","title":"Title","superadmin":"Super Admin","deletePage":"Delete page","addPage":"Add page","adminAdvise":"Before creating the page, it will be revised by an admin","templateSelector":"Template Selector","editor":"Editor","completed":"Completed","pickTemplate":"Pick one template","completeData":"Complete the following data","back":"Back","publish":"Publish","createSection":"Create section","red":"Red","blue":"Blue","yellow":"Yellow","green":"Green","grey":"Gray","olive":"Olive","purple":"Purple","orange":"Orange","brown":"Brown","navy":"Navy","turquese":"Turquese","change":"Change","text":"Text","textSubtitle":"Simply text without format","image":"Image","imageSubtitle":"Image with description","video":"Video","videoSubtitle":"Video with description","youtubeSubtitle":"Video of Youtube Embedded","audio":"Audio","audioSubtitle":"Audio with description","pdf":"PDF","pdfSubtitle":"PDF document viewer","card":"","cardSubtitle":"","code":"","codeSubtitle":"","collage":"","collageSubtitle":"","connect":"","connectSubtitle":"","galery":"","galerySubtitle":"","graph":"","graphSubtitle":"","list":"","listSubtitle":"","table":"","tableSubtitle":"","test":"","testSubtitle":"","textformat":"","textformatSubtitle":"","write":"","writeSubtitle":""},"es":{"notifications":"Notificaciones","settings":"Configuración","addSubject":"Crear materia","login":"Iniciar Sesión","logout":"Cerrar Sesión","publications":"TUS PUBLICACIONES","saved":"GUARDADOS","administrator":"ADMINISTRANDO","search":"Buscar","contract":"Contraer","expand":"Expandir","tags":"Tags","visibility":"Visibilidad","descripcion":"Descripcion (opcional)","create":"Crear","share":"Compartir","addAdmin":"Agregar administrador","deleteSubject":"Eliminar Materia","new":"Nuevo","delete":"Borrar","deleteText":"¿Estás seguro de eliminar ","cancel":"Cancelar","select":"Seleccionar","admins":"Administradores","id":"Identificador","public":"Público","private":"Privado","isPublic":"Es público","isPrivate":"Solo puede ser visto por ti","isAdmin":"Solo puede ser visto por super administradores","page":"Página ","nextPage":"Página anterior","backPage":"Página siguiente","comments":"Comentarios","loginGoogle":"Iniciar con Google","signup":"Registrarse","signupGoogle":"Registrarse con Google","subjectSaved":"Materia guardada","subjectNotSaved":"Guardar materia","addSection":"Crear sección","title":"Título","superadmin":"Super Administrador","deletePage":"Borrar página","addPage":"Crear Página","adminAdvise":"Al crear una página, esta será revisada antes por un administrador","templateSelector":"Selector de plantilla","editor":"Editor","completed":"Completado","pickTemplate":"Escoge una plantilla","completeData":"Completa los siguientes campos","back":"Volver","publish":"Publicar","createSection":"Crear sección","change":"Cambiar","red":"Rojo","blue":"Azul","yellow":"Amarillo","green":"Verde","grey":"Gris","olive":"Oliva","purple":"Morado","orange":"Naranja","brown":"Marrón","navy":"Navy","turquese":"Turquesa","text":"Texto","textSubtitle":"Texto sencillo, sin formato","image":"Imagen","imageSubtitle":"Imagen con descripción","video":"Video","videoSubtitle":"Video con descripción","youtubeSubtitle":"Video de Youtube embebido","audio":"Audio","audioSubtitle":"Audio con descripción","pdf":"PDF","pdfSubtitle":"Visor de Documentos PDF","doc":"Documento","docSubtitle":".doc .docx .txt","spreadsheet":"Hoja de Cálculo","spreadsheetSubtitle":".xlsx .xls","presentation":"Presentación","presentationSubtitle":".pptx .ppt","card":"Tarjetas Flash","cardSubtitle":"Tarjetas con la respuesta ocultada","code":"Código","codeSubtitle":"Texto con resaltado de código","collage":"Collage","collageSubtitle":"Galeria de imagenes en collage","connect":"Conectar","connectSubtitle":"Unir preguntas con su respuesta","galery":"Galeria","galerySubtitle":"Galeria de imagenes a tamaño completo","graph":"Gráfica","graphSubtitle":"Todo tipo de gráfica","list":"Listas","listSubtitle":"Datos de texto listados","table":"Tabla","tableSubtitle":"Tablas con diferentes datos","math":"Matemáticas","mathSubtitle":"Representa diferentes expresiones matemáticas","test":"Test","testSubtitle":"Preguntas con varias respuestas posibles","textformat":"Texto enriquecido","textformatSubtitle":"Texto con varios formatos","write":"Pregunta de escribir","writeSubtitle":"Escribe la respuesta y comprueba si es correcta"}}})
  app.i18n.locales = ["en","es"]
  app.i18n.defaultLocale = 'es'
  app.i18n.differentDomains = false
  app.i18n.forwardedHost = false
  app.i18n.beforeLanguageSwitch = () => null
  app.i18n.onLanguageSwitched = () => null
  // Extension of Vue
  if (!app.$t) {
    app.$t = app.i18n.t
  }

  // Inject seo function
  Vue.prototype.$nuxtI18nSeo = nuxtI18nSeo

  if (store && store.state.localeDomains) {
    app.i18n.locales.forEach(locale => {
      locale.domain = store.state.localeDomains[locale.code];
    })
  }

  let locale = app.i18n.defaultLocale || null

  if (app.i18n.differentDomains) {
    const domainLocale = getLocaleDomain()
    locale = domainLocale ? domainLocale : locale
  } else {
    const routesNameSeparator = '___'
    const defaultLocaleRouteNameSuffix = 'default'

    const routeLocale = getLocaleFromRoute(route, routesNameSeparator, defaultLocaleRouteNameSuffix, app.i18n.locales)
    locale = routeLocale ? routeLocale : locale
  }

  app.i18n.locale = locale

  // Lazy-load translations
  if (lazy) {
    const { loadLanguageAsync } = require('./utils')
    const messages = await loadLanguageAsync(app.i18n, app.i18n.locale)
    syncVuex(locale, messages)
    return messages
  } else {
    // Sync Vuex
    syncVuex(locale, app.i18n.getLocaleMessage(locale))
  }
}
