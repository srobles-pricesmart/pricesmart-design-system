import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox, CheckboxGroup } from '@pricesmart/ds'

const meta = {
  title: 'Molecules/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Checkbox accesible basado en react-aria-components. Soporta estado indeterminado, error y descripción.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isDisabled: { control: 'boolean' },
    isIndeterminate: { control: 'boolean' },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: 'Acepto los términos y condiciones' },
}

export const WithDescription: Story = {
  args: {
    label: 'Recibir notificaciones por correo',
    description: 'Te enviaremos un resumen semanal de actividad.',
  },
}

export const WithError: Story = {
  args: {
    label: 'Acepto los términos',
    error: 'Debés aceptar los términos para continuar.',
  },
}

export const Indeterminate: Story = {
  args: { label: 'Seleccionar todos', isIndeterminate: true },
}

export const Group: Story = {
  render: () => (
    <CheckboxGroup label="Notificaciones" description="Elegí qué notificaciones querés recibir.">
      <Checkbox label="Correo electrónico" defaultSelected />
      <Checkbox label="SMS" />
      <Checkbox label="Push" defaultSelected />
      <Checkbox label="WhatsApp" isDisabled />
    </CheckboxGroup>
  ),
}

export const SelectAll: Story = {
  render: () => {
    const items = ['Correo', 'SMS', 'Push']
    const [selected, setSelected] = useState<string[]>([])

    const allSelected = selected.length === items.length
    const someSelected = selected.length > 0 && !allSelected

    return (
      <div className="flex flex-col gap-2">
        <Checkbox
          label="Seleccionar todos"
          isSelected={allSelected}
          isIndeterminate={someSelected}
          onChange={(v) => setSelected(v ? items : [])}
        />
        <div className="ml-6 flex flex-col gap-2">
          {items.map(item => (
            <Checkbox
              key={item}
              label={item}
              isSelected={selected.includes(item)}
              onChange={(v) =>
                setSelected(prev => v ? [...prev, item] : prev.filter(x => x !== item))
              }
            />
          ))}
        </div>
      </div>
    )
  },
}
