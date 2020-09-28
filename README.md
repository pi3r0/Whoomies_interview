# Whoomies_interview

## About 

This project has two instances, the parse-server (/server) and the (/dashboard), both has separate launch, open terminal and run the wanted project. Both project are already setup and configured to run properly. 

## Before begin 
 
1. See Parse documentation : https://parseplatform.org and more https://docs.parseplatform.org/js/guide/ on how deal with objects, queries. 
2. Please fork the project and/or download the project to your own space, do not clone and push. 
3. get use to mongoDB (create, user, import), requirement for parse is at least version 3.6
3. Get use to NPM commands
4. Get Postman or other API develpment tools to test your requests

## Instances 

### Datasets 

The datasets is a movie list with their comments provided in /datasets

#### Installation Guide
1. go to /datasets 
2. create your mongo instance and import the 2 files in a new db
3. create the admin user to get access from parse on it. 

### Dashboard 

Parse provides a dashboard to display db objects, run jobs, send push, you can use it browse, search and test some queries. The 
Once run. You don't have to do anything in this folder, it's only to help you, config is done. 

#### Env file 
```
PORT= 4040

# parse config (must be the same with /server/index.js)
APP_NAMES=YOUR_APP_NAME
HOST_ADDRESSES =YOUR_SERVER_ADDRESS
APP_IDS =YOUR_PARSE_APP_ID
MASTER_KEYS = YOUR_PARSE_MASTER_KEY
JS_KEYS = YOUR_PARSE_JS_KEY
FILE_KEYS= YOUR_PARSE_FILE_KEY

#ADMIN (you can change here)
ADMIN_WHOOMIES_USERS = local
ADMIN_WHOOMIES_CREDS = test

PARSE_DASHBOARD_TRUST_PROXY = true
PARSE_DASHBOARD_ALLOW_INSECURE_HTTP = true
```

#### Installation Guide
1. cd /dashboard/
2. config your env file
3. npm install
4. npm run start
5. open http://localhost:4040/ 
6. use credential provided 

#### Credential 
This is arbitrary you can change later
user : local
pass: test

#### Config 
Config on dashboard is highly involved with the server instance. 
If you want to change the server config (port for exemple), go to /dashboard/.env and change the key accordingly. 
The user is "local" and pass is "test", if you want to change it go to /dashboard/.env and change key accordingly. 

### Server 

The core server is on /server, running parse-server instance, it's your workspace, where you will work. 

#### Env file 
```
# gobal
PORT= 1337
ENV= "dev"

# Mongo
DB_USERNAME=  YOUR_DB_USERNAME
DB_CRED= YOUR_DB_USER_PASS
DB_HOST= YOUR_DB_HOST_ADDRESS

# parse config
APPNAME= YOUR_APP_NAME
PARSE_APP_ID= YOUR_APP_ID
PARSE_MASTER_KEY= YOUR_APP_MASTER_KEY
PARSE_CLIENT_KEY=YOUR_APP_CLIENT_KEY
PARSE_FILE_KEY= YOUR_APP_FILE_KEY
PARSE_JAVASCRIPT_KEY=YOUR_APP_JS_KEY
PARSE_REST_API_KEY=YOUR_APP_REST_KEY
```

#### Installation Guide
1. cd /server/
2. set your env file
3. npm install
4. npm run start

#### Config 
Config on parse is not set, you can choose each var like YOUR_APP_NAME and must be the same between the dashboard and the server

## Works 
### Project Overview
The project contains Movies and Comments, two classes. And Already had one cloud function and one job. Classic object types (Number, String) on both classes and Comments has a one pointer on Movie 

Make a quick tour on the folder organization and structure. 

Project is organized with separate folders, one by Object type and each one has their own jobs, cloud function, triggers, etc, only global functions are on first levels.  

### Cloud function 
You can help you with joi package to check params validity, already installed

#### Comments filtered by Movie
Curl to test the cloud function 
```
curl --location --request POST 'http://localhost:1337/Movie_rating/functions/commentsByMovie' \
--header 'x-parse-application-id: 5a9427648b0beebeb6957a88' \
--header 'x-parse-REST-API-key: abcdefegh0123456789' \
--header 'Content-Type: application/json' \
--data-raw '{
	"limit":30,
	"movieId": "573a1390f29313caabcd4eaf"
}
```

On this cloud function add the movie validation, chekc if the movie exists before launching the query, if the movie doesn't exist 
```
throw "this movie doesn't exists"
```



#### Movie filtered by Movie

Create a cloud function to returns the movie older than an year. And optionnaly from a Country, contains this country.  

params : 
```
{
    year: Number, mandatory
    country: String, optionnal 
}
```

Bonus : handle possible errors. 

#### Cloud function returns

Create functions that not return the full object but only wanted json for the previous cloud function

Warning : undefined values. 

Movies : 
```
{
    title: String,
    plot: String,
    comments: Number (equal to num_mflix_comments, should be 0 if undefined)
    year: Number, mandatory
    country: [String], optionnal 
    rated: String,
    released_date: Date, (timeStamp),
    cast: [String]
}
```

Comments : 
```
{
    name: String,
    email: String,
    date: Date, (timeStamp),
    movie: Movie (cf the previous model)
}
```

Bonus : Change the returning value from the previous cloud function with the new models 

### Job function 

#### Movie comments number 

The movie comments number is broken and not corresponding to the real comments number, Code the job on /Movies (partailly coded) to set the right comment number to a particular movie.  

### Triggers 

#### After Save comments
In order to linked the comments and the movie, when a comment is added, that should increase the comments number for the movie. 

You can add a comment direclty through the parse dashboard (don't do to many times, we need some good inputs).

### Bonus 
Only if you like. 

#### Cloud functions
Comments creation : 

params : 
```
{
    name: String, mandatory
    email: String, mandatory,
    movie_id: String, mandatory 
}
```
set date to now()

Comments deletion : 
params : 
```
{
    comment_id : String, mandatory,
    email: String, mandatory
}
```
In order to valid the deletion, we need to check if the comments exists and the email attached is egal to the one provided

#### Deletion trigger on comments
In order to test the deletion and the linked the comments and the movie, when a comment is deleted, that should decrease the comments number for the movie. 
