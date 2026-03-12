const BASIC_URL = "http://localhost:4000/expenses";
const NEXT_ID = 1;

//전체 지출 조회
export async function totalList() {
  try {
    const response = await fetch(`${BASIC_URL}`, {
      method: "GET",
    });
    const list = await response.json();
    return list;
  } catch (error) {
    console.log(error);
  }
}

//지출 추가
export async function addSpending(category, description, amount) {
  try {
    await fetch(`${BASIC_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: json.stringify({
        id: `${NEXT_ID++}`,
        date: new Date(),
        category: `${category}`,
        description: `${description}`,
        amount: `${amount}`,
      }),
    });
    totalList();
  } catch (error) {
    console.log(error);
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
      body: json.stringify({
        category: `${category}`,
        description: `${description}`,
        amount: `${amount}`,
      }),
    });
    totalList();
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
  }
}
