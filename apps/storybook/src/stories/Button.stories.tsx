import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@pricesmart/ds'

/*
 * Figma ref: Design System Master Library VARIABLES v4.1
 * Node: 2210-441096 (pending — confirmar nodo exacto del Button en Figma)
 *
 * Variantes implementadas:
 *   - primary: acción principal, fondo azul navy
 *   - secondary: acción de marca secundaria, fondo rojo
 *   - outline: sin fondo, borde brand
 *   - ghost: sin fondo ni borde visible
 *   - destructive: acción destructiva (alias de secondary en paleta roja)
 *
 * Estados: default · hover · active · focus-visible · disabled · loading
 * Tamaños: sm (32px) · md (40px) · lg (48px)
 * Accesibilidad: aria-busy en loading, disabled nativo
 */

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente de botón del Design System PriceSmart. Soporta 5 variantes, 3 tamaños, estado loading y slots de íconos.',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/uv426oS23GgupkpwKd8Efy/%E2%9D%96-Design-System-Master-Library-VARIABLES--v4.1-?node-id=2210-441096',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'destructive'],
      description: 'Variante visual del botón',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del botón',
    },
    loading: {
      control: 'boolean',
      description: 'Muestra spinner y bloquea interacción',
    },
    disabled: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Guardar cambios',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Continuar',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Cancelar',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ver más',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Eliminar',
  },
}

export const Loading: Story = {
  args: {
    variant: 'primary',
    loading: true,
    children: 'Guardando…',
  },
}

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'No disponible',
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4 flex-wrap">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className="flex items-center gap-4 flex-wrap">
      <Button
        leftIcon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
            <path fillRule="evenodd" d="M3 9a1 1 0 011-1h12a1 1 0 011 1v6a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" clipRule="evenodd" />
          </svg>
        }
      >
        Guardar
      </Button>
      <Button
        variant="outline"
        rightIcon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
          </svg>
        }
      >
        Continuar
      </Button>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-3 flex-wrap">
      {(['primary', 'secondary', 'outline', 'ghost', 'destructive'] as const).map((v) => (
        <Button key={v} variant={v}>
          {v.charAt(0).toUpperCase() + v.slice(1)}
        </Button>
      ))}
    </div>
  ),
}
