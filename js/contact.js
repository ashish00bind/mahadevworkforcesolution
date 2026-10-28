/**
 * MAHADEV WORK FORCE SOLUTION — CONTACT FORM CONTROLLER
 * Pure Client-Side Validation, WhatsApp URL Generation & Mailto Integration
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var form = document.getElementById('quote-form-el');
  if (!form) return;

  var WHATSAPP_NUMBER = '918160841776';
  var OFFICIAL_EMAIL = 'mahadevworkforcesolution@gmail.com';

  var fullNameInput = document.getElementById('fullName');
  var phoneInput = document.getElementById('phone');
  var companyInput = document.getElementById('company');
  var emailInput = document.getElementById('email');
  var serviceSelect = document.getElementById('service');
  var workforceSizeInput = document.getElementById('workforceSize');
  var requirementDetailsInput = document.getElementById('requirementDetails');
  var honeypotInput = document.getElementById('website_hp');

  var statusSuccessBox = document.getElementById('status-success-box');
  var statusErrorBox = document.getElementById('status-error-box');
  var submitBtn = document.getElementById('submit-btn');
  var btnText = document.getElementById('btn-text');
  var btnSpinner = document.getElementById('btn-spinner');

  // 1. Preselect Query Parameters from URL
  var params = new URLSearchParams(window.location.search);
  var preselectedService = params.get('service');
  var preselectedIndustry = params.get('industry');

  if (preselectedService && serviceSelect) {
    for (var i = 0; i < serviceSelect.options.length; i++) {
      if (serviceSelect.options[i].value.toLowerCase() === preselectedService.toLowerCase()) {
        serviceSelect.selectedIndex = i;
        break;
      }
    }
  }

  if (preselectedIndustry && requirementDetailsInput && !requirementDetailsInput.value) {
    requirementDetailsInput.value = 'Enquiry for ' + preselectedIndustry + ' sector workforce.';
  }

  // 2. Validation Utilities
  function normalizePhone(rawPhone) {
    if (!rawPhone || typeof rawPhone !== 'string') return { isValid: false, normalized: '' };
    var trimmed = rawPhone.trim();
    var hasPlus = trimmed.startsWith('+');
    var digitsOnly = trimmed.replace(/\D/g, '');

    var clean10 = digitsOnly;
    if (hasPlus && digitsOnly.startsWith('91') && digitsOnly.length === 12) {
      clean10 = digitsOnly.slice(2);
    } else if (!hasPlus && digitsOnly.startsWith('91') && digitsOnly.length === 12) {
      clean10 = digitsOnly.slice(2);
    } else if (digitsOnly.startsWith('0') && digitsOnly.length === 11) {
      clean10 = digitsOnly.slice(1);
    }

    var isIndianMobile = /^[6-9]\d{9}$/.test(clean10);
    if (isIndianMobile) {
      return {
        isValid: true,
        normalized: '+91 ' + clean10.slice(0, 5) + ' ' + clean10.slice(5),
      };
    }

    if (digitsOnly.length >= 10 && digitsOnly.length <= 15) {
      return {
        isValid: true,
        normalized: (hasPlus ? '+' : '') + digitsOnly,
      };
    }

    return { isValid: false, normalized: trimmed };
  }

  function isValidEmail(emailStr) {
    if (!emailStr) return true; // Email is optional
    var trimmed = emailStr.trim();
    if (trimmed.length > 150) return false;
    var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    return emailRegex.test(trimmed);
  }

  function setFieldError(fieldId, errorMsg) {
    var input = document.getElementById(fieldId);
    var errEl = document.getElementById(fieldId + '-error');
    if (input) input.classList.add('has-error');
    if (errEl) {
      errEl.textContent = errorMsg;
      errEl.classList.add('visible');
    }
  }

  function clearFieldError(fieldId) {
    var input = document.getElementById(fieldId);
    var errEl = document.getElementById(fieldId + '-error');
    if (input) input.classList.remove('has-error');
    if (errEl) {
      errEl.textContent = '';
      errEl.classList.remove('visible');
    }
  }

  // 3. Blur Validation Listeners
  if (fullNameInput) {
    fullNameInput.addEventListener('blur', function () {
      var val = fullNameInput.value.trim();
      if (!val) {
        setFieldError('fullName', 'Please enter your full name.');
      } else if (val.length < 2) {
        setFieldError('fullName', 'Full name must be at least 2 characters.');
      } else {
        clearFieldError('fullName');
      }
    });
    fullNameInput.addEventListener('input', function () {
      clearFieldError('fullName');
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener('blur', function () {
      var val = phoneInput.value.trim();
      if (!val) {
        setFieldError('phone', 'Please enter your phone number.');
      } else {
        var phoneVal = normalizePhone(val);
        if (!phoneVal.isValid) {
          setFieldError('phone', 'Please enter a valid 10-digit mobile number.');
        } else {
          clearFieldError('phone');
        }
      }
    });
    phoneInput.addEventListener('input', function () {
      clearFieldError('phone');
    });
  }

  if (emailInput) {
    emailInput.addEventListener('blur', function () {
      var val = emailInput.value.trim();
      if (val && !isValidEmail(val)) {
        setFieldError('email', 'Please enter a valid email address.');
      } else {
        clearFieldError('email');
      }
    });
    emailInput.addEventListener('input', function () {
      clearFieldError('email');
    });
  }

  if (requirementDetailsInput) {
    requirementDetailsInput.addEventListener('blur', function () {
      var val = requirementDetailsInput.value.trim();
      if (!val) {
        setFieldError('requirementDetails', 'Please describe your plant requirement and location.');
      } else if (val.length < 10) {
        setFieldError('requirementDetails', 'Please provide more details (at least 10 characters).');
      } else {
        clearFieldError('requirementDetails');
      }
    });
    requirementDetailsInput.addEventListener('input', function () {
      clearFieldError('requirementDetails');
    });
  }

  // 4. Form Submission Handler
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Check honeypot
    if (honeypotInput && honeypotInput.value.trim() !== '') {
      console.warn('Spam bot detected via honeypot.');
      return;
    }

    var isValid = true;

    // Validate Full Name
    var nameVal = fullNameInput ? fullNameInput.value.trim() : '';
    if (!nameVal || nameVal.length < 2) {
      setFieldError('fullName', 'Please enter your full name (at least 2 characters).');
      isValid = false;
    } else {
      clearFieldError('fullName');
    }

    // Validate Phone
    var phoneVal = phoneInput ? phoneInput.value.trim() : '';
    var phoneNormalized = normalizePhone(phoneVal);
    if (!phoneVal || !phoneNormalized.isValid) {
      setFieldError('phone', 'Please enter a valid 10-digit mobile number.');
      isValid = false;
    } else {
      clearFieldError('phone');
    }

    // Validate Email
    var emailVal = emailInput ? emailInput.value.trim() : '';
    if (emailVal && !isValidEmail(emailVal)) {
      setFieldError('email', 'Please enter a valid email address.');
      isValid = false;
    } else {
      clearFieldError('email');
    }

    // Validate Requirement Details
    var reqVal = requirementDetailsInput ? requirementDetailsInput.value.trim() : '';
    if (!reqVal || reqVal.length < 10) {
      setFieldError('requirementDetails', 'Please describe your requirement (at least 10 characters).');
      isValid = false;
    } else {
      clearFieldError('requirementDetails');
    }

    if (!isValid) {
      if (statusErrorBox) {
        statusErrorBox.classList.add('visible');
        var errText = statusErrorBox.querySelector('.error-msg-text');
        if (errText) errText.textContent = 'Please correct the highlighted errors before submitting.';
      }
      return;
    }

    // Hide error box
    if (statusErrorBox) statusErrorBox.classList.remove('visible');

    // Show loading state
    if (submitBtn) submitBtn.disabled = true;
    if (btnText) btnText.textContent = 'Preparing Enquiry Details...';
    if (btnSpinner) btnSpinner.style.display = 'inline-block';

    var companyVal = companyInput ? companyInput.value.trim() : '';
    var serviceVal = serviceSelect ? serviceSelect.value : 'Contract Manpower Supply';
    var workforceSizeVal = workforceSizeInput ? workforceSizeInput.value.trim() : '';

    // Prepare structured message for WhatsApp and Mailto
    var messageBody =
      'Hello Mahadev Work Force Solution,\n\n' +
      'I would like to request a quotation for industrial workforce services:\n\n' +
      '*Client Name:* ' + nameVal + '\n' +
      '*Phone:* ' + phoneNormalized.normalized + '\n' +
      (companyVal ? '*Company/Plant:* ' + companyVal + '\n' : '') +
      (emailVal ? '*Email:* ' + emailVal + '\n' : '') +
      '*Required Service:* ' + serviceVal + '\n' +
      (workforceSizeVal ? '*Estimated Headcount/Shifts:* ' + workforceSizeVal + '\n' : '') +
      '*Requirement Details:*\n' + reqVal;

    var whatsappUrl = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(messageBody);

    var mailtoSubject = 'Manpower Quotation Request: ' + serviceVal + ' - ' + nameVal;
    var mailtoBody =
      'Mahadev Work Force Solution Operations Desk,\n\n' +
      'Here are the details for our manpower quotation request:\n\n' +
      'Client Name: ' + nameVal + '\n' +
      'Phone: ' + phoneNormalized.normalized + '\n' +
      (companyVal ? 'Company / Plant: ' + companyVal + '\n' : '') +
      (emailVal ? 'Email: ' + emailVal + '\n' : '') +
      'Required Service: ' + serviceVal + '\n' +
      (workforceSizeVal ? 'Estimated Headcount / Shifts: ' + workforceSizeVal + '\n' : '') +
      'Requirement Details & Location:\n' + reqVal + '\n\n' +
      'Submitted via website quotation desk.';

    var mailtoUrl = 'mailto:' + OFFICIAL_EMAIL + '?subject=' + encodeURIComponent(mailtoSubject) + '&body=' + encodeURIComponent(mailtoBody);

    setTimeout(function () {
      if (submitBtn) submitBtn.disabled = false;
      if (btnText) btnText.textContent = 'Submit Manpower Quotation Request';
      if (btnSpinner) btnSpinner.style.display = 'none';

      // Show Success Modal / Action Options
      if (statusSuccessBox) {
        statusSuccessBox.classList.add('visible');
        var clientNameDisplay = statusSuccessBox.querySelector('.success-client-name');
        if (clientNameDisplay) clientNameDisplay.textContent = nameVal;
        var serviceDisplay = statusSuccessBox.querySelector('.success-service-name');
        if (serviceDisplay) serviceDisplay.textContent = serviceVal;

        var waBtn = document.getElementById('action-whatsapp-send');
        if (waBtn) waBtn.setAttribute('href', whatsappUrl);

        var mailBtn = document.getElementById('action-email-send');
        if (mailBtn) mailBtn.setAttribute('href', mailtoUrl);

        // Scroll to success box smoothly
        statusSuccessBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 400);
  });

  // Reset Button Handler
  var resetBtn = document.getElementById('reset-form-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      form.reset();
      clearFieldError('fullName');
      clearFieldError('phone');
      clearFieldError('email');
      clearFieldError('requirementDetails');
      if (statusSuccessBox) statusSuccessBox.classList.remove('visible');
      if (statusErrorBox) statusErrorBox.classList.remove('visible');
    });
  }
});
