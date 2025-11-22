
import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY
export const encrypt = (text: string) => {
  return encodeURIComponent(CryptoJS.AES.encrypt(text, SECRET_KEY).toString());
}

export const decrypt = (text: string) => {
  const decrypted = CryptoJS.AES.decrypt(
    decodeURIComponent(text),
    SECRET_KEY
  ).toString(CryptoJS.enc.Utf8);
  return decrypted;
}