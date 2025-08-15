import { AppMenu } from './menu';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('Menu', () => {
  let component: AppMenu;
  let fixture: ComponentFixture<AppMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppMenu]
    }).compileComponents();

    fixture = TestBed.createComponent(AppMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
