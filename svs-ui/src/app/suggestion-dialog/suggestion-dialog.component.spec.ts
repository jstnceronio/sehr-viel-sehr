import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionDialogComponent } from './suggestion-dialog.component';

describe('SuggestionDialogComponent', () => {
  let component: SuggestionDialogComponent;
  let fixture: ComponentFixture<SuggestionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestionDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
