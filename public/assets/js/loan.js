document.getElementById("approxPay").style.visibility="hidden";


function calculate() {

  let amount = document.getElementById("amount");
  let apr = document.getElementById("apr");
  let years = document.getElementById("years");
  let payment = document.getElementById("payment");
  let total = document.getElementById("total"); 
  let totalinterest = document.getElementById("totalinterest");
  let principal = parseFloat(amount.value);
  let interest = parseFloat(apr.value) / 100 / 12;
  let payments = parseFloat(years.value) * 12;
  let x = Math.pow(1 + interest, payments);
  let monthly = (principal * x * interest) / (x - 1);
 
  document.getElementById("approxPay").style.visibility="visible";


  if (isFinite(monthly)) {
    payment.innerHTML = monthly.toFixed(2);
    total.innerHTML = (monthly * payments).toFixed(2);
    totalinterest.innerHTML = ((monthly * payments) - principal).toFixed(2);
    save(amount.value, apr.value, years.value,);
    try {
      getLenders(amount.value, apr.value, years.value);
    }
    catch (e) { }
    chart(principal, interest, monthly, payments);
  }
  else {
    payment.innerHTML = "";
    total.innerHTML = ""
    totalinterest.innerHTML = "";
    chart();
  }
}


function save(amount, apr, years) {
  if (window.localStorage) {
    localStorage.loan_amount = amount;
    localStorage.loan_apr = apr;
    localStorage.loan_years = years;
  }
}


window.onload = function () {
  if (window.localStorage && localStorage.loan_amount) {
    document.getElementById("amount").value = localStorage.loan_amount;
    document.getElementById("apr").value = localStorage.loan_apr;
    document.getElementById("years").value = localStorage.loan_years;

  }
};
