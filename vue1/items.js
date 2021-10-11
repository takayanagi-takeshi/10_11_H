// 10月8日の続き
var items = [
  {
    name: '鉛筆',
    price: 300,
    quantity: 1
  },
  {
    name: 'ノート',
    price: 400,
    quantity: 0
  },
  {
    name: '消しゴム',
    price: 500,
    quantity: 2
  }
]

var vm = new Vue({
  el: '#app',
  data: { // dataプロパティ
    items: items
  },
  filters: { //この節で追加したフィルタの定義
    numberWithDelimiter: function (value) {
      if (!value) {
        return '0'
      }
      return value.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,')
      // 3桁でコンマをつける
    }
  },
  computed: {
    totalPrice: function () {
      // this経由でインスタンス内のデータにアクセス
      return this.items.reduce(function(sum, item) {
        return sum + (item.price * item.quantity);
      }, 0);
    },
    // 算出プロパティに依存した算出プロパティも定義できる
    totalPriceWithTax: function () {
      return Math.floor(this.totalPrice * 1.08);
    },
    canBuy: function () {
      return this.totalPrice >= 1000 // 1000円以上から購入可能になる
    },
    errorMessageClass: function () {
      return {
        error: !this.canBuy
      }
    },
    errorMessageStyle: function () {
      return {
        border: this.canBuy ? '' : '1px solid red',
        color: this.canBuy ? '' : 'red'
      }
    }
  }
});
// JSiddleでコンソールからvmにアクセスするための対応
window.vm = vm;