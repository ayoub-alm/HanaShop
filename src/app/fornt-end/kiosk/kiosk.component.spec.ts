import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KioskComponent } from './kiosk.component';

describe('KioskComponent', () => {
  let component: KioskComponent;
  let fixture: ComponentFixture<KioskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KioskComponent]
    });
    fixture = TestBed.createComponent(KioskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
