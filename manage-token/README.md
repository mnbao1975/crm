This app will use Redis to store access token. So, whenever the toke is expired, it will auto refresh a new one and replace the one inside Redis. Thus, please check the .env file for Redis settings and ensure it is running.

docker run --rm --name my-redis -p 6379:6379 -d redis

Step 1: Registering a client
https://www.zoho.com/crm/help/developer/api/register-client.html

Step 2: Authorization Request >> go to the session "Self-Client option"
https://www.zoho.com/crm/help/developer/api/auth-request.html
Scope: ZohoCRM.modules.ALL

Step 3: Generate Access Token and Refresh Token
https://www.zoho.com/crm/help/developer/api/access-refresh.html
User Postman, "Generate tokens", to generate access and refresh tokens

Run call-api.js to test