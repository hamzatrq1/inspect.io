import { Component, computed, effect, HostListener, inject, Output, signal, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import { NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';
import { filter } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { typBusinessCard } from '@ng-icons/typicons';
import { hugeComputerProgramming01 } from '@ng-icons/huge-icons';
import { fluentPeopleTeam, fluentDocumentQueueMultiple } from '@ng-icons/fluent-ui';
import { remixCloseLargeFill } from '@ng-icons/remixicon';
import {
  matDocumentSearchRound,
  matSchemaRound,
  matArrowMenuOpenRound,
  matArrowMenuCloseRound,
} from '@ng-icons/material-symbols/round';
import { matInfoSharp } from '@ng-icons/material-symbols/sharp';
import { matRuleSettingsFillOutline } from '@ng-icons/material-symbols/outline';
import { bootstrapRocketTakeoffFill } from '@ng-icons/bootstrap-icons';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MenuItem } from '@app/shared/constants';
import { ScrollspyService } from '@services/scrollspy.service';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    HeaderComponent,
    RouterOutlet,
    TranslateModule,
    RouterLink,
    NgIcon,
    MatTooltipModule,
    NgTemplateOutlet,
  ],
  providers: [
    provideIcons({
      typBusinessCard,
      hugeComputerProgramming01,
      fluentPeopleTeam,
      fluentDocumentQueueMultiple,
      matDocumentSearchRound,
      bootstrapRocketTakeoffFill,
      matRuleSettingsFillOutline,
      matSchemaRound,
      matInfoSharp,
      matArrowMenuOpenRound,
      matArrowMenuCloseRound,
      remixCloseLargeFill,
    }),
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
})
export class AppComponent {
  @Output() tabName: string | undefined;

  private readonly mobileBreakpoint = 768; // px
  readonly menuVisible = signal(typeof window !== 'undefined' ? window.innerWidth >= 768 : true);
  readonly scrollSpy = inject(ScrollspyService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly translate = inject(TranslateService);

  @HostListener('window:resize')
  onResize(): void {
    this.checkScreenSize();
  }

  // function to close the menu when the screen size is too small
  private checkScreenSize(): void {
    if (typeof window !== 'undefined' && window.innerWidth < this.mobileBreakpoint) {
      this.menuVisible.set(false);
    }
  }

  readonly docMenuItems: MenuItem[] = [
    { label: 'menu.home', link: '/', icon: 'matInfoSharp' },
    {
      label: 'menu.features.title',
      link: '/features',
      icon: 'hugeComputerProgramming01',
      children: [
        { label: 'menu.features.monitoring.title', link: '/features/monitoring', children: [
            { label: 'menu.features.monitoring.events', link: '/features/monitoring/events' },
            { label: 'menu.features.monitoring.workflow', link: '/features/monitoring/workflow' },
            { label: 'menu.features.monitoring.user', link: '/features/monitoring/user' },
          ] },
        { label: 'menu.features.e2e.title', link: '/features/e2e', children: [
            { label: 'menu.features.e2e.tree', link: '/features/e2e/tree' },
            { label: 'menu.features.e2e.thread', link: '/features/e2e/thread' },
            { label: 'menu.features.e2e.architecture', link: '/features/e2e/architecture' },
          ] },
        { label: 'menu.features.metrics.title', link: '/features/metrics', children: [
            { label: 'menu.features.metrics.availability', link: '/features/metrics/availability' },
            { label: 'menu.features.metrics.performance', link: '/features/metrics/performance' },
            { label: 'menu.features.metrics.volume', link: '/features/metrics/volume' },
            { label: 'menu.features.metrics.resources', link: '/features/metrics/resources' },
          ] },
        { label: 'menu.features.health.title', link: '/features/health', children: [
          { label: 'menu.features.health.inventory', link: '/features/health/inventory' },
          { label: 'menu.features.health.events', link: '/features/health/events' },
        ] },
        { label: 'menu.features.autonomy.title', link: '/features/autonomy', children: [
            { label: 'menu.features.autonomy.partitioning', link: '/features/autonomy/partitioning' },
            { label: 'menu.features.autonomy.purge', link: '/features/autonomy/purge' },
            { label: 'menu.features.autonomy.self-reporting', link: '/features/autonomy/self-reporting' }
          ] }
      ],
    },
    { label: 'menu.installation', link: '/installation', icon: 'bootstrapRocketTakeoffFill' },

    {
      label: 'menu.compatibilities',
      link: '/compatibilities',
      icon: 'matRuleSettingsFillOutline',
      children: [
        { label: 'inspect-app', link: '/compatibilities/application' },
        { label: 'inspect-core', link: '/compatibilities/collector' },
        { label: 'inspect-ng-collector', link: '/compatibilities/ng-collector' },
        { label: 'inspect-server', link: '/compatibilities/server' },
      ],
    },
    {
      label: 'menu.architecture.title',
      link: '/architecture',
      icon: 'matSchemaRound ',
      children: [
        { label: 'menu.architecture.application', link: '/architecture/application' },
        { label: 'menu.architecture.collector', link: '/architecture/collector' },
        { label: 'menu.architecture.server', link: '/architecture/server' },
      ],
    },
    { label: 'menu.conduct-code', link: '/TODO', icon: 'matDocumentSearchRound' },
    { label: 'menu.contributing', link: '/TODO', icon: 'fluentPeopleTeam' },
  ];

  private static collectExpandableLabels(items: MenuItem[]): string[] {
    const labels: string[] = [];
    for (const item of items) {
      if (item.children?.length) {
        labels.push(item.label, ...AppComponent.collectExpandableLabels(item.children));
      }
    }
    return labels;
  }

  readonly openSections = signal<Record<string, boolean>>({});

  readonly areAllSectionsOpen = computed(() => {
    const allLabels = AppComponent.collectExpandableLabels(this.docMenuItems);
    return allLabels.length > 0 && allLabels.every((label) => this.isSectionOpen(label));
  });

  constructor() {
    this.translate.addLangs(['en', 'fr']);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    const langToUse = browserLang && ['en', 'fr'].includes(browserLang.toLowerCase()) ? browserLang.toLowerCase() : 'en';
    this.translate.use(langToUse);

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event) => {
        this.openAncestorsForUrl(event.urlAfterRedirects || event.url);
      });

