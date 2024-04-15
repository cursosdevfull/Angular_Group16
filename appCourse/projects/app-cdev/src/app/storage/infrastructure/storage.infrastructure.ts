import { Inject, Injectable } from '@angular/core';

import { StorageRepository } from '../domain/repositories/storage.repository';
import { StorageAdapter } from './adapters/storage.adapter';
import { AdapterRepository } from './repositories/adapter.repository';

@Injectable()
export class StorageInfrastructure implements StorageRepository {
  constructor(
    @Inject(StorageAdapter) private readonly adapter: AdapterRepository
  ) {}

  save(key: string, value: string): void {
    this.adapter.save(key, value);
  }
  get(key: string): string | null {
    return this.adapter.get(key);
  }
  remove(key: string): void {
    this.adapter.remove(key);
  }
  clear(): void {
    this.adapter.clear();
  }
}
