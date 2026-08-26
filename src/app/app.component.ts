import {Component, inject, signal } from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import { RouterLink, RouterOutlet} from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { boxAngularLogo } from '@ng-icons/boxicons/logos';
import { typBusinessCard } from '@ng-icons/typicons';
import { hugeComputerProgramming01 } from '@ng-icons/huge-icons';
import { fluentPeopleTeam, fluentDocumentQueueMultiple } from '@ng-icons/fluent-ui';
import { matDocumentSearchRound, matSchemaRound } from '@ng-icons/material-symbols/round';
import { matInfoSharp } from '@ng-icons/material-symbols/sharp';
import { matRuleSettingsFillOutline } from '@ng-icons/material-symbols/outline';
import { bootstrapRocketTakeoffFill } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet, TranslatePipe, RouterLink, NgIcon],
  providers: [
    provideIcons({
      boxAngularLogo,
      typBusinessCard,
      hugeComputerProgramming01,
      fluentPeopleTeam,
      fluentDocumentQueueMultiple,
      matDocumentSearchRound,
      bootstrapRocketTakeoffFill,
      matRuleSettingsFillOutline,
      matSchemaRound,
      matInfoSharp,
    }),
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private readonly translate = inject(TranslateService);
  constructor() {}

  readonly docMenuItems = [
    { label: 'header.menu.home', link: '/', icon: 'matInfoSharp' },
    { label: 'header.menu.installation', link: '/installation', icon: 'hugeComputerProgramming01' },
    {
      label: 'header.menu.quick-start',
      link: '/demonstration',
      icon: 'bootstrapRocketTakeoffFill',
    },
    { label: 'header.menu.dependencies', link: '/TODO', icon: 'matRuleSettingsFillOutline' }, // java, js, parler de spring des framework

    // sous titre : c'est pour qui inspect (PO, DEV, Suivi...)
    // mentionner que les img docker ont besoin de manip en plus (certifs etc)
    // DualEventTrace => event tracé 2 fois, début et fin
    // Quand le traitement prend fin, on cherche sa fin pour avoir une meilleure visibilité dessus
    {
      label: 'header.menu.architecture.title',
      link: '/architecture',
      icon: 'matSchemaRound ',
      children: [
        { label: 'header.menu.architecture.application', link: '/architecture' },
        { label: 'header.menu.architecture.collector', link: '/architecture' },
        { label: 'header.menu.architecture.server', link: '/architecture' },
      ],
    },
    // parler des dépendances techniques IMPORTANTES, jakarta pour l'envoi de mail
    // pour du HTTP REST, on utilise Reactor et une autre => intéressant de lister
    {
      label: 'header.menu.technical-description',
      link: '/TODO',
      icon: 'fluentDocumentQueueMultiple',
    },
    { label: 'header.menu.conduct-code', link: '/TODO', icon: 'matDocumentSearchRound' },
    { label: 'header.menu.contributing', link: '/TODO', icon: 'fluentPeopleTeam' },
  ];

  readonly openSections = signal<Record<string, boolean>>(
    this.docMenuItems
      .filter((item) => item.children?.length)
      .reduce<Record<string, boolean>>((sections, item) => {
        sections[item.label] = false; // Initialize all sections as closed
        return sections;
      }, {}),
  );

  isSectionOpen(label: string): boolean {
    return this.openSections()[label] ?? false;
  }

  toggleSection(label: string): void {
    this.openSections.update((sections) => ({
      ...sections,
      [label]: !sections[label],
    }));
  }
}
