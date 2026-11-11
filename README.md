# PriceSmart Design System

Librería de componentes React con Tailwind CSS para aplicaciones internas de PriceSmart.

## Estado del piloto

| Componente | Estado    | Figma                                               |
|------------|-----------|-----------------------------------------------------|
| Button     | ✅ Piloto | `Design System Master Library VARIABLES v4.1` / node `2210:441096` |
| Input      | ✅ Piloto | `Design System Master Library VARIABLES v4.1`       |
| Select     | ✅ Piloto | `Design System Master Library VARIABLES v4.1`       |

Los tokens primitivos en [`packages/pricesmart-ds/src/tokens/index.css`](packages/pricesmart-ds/src/tokens/index.css)
fueron extraídos directamente del archivo Figma `uv426oS23GgupkpwKd8Efy` via Figma MCP el 2026-11-11.
La tipografía principal es **Fira Sans** (confirmada desde la página Typography del archivo Figma).

---

## Instalación rápida

### 1. Desde el registro npm privado (producción)

```bash
npm install @pricesmart/ds
```

### 2. Desde .tgz local (sin publicar)

```bash
# En el directorio del DS
cd packages/pricesmart-ds
npm run build
npm pack
# → genera pricesmart-ds-0.1.0.tgz

# En la app consumidora
npm install /ruta/a/pricesmart-ds-0.1.0.tgz
```

### 3. Durante desarrollo (workspace)

El monorepo usa npm workspaces. Si trabajás dentro del repo:

```bash
# Desde la raíz
npm install
# @pricesmart/ds queda disponible para todos los workspaces automáticamente
```

---

## Configuración de la app consumidora

### a) Importar el CSS (una sola vez, en el entry point)

```ts
// main.tsx o index.ts
import '@pricesmart/ds/styles'
```

Esto inyecta los CSS custom properties (`--ps-color-*`, `--ps-spacing-*`, etc.) en `:root`.

### b) Extender Tailwind con el preset

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'
import psPreset from '@pricesmart/ds/tailwind-preset'

export default {
  presets: [psPreset],
  content: [
    './src/**/*.{ts,tsx}',
    // Incluir los componentes del DS para que Tailwind genere sus clases
    './node_modules/@pricesmart/ds/dist/**/*.js',
  ],
} satisfies Config
```

**El preset no pisa la config de Tailwind de la app.** Solo extiende `colors`, `fontFamily`, `fontSize`, `borderRadius`, `boxShadow` y `spacing` con los tokens `ps-*`. La app puede seguir usando sus propias clases de Tailwind.

---

## Uso de componentes

```tsx
import { Button, Input, Select } from '@pricesmart/ds'

// Button
<Button variant="primary">Guardar cambios</Button>
<Button variant="outline" size="sm" loading>Procesando…</Button>

// Input
<Input
  label="Correo electrónico"
  description="Usamos tu correo para notificaciones."
  error="El correo no es válido."
  type="email"
  required
/>

// Select
<Select
  label="País"
  options={[
    { value: 'cr', label: 'Costa Rica' },
    { value: 'pa', label: 'Panamá' },
  ]}
  description="País de residencia."
  isRequired
