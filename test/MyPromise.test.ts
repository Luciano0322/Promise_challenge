import { describe, it, expect } from 'vitest';
import { MyPromise } from '../MyPromise';

describe('MyPromise', () => {
  it('resolves a value', async () => {
    const p = new MyPromise(res => res(42));
    await expect(p).resolves.toBe(42);
  });

  it('rejects a value', async () => {
    const p = new MyPromise((_, rej) => rej('fail'));
    await expect(p).rejects.toBe('fail');
  });

  it('supports chaining', async () => {
    const result = await new MyPromise(res => res(1))
      .then(v => v + 1)
      .then(v => v * 2);
    expect(result).toBe(4);
  });

  it('supports finally', async () => {
    let called = false;
    const result = await new MyPromise(res => res('done')).finally(() => { called = true; });
    expect(result).toBe('done');
    expect(called).toBe(true);
  });

  it('resolves thenables', async () => {
    const thenable = { then: (resolve: any) => resolve(99) };
    const result = await new MyPromise(res => res(thenable));
    expect(result).toBe(99);
  });

  it('throws on self-resolution', async () => {
    const p: any = new MyPromise(() => {});
    try {
      p.resolvePromise(p);
    } catch (e) {
      expect(e).toBeInstanceOf(TypeError);
    }
  });

  // 加分測試
  // it('MyPromise.all resolves when all succeed', async () => {
  //   const p1 = MyPromise.resolve(1);
  //   const p2 = MyPromise.resolve(2);
  //   const result = await MyPromise.all([p1, p2]);
  //   expect(result).toEqual([1, 2]);
  // });

  // it('MyPromise.all rejects if one fails', async () => {
  //   const p1 = MyPromise.resolve(1);
  //   const p2 = MyPromise.reject('error');
  //   try {
  //     await MyPromise.all([p1, p2]);
  //   } catch (e) {
  //     expect(e).toBe('error');
  //   }
  // });

  // it('MyPromise.race resolves with the fastest promise', async () => {
  //   const p1 = new MyPromise(res => setTimeout(() => res('slow'), 50));
  //   const p2 = new MyPromise(res => setTimeout(() => res('fast'), 10));
  //   const result = await MyPromise.race([p1, p2]);
  //   expect(result).toBe('fast');
  // });

  // it('MyPromise.race rejects if fastest rejects', async () => {
  //   const p1 = new MyPromise((_, rej) => setTimeout(() => rej('fail'), 10));
  //   const p2 = new MyPromise(res => setTimeout(() => res('ok'), 50));
  //   try {
  //     await MyPromise.race([p1, p2]);
  //   } catch (e) {
  //     expect(e).toBe('fail');
  //   }
  // });

  // it('MyPromise.allSettled returns all outcomes', async () => {
  //   const p1 = MyPromise.resolve(1);
  //   const p2 = MyPromise.reject('fail');
  //   const result = await MyPromise.allSettled([p1, p2]);
  //   expect(result).toEqual([
  //     { status: 'fulfilled', value: 1 },
  //     { status: 'rejected', reason: 'fail' },
  //   ]);
  // });

  // it('MyPromise.any resolves with first fulfilled', async () => {
  //   const p1 = MyPromise.reject('err1');
  //   const p2 = new MyPromise(res => setTimeout(() => res('ok'), 10));
  //   const result = await MyPromise.any([p1, p2]);
  //   expect(result).toBe('ok');
  // });

  // it('MyPromise.any rejects if all fail', async () => {
  //   const p1 = MyPromise.reject('err1');
  //   const p2 = MyPromise.reject('err2');
  //   try {
  //     await MyPromise.any([p1, p2]);
  //   } catch (e: any) {
  //     expect(e).toBeInstanceOf(AggregateError);
  //     expect(e.errors).toEqual(['err1', 'err2']);
  //   }
  // });
});
