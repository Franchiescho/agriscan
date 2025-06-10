'use client';

import { useState } from 'react';

export default function PainelComSidebar() {
  const [projetos, setProjetos] = useState([
    { id: 'opcao1', nome: 'Object X', image: '/img.jpg' },
    { id: 'opcao2', nome: 'Object Y', image: '/img.jpg' },
    { id: 'opcao3', nome: 'Object Z', image: '/img.jpg' },
  ]);

  const [targetProjeto, setTargetProjeto] = useState(projetos[0]);

  return (
    <div style={estilos.container}>
      <aside style={estilos.sidebar}>
        <h3 style={{ color: '#000000' }}>Imagem</h3>
        <h2 style={estilos.titulo}>Projeto</h2>

        {projetos.map((projeto) => (
          <button
            key={projeto.id}
            onClick={() => setTargetProjeto(projeto)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#2e2e2e';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              if (targetProjeto.id === projeto.id) return;
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.color = '#000000';
            }}
            style={{
              ...estilos.botao,
              backgroundColor:
                targetProjeto.id === projeto.id ? '#2e2e2e' : '#ffffff',
              color: targetProjeto.id === projeto.id ? '#ffffff' : '#000000',
              borderBottom: '1px solid #f6f2f2',
              borderRadius: '8px',
            }}
          >
            {projeto.nome}
          </button>
        ))}
      </aside>

      <main style={estilos.conteudo}>
        <img
          src={targetProjeto.image}
          alt={targetProjeto.nome}
          style={estilos.imagem}
        />
      </main>
    </div>
  );
}

const estilos = {
  container: {
    display: 'flex',
    height: '100vh',
    fontFamily: 'sans-serif',
    backgroundColor: '#ffffff',
  },
  sidebar: {
    width: '220px',
    borderRight: '1px solid #ddd',
    padding: '1rem 0',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  titulo: {
    margin: '0 1rem 1rem 1rem',
    fontSize: '1.2rem',
    color: '#333',
    fontWeight: 'bold',
  },
  botao: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease, color 0.2s ease',
    textAlign: 'left',
    backgroundColor: '#ffffff',
    color: '#000000',
  },
  conteudo: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  imagem: {
    maxWidth: '90%',
    maxHeight: '90%',
    objectFit: 'contain',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
};
