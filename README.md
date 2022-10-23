<h1 align="center">Template-nodejs-typescript-dev</h1>

<p align="center">
  <a href="#about">Sobre este projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#recursos">Recursoso</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#license">License</a>
</p>

## :notebook: Sobre este projeto

<div id="about"></div>

Template para criação de projetos em nodejs usando typescript e testes automatizados.

## Tecnologias 🐱‍🏍🎂

<div id="tecnologias"></div>

- [Node](http://nodejs.org/) - Nodejs
- [typescript](https://www.typescriptlang.org/) - Super Javascript
- [Jest](https://jestjs.io/) - UnitTest

### Recursos

<div id="recursos"></div>

- [x] Configuração para Typescript
- [x] Configuração para modules
- [x] Configuração para Testes unitarios

### Tree

```bash
├───src
│   ├───infra
│   │   ├───http
│   │   │   └───routes
│   │   ├───prisma
│   │   ├───process
│   │   └───ws
│   │       └───events
│   ├───shared
│   │   ├───Error
│   │   ├───Utils
│   │   └───Config
│   │       └───jwt
│   ├───core
│   │   ├───domain
│   │   └───logic
│   ├───@types
│   └───modules
│       ├───Client
│       │   └───Domain
│       │       └───Errors
│       ├───Room
│       │   └───Services
│       │       └───Errors
│       ├───Chat
│       │   └───Domain
│       │       ├───Client
│       │       ├───Room
│       │       └───Message
│       └───User
│           ├───mappers
│           ├───useCases
│           │   ├───AuthenticateUser
│           │   │   ├───infra
│           │   │   │   └───http
│           │   │   │       └───Controllers
│           │   │   └───Errors
│           │   └───CreateUser
│           │       ├───infra
│           │       │   └───http
│           │       │       └───Controllers
│           │       └───Errors
│           ├───Domain
│           │   └───Errors
│           └───repositories
│               ├───prisma
│               └───InMemory
```

## License

<div id="license"></div>

MIT [LICENSE](LICENSE.md)
