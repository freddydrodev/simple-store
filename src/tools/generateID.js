function generateID(length = 5, option) {
  let text = "";
  let possible = "";

  switch (option) {
    case "upper":
      possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      break;
    case "upper_num":
      possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      break;
    case "lower":
      possible = "abcdefghijklmnopqrstuvwxyz";
      break;
    case "lower_num":
      possible = "abcdefghijklmnopqrstuvwxyz0123456789";
      break;
    case "letter":
      possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      break;
    case "number":
      possible = "0123456789";
      break;
    default:
      possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      break;
  }

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export default generateID;
