export const STORAGE_KEY = "moviespot";

let syncedData = {
  auth: {
    isLoggedIn: false,
    access: null,
    refresh: null
  },
  user: {},
};

if (localStorage.getItem(STORAGE_KEY)) {
  syncedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
}

export const state = syncedData;
