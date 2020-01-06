export default function(value) {
  let val = "";
  switch (true) {
    case value > 1000 && value < 10000:
      val = Math.floor(value / 1000) + "千";
      break;
    case value > 10000 && value < 10000000:
      val = Math.floor(value / 10000) + "万";
      break;
    case value > 10000000:
      val = Math.floor(value / 10000000) + "千万";
      break;
    default:
      val = value;
      break;
  }
  return val + "件";
}
