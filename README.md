# Tokibot.eu
Tokibot.eu is a project for a Discord bot with its own web dashboard, offering a range of useful features for server management. The bot will include a ticket system, allowing users to create and manage tickets to address various issues or requests. It will also feature user moderation, making it easier for server administrators to manage member behavior.

The bot will automatically welcome new users and allow them to assign roles based on preset rules. Another feature is the ability to obtain roles through reactions or buttons, simplifying user interaction. An important part of the project is multi-server support, where each Discord server will have its own individual settings, managed by an administrator. All these features will be manageable through an intuitive web interface.

# Run Locally
### Clone Project
```bash
git clone https://github.com/HuricanSpeed/tokibot.git
```

### Install NPM Package
```bash
cd (backend)/(dashboard)
npm install
```

### Setup .env by .env-template

### Run Servers
```bash
cd backend
npx ts-node-dev --respawn --transpile-only src/server.ts

cd dashboard
(dev enviroment)
ng serve -o
(production enviroment)
ng build
```

# Project Commit Naming
## Backend Commit Convetion
```bash
feat: The new feature you're adding to a particular application
fix: A bug fix
style: Feature and updates related to styling
refactor: Refactoring a specific section of the codebase
test: Everything related to testing
docs: Everything related to documentation
chore: Regular code maintenance.
```

### Additional conventions
```bash
(type)!: Breaking change
(type)(scope): Commit scope
```

## Frontend(Angular) Commit Convention
### Commit Convention Structure
```bash
<type>(<scope>): <short summary>
  │       │             │
  │       │             └─⫸ Summary in present tense. Not capitalized. No period at the end.
  │       │
  │       └─⫸ Commit Scope: animations|bazel|benchpress|common|compiler|    compiler-cli|core|
  │                          elements|forms|http|language-service|localize|platform-browser|
  │                          platform-browser-dynamic|platform-server|router|service-worker|
  │                          upgrade|zone.js|packaging|changelog|docs-infra|migrations|ngcc|ve|
  │                          devtools
  │
  └─⫸ Commit Type: build|ci|docs|feat|fix|perf|refactor|test
```

### Types
```bash
build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
ci: Changes to our CI configuration files and scripts (examples: CircleCi, SauceLabs)
docs: Documentation only changes
feat: A new feature
fix: A bug fix
perf: A code change that improves performance
refactor: A code change that neither fixes a bug nor adds a feature
test: Adding missing tests or correcting existing tests
revert: A commit that reverts previous commit of code
```

### Scopes
```bash
animations
bazel
benchpress
common
compiler
compiler-cli
core
elements
forms
http
language-service
localize
platform-browser
platform-browser-dynamic
platform-server
router
service-worker
upgrade
zone.js

packaging: used for changes that change the npm package layout in all of our packages, e.g. public path changes, package.json changes done to all packages, d.ts file/format changes, changes to bundles, etc.

changelog: used for updating the release notes in CHANGELOG.md

dev-infra: used for dev-infra related changes within the directories /scripts and /tools

docs-infra: used for docs-app (angular.io) related changes within the /aio directory of the repo

migrations: used for changes to the ng update migrations.

ngcc: used for changes to the Angular Compatibility Compiler

ve: used for changes specific to ViewEngine (legacy compiler/renderer).

devtools: used for changes in the browser extension.

none/empty string: useful for test and refactor changes that are done across all packages (e.g. test: add missing unit tests) and for docs changes that are not related to a specific package (e.g. docs: fix typo in tutorial).
```
# Built With

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![TypeScript](https://shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)