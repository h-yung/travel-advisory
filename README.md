# Travel Advisory 
This web app is meant for the international traveler post-2020 as policies concerning COVID and health precautions continue to shift.
It will provide information on whether a destination country for international travel (specifically by air) requires specific health and vaccination proof.

MVP will focus on negative COVID test and proof of vaccination for the [top 10 most visited countries](https://worldpopulationreview.com/country-rankings/most-visited-countries) for tourism and global travel. 
Future phases will provide more actionable details and increase country list.
Further optimizations will use webscraping for publicly available data from credible government agency sources.

## How it's made
**Tech used:** MERN stack app - Front end: React (and Bootstrap, temporarily); back end: Node.js and Express framework, MongoDB with Mongoose for database, Axios for HTTP requests (but may rewrite).

The following apply solely to the **MVP**.

## Current state
- API and database are set up
- Front and back end built separately and not yet integrated

## Target functionality
User can look up travel advisory by country, and learn whether the destination country requires proof of negative COVID test or full vaccination.
Each advisory will include details such as 
- to whom any requirements apply, and acceptable tests or proofs (format, time elapsed, etc.)
- date from which the requirements are in effect
- source of information and relevant links for more information

## Issues/backlog
- finish setting up data fetching in React
- componentize the many inputs, labels, and divs across the routes (AdvisoryList, Advisory, AddAdvisory)
  -  certain inputs may be better as radio buttons or arrays: update form for adding Advisories and update database configuration accordingly
- rethink UI 
  - for country search, especially on mobile: (alphabetized) list or dropdown, or solely by search
  - hide details /open on tap or click?
- refactor for accessibility (aria labels and element focus)
- update styling in App.css, remove from App.js and components where possible
  - replace favicon
- add up to 10 country advisories

## Lessons learned (WIP)
- dependencies and deprecation: needed to use flag --legacy-peer-dep, and overrides
- vulnerability warnings might be false alarms pre-production (React)
- mind the states! Building familiarity with hooks
