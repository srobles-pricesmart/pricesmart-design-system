import React, { useState } from 'react'
import { Button, Input, Select } from '@pricesmart/ds'

/*
 * Demo app — verifica que @pricesmart/ds funcione en una app independiente
 *
 * Instalar el paquete desde .tgz:
 *   cd packages/pricesmart-ds && npm pack
 *   cd apps/demo && npm install ../../packages/pricesmart-ds/pricesmart-ds-0.1.0.tgz
 */

const COUNTRIES = [
  { value: 'cr', label: 'Costa Rica' },
  { value: 'pa', label: 'Panamá' },
  { value: 'gt', label: 'Guatemala' },
  { value: 'hn', label: 'Honduras' },
  { value: 'sv', label: 'El Salvador' },
  { value: 'ni', label: 'Nicaragua' },
]

export default function App() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState<string | null>(null)
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [countryError, setCountryError] = useState('')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const validate = () => {
    let valid = true
    if (!name.trim()) {
      setNameError('El nombre es requerido.')
      valid = false
    } else {
      setNameError('')
    }
    if (!email.includes('@')) {
      setEmailError('Ingresá un correo válido.')
      valid = false
    } else {
      setEmailError('')
    }
    if (!country) {
      setCountryError('Seleccioná un país.')
      valid = false
    } else {
      setCountryError('')
    }
    return valid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div
      data-ps-theme={theme === 'dark' ? 'dark' : ''}
      className="min-h-screen bg-ps-bg-subtle p-6 transition-colors duration-[var(--ps-duration-slow)]"
    >
      {/* Header */}
      <header className="max-w-2xl mx-auto mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-ps-2xl font-bold text-ps-fg-default">
            PriceSmart DS — Demo
          </h1>
          <p className="text-ps-sm text-ps-fg-muted mt-1">
            Verifica que el paquete funcione en una app independiente.
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
          aria-label="Cambiar tema"
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </Button>
      </header>

      {/* Sección de componentes individuales */}
      <div className="max-w-2xl mx-auto space-y-8">

        {/* Buttons showcase */}
        <section className="bg-ps-bg-default rounded-ps-xl border border-ps-border-default shadow-ps-sm p-6">
          <h2 className="text-ps-lg font-semibold text-ps-fg-default mb-4">Button</h2>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button loading>Cargando</Button>
              <Button disabled>Deshabilitado</Button>
            </div>
          </div>
        </section>

        {/* Input showcase */}
        <section className="bg-ps-bg-default rounded-ps-xl border border-ps-border-default shadow-ps-sm p-6">
          <h2 className="text-ps-lg font-semibold text-ps-fg-default mb-4">Input</h2>
          <div className="space-y-4">
            <Input
              label="Nombre"
              placeholder="Tu nombre completo"
              description="Tal como aparece en tu cédula."
            />
            <Input
              label="Correo con error"
              value="usuario-invalido"
              error="El correo no tiene un formato válido."
            />
            <Input label="Deshabilitado" value="Campo deshabilitado" disabled />
          </div>
        </section>

        {/* Select showcase */}
        <section className="bg-ps-bg-default rounded-ps-xl border border-ps-border-default shadow-ps-sm p-6">
          <h2 className="text-ps-lg font-semibold text-ps-fg-default mb-4">Select</h2>
          <div className="space-y-4">
            <Select
              label="País"
              options={COUNTRIES}
              description="Navegá con ↑↓ y cerrá con Escape."
            />
            <Select
              label="País (error)"
              options={COUNTRIES}
              error="Debés seleccionar un país."
            />
          </div>
        </section>

        {/* Form completo */}
        <section className="bg-ps-bg-default rounded-ps-xl border border-ps-border-default shadow-ps-sm p-6">
          <h2 className="text-ps-lg font-semibold text-ps-fg-default mb-1">
            Formulario de registro
          </h2>
          <p className="text-ps-sm text-ps-fg-muted mb-6">
            Formulario de ejemplo con validación y estado loading.
          </p>

          {submitted ? (
            <div className="rounded-ps-lg bg-ps-status-success-bg border border-ps-status-success-fg/20 p-4 text-ps-status-success-fg text-ps-sm font-medium">
              ✓ Formulario enviado correctamente.{' '}
              <button
                className="underline"
                onClick={() => { setSubmitted(false); setName(''); setEmail(''); setCountry(null) }}
              >
                Volver
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <Input
                label="Nombre completo"
                placeholder="María García"
                value={name}
                onChange={e => setName(e.target.value)}
                error={nameError}
                required
              />
              <Input
                label="Correo electrónico"
                placeholder="maria@empresa.com"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                error={emailError}
                required
              />
              <Select
                label="País"
                options={COUNTRIES}
                selectedKey={country}
                onSelectionChange={k => setCountry(k as string)}
                error={countryError}
                isRequired
              />
              <div className="flex gap-3 pt-2">
                <Button type="submit" loading={loading} fullWidth>
                  Registrarme
                </Button>
                <Button type="reset" variant="outline" onClick={() => { setName(''); setEmail(''); setCountry(null); setNameError(''); setEmailError(''); setCountryError('') }}>
                  Limpiar
                </Button>
              </div>
            </form>
          )}
        </section>
      </div>

      {/* Footer */}
      <footer className="max-w-2xl mx-auto mt-8 text-center text-ps-xs text-ps-fg-subtle">
        @pricesmart/ds v0.1.0 — instalado vía npm workspace
      </footer>
    </div>
  )
}
