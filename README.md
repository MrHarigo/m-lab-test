[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)
# Quick Start Guide
In order to run the cloned codebase directly, you need to have Node.js (>=12.0.0) and Docker installed.

1. Run `npm i` to install dependencies.
2. Run `sudo docker-compose up -d` to get a MongoDB instance running.
3. Make your own `.env` file in the project root, following the key name in [`.env.example`].
4. In the project directory run `mongorestore --nsInclude=api-db.users` to generate admin user 
(email: admin@admin.com, password: admin)
4. From there, use these commands for running/testing the project:
  - `npm run test`
  - `npm run test-debug`
  - `npm run test-coverage` (produces `/coverage/index.html` in project folder, which contains test coverage data)
  - `npm start`
  - `npm run debug`
5. Go to `localhost:3000/api-docs` in your browser for further OpenAPI testing

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

 Amount of the time spend: ~25? hard to tell.

 I am most probably going to finish all of the things left in #stuff to finish and #stuff to add in the next few weeks, as I'll partially use this project as a base for my pet project.

