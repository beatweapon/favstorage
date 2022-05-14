import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  Firestore,
  collectionData,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from '@angular/fire/firestore';

export interface KeywordWithId extends Keyword {
  id: string;
}

export type Keyword = {
  keyword: string;
  tags: string[];
  url: string;
  createDate?: any;
  updateDate?: any;
};

export interface TagSummary {
  tag: string;
  count: number;
}

@Injectable({
  providedIn: 'root',
})
export class KeywordService {
  private keywordSubscription: Subscription | null = null;
  private keywordCollectionPath = '';
  public keywords: KeywordWithId[] | null = null;

  constructor(private firestore: Firestore) {}

  /**
   * 受け取ったユーザーIDのキーワードコレクションの監視を開始する
   * @param userId データ取得対象のuserId
   */
  subscribeCollection(userId: string) {
    this.crear();

    this.setKeywordCollectionPath(userId);

    const keywordCollection = collection(
      this.firestore,
      this.keywordCollectionPath
    );

    const q = query(keywordCollection, orderBy('createDate', 'desc'));

    this.keywordSubscription = collectionData(q, { idField: 'id' }).subscribe(
      (assets) => {
        this.keywords = assets as KeywordWithId[];
      }
    );
  }

  /**
   * 登録タグのサマリ
   */
  get tagSummary(): TagSummary[] {
    if (!this.keywords) return [];

    const summary: { [tag: string]: number } = {};
    this.keywords.forEach((keyword) => {
      keyword.tags.forEach((tag) => {
        summary[tag] = summary[tag] ? summary[tag] + 1 : 1;
      });
    });
    const summaryList = Object.entries(summary).map(([tag, count]) => {
      return { tag, count };
    });
    return summaryList.sort((a, b) => b.count - a.count);
  }

  /**
   * 参照するコレクションのパスを設定する
   * @param userId データ取得対象のuserId
   */
  setKeywordCollectionPath(userId: string) {
    this.keywordCollectionPath = `users/${userId}/keywords`;
  }

  /**
   * キーワード新規追加
   * @param userId 追加対象のユーザーID
   * @param keyword 新規に追加する文字列
   * @param tags キーワードに追加するタグ
   * @param url キーワードにまつわるURL
   */
  async addKeyword(newKeyWord: Keyword) {
    newKeyWord.createDate = serverTimestamp();
    newKeyWord.updateDate = serverTimestamp();

    const keywordCollection = collection(
      this.firestore,
      this.keywordCollectionPath
    );

    await addDoc(keywordCollection, newKeyWord);
  }

  /**
   * キーワード情報更新
   * @param keywordDataWithId 更新対象のデータ
   */
  async updateKeywordData(keywordWithId: KeywordWithId) {
    const newData: Keyword = {
      keyword: keywordWithId.keyword,
      tags: keywordWithId.tags || [],
      url: keywordWithId.url || '',
      updateDate: serverTimestamp(),
    };

    await updateDoc(
      doc(this.firestore, this.keywordCollectionPath, keywordWithId.id),
      newData
    );
  }

  /**
   * キーワード情報削除
   * @param userId ユーザーのid
   * @param keywordId キーワードデータのid
   */
  deleteKeywordData(keywordId: string) {
    deleteDoc(doc(this.firestore, this.keywordCollectionPath, keywordId));
  }

  crear() {
    if (this.keywordSubscription) {
      this.keywordSubscription.unsubscribe();
    }

    this.keywordCollectionPath = '';
    this.keywords = null;
  }
}
