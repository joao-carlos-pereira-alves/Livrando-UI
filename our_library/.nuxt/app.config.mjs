
import { updateAppConfig } from '#app'
import { defuFn } from '/home/dopaminado/tcc/TCC-Frontend/our_library/node_modules/defu/dist/defu.mjs'

const inlineConfig = {}

// Vite - webpack is handled directly in #app/config
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    updateAppConfig(newModule.default)
  })
}



export default /* #__PURE__ */ defuFn(inlineConfig)
