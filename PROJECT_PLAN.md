# Receipt Scanner & Cost Splitter - Project Plan

## Overview

A mobile-first web application (PWA) that allows users to scan receipts, automatically extract items using OCR, and split costs among multiple people or groups.

## System Architecture

```
┌──────────────────────────────────────────────────────────┐
│         React 19 PWA Frontend (Vite)                     │
│  - Mobile-first responsive UI                            │
│  - Camera integration for receipt capture                │
│  - Item assignment & split calculator                    │
│  - Group management                                      │
│  - Offline support (PWA)                                 │
└────────────────────┬─────────────────────────────────────┘
                     │ REST API (JSON)
┌────────────────────▼─────────────────────────────────────┐
│         .NET 8 Backend (Minimal API)                     │
│  - JWT Authentication                                    │
│  - Receipt processing endpoints                         │
│  - Cost splitting logic                                 │
│  - User & group management                              │
└──────┬────────────────────┬──────────────────────────┬───┘
       │                    │                          │
  ┌────▼────┐    ┌──────────▼──────────┐    ┌─────────▼────────┐
  │PostgreSQL│    │   OCR Service       │    │ File Storage     │
  │ (EF Core)│    │ (Google Vision/AWS) │    │ (S3/Local/Azure) │
  └──────────┘    └─────────────────────┘    └──────────────────┘
```

---

## Tech Stack

### Frontend
- **React 19** + **TypeScript**
- **Vite** (build tool & dev server)
- **TailwindCSS** (styling)
- **React Router** (routing)
- **TanStack Query** (server state management)
- **Zustand** (client state management)
- **Vite PWA Plugin** (PWA capabilities)
- **Capacitor** (optional: native mobile wrapper for Play Store)
- **React Hook Form** + **Zod** (form validation)
- **Lucide React** (icons)

### Backend
- **.NET 8** (ASP.NET Core Minimal API)
- **Entity Framework Core** (Code First with PostgreSQL)
- **ASP.NET Core Identity** (user management)
- **JWT Bearer Authentication**
- **FluentValidation** (request validation)
- **ImageSharp** (image processing)
- **Serilog** (logging)
- **Swagger/OpenAPI** (API documentation)

### Database & Storage
- **PostgreSQL** (primary database)
- **Azure Blob Storage / AWS S3 / Local storage** (receipt images)
- **Redis** (optional: caching for production)

### OCR Integration
- **Option A**: Google Cloud Vision API
- **Option B**: AWS Textract

### DevOps
- **Docker** + **Docker Compose** (local development)
- **GitHub Actions** (CI/CD)
- Frontend hosting: **Vercel** or **Netlify**
- Backend hosting: **Azure App Service**, **Railway**, or **Fly.io**

---

## Project Structure

```
split/
├── frontend/                          # React PWA
│   ├── public/
│   │   ├── manifest.json             # PWA manifest
│   │   ├── icons/                    # App icons (multiple sizes)
│   │   └── robots.txt
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx
│   │   ├── components/
│   │   │   ├── ui/                   # Reusable UI components
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx
│   │   │   │   └── Layout.tsx
│   │   │   └── receipt/
│   │   │       ├── ReceiptScanner.tsx
│   │   │       ├── ReceiptViewer.tsx
│   │   │       └── ItemAssignment.tsx
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   ├── ReceiptsPage.tsx
│   │   │   ├── ReceiptDetailPage.tsx
│   │   │   ├── SplitPage.tsx
│   │   │   └── GroupsPage.tsx
│   │   ├── api/
│   │   │   ├── client.ts            # Axios/fetch configuration
│   │   │   ├── auth.ts
│   │   │   ├── receipts.ts
│   │   │   └── groups.ts
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── useReceipts.ts
│   │   │   └── useCamera.ts
│   │   ├── store/
│   │   │   └── authStore.ts         # Zustand store
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── utils/
│   │       ├── splitCalculator.ts
│   │       └── formatters.ts
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── backend/                           # .NET API
│   ├── Split.API/
│   │   ├── Program.cs
│   │   ├── appsettings.json
│   │   ├── appsettings.Development.json
│   │   ├── Endpoints/
│   │   │   ├── AuthEndpoints.cs
│   │   │   ├── ReceiptEndpoints.cs
│   │   │   ├── SplitEndpoints.cs
│   │   │   └── GroupEndpoints.cs
│   │   ├── Services/
│   │   │   ├── AuthService.cs
│   │   │   ├── ReceiptService.cs
│   │   │   ├── OcrService.cs
│   │   │   ├── FileStorageService.cs
│   │   │   └── SplitCalculator.cs
│   │   ├── Data/
│   │   │   ├── AppDbContext.cs
│   │   │   ├── Entities/
│   │   │   │   ├── User.cs
│   │   │   │   ├── Receipt.cs
│   │   │   │   ├── ReceiptItem.cs
│   │   │   │   ├── Group.cs
│   │   │   │   ├── GroupMember.cs
│   │   │   │   ├── Split.cs
│   │   │   │   └── ItemAssignment.cs
│   │   │   └── Migrations/
│   │   ├── Models/
│   │   │   ├── Requests/
│   │   │   │   ├── LoginRequest.cs
│   │   │   │   ├── RegisterRequest.cs
│   │   │   │   ├── UploadReceiptRequest.cs
│   │   │   │   └── CreateSplitRequest.cs
│   │   │   └── Responses/
│   │   │       ├── AuthResponse.cs
│   │   │       ├── ReceiptResponse.cs
│   │   │       └── SplitResultResponse.cs
│   │   ├── Infrastructure/
│   │   │   ├── JwtHelper.cs
│   │   │   ├── PasswordHasher.cs
│   │   │   └── Extensions/
│   │   │       └── ServiceCollectionExtensions.cs
│   │   └── Split.API.csproj
│   └── Split.API.Tests/               # Unit tests
│
├── docker-compose.yml                 # Local development environment
├── PROJECT_PLAN.md                    # This file
├── PHASE1_TODOS.md                    # Phase 1 task breakdown
└── README.md
```

---

## Database Schema (EF Core Entities)

### Core Entities

#### User
- `Id` (Guid, PK)
- `Email` (string, unique, indexed)
- `PasswordHash` (string)
- `FirstName` (string)
- `LastName` (string)
- `CreatedAt` (DateTime)

#### Receipt
- `Id` (Guid, PK)
- `UserId` (Guid, FK → User)
- `MerchantName` (string)
- `Date` (DateTime)
- `Total` (decimal)
- `Tax` (decimal, nullable)
- `Tip` (decimal, nullable)
- `ImageUrl` (string)
- `Status` (enum: Processing, Ready, Failed)
- `CreatedAt` (DateTime)

#### ReceiptItem
- `Id` (Guid, PK)
- `ReceiptId` (Guid, FK → Receipt)
- `Name` (string)
- `Price` (decimal)
- `Quantity` (int)
- `LineNumber` (int)

#### Group
- `Id` (Guid, PK)
- `Name` (string)
- `CreatedBy` (Guid, FK → User)
- `CreatedAt` (DateTime)

#### GroupMember
- `Id` (Guid, PK)
- `GroupId` (Guid, FK → Group)
- `UserId` (Guid, FK → User)
- `Role` (enum: Owner, Member)
- `JoinedAt` (DateTime)

#### Split
- `Id` (Guid, PK)
- `ReceiptId` (Guid, FK → Receipt)
- `GroupId` (Guid, FK → Group, nullable)
- `CreatedBy` (Guid, FK → User)
- `SplitType` (enum: Equal, ByItem, Percentage, Custom)
- `CreatedAt` (DateTime)

#### ItemAssignment
- `Id` (Guid, PK)
- `SplitId` (Guid, FK → Split)
- `ReceiptItemId` (Guid, FK → ReceiptItem)
- `UserId` (Guid, FK → User)
- `Percentage` (decimal) - for partial assignments
- `Amount` (decimal) - calculated amount

---

## Key Features & Modules

### 1. Authentication Module
- User registration with email/password
- Login with JWT token
- Token refresh mechanism
- Password reset flow (Phase 2)

### 2. Receipt Processing Module
- **Camera/Upload**: Capture receipt via camera or file upload
- **OCR Processing**: Extract text using cloud service
- **Smart Parsing**: Parse items, prices, totals from OCR result
- **Manual Editing**: Edit/add/remove items
- **Receipt History**: View all past receipts

### 3. Cost Splitting Module
- **Split Types**:
  - Equal split (divide total by N people)
  - By item (assign specific items to people)
  - Percentage (custom percentage per person)
  - Custom amounts
- **Tax & Tip Distribution**: Proportional distribution
- **Multi-person Items**: Split single item among multiple people
- **Summary View**: Who owes whom, total per person

### 4. Group Management Module
- Create groups (e.g., "Roommates", "Friday Crew")
- Add/remove members
- Pre-select group when splitting
- Group history

### 5. PWA Features
- **Offline Support**: View cached receipts offline
- **Install Prompt**: Add to home screen
- **Background Sync**: Sync when back online
- **Push Notifications**: (Phase 3)

---

## Development Phases

### Phase 1: MVP Foundation (Week 1-2)
**Backend:**
- Initialize .NET 8 project with Minimal API
- Setup EF Core Code First with PostgreSQL
- Implement User entity & authentication (register/login/JWT)
- Create Receipt & ReceiptItem entities
- Basic file upload endpoint
- Integrate OCR service (Google Vision or AWS Textract)
- Receipt processing endpoint (upload → OCR → parse → save)

