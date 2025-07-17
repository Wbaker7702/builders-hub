# Avalanche Console Components

A collection of reusable React components, hooks, and utilities for the Avalanche Developer Console.

## Architecture

The Avalanche Console is built with a modular, component-based architecture focusing on:
- **Reusability**: Common patterns extracted into shared components
- **Type Safety**: Full TypeScript support with centralized type definitions
- **Performance**: Optimized with React best practices (memo, useCallback, useMemo)
- **Error Handling**: Comprehensive error boundaries and error logging
- **Accessibility**: ARIA labels and keyboard navigation support

## Directory Structure

```
components/avalanche-console/
├── common/              # Reusable UI components
├── constants/           # Centralized configuration
├── dashboard/           # Dashboard-specific components
├── forms/               # Form components and utilities
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and helpers
├── types/               # TypeScript type definitions
├── ui/                  # UI primitives and wrappers
└── HomePage.tsx         # Main dashboard component
```

## Key Components

### Common Components

#### CopyButton
A button component with built-in copy-to-clipboard functionality.
```tsx
import { CopyButton } from '@/components/avalanche-console';

<CopyButton text="Text to copy" successMessage="Copied!" />
```

#### DataTable
A flexible table component with type-safe column definitions.
```tsx
import { DataTable, Column } from '@/components/avalanche-console';

const columns: Column<User>[] = [
  {
    key: 'name',
    header: 'Name',
    cell: (user) => user.name,
  },
];

<DataTable 
  data={users} 
  columns={columns} 
  keyExtractor={(user) => user.id} 
/>
```

#### CodeBlock
A code display component with syntax highlighting and copy functionality.
```tsx
import { CodeBlock } from '@/components/avalanche-console';

<CodeBlock code={codeString} language="javascript">
  {codeString}
</CodeBlock>
```

### Custom Hooks

#### useCopyToClipboard
Handles clipboard operations with success/error notifications.
```tsx
const { copy, copiedText } = useCopyToClipboard();
await copy('Text to copy', 'Custom success message');
```

#### useApiCall
Manages API calls with loading states and error handling.
```tsx
const { data, error, isLoading, execute } = useApiCall(apiFunction);
await execute(params);
```

#### useForm
Form state management with validation support.
```tsx
const form = useForm({
  initialValues: { name: '' },
  validate: (values) => ({ /* validation rules */ }),
  onSubmit: async (values) => { /* handle submission */ },
});
```

### Error Handling

The console includes comprehensive error handling:
- **ErrorBoundary**: Catches and displays component errors gracefully
- **useErrorHandler**: Hook for consistent error handling
- **errorLogger**: Centralized error logging with fingerprinting

### Type Safety

All components use TypeScript with centralized type definitions:
```tsx
import { ApiKey, Webhook, RpcEndpoint } from '@/components/avalanche-console/types';
```

### Constants

Centralized configuration for easy maintenance:
```tsx
import { API_URLS, NETWORKS, TOKENS, MESSAGES } from '@/components/avalanche-console/constants';
```

## Best Practices

1. **Component Composition**: Build complex UIs from smaller, reusable components
2. **Type Safety**: Always define proper TypeScript interfaces
3. **Performance**: Use React.memo for expensive components
4. **Error Handling**: Wrap components with error boundaries
5. **Accessibility**: Include proper ARIA labels and keyboard support

## Usage Example

```tsx
import {
  ConsolePage,
  ConsoleTitle,
  ConsoleBody,
  DataTable,
  CopyButton,
  useApiCall,
  API_URLS,
} from '@/components/avalanche-console';

export default function MyConsolePage() {
  const { data, isLoading, execute } = useApiCall(fetchData);

  return (
    <ConsolePage>
      <ConsoleTitle>My Console Page</ConsoleTitle>
      <ConsoleBody>
        <DataTable
          data={data || []}
          columns={columns}
          keyExtractor={(item) => item.id}
        />
      </ConsoleBody>
    </ConsolePage>
  );
}
```

## Development Guidelines

1. **Keep components small and focused**: Each component should have a single responsibility
2. **Use composition over inheritance**: Build complex components from simpler ones
3. **Maintain consistency**: Follow the established patterns and naming conventions
4. **Document complex logic**: Add comments for non-obvious implementations
5. **Test edge cases**: Consider loading states, errors, and empty states

## Future Enhancements

- [ ] Add unit tests for all components
- [ ] Implement Storybook for component documentation
- [ ] Add more chart/visualization components
- [ ] Enhance accessibility with screen reader testing
- [ ] Add internationalization support 