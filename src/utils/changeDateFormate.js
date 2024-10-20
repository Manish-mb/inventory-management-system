export const getTodayDate = () => {
  let today = new Date().toLocaleDateString();
  let parts = today.split("/");
  let originalDate = new Date(parts[2], parts[0] - 1, parts[1]);

  let year = originalDate.getFullYear();
  let month = (originalDate.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 to month because January is 0
  let day = originalDate.getDate().toString().padStart(2, "0");

  let newDateString = year + "-" + month + "-" + day;
  return newDateString;
};
