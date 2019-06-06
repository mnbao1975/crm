This app is similar to the 'manage-token'app, but it uses the token which allows you to access all modules and setting 
Scope: ZohoCRM.modules.ALL,Scope: ZohoCRM.settings.ALL 

Step 1: Registering a client
https://www.zoho.com/crm/help/developer/api/register-client.html

Step 2: Authorization Request >> go to the session "Self-Client option"
https://www.zoho.com/crm/help/developer/api/auth-request.html
Scope: ZohoCRM.modules.ALL

Step 3: Generate Access Token and Refresh Token
https://www.zoho.com/crm/help/developer/api/access-refresh.html
User Postman, "Generate tokens", to generate access and refresh tokens

Run call-api.js to test