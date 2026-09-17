import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ScrollspyService } from '@services/scrollspy.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let router: Router;
  let scrollSpy: ScrollspyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    scrollSpy = TestBed.inject(ScrollspyService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should automatically open the parent section when navigating to a child route', async () => {
    expect(component.isSectionOpen('menu.features.title')).toBeFalse();

    await router.navigateByUrl('/features/monitoring');
    fixture.detectChanges();

    expect(component.isSectionOpen('menu.features.title')).toBeTrue();
  });

  it('should highlight child item and keep parent item highlighted when active route or scrollSpy matches', async () => {
    const featuresItem = component.docMenuItems.find((item) => item.link === '/features');
    const monitoringItem = featuresItem?.children?.find((child) => child.link === '/features/monitoring');

    expect(featuresItem).toBeDefined();
    expect(monitoringItem).toBeDefined();
    if (!featuresItem || !monitoringItem) return;

    expect(component.isItemActive(featuresItem)).toBeFalse();
    expect(component.isItemActive(monitoringItem)).toBeFalse();

    await router.navigateByUrl('/features/monitoring');
    fixture.detectChanges();
    expect(component.isItemActive(monitoringItem)).toBeTrue();
    expect(component.isItemActive(featuresItem)).toBeTrue();

    scrollSpy.setActivePath('/features/monitoring/api');
    TestBed.flushEffects();
    expect(component.isItemActive(monitoringItem)).toBeTrue();
    expect(component.isItemActive(featuresItem)).toBeTrue();

    scrollSpy.setActivePath('/features/e2e');
    TestBed.flushEffects();
    expect(component.isItemActive(monitoringItem)).toBeFalse();
    expect(component.isItemActive(featuresItem)).toBeTrue();
  });
});

