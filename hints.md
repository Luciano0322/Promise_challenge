# 🧩 MyPromise 實作提示（HINTS）

這份提示設計為階段式引導，請在卡關或想確認思路時再閱讀。

---

## Step 1 - `.then()` 支援

### 🎯 目標

當 `resolve(value)` 被呼叫時，所有 `.then(fn)` 中的 fn 都應該被執行。

### 💡 提示

- `then()` 是註冊行為，不應立即執行 fn
- 可以使用 `this.onFulfilled = []` 來存起來
- 當 `resolve(value)` 被觸發時，用 `forEach()` 將這些函式一一執行

```ts
this.onFulfilled.push(fn); // then 時儲存
...
this.onFulfilled.forEach(fn => fn(value)); // resolve 時呼叫
```

---

## Step 2 - `.catch()` 支援

### 🎯 目標

當 `reject(error)` 被呼叫時，所有 `.catch(fn)` 中的 fn 都應該被執行。

### 💡 提示

- 和 `then()` 結構一樣，但要分開管理錯誤 callback
- 你可以使用 `this.onRejected = []`
- 在 `reject()` 裡呼叫所有錯誤處理函式

```ts
this.onRejected.push(fn);
...
this.onRejected.forEach(fn => fn(error));
```

---

## Step 3 - 非同步執行

### 🎯 目標

即使是同步呼叫 `resolve()`，也應該讓 `.then()` 延後執行（非同步）

### 💡 提示

- 使用 `queueMicrotask()` 可以在 JS call stack 清空後立即執行
- 不要用 `setTimeout()`，因為那是 macro task，不是微任務

```ts
queueMicrotask(() => {
  this.state = "fulfilled";
  this.onFulfilled.forEach((fn) => fn(value));
});
```

你可以試著用 `console.log()` 印出觸發順序觀察行為：

```ts
const p = new MyPromise((res) => res(1));
p.then(() => console.log("then"));
console.log("sync");
// 輸出應為：sync -> then
```

---

✅ 完成以上階段即通過所有測試。下一步可挑戰鏈式 then、finally、thenable 支援。
