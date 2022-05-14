import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@/core/services/auth.service';
import { KeywordWithId } from '@/core/services/keyword.service';
import { AddKeywordDialogComponent } from '@/pages/home/keyword-add-button/add-keyword-dialog/add-keyword-dialog.component';

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

  constructor(private dialog: MatDialog, private authService: AuthService) {}

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
    dialogRef.afterClosed().subscribe((result) => (this.reprinted = result));
  }
}
