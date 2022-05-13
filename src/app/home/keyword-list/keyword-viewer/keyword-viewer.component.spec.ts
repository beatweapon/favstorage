import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordViewerComponent } from './keyword-viewer.component';

describe('KeywordViewerComponent', () => {
  let component: KeywordViewerComponent;
  let fixture: ComponentFixture<KeywordViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeywordViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
