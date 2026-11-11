import { defineConfig } from 'tsup'
import path from 'path'

export default defineConfig([
  /* Componentes React + utilidades */
  {
    entry: {
      index: 'src/index.ts',
      'tailwind.preset': 'src/tailwind.preset.ts',
    },
    format: ['esm', 'cjs'],
    dts: true,
    splitting: false,
    clean: true,
    sourcemap: true,
    external: ['react', 'react-dom'],
    esbuildOptions(options) {
      options.jsx = 'automatic'
    },
  },
  /* CSS tokens — compilado con PostCSS para que el consumer sólo haga un import */
  {
    entry: { styles: 'src/tokens/index.css' },
    loader: { '.css': 'copy' },
    clean: false,
  },
])
