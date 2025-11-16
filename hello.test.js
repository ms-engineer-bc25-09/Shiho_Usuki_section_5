// hello.test.js
//式 1 + 2 が、 3 と等しいことを検証するテスト
import { expect, test } from "vitest"; //import 文によって vitest を指定

test("1と2の合計は3です", () => {  //test() 関数
  expect(1 + 2).toBe(3);    //expect() 関数, 引数に与えた値を検証.expect(<検査される値>).toBe(<期待する値>)
});

//test() 関数の補足
//第一引数には、このテストの説明を人間が読める形式で記述します
//第二引数には、テストの本体を記述します