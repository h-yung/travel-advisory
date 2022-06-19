# Travel Advisory 
This web app is meant for the international traveler post-2020 as policies concerning COVID and health precautions continue to shift.
It will provide information on whether a destination country for international travel (specifically by air) requires specific health and vaccination proof. 

MVP will focus on negative COVID test and proof of vaccination for the [top 10 most visited countries](https://worldpopulationreview.com/country-rankings/most-visited-countries) for tourism and global travel. 
Future phases will provide more actionable details and increase country list.
Further optimizations will use webscraping for publicly available data from credible government agency sources.

**Demo** with some data

![travel app screenshot](https://i.postimg.cc/KzWkXxTy/travel-demo-202206.png)


## How it's made
**Tech used:** MERN stack app - Front end: React (Bootstrap); back end: Node.js and Express framework, MongoDB with Mongoose for database, Axios for HTTP requests (but may rewrite).

The following apply solely to the **MVP**.

## Current state
Running on local server with the following commands
1. `npm install`
2. `node server.js` 

Can add travel advisories to the database using the form.
Observation: Redundancy with country list plus search functionality? However, it could be useful for the list to provide sorting options (e.g., most popular destination, test or vaccination requirements needed).

## Target functionality
User can look up travel advisory by country, and learn whether the destination country requires proof of negative COVID test or full vaccination.
Each advisory will include details such as 
- to whom any requirements apply
- accepted tests or proofs (format, time elapsed, etc.)
- date from which the requirements are in effect
- source of information and relevant links for more information

## Issues/backlog
- Update React to show basic advisory information
- Add editing functionality
- componentize the many inputs, labels, and divs across the routes (AdvisoryList, Advisory, AddAdvisory)
  -  certain inputs may be better as radio buttons or arrays: update form for adding Advisories and update database configuration accordingly
- Rethink UI 
  - For country list, create sorting functionality with filters for popular destination or test/vax reqs, or most recently updated. Since user base = 0, this is likely something hardcoded based on input data to start.
- Refactor for accessibility (aria labels and element focus)
- Update styling in App.css for clarity and improved experience
  - Update favicon
- Add up to 10 country advisories

## Lessons learned (WIP)
- dependencies and deprecation: needed to use flag --legacy-peer-dep, and overrides
- vulnerability warnings might be false alarms pre-production (React)
- building familiarity with hooks - mind the states
