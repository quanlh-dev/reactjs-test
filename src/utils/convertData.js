export const convertMenuWorkspace = (data = {}) => [
  ...data.system,
  {
    isSystem: false,
    projects: [],
    _id: 'Chưa phân loại ',
    pFolderName: 'Chưa phân loại',
  },
  ...data.others,
];
