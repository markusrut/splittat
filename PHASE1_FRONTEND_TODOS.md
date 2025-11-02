# Phase 1: Frontend Tasks

**Parent Document**: [PHASE1_TODOS.md](PHASE1_TODOS.md)

**Last Updated**: 2025-11-02
**Status**: 5% Complete - Basic Vite setup done

---

## 9. Project Setup

### 9.1 Initialize React Project
- [x] Create `frontend` directory
- [x] Initialize Vite + React 19 + TypeScript
- [x] Install and run dev server to verify setup
- [ ] Clean up default Vite template files (still showing counter template)

### 9.2 Install Dependencies
- [ ] Install core dependencies:
  ```bash
  npm install react-router-dom @tanstack/react-query zustand axios
  ```
- [ ] Install dev dependencies:
  ```bash
  npm install -D tailwindcss postcss autoprefixer
  ```
- [ ] Install UI libraries:
  ```bash
  npm install lucide-react
  npm install react-hook-form @hookform/resolvers zod
  ```

### 9.3 TailwindCSS Setup
- [ ] Initialize Tailwind:
  ```bash
  npx tailwindcss init -p
  ```
- [ ] Configure `tailwind.config.js` with content paths
- [ ] Add Tailwind directives to `index.css`
- [ ] Test with simple Tailwind classes

---

## 10. Project Structure

### 10.1 Create Folder Structure
- [ ] Create folders:
  - `src/components/ui/`
  - `src/components/layout/`
  - `src/components/receipt/`
  - `src/pages/`
  - `src/api/`
  - `src/hooks/`
  - `src/store/`
  - `src/types/`
  - `src/utils/`
- [ ] Create `index.ts` barrel exports where needed

### 10.2 TypeScript Configuration
- [ ] Configure `tsconfig.json` for absolute imports
- [ ] Add path aliases (@/ for src/)
- [ ] Enable strict mode

---

## 11. API Client Setup

### 11.1 Axios Configuration
- [ ] Create `src/api/client.ts`:
  - Configure base URL (localhost:5000 for dev)
  - Add request interceptor for JWT token
  - Add response interceptor for error handling
  - Export axios instance

### 11.2 TanStack Query Setup
- [ ] Create `src/api/queryClient.ts`
- [ ] Configure QueryClient with defaults
- [ ] Wrap app with QueryClientProvider in `main.tsx`

### 11.3 API Type Definitions
- [ ] Create `src/types/index.ts`:
  - User type
  - LoginRequest, RegisterRequest types
  - AuthResponse type
  - Receipt, ReceiptItem types
  - ReceiptResponse type
  - ApiError type

### 11.4 Auth API
- [ ] Create `src/api/auth.ts`:
  - `login(email, password)` function
  - `register(data)` function
  - Return typed responses

### 11.5 Receipts API
- [ ] Create `src/api/receipts.ts`:
  - `uploadReceipt(file)` function
  - `getReceipts()` function
  - `getReceiptById(id)` function
  - `updateReceiptItems(id, items)` function
  - `deleteReceipt(id)` function

---

## 12. State Management

### 12.1 Auth Store (Zustand)
- [ ] Create `src/store/authStore.ts`:
  - State: user, token, isAuthenticated
  - Actions: login, logout, setUser
  - Persist token to localStorage
  - Auto-load token on app start

### 12.2 Auth Hook
- [ ] Create `src/hooks/useAuth.ts`:
  - Wrap auth store
  - Add login mutation (TanStack Query)
  - Add register mutation
  - Add logout function
  - Handle token expiration

---

## 13. Routing & Navigation

### 13.1 Setup React Router
- [ ] Configure React Router in `App.tsx`:
  - BrowserRouter
  - Routes with path matching
- [ ] Create route structure:
  - `/` - Home (public)
  - `/login` - Login page
  - `/register` - Register page
  - `/receipts` - Receipts list (protected)
  - `/receipts/:id` - Receipt detail (protected)

### 13.2 Protected Routes
- [ ] Create `ProtectedRoute` component:
  - Check authentication status
  - Redirect to login if not authenticated
  - Allow access if authenticated

---

## 14. Layout Components

### 14.1 Main Layout
- [ ] Create `src/components/layout/Layout.tsx`:
  - Header component
  - Main content area
  - Responsive container

### 14.2 Header
- [ ] Create `src/components/layout/Header.tsx`:
  - App logo/title
  - Navigation links
  - User menu (logout)
  - Mobile-responsive hamburger menu

---

## 15. Authentication Pages

