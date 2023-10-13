
// Validation styling 

const myForm = document.querySelector("form");

const passInput = document.querySelector("#password"); 
const confirmPassInput = document.querySelector("#confirm-pass"); 
const emailInput = document.querySelector("#email");
const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const phoneInput = document.querySelector("#phone-num");

const firstNameError = document.querySelector(".first-name-error");
const lastNameError = document.querySelector(".last-name-error");
const emailError = document.querySelector(".email-error");
const passError = document.querySelector(".pass-message");
const passMatchError = document.querySelector(".pass-match-error");

const minLength = document.querySelector(".min-length");
const oneUpperCase = document.querySelector(".one-upper-case");
const oneLowerCase = document.querySelector(".one-lower-case");
const oneSymbol = document.querySelector(".one-symbol");
const oneNum = document.querySelector(".one-num");

let isValid = false;          // Status if all requirements are met or not
let passwordValue = "";
let submitClicked = false;

const submitBtn = document.querySelector("button[type=submit]");

// Password requirements
const minLengthPattern = /^.{8,}$/;
const oneUpperCasePattern = /[A-Z]/;
const oneLowerCasePattern = /[a-z]/;
const oneSymbolPattern = /[@#$!%^&*]/;
const oneNumPattern = /\d/;

const emailRegexPattern = /[^@\s]+@[^@\s]+\.[^@\s]+/;
const firstLastNamePattern = /^(?=.{2,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i;


// Allow only digit numbers to be typed
phoneInput.addEventListener("keydown", (e) => {
  const key = e.key;
  const letterPattern = /^[a-zA-Z]$/;

  if (letterPattern.test(key)) {
    e.preventDefault();                  // Prevents from typing it
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

// Store a clean numeric value of phone number, without hyphens
function removeHyphens() {
  const initialInput = phoneInput.value;
  const numericValue = initialInput.replace(/-/g, "");
  phoneInput.value = numericValue;
};

confirmPassInput.addEventListener("focus", () => {
  if (submitClicked) {
    confirmPassInput.style.boxShadow = "none";
  };
});

// Out of focus state
passInput.addEventListener("blur", () => {
  passwordValue = passInput.value;

  if (passwordValue.length < 1) {
    passInput.style.border = "1px solid #bab8b8"; 
    resetLabelColors();
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
      passInput.style.border = "1px solid red";
      passError.style.display = "block";
    }; 
  };
});     

// In focus state
passInput.addEventListener("focus", () => {
  passwordValue = passInput.value;
  if (passwordValue.length < 1) {
    passInput.style.border = "1px solid blue";
  } else if (passwordValue.length >= 1 || passwordValue.length < 1) {
    passError.style.display = "none";
  };

  if (submitClicked) {
    passError.style.display = "none";
  };
});

passInput.addEventListener("input", () => {
  passwordValue = passInput.value;

  const allRequirementsMet = 
    minLengthPattern.test(passwordValue) &&
    oneUpperCasePattern.test(passwordValue) &&
    oneLowerCasePattern.test(passwordValue) &&
    oneSymbolPattern.test(passwordValue) &&
    oneNumPattern.test(passwordValue);

  // If all requirements are met
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

  
  if (minLengthPattern.test(passwordValue)) {
    minLength.classList.add("pass-valid");
    minLength.classList.remove("pass-invalid");
    if (passwordValue.length >= 1) {
      minLength.style.color = "green";
    };
  } else {
    minLength.classList.add("pass-invalid");
    minLength.classList.remove("pass-valid");
    if (passwordValue.length >= 1 || passwordValue.length < 1) {
      minLength.style.color = "red";
    };
  };

  if (oneUpperCasePattern.test(passwordValue)) {
    oneUpperCase.classList.add("pass-valid");
    oneUpperCase.classList.remove("pass-invalid");
    if (passwordValue.length >= 1) {
      oneUpperCase.style.color = "green";
    };
  } else {
    oneUpperCase.classList.add("pass-invalid");
    oneUpperCase.classList.remove("pass-valid");
    if (passwordValue.length >= 1 || passwordValue.length < 1) {
      oneUpperCase.style.color = "red";
    };
  };

  if (oneLowerCasePattern.test(passwordValue)) {
    oneLowerCase.classList.add("pass-valid");
    oneLowerCase.classList.remove("pass-invalid");
    if (passwordValue.length >= 1) {
      oneLowerCase.style.color = "green";
    };
  } else {
    oneLowerCase.classList.add("pass-invalid");
    oneLowerCase.classList.remove("pass-valid");
    if (passwordValue.length >= 1 || passwordValue.length < 1) {
      oneLowerCase.style.color = "red";
    };
  };

  if (oneSymbolPattern.test(passwordValue)) {
    oneSymbol.classList.add("pass-valid");
    oneSymbol.classList.remove("pass-invalid");
    if (passwordValue.length >= 1) {
      oneSymbol.style.color = "green";
    };
  } else {
    oneSymbol.classList.add("pass-invalid");
    oneSymbol.classList.remove("pass-valid");
    if (passwordValue.length >= 1 || passwordValue.length < 1) {
      oneSymbol.style.color = "red";
    };
  };

  if (oneNumPattern.test(passwordValue)) {
    oneNum.classList.add("pass-valid");
    oneNum.classList.remove("pass-invalid");
    if (passwordValue.length >= 1) {
      oneNum.style.color = "green";
    };
  } else {
    oneNum.classList.add("pass-invalid");
    oneNum.classList.remove("pass-valid");
    if (passwordValue.length >= 1 || passwordValue.length < 1) {
      oneNum.style.color = "red";
    };
  };
});

// Confirm if passwords match
confirmPassInput.addEventListener("blur", () => {
  const inputValue = confirmPassInput.value;
  if (isValid) {
    if (passwordValue !== inputValue) {
      passMatchError.style.display = "block";
      confirmPassInput.style.border = "1px solid red";
      confirmPassInput.style.boxShadow = "none";
    } else {
      passMatchError.style.display = "none";
      confirmPassInput.style.border = "1px solid green";
      confirmPassInput.style.boxShadow = "none";
    };
  };
});

// Ensures form not submitted when confirmed password doesn't match
submitBtn.addEventListener("click", (e) => {
  const inputValue = confirmPassInput.value;
  const firstNameValue = firstName.value;
  const lastNameValue = lastName.value;
  const emailValue = emailInput.value;
  
  //Store only numeric values on phone input
  removeHyphens();

  passwordValue = passInput.value;

  if (firstLastNamePattern.test(firstNameValue)) {
    firstName.style.border = "1px solid green";
    firstName.style.boxShadow = "none";
    firstNameError.style.display = "none";
  } else {
    firstName.style.border = "1px solid red";
    firstName.style.boxShadow = "none";
    firstNameError.style.display = "block";
    firstNameError.style.color = "rgb(170, 13, 13)";
  };

  if (firstLastNamePattern.test(lastNameValue)) {
    lastName.style.border = "1px solid green";
    lastName.style.boxShadow = "none";
    lastNameError.style.display = "none";
  } else {
    lastName.style.border = "1px solid red";
    lastName.style.boxShadow = "none";
    lastNameError.style.color = "rgb(170, 13, 13)";
    lastNameError.style.display = "block";
  };

  if (emailValue.length < 1) {
    emailInput.style.border = "1px solid red";
    emailError.style.display = "block";
  };

  if (!isValid) {
    passInput.style.border = "1px solid red";
    passError.style.display = "block";
  };
  
  if (inputValue.length < 1) {
    passMatchError.style.display = "block";
    confirmPassInput.style.border = "1px solid red";
  };

  if (passwordValue !== inputValue) {
    e.preventDefault();
  };

  e.preventDefault();

  submitClicked = true;
});

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
      firstName.style.border = "1px solid green";
      firstName.style.boxShadow = "none";
      firstNameError.style.display = "none";
    } else {
      firstName.style.border = "1px solid red";
      firstName.style.boxShadow = "none";
      firstNameError.style.display = "block";
      firstNameError.style.color = "rgb(170, 13, 13)";
    };
  } else {
    if (!firstLastNamePattern.test(firstNameValue)) {
      if (firstNameValue.length >= 1) {
        firstName.style.border = "1px solid red";
        firstName.style.boxShadow = "none";
        firstNameError.style.display = "block";
        firstNameError.style.color = "rgb(170, 13, 13)";
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
      lastName.style.border = "1px solid green";
      lastName.style.boxShadow = "none";
      lastNameError.style.display = "none";
    } else {
      lastName.style.border = "1px solid red";
      lastName.style.boxShadow = "none";
      lastNameError.style.color = "rgb(170, 13, 13)";
      lastNameError.style.display = "block";
    };
  } else {
    if (!firstLastNamePattern.test(lastNameValue)) {
      if (lastNameValue.length >= 1) {
        lastName.style.border = "1px solid red";
        lastName.style.boxShadow = "none";
        lastNameError.style.color = "rgb(170, 13, 13)";
        lastNameError.style.display = "block";
      };
    };
  };
});

firstName.addEventListener("input", () => {
  const firstNameValue = firstName.value;

  if (submitClicked) {
    if (firstLastNamePattern.test(firstNameValue)) {
      firstName.style.border = "1px solid green";
      firstName.style.boxShadow = "none";
      firstNameError.style.display = "none";
    } else {
      firstName.style.border = "1px solid red";
      firstName.style.boxShadow = "none";
      firstNameError.style.display = "block";
      firstNameError.style.color = "rgb(170, 13, 13)";
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
        firstName.style.border = "1px solid green";
        firstName.style.boxShadow = "none";
        firstNameError.style.display = "none";
      } else {
        firstName.style.border = "1px solid red";
        firstName.style.boxShadow = "none";
        firstNameError.style.display = "block";
        firstNameError.style.color = "rgb(170, 13, 13)";
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
      lastName.style.border = "1px solid green";
      lastName.style.boxShadow = "none";
      lastNameError.style.display = "none";
    } else {
      lastName.style.border = "1px solid red";
      lastName.style.boxShadow = "none";
      lastNameError.style.color = "rgb(170, 13, 13)";
      lastNameError.style.display = "block";
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
        lastName.style.border = "1px solid green";
        lastName.style.boxShadow = "none";
        lastNameError.style.display = "none";
      } else {
        lastName.style.border = "1px solid red";
        lastName.style.boxShadow = "none";
        lastNameError.style.color = "rgb(170, 13, 13)";
        lastNameError.style.display = "block";
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
      firstName.style.border = "1px solid green";
      firstName.style.boxShadow = "none";
      firstNameError.style.display = "none";
    } else {
      firstName.style.border = "1px solid red";
      firstName.style.boxShadow = "none";
      firstNameError.style.display = "block";
      firstNameError.style.color = "rgb(170, 13, 13)";
    };
  } else {
    if (firstNameValue.length < 1) {
      firstName.style.border = "1px solid blue";
    } else {
      if (firstLastNamePattern.test(firstNameValue)) {
        firstName.style.border = "1px solid green";
        firstName.style.boxShadow = "none";
        firstNameError.style.display = "none";
      } else {
        firstName.style.border = "1px solid red";
        firstName.style.boxShadow = "none";
        firstNameError.style.display = "block";
        firstNameError.style.color = "rgb(170, 13, 13)";
      };
    };
  };
});

lastName.addEventListener("focus", () => {
  const lastNameValue = lastName.value;

  if (submitClicked) {
    if (firstLastNamePattern.test(lastNameValue)) {
      lastName.style.border = "1px solid green";
      lastName.style.boxShadow = "none";
      lastNameError.style.display = "none";
    } else {
      lastName.style.border = "1px solid red";
      lastName.style.boxShadow = "none";
      lastNameError.style.color = "rgb(170, 13, 13)";
      lastNameError.style.display = "block";
    };
  } else {
    if (lastNameValue.length < 1) {
      lastName.style.border = "1px solid blue";
    } else {
      if (firstLastNamePattern.test(lastNameValue)) {
        lastName.style.border = "1px solid green";
        lastName.style.boxShadow = "none";
        lastNameError.style.display = "none";
      } else {
        lastName.style.border = "1px solid red";
        lastName.style.boxShadow = "none";
        lastNameError.style.color = "rgb(170, 13, 13)";
        lastNameError.style.display = "block";
      };
    };
  };
});

emailInput.addEventListener("input", () => {
  const emailValue = emailInput.value;

  if (submitClicked) {
    if (emailRegexPattern.test(emailValue)) {
      emailInput.style.border = "1px solid green";
      emailError.style.display = "none";
    } else {
      if (emailValue.length >= 1) {
        emailInput.style.border = "1px solid red";
        emailError.style.display = "block";
        emailInput.style.boxShadow = "none";
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
});

function resetLabelColors() {
  minLength.style.color = "rgb(31, 2, 59)";
  oneUpperCase.style.color = "rgb(31, 2, 59)";
  oneLowerCase.style.color = "rgb(31, 2, 59)";
  oneSymbol.style.color = "rgb(31, 2, 59)";
  oneNum.style.color = "rgb(31, 2, 59)";
};


