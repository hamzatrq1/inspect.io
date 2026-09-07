import { WritableSignal } from '@angular/core';

export interface ScrollNavigationOptions {
  isTransitioning?: () => boolean;
  isScrollUpVisible?: WritableSignal<boolean>;
  isScrollDownVisible?: WritableSignal<boolean>;
  onNavigateUp?: () => void;
  onNavigateDown?: () => void;
}

export class ScrollNavigationHandler {
  private wheelAccumulator = 0;
  private touchStartY = 0;
  private lastScrollY = 0;

  constructor(private readonly options: ScrollNavigationOptions) {}

  onScroll(): void {
    const currentScrollY =
      typeof window !== 'undefined' ? window.scrollY || document.documentElement.scrollTop || 0 : 0;
    if (currentScrollY < this.lastScrollY) {
      this.options.isScrollUpVisible?.set(false);
      this.options.isScrollDownVisible?.set(false);
    }
    this.lastScrollY = currentScrollY;
  }

  onWheel(event: WheelEvent): void {
    if (this.options.isTransitioning?.()) {
      return;
    }

    if (event.deltaY < 0) {
      this.options.isScrollUpVisible?.set(true);
      this.options.isScrollDownVisible?.set(false);
      if (isAtTop()) {
        this.wheelAccumulator += Math.abs(event.deltaY);
        if (this.wheelAccumulator > 40) {
          this.options.onNavigateUp?.();
        }
      }
    } else if (event.deltaY > 0) {
      this.options.isScrollUpVisible?.set(false);
      this.options.isScrollDownVisible?.set(true);
      if (event.deltaY > 50 && isAtBottom()) {
        this.wheelAccumulator += event.deltaY;
        if (this.wheelAccumulator > 100) {
          this.options.onNavigateDown?.();
        }
      }
    } else {
      this.wheelAccumulator = 0;
    }
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartY = event.touches[0]?.clientY ?? 0;
  }

  onTouchMove(event: TouchEvent): void {
    if (this.options.isTransitioning?.()) {
      return;
    }

    const currentY = event.touches[0]?.clientY ?? 0;
    const deltaY = this.touchStartY - currentY;

    if (deltaY < 0) {
      this.options.isScrollUpVisible?.set(true);
      if (deltaY < -50 && isAtTop()) {
        this.options.onNavigateUp?.();
      }
    } else if (deltaY > 0) {
      this.options.isScrollUpVisible?.set(false);
    }
  }
}

export function isAtTop(): boolean {
  const threshold = 15;
  const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
  return scrollY <= threshold;
}

export function isAtBottom(): boolean {
  const threshold = 20;
  const windowHeight = window.innerHeight;
  const scrollY = window.scrollY || document.documentElement.scrollTop;
  const documentHeight = document.documentElement.scrollHeight;

  return windowHeight + scrollY >= documentHeight - threshold;
}

export function goToPage(isTransitioning: boolean, router: any, navigateTo: string): void {
  if (isTransitioning) {
    return;
  }

  setTimeout(() => {
    router.navigate([navigateTo]);
  }, 400);
}
