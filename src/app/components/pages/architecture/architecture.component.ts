import { AfterViewInit, Component, HostListener, inject, signal } from '@angular/core';
import { TranslateModule, TranslateService} from '@ngx-translate/core';
import mermaid from 'mermaid';
import { goToPage, ScrollNavigationHandler } from '@utils/utils';
import { Router } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-architecture',
  imports: [TranslateModule, MarkdownModule],
  templateUrl: './architecture.component.html',
  styleUrls: ['./architecture.component.scss'],
  standalone: true,
})
export class ArchitectureComponent implements AfterViewInit {
  private readonly router = inject(Router);
  protected readonly translate = inject(TranslateService);

  readonly isTransitioning = signal(false);
  readonly isScrollUpVisible = signal(false);

  private readonly scrollNav = new ScrollNavigationHandler({
    isTransitioning: () => this.isTransitioning(),
    isScrollUpVisible: this.isScrollUpVisible,
    onNavigateUp: () => this.goToCompatibilities(),
    onNavigateDown: () => this.goToComponents(),
  });

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      void mermaid.run();
    }
  }

  goToCompatibilities(): void {
    goToPage(this.isTransitioning(), this.router, '/compatibilities');
  }

  goToComponents(): void {
    goToPage(this.isTransitioning(), this.router, '/components');
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrollNav.onScroll();
  }

  @HostListener('window:wheel', ['$event'])
  onWheel(event: WheelEvent): void {
    this.scrollNav.onWheel(event);
  }

  @HostListener('window:touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    this.scrollNav.onTouchStart(event);
  }

  @HostListener('window:touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    this.scrollNav.onTouchMove(event);
  }
}
