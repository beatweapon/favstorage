import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { KeywordWithId } from '@/core/services/keyword.service';

@Component({
  selector: 'app-keyword-card',
  templateUrl: './keyword-card.component.html',
  styleUrls: ['./keyword-card.component.scss'],
})
export class KeywordCardComponent implements OnInit {
  @Input() keyword!: KeywordWithId;
  @Input() searchWords: String[] = [];
  @Input() isEditable: boolean = false;
  @Output() toggleSearchWord: EventEmitter<any> = new EventEmitter();
  isEditMode = false;

  constructor() {}

  ngOnInit(): void {}

  openEditor() {
    this.isEditMode = true;
  }

  closeEditor() {
    this.isEditMode = false;
  }
}
