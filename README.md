# MyPromise 實作挑戰

## ✅ 任務說明：

請從零開始實作一個 `MyPromise` 類別，需支援以下特性：

- 三種狀態：pending / fulfilled / rejected
- 支援 then, catch, finally 並可鏈式調用
- thenable 自動展開（兼容其他 Promise 類）
- callback 執行必須是非同步（使用 queueMicrotask）
- 錯誤傳遞與捕捉（如 throw / reject）
- finally 不影響狀態與傳值

## 🧪 測試驗收：

本專案已內建 Vitest 測試案例，請使用下列指令驗證實作：

```bash
pnpm install
pnpm test
```

## 🚀 提交方式：

1. Fork 此專案至你的 GitHub 帳號
2. 完成實作（請編輯 `MyPromise.ts`）
3. 確保測試通過
4. 對原 repo 發送 Pull Request，標題請命名為：
   `[你的名字] - MyPromise 實作`

## 📌 額外挑戰（加分）：

- 實作 `MyPromise.all` / `race` / `allSettled`
- 處理循環 thenable 的容錯邏輯
- 使用 strict TypeScript 型別
