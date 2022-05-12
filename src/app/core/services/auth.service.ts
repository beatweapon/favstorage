import { Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  /**
   * Google認証を利用してログインする
   */
  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  /**
   * Twitter認証を利用してログインする
   */
  loginWithTwitter() {
    return signInWithPopup(this.auth, new TwitterAuthProvider());
  }

  /**
   * Github認証を利用してログインする
   */
  loginWithGithub() {
    return signInWithPopup(this.auth, new GithubAuthProvider());
  }

  /**
   * ログアウト処理
   */
  logout() {
    return signOut(this.auth);
  }

  /**
   * ログイン中のユーザーを取得する
   */
  get user() {
    return this.auth.currentUser;
  }
}
