# phantombuster-technical-test
Technical test to be part of the company
 - This test was done on a kubuntu with

 - npm v 6.14.7
 - node v14.8.0

## How to turn the project on

 - You have to be sure that apt-get is up-to-date and so run ```sudo apt-get update && sudo apt-get upgrade```
 - You have to install npm ```sudo apt-get install npm```
 - You have to install phantombuster-sdk with this ```npm install -g phantombuster-sdk;```
 - You can install typescript on global with ```npm install -g typescript```
 - You may have to use sudo

 - Don't forget to run ```npm install```
 - You can now code inside the ```src/``` folder and compile your typescript by running  ```tsc``` or ```npm run tsc```.
   This will make a ```dist/``` folder with an ```index.js```

 - Create a ```phantombuster.cson``` at the root of the repo (No I didn't upload mine on github)
 - This file should have this format: ```
 [
    name: 'Phantom Name'
    apiKey: 'MY_API_KEY'
    scripts:
        'technical-test.js': 'dist/index.js'
]```

 - Run ```phantombuster dist/index.js```.
   And you will be able to run the phantom on the phantombuster plateform.

## Project
The phantom will get recipes of the first on the marmitton website.
If no arguments are given to the phantom it will search with an empty query.
You can give as arguments the url and the query:
 - the url is a string
 - the query is a string or an array of string
 - the pageToProcess is a number that represent the number of page to scrap
 - you can use this format inside the plateform
 ```
 {
    "query": "vege",
    "pageToProcess": 3
}
 ```

The phantom will get the name, the url, the score and the number of reviews for each recipes.
You can get the result with a curl request:
```
curl --request GET \
     --url 'https://api.phantombuster.com/api/v1/agent/AGENTID/output?mode=most-recent&containerId=CONTAINERID&withoutResultObject=false' \
     --header 'Accept: application/json' \
     --header 'X-Phantombuster-Key-1: MY_API_KEY'
```

To get the agentId you can again do a curl request 
```
curl --request GET \
     --url https://api.phantombuster.com/api/v1/user \
     --header 'Accept: application/json' \
     --header 'X-Phantombuster-Key-1: MY_API_KEY'
```

The containerid is on the plateform fantom section and the api key is the same you used to upload your phantom.

you can install curl with ```sudo apt-get install curl```

### Bonus
 - The ts config is ```strict null checks``` ```no implicite any``` and ```strictFunctionTypes```
 - The documentation of the project / codebase should explicite enought (API call are explain in the readme to get the data of the phantom)
 - This project will be on a github respository
 - The user can select the number of page to process by sending a number inside the field ```pageToProcess``` in phantom arguments


 #### Mentions
  Created by Thibaud Salsa