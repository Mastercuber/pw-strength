import {defineConfig} from 'vite'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes('-')
        }
      }
    }),
    vueI18n({
      fullInstall: false,
      runtimeOnly: true,
      compositionOnly: true,
      defaultSFCLang: 'json',
      globalSFCScope: true
    })
  ],
  server: {
    port: 3001
  }
})
