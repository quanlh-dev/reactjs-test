export const LOCAL_STORAGE = {
  collapseSider: 'collapseSider',
  TOKEN: '@user-abizin-token',
};

export function initLocalStorage() {
  localStorage.getItem(LOCAL_STORAGE.collapseSider) === null &&
    localStorage.setItem(LOCAL_STORAGE.collapseSider, 0);
}

function getValue(key = '', type = '') {
  const value = localStorage.getItem(key);
}

export default {};
