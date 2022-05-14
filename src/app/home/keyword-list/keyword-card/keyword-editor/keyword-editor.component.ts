import {
  Component,
  OnInit,
  Input,
  Output,
  ElementRef,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete,
} from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { KeywordService, KeywordWithId } from '@/core/services/keyword.service';
import { DeleteConfirmDialogComponent } from './delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-keyword-editor',
  templateUrl: './keyword-editor.component.html',
  styleUrls: ['./keyword-editor.component.scss'],
})
export class KeywordEditorComponent implements OnInit {
  @Input() keyword!: KeywordWithId;
  @Input() searchWords: String[] = [];
  @Output() onClickTag: EventEmitter<any> = new EventEmitter();
  @Output() closeEditor: EventEmitter<any> = new EventEmitter();

  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];
  removable = true;
  addOnBlur = true;

  filteredtags: Observable<{ tag: string; count: number }[]>;
  tagCtrl = new FormControl();

  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;

  constructor(
    private dialog: MatDialog,
    private keywordService: KeywordService
  ) {
    this.filteredtags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) =>
        tag
          ? this._filter(tag).slice(0, 15)
          : this.keywordService.tagSummary.slice(0, 15)
      )
    );
  }

  ngOnInit(): void {}

  private _filter(value: string) {
    const filterValue = value.toLowerCase();

    return this.keywordService.tagSummary.filter(
      (summary) => summary.tag.toLowerCase().indexOf(filterValue) === 0
    );
  }

  /**
   * キーワードの情報を更新する処理
   */
  updateKeywordData(): void {
    if (
      this.keyword.url &&
      !this.keyword.url.match(new RegExp('^https?://.+'))
    ) {
      this.keyword.url = `http://${this.keyword.url}`;
    }

    this.keywordService.updateKeywordData(this.keyword);
  }

  /**
   * タグを追加する処理
   */
  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our tag
    if (value) {
      this.keyword.tags.push(value);

      this.updateKeywordData();
    }

    // Reset the input value
    event.chipInput!.clear();
  }

  /**
   * タグを一つ削除する処理
   * @param tag
   */
  removeTag(tag: string): void {
    const index = this.keyword.tags.indexOf(tag);

    if (index >= 0) {
      this.keyword.tags.splice(index, 1);
    }

    this.updateKeywordData();
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

        this.closeEditor.emit();
      }
    });
  }

  /**
   * キーワードを削除する処理
   */
  deleteKeywordData(): void {
    this.keywordService.deleteKeywordData(this.keyword.id);
  }

  isSelectedTag(tag: string): boolean {
    return this.searchWords.indexOf(tag) >= 0;
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.keyword.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }
}
