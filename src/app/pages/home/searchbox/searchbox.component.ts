import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss'],
})
export class SearchboxComponent implements OnInit {
  @Input() searchWords!: string[];
  @Output() addSearchWord: EventEmitter<any> = new EventEmitter();
  @Output() removeSearchWord: EventEmitter<any> = new EventEmitter();

  selectable = true;
  removable = true;
  addOnBlur = true;
  isEditMode = false;

  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];

  constructor() {}

  ngOnInit(): void {}

  add(event: MatChipInputEvent) {
    const value = (event.value || '').trim();

    // Add our tag
    if (value) {
      this.addSearchWord.emit(value);
    }

    // Reset the input value
    event.chipInput!.clear();
  }

  remove(tag: string) {
    this.removeSearchWord.emit(tag);
  }
}
