import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Slider } from '@pricesmart/ds'

const meta = {
  title: 'Molecules/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Slider accesible basado en react-aria-components. Soporta valor único y rango dual.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isDisabled: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: 'Volumen', defaultValue: 40, minValue: 0, maxValue: 100, step: 1 },
  decorators: [(S) => <div className="w-72"><S /></div>],
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-72">
      <Slider label="Pequeño (sm)" defaultValue={40} size="sm" />
      <Slider label="Mediano (md)" defaultValue={40} size="md" />
      <Slider label="Grande (lg)"  defaultValue={40} size="lg" />
    </div>
  ),
}

export const WithDescription: Story = {
  args: {
    label: 'Brillo',
    defaultValue: 70,
    description: 'Ajustá el brillo de la pantalla.',
    showOutput: true,
  },
  decorators: [(S) => <div className="w-72"><S /></div>],
}

export const Range: Story = {
  args: {
    label: 'Rango de precio',
    defaultValue: [20, 80],
    minValue: 0,
    maxValue: 100,
    step: 5,
  },
  decorators: [(S) => <div className="w-72"><S /></div>],
}

export const Disabled: Story = {
  args: { label: 'Desactivado', defaultValue: 50, isDisabled: true },
  decorators: [(S) => <div className="w-72"><S /></div>],
}
