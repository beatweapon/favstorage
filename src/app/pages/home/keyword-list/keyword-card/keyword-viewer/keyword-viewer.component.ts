import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { KeywordWithId } from '@/core/services/keyword.service';

@Component({
  selector: 'app-keyword-viewer',
  templateUrl: './keyword-viewer.component.html',
  styleUrls: ['./keyword-viewer.component.scss'],
})
export class KeywordViewerComponent implements OnInit {
  @Input() keyword!: KeywordWithId;
  @Input() isEditable: boolean = false;
  @Input() searchWords: String[] = [];
  @Output() onClickTag: EventEmitter<any> = new EventEmitter();
  @Output() openEditor: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  isSelectedTag(tag: string): boolean {
    return this.searchWords.indexOf(tag) >= 0;
  }
}
