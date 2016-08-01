`````````````````````````````
node.js password manager file

`````````````````````````````

``````
set-up

``````

npm install: crypto.js (for encryption) + node-persist (to enable saving locally to pc)

enable npm start be run in terminal (vs node app.js), update package.json:

"scripts": {
    ...
    "start": "node app.js"
  },

`````````
functions

`````````
create account - with name, username, password + masterpassword
get account - retrieve using name
argv created - to enable user input via terminal

each account put into or retrieved from an array, which is encrypted (JSON used to transform object into string and back again)

data saved in persist file (created upon each run of program - WHICH MUST BE DELETED AGAIN TO RUN UPATES TO CODE)

