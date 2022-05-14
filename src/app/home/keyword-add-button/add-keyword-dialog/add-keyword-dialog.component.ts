import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete,
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { KeywordService, Keyword } from '@/core/services/keyword.service';

@Component({
  selector: 'app-add-keyword-dialog',
  templateUrl: './add-keyword-dialog.component.html',
  styleUrls: ['./add-keyword-dialog.component.scss'],
})
export class AddKeywordDialogComponent implements OnInit {
  public newKeyword = this.clearNewKeyword();

  clearNewKeyword(): Keyword {
    return {
      keyword: '',
      tags: [],
      url: '',
    };
  }

  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];
  removable = true;
  addOnBlur = true;

  filteredtags: Observable<{ tag: string; count: number }[]>;
  tagCtrl = new FormControl();

  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;

  constructor(
    public dialogRef: MatDialogRef<AddKeywordDialogComponent>,
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

  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * タグを追加する処理
   */
  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our tag
    if (value) {
      this.newKeyword.tags.push(value);
    }

    // Reset the input value
    event.chipInput!.clear();
  }

  /**
   * 指定されたタグを削除する処理
   * @param tag
   */
  removeTag(tag: string): void {
    const index = this.newKeyword.tags.indexOf(tag);

    if (index >= 0) {
      this.newKeyword.tags.splice(index, 1);
    }
  }

  /**
   * キーワードを新規追加する処理
   */
  async addKeyword() {
    if (this.newKeyword.keyword === '') return;

    await this.keywordService.addKeyword(this.newKeyword).catch((e) => {
      throw new Error(e);
    });

    this.newKeyword = this.clearNewKeyword();

    this.dialogRef.close();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.newKeyword.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }
}
