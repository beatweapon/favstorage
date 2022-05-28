import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@/core/services/auth.service';
import { KeywordService, KeywordWithId } from '@/core/services/keyword.service';
import { AddKeywordDialogComponent } from '@/pages/home/keyword-add-button/add-keyword-dialog/add-keyword-dialog.component';
import { DeleteConfirmDialogComponent } from './delete-confirm-dialog/delete-confirm-dialog.component';

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

  reprinted = false;
  removable = false;

  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private authService: AuthService,
    private keywordService: KeywordService
  ) {}

  ngOnInit(): void {}

  isSelectedTag(tag: string): boolean {
    return this.searchWords.indexOf(tag) >= 0;
  }

  get reprintable(): boolean {
    return !!this.authService.user && !this.isEditable;
  }

  /**
   * キーワードの情報を自分のストレージにコピーする
   */
  reprintToMystorage(): void {
    const dialogRef = this.dialog.open(AddKeywordDialogComponent, {
      width: '80%',
    });
    dialogRef.componentInstance.addButtonLabel = 'マイストレージに追加';
    dialogRef.componentInstance.newKeyword.keyword = this.keyword.keyword;
    dialogRef.componentInstance.newKeyword.url = this.keyword.url;
    dialogRef.componentInstance.newKeyword.tags = this.keyword.tags;
    dialogRef.afterClosed().subscribe((result) => {
      this.reprinted = result;

      if (result) {
        this.openSnackBar();
      }
    });
  }

  openSnackBar() {
    const message = 'カードをマイストレージにコピーしました';
    this._snackBar.open(message, undefined, {
      duration: 3000,
    });
  }

  delayRemovable() {
    this.removable = false;

    setTimeout(() => (this.removable = true), 1000);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '80%',
      data: {
        title: 'カードを削除しちゃう？',
        text: '間違って消してもやり直しはできませんよ…',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteKeywordData();
      }
    });
  }

  /**
   * キーワードを削除する処理
   */
  deleteKeywordData(): void {
    this.keywordService.deleteKeywordData(this.keyword.id);
  }
}
