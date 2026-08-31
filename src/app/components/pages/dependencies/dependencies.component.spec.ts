import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DependenciesComponent } from './dependencies.component';

describe('Dependencies', () => {
  let component: DependenciesComponent;
  let fixture: ComponentFixture<DependenciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DependenciesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DependenciesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
