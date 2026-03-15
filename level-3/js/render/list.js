import {
  totalList,
  deleteSpending,
  addSpending,
  crystalSpending,
} from "../api.js";

const spendingList = document.querySelector(".spending-list");
const addSection = document.querySelector(".add-section");
const categorySelect = document.querySelector("#add_select");
const desInput = document.querySelector("#des_input");
const amountInput = document.querySelector("#amount_input");
const filterSelect = document.querySelector("#filter_select");
const amountSort = document.querySelector("#amount_select");
const datesSort = document.querySelector("#date_select");

export function listRendering(list) {
  spendingList.innerHTML = "";
  list.forEach(function (t) {
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
    let categorySelect;
    let descriptionInput;
    let amountInput;
    btnCrystal.addEventListener("click", function () {
      if (btnCrystal.textContent === "수정") {
        btnCrystal.textContent = "저장";

        //카테고리 수정
        categorySelect = document.createElement("select");
        const categories = ["생활", "이동", "소비", "개인"];

        categories.forEach(function (c) {
          const option = document.createElement("option");
          option.value = c;
          option.textContent = c;

          categorySelect.appendChild(option);
        });

        categorySelect.value = category.textContent;
        category.replaceWith(categorySelect);

        //설명 수정
        descriptionInput = document.createElement("input");
        descriptionInput.value = description.textContent;
        description.replaceWith(descriptionInput);

        //가격 수정
        amountInput = document.createElement("input");
        amountInput.value = amount.textContent;
        amount.replaceWith(amountInput);
      } else {
        crystalSpending(
          t.id,
          categorySelect.value,
          descriptionInput.value,
          amountInput.value,
        );
      }
    });

    const btnDelete = document.createElement("button");
    btnDelete.textContent = "삭제";
    btnDelete.addEventListener("click", function () {
      deleteList(t.id);
    });
    button.appendChild(btnCrystal);
    button.appendChild(btnDelete);

    listItem.appendChild(category);
    listItem.appendChild(description);
    listItem.appendChild(amount);
    listItem.appendChild(button);

    spendingList.appendChild(listItem);
  });
}

export async function getList() {
  const list = await totalList();
  listRendering(list);
}

export async function deleteList(id) {
  deleteSpending(id);
}

export async function addList(category, description, amount) {
  addSpending(category, description, Number(amount));
}

//추가 이벤트
addSection.addEventListener("submit", function (e) {
  e.preventDefault();
  const category = categorySelect.value;
  const description = desInput.value.trim();
  const amount = amountInput.value.trim();

  addList(category, description, amount);

  desInput.value = "";
  amountInput.value = "";
});

// 카테고리 필터링
filterSelect.addEventListener("change", async function () {
  const list = await totalList();

  const filterList = list.filter(function (t) {
    return t.category === filterSelect.value;
  });
  listRendering(filterList);
});

//금액순 정렬
amountSort.addEventListener("change", async function () {
  const list = await totalList();
  if (amountSort.value === "ascending") {
    const sortList = [...list].sort((a, b) => a.amount - b.amount);
    listRendering(sortList);
  }

  if (amountSort.value === "descending") {
    const sortList = [...list].sort((a, b) => b.amount - a.amount);
    listRendering(sortList);
  }
});

//날짜순 정렬
datesSort.addEventListener("change", async function () {
  const list = await totalList();
  if (datesSort.value === "upToDate") {
    const sortList = [...list].sort(
      (a, b) => new Date(a.date) - new Date(b.date),
    );
    listRendering(sortList);
  }

  if (datesSort.value === "downToDate") {
    const sortList = [...list].sort(
      (a, b) => new Date(b.date) - new Date(a.date),
    );
    listRendering(sortList);
  }
});

getList();
