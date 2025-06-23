'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { loginAction } from '../actions/login'

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', senha: '' })
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)
  const isFormValid = formData.email.trim() && formData.senha.trim()
  const router = useRouter()

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!isFormValid) return
    setPending(true)
    setError('')

    const res = await loginAction(new FormData(e.currentTarget))
    setPending(false)

    if (res?.error) {
      setError(res.error)
    }
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      height: '100vh', backgroundColor: '#f0f0f0', fontFamily: 'Arial, sans-serif'
    }}>
      <form onSubmit={handleSubmit} style={{
        padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '300px',
        backgroundColor: '#fff', color: 'black'
      }}>
        <label style={{ fontWeight: 'bold' }}>E‑mail</label>
        <input
          type="email" name="email" value={formData.email} onChange={handleChange}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          required
        />

        <label style={{ fontWeight: 'bold' }}>Senha</label>
        <input
          type="password" name="senha" value={formData.senha} onChange={handleChange}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          required
        />

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button
          type="submit" disabled={!isFormValid || pending}
          style={{
            padding: '0.75rem 1.5rem', fontSize: '1rem', borderRadius: '4px',
            border: '1px solid', backgroundColor: isFormValid ? '#2e2e2e' : '#999',
            color: 'white', width: '100%', cursor: isFormValid ? 'pointer' : 'not-allowed',
            transition: 'background-color 0.3s ease'
          }}
          onMouseEnter={e => isFormValid && (e.currentTarget.style.backgroundColor = '#005bb5')}
          onMouseLeave={e => isFormValid && (e.currentTarget.style.backgroundColor = '#2e2e2e')}
        >
          {pending ? 'Entrando...' : 'Entrar'}
        </button>

        <button
          type="button"
          onClick={() => router.push('/register')}
          style={{
            marginTop: '10px', fontSize: '1rem', borderRadius: '4px',
            color: 'black', backgroundColor: 'transparent', border: 'none', cursor: 'pointer'
          }}
        >
          Registrar-se
        </button>

        <button
          type="button"
          style={{
            padding: '0.75rem 1.5rem', fontSize: '1rem',
            borderRadius: '4px', color: 'black', backgroundColor: 'transparent',
            border: 'none', cursor: 'pointer'
          }}
          onClick={() => router.push('/forgot')}
        >
          Esqueci a senha
        </button>
      </form>
    </div>
  )
}
