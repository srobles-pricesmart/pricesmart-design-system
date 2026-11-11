import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from '@pricesmart/ds'

const meta = {
  title: 'Molecules/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Toggle accesible basado en react-aria-components. Soporta tres tamaños y label inline.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isDisabled: { control: 'boolean' },
    isSelected: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: 'Activar notificaciones', size: 'md' },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch label="Pequeño (sm)" size="sm" />
      <Switch label="Mediano (md)" size="md" />
      <Switch label="Grande (lg)" size="lg" />
    </div>
  ),
}

export const WithoutLabel: Story = {
  args: { 'aria-label': 'Toggle sin label' },
}

export const Disabled: Story = {
  args: { label: 'Desactivado', isDisabled: true },
}

export const DisabledOn: Story = {
  args: { label: 'Activado y desactivado', isSelected: true, isDisabled: true },
}

export const Interactive: Story = {
  render: () => {
    const [on, setOn] = useState(false)
    return (
      <div className="flex flex-col items-center gap-3">
        <Switch label={on ? 'Activado' : 'Desactivado'} isSelected={on} onChange={setOn} />
        <span className="text-ps-xs text-ps-fg-muted">Estado: {on ? 'ON' : 'OFF'}</span>
      </div>
    )
  },
}
