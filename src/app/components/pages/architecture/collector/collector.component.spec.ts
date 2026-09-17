import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollectorComponent } from './collector.component';

describe('Collector', () => {
  let component: CollectorComponent;
  let fixture: ComponentFixture<CollectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CollectorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
