# Phase 1: MVP Foundation - Task List

## Overview
Phase 1 focuses on setting up the foundational infrastructure for both frontend and backend, implementing basic authentication, and creating the core receipt upload and processing functionality.

**Estimated Duration**: 1-2 weeks
**Goal**: Working MVP where users can register, login, upload receipts, and view OCR-extracted items

**Last Updated**: 2025-11-02
**Current Status**: ~20% Complete - Infrastructure setup done, authentication implementation complete

---

## Backend Tasks

### 1. Project Setup & Configuration

#### 1.1 Initialize .NET 9 Backend Project (Note: Using .NET 9, not .NET 8)
- [x] Create `backend` directory
- [x] Initialize .NET 9 Web API project with minimal API template
- [x] Create solution file for better organization
- [x] Setup `.gitignore` for .NET projects
- [x] Install required NuGet packages:
  - `Npgsql.EntityFrameworkCore.PostgreSQL` (9.0.4)
  - `Microsoft.EntityFrameworkCore.Design` (9.0.10)
  - `Microsoft.AspNetCore.Authentication.JwtBearer` (9.0.10)
  - `SixLabors.ImageSharp` (3.1.12)
  - `Serilog.AspNetCore` (9.0.0)
  - `Swashbuckle.AspNetCore` (9.0.6)

#### 1.2 Project Structure Setup
- [x] Create folder structure:
  - `Endpoints/` (empty)
  - `Services/` (empty)
  - `Data/Entities/` (complete with all entities)
  - `Models/Requests/` (empty)
  - `Models/Responses/` (empty)
  - `Infrastructure/` (empty, needs Extension subdirectory)
- [x] Configure `Program.cs` with basic service registration (CORS, DbContext)
- [x] Setup `appsettings.json` and `appsettings.Development.json`

#### 1.3 Configure Logging
- [ ] Setup Serilog for structured logging
- [ ] Configure console and file logging
- [ ] Add request logging middleware

---

### 2. Database Setup (EF Core Code First)

#### 2.1 Create Database Context
- [x] Create `AppDbContext.cs` in `Data/`
- [x] Configure DbContext options in `Program.cs`
- [x] Add connection string to `appsettings.json`

#### 2.2 Create User Entity
- [x] Create `User.cs` entity with all required properties
- [x] Configure entity relationships in `AppDbContext`
- [x] Add unique index on Email

#### 2.3 Create Receipt Entities
- [x] Create `Receipt.cs` entity with all fields including Status enum
- [x] Create `ReceiptItem.cs` entity with all fields
- [x] Configure one-to-many relationship (Receipt → ReceiptItems)
- [x] Add indexes for performance
- [x] **BONUS**: Phase 2 entities already created (Group, GroupMember, Split, ItemAssignment)

#### 2.4 Database Migrations
- [x] Install EF Core CLI tools (assumed installed globally)
- [x] Create initial migration (`InitialCreate`)
- [x] Review generated migration
- [x] Apply migration to database (`dotnet ef database update`)
- [ ] Test migration rollback capability

---

### 3. Authentication System ✅ COMPLETED

#### 3.1 JWT Infrastructure ✅
- [x] Create `JwtHelper.cs` in `Infrastructure/`:
  - Token generation method
  - Token validation method
  - Extract claims method
- [x] Add JWT settings to `appsettings.json`:
  - Secret key (min 32 characters)
  - Issuer
  - Audience
  - Expiration time
- [x] Configure JWT authentication in `Program.cs`

#### 3.2 Password Hashing ✅
- [x] Create `PasswordHasher.cs` in `Infrastructure/`:
  - Hash password method (using BCrypt or built-in ASP.NET Core Identity)
  - Verify password method

#### 3.3 Auth Service ✅
- [x] Create `AuthService.cs` in `Services/`:
  - `RegisterAsync(RegisterRequest)` method
  - `LoginAsync(LoginRequest)` method
  - Email validation
  - Duplicate email check
  - Password validation

#### 3.4 Auth DTOs ✅
- [x] Create `LoginRequest.cs`:
  - Email
  - Password
- [x] Create `RegisterRequest.cs`:
  - Email
  - Password
  - FirstName
  - LastName
- [x] Create `AuthResponse.cs`:
  - Token (JWT)
  - UserId
  - Email
  - ExpiresAt

#### 3.5 Auth Endpoints ✅
- [x] Create `AuthEndpoints.cs` in `Endpoints/`
- [x] Implement `POST /api/auth/register` endpoint
- [x] Implement `POST /api/auth/login` endpoint
- [x] Add input validation
- [x] Add error handling
- [x] Test with Swagger/Postman

---

### 4. File Upload & Storage

#### 4.1 File Storage Service
- [ ] Create `FileStorageService.cs` in `Services/`
- [ ] Implement local file storage:
  - Create `wwwroot/uploads/` directory
  - Save uploaded files with unique names (Guid)
  - Return file URL/path
- [ ] Add file validation:
  - Check file size (max 10MB)
  - Check file type (image only: jpg, png, pdf)
  - Validate file exists
- [ ] Configure static file serving in `Program.cs`

#### 4.2 Image Processing
- [ ] Add ImageSharp image optimization:
  - Resize large images (max 2000px width)
  - Compress to reduce file size
  - Convert to standard format (JPEG)

---

### 5. OCR Integration

#### 5.1 OCR Service Setup
- [ ] Choose OCR provider (Google Vision API or AWS Textract)
- [ ] Create cloud account and get API credentials
- [ ] Install OCR SDK package
- [ ] Store credentials in `appsettings.json` or user secrets

