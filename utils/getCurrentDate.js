function getCurrentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear() - 1911;
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // 補零到兩位數
  const day = currentDate.getDate().toString().padStart(2, "0"); // 補零到兩位數
  return `${year}.${month}.${day}`;
}
module.exports = getCurrentDate;
