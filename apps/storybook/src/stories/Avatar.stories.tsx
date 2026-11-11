import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from '@pricesmart/ds'

const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente de avatar con soporte de imagen, iniciales como fallback, y estado de presencia.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    status: { control: 'select', options: [undefined, 'online', 'offline', 'away', 'busy'] },
    src: { control: 'text' },
    initials: { control: 'text' },
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const WithInitials: Story = {
  args: { initials: 'MG', alt: 'María García', size: 'md' },
}

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=5',
    alt: 'Usuario de ejemplo',
    size: 'md',
  },
}

export const WithStatus: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar initials="ON" status="online" alt="Online" />
      <Avatar initials="AW" status="away" alt="Away" />
      <Avatar initials="BY" status="busy" alt="Busy" />
      <Avatar initials="OF" status="offline" alt="Offline" />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-3">
      <Avatar initials="XS" size="xs" />
      <Avatar initials="SM" size="sm" />
      <Avatar initials="MD" size="md" />
      <Avatar initials="LG" size="lg" />
      <Avatar initials="XL" size="xl" />
    </div>
  ),
}
