import { totalList } from "../api.js";

const statsList = document.querySelector(".stats-list");

export function statsendering(list) {
  //총 지출 합계
  const totalSpending = document.createElement("li");
  totalSpending.className = "stats-spending";
  const totalSpendingTitle = document.createElement("p");
  totalSpendingTitle.textContent = "총 지출 합계";
  totalSpendingTitle.className = "stats-subtitle";

  const totalSpendingValue = document.createElement("P");
  const totalResult = list.reduce(function (sum, item) {
    return sum + item.amount;
  }, 0);
  totalSpendingValue.textContent = `${totalResult}원`;

  totalSpending.appendChild(totalSpendingTitle);
  totalSpending.appendChild(totalSpendingValue);

  //카테고리별 합계
  const categorySpending = document.createElement("li");
  categorySpending.className = "stats-spending";
  const categorySpendingTitle = document.createElement("p");
  categorySpendingTitle.textContent = "카테고리별 합계";
  categorySpendingTitle.className = "stats-subtitle";

  const categoryArray = list.reduce(function (acc, item) {
    if (!acc[item.category]) {
      acc[item.category] = 0;
    }

    acc[item.category] += item.amount;

    return acc;
  }, {});

  categorySpending.appendChild(categorySpendingTitle);

  for (const category in categoryArray) {
    const item = document.createElement("p");
    item.textContent = `${category}:${categoryArray[category]}원`;
    categorySpending.appendChild(item);
  }

  //평균 지출
  const averageSpending = document.createElement("li");
  averageSpending.className = "stats-spending";
  const averageSpendingTitle = document.createElement("p");
  averageSpendingTitle.textContent = "평균 합계";
  averageSpendingTitle.className = "stats-subtitle";
  const averageSpendingValue = document.createElement("P");
  averageSpendingValue.textContent = `${totalResult / list.length}원`;
  averageSpending.appendChild(averageSpendingTitle);
  averageSpending.appendChild(averageSpendingValue);

  statsList.appendChild(totalSpending);
  statsList.appendChild(categorySpending);
  statsList.appendChild(averageSpending);
}

export async function Calculation() {
  const list = await totalList();
  statsendering(list);
}

Calculation();
