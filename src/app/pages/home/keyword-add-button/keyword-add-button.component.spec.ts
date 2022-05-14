import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordAddButtonComponent } from './keyword-add-button.component';

describe('KeywordAddButtonComponent', () => {
  let component: KeywordAddButtonComponent;
  let fixture: ComponentFixture<KeywordAddButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeywordAddButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordAddButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
