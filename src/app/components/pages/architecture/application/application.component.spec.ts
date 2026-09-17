import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationComponent } from './application.component';

describe('Application', () => {
  let component: ApplicationComponent;
  let fixture: ComponentFixture<ApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ApplicationComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
