import { ComponentFixture, TestBed } from '@angular/core/testing';
import { E2eComponent } from './e2e.component';

describe('E2e', () => {
  let component: E2eComponent;
  let fixture: ComponentFixture<E2eComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [E2eComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(E2eComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
