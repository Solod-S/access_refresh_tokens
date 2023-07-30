![Version](https://img.shields.io/badge/Version-1.0-blue.svg?cacheSeconds=2592000)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![runs with reactnative](https://img.shields.io/badge/Runs%20with%20React-000.svg?style=flat-square&logo=React&labelColor=f3f3f3&logoColor=61DAFB)](https://uk.legacy.reactjs.org/)
[![runs with router dom](https://img.shields.io/badge/Runs%20with%20React_Router_Dom-000.svg?style=flat-square&logo=React&labelColor=f3f3f3&logoColor=blue)](https://reactrouter.com/en/main)
[![runs with Axios](https://img.shields.io/badge/Runs%20with%20Axios-000.svg?style=flat-square&logo=Axios&labelColor=f3f3f3&logoColor=671DDF)](https://axios-http.com/ru/docs/intro)
[![runs with nodeJs](https://img.shields.io/badge/Runs%20with%20Node.Js-000.svg?style=flat-square&logo=nodedotjs&labelColor=f3f3f3&logoColor=#3C823B)](https://nodejs.org/ru)
[![runs with express](https://img.shields.io/badge/Runs%20with%20Express-000.svg?style=flat-square&logo=Express&labelColor=f3f3f3&logoColor=7D7D7D)](https://expressjs.com/ru/)
[![runs with mongodb](https://img.shields.io/badge/Runs%20with%20MongoDB-000.svg?style=flat-square&logo=mongodb&labelColor=f3f3f3&logoColor=#47A248)](https://swagger.io/)
[![runs with nodemon](https://img.shields.io/badge/Runs%20with%20Nodemon-000.svg?style=flat-square&logo=nodemon&labelColor=f3f3f3&logoColor=nodemon)](https://www.npmjs.com/package/nodemon)
[![runs with PassportJs](https://img.shields.io/badge/Runs%20with%20PassportJs-000.svg?style=flat-square&logo=Passport&labelColor=f3f3f3&logoColor=35DF79)](https://www.passportjs.org/)

# Google Auth + Access/Refresh tokens

![Google Auth Demo](./public/google.gif)

## About

I want to share my experience of interacting with Google authentication on my web server. I used Node.js with Express and MongoDB database.

At the beginning, I created a new project in the Google Cloud Console and got the access keys. Then installed the "passport-google-oauth2" package to conveniently work with Google OAuth 2.0.

The next step was to configure the authorization routes and to handle the callback after successful authorization. I used the Passport.js package with GoogleStrategy for this.

After successful authorization, received data about the user from Google. With this data, I decided how to handle users on my server - when to create a new user and when to just authorize an existing one.

It was quite an exciting process and I am grateful to Google for the powerful tools they provided for working with authorization. Now my server can easily and securely allow users to sign in with their Google accounts.

I hope you find this experience exciting and useful in your project as well. Thank you for your attention and I wish you success in your work!

## Contributing

Contributions are welcome! If you have any suggestions or improvements, please create a pull request. For major changes, please open an issue first to discuss the changes.

**_NOTE: PLEASE LET ME KNOW IF YOU DISCOVERED ANY BUG OR YOU HAVE ANY SUGGESTIONS_**
