class LocalStorage {

    get(key) {
        return localStorage.getItem(key);
    }

    save(key, data) {
        localStorage.setItem(key, data);
    }
}