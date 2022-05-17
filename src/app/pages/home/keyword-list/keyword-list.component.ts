import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@/core/services/auth.service';
import { KeywordService, KeywordWithId } from '@/core/services/keyword.service';

@Component({
  selector: 'app-keyword-list',
  templateUrl: './keyword-list.component.html',
  styleUrls: ['./keyword-list.component.scss'],
})
export class KeywordListComponent implements OnInit {
  @Input() searchWords!: string[];
  @Output() toggleSearchWord: EventEmitter<any> = new EventEmitter();

  userId: string = '';
  mode: 'or' | 'and' = 'and';
  editModeCount = 0;

  constructor(
    private authService: AuthService,
    private keywordService: KeywordService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.userId = param['userId'];
      this.keywordService.subscribeCollection(this.userId);
    });
  }

  get isMyPage(): boolean {
    return this.userId === this.authService.user?.uid;
  }

  get filteredKeywords() {
    if (!this.keywords) return [];

    return this.keywords.filter((k) => this.andFilter(k, this.searchWords));
  }

  get keywords() {
    return this.keywordService.keywords;
  }

  get filteredEmpty(): boolean {
    return (
      !!this.keywords &&
      this.filteredKeywords.length === 0 &&
      this.keywords.length > 0
    );
  }

  trackByKeywordId(index: number, item: KeywordWithId) {
    return item.id;
  }

  /**
   * AND条件のフィルター
   * @param keyword
   * @param words 絞り込み条件のタグ
   */
  andFilter(keyword: KeywordWithId, words: string[]): boolean {
    if (!keyword.tags) return false;

    for (const word of words) {
      // 一つでも単語がヒットしなければfalseを返す
      if (!keyword.tags.includes(word)) {
        return false;
      }
    }

    // 全ての単語がヒットすればtrueを返す
    return true;
  }
}
