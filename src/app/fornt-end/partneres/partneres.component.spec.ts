import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartneresComponent } from './partneres.component';

describe('PartneresComponent', () => {
  let component: PartneresComponent;
  let fixture: ComponentFixture<PartneresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartneresComponent]
    });
    fixture = TestBed.createComponent(PartneresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
