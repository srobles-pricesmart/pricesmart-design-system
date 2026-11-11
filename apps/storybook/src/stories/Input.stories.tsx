import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '@pricesmart/ds'

const meta = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Campo de texto del Design System. Incluye label, description, error y slots para íconos. aria-describedby, aria-invalid y htmlFor se gestionan internamente.',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/uv426oS23GgupkpwKd8Efy/%E2%9D%96-Design-System-Master-Library-VARIABLES--v4.1-',
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
    inputSize: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    required: { control: 'boolean' },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Nombre completo',
    placeholder: 'Ingresá tu nombre',
  },
}

export const WithDescription: Story = {
  args: {
    label: 'Correo electrónico',
    placeholder: 'usuario@empresa.com',
    description: 'Usamos tu correo para enviarte notificaciones importantes.',
    type: 'email',
  },
}

export const WithError: Story = {
  args: {
    label: 'Correo electrónico',
    placeholder: 'usuario@empresa.com',
    error: 'El correo ingresado no es válido.',
    value: 'no-es-un-correo',
    type: 'email',
  },
}

export const Required: Story = {
  args: {
    label: 'RUC / Cédula',
    placeholder: '0-0000-0000',
    required: true,
  },
}

export const Disabled: Story = {
  args: {
    label: 'País',
    value: 'Costa Rica',
    disabled: true,
  },
}

export const ReadOnly: Story = {
  args: {
    label: 'ID de usuario',
    value: 'USR-20241105-001',
    readOnly: true,
  },
}

export const WithLeftIcon: Story = {
  args: {
    label: 'Búsqueda',
    placeholder: 'Buscar producto…',
    leftIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
        <path
          fillRule="evenodd"
          d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Input label="Small" inputSize="sm" placeholder="Small input" />
      <Input label="Medium" inputSize="md" placeholder="Medium input" />
      <Input label="Large" inputSize="lg" placeholder="Large input" />
    </div>
  ),
}

export const FormExample: Story = {
  render: () => (
    <div className="flex flex-col gap-5 w-96 p-6 rounded-ps-xl border border-ps-border-default shadow-ps-sm bg-ps-bg-default">
      <h2 className="text-ps-xl font-semibold text-ps-fg-default">Datos de contacto</h2>
      <Input label="Nombre" placeholder="María García" required />
      <Input
        label="Correo electrónico"
        placeholder="maria@empresa.com"
        type="email"
        description="Para el envío de confirmaciones."
        required
      />
      <Input
        label="Teléfono"
        placeholder="+506 0000-0000"
        type="tel"
        error="El formato de teléfono no es válido."
      />
    </div>
  ),
}
