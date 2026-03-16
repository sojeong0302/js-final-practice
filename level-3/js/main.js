// 앱 초기화 및 이벤트 처리
import { totalList } from "./api.js";
import { listRendering } from "./render/list.js";
import { filterByCategory, filterByAmount, filterByDate } from "./utils.js";

const filterSelect = document.querySelector("#filter_select");
const amountSort = document.querySelector("#amount_select");
const datesSort = document.querySelector("#date_select");

//카테고리 선택
filterSelect.addEventListener("change", async function () {
  const list = await totalList();
  const filterList = filterByCategory(list, filterSelect.value);
  listRendering(filterList);
});

//금액순 정렬
amountSort.addEventListener("change", async function () {
  const list = await totalList();
  const filterList = filterByAmount(list, amountSort.value);
  listRendering(filterList);
});

//날짜순 정렬
datesSort.addEventListener("change", async function () {
  const list = await totalList();
  const filterList = filterByDate(list, datesSort.value);
  listRendering(filterList);
});
