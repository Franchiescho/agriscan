'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Projetos, getProjeto, getFolderimgs } from './projeto';

export default function Dashboard() {
  const router = useRouter();

  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [selectedFolderId, setSelectedFolderId] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    setSelectedProjectId('');
    setSelectedFolderId('');
    setImages([]);
  }, []);

  const handleSelect = (projectId, folderId) => {
    setSelectedProjectId(projectId);
    setSelectedFolderId(folderId);
    const imgs = getFolderimgs(projectId, folderId);
    setImages(imgs);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col md:flex-row">
      <aside className="bg-white text-gray-800 w-full md:w-64 lg:w-80 p-6 md:min-h-screen border-r border-gray-200">
        <div className="flex flex-col h-full">
          <h1 className="text-2xl font-bold mb-4">Navigation</h1>

          {/* Botão Novo Projeto */}
          <button
            onClick={() => router.push('/new-project')}
            className="bg-black text-white py-2 px-4 rounded-lg mb-4 hover:bg-gray-800 transition-colors"
          >
            + Novo Projeto
          </button>

          {/* Lista de Projetos e Pastas */}
          {Projetos.map((proj) => (
            <div key={proj.id} className="bg-gray-100 p-4 rounded-lg mb-6">
              <h2 className="text-xl font-semibold mb-2">{proj.name}</h2>
              <ul className="space-y-2">
                {proj.folders.map((folder) => (
                  <li
                    key={folder.id}
                    onClick={() => handleSelect(proj.id, folder.id)}
                    className={`text-gray-700 hover:bg-gray-200 p-2 rounded cursor-pointer flex items-center ${
                      selectedProjectId === proj.id && selectedFolderId === folder.id
                        ? 'bg-gray-300 font-semibold'
                        : ''
                    }`}
                  >
                    {folder.name}
                  </li>
                ))}
              </ul>
            </div>      
          ))}
          <nav className="mt-auto">
          <ul className="space-y-2">
            {/* Botão Logout */}
            <li
              onClick={() => router.push('/login')}
              className="hover:bg-gray-100 p-2 rounded transition cursor-pointer bg-red-500 text-white hover:bg-red-600 text-center"
            >
              Logout
            </li>
          </ul>
        </nav>
        </div>
      </aside>
      

      <main className="flex-1 py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              {selectedProjectId || 'Nenhum Projeto Selecionado'}
            </h2>
            <h3 className="text-xl text-gray-600 mt-1">
              {selectedFolderId || 'Nenhuma Pasta Selecionada'}
            </h3>
          </div>

          <div className="space-y-6">
            {images.length > 0 ? (
              images.map((url, i) => (
                <section key={i} className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-32 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={url}
                      alt={`Imagem ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-white rounded-2xl shadow p-6 flex-1">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Imagem {i + 1}</h2>
                    <p className="text-gray-600 mb-4">
                      Descrição genérica da imagem.
                    </p>
                    <div className="flex gap-2">
                      <button className="text-sm text-blue-600 hover:underline">Editar</button>
                      <button className="text-sm text-red-600 hover:underline">Excluir</button>
                    </div>
                  </div>
                </section>
              ))
            ) : (
              <p className="text-gray-500">
                {selectedFolderId
                  ? 'Pasta vazia'
                  : 'Selecione um projeto e uma pasta para visualizar as imagens.'}
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
