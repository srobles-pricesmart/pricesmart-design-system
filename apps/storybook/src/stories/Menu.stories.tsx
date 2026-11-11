import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Menu, MenuItem, MenuSection, MenuSeparator, Button } from '@pricesmart/ds'

const meta = {
  title: 'Molecules/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Menú desplegable accesible basado en react-aria-components. Soporta secciones, separadores, íconos y atajos de teclado.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Menu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Menu trigger={<Button variant="outline">Opciones</Button>}>
      <MenuItem id="edit">Editar</MenuItem>
      <MenuItem id="duplicate">Duplicar</MenuItem>
      <MenuItem id="archive">Archivar</MenuItem>
      <MenuSeparator />
      <MenuItem id="delete" variant="danger">Eliminar</MenuItem>
    </Menu>
  ),
}

export const WithSections: Story = {
  render: () => (
    <Menu trigger={<Button>Mi cuenta</Button>}>
      <MenuSection title="Perfil">
        <MenuItem id="profile">Ver perfil</MenuItem>
        <MenuItem id="settings">Configuración</MenuItem>
      </MenuSection>
      <MenuSeparator />
      <MenuSection title="Sesión">
        <MenuItem id="logout" variant="danger">Cerrar sesión</MenuItem>
      </MenuSection>
    </Menu>
  ),
}

export const WithShortcuts: Story = {
  render: () => (
    <Menu trigger={<Button variant="ghost">Archivo</Button>}>
      <MenuItem id="new"  shortcut="⌘N">Nuevo</MenuItem>
      <MenuItem id="open" shortcut="⌘O">Abrir</MenuItem>
      <MenuItem id="save" shortcut="⌘S">Guardar</MenuItem>
      <MenuItem id="saveas" shortcut="⌘⇧S">Guardar como…</MenuItem>
    </Menu>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Menu trigger={<Button variant="outline">Con desactivados</Button>}>
      <MenuItem id="edit">Editar</MenuItem>
      <MenuItem id="duplicate" isDisabled>Duplicar (no disponible)</MenuItem>
      <MenuItem id="delete" variant="danger">Eliminar</MenuItem>
    </Menu>
  ),
}
