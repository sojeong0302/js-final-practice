import { totalList } from "../api.js";

const spendingList = document.querySelector(".spending-list");

export function rendering(totalList) {
  spendingList.innerHTML = "";
  totalList.forEach(function (t) {
    const listItem = document.createElement("li");
    listItem.className = "list-item";

    //카테고리
    const category = document.createElement("p");
    category.textContent = t.category;

    //설명
    const description = document.createElement("p");
    description.textContent = t.description;

    //비용
    const amount = document.createElement("p");
    amount.textContent = t.amount;

    //버튼
    const button = document.createElement("div");

    const btnCrystal = document.createElement("button");
    btnCrystal.textContent = "수정";

    const btnDelete = document.createElement("button");
    btnDelete.textContent = "삭제";

    listItem.appendChild(category);
    listItem.appendChild(description);
    listItem.appendChild(amount);
    listItem.appendChild(button);
    listItem.appendChild(btnCrystal);
    listItem.appendChild(btnDelete);

    spendingList.appendChild(listItem);
  });
}

export async function getList() {
  const list = await totalList();
  rendering(list);
}

getList();