/>
```

---

## API de componentes

### Button

| Prop        | Tipo                                                        | Default     | Descripción                        |
|-------------|-------------------------------------------------------------|-------------|-------------------------------------|
| `variant`   | `primary \| secondary \| outline \| ghost \| destructive`  | `primary`   | Variante visual                     |
| `size`      | `sm \| md \| lg`                                            | `md`        | Tamaño (32 / 40 / 48px de altura)  |
| `loading`   | `boolean`                                                   | `false`     | Spinner + deshabilita               |
| `fullWidth` | `boolean`                                                   | -           | Ocupa el ancho del contenedor       |
| `leftIcon`  | `ReactNode`                                                 | -           | Ícono a la izquierda                |
| `rightIcon` | `ReactNode`                                                 | -           | Ícono a la derecha                  |
| `disabled`  | `boolean`                                                   | -           | HTML nativo                         |

### Input

| Prop               | Tipo        | Default | Descripción                                      |
|--------------------|-------------|---------|--------------------------------------------------|
| `label`            | `string`    | -       | Label visible (htmlFor generado automáticamente) |
| `description`      | `string`    | -       | Texto de ayuda (aria-describedby)               |
| `error`            | `string`    | -       | Error — activa estado rojo + aria-invalid       |
| `leftIcon`         | `ReactNode` | -       | Ícono izquierdo                                  |
| `rightIcon`        | `ReactNode` | -       | Ícono derecho                                    |
| `inputSize`        | `sm\|md\|lg`| `md`    | Tamaño del campo                                 |
| `required`         | `boolean`   | -       | Muestra asterisco en label                       |

Acepta todos los props nativos de `<input>`.

### Select

| Prop              | Tipo            | Default                    | Descripción                            |
|-------------------|-----------------|----------------------------|----------------------------------------|
| `options`         | `SelectOption[]`| **requerido**              | `{ value, label, disabled? }[]`        |
| `label`           | `string`        | -                          | Label visible                          |
| `description`     | `string`        | -                          | Texto de ayuda                         |
| `error`           | `string`        | -                          | Mensaje de error                       |
| `placeholder`     | `string`        | `"Seleccioná una opción"`  | Texto cuando no hay selección          |
| `size`            | `sm\|md\|lg`    | `md`                       | Tamaño del trigger                     |
| `isDisabled`      | `boolean`       | -                          | Deshabilita el select                  |
| `isRequired`      | `boolean`       | -                          | Muestra asterisco en label             |
| `selectedKey`     | `string`        | -                          | Valor controlado (React Aria)          |
| `onSelectionChange`| `(key) => void`| -                         | Callback al cambiar selección          |

**Navegación por teclado:** `↑↓` para opciones · `Enter`/`Space` para abrir/confirmar · `Escape` para cerrar · Type-ahead.

---

## Desarrollo

```bash
# Desde la raíz del monorepo
npm install

# Construir el paquete DS
npm run build

# Storybook (port 6006)
npm run storybook

# Demo app (Vite, port 5173)
npm run demo
```

---

## Estructura del proyecto

```
pricesmart-design-system/
├── packages/
│   └── pricesmart-ds/           # @pricesmart/ds
│       ├── src/
│       │   ├── tokens/
│       │   │   └── index.css    # ← CSS custom properties (editar para actualizar tokens Figma)
│       │   ├── tailwind.preset.ts
│       │   ├── components/
│       │   │   ├── Button/
│       │   │   ├── Input/
│       │   │   └── Select/
│       │   └── index.ts         # API pública
│       └── dist/                # Build output (no commitear)
├── apps/
│   ├── storybook/               # Documentación visual
│   └── demo/                    # App de verificación
└── README.md
```

---

## Paleta de colores (extraída de Figma)

| Familia               | Escala   | Uso principal                                      |
|-----------------------|----------|----------------------------------------------------|
| Brand Primary (blue)  | 25–950   | Botones, links, foco, bordes de marca              |
| Brand Accent (orange) | 25–950   | Acciones secundarias, highlights                   |
| Gray light mode       | 0–950    | Texto, superficies y bordes en modo claro          |
| Gray dark mode        | 25–950   | Texto, superficies y bordes en modo oscuro         |
| Error (red)           | 25–950   | Estados de error y peligro                         |
| Warning (amber)       | 25–950   | Alertas y advertencias                             |
| Success (lime)        | 25–950   | Confirmaciones y estados exitosos                  |

**Tipografía:** Fira Sans (Regular 400, Medium 500, Semibold 600, Bold 700)

---

## Decisiones pendientes antes de ampliar el catálogo

| Tema                | Decisión requerida                                                        |
|---------------------|---------------------------------------------------------------------------|
| Registro npm        | Configurar `publishConfig.registry` para el registro privado de PriceSmart |
| Turborepo           | Evaluar si mejora los tiempos de CI al escalar el monorepo                |
| Storybook chromatic | Integración con Chromatic para visual regression testing                  |
| Tokens adicionales  | Iconografía, motion tokens, breakpoints                                   |
| Dialog/Modal        | Componente `Dialog` (accesible con React Aria) como cuarto piloto         |
