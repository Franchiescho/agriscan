'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const PROJECTS = {
  'Project 1': ['Folder 1', 'Folder 2', 'Folder 3'],
  'Project 2': ['Folder A', 'Folder B', 'Folder C'],
};

const FOLDER_THEMES = {
  'Folder 1': [
    'https://i.imgur.com/QNPFuZW.png',
    'https://i.imgur.com/YamXUex.png',
    'https://i.imgur.com/PmiYvtI.png',
  ],
  'Folder 2': [
    'https://i.imgur.com/68dDgXJ.png',
    'https://i.imgur.com/LQN2V0M.png',
    'https://i.imgur.com/s6jETol.png',
  ],
  'Folder 3': [
    'https://i.imgur.com/TDIoo2X.png',
    'https://i.imgur.com/SaJtXVR.png',
    'https://i.imgur.com/jdt0I9R.png',
  ],
  'Folder A': [
    'https://i.imgur.com/Bht7NAA.png',
    'https://i.imgur.com/T8GNa3s.jpeg',
    'https://i.imgur.com/s6y0KuN.png',
  ],
  'Folder B': [
    'https://i.imgur.com/9aB53pO.png',
    'https://i.imgur.com/23oD1eB.png',
    'https://i.imgur.com/pjWJ5Yk.png',
  ],
  'Folder C': [
    'https://i.imgur.com/SwzMe8m.png',
    'https://i.imgur.com/4pySizO.png',
    'https://i.imgur.com/Qn5XMqA.png',
  ],
};

const NAV_ITEMS = {
  0: 'Settings',
  1: 'Help',
  2: 'Logout',
};

export default function ProjectPage() {
  const router = useRouter();

  const [projectData, setProjectData] = useState({ project: '', folder: '' });
  const [currentThemes, setCurrentThemes] = useState([]);

  useEffect(() => {
    setProjectData({ project: '', folder: '' });
    setCurrentThemes([]);
  }, []);

  const handleSelect = (project, folder) => {
    setProjectData({ project, folder });
    if (FOLDER_THEMES[folder]) {
      setCurrentThemes(FOLDER_THEMES[folder]);
    } else {
      setCurrentThemes([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="bg-white text-gray-800 w-full md:w-64 lg:w-80 p-6 md:min-h-screen border-r border-gray-200">
        <div className="flex flex-col h-full">
          <h1 className="text-2xl font-bold mb-4">Navigation</h1>

          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* New Project Button */}
          <button
            onClick={() => router.push('/new-project')}
            className="bg-black text-white py-2 px-4 rounded-lg mb-4 flex items-center justify-center hover:bg-gray-800 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            New Project
          </button>

          {/* Projects */}
          {Object.entries(PROJECTS).map(([projectName, folders]) => (
            <div key={projectName} className="bg-gray-100 p-4 rounded-lg mb-6">
              <h2 className="text-xl font-semibold mb-2">{projectName}</h2>
              <ul className="space-y-2">
                {folders.map((folder) => (
                  <li
                    key={folder}
                    onClick={() => handleSelect(projectName, folder)}
                    className={`text-gray-700 hover:bg-gray-200 p-2 rounded cursor-pointer flex items-center ${
                      projectData.project === projectName &&
                      projectData.folder === folder
                        ? 'bg-gray-300 font-semibold'
                        : ''
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 6a2 2 0 012-2h4l3 3h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
                        clipRule="evenodd"
                      />
                      <path d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
                    </svg>
                    {folder}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Navigation Links */}
          <nav className="mt-auto">
            <ul className="space-y-2">
              {Object.values(NAV_ITEMS).map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    if (item === 'Logout') {
                      router.push('/login');
                    }
                  }}
                  className={`hover:bg-gray-100 p-2 rounded transition cursor-pointer ${
                    item === 'Logout'
                      ? 'bg-red-500 text-white hover:bg-red-600 text-center'
                      : ''
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Selected Project & Folder Titles */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              {projectData.project || 'Sem Projeto Selecionado'}
            </h2>
            <h3 className="text-xl text-gray-600 mt-1">
              {projectData.folder || 'Sem Pasta Selecionada'}
            </h3>
          </div>

          {/* Image Sections */}
          <div className="space-y-6">
            {currentThemes.length > 0 ? (
              currentThemes.map((url, i) => (
                <section key={i} className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-32 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={url}
                      alt={`Image ${i + 1}`}
                      className="w-full h-full object-cover"
                      width={128}
                      height={128}
                    />
                  </div>
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex-1">
                    <div className="p-6">
                      <div className="mb-4">
                        <h2 className="text-2xl font-bold text-gray-800">
                          Image {i + 1}
                        </h2>
                      </div>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        Body text for whatever you'd like to say. Add main takeaway
                        points, quotes, anecdotes, or even a very very short story.
                        This design features a clean layout with an image to the left.
                      </p>

                      {/* Edit/Delete Buttons */}
                      <div className="flex space-x-2">
                        <button className="flex items-center text-sm text-gray-600 hover:text-black">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M17.414 2.586a2 2 0 010 2.828l-9.172 9.172a2 2 0 01-.878.515l-4 1a1 1 0 01-1.213-1.213l1-4a2 2 0 01.515-.878l9.172-9.172a2 2 0 012.828 0z" />
                          </svg>
                          Edit
                        </button>
                        <button className="flex items-center text-sm text-red-600 hover:text-red-800">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6 8a1 1 0 011 1v6a1 1 0 11-2 0V9a1 1 0 011-1zm4 0a1 1 0 011 1v6a1 1 0 11-2 0V9a1 1 0 011-1zm4 0a1 1 0 011 1v6a1 1 0 11-2 0V9a1 1 0 011-1z"
                              clipRule="evenodd"
                            />
                            <path d="M4 5a1 1 0 011-1h10a1 1 0 011 1v1H4V5zm2-3a1 1 0 000 2h8a1 1 0 100-2H6z" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              ))
            ) : (
              <p className="text-gray-500">
                {projectData.folder
                  ? 'Pasta Vazia'
                  : 'Selecione uma projeto para visualizar s pastas.'}
              </p>
            )}
          </div>

          <footer className="mt-12 text-center text-gray-500 text-sm"></footer>
        </div>
      </main>
    </div>
  );
}
