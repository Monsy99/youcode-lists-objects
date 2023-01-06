module.exports = filterPremium = (carBrands) => {
  const premiumBrands = ["mercedes", "audi", "bmw"];
  return carBrands.filter((brand) =>
    premiumBrands.includes(brand.toLowerCase())
  );
};