    effect(() => {
      const active = this.scrollSpy.activePath();
      if (active) {
        this.openAncestorsForUrl(active);
      }
    });

    this.openAncestorsForUrl(this.router.url);
  }

  private findMenuItemByLabel(label: string, items: MenuItem[] = this.docMenuItems): MenuItem | undefined {
    for (const item of items) {
      if (item.label === label) return item;
      if (item.children?.length) {
        const found = this.findMenuItemByLabel(label, item.children);
        if (found) return found;
      }
    }
    return undefined;
  }

  private openAncestorsForUrl(url: string): void {
    const cleanUrl = url.split('?')[0].split('#')[0];
    if (!cleanUrl || cleanUrl === '/') {
      return;
    }

    const labelsToOpen = new Set<string>();

    if (labelsToOpen.size > 0) {
      this.openSections.update((sections) => {
        const next = { ...sections };
        for (const label of labelsToOpen) {
          next[label] = true;
        }
        return next;
      });
    }
  }

  isItemActive(item: MenuItem): boolean {
    const activeScroll = this.scrollSpy.activePath();
    const currentUrl = (activeScroll ?? this.router.url).split('?')[0].split('#')[0];

    if (!currentUrl || currentUrl === '/') {
      return item.link === '/';
    }

    if (item.link === '/') {
      return false;
    }

    if (item.link === currentUrl || currentUrl.startsWith(item.link + '/')) {
      return true;
    }

    if (item.children?.length) {
      return item.children.some((child) => this.isItemActive(child));
    }

    return false;
  }

  isSectionOpen(label: string): boolean {
    const explicit = this.openSections()[label];
    if (explicit !== undefined) {
      return explicit;
    }
    const item = this.findMenuItemByLabel(label);
    if (item && this.isItemActive(item)) {
      return true;
    }
    return false;
  }

  toggleSection(label: string): void {
    const currentState = this.isSectionOpen(label);
    this.openSections.update((sections) => ({
      ...sections,
      [label]: !currentState,
    }));
  }

  toggleAllSections(): void {
    const shouldOpen = !this.areAllSectionsOpen();
    const allLabels = AppComponent.collectExpandableLabels(this.docMenuItems);
    const updated: Record<string, boolean> = {};
    for (const label of allLabels) {
      updated[label] = shouldOpen;
    }
    this.openSections.set(updated);
  }

  toggleMenuVisibility(): void {
    this.menuVisible.update((visible) => !visible);
  }

  trackByLabel(index: number, item: MenuItem): string {
    return item.label;
  }
}
