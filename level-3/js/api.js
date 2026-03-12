const BASIC_URL = "http://localhost:4000/expenses";

//전체 지출 조회
export async function totalList() {
  const response = await fetch(`${BASIC_URL}`, {
    method: "GET",
  });
  const list = await response.json();
  console.log(list);
}
