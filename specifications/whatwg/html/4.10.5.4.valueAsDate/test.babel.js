(function (cb) {
  try {
    var inputA = document.createElement('input');
    inputA.type = "date";
    inputA.valueAsDate = new Date();
  } catch (_) {
    cb(false);
    return;
  }

  var inputB = document.createElement('input');
  inputB.type = "date";
  inputB.value = "2006-01-02";
  var valueAsDate = inputB.valueAsDate;
  cb("undefined" !== typeof valueAsDate);
})(callback);