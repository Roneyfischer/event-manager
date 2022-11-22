import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarPublicComponent } from './navbar-public.component';

describe('NavbarPublicComponent', () => {
  let component: NavbarPublicComponent;
  let fixture: ComponentFixture<NavbarPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarPublicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
