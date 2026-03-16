// 유틸리티 함수 (정렬, 통계 계산 등)

// 카테고리 필터링
export function filterByCategory(list, category) {
  if (category === "카테고리 선택") {
    return list;
  }

  return list.filter(function (t) {
    return t.category === category;
  });
}

//금액순
export function filterByAmount(list, order) {
  if (order === "ascending") {
    return [...list].sort((a, b) => a.amount - b.amount);
  }

  if (order === "descending") {
    return [...list].sort((a, b) => b.amount - a.amount);
  }

  return list;
}

//날짜순
export function filterByDate(list, order) {
  if (order === "upToDate") {
    return [...list].sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  if (order === "downToDate") {
    return [...list].sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  return list;
}
