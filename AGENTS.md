# Agent Guidelines for SvelteKit Blog

## Build/Lint/Test Commands

### Development

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### Code Quality

- `npm run check` - Type check with svelte-check and sync
- `npm run check:watch` - Watch mode for type checking
- `npm run lint` - Run Prettier and ESLint
- `npm run format` - Auto-format with Prettier

### Database

- `npm run drizzle:generate` - Generate database schema
- `npm run drizzle:migrate` - Run database migrations
- `npm run drizzle:seed` - Seed database with test data

## Code Style Guidelines

### Formatting (Prettier)

- Double quotes (`"`)
- No trailing commas
- 70 character line width
- Svelte plugin enabled

### TypeScript

- Strict mode enabled
- PascalCase for interfaces and types
- camelCase for variables and functions
- Explicit return types for exported functions

### Svelte Components

- PascalCase for component names (e.g., `BasicButton.svelte`)
- Use Svelte 5 `$props()` syntax
- TypeScript interfaces for component props
- Use `Snippet` type for children/icon slots

### Imports

- `$lib/` for internal library imports
- Relative imports for local files
- Group imports: external libs, then internal, then types
- Use `.js` extension in TypeScript imports (ES modules)

### Naming Conventions

- Components: PascalCase
- Variables/Functions: camelCase
- Files: PascalCase for components, camelCase for utilities
- Directories: lowercase with hyphens if needed

### Error Handling

- Use try/catch blocks for async operations
- Return early with descriptive error messages
- Use `fail()` and `message()` from sveltekit-superforms

### Styling

- Tailwind CSS with custom utilities
- Use `cn()` utility for conditional classes
- Dark mode support with `dark:` prefixes
- Responsive design with Tailwind breakpoints

### Database

- Drizzle ORM with PostgreSQL
- Use schema files for type safety
- Follow existing migration patterns
