# Technology Stack

## Core Framework
- **Next.js 15** with App Router - React framework with server-side rendering
- **React 19** - Latest React features including concurrent rendering
- **TypeScript 5** - Type-safe development with strict mode enabled

## Styling & UI
- **Tailwind CSS 3.4** - Utility-first CSS framework with custom design system
- **Radix UI** - Accessible component primitives for complex UI components
- **shadcn/ui** - Pre-built component library based on Radix UI
- **Lucide React** - Icon library
- **next-themes** - Theme switching (dark/light mode)

## State Management & Data
- **SWR** - Data fetching and caching
- **React Hook Form** - Form state management with validation
- **Zod** - Schema validation
- **Recharts** - Data visualization and charts

## Development Tools
- **ESLint** - Code linting with Next.js and TypeScript rules
- **Jest** - Unit testing framework
- **Testing Library** - React component testing utilities
- **MSW (Mock Service Worker)** - API mocking for testing

## Package Management
- **pnpm** - Fast, disk space efficient package manager

## Common Commands

### Development
```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix ESLint issues automatically
pnpm type-check   # Run TypeScript type checking
```

### Testing
```bash
pnpm test         # Run tests
pnpm test:watch   # Run tests in watch mode
pnpm test:coverage # Run tests with coverage report
```

### Analysis
```bash
pnpm analyze      # Analyze bundle size
```

## Key Configurations
- **TypeScript**: Strict mode enabled, path aliases configured (`@/*`)
- **ESLint**: Next.js + TypeScript rules, unused vars as errors
- **Jest**: Coverage thresholds set to 70% across all metrics
- **Tailwind**: Custom design system with Vercel Geist typography
- **Next.js**: Image optimization, bundle analysis, production optimizations enabled