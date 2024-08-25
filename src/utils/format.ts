/*
    Hàm thực hiện định dạng kiểu tiền khi người dùng nhập ngoài màn hình (100.111.222)
*/
export const formatCurrency = function (number) {
  const n = number.split('').reverse().join('');
  const n2 = n.replace(/\d\d\d(?!$)/g, '$&,');
  return n2.split('').reverse().join('');
};

/*
Chuyển cộng chuỗi sang kiểu truyền parameter
*/
if (!String.prototype.format) {
  String.prototype.format = function () {
    const args = arguments;
    return this.replace(/{(\d+)}/g, (match, number) =>
      typeof args[number] !== 'undefined' ? args[number] : match,
    );
  };
}

/*
Thực hiện định dạng kiểu money format 100.111.222
*/
Number.prototype.formatMoney = function () {
  return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

String.prototype.formatMoney = function () {
  return this.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

String.prototype.spaceTo_ = function () {
  return this.toString().replace(/ /g, '_');
};

String.prototype.moneyToInt = function () {
  return parseInt(this.replace(/\,/gm, '').replace(/[^0-9,]/gm, '')) || 0;
};

/*
Thực hiện định dạng dữ liệu kiểu thời gian theo định dạng dd/MM/yyyy
*/
Date.prototype.formatddMMyyyy = function () {
  let day = `${this.getDate()}`;
  if (day.length == 1) {
    day = `0${day}`;
  }
  let month = `${this.getMonth() + 1}`;
  if (month.length == 1) {
    month = `0${month}`;
  }
  const year = this.getFullYear();
  return `${day}/${month}/${year}`;
};

String.prototype.formatDate = function () {
  const date = new Date(this);
  return date.formatddMMyyyy();
};
