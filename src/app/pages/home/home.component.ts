import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  userId: string = '';
  searchWords: string[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.userId = param['userId'];
    });

    this.route.queryParams.subscribe((param) => {
      const searchWords = param['searchWords'];

      if (typeof searchWords === 'string') {
        this.searchWords = [searchWords];
      }

      if (typeof searchWords === 'object') {
        this.searchWords = searchWords;
      }
    });
  }

  get isMyPage(): boolean {
    return this.userId === this.authService.user?.uid;
  }

  /**
   * 検索するタグをトグルする
   * @param tag
   */
  toggleSearchWord(tag: string) {
    const index = this.searchWords.indexOf(tag);

    if (index >= 0) {
      this.removeSearchWord(tag);
    } else {
      this.addSearchWord(tag);
    }
  }

  /**
   * 検索するタグを追加する
   * @param tag
   */
  addSearchWord(tag: string) {
    const searchWords = this.searchWords.slice();
    const index = searchWords.indexOf(tag);

    searchWords.push(tag);

    this.setSearchWord(searchWords);
  }

  /**
   * 検索するタグを削除する
   * @param tag
   */
  removeSearchWord(tag: string) {
    const searchWords = this.searchWords.slice();
    const index = searchWords.indexOf(tag);

    searchWords.splice(index, 1);

    this.setSearchWord(searchWords);
  }

  /**
   * 検索するタグをセットする
   * @param searchWords
   */
  setSearchWord(searchWords: string[]) {
    this.router.navigate([this.router.url.split('?')[0]], {
      queryParams: { searchWords },
      replaceUrl: true,
    });
  }
}