**Frontend:**
- Initialize React 19 + Vite + TypeScript
- Setup TailwindCSS
- Create authentication pages (login/register)
- Setup TanStack Query for API calls
- Create camera/upload component
- Receipt list view
- Receipt detail view with items

**DevOps:**
- Docker Compose for local PostgreSQL
- CORS configuration
- Basic error handling

### Phase 2: Core Splitting Features (Week 3-4)
**Backend:**
- Create Split, ItemAssignment entities
- Split calculation service (equal, by-item algorithms)
- Tax & tip distribution logic
- Group & GroupMember entities
- Group management endpoints

**Frontend:**
- Item assignment UI (drag-drop or checkboxes)
- Split calculator component
- Multiple split type support
- Summary view (who owes what)
- Group management pages
- Responsive mobile-first design

### Phase 3: PWA & Polish (Week 5)
**Frontend:**
- Setup Vite PWA plugin
- Create manifest.json with app metadata
- Generate app icons (multiple sizes)
- Implement service worker for offline support
- Add install prompt
- Optimize for mobile performance

**Backend:**
- Image optimization before storage
- Better OCR parsing algorithms
- Validation improvements
- Error handling & logging

### Phase 4: Production Ready (Week 6)
- Unit tests (backend services)
- Integration tests
- Deploy backend to Azure/Railway
- Deploy frontend to Vercel/Netlify
- Setup production database
- CI/CD pipeline
- Monitoring & logging

### Phase 5: Optional Enhancements
- Payment integration (Venmo, PayPal links)
- Email/push notifications
- Receipt sharing
- Export to CSV/PDF
- Multiple OCR providers with fallback
- Capacitor wrapper for Play Store deployment
- Settlement tracking (mark as paid)

---

## API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`

### Receipts
- `POST /api/receipts` - Upload & process receipt
- `GET /api/receipts` - List user receipts
- `GET /api/receipts/{id}` - Get specific receipt
- `PUT /api/receipts/{id}/items` - Manual item editing
- `DELETE /api/receipts/{id}` - Delete receipt

### Splits
- `POST /api/splits` - Create split from receipt
- `GET /api/splits/{id}` - Get split details
- `PUT /api/splits/{id}/assignments` - Update item assignments
- `GET /api/splits/{id}/summary` - Get split summary

### Groups
- `POST /api/groups` - Create group
- `GET /api/groups` - List user groups
- `GET /api/groups/{id}` - Get group details
- `POST /api/groups/{id}/members` - Add member
- `DELETE /api/groups/{id}/members/{userId}` - Remove member

---

## Environment Setup

### Prerequisites
- .NET 8 SDK
- Node.js 20+
- PostgreSQL 15+
- Docker (optional but recommended)
- Google Cloud or AWS account (for OCR)

### Initial Commands

**Backend:**
```bash
cd backend
dotnet new webapi -n Split.API --minimal
cd Split.API
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
dotnet add package SixLabors.ImageSharp
dotnet add package Serilog.AspNetCore
dotnet add package Swashbuckle.AspNetCore
```

**Frontend:**
```bash
cd frontend
npm create vite@latest . -- --template react-ts
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install react-router-dom @tanstack/react-query zustand
npm install axios
npm install vite-plugin-pwa -D
npm install lucide-react
npm install react-hook-form @hookform/resolvers zod
```

---

## Success Criteria

✅ User can register and login
✅ User can upload receipt image
✅ Receipt is processed via OCR and items are extracted
✅ User can manually edit items
✅ User can assign items to different people
✅ App calculates accurate split with tax/tip
✅ User can create and manage groups
✅ PWA works offline and can be installed
✅ Mobile-first, responsive design
✅ Clean, maintainable codebase

---

## Design Principles

### Backend
- **Clean Architecture** - Organized but not over-engineered
- **Minimal APIs** - Modern, concise endpoints
- **Code First** - EF Core migrations for database versioning
- **DI & Services** - Testable, maintainable business logic
- **DTOs** - Separate API models from database entities

### Frontend
- **Mobile-First** - Design for mobile, enhance for desktop
- **Component-Driven** - Reusable, composable components
- **Type Safety** - TypeScript everywhere
- **Performance** - Code splitting, lazy loading, optimized images
- **Offline First** - PWA capabilities for offline usage

---

## Notes

- Start with simple local file storage, can migrate to cloud storage later
- Use Google Vision API initially (easier setup than AWS Textract)
- Keep authentication simple with JWT, no OAuth initially
- Focus on core receipt splitting functionality first
- Progressive enhancement - basic features first, polish later
