<h1 align="center">WS-CORESERVER</h1>

### INTRODUCE

The **WS-CoreServer** project is a modern API Server built with NestJS using a microservices architecture, leveraging Kafka for communication, designed for collaborative workspaces, and deployed on MAU for seamless hosting and scalability.

### PROJECT STRUCTURE

```
WS-CoreServer/
◉ apps/                    # Contains the main application code for microservices
» ◉ api-gateway/           # API Gateway microservice
» ◉ auth-service/          # Authentication microservice
» ◉ task-manager-service/  # Task Manager microservice
» ◉ worspace-service/      # Workspace microservice
◉ .gitignore               # Files and folders to ignore in Git
◉ .prettierrc              # Prettier configuration for code formatting
◉ eslint.config.mjs        # ESLint configuration for linting
◉ nest-cli.json            # NestJS CLI configuration file
◉ package.json             # Project dependencies and scripts
◉ pnpm-lock.yaml           # Lock file for pnpm package manager
◉ README.md                # Project documentation and setup guide
◉ tsconfig.build.json      # TypeScript configuration for building the project
◉ tsconfig.json            # TypeScript configuration file
```
### INSTALL DEPENDENCIES

```sh
pnpm install
```

### RUN KAFKA SERVER

```sh
docker-compose up -d
```

### RUN PROJECT

```sh
# development
pnpm run start

# watch mode
pnpm run start:dev

# watch mode concurrently
pnpm run ws-server

# production mode
pnpm run start:prod
```

### RUN TEST

```sh
# unit tests
pnpm run test

# e2e tests
pnpm run test:e2e

# test coverage
pnpm run test:cov
```

### DEPLOYMENT
This project is deployed on MAU.If you are looking for a cloud-based platform to deploy your NestJS application, check out MAU, our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps : 

```sh
pnpm install -g @nestjs/mau
mau deploy
```
With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

### AUTHOR

-  **NV-Phong**
-  Email: `ui.engineer.workspace@gmail.com`