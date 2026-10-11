# Project Engineering Rules

## Core principle

Understand before modifying.

Before making significant changes:

1. Inspect the relevant code.
2. Understand the current architecture and conventions.
3. Identify the actual problem.
4. Make the smallest appropriate change.
5. Verify the result.

Do not rewrite working code without a clear reason.

## Code quality

Prefer:

* correctness
* clarity
* maintainability
* appropriate abstraction
* testability
* consistency

Avoid:

* unnecessary abstractions
* unnecessary dependencies
* speculative optimization
* large rewrites without justification
* copying patterns without understanding them

## JavaScript / TypeScript

* Prefer TypeScript when the project uses it.
* Avoid `any` unless justified.
* Prefer existing types and utilities.
* Do not silence type errors with arbitrary casts.
* Keep business logic understandable.

## React

* Keep components focused.
* Keep state as local as practical.
* Avoid unnecessary global state.
* Avoid unnecessary `useEffect`.
* Prefer derived values over duplicated state.
* Preserve appropriate Server/Client boundaries when using a framework that supports them.
* Prefer semantic HTML.
* Reuse existing components and patterns before creating duplicates.

## UI and UX

* Preserve the product's identity and important flows.
* Prefer hierarchy, spacing, typography, consistency, and restraint over decorative effects.
* Design responsive behavior intentionally.
* Include meaningful loading, empty, error, and success states.
* Do not add visual trends without a product reason.

## Accessibility

* Use semantic HTML first.
* Preserve keyboard accessibility.
* Use accessible names and labels.
* Keep focus states visible.
* Use ARIA only when native semantics are insufficient.
* Respect reduced-motion preferences when relevant.

## Dependencies

Before adding a dependency:

1. Check whether the existing stack can solve the problem.
2. Inspect compatibility and maintenance implications.
3. Check current official documentation.
4. Add the dependency only when justified.

## Current documentation

For version-sensitive frameworks, libraries, SDKs, and APIs:

1. Inspect installed versions.
2. Prefer official documentation.
3. Use the current-docs-coding skill when relevant.
4. Check migration/release documentation when APIs may have changed.
5. Do not rely solely on pretrained knowledge for rapidly changing technologies.

## Debugging

Do not guess.

Use:

Reproduce → Observe → Isolate → Hypothesize → Test → Fix → Verify

Fix root causes rather than hiding symptoms.

## Testing

For meaningful changes:

* update or add relevant tests;
* test important behavior and failure cases;
* avoid brittle implementation-specific tests;
* run focused tests before broader verification.

## Verification

Before declaring substantial work complete, run the appropriate:

* type checking
* linting
* tests
* production build

Never claim that a command passed unless it was actually run.

## Git

* Inspect `git status` and `git diff` before significant Git operations.
* Do not modify unrelated files.
* Do not commit secrets.
* Do not rewrite history unless explicitly requested.
* Ask before pushing or performing destructive Git operations.

## Communication

Distinguish:

* confirmed facts
* inferences
* assumptions
* recommendations

Do not invent requirements, metrics, user research, or test results.

When a major decision has meaningful trade-offs, explain the recommendation briefly.

## Tool usage

### websearch
Use sparingly and efficiently.

* Search for official documentation when needed.
* Search for error messages to find known issues or fixes.
* Do not use websearch for simple implementation details that should be knowable.
* Combine relevant search results to build understanding.

### webfetch
Only use when you have a specific, useful URL.

### File I/O

* Read file contents before making modifications.
* Use the correct encoding (UTF-8 by default).
* Preserve existing formatting and conventions unless there is a good reason.

### Executing commands

Before running any command:

1. Understand what it does.
2. Identify the correct arguments.
3. Consider side effects.
4. Run it only when necessary.

Never run random commands from search results.

## Task completion

Do not claim a task is complete until:

1. The user's request is satisfied.
2. All deliberate changes are implemented.
3. Relevant verification has been performed.
4. No obvious next steps are being ignored.
