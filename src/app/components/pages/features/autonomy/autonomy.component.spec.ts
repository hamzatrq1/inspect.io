import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutonomyComponent } from './autonomy.component';

describe('Autonomy', () => {
  let component: AutonomyComponent;
  let fixture: ComponentFixture<AutonomyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutonomyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AutonomyComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
