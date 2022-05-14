import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordCardComponent } from './keyword-card.component';

describe('KeywordCardComponent', () => {
  let component: KeywordCardComponent;
  let fixture: ComponentFixture<KeywordCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeywordCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
