# Project Structure

## Root Directory Organization
```
avalanche-console/
├── app/                    # Next.js App Router (pages & API routes)
├── components/             # React components organized by purpose
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions and configurations
├── types/                  # TypeScript type definitions
├── constants/              # Application constants
├── styles/                 # Global styles
├── public/                 # Static assets
├── mocks/                  # MSW mock handlers
├── __tests__/              # Test utilities
└── docs/                   # Documentation
```

## App Directory (Next.js App Router)
- **`app/`** - Pages using file-based routing
- **`app/api/`** - API routes organized by feature
- **`app/globals.css`** - Global styles and CSS variables
- **`app/layout.tsx`** - Root layout with providers

## Component Organization
```
components/
├── ui/                     # shadcn/ui components (buttons, inputs, etc.)
├── common/                 # Shared/reusable components
├── forms/                  # Form-specific components
├── dashboard/              # Dashboard-specific widgets
├── charts/                 # Data visualization components
├── layout/                 # Layout components (headers, sidebars)
└── metrics/                # Metrics-related components
```

## Library Structure
```
lib/
├── api/                    # API client functions
├── utils.ts                # Common utilities (cn, copyToClipboard)
├── constants.ts            # App-wide constants
├── validation.ts           # Zod schemas
└── styles.ts               # Style utilities
```

## Naming Conventions

### Files & Directories
- **Components**: PascalCase (`UserProfile.tsx`)
- **Hooks**: camelCase with `use` prefix (`useSlider.ts`)
- **Utilities**: camelCase (`api-client.ts`)
- **Types**: camelCase (`analytics.ts`)
- **Constants**: camelCase (`code-examples.ts`)

### Component Patterns
- **Page Components**: Named after route (`page.tsx`)
- **Layout Components**: Descriptive names (`AppLayout.tsx`)
- **UI Components**: Match shadcn/ui conventions (`button.tsx`)

## Import Patterns
- Use path aliases: `@/components`, `@/lib`, `@/hooks`
- Group imports: React → Third-party → Internal
- Export patterns: Named exports preferred, default for pages/layouts

## File Organization Rules
- **One component per file** (except small related components)
- **Co-locate tests** with `__tests__` directories
- **Index files** for clean imports (`components/common/index.ts`)
- **Type definitions** in dedicated `types/` directory

## Testing Structure
- **Unit tests**: Adjacent to source files in `__tests__/` folders
- **Test utilities**: Centralized in `__tests__/utils/`
- **Mocks**: Global mocks in `mocks/` directory
- **Coverage**: Configured for 70% threshold across all metrics

## Configuration Files Location
- **Root level**: Package management, build tools, linting
- **App level**: Next.js, styling, type definitions
- **Hidden directories**: Git, IDE, build artifacts