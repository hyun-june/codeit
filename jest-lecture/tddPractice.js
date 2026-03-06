const calculatePrice = ({ price, userType = "normal", coupon = null }) => {
  let result;
  const sale =
    price >= 200000 ? 20 : price >= 100000 ? 10 : price >= 50000 ? 5 : 0;

  const userSale = {
    normal: 0,
    silver: 2,
    gold: 5,
    vip: 10,
  };

  const defaultPrice = price * (1 - sale / 100);
  const minPrice = price * 0.5;

  result = defaultPrice * (1 - userSale[userType] / 100);

  if (coupon) {
    if (coupon.type === "fixed") {
      result = result - coupon.value;
    }
    if (coupon.type === "per") {
      result = result * (1 - coupon.value / 100);
    }
  }
  if (result < minPrice) {
    result = minPrice;
  }

  return result;
};

module.exports = { calculatePrice };
