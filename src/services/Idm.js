import Socket from "../util/Socket";
import { idmEPs } from "../Config.json";

const { loginEP } = idmEPs;

async function login(email, password) {
  const payLoad = {
    email: email,
    password: password.split("")
  };

  return await Socket.POST(loginEP, payLoad);
}

const { registerEP } = idmEPs;

async function register(email, password) {
  const payLoad = {
    email: email,
    password: password.split("")
  };

  return await Socket.POST(registerEP, payLoad);
}

export default {
  login,
  register
};