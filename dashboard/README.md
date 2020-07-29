# Movie project parse-dashboard

About displaying your objects store in the parse backend. 

## Before
Be sure to have an .env file on the root folder with the current key 

```APP_NAME``` : App name for every parse server you want to observe separate by space " "

```HOST_ADDRESSES``` : host adresses for every parse server you want to observe separate by space " "

```APP_IDS``` : App Ids for every parse server you want to observe separate by space " "

```MASTER_KEYS``` : MasterKey for every parse server you want to observe separate by space " "

```JS_KEYS``` : JS keys for every parse server you want to observe separate by space " "

```FILE_KEYS``` : File keys for every parse server you want to observe separate by space " "

```ADMIN_WHOOMIES_USERS``` : user with access to the previous parse app observed separate by space " "

```ADMIN_WHOOMIES_CREDS``` : cred for users with access to the previous parse app observed separate by space " "

```PARSE_DASHBOARD_TRUST_PROXY``` : true

```PARSE_DASHBOARD_ALLOW_INSECURE_HTTP``` : true

### Current Config  
The config is available on .env file, and plugged on regarding the parse server instance. 

.env
```
	#parse apps
	APP_NAME = whoomies whoomies-local
	MASTER_KEYS = masterKeyProd masterKeyLocal
	JS_KEYS = jsKeyProd jsKeyLocal
	FILE_KEYS = fileKeyProd fileKeyLocal
	
	#admins
	ADMIN_WHOOMIES_USERS = local
	ADMIN_WHOOMIES_CREDS = test
	
	#others
	PARSE_DASHBOARD_TRUST_PROXY = true
	PARSE_DASHBOARD_ALLOW_INSECURE_HTTP = true
```

If you trouble with the config, please send a mail to pierre.houguet@whoomies.com

## Installation 

```  npm install ``` or yarn install
	
``` npm run start ``` or yarn run start_local (run with dotenv)

Warning : be sure to have runned the server instance you want to observe and go on localhost:4040 (or other port if you had specify PORT on .env)

