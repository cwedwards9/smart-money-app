function calculate() {
    var amount = document.getElementById("amount");
    var apr = document.getElementById("apr");
    var years = document.getElementById("years");
    var zipcode = document.getElementById("zipcode");
    var payment = document.getElementById("payment");
    var total = document.getElementById("total");
    var totalinterest = document.getElementById("totalinterest");
  var principal = parseFloat(amount.value);
  var interest = parseFloat(apr.value) / 100 / 12;
  var payments = parseFloat(years.value) * 12;
  var x = Math.pow(1 + interest, payments);
  var monthly = (principal*x*interest)/(x-1);
  if (isFinite(monthly)){
    payment.innerHTML = monthly.toFixed(2);
    total.innerHTML = (monthly * payments).toFixed(2);
    totalinterest.innerHTML = ((monthly*payments)-principal).toFixed(2);
   save(amount.value, apr.value, years.value, zipcode.value);
   try {
   getLenders(amount.value, apr.value, years.value, zipcode.value);
   }
    catch(e) { }
   chart(principal, interest, monthly, payments);
   }
   else {
   payment.innerHTML = "";
   total.innerHTML = ""
   totalinterest.innerHTML = "";
   chart();
   }
  }
  function save(amount, apr, years, zipcode) {
   if (window.localStorage) {
   localStorage.loan_amount = amount;
   localStorage.loan_apr = apr;
   localStorage.loan_years = years;
   localStorage.loan_zipcode = zipcode;
   }
  }
  window.onload = function() {
   if (window.localStorage && localStorage.loan_amount) {
   document.getElementById("amount").value = localStorage.loan_amount;
   document.getElementById("apr").value = localStorage.loan_apr;
   document.getElementById("years").value = localStorage.loan_years;
   document.getElementById("zipcode").value = localStorage.loan_zipcode;
   }
  };
  function getLenders(amount, apr, years, zipcode) {
   if (!window.XMLHttpRequest) return;
   var ad = document.getElementById("lenders");
   if (!ad) return;
   var url = "getLenders.php" +
   "?amt=" + encodeURIComponent(amount) +
   "&apr=" + encodeURIComponent(apr) +
   "&yrs=" + encodeURIComponent(years) +
   "&zip=" + encodeURIComponent(zipcode);
   var req = new XMLHttpRequest();
   req.open("GET", url);
   req.send(null);
   req.onreadystatechange = function() {
   if (req.readyState == 4 && req.status == 200) {
   var response = req.responseText;
   var lenders = JSON.parse(response);
   var list = "";
   for(var i = 0; i < lenders.length; i++) {
   list += "<li><a href='" + lenders[i].url + "'>" +
   lenders[i].name + "</a>";
   }
   ad.innerHTML = "<ul>" + list + "</ul>";
   }
   }
  }
