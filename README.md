# Monorepo Starter

A modern monorepo starter template for building multilingual applications with React, Tailwind CSS, and TypeScript.

## Key Features

- 📦 PNPM workspaces for efficient package management
- ⚡️ Vite for fast development experience
- 🌐 Internationalization (i18n) with English and Chinese support
- 🔧 TypeScript for type safety
- 🎨 Tailwind CSS for styling
- 🧩 Component-based architecture
- 📱 Responsive design for all devices
- 🔄 Hot module replacement during development

## Project Structure

```text
.
├── apps/                 # Application packages
│   └── web/              # React frontend application
├── packages/             # Shared packages
│   ├── ui/               # Shared UI components
│   ├── types/            # Shared TypeScript types
│   └── utils/            # Shared utility functions
├── plugins/              # Custom plugins and extensions
└── docs/                 # Documentation
```

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- PNPM (v8 or later)

### Installation

```bash
# Clone the repository
git clone https://github.com/haiyon/monorepo-starter.git

# Navigate to project directory
cd monorepo-starter

# Install dependencies
pnpm install
```

### Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Lint code
pnpm lint
```

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

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
