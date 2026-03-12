const BASIC_URL = "http://localhost:4000/expenses";
const NEXT_ID = 1;

//전체 지출 조회
export async function totalList() {
  const response = await fetch(`${BASIC_URL}`, {
    method: "GET",
  });
  const list = await response.json();
  console.log(list);
}

//지출 추가
export async function addSpending(category, description, amount) {
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
}
