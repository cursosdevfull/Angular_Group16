import { Injectable } from '@angular/core';

import { AdapterRepository } from '../repositories/adapter.repository';

@Injectable()
export class StorageAdapter implements AdapterRepository {
  save(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }

  get(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  remove(key: string) {
    sessionStorage.removeItem(key);
  }

  clear() {
    sessionStorage.clear();
  }
}
