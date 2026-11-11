import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Progress } from '@pricesmart/ds'

const meta = {
  title: 'Atoms/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Indicador de progreso en dos variantes: barra lineal (bar) y spinner circular. Soporta modo indeterminado.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['bar', 'spinner'] },
    color: { control: 'select', options: ['brand', 'success', 'warning', 'error'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    indeterminate: { control: 'boolean' },
    showValue: { control: 'boolean' },
  },
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Bar: Story = {
  args: { type: 'bar', value: 65, label: 'Cargando…', showValue: true },
  decorators: [(S) => <div className="w-72"><S /></div>],
}

export const BarSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-72">
      <Progress type="bar" value={60} size="sm" label="Pequeño" />
      <Progress type="bar" value={60} size="md" label="Mediano" />
      <Progress type="bar" value={60} size="lg" label="Grande" />
    </div>
  ),
}

export const BarColors: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-72">
      <Progress type="bar" value={70} color="brand"   label="Brand" showValue />
      <Progress type="bar" value={70} color="success" label="Éxito" showValue />
      <Progress type="bar" value={70} color="warning" label="Advertencia" showValue />
      <Progress type="bar" value={70} color="error"   label="Error" showValue />
    </div>
  ),
}

export const BarIndeterminate: Story = {
  args: { type: 'bar', indeterminate: true, label: 'Procesando…' },
  decorators: [(S) => <div className="w-72"><S /></div>],
}

export const Spinner: Story = {
  args: { type: 'spinner', value: 65, label: 'Cargando', showValue: true },
}

export const SpinnerSizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Progress type="spinner" value={70} size="sm" aria-label="pequeño" />
      <Progress type="spinner" value={70} size="md" aria-label="mediano" />
      <Progress type="spinner" value={70} size="lg" aria-label="grande" />
    </div>
  ),
}

export const SpinnerIndeterminate: Story = {
  args: { type: 'spinner', indeterminate: true, size: 'md', label: 'Cargando…' },
}