### 15.1 Login Page
- [ ] Create `src/pages/LoginPage.tsx`:
  - Email input
  - Password input
  - Submit button
  - Link to register page
  - Form validation with React Hook Form + Zod
  - Error display
  - Loading state
  - Redirect after successful login

### 15.2 Register Page
- [ ] Create `src/pages/RegisterPage.tsx`:
  - First name input
  - Last name input
  - Email input
  - Password input
  - Confirm password input
  - Submit button
  - Link to login page
  - Form validation
  - Error display
  - Loading state
  - Redirect after successful registration

---

## 16. Receipt Components

### 16.1 Receipt Scanner/Upload
- [ ] Create `src/components/receipt/ReceiptScanner.tsx`:
  - File input button
  - Camera capture (if supported)
  - Image preview before upload
  - Upload progress indicator
  - Error handling
  - Success feedback

### 16.2 Camera Hook
- [ ] Create `src/hooks/useCamera.ts`:
  - Check camera permission
  - Capture photo from camera
  - Handle camera errors
  - Convert to file for upload

---

## 17. Receipt Pages

### 17.1 Receipts List Page
- [ ] Create `src/pages/ReceiptsPage.tsx`:
  - Display list of user receipts
  - Show receipt card with:
    - Merchant name
    - Date
    - Total amount
    - Thumbnail
  - Click to view details
  - Upload new receipt button
  - Empty state (no receipts yet)
  - Loading skeleton
  - Error state
  - Use TanStack Query for data fetching

### 17.2 Receipt Detail Page
- [ ] Create `src/pages/ReceiptDetailPage.tsx`:
  - Display receipt image
  - Show merchant, date, total
  - List all items with prices
  - Edit button for manual corrections
  - Delete receipt button
  - Back navigation
  - Loading state
  - Error handling

### 17.3 Receipt Viewer Component
- [ ] Create `src/components/receipt/ReceiptViewer.tsx`:
  - Display receipt image (zoomable)
  - Show metadata
  - List items in table format
  - Responsive design

---

## 18. UI Components

### 18.1 Reusable Components
- [ ] Create `src/components/ui/Button.tsx`:
  - Variants (primary, secondary, danger)
  - Sizes (sm, md, lg)
  - Loading state
  - Disabled state
- [ ] Create `src/components/ui/Input.tsx`:
  - Text, email, password types
  - Error state
  - Label support
- [ ] Create `src/components/ui/Card.tsx`:
  - Flexible container
  - Shadow and border styling
- [ ] Create `src/components/ui/Loading.tsx`:
  - Spinner component
  - Skeleton loader
- [ ] Create `src/components/ui/ErrorMessage.tsx`:
  - Display API errors
  - Dismissible alerts

---

## 19. Utilities

### 19.1 Formatters
- [ ] Create `src/utils/formatters.ts`:
  - `formatCurrency(amount)` - Format as dollar amount
  - `formatDate(date)` - Format date strings
  - `formatDateTime(date)` - Format with time

### 19.2 Validators
- [ ] Create validation schemas with Zod:
  - Email validation
  - Password requirements (min length, complexity)
  - File size/type validation

---

## 20. Testing & Integration

### 20.1 End-to-End Testing
- [ ] Test user registration flow
- [ ] Test user login flow
- [ ] Test receipt upload with sample image
- [ ] Test receipt list display
- [ ] Test receipt detail view
- [ ] Test manual item editing
- [ ] Test receipt deletion

### 20.2 Error Scenarios
- [ ] Test invalid login credentials
- [ ] Test duplicate email registration
- [ ] Test unauthorized access to protected routes
- [ ] Test invalid file upload
- [ ] Test OCR failure handling
- [ ] Test network errors

### 20.3 Responsive Design
- [ ] Test on mobile viewport (375px)
- [ ] Test on tablet viewport (768px)
- [ ] Test on desktop viewport (1280px+)
- [ ] Test touch interactions
- [ ] Test camera access on mobile

---

## Frontend Success Criteria

- [ ] Frontend running on localhost:5173
- [ ] User can register a new account via UI
- [ ] User can login with email/password via UI
- [ ] JWT token persists in localStorage
- [ ] Protected routes redirect to login when not authenticated
- [ ] User can upload receipt image via camera or file picker
- [ ] User can view list of all their receipts
- [ ] User can view receipt details with items
- [ ] User can manually edit receipt items
- [ ] User can delete a receipt
- [ ] Mobile-responsive design (works on 375px width)
- [ ] Error messages display properly
- [ ] Loading states show during API calls

---

## Notes

- Focus on mobile-first design
- Keep UI simple and functional
- Test each component as you build it
- Use TailwindCSS utility classes for styling
- Ensure all forms have proper validation
- Handle loading and error states consistently
