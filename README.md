[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)
 # Heroku version
 This app is published on heroku: https://montar-lab-test-app.herokuapp.com/api-docs/

 # Local Version Quick Start Guide
 In order to run the cloned codebase directly, you need to have Node.js (>=12.0.0) installed.

 1. Run `npm i` to install dependencies.
 3. Make your own `.env` file in the project root, following the key name in [`.env.example`].
 (for the purpose of easier testing - I presaved values in `.env.example` so that they can be used without changing (however, test user for Mongo Atlas is going to expire in a week))
 (I know it's bad, but resending access string from email to email to people, who will be checking, is not worth it)
 4. From there, use these commands for running/testing the project:
  - `npm run test`
  - `npm run test-debug`
  - `npm run test-coverage` (produces `/coverage/index.html` in project folder, which contains test coverage data)
  - `npm start`
  - `npm run debug`
 5. Go to `localhost:3000/api-docs` in your browser for further OpenAPI testing

Note:
Login as admin (email:admin@admin.com, password:admin) through `/auth` and enter the `accessToken` value under the `Authorize` button at the top of the page to use endpoints which require admin rights.

 # Stuff To Finish
 - better unit test structure (additional db / more beforeTest functions)
 - basic movie/favorites unit tests
 - deploy/containerize for easier checks
 
 # Stuff To Add
 - change _id to id
 - deactivation of authorization tokens
 - further containerization
 - creating additional db for test runs?
 - separate tests for controller/service/model
 - CI/CD
 - jsdoc for better documentation

 # Notes
 The biggest regret would be not having enough tests. Ended up spending too much time on configuring lint, and refactoring the code for the new config.
 The second biggest regret would be not containerizing/deploying the project, if it ends up not running on the machine of the person, who is going to be checking it :)

 Amount of the time spend: ~25? hard to tell, probably more

 I am most probably going to finish all of the things left in #stuffToFinish and #stuffToAdd in the next few weeks, as I'll partially use this project as a base for my pet project.

