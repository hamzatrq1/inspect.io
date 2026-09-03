import { Component, computed, HostListener, Output, signal } from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import { RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
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

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    RouterOutlet,
    TranslatePipe,
    RouterLink,
    RouterLinkActive,
    NgIcon,
    MatTooltipModule,
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
})
export class AppComponent {
  @Output() tabName: string | undefined;

  private readonly mobileBreakpoint = 1024;
  readonly menuVisible = signal(typeof window !== 'undefined' ? window.innerWidth >= 1024 : true);

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

  readonly docMenuItems = [
    { label: 'menu.home', link: '/', icon: 'matInfoSharp' },
    {
      label: 'menu.features.title',
      link: '/features',
      icon: 'hugeComputerProgramming01',
      children: [
        { label: 'menu.features.monitoring', link: '/features/monitoring' },
        { label: 'menu.features.e2e', link: '/features/e2e' },
        { label: 'menu.features.analytics', link: '/features/analytics' },
        { label: 'menu.features.health', link: '/features/health' },
        { label: 'menu.features.autonomy', link: '/features/autonomy' },
        { label: 'menu.features.traceability', link: '/features/traceability' },
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
    {
      label: 'menu.components.title',
      link: '/components',
      icon: 'fluentDocumentQueueMultiple',
      children: [
        { label: 'menu.components.session', link: '/components/session' },
        { label: 'menu.components.request', link: '/components/request' },
      ],
    },
    { label: 'menu.conduct-code', link: '/TODO', icon: 'matDocumentSearchRound' },
    { label: 'menu.contributing', link: '/TODO', icon: 'fluentPeopleTeam' },
  ];

  readonly openSections = signal<Record<string, boolean>>(
    this.docMenuItems
      .filter((item) => item.children?.length)
      .reduce<Record<string, boolean>>((sections, item) => {
        sections[item.label] = false; // Initialize all sections as closed
        return sections;
      }, {}),
  );

  readonly areAllSectionsOpen = computed(() => {
    const sections = this.openSections();
    const keys = Object.keys(sections);
    return keys.length > 0 && keys.every((key) => sections[key]);
  });

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
}
