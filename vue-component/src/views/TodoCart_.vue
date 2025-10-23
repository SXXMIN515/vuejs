<template>
  <h2>🛒 장바구니</h2>

  <div style="margin-bottom: 1rem">
    <label>상품코드: <input type="text" v-model="code" /></label><br />
    <label>상품명: <input type="text" v-model="name" /></label><br />
    <label>가격: <input type="number" v-model="price" /></label><br />
    <label>수량: <input type="number" v-model="qty" /></label><br />
    <button @click="addItem">상품 추가</button>
  </div>

  <table border="1" cellspacing="0" cellpadding="5">
    <thead>
      <tr style="background-color: #eee">
        <th>상품코드</th>
        <th>상품명</th>
        <th>가격</th>
        <th>수량</th>
        <th>합계</th>
        <th>삭제</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="[pcode, pInfo] in productInfoRef" v-bind:key="pInfo.code">
        <td>{{ pInfo.code }}</td>
        <td>{{ pInfo.name }}</td>
        <td>{{ pInfo.price.toLocaleString() }}원</td>
        <td>
          <input
            type="number"
            min="1"
            style="width: 60px"
            v-model.number="pInfo.qty"
            v-on:change="calPrice(pcode, pInfo)"
          />
        </td>
        <td>{{ (pInfo.price * pInfo.qty).toLocaleString() }}원</td>
        <!-- <td><button v-on:click.stop="deleteProduct(pcode)" class="close">❌</button></td> -->
        <td><button @click="deleteProduct(pcode)">❌</button></td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th colspan="4" style="text-align: right">총합계:</th>
        <th colspan="2">{{ totalMount }}</th>
      </tr>
    </tfoot>
  </table>
</template>

<script setup>
import { reactive, ref, computed } from "vue";

// 변수.
const code = ref("P004");
const name = ref("마우스패드");
const price = ref(5500);
const qty = ref(1);

// 장바구니 배열 (reactive로 감싸기)
const productInfo = new Map();
productInfo.set("P001", {
  code: "P001",
  name: "무선마우스",
  price: 15000,
  qty: 1,
});
productInfo.set("P002", {
  code: "P002",
  name: "무선키보드",
  price: 20000,
  qty: 1,
});
productInfo.set("P003", {
  code: "P003",
  name: "유무선마우스",
  price: 25000,
  qty: 1,
});

const productInfoRef = reactive(productInfo);

// 추가.
const addItem = () => {
  productInfoRef.set(code.value, {
    code: code.value,
    name: name.value,
    price: price.value,
    qty: qty.value,
  });
};
// 삭제.
const deleteProduct = (no) => {
  productInfoRef.delete(no);
};

// 상품 합 계산.
const calPrice = (code, pInfo) => {
  productInfoRef.set(code, { ...pInfo });
};

// 총합계 계산.
let totalMount = computed(() => {
  let amt = 0;
  for (let cart of productInfoRef.values()) {
    amt += cart.price * cart.qty;
  }
  return amt;
});
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
input[type="text"],
input[type="number"] {
  margin: 3px 0;
}
button {
  margin-top: 5px;
}
</style>
