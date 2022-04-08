import { defineConfig } from 'vite'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueI18n({
      fullInstall: false,
      runtimeOnly: true,
      compositionOnly: true,
      defaultSFCLang: 'json',
      globalSFCScope: true // dadurch kann mit useI18n({ useScope: 'global', inheritLocale: true }) auch auf die Übersetzungen dieser Komponente zugegriffen werden
    }),
    dts()
  ],
  build: {
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, 'src', 'components', 'PasswordStrength.vue'),
      name: 'PasswordStrength',
      formats: ['es', 'umd'],
      fileName: format => `password-strength.${format}.js`
    },
    ssr: false,
    polyfillModulePreload: true,
    rollupOptions: {
      external: ['vue', 'vue-i18n'],
      output: {
        globals: {
          vue: 'Vue',
          'vue-i18n': 'vueI18n'
        }
      }
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      treeShaking: true,
      minify: true,
      charset: 'utf8',
      sourcemap: false,
      logLevel: 'warning',
      color: true,
      incremental: true
    }
  }
})
