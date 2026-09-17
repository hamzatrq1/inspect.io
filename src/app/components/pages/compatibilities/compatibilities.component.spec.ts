import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompatibilitiesComponent } from './compatibilities.component';

describe('compatibilities', () => {
  let component: CompatibilitiesComponent;
  let fixture: ComponentFixture<CompatibilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompatibilitiesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CompatibilitiesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
