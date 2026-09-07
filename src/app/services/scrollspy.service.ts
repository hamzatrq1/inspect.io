import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollspyService {
  readonly activePath = signal<string | null>(null);

  setActivePath(path: string | null): void {
    this.activePath.set(path);
  }
}
