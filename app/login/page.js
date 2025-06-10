'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });

  const [status, setStatus] = useState({ valid: false });
  const router = useRouter();

  const isFormValid = formData.email.trim() && formData.senha.trim();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = () => {
    if (isFormValid) {
      router.push('/dashboard');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f0f0',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        minWidth: '300px',
        backgroundColor: '#fff',
        color: 'black',
      }}>
        <label style={{ fontWeight: 'bold' }}>E-mail</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={{
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />

        <label style={{ fontWeight: 'bold' }}>Senha</label>
        <input
          type="password"
          name="senha"
          value={formData.senha}
          onChange={handleChange}
          style={{
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />

        <button
          disabled={!isFormValid}
          onClick={handleRegister}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            borderRadius: '4px',
            border: '1px solid',
            backgroundColor: isFormValid ? '#2e2e2e' : '#999',
            color: 'white',
            width: '100%',
            cursor: isFormValid ? 'pointer' : 'not-allowed',
            transition: 'background-color 0.3s ease'
          }}
          onMouseEnter={e => {
            if (isFormValid) e.currentTarget.style.backgroundColor = '#005bb5';
          }}
          onMouseLeave={e => {
            if (isFormValid) e.currentTarget.style.backgroundColor = '#2e2e2e';
          }}
        >
          Entrar
        </button>

        <button
          onClick={() => router.push('/forgot-password')}
          style={{
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          borderRadius: '4px',
          color: 'black',
          cursor: 'pointer',
          backgroundColor: 'transparent',
          border: 'none'
        }}
        >
        Esqueci a senha
        </button>
      </div>
    </div>
  );
}
