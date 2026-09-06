document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('regForm');
  if (!form) return;

  var card = document.getElementById('regCard');
  var successPanel = document.getElementById('successPanel');
  var rollEcho = document.getElementById('rollEcho');

  var fields = {
    name: {
      el: document.getElementById('fullName'),
      wrap: document.getElementById('fieldName'),
      msg: document.getElementById('errName'),
    },
    roll: {
      el: document.getElementById('rollNumber'),
      wrap: document.getElementById('fieldRoll'),
      msg: document.getElementById('errRoll'),
    },
    email: {
      el: document.getElementById('email'),
      wrap: document.getElementById('fieldEmail'),
      msg: document.getElementById('errEmail'),
    },
    dept: {
      el: document.getElementById('department'),
      wrap: document.getElementById('fieldDept'),
      msg: document.getElementById('errDept'),
    },
  };

  var ROLL_LENGTH = 9;
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setError(field, message) {
    field.wrap.classList.add('has-error');
    field.msg.textContent = message;
  }

  function clearError(field) {
    field.wrap.classList.remove('has-error');
    field.msg.textContent = '';
  }

  function validateField(key) {
    var field = fields[key];
    var value = field.el.value.trim();

    if (!value) {
      setError(field, 'This field can\u2019t be empty.');
      return false;
    }

    if (key === 'roll') {
      var compact = value.replace(/\s+/g, '');
      if (compact.length !== ROLL_LENGTH) {
        setError(field, 'Roll number must be exactly ' + ROLL_LENGTH + ' characters (e.g. 26CS10001). Yours is ' + compact.length + '.');
        return false;
      }
    }

    if (key === 'email' && !EMAIL_RE.test(value)) {
      setError(field, 'Enter a valid email address.');
      return false;
    }

    clearError(field);
    return true;
  }

  // Validate as the person leaves a field
  Object.keys(fields).forEach(function (key) {
    var el = fields[key].el;
    el.addEventListener('blur', function () { validateField(key); });
    el.addEventListener('input', function () {
      if (fields[key].wrap.classList.contains('has-error')) validateField(key);
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var results = Object.keys(fields).map(validateField);
    var allValid = results.every(Boolean);

    if (!allValid) {
      var firstBad = Object.keys(fields).find(function (key) {
        return fields[key].wrap.classList.contains('has-error');
      });
      if (firstBad) fields[firstBad].el.focus();
      return;
    }

    var rollValue = fields.roll.el.value.trim();
    rollEcho.textContent = 'Roll number on file: ' + rollValue;

    card.querySelector('form').style.display = 'none';
    card.querySelector('.reg-card-head').style.display = 'none';
    successPanel.classList.add('show');
  });
});
