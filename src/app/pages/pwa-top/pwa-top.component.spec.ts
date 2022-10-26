import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PwaTopComponent } from './pwa-top.component';

describe('TopComponent', () => {
  let component: PwaTopComponent;
  let fixture: ComponentFixture<PwaTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PwaTopComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PwaTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
