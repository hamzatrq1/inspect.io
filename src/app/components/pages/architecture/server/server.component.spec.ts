import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServerComponent } from './server.component';

describe('Server', () => {
  let component: ServerComponent;
  let fixture: ComponentFixture<ServerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ServerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
