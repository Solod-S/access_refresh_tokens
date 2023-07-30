const { User } = require("../../models/user");

const querystring = require("query-string");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");

const {
  BASE_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  ACCES_SECRET_KEY,
  REFRESH_SECRET_KEY,
} = process.env;

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = querystring.parse(urlObj.search);
  // гугл вернул код

  const code = urlParams.code;

  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: "post",
    data: {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: `${BASE_URL}/api/auth/google2/callback`,
      grant_type: "authorization_code",
      code,
    },
  });
  // console.log(`tokenData`, tokenData);
  // делаем запрос гуглу за токеном для дальнейших запросов гуглу

  const userData = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });
  // console.log(`userdata.data`, userData.data.email);
  // делаем запрос гуглу за инфой пользователя и получаем информацию о пользователе (userData.data)
  // дальше проверяем базу данных на наличие пользователя с имейлом userData.data.email если его нету регистрируем, если он есть мы пускаем юзера (даем токен)
  console.log(userData.data);
  const userExist = await User.findOne({ email: userData.data.email });

  if (userExist) {
    const payload = {
      id: userExist._id,
    };

    const user = await User.findOne({ email: userData.data.email });

    const accessToken = jwt.sign(payload, ACCES_SECRET_KEY, {
      expiresIn: "2m",
    });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
      expiresIn: "7d",
    });

    await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });

    res.status(200).json({
      status: "success",
      message: "Successful login",
      data: { user, accessToken, refreshToken },
    });
  } else {
    const password = await bcrypt.hash(nanoid(), 10);
    await User.create({
      email: userData.data.email,
      password,
      name: userData.data.name,
    });

    const user = await User.findOne({ email: userData.data.email });

    const payload = {
      id: user._id,
    };

    const accessToken = jwt.sign(payload, ACCES_SECRET_KEY, {
      expiresIn: "2m",
    });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
      expiresIn: "7d",
    });

    await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });

    res.status(200).json({
      status: "success",
      message: "Successful login",
      data: { user, accessToken, refreshToken },
    });
  }

  // return res.redirect(`${FRONTEND_BASE_URL}?email=${userData.data.email}`);
  // тут нужно будет использовать в теле токен
  //  return res.redirect(`${FRONTEND_BASE_URL}/google-redirect?token=${тут токен который мы создадим}`);
  // с квери параметров будем брать токен
};

module.exports = googleRedirect;
