# EmpowerNest Testing Setup Guide

This document provides a complete guide for running and writing tests in the EmpowerNest project.

## Quick Start

### Frontend Tests (Unit & Integration)
```bash
# Run tests in watch mode
npm run test

# Run tests once
npm run test:run

# Run tests with UI
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

### Backend Tests (Unit & Integration)
```bash
cd backend

# Run tests once
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### E2E Tests
```bash
# Run E2E tests
npm run e2e

# Run E2E tests in debug mode
npm run e2e:debug

# Run E2E tests with UI
npm run e2e:ui

# Run all tests (unit + E2E)
npm run test:all
```

---

## Testing Stack

### Frontend
- **Framework**: Vitest (built on Vite, faster than Jest)
- **Component Testing**: React Testing Library
- **E2E Testing**: Playwright
- **Coverage**: V8 provider

### Backend
- **Framework**: Jest
- **API Testing**: Supertest
- **Coverage**: Built-in Jest coverage

---

## Directory Structure

```
empowernest/
├── src/
│   ├── test/
│   │   ├── setup.ts              # Test configuration
│   │   ├── services/
│   │   │   └── api.test.ts       # API service tests
│   │   └── components/
│   │       └── LoginForm.test.tsx # Component tests
│   ├── services/
│   ├── components/
│   └── ...
├── e2e/
│   └── app.spec.ts               # E2E tests
├── vitest.config.ts              # Vitest configuration
├── playwright.config.ts          # Playwright configuration
│
└── backend/
    ├── __tests__/
    │   └── auth.test.ts          # API endpoint tests
    ├── jest.config.js            # Jest configuration
    ├── jest.setup.js             # Jest setup file
    └── ...
```

---

## Frontend Testing

### Unit Tests (Services)

Example: `src/test/services/api.test.ts`

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { tokenService } from '../services/api';

describe('Token Service', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return null when no token is stored', () => {
    const token = tokenService.getToken();
    expect(token).toBeNull();
  });

  it('should store and retrieve token', () => {
    const testToken = 'test-token-123';
    tokenService.setToken(testToken);
    
    const token = tokenService.getToken();
    expect(token).toBe(testToken);
  });
});
```

### Component Tests

Example: `src/test/components/LoginForm.test.tsx`

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from '../components/LoginForm';

describe('LoginForm Component', () => {
  it('should render form with inputs', () => {
    const mockLogin = vi.fn();
    render(<LoginForm onLogin={mockLogin} />);
    
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
  });

  it('should call onLogin on form submission', async () => {
    const user = userEvent.setup();
    const mockLogin = vi.fn().mockResolvedValue(undefined);
    
    render(<LoginForm onLogin={mockLogin} />);
    
    await user.type(screen.getByTestId('email-input'), 'test@example.com');
    await user.type(screen.getByTestId('password-input'), 'password123');
    await user.click(screen.getByTestId('submit-btn'));
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });
});
```

### Running Frontend Tests

```bash
# Watch mode (runs on file changes)
npm run test

# One-time run
npm run test:run

# With UI dashboard
npm run test:ui

# With coverage
npm run test:coverage
```

---

## Backend Testing

### API Endpoint Tests

Example: `backend/__tests__/auth.test.ts`

```typescript
import request from 'supertest';
import app from '../server'; // Your Express app

describe('Auth API', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });
      
      expect(response.status).toBe(201);
      expect(response.body.email).toBe('test@example.com');
    });

    it('should reject invalid password', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'short'
        });
      
      expect(response.status).toBe(400);
    });
  });
});
```

### Running Backend Tests

```bash
cd backend

# Watch mode
npm run test:watch

# One-time run
npm run test

# With coverage
npm run test:coverage
```

---

## E2E Testing

### Writing E2E Tests

Example: `e2e/app.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('should login successfully', async ({ page }) => {
    // Navigate to login page
    await page.goto('http://localhost:5173/login');
    
    // Fill form
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');
    
    // Submit
    await page.click('button[type="submit"]');
    
    // Assert redirect to dashboard
    await expect(page).toHaveURL(/dashboard/i);
  });
});
```

### Running E2E Tests

```bash
# Run all E2E tests
npm run e2e

# Run in debug mode (opens browser)
npm run e2e:debug

# Run with UI
npm run e2e:ui

# Run specific test file
npx playwright test e2e/app.spec.ts

# Run in headed mode (see browser)
npx playwright test --headed
```

---

## Best Practices

### Frontend Tests
1. **Use data-testid**: Make components testable by adding `data-testid` attributes
   ```tsx
   <input data-testid="email-input" />
   ```

2. **Mock external APIs**: Always mock API calls
   ```typescript
   vi.mock('../services/api', () => ({
     tokenService: {
       getToken: vi.fn(() => 'mock-token')
     }
   }));
   ```

3. **Test user interactions**: Use `userEvent` instead of `fireEvent`
   ```typescript
   await userEvent.click(button);
   await userEvent.type(input, 'text');
   ```

4. **Async operations**: Use `waitFor` for async operations
   ```typescript
   await waitFor(() => {
     expect(screen.getByText('Success')).toBeInTheDocument();
   });
   ```

### Backend Tests
1. **Separate concerns**: Create separate test files for each module
2. **Setup/Teardown**: Use `beforeEach` and `afterEach` for database cleanup
3. **Test HTTP methods**: Test GET, POST, PUT, DELETE separately
4. **Assert status codes**: Always check HTTP status codes
5. **Use fixtures**: Create test data fixtures for consistency

### E2E Tests
1. **Use baseURL**: Configure in `playwright.config.ts`
2. **Avoid hard waits**: Use `waitForNavigation()` or `waitForSelector()`
3. **Test critical paths**: Focus on user flows, not implementation details
4. **Use page objects**: Organize selectors for maintainability
5. **Responsive testing**: Test multiple viewports

---

## Debugging Tests

### Frontend
```bash
# Debug with UI
npm run test:ui

# Run single test file
npx vitest src/test/services/api.test.ts

# Run single test case
npx vitest -t "should return null when no token"
```

### Backend
```bash
cd backend

# Run single test file
npm run test -- auth.test.ts

# Verbose output
npm run test -- --verbose
```

### E2E
```bash
# Debug mode (opens browser)
npx playwright test --debug

# Headed mode (see browser)
npx playwright test --headed

# Specific test file
npx playwright test e2e/app.spec.ts
```

---

## Coverage Reports

### Frontend
```bash
npm run test:coverage
# View HTML report: coverage/index.html
```

### Backend
```bash
cd backend
npm run test:coverage
# View HTML report: coverage/index.html
```

---

## Continuous Integration

### GitHub Actions Example

Create `.github/workflows/test.yml`:

```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      # Frontend tests
      - run: npm install
      - run: npm run test:run
      - run: npm run test:coverage
      
      # Backend tests
      - run: npm install --prefix backend
      - run: npm run test --prefix backend
      
      # E2E tests
      - run: npx playwright install --with-deps
      - run: npm run e2e
```

---

## Troubleshooting

### Issue: Tests timeout
**Solution**: Increase timeout in config or specific test
```typescript
test('my test', async () => {
  // test code
}, { timeout: 10000 });
```

### Issue: localStorage not available
**Solution**: Already handled in `src/test/setup.ts`

### Issue: Module not found in tests
**Solution**: Ensure path aliases match in both `vite.config.ts` and `vitest.config.ts`

### Issue: E2E tests can't connect to app
**Solution**: Ensure dev server is running or configure in `playwright.config.ts`

---

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Jest Documentation](https://jestjs.io/)
- [Playwright Documentation](https://playwright.dev/)
- [Supertest Documentation](https://github.com/visionmedia/supertest)

---

## Next Steps

1. **Add more tests**: Use the provided examples as templates
2. **Set up CI/CD**: Add GitHub Actions or similar for automated testing
3. **Increase coverage**: Aim for 80%+ code coverage
4. **Review coverage reports**: `coverage/index.html` files show what needs more tests
5. **Run all tests before commits**: Use git hooks (husky) to enforce

---

**Questions or issues?** Check the example test files in this project for reference implementations.
