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

  private readonly mobileBreakpoint = 1024;
  readonly menuVisible = signal(typeof window !== 'undefined' ? window.innerWidth >= 1024 : true);
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
        { label: 'menu.features.monitoring.title', link: '/features/monitoring' },
        { label: 'menu.features.e2e.title', link: '/features/e2e' },
        { label: 'menu.features.metrics.title', link: '/features/metrics' },
        { label: 'menu.features.health.title', link: '/features/health' },
        { label: 'menu.features.autonomy.title', link: '/features/autonomy' }
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

  readonly openSections = signal<Record<string, boolean>>(
    AppComponent.collectExpandableLabels(this.docMenuItems).reduce<Record<string, boolean>>(
      (sections, label) => {
        sections[label] = false;
        return sections;
      },
      {},
    ),
  );

  readonly areAllSectionsOpen = computed(() => {
    const sections = this.openSections();
    const keys = Object.keys(sections);
    return keys.length > 0 && keys.every((key) => sections[key]);
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

  private openAncestorsForUrl(url: string): void {
    const cleanUrl = url.split('?')[0].split('#')[0];
    if (!cleanUrl || cleanUrl === '/') {
      return;
    }

    const labelsToOpen = new Set<string>();

    const checkItem = (item: MenuItem): boolean => {
      const matchesSelf = item.link !== '/' && (cleanUrl === item.link || cleanUrl.startsWith(item.link + '/'));
      let matchesChild = false;

      if (item.children && item.children.length > 0) {
        for (const child of item.children) {
          if (checkItem(child)) {
            matchesChild = true;
          }
        }
      }

      if (matchesChild || matchesSelf) {
        if (item.children && item.children.length > 0) {
          labelsToOpen.add(item.label);
        }
        return true;
      }

      return false;
    };

    for (const item of this.docMenuItems) {
      checkItem(item);
    }

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
    return this.openSections()[label] ?? false;
  }

  toggleSection(label: string): void {
    this.openSections.update((sections) => ({
      ...sections,
      [label]: !sections[label],
    }));
  }

  toggleAllSections(): void {
    const shouldOpen = !this.areAllSectionsOpen();
    const updated: Record<string, boolean> = {};
    this.openSections.update((sections) => {
      for (const key of Object.keys(sections)) {
        updated[key] = shouldOpen;
      }
      return updated;
    });
  }

  toggleMenuVisibility(): void {
    this.menuVisible.update((visible) => !visible);
  }

  trackByLabel(index: number, item: MenuItem): string {
    return item.label;
  }
}
