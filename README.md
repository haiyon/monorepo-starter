# Monorepo Starter

A modern monorepo starter template using pnpm workspaces with Turborepo.

## Features

- 📦 [PNPM](https://pnpm.io/) for fast, disk space efficient package management
- ⚡️ [Turborepo](https://turborepo.org/) for high-performance build system
- 🔧 [TypeScript](https://www.typescriptlang.org/) for static type checking
- 🎨 [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- 🧪 [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) for code quality
- 🪝 [Husky](https://typicode.github.io/husky/#/) + [Commitlint](https://commitlint.js.org/) for git hooks

## Project Structure

```text
.
├── apps/                 # Application packages
│   ├── web/              # React frontend application
│   └── server/           # NestJS backend application
├── packages/             # Shared packages
│   ├── tsconfig/         # Shared TypeScript configurations
│   ├── tailwind/         # Shared Tailwind CSS configurations
│   ├── types/            # Shared TypeScript types
│   └── utils/            # Shared utility functions
├── plugins/              # Custom plugins and extensions
└── docs/                 # Documentation
```

### Apps

The `apps` directory contains end-user applications:

- `web`: React frontend application with Vite
- `server`: NestJS backend application

### Packages

The `packages` directory contains reusable internal packages:

- `tsconfig`: Shared TypeScript configurations for different types of projects
- `tailwind`: Common Tailwind CSS configuration and design tokens
- `types`: Shared TypeScript type definitions
- `utils`: Common utility functions and helpers

### Plugins

The `plugins` directory is designed for extensibility:

- Project-specific plugin systems for apps
- Shared/common plugins that can be used across different applications
- Plugin infrastructure and utilities
- Plugin development tools and templates

You can implement plugin mechanisms for your applications (apps/*) while also providing reusable plugins for common functionality.

## Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/haiyon/monorepo-starter.git

# Install dependencies
pnpm install
```

### Development

```bash
# Start all applications in development mode
pnpm dev

# Start only the web application
pnpm dev:web

# Start only the server application
pnpm dev:server
```

### Building

```bash
# Build all packages and applications
pnpm build

# Build only the web application
pnpm build:web

# Build only the server application
pnpm build:server
```

### Testing

```bash
# Run all tests
pnpm test

# Run tests with coverage
pnpm test:coverage
```

### Linting

```bash
# Run linting
pnpm lint

# Fix linting issues
pnpm lint:fix
```

## Adding New Applications

To add a new application to the monorepo:

1. Create a new directory in the `apps` folder
2. Initialize your application
3. Add the application to `pnpm-workspace.yaml`
4. Add corresponding scripts to the root `package.json`

## Adding New Packages

To add a new shared package:

1. Create a new directory in the `packages` folder
2. Initialize your package with `package.json`
3. Add the package to `pnpm-workspace.yaml`
4. Reference it in other packages/apps using `workspace:*` version

## Git Workflow

This repository uses conventional commits for consistent commit messages:

```bash
type(scope): subject

body

footer
```

Common types:

- feat: A new feature
- fix: A bug fix
- docs: Documentation changes
- style: Code style changes
- refactor: Code refactoring
- test: Adding or updating tests
- chore: Maintenance tasks

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
