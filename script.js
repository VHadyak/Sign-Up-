// Client-side validation
// Created by Vlad Hadyak

const myForm = document.querySelector("form");

// Input variables
const passInput = document.querySelector("#password"); 
const confirmPassInput = document.querySelector("#confirm-pass"); 
const emailInput = document.querySelector("#email");
const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const phoneInput = document.querySelector("#phone-num");

// Error variables
const firstNameError = document.querySelector(".first-name-error");
const lastNameError = document.querySelector(".last-name-error");
const emailError = document.querySelector(".email-error");
const passError = document.querySelector(".pass-message");
const passMatchError = document.querySelector(".pass-match-error");

// All input error messages (except tel input)
const errorMessages = document.querySelectorAll(".error-style:not(.password-requirements span):not(.phone-error)");

// Password requirements variables
const minLength = document.querySelector(".min-length");
const oneUpperCase = document.querySelector(".one-upper-case");
const oneLowerCase = document.querySelector(".one-lower-case");
const oneSymbol = document.querySelector(".one-symbol");
const oneNum = document.querySelector(".one-num");

let isValid = false;                   // Status if all password requirements are met or not
let passwordValue = "";
let submitClicked = false;

const submitBtn = document.querySelector("button[type=submit]");

// Regex patterns for password requirements
const minLengthPattern = /^.{8,}$/;
const oneUpperCasePattern = /[A-Z]/;
const oneLowerCasePattern = /[a-z]/;
const oneSymbolPattern = /[@#$!%^&*]/;
const oneNumPattern = /\d/;

// Regex for email, first and last names
const emailRegexPattern = /[^@\s]+@[^@\s]+\.[^@\s]+/;
const firstLastNamePattern = /^(?=.{2,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i;

firstName.addEventListener("blur", () => {
  const firstNameValue = firstName.value;

  if (firstNameValue.length >= 1) {
    firstNameError.style.display = "none";
  } else {
    firstName.style.border = "1px solid #bab8b8";
    firstNameError.style.display = "none";
  };

  if (submitClicked) {
    if (firstLastNamePattern.test(firstNameValue)) {
      validHandler(firstName, firstNameError);
    } else {
      errorHandler(firstName, firstNameError);
    };
  } else {
    if (!firstLastNamePattern.test(firstNameValue)) {
      if (firstNameValue.length >= 1) {
        errorHandler(firstName, firstNameError);
      };
    };
  };
});

lastName.addEventListener("blur", () => {
  const lastNameValue = lastName.value;

  if (lastNameValue.length >= 1) {
    lastNameError.style.display = "none";
  } else {
    lastName.style.border = "1px solid #bab8b8";
    lastNameError.style.display = "none";
  };

  if (submitClicked) {
    if (firstLastNamePattern.test(lastNameValue)) {
      validHandler(lastName, lastNameError);
    } else {
      errorHandler(lastName, lastNameError);
    };
  } else {
    if (!firstLastNamePattern.test(lastNameValue)) {
      if (lastNameValue.length >= 1) {
        errorHandler(lastName, lastNameError);
      };
    };
  };
});

firstName.addEventListener("input", () => {
  const firstNameValue = firstName.value;

  if (submitClicked) {
    if (firstLastNamePattern.test(firstNameValue)) {
      validHandler(firstName, firstNameError);
    } else {
      errorHandler(firstName, firstNameError);
      if (firstNameValue.length === 1 && /^[A-Za-z]+$/.test(firstNameValue)) {
        firstNameError.textContent = "Must contain at least 2 letters";
      } else {
        firstNameError.textContent = "Name contains invalid characters";
      };
    };
  } else {
    if (firstNameValue.length < 1) {
      firstName.style.border = "1px solid blue";
      firstNameError.style.display = "none";
    } else {
      if (firstLastNamePattern.test(firstNameValue)) {
        validHandler(firstName, firstNameError);
      } else {
        errorHandler(firstName, firstNameError);
      };
    };

    if (firstNameValue.length === 1 && /^[A-Za-z]+$/.test(firstNameValue)) {
      firstNameError.textContent = "Must contain at least 2 letters";
    } else {
      firstNameError.textContent = "Name contains invalid characters";
    };
  };
});

lastName.addEventListener("input", () => {
  const lastNameValue = lastName.value;

  if (submitClicked) {
    if (firstLastNamePattern.test(lastNameValue)) {
      validHandler(lastName, lastNameError);
    } else {
      errorHandler(lastName, lastNameError);
      if (lastNameValue.length === 1 && /^[A-Za-z]+$/.test(lastNameValue)) {
        lastNameError.textContent = "Must contain at least 2 letters";
      } else {
        lastNameError.textContent = "Name contains invalid characters";
      };
    };
  } else {
    if (lastNameValue.length < 1) {
      lastName.style.border = "1px solid blue";
      lastNameError.style.display = "none";
    } else {
      if (firstLastNamePattern.test(lastNameValue)) {
        validHandler(lastName, lastNameError);
      } else {
        errorHandler(lastName, lastNameError);
      };
    };

    if (lastNameValue.length === 1 && /^[A-Za-z]+$/.test(lastNameValue)) {
      lastNameError.textContent = "Must contain least 2 letters";
    } else {
      lastNameError.textContent = "Name contains invalid characters";
    };
  };
});

firstName.addEventListener("focus", () => {
  const firstNameValue = firstName.value;

  if (submitClicked) {
    if (firstLastNamePattern.test(firstNameValue)) {
      validHandler(firstName, firstNameError);
    } else {
      errorHandler(firstName, firstNameError);
    };
  } else {
    if (firstNameValue.length < 1) {
      firstName.style.border = "1px solid blue";
    } else {
      if (firstLastNamePattern.test(firstNameValue)) {
        validHandler(firstName, firstNameError);
      } else {
        errorHandler(firstName, firstNameError);
      };
    };
  };
  firstNameError.classList.remove('shake');
});

lastName.addEventListener("focus", () => {
  const lastNameValue = lastName.value;

  if (submitClicked) {
    if (firstLastNamePattern.test(lastNameValue)) {
      validHandler(lastName, lastNameError);
    } else {
      errorHandler(lastName, lastNameError);
    };
  } else {
    if (lastNameValue.length < 1) {
      lastName.style.border = "1px solid blue";
    } else {
      if (firstLastNamePattern.test(lastNameValue)) {
        validHandler(lastName, lastNameError);
      } else {
        errorHandler(lastName, lastNameError);
      };
    };
  };
  lastNameError.classList.remove('shake');
});

emailInput.addEventListener("input", () => {
  const emailValue = emailInput.value;
  if (submitClicked) {
    if (emailRegexPattern.test(emailValue)) {
      validHandler(emailInput, emailError);
    } else {
      if (emailValue.length >= 1) {
        errorHandler(emailInput, emailError);
      } else {
        emailInput.style.border = "1px solid red";
      };
    };
  };
});

emailInput.addEventListener("focus", () => {
  if (submitClicked) {
    emailInput.style.boxShadow = "none";
  };
  emailError.classList.remove('shake');
});

// Allow only digit numbers to be typed
phoneInput.addEventListener("keydown", (e) => {
  const key = e.key;
  const letterPattern = /^[a-zA-Z]$/;

  if (letterPattern.test(key)) {
    e.preventDefault();                // Prevents from typing it
  };
});

// Use automatic hyphens for phone format xxx-xxx-xxxx
phoneInput.addEventListener("input", () => {
  let telValue = phoneInput.value.replace(/\D/g, "");         // Matches any non digits in order to remove them
  let formattedValue = "";

  if (telValue.length > 0) {
    formattedValue = telValue.substring(0, 3);

    if (telValue.length > 3) {
      formattedValue += "-" + telValue.substring(3, 6);

      if (telValue.length > 6) {
        formattedValue += "-" + telValue.substring(6, 10);
      };
    };
  };
  phoneInput.value = formattedValue;
});

// Store a clean numeric value of phone number, without hyphens (when submitting a form)
function removeHyphens() {
  const initialInput = phoneInput.value;
  const numericValue = initialInput.replace(/-/g, "");
  phoneInput.value = numericValue;
};

// Out of focus state (password input)
passInput.addEventListener("blur", () => {
  passwordValue = passInput.value;

  if (passwordValue.length < 1) {
    passInput.style.border = "1px solid #bab8b8"; 
    if (!submitClicked) {
      resetLabelColors();
      minLength.classList.remove("pass-invalid");
      oneLowerCase.classList.remove("pass-invalid");
      oneUpperCase.classList.remove("pass-invalid");
      oneSymbol.classList.remove("pass-invalid");
      oneNum.classList.remove("pass-invalid");
    };
  } else {
    if (isValid) {
      passError.style.display = "none";
    } else {
      // Show error message, when out of focus and at least one character entered
      passError.style.display = "block";
    };
  };

  if (submitClicked) {
    if (passwordValue.length < 1) {
      errorHandler(passInput, passError);
    }; 
  };
});     

// In focus state
passInput.addEventListener("focus", () => {
  passwordValue = passInput.value;
  if (passwordValue.length < 1 && !submitClicked) {
    passInput.style.border = "1px solid blue";
  } else if (passwordValue.length >= 1 || passwordValue.length < 1) {
    passError.style.display = "none";
  };

  if (passwordValue.length < 1 && submitClicked) {
    const passRequirements = [minLength, oneLowerCase, oneUpperCase, oneSymbol, oneNum];

    passRequirements.forEach((element) => {
      element.classList.add("pass-invalid");
      element.style.color = "red";
    });
  };

  if (submitClicked) {
    passError.style.display = "none";
  };
  passError.classList.remove('shake');
});

// Validate all password requirements
function validatePassword(element, pattern) {
  if (pattern.test(passwordValue)) {
    element.classList.add("pass-valid");
    element.classList.remove("pass-invalid");
    if (passwordValue.length >= 1) {
      element.style.color = "green";
    };
  } else {
    element.classList.add("pass-invalid");
    element.classList.remove("pass-valid");
    if (passwordValue.length >= 1 || passwordValue.length < 1) {
      element.style.color = "red";
    };
  };
};

passInput.addEventListener("input", () => {
  passwordValue = passInput.value;
  const inputValue = confirmPassInput.value;

  const allRequirementsMet = 
    minLengthPattern.test(passwordValue) &&
    oneUpperCasePattern.test(passwordValue) &&
    oneLowerCasePattern.test(passwordValue) &&
    oneSymbolPattern.test(passwordValue) &&
    oneNumPattern.test(passwordValue);

  // If all requirements are met for password
  if (allRequirementsMet) {
    passInput.style.border = "1px solid green";
    passInput.classList.remove("border-invalid");
    passInput.classList.add("border-valid");
    isValid = true;
    confirmPassInput.classList.remove("password-disabled");
    confirmPassInput.disabled = false;
  } else {
    passInput.style.border = "1px solid red"; 
    passInput.classList.remove("border-valid");
    passInput.classList.add("border-invalid");
    isValid = false;
    if (passwordValue.length >= 1) {
      confirmPassInput.classList.add("password-disabled");
    };
    confirmPassInput.disabled = true;
  };

  // If both valid but then password input becomes invalid ...
  if (inputValue.length >= 8 && passwordValue !== inputValue) {
    confirmPassInput.style.border = "1px solid red";
    passMatchError.style.display = "block";
    passMatchError.classList.remove("shake");
  } else if (isValid) {
    if (passwordValue === inputValue) {
      confirmPassInput.style.border = "1px solid green";
      passMatchError.style.display = "none";
    };
  };
  
  validatePassword(minLength, minLengthPattern);
  validatePassword(oneUpperCase, oneUpperCasePattern);
  validatePassword(oneLowerCase, oneLowerCasePattern);
  validatePassword(oneSymbol, oneSymbolPattern);
  validatePassword(oneNum, oneNumPattern);
});

confirmPassInput.addEventListener("focus", () => {
  const inputValue = confirmPassInput.value;
  if (submitClicked) {
    confirmPassInput.style.boxShadow = "none";
  };

  if (!isValid) {
    if (passwordValue.length < 1) {
      confirmPassInput.classList.add("password-disabled");
      confirmPassInput.disabled = true;
    };
  };

  if (inputValue.length < 1 && !submitClicked && isValid) {
    confirmPassInput.style.border = "1px solid blue";
  };

  passMatchError.classList.remove('shake');
});

// Confirm if passwords match (out of focus)
confirmPassInput.addEventListener("blur", () => {
  const inputValue = confirmPassInput.value;
  if (isValid) {
    if (passwordValue !== inputValue && (inputValue >= 1)) {
      errorHandler(confirmPassInput, passMatchError);
    } else if (passwordValue === inputValue) {
      validHandler(confirmPassInput, passMatchError);
    };
    if (inputValue.length < 1 && !submitClicked) {
      confirmPassInput.style.border = "1px solid #bab8b8";
      confirmPassInput.style.boxShadow = "none";
      passMatchError.style.display = "none";
    };
  };
});

// Real-time validation
confirmPassInput.addEventListener("input", () => {
  const inputValue = confirmPassInput.value;
  if (isValid) {
    if (passwordValue !== inputValue) {
      errorHandler(confirmPassInput, passMatchError);
    } else {
      validHandler(confirmPassInput, passMatchError);
    };
  };
});

// Checks if form is ready to be submitted based on validation
submitBtn.addEventListener("click", (e) => {
  const inputValue = confirmPassInput.value;
  const firstNameValue = firstName.value;
  const lastNameValue = lastName.value;
  const emailValue = emailInput.value;

  passwordValue = passInput.value;

  if (firstLastNamePattern.test(firstNameValue)) {
    validHandler(firstName, firstNameError);
  } else {
    errorHandler(firstName, firstNameError);
  };

  if (firstLastNamePattern.test(lastNameValue)) {
    validHandler(lastName, lastNameError);
  } else {
    errorHandler(lastName, lastNameError);
  };

  if (emailValue.length < 1) errorHandler(emailInput, emailError);
  if (!isValid) errorHandler(passInput, passError);
  if (inputValue.length < 1) errorHandler(confirmPassInput, passMatchError);

  if (passwordValue !== inputValue) {
    e.preventDefault();
  };

  allValid();                          // Submit form if all inputs are valid
  e.preventDefault();

  //Shake on 2nd click when errors are visible
  if (submitClicked) {
    errorMessages.forEach((element) => {
      element.classList.add('shake');
      
      element.addEventListener('animationend', () => {
        element.classList.remove('shake');
      });
    });
  };
  submitClicked = true;
});



// Styling for errors
function errorHandler(input, error) {
  error.style.display = "block";
  error.style.color = "rgb(170, 13, 13)";
  input.style.border = "1px solid red";
  input.style.boxShadow = "none";
};

// Styling if no errors
function validHandler(input, error) {
  error.style.display = "none";
  input.style.border = "1px solid green";
  input.style.boxShadow = "none";
};

// If all inputs are valid, submit the form 
function allValid() {
  const firstNameValue = firstName.value;
  const lastNameValue = lastName.value;
  const emailValue = emailInput.value;
  const inputValue = confirmPassInput.value;

  if (isValid 
  && firstLastNamePattern.test(firstNameValue) 
  && firstLastNamePattern.test(lastNameValue)
  && emailRegexPattern.test(emailValue) 
  && passwordValue === inputValue) {
    removeHyphens();                  //Store only numeric values for phone input
    myForm.submit();                  // Submit a form if every input value is valid
  };
};

function resetLabelColors() {
  minLength.style.color = "rgb(31, 2, 59)";
  oneUpperCase.style.color = "rgb(31, 2, 59)";
  oneLowerCase.style.color = "rgb(31, 2, 59)";
  oneSymbol.style.color = "rgb(31, 2, 59)";
  oneNum.style.color = "rgb(31, 2, 59)";
};


