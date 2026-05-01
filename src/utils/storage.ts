// Utilidades para manejo de localStorage

const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'user_data',
} as const;

export const storage = {
  // Token
  setToken: (token: string): void => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  },

  getToken: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  },

  removeToken: (): void => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  },

  // User
  setUser: (user: any): void => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  getUser: (): any | null => {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  removeUser: (): void => {
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  // Clear all
  clear: (): void => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  },
};

