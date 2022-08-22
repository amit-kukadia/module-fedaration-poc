# Step to install

```
npm run install

npm run bootstrap
```

# To run the dev server run

```
npm run serve
```
Then check localhost:8081


# To create a prod build run 

```
npm run build
```

Since authentication is not added, and the api for item module requires access token, it is hard coded for now. If while opening the item page, user is redirected to /logout page, the token has to be updated in packages\item\src\global\helpers\getCookieData.js
