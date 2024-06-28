const renderDiscipline = (discipline) =>
  discipline === "CHEMICAL" ? "Chemical" : "Physical";

const calculateDiscountedPrice = (price, discountPercentage) => {
  const discountFactor = 1 - discountPercentage / 100;
  return price * discountFactor;
};

module.exports = {
  renderDiscipline,
  calculateDiscountedPrice,
};
