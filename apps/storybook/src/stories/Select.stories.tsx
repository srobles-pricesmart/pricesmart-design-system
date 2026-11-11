import type { Meta, StoryObj } from '@storybook/react'
import { Select } from '@pricesmart/ds'

const COUNTRIES = [
  { value: 'cr', label: 'Costa Rica' },
  { value: 'pa', label: 'Panamá' },
  { value: 'gt', label: 'Guatemala' },
  { value: 'hn', label: 'Honduras' },
  { value: 'sv', label: 'El Salvador' },
  { value: 'ni', label: 'Nicaragua' },
  { value: 'tt', label: 'Trinidad y Tobago' },
  { value: 'jm', label: 'Jamaica' },
  { value: 'us', label: 'Estados Unidos' },
  { value: 'co', label: 'Colombia' },
]

const CATEGORIES = [
  { value: 'electronics', label: 'Electrónica' },
  { value: 'grocery', label: 'Abarrotes' },
  { value: 'clothing', label: 'Ropa y accesorios' },
  { value: 'home', label: 'Hogar y jardín' },
  { value: 'health', label: 'Salud y belleza' },
  { value: 'disabled_cat', label: 'Categoría no disponible', disabled: true },
]

const meta = {
  title: 'Atoms/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Selector accesible construido con **react-aria-components**.

**Navegación por teclado:**
- \`Space\` / \`Enter\` / \`↓\`: abre el menú
- \`↑\` \`↓\`: navega entre opciones
- \`Home\` / \`End\`: primera / última opción
- \`Escape\`: cierra sin cambiar selección
- Type-ahead: escribí una letra para ir a la opción que comienza con ella

**ARIA roles:** \`combobox\`, \`listbox\`, \`option\`, con \`aria-invalid\` y \`aria-describedby\` automáticos.
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    isDisabled: { control: 'boolean' },
    isRequired: { control: 'boolean' },
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'País',
    placeholder: 'Seleccioná un país',
    options: COUNTRIES,
  },
}

export const WithDescription: Story = {
  args: {
    label: 'País de residencia',
    description: 'Seleccioná el país donde vivís actualmente.',
    options: COUNTRIES,
  },
}

export const WithError: Story = {
  args: {
    label: 'Categoría',
    error: 'Debés seleccionar una categoría para continuar.',
    options: CATEGORIES,
  },
}

export const Required: Story = {
  args: {
    label: 'País',
    isRequired: true,
    options: COUNTRIES,
  },
}

export const Disabled: Story = {
  args: {
    label: 'País',
    isDisabled: true,
    options: COUNTRIES,
    defaultSelectedKey: 'cr',
  },
}

export const WithDisabledOptions: Story = {
  args: {
    label: 'Categoría de producto',
    options: CATEGORIES,
    description: 'Algunas categorías están temporalmente deshabilitadas.',
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Select label="Small" size="sm" options={COUNTRIES} placeholder="Seleccioná…" />
      <Select label="Medium" size="md" options={COUNTRIES} placeholder="Seleccioná…" />
      <Select label="Large" size="lg" options={COUNTRIES} placeholder="Seleccioná…" />
    </div>
  ),
}

export const InForm: Story = {
  render: () => (
    <div className="flex flex-col gap-5 w-96 p-6 rounded-ps-xl border border-ps-border-default shadow-ps-sm bg-ps-bg-default">
      <h2 className="text-ps-xl font-semibold text-ps-fg-default">Filtros de búsqueda</h2>
      <Select
        label="País"
        options={COUNTRIES}
        isRequired
        description="Muestra productos disponibles en ese país."
      />
      <Select
        label="Categoría"
        options={CATEGORIES}
        placeholder="Todas las categorías"
      />
    </div>
  ),
}
