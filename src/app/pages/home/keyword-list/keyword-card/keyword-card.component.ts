import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
} from '@angular/core';
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
  height = 'auto';

  @ViewChild('card') card!: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  openEditor() {
    this.isEditMode = true;

    this.changeHeight();
  }

  closeEditor() {
    this.isEditMode = false;

    this.changeHeight();
  }

  changeHeight() {
    // 初期値がautoの可能性があるので最初に高さを取って設定する
    this.height = this.getCardHeight();

    setTimeout(() => {
      this.height = this.getCardHeight();

      // アニメーション終了後はautoに戻さないと高さが固定されてしまいウィンドウ幅の変更に追従できない
      // 100msはcssのtransitionの時間
      setTimeout(() => {
        this.height = 'auto';
      }, 100);
    });
  }

  getCardHeight() {
    if (!this.card) return 'auto';

    const cardMargin = 16;

    const height = this.card.nativeElement.offsetHeight + cardMargin;

    return height + 'px';
  }
}
