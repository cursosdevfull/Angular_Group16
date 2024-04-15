import { Inject, Injectable } from '@angular/core';

import { StorageRepository } from '../domain/repositories/storage.repository';
import { StorageInfrastructure } from '../infrastructure/storage.infrastructure';

@Injectable()
export class StorageApplication {
  constructor(
    @Inject(StorageInfrastructure)
    private readonly repository: StorageRepository
  ) {}

  save(key: string, value: string): void {
    this.repository.save(key, value);
  }

  get(key: string): string | null {
    return this.repository.get(key);
  }

  remove(key: string): void {
    this.repository.remove(key);
  }

  clear(): void {
    this.repository.clear();
  }
}
