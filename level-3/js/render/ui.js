export function showMessage(type, text) {
  if (type === "success") {
    console.log(text);
  }

  if (type === "error") {
    console.log(text);
  }
}
