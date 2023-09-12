const useCurrency = (price: number) => {
  const result = price.toLocaleString("it-IT", {
    style: "currency",
    currency: "EUR",
  });

  return result;
};

export default useCurrency;
