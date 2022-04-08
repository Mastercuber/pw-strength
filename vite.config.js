import { defineConfig } from 'vite'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueI18n({
      /*include: resolve(__dirname, 'src', 'locales', '**'),*/
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
