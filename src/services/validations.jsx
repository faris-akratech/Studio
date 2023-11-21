import CryptoJS from "crypto-js";

export const emailValidation = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

export const passwordValidation = (password) => {
  if (password.length < 8) {
    return false;
  }
  if (!/[A-Z]/.test(password)) {
    return false;
  }
  if (!/[a-z]/.test(password)) {
    return false;
  }
  if (!/\d/.test(password)) {
    return false;
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return false;
  }
  return true;
};

export const encrypt = (value) => {
  const CRYPTO_PRIVATE_KEY = import.meta.env.VITE_CRYPTO_PRIVATE_KEY;
  const IV = CryptoJS.lib.WordArray.random(128 / 8);

  const encryptedValue = CryptoJS.AES.encrypt(
    JSON.stringify(value),
    CRYPTO_PRIVATE_KEY,
    { iv: IV }
  ).toString();

  return { iv: IV.toString(), encryptedValue };
};


