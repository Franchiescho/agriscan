'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [formData, setFormData] = useState({
    email: '',
    confirmEmail: '',
    senha: '',
    confirmSenha: '',
    aceito: false,
  });

  const [formStatus, setFormStatus] = useState({
    success: false,
    message: '',
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const { email, confirmEmail, senha, confirmSenha, aceito } = formData;

    if (!email || !confirmEmail || !senha || !confirmSenha || !aceito) {
      setFormStatus({ success: false, message: 'Todos os campos são obrigatórios.' });
      return;
    }

    if (email !== confirmEmail) {
      setFormStatus({ success: false, message: 'Os e-mails não coincidem.' });
      return;
    }

    if (senha !== confirmSenha) {
      setFormStatus({ success: false, message: 'As senhas não coincidem.' });
      return;
    }

    setFormStatus({ success: true, message: 'Registro realizado com sucesso!' });
    router.push('/dashboard');
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f0f0',
      fontFamily: 'Arial, sans-serif',
    }}>
      <form
        onSubmit={handleRegister}
        style={{
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          minWidth: '320px',
          backgroundColor: '#fff',
          color: '#000',
        }}
      >
        <label style={{ fontWeight: 'bold' }}>E-mail</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />

        <label style={{ fontWeight: 'bold' }}>Confirmar E-mail</label>
        <input
          type="email"
          name="confirmEmail"
          value={formData.confirmEmail}
          onChange={handleChange}
          required
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />

        <label style={{ fontWeight: 'bold' }}>Senha</label>
        <input
          type="password"
          name="senha"
          value={formData.senha}
          onChange={handleChange}
          required
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />

        <label style={{ fontWeight: 'bold' }}>Confirmar Senha</label>
        <input
          type="password"
          name="confirmSenha"
          value={formData.confirmSenha}
          onChange={handleChange}
          required
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />

        {/* Checkbox estilizado como marcador */}
        <div
          onClick={() => setFormData(prev => ({ ...prev, aceito: !prev.aceito }))}
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            userSelect: 'none',
            gap: '10px',
            marginTop: '10px',
            fontSize: '14px',
          }}
        >
          <div
            style={{
              width: '20px',
              height: '20px',
              border: '2px solid #000',
              borderRadius: '4px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: 'bold',
              fontSize: '18px',
              backgroundColor: formData.aceito ? '#2e2e2e' : '#fff',
              color: formData.aceito ? '#fff' : '#000',
              transition: 'background-color 0.2s ease, color 0.2s ease',
            }}
          >
            {formData.aceito && '✓'}
          </div>
          <span>
            Aceito as <a href="/politica" style={{ color: '#005bb5', textDecoration: 'underline' }}>Políticas de Privacidade</a> e os <a href="/termos" style={{ color: '#005bb5', textDecoration: 'underline' }}>Termos de Uso</a>.
          </span>
        </div>

        {/* Botão */}
        <button
          type="submit"
          style={{
            marginTop: '20px',
            padding: '0.75rem',
            fontSize: '1rem',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#2e2e2e',
            color: 'white',
            width: '100%',
            transition: 'background-color 0.3s ease',
            cursor: 'pointer',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = '#005bb5';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = '#2e2e2e';
          }}
        >
          Registrar
        </button>

        {/* Mensagem */}
        {formStatus.message && (
          <p style={{
            color: formStatus.success ? 'green' : 'red',
            marginTop: '10px',
            fontSize: '14px',
          }}>
            {formStatus.message}
          </p>
        )}
      </form>
    </div>
  );
}
