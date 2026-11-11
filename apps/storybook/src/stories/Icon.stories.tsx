import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Icon } from '@pricesmart/ds'
import {
  Star,
  Heart,
  Search,
  Bell,
  Settings,
  ChevronDown,
  Plus,
  Trash2,
  Check,
  X,
} from 'lucide-react'

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Wrapper de tamaño para íconos SVG (Lucide u otros). Ajusta automáticamente \`width\` y \`height\` del SVG hijo.

**Uso**:
\`\`\`tsx
import { Icon } from '@pricesmart/ds'
import { Star } from 'lucide-react'

<Icon size="md"><Star /></Icon>
\`\`\`

Las apps consumidoras deben instalar \`lucide-react\` por separado:
\`npm install lucide-react\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { size: 'md', children: <Star /> },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <div className="flex flex-col items-center gap-1">
        <Icon size="xs"><Star /></Icon>
        <span className="text-ps-xs text-ps-fg-muted">xs</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Icon size="sm"><Star /></Icon>
        <span className="text-ps-xs text-ps-fg-muted">sm</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Icon size="md"><Star /></Icon>
        <span className="text-ps-xs text-ps-fg-muted">md</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Icon size="lg"><Star /></Icon>
        <span className="text-ps-xs text-ps-fg-muted">lg</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Icon size="xl"><Star /></Icon>
        <span className="text-ps-xs text-ps-fg-muted">xl</span>
      </div>
    </div>
  ),
}

export const Gallery: Story = {
  render: () => (
    <div className="grid grid-cols-5 gap-6">
      {[
        { icon: <Star />, name: 'Star' },
        { icon: <Heart />, name: 'Heart' },
        { icon: <Search />, name: 'Search' },
        { icon: <Bell />, name: 'Bell' },
        { icon: <Settings />, name: 'Settings' },
        { icon: <ChevronDown />, name: 'ChevronDown' },
        { icon: <Plus />, name: 'Plus' },
        { icon: <Trash2 />, name: 'Trash2' },
        { icon: <Check />, name: 'Check' },
        { icon: <X />, name: 'X' },
      ].map(({ icon, name }) => (
        <div key={name} className="flex flex-col items-center gap-1.5">
          <Icon size="md" className="text-ps-fg-default">{icon}</Icon>
          <span className="text-ps-xs text-ps-fg-muted">{name}</span>
        </div>
      ))}
    </div>
  ),
}

export const WithColor: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon size="lg" className="text-ps-brand-primary"><Star /></Icon>
      <Icon size="lg" className="text-ps-status-success-fg"><Check /></Icon>
      <Icon size="lg" className="text-ps-status-danger-fg"><X /></Icon>
      <Icon size="lg" className="text-ps-fg-muted"><Settings /></Icon>
    </div>
  ),
}
