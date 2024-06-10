const formatMoney = (x = 0) => {
  return x.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
};

export default formatMoney;
