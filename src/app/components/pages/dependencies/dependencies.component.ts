import { Component, HostListener, inject, signal } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { goToPage, isAtBottom, isAtTop } from '@utils/utils';

@Component({
  imports: [TranslatePipe],
  selector: 'app-dependencies',
  styleUrls: ['./dependencies.component.scss'],
  templateUrl: './dependencies.component.html',
})
export class DependenciesComponent {
  private readonly router = inject(Router);
  protected readonly translate = inject(TranslateService);
  private wheelAccumulator = 0;
  private touchStartY = 0;
  private lastScrollY = 0;

  readonly isTransitioning = signal(false);
  readonly isScrollUpVisible = signal(false);

  goToDemo(): void {
    if (this.isTransitioning()) {
      return;
    }

    this.isTransitioning.set(true);

    setTimeout(() => {
      this.router.navigate(['/demonstration']);
    }, 400);
  }

  goToArchitecture(): void {
    goToPage(this.isTransitioning(), this.router, '/architecture');
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const currentScrollY =
      typeof window !== 'undefined' ? window.scrollY || document.documentElement.scrollTop || 0 : 0;
    if (currentScrollY < this.lastScrollY) {
      this.isScrollUpVisible.set(true);
    } else if (currentScrollY > this.lastScrollY && currentScrollY > 20) {
      this.isScrollUpVisible.set(false);
    }
    this.lastScrollY = currentScrollY;
  }

  @HostListener('window:wheel', ['$event'])
  onWheel(event: WheelEvent): void {
    if (this.isTransitioning()) {
      return;
    }

    if (event.deltaY < 0) {
      this.isScrollUpVisible.set(true);
      if (isAtTop()) {
        this.wheelAccumulator += Math.abs(event.deltaY);
        if (this.wheelAccumulator > 40) {
          this.goToDemo();
        }
      }
    } else if (event.deltaY > 0) {
      this.isScrollUpVisible.set(false);
      if (event.deltaY > 50 && isAtBottom()) {
        this.wheelAccumulator += event.deltaY;
        if (this.wheelAccumulator > 40) {
          this.goToArchitecture();
        }
      }
    } else {
      this.wheelAccumulator = 0;
    }
  }

  @HostListener('window:touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    this.touchStartY = event.touches[0]?.clientY ?? 0;
  }

  @HostListener('window:touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    if (this.isTransitioning()) {
      return;
    }

    const currentY = event.touches[0]?.clientY ?? 0;
    const deltaY = this.touchStartY - currentY;

    if (deltaY < 0) {
      this.isScrollUpVisible.set(true);
      if (deltaY < -50 && isAtTop()) {
        this.goToDemo();
      }
    } else if (deltaY > 0) {
      this.isScrollUpVisible.set(false);
    }
  }
}
// java, js, parler de spring des framework
