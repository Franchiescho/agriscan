export const Projetos = [
  {
    id: 'project-1',
    name: 'Project 1',
    folders: [
      {
        id: 'folder-1',
        name: 'Folder 1',
        imgs: [
          'https://i.imgur.com/QNPFuZW.png',
          'https://i.imgur.com/YamXUex.png',
          'https://i.imgur.com/PmiYvtI.png'
        ]
      },
      {
        id: 'folder-2',
        name: 'Folder 2',
        imgs: [
          'https://i.imgur.com/68dDgXJ.png',
          'https://i.imgur.com/LQN2V0M.png',
          'https://i.imgur.com/s6jETol.png'
        ]
      },
      {
        id: 'folder-3',
        name: 'Folder 3',
        imgs: [
          'https://i.imgur.com/TDIoo2X.png',
          'https://i.imgur.com/SaJtXVR.png',
          'https://i.imgur.com/jdt0I9R.png'
        ]
      }
    ]
  },
  {
    id: 'project-2',
    name: 'Project 2',
    folders: [
      {
        id: 'folder-a',
        name: 'Folder A',
        imgs: [
          'https://i.imgur.com/Bht7NAA.png',
          'https://i.imgur.com/beFWY0s.png',
          'https://i.imgur.com/s6y0KuN.png'
        ]
      },
      {
        id: 'folder-b',
        name: 'Folder B',
        imgs: [
          'https://i.imgur.com/9aB53pO.png',
          'https://i.imgur.com/23oD1eB.png',
          'https://i.imgur.com/pjWJ5Yk.png'
        ]
      },
      {
        id: 'folder-c',
        name: 'Folder C',
        imgs: [
          'https://i.imgur.com/SwzMe8m.png',
          'https://i.imgur.com/4pySizO.png',
          'https://i.imgur.com/Qn5XMqA.png'
        ]
      }
    ]
  }
];

export function getProjeto(id) {
  return Projetos.find((p) => p.id === id);
}

export function listProjetos() {
  return Projetos.map((p) => p.id);
} 

export function getFolderimgs(projectId, folderId) {
  const project = getProjeto(projectId);
  if (!project) return [];
  const folder = project.folders.find((f) => f.id === folderId);
  return folder?.imgs || [];
}