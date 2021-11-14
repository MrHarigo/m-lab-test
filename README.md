[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)
# Quick Start Guide
In order to run the cloned codebase directly, you need to have Node.js and Docker installed.

1. Run `npm i` to install dependencies.
2. Run `sudo docker-compose up -d` to get a MongoDB instance running.
3. Make your own `.env` file in the project root, following the key name in [`.env.example`].
4. From there, use these commands for running/testing the project:
  - `npm run test`
  - `npm run test-debug`
  - `npm start`
  - `npm run debug`

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

# Manual Testing Guide
 //
