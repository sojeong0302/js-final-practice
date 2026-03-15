import { showMessage } from "./render/ui.js";

const BASIC_URL = "http://localhost:4000/expenses";

//전체 지출 조회
export async function totalList() {
  try {
    const response = await fetch(`${BASIC_URL}`, {
      method: "GET",
    });
    const list = await response.json();
    showMessage("success", "성공!");
    return list;
  } catch (error) {
    showMessage("error", "실패!");
  }
}

//지출 추가
export async function addSpending(category, description, amount) {
  try {
    let newSpending = {
      date: new Date(),
      category: `${category}`,
      description: `${description}`,
      amount: Number(`${amount}`),
    };
    console.log(newSpending);
    await fetch(`${BASIC_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSpending),
    });
    totalList();
    showMessage("success", "성공!");
  } catch (error) {
    showMessage("error", "실패!");
  }
}

//지출 수정
export async function crystalSpending(id, category, description, amount) {
  try {
    await fetch(`${BASIC_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: `${category}`,
        description: `${description}`,
        amount: `${amount}`,
      }),
    });
    totalList();
    showMessage("success", "성공!");
  } catch (error) {
    showMessage("error", "실패!");
  }
}
//지출 삭제
export async function deleteSpending(id) {
  try {
    await fetch(`${BASIC_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    showMessage("success", "성공!");
  } catch (error) {
    showMessage("error", "실패!");
  }
}