#### 5.2 OCR Service Implementation
- [ ] Create `OcrService.cs` in `Services/`
- [ ] Create `OcrResult.cs` model:
  - RawText (string)
  - MerchantName (string?)
  - Date (DateTime?)
  - Total (decimal?)
  - Items (List<string>)
  - Confidence (float)
- [ ] Implement `ExtractTextAsync(string imagePath)` method
- [ ] Handle OCR API errors gracefully
- [ ] Add retry logic for transient failures

#### 5.3 Receipt Parsing Logic
- [ ] Create receipt text parser:
  - Extract merchant name (top of receipt)
  - Extract date (regex patterns)
  - Extract total amount (keywords: "total", "amount due")
  - Extract line items (name + price patterns)
  - Extract tax and tip if present
- [ ] Handle multiple receipt formats
- [ ] Add confidence scoring

---

### 6. Receipt Processing

#### 6.1 Receipt Service
- [ ] Create `ReceiptService.cs` in `Services/`
- [ ] Implement `ProcessReceiptAsync(IFormFile, userId)`:
  - Save image to storage
  - Call OCR service
  - Parse OCR result
  - Create Receipt entity
  - Create ReceiptItem entities
  - Save to database
  - Return ReceiptResponse
- [ ] Implement `GetUserReceiptsAsync(userId)`
- [ ] Implement `GetReceiptByIdAsync(receiptId)`
- [ ] Implement `UpdateReceiptItemsAsync(receiptId, items)`
- [ ] Implement `DeleteReceiptAsync(receiptId)`

#### 6.2 Receipt DTOs
- [ ] Create `ReceiptResponse.cs`:
  - Id, MerchantName, Date, Total, Tax, Tip
  - ImageUrl, Status, CreatedAt
  - Items (List<ReceiptItemResponse>)
- [ ] Create `ReceiptItemResponse.cs`:
  - Id, Name, Price, Quantity, LineNumber
- [ ] Create `UpdateReceiptItemsRequest.cs`:
  - Items (List with Id, Name, Price, Quantity)

#### 6.3 Receipt Endpoints
- [ ] Create `ReceiptEndpoints.cs` in `Endpoints/`
- [ ] Implement `POST /api/receipts` (upload & process)
  - Accept multipart/form-data
  - Validate file
  - Require authentication
  - Return 201 Created with receipt data
- [ ] Implement `GET /api/receipts` (list user receipts)
  - Filter by current user
  - Order by CreatedAt descending
  - Optional pagination
- [ ] Implement `GET /api/receipts/{id}`
  - Include receipt items
  - Verify user owns receipt
- [ ] Implement `PUT /api/receipts/{id}/items` (manual editing)
- [ ] Implement `DELETE /api/receipts/{id}`
- [ ] Test all endpoints

---

### 7. API Configuration

#### 7.1 CORS Setup
- [x] Configure CORS in `Program.cs`:
  - Allow localhost:5173 (Vite dev server)
  - Allow credentials
  - Allow all headers and methods
- [ ] Test CORS with frontend (pending frontend implementation)

#### 7.2 Error Handling
- [ ] Create global exception handler middleware
- [ ] Return consistent error response format:
  - Status code
  - Error message
  - Error details (dev only)
  - Timestamp
- [ ] Handle common errors:
  - 400 Bad Request (validation)
  - 401 Unauthorized
  - 404 Not Found
  - 500 Internal Server Error

#### 7.3 Swagger/OpenAPI
- [ ] Configure Swagger UI
- [ ] Add XML documentation
- [ ] Add JWT authentication to Swagger
- [ ] Test all endpoints in Swagger

---

### 8. Docker Setup

#### 8.1 Docker Compose for PostgreSQL
- [x] Create `docker-compose.yml` in project root with PostgreSQL service
- [x] Configure port 5432, volumes, environment variables, and health check
- [ ] Test database connection (need to start Docker and apply migrations)
- [x] Document connection string in appsettings.json

#### 8.2 Backend Dockerfile (Optional for Phase 1)
- [ ] Create `Dockerfile` for .NET API
- [ ] Add to docker-compose if desired

---

## Frontend Tasks

**All frontend tasks have been moved to [PHASE1_FRONTEND_TODOS.md](PHASE1_FRONTEND_TODOS.md) for easier tracking.**

This allows for better organization when jumping between backend and frontend work.

---

## Documentation

### 21. README & Docs
- [ ] Create `backend/README.md`:
  - Setup instructions
  - Database migration commands
  - Environment variables
  - API endpoints documentation
- [ ] Create `frontend/README.md`:
  - Setup instructions
  - Environment variables
  - Development commands
  - Project structure overview
- [ ] Update root `README.md`:
  - Project overview
  - Quick start guide
  - Links to backend/frontend READMEs

---

## Success Criteria for Phase 1

✅ Backend API running on localhost:5000
✅ Frontend running on localhost:5173
✅ User can register a new account
✅ User can login with email/password
✅ User receives JWT token and stays logged in
✅ User can upload a receipt image
✅ Receipt is processed via OCR
✅ Items are extracted and displayed
✅ User can view list of all their receipts
✅ User can view receipt details
✅ User can manually edit receipt items
✅ User can delete a receipt
✅ Mobile-responsive design works
✅ CORS configured correctly
✅ Error handling works properly
✅ Code is in version control (Git)

---

## Next Steps After Phase 1

Once Phase 1 is complete, move to Phase 2 which focuses on:
- Implementing the cost splitting functionality
- Creating the split calculator
- Building item assignment UI
- Adding group management
- Multi-person split calculations

---

## Notes

- Focus on getting the core functionality working first
- Don't over-optimize initially - working code > perfect code
- Test each component as you build it
- Commit code frequently to Git
- Document any issues or decisions in comments
- Keep the UI simple and functional for MVP
