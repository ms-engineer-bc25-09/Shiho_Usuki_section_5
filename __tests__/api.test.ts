//取引情報を取得するGETリクエストに対するテストを行うテストコード（正常系）
import app from '../src/app'; // app.tsからインポート
import request from 'supertest'; // supertestをインポート
import { describe, it, expect } from 'vitest'; // vitestの機能をインポート

describe('API Tests', () => {
  it('gets transactions', async () => {
    const response = await request(app).get('/api/transactions');

    // ステータスコード200が返ってくることの確認
    expect(response.status).toBe(200);

    // レスポンスボディの構造を確認（必要に応じて変更）
    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBe(true);
  });
});