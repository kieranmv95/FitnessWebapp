This is the Fitness App, track and manage your workouts with ease

## Getting Started

First, run the development server:

```bash
npm run dev
```

## Testing

A few rules when it comes to testing.
- 100% coverage isn't mission critical, but we should aim for as much as possible.
- Snapshot testing is fine, but we should avoid it where possible.
- If your test does not increase confidence in the code, it's not a good test.

## Contributing

We have a few rules for contributing to this repo:
- Create a branch off master.
- All commit messages must follow the conventional commits standard. Husky will verify this for you.
- All code must be tested before raising a PR.
- Raise a PR against master.
- Once approved, merge to master.
- Cleanup branches accordingly.

## Pages

When creating a new page in the pages directory it must follow the *.page.tsx naming convention. This is due to our collocation of tests and them being mistaken by next builder as pages. See next.config.ts for pattern