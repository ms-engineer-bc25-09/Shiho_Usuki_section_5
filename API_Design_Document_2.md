# 家計簿アプリ API 設計書

## 1. APIが提供するリソースの一覧
- 入出金履歴 (transactions)
- 月ごとの入出金レポート (monthlyReports)

## 2. エンドポイントの一覧

### 入出金履歴
- `GET /api/transactions` - 入出金の一覧を取得
- `GET /api/transactions/:id` - 特定の入出金の詳細を取得
- `POST /api/transactions` - 新しい入出金を作成
- `PUT /api/transactions/:id` - 特定の入出金を更新
- `DELETE /api/transactions/:id` - 特定の入出金を削除

### 月ごとの入出金レポート
- `GET /api/reports/monthly` - 月ごとの入出金レポートを取得

## 3. HTTPメソッドごとの設計

### 3.1 入出金履歴

- **一覧取得** (GET /api/transactions)
  - **リクエスト**: 
    - クエリパラメータ: `?month=YYYY-MM`
  - **レスポンス**:
    ```json
    [
      {
        "id": 1,
        "date": "YYYY-MM-DD",
        "amount": 1000,
        "type": "income",
        "description": "給与"
      },
      ...
    ]
    ```

- **詳細取得** (GET /api/transactions/:id)
  - **リクエスト**: 
    - パラメータ: `id`
  - **レスポンス**:
    ```json
    {
      "id": 1,
      "date": "YYYY-MM-DD",
      "amount": 1000,
      "type": "income",
      "description": "給与"
    }
    ```

- **新規作成** (POST /api/transactions)
  - **リクエスト**:
    ```json
    {
      "date": "YYYY-MM-DD",
      "amount": 1000,
      "type": "income",
      "description": "給与"
    }
    ```
  - **レスポンス**:
    ```json
    {
      "id": 1,
      "date": "YYYY-MM-DD",
      "amount": 1000,
      "type": "income",
      "description": "給与"
    }
    ```

- **更新** (PUT /api/transactions/:id)
  - **リクエスト**:
    ```json
    {
      "amount": 1500,
      "description": "昇給"
    }
    ```
  - **レスポンス**:
    ```json
    {
      "id": 1,
      "date": "YYYY-MM-DD",
      "amount": 1500,
      "type": "income",
      "description": "昇給"
    }
    ```

- **削除** (DELETE /api/transactions/:id)
  - **リクエスト**: 
    - パラメータ: `id`
  - **レスポンス**: 
    ```json
    {
      "message": "Transaction deleted successfully."
    }
    ```

### 3.2 月ごとの入出金レポート

- **レポート取得** (GET /api/reports/monthly)
  - **リクエスト**:
    - クエリパラメータ: `?year=YYYY`
  - **レスポンス**:
    ```json
    [
      {
        "month": "YYYY-MM",
        "totalIncome": 50000,
        "totalExpense": 30000,
        "balance": 20000
      },
      ...
    ]
    ```

## 4. 考慮事項

- **セキュリティ**:
  - APIへのアクセスには、認証トークンやAPIキーを使用することを検討してください。
  
- **パフォーマンス**:
  - キャッシュを活用して、頻繁にアクセスされるデータを効率化することが重要です。

- **データベース連携**:
  - PrismaなどのORMを使用して、データ操作をクリーンに保ち、SQLインジェクション対策にもつながります。

- **エラーハンドリング**:
  - バリデーションエラー時には適切なHTTPステータスコードを返し、エラーメッセージを分かりやすくすることで、クライアント側での対応を容易にします。

