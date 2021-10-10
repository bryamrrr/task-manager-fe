const localStorage = window?.localStorage;

export const clearStorage = () => localStorage.clear();

const setItem = (storage: Storage, key: string, value: any) => {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(e);
  }
};

const getItem = (storage: Storage, key: string): string | undefined => {
  try {
    const item = storage.getItem(key);
    if (item === null) {
      return undefined;
    }
    return JSON.parse(item);
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

const removeLsItem = (storage: Storage, key: string) => {
  try {
    storage.removeItem(key);
  } catch (e) {
    console.error(e);
  }
};

export function removeItem(key: string) {
  removeLsItem(localStorage, key);
}

export function setToken(token: string) {
  setItem(localStorage, 'token', token);
}

export function getToken(): string | undefined {
  return getItem(localStorage, 'token');
}

export function removeToken() {
  removeLsItem(localStorage, 'token');
}
