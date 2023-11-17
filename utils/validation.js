const EMAIL_REGEX = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PW_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,24}$/;

export const validateEmail = email => {
  return EMAIL_REGEX.test(email);
};

export const validatePassword = password => {
  return PW_REGEX.test(password);
};
