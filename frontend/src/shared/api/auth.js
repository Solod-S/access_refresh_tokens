import axios from "axios";

const { REACT_APP_API_URL } = process.env;

const instance = axios.create({
  baseURL: REACT_APP_API_URL,
});

const setToken = (token) => {
  if (token) {
    return (instance.defaults.headers.common.authorization = `Bearer ${token}`);
  }
  instance.defaults.headers.common.authorization = "";
};
/*
instance.interceptors.request.use(config => {
    const accessToken = localStorage.getItem("accessToken");
    config.headers.common.authorization = `Bearer ${accessToken}`;
    return config;
})
// срабатывает перед каждым запросом (внутрений инструмент аксиоаса)
// пробует взять токен из локал стораджа
// и запихнуть в авторизацию запроса токен
*/

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status == 401) {
      const refreshToken = localStorage.getItem("refreshToken");
      //   аксес токен не валидный и мы подготавливаем из локал стораджа рефреш токен для запроса на рефреш
      try {
        const { data } = await instance.post("/auth/refresh", { refreshToken });
        setToken(data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        // error.config.headers.common.authorization = `Bearer ${data.accessToken}`;
        // если нет инстанса
        return instance(error.config);
        //   делаем повторный запрос (ерор конфиг это настройки этого не удавшегося запроса, урл, боди и т д)
      } catch (error) {
        return Promise.reject(error);
        //   ловим 403 ошибку (рефреш токен просрочен)
      }
    }
    return Promise.reject(error);
    // ловим все остальные ошибки (400 бед риквес и т д)
  }
);
// если ответ с ошибкой пойдет сценарий ерора

export const signup = async (data) => {
  const { data: result } = await instance.post("/users/signup", data);
  return result;
};

export const login = async (data) => {
  const { data: result } = await instance.post("/users/login", data);
  setToken(result.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
  //   записуем токен в локал сторадж
  return result;
};

export const logout = async () => {
  const data = await instance.post("/users/logout");
  setToken();
  return data;
};

export const getCurrent = async (token) => {
  try {
    setToken(token);
    const { data } = await instance.get("/users/current");
    return data;
  } catch (error) {
    setToken();
    throw error;
  }
};

export default instance;
