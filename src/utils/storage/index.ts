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

export function setAuthData({
  token,
  email,
}: {
  token: string;
  email: string;
}) {
  setItem(localStorage, 'token', token);
  setItem(localStorage, 'email', email);
}

export function getAuthData() {
  const token = getItem(localStorage, 'token');
  const email = getItem(localStorage, 'email');

  if (token && email) {
    return { token, email };
  }

  return null;
}

export function removeToken() {
  removeLsItem(localStorage, 'token');
}
