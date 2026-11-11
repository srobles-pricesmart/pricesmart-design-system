import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Tag } from '@pricesmart/ds'

const meta = {
  title: 'Atoms/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Etiqueta con soporte opcional de eliminación. Útil para filtros, categorías y selecciones múltiples.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'],
    },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { variant: 'primary', children: 'React' },
}

export const Removable: Story = {
  render: () => {
    const [tags, setTags] = useState(['React', 'TypeScript', 'Tailwind', 'Design System'])
    return (
      <div className="flex flex-wrap gap-2">
        {tags.map(t => (
          <Tag key={t} variant="primary" onRemove={() => setTags(prev => prev.filter(x => x !== t))}>
            {t}
          </Tag>
        ))}
      </div>
    )
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag variant="primary">Primary</Tag>
      <Tag variant="success">Aprobado</Tag>
      <Tag variant="warning">Pendiente</Tag>
      <Tag variant="error">Rechazado</Tag>
      <Tag variant="info">Info</Tag>
      <Tag variant="neutral">Neutral</Tag>
    </div>
  ),
}
