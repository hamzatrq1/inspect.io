import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MetricsComponent } from './metrics.component';

describe('Analytics', () => {
  let component: MetricsComponent;
  let fixture: ComponentFixture<MetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetricsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MetricsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
