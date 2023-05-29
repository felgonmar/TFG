import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  
  set(key: string, value: any): void {
    if (this.localStorageAvailable()) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  get(key: string): any {
    if (this.localStorageAvailable()) {
      const item = localStorage.getItem(key);
      if (item) {
        return JSON.parse(item);
      }
    }
    return null;
  }

  remove(key: string): void {
    if (this.localStorageAvailable()) {
      localStorage.removeItem(key);
    }
  }

  localStorageAvailable(): boolean {
    try {
      const storage = window.localStorage,
        x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return false;
    }
  }
}
