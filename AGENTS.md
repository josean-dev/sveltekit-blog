# Agent Instructions for SvelteKit Blog

## Build/Lint/Test Commands

### Development

- `npm run dev` - Start development server with host binding
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Code Quality

- `npm run check` - Type checking with svelte-check
- `npm run check:watch` - Type checking in watch mode
- `npm run lint` - Run Prettier and ESLint
- `npm run format` - Format code with Prettier

### Database

- `npm run drizzle:generate` - Generate database schema
- `npm run drizzle:migrate` - Run database migrations
- `npm run drizzle:seed` - Seed database with test data
- `npm run drizzle:studio` - Open Drizzle Studio

## Code Style Guidelines

### TypeScript

- Use strict TypeScript with `strict: true`
- Define explicit types for function parameters and return values
- Use interface declarations for component props
- Export inferred types: `export type SelectType = typeof table.$inferSelect`

### Imports

- Use ES6 imports with named imports
- Import types explicitly: `import type { Snippet } from "svelte"`
- Use `$lib` alias for internal imports
- Group imports: external libraries first, then internal imports

### Formatting

- Double quotes (`"`) for strings
- No trailing commas
- 70 character line width
- 2 spaces for indentation (Prettier handles this)

### Naming Conventions

- PascalCase for component names and interfaces
- camelCase for variables, functions, and properties
- kebab-case for file names
- snake_case for database columns (following Drizzle conventions)

### Svelte Specific

- Use TypeScript in script tags: `<script lang="ts">`
- Use Svelte 5 runes: `$props()`, `$state()`, etc.
- Use `cn()` utility for conditional Tailwind classes
- Follow SvelteKit file naming conventions

### Error Handling

- Use ESLint with TypeScript and Svelte rules
- Disable unnecessary rules like `@typescript-eslint/no-inferrable-types`
- Use `svelte/no-reactive-reassign: "warn"` for reactive assignments

### Database

- Use Drizzle ORM with PostgreSQL
- Define relations explicitly with `relations()` function
- Use snake_case for database column names
- Include `createdAt` and `updatedAt` timestamps on all tables

### Styling

- Use Tailwind CSS with custom dark mode
- Follow component-based styling approach
- Use Tailwind Typography plugin for prose content
- Custom color palette with dark-blue variants

### Component Structure

- Use interface Props for component properties
- Destructure props with default values
- Use snippets for flexible content rendering
- Follow established patterns from bits-ui and formsnap
