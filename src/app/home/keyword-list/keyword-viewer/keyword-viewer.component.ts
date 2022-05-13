import { Component, OnInit, Input } from '@angular/core';
import { KeywordWithId } from '@/core/services/keyword.service';

@Component({
  selector: 'app-keyword-viewer',
  templateUrl: './keyword-viewer.component.html',
  styleUrls: ['./keyword-viewer.component.scss'],
})
export class KeywordViewerComponent implements OnInit {
  @Input() keyword = {} as KeywordWithId;
  @Input() isEditable: boolean = false;
  @Input() searchWords: String[] = [];

  constructor() {}

  ngOnInit(): void {}

  /**
   * 検索するタグをセットする
   * @param tag
   */
  setSearchWord(tag: string) {
    const index = this.searchWords.indexOf(tag);
    if (index >= 0) {
      this.searchWords.splice(index, 1);
    } else {
      if (!this.searchWords) {
        this.searchWords = [];
      }
      this.searchWords.push(tag);
    }
  }

  isSelectedTag(tag: string): boolean {
    const index = this.searchWords.indexOf(tag);
    if (index >= 0) {
      return true;
    } else {
      return false;
    }
  }
}
