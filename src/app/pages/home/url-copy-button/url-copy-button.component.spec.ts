import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlCopyButtonComponent } from './url-copy-button.component';

describe('UrlCopyButtonComponent', () => {
  let component: UrlCopyButtonComponent;
  let fixture: ComponentFixture<UrlCopyButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrlCopyButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlCopyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
