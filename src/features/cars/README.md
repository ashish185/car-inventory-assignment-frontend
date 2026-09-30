# Your work goes here

Suggested layout, adapted from [bulletproof-react](https://github.com/alan2207/bulletproof-react).
It is a suggestion, not a requirement — use a structure you can defend.

```
src/features/cars/
├── api/          # GraphQL documents (one file per query/mutation)
├── components/   # Feature-specific components
├── hooks/        # useCars, useCarFilters, ...
├── pages/        # Route-level containers
├── types/        # Feature types
└── utils/
```

Shared, non-feature-specific building blocks (buttons, cards, grids, empty
states) belong in `src/components/ui/`.
