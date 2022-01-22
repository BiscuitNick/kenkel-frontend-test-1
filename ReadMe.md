## Getting Started

After cloning this repository

Install http-server

yarn add http-server  
or  
npm i http-server

Then

yarn start  
or  
npm start

Open browser to:  
http://127.0.0.1:8080

## Folder Structure

/api  
test-1_data.json (sample json data)  
/components  
array-credit-lock (create web component)  
 /examples - examples demonstrating each of 4 dynamic properties - src, showHistory, showAll, compactItems

- index.html
- bad-src.html
- no-src.html
- show-history-compactItems
- show-history-show-all  
  index.html - base example + link to source
  package.json - simple script to start http-server
  readme.md - this readme file

## Array-credit-lock.js

### Helper functions

ParseDate - simple function to parse date from JSON file  
fetchData - fetch JSON data from url to then populate array-credit-lock component

### Building the Custom Element

- Copied html from source-page into template element.
- Added slot elements into title & bullet elements at top of page

### Element Properties

src - url to fetch source data  
showHistory - toggle to show/hide lock history  
showAll - toggle to show compact or expanded view of lock history  
compactItems - #items to show when in compact view of lock history

### ConnectedCallback

- Add click handler to toggle showAll & showHistory & update lockhistory accordingly
- Hide history & showAll if showHistory property is set to false
- Add function to toggle "expanded" class on collapsible Q&A elements
- Fetch Data from src url

### PopulateListData

- Populate lockHistory content
- Iterates list from end to beginning since recent locks/unlocks is most relavant

## Deployments

https://kenkel-frontend-test-1.vercel.app/
