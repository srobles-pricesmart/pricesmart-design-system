import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip, Button } from '@pricesmart/ds'

const meta = {
  title: 'Molecules/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Tooltip accesible basado en react-aria-components. Se activa con hover o foco del teclado.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    content: 'Este es un tooltip',
    placement: 'top',
    children: <Button>Hover sobre mí</Button>,
  },
}

export const Placements: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 p-12">
      <Tooltip content="Arriba" placement="top">
        <Button variant="outline">Top</Button>
      </Tooltip>
      <Tooltip content="Abajo" placement="bottom">
        <Button variant="outline">Bottom</Button>
      </Tooltip>
      <Tooltip content="Izquierda" placement="left">
        <Button variant="outline">Left</Button>
      </Tooltip>
      <Tooltip content="Derecha" placement="right">
        <Button variant="outline">Right</Button>
      </Tooltip>
    </div>
  ),
}

export const WithLongContent: Story = {
  args: {
    content: 'Este tooltip contiene un mensaje más largo que explica algo con más detalle al usuario.',
    placement: 'top',
    children: <Button>Tooltip largo</Button>,
  },
}

export const NoDelay: Story = {
  args: {
    content: 'Sin delay',
    delay: 0,
    children: <Button variant="ghost">Sin delay</Button>,
  },
}
