<p align="center">
   <img src="https://avatars.githubusercontent.com/u/105833248?s=400&u=23db20e40ccd72d71fa4e22600335d2c8518a8b1&v=4" alt="talkware" width="280"/>
</p>

<p align="center">	
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/velloware/talkware?color=774DD6">

  <a href="https://github.com/velloware/talkware/commits">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/velloware/talkware?color=774DD6">
  </a> 
  <img alt="License" src="https://img.shields.io/badge/license-MIT-8257E5">
  <a href="https://github.com/velloware/talkware/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/velloware/talkware?color=8257E5&logo=github">
  </a>
</p>

<p align="center">
    <a href="README.md">English</a>
  
 </p>

# :pushpin: Table of Contents

- [Technologies](#computer-technologies)
- [How Works Application](#how-works)
- [Features](#rocket-features)
- [How to Run](#construction_worker-how-to-run)
- [Contributing](#tada-contributing)
- [License](#closed_book-license)

# :computer: Technologies

This project was made using the follow technologies:

- [typescript](https://www.typescriptlang.org/) - Super Javascript
- [Javascript](https://www.typescriptlang.org/)
- [Nodejs](http://nodejs.org/) - Nodejs
- [Jest](https://jestjs.io/) - UnitTest
- [ESlint](https://eslint.org/) - Linter
- [Prettier](https://prettier.io/) - Code Formatter

# :rocket: Features

- [x] Create User
- [x] LogIn and SingIn
- [x] Create Rooms
- [x] Join to Rooms
- [x] Join to Rooms Anonymous (Dont need LogIn)
- [x] Chat in real time in Room
- [ ] Voice Chat
- [ ] 100% Test Unit. for now at 80%

# how works

This application is backend.

- You can create Room and get Id, using this id your friends can Join in Room to talk, in Chat or Voice chat.
- You join Room using LogIn or Anonymous User

### THIS APPLICATION DONT PERSISTENCE OR SALVE MESSAGES OR LOGS, THIS CHAT IS FULL PRIVACITY AND SECURITY

# :construction_worker: How to run

### 💻 Run Web Project

```bash
# Clone Repository
$ git clone https://github.com/velloware/talkware.git

# Install Dependencies
$ npm ci i

# Run migrations Prisma
$ npm run prisma:dev

# Run Aplication
$ npm run dev
```

### Run Docker

```bash
# Clone Repository
$ git clone https://github.com/velloware/talkware.git

# Install Dependencies
$ sudo docker build -t "talkware-backend" .

# Run migrations Prisma
$ sudo docker run -p 5337:5337 -d talkware-backend
```

### Run Tests

```bash
# Run Test
$ npm run test

# Run Test Coverage
$ npm run test:coverage

```

Go to http://localhost:3333/ to see the result.

# Test log

```
=============================== Coverage summary ===============================
Statements   : 69.48% ( 230/331 )
Branches     : 58.97% ( 46/78 )
Functions    : 71.59% ( 63/88 )
Lines        : 69.44% ( 225/324 )
================================================================================

Test Suites: 16 passed, 16 total
Tests:       52 passed, 52 total
Snapshots:   0 total
Time:        7.731 s
```

# :tada: contributing

**file a new issue** with a respective title and description on the the [talkware](https://github.com/velloware/talkware/issues) repository. If you already found a solution to your problem, **i would love to review your pull request**!

# :closed_book: License

Released in 2022 :closed_book: License
This project is under the [MIT license](./LICENSE).
