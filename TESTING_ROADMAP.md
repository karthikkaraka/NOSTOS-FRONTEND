# Nostos Platform - Comprehensive Testing Roadmap

## Project Overview
**Nostos** is a university lost & found platform built with:
- **Frontend**: React + Vite (Port: 5173)
- **Backend**: Spring Boot Java (Port: 8080)
- **Database**: MySQL (Database: `nostos`)
- **Authentication**: JWT Tokens

---

## PREREQUISITE SETUP

### 1. **Ensure Backend Database is Ready**
```bash
# MySQL should be running with the following credentials:
# Host: localhost:3306
# Database: nostos
# Username: root
# Password: root
```

### 2. **Start Backend Server**
```bash
cd C:\ALL\ALLProjects\Nostos
mvn clean install
mvn spring-boot:run
# Backend runs on: http://localhost:8080
```

### 3. **Start Frontend Server**
```bash
cd c:\ALL\ALLProjects\nostosFrontend
npm install
npm run dev
# Frontend runs on: http://localhost:5173
```

---

## PHASE 1: AUTHENTICATION & USER MANAGEMENT

### Test Case 1.1: User Registration
**Endpoint**: `POST /nostos/register`

**Steps**:
1. Navigate to `http://localhost:5173/register`
2. Fill in the registration form:
   - Username: `testuser123`
   - Email: `your-email@gmail.com` (use a real Gmail for OTP)
   - Registration Number: `REG123456`
   - Password: `SecurePass@123`
3. Click "Register"
4. Verify email notification received
5. Check email for OTP code

**Expected Results**:
- ✅ Email sent successfully
- ✅ OTP received in email
- ✅ No error messages

---

### Test Case 1.2: OTP Verification
**Endpoint**: `POST /nostos/otpverify`

**Steps**:
1. Copy OTP from email
2. Paste OTP in the OTP verification form
3. Click "Verify"

**Expected Results**:
- ✅ User account created
- ✅ Redirected to login page or items page
- ✅ Success message displayed

---

### Test Case 1.3: User Login
**Endpoint**: `POST /nostos/login`

**Steps**:
1. Navigate to `http://localhost:5173/login`
2. Enter credentials:
   - Username: `testuser123`
   - Password: `SecurePass@123`
3. Click "Login"

**Expected Results**:
- ✅ JWT token stored in localStorage
- ✅ Redirected to `/items` page
- ✅ User role verified (ADMIN → `/admin`, USER → `/items`)
- ✅ Token properly decoded with role information

---

### Test Case 1.4: Invalid Login Attempt
**Steps**:
1. Enter incorrect username/password
2. Click "Login"

**Expected Results**:
- ✅ Error message: "Login failed. Please try again."
- ✅ User remains on login page
- ✅ No token created

---

## PHASE 2: ITEM MANAGEMENT

### Test Case 2.1: Post Lost Item
**Endpoint**: `POST /nostos/items/lost`

**Steps**:
1. Login with valid credentials
2. Navigate to `/postitem`
3. Fill in form:
   - Title: `Blue Laptop Bag`
   - Category: `Bags`
   - Description: `Contains important documents`
   - Location: `Library Floor 2`
   - Lost Date: `2024-01-15`
4. Click "Post Item"

**Expected Results**:
- ✅ Item successfully created
- ✅ Item status = "LOST"
- ✅ Success notification displayed
- ✅ Item appears in `/items` list

---

### Test Case 2.2: Post Found Item
**Endpoint**: `POST /nostos/items/found`

**Steps**:
1. Navigate to `/postitem`
2. Select "Found Item" option
3. Fill in form:
   - Title: `Black Wallet`
   - Category: `Wallets & Accessories`
   - Found Location: `Cafeteria`
   - Found Date: `2024-01-16`
4. Click "Post Item"

**Expected Results**:
- ✅ Item successfully created
- ✅ Item status = "FOUND"
- ✅ Item visible in items list

---

### Test Case 2.3: View All Items with Pagination
**Endpoint**: `GET /nostos/items/list`

**Steps**:
1. Navigate to `/items`
2. Verify items are displayed
3. Check pagination controls
4. Click next/previous buttons

**Query Parameters Tested**:
- `type=LOST` - Filter lost items
- `type=FOUND` - Filter found items
- `status=ACTIVE` - Filter active items
- `page=0&size=10` - Pagination

**Expected Results**:
- ✅ All items displayed with pagination
- ✅ Pagination controls work correctly
- ✅ Page size defaults to 10 items

---

### Test Case 2.4: View Item Details
**Endpoint**: `GET /nostos/items/get/{id}`

**Steps**:
1. Click on any item in the items list
2. Navigate to `/itemdetail/{id}`
3. Verify all item details displayed

**Expected Results**:
- ✅ Item details loaded correctly
- ✅ Item description, location, date visible
- ✅ Claim button available
- ✅ User information of poster visible

---

### Test Case 2.5: Filter Items by Name
**Endpoint**: `GET /nostos/items/filteritems/byname`

**Steps**:
1. Navigate to `/items`
2. Use search/filter box
3. Search for: `laptop`

**Expected Results**:
- ✅ Only items matching "laptop" displayed
- ✅ Pagination works with filtered results

---

### Test Case 2.6: Filter Items by Category
**Endpoint**: `GET /nostos/items/filteritems/bycategory`

**Steps**:
1. Use category filter dropdown
2. Select: `Bags`

**Expected Results**:
- ✅ Only items in "Bags" category displayed

---

### Test Case 2.7: Filter Items by Location
**Endpoint**: `GET /nostos/items/filteritems/bylocation`

**Steps**:
1. Use location filter
2. Enter: `Library`

**Expected Results**:
- ✅ Only items from "Library" location displayed

---

### Test Case 2.8: View Your Posted Items
**Endpoint**: `GET /nostos/items/getbyuser`

**Steps**:
1. Navigate to `/selfitems`
2. View items you've posted

**Expected Results**:
- ✅ Only your posted items displayed
- ✅ Edit/Delete options available
- ✅ Item status shown (ACTIVE/CLOSED)

---

### Test Case 2.9: Close Lost Item
**Endpoint**: `PUT /nostos/items/{id}/close`

**Steps**:
1. Navigate to `/selfitems`
2. Click "Close" or "Mark as Found" button
3. Confirm action

**Expected Results**:
- ✅ Item status changed to "CLOSED"
- ✅ Item no longer appears in active items list
- ✅ Claims on this item can no longer be created

---

### Test Case 2.10: Auto-Match Suggestions
**Endpoint**: `GET /nostos/items/automatch/suggestions`

**Steps**:
1. Navigate to `/suggestions`
2. View suggested matches based on item attributes
3. System automatically matches items by title, category, location, and date

**Expected Results**:
- ✅ Relevant suggestions displayed
- ✅ Suggestions based on lost/found item matching

---

## PHASE 3: CLAIM MANAGEMENT

### Test Case 3.1: Create a Claim
**Endpoint**: `POST /nostos/claims/claim/{itemId}`

**Prerequisites**:
- Login as User A
- Another user (User B) has posted a lost item

**Steps**:
1. Navigate to item detail page (User B's item)
2. Click "Claim This Item"
3. Fill claim form:
   - Description: `I lost this blue bag on Jan 15`
   - Contact: Additional details
4. Submit claim

**Expected Results**:
- ✅ Claim created successfully
- ✅ Claim visible in `/myclaims`
- ✅ Claim status = "PENDING"

---

### Test Case 3.2: View My Claims
**Endpoint**: `GET /nostos/claims/getmyclaims`

**Steps**:
1. Navigate to `/myclaims`
2. View all claims you've made

**Expected Results**:
- ✅ All your claims displayed
- ✅ Claim status shown (PENDING, ACCEPTED, REJECTED)
- ✅ Item details visible
- ✅ Pagination works

---

### Test Case 3.3: View Received Claims
**Endpoint**: `GET /nostos/claims/recievedclaims`

**Steps**:
1. Navigate to `/myclaims` → "Received Claims" tab
2. View claims on your posted items

**Expected Results**:
- ✅ All claims on your items displayed
- ✅ Claimant information visible
- ✅ Accept/Reject buttons available

---

### Test Case 3.4: Accept a Claim
**Endpoint**: `PUT /nostos/claims/{claimId}/accept`

**Steps**:
1. Go to "Received Claims"
2. Review a pending claim
3. Click "Accept Claim"

**Expected Results**:
- ✅ Claim status changed to "ACCEPTED"
- ✅ Notification sent to claimant
- ✅ Item status may transition to "RESOLVED"

---

### Test Case 3.5: Reject a Claim
**Endpoint**: `PUT /nostos/claims/{claimId}/reject`

**Steps**:
1. Go to "Received Claims"
2. Review a pending claim
3. Click "Reject Claim"
4. Enter rejection reason (optional)

**Expected Results**:
- ✅ Claim status changed to "REJECTED"
- ✅ Notification sent to claimant

---

### Test Case 3.6: Resolve a Claim
**Endpoint**: `PUT /nostos/claims/{itemId}/resolve/{claimId}`

**Steps**:
1. Accept a claim
2. Click "Mark as Resolved/Recovered"
3. Confirm item recovery

**Expected Results**:
- ✅ Claim status = "RESOLVED"
- ✅ Item status = "RESOLVED"
- ✅ Item no longer active

---

## PHASE 4: ADMIN FEATURES

### Test Case 4.1: Admin Dashboard
**Endpoint**: `GET /nostos/admin/dashboard`

**Prerequisites**:
- Create admin account in database (set role = 'ADMIN')

**Steps**:
1. Login as Admin user
2. Navigate to `/admin`
3. View dashboard with statistics

**Expected Results**:
- ✅ Dashboard loads
- ✅ Statistics displayed:
  - Total users
  - Total items
  - Total claims
  - Active claims

---

### Test Case 4.2: View All Users
**Endpoint**: `GET /nostos/admin/users`

**Steps**:
1. On admin dashboard, go to "Users" section
2. View paginated list of all users

**Expected Results**:
- ✅ All users listed with:
  - User ID
  - Username
  - Email
  - Status (Active/Blocked)
  - Registration date

---

### Test Case 4.3: View User Details
**Endpoint**: `GET /nostos/admin/users/{id}`

**Steps**:
1. Click on any user in the users list
2. View detailed user profile

**Expected Results**:
- ✅ User details displayed
- ✅ User's posts and claims visible
- ✅ User trust score/rating shown

---

### Test Case 4.4: Block a User
**Endpoint**: `PUT /nostos/admin/users/{id}/block`

**Steps**:
1. View user details
2. Click "Block User" button
3. Confirm action

**Expected Results**:
- ✅ User status changed to "BLOCKED"
- ✅ Blocked user cannot login
- ✅ User's items not visible

---

### Test Case 4.5: Unblock a User
**Endpoint**: `PUT /nostos/admin/users/{id}/unblock`

**Steps**:
1. View blocked user
2. Click "Unblock User" button

**Expected Results**:
- ✅ User status changed to "ACTIVE"
- ✅ User can login again
- ✅ User's items visible again

---

### Test Case 4.6: View All Items (Admin)
**Endpoint**: `GET /nostos/admin/items`

**Steps**:
1. Go to Admin → Items section
2. View all items in system

**Expected Results**:
- ✅ All items displayed (active and inactive)
- ✅ Flagged/suspicious items highlighted

---

### Test Case 4.7: Remove Item
**Endpoint**: `PUT /nostos/admin/items/{id}/remove`

**Steps**:
1. Find suspicious/inappropriate item
2. Click "Remove Item"
3. Enter reason

**Expected Results**:
- ✅ Item hidden from public view
- ✅ Item marked as "REMOVED"
- ✅ Associated claims rejected

---

### Test Case 4.8: Restore Item
**Endpoint**: `PUT /nostos/admin/items/{id}/restore`

**Steps**:
1. View removed items
2. Click "Restore Item"

**Expected Results**:
- ✅ Item visible again
- ✅ Item status returned to previous state

---

### Test Case 4.9: View All Claims (Admin)
**Endpoint**: `GET /nostos/admin/claims`

**Steps**:
1. Go to Admin → Claims section
2. View all system claims

**Expected Results**:
- ✅ All claims listed
- ✅ Claim status visible
- ✅ Fraud detection flags shown

---

### Test Case 4.10: Reject Claim (Admin)
**Endpoint**: `PUT /nostos/admin/claims/{id}/reject`

**Steps**:
1. Review suspicious claim
2. Click "Reject" button
3. Enter reason

**Expected Results**:
- ✅ Claim rejected
- ✅ Both parties notified

---

## PHASE 5: EDGE CASES & ERROR HANDLING

### Test Case 5.1: Authentication & Authorization
- **401 Unauthorized**: Access protected endpoints without token
- **403 Forbidden**: Non-admin accessing admin endpoints
- **Token Expiration**: JWT token expiry handling

**Expected Results**:
- ✅ Redirect to login page
- ✅ Clear error messages
- ✅ Token refresh mechanism (if implemented)

---

### Test Case 5.2: Duplicate Claims
- User tries to claim same item twice

**Expected Results**:
- ✅ Error message: "You've already claimed this item"
- ✅ Claim not created

---

### Test Case 5.3: Claim on Closed Item
- User tries to claim a closed/resolved item

**Expected Results**:
- ✅ Error message: "This item is no longer available"
- ✅ Claim button disabled

---

### Test Case 5.4: Self-Claim Prevention
- User tries to claim their own item

**Expected Results**:
- ✅ Error message: "You cannot claim your own item"
- ✅ Claim button disabled

---

### Test Case 5.5: Invalid OTP
- Enter incorrect OTP during registration

**Expected Results**:
- ✅ Error message: "Invalid OTP"
- ✅ OTP resend option available
- ✅ Account not created

---

### Test Case 5.6: Database Connection Error
- Stop MySQL service and try to perform actions

**Expected Results**:
- ✅ Graceful error message
- ✅ Backend returns 500 error
- ✅ Logs contain error details

---

### Test Case 5.7: Pagination Edge Cases
- Request page beyond available pages
- Request page with size 0 or negative

**Expected Results**:
- ✅ Returns empty list or last page
- ✅ Proper error handling

---

## PHASE 6: PERFORMANCE & LOAD TESTING

### Test Case 6.1: Load Testing - Items List
- Load items endpoint with large dataset
- Monitor response time

**Expected Results**:
- ✅ Response time < 2 seconds
- ✅ Pagination works efficiently

---

### Test Case 6.2: Search Performance
- Search for items with large database

**Expected Results**:
- ✅ Quick search results
- ✅ Optimized queries

---

## PHASE 7: UI/UX TESTING

### Test Case 7.1: Responsive Design
- Test on different screen sizes:
  - Desktop (1920x1080)
  - Tablet (768x1024)
  - Mobile (375x667)

**Expected Results**:
- ✅ Layout adjusts properly
- ✅ Navigation works on all devices

---

### Test Case 7.2: Navigation Flow
- Test all page routes
- Verify navigation menu works
- Test back button functionality

**Expected Results**:
- ✅ All routes accessible
- ✅ Navigation intuitive
- ✅ No broken links

---

### Test Case 7.3: Form Validation
- Submit empty forms
- Submit forms with invalid data
- Test field validations

**Expected Results**:
- ✅ Client-side validation works
- ✅ User-friendly error messages
- ✅ Form doesn't submit with errors

---

## PHASE 8: SECURITY TESTING

### Test Case 8.1: SQL Injection
- Attempt SQL injection in search fields
- Example: `'; DROP TABLE users; --`

**Expected Results**:
- ✅ Query properly escaped
- ✅ No database modifications
- ✅ Error handled gracefully

---

### Test Case 8.2: XSS Prevention
- Enter HTML/JavaScript in form fields
- Example: `<script>alert('XSS')</script>`

**Expected Results**:
- ✅ Input sanitized
- ✅ No script execution
- ✅ Rendered as text

---

### Test Case 8.3: CORS Configuration
- Test requests from different origins
- Verify only allowed origins accepted

**Expected Results**:
- ✅ CORS headers correct
- ✅ Unauthorized origins blocked

---

### Test Case 8.4: JWT Token Validation
- Modify JWT token in localStorage
- Submit with tampered token

**Expected Results**:
- ✅ Invalid token rejected
- ✅ User logged out
- ✅ Redirected to login

---

## TESTING CHECKLIST

### Backend Testing Tools
- **Postman** or **Thunder Client** - API testing
- **MySQL Workbench** - Database verification
- **Spring Boot Logs** - Error tracking

### Frontend Testing Tools
- **Browser DevTools** - Network, Console, Application tabs
- **React DevTools** - Component state inspection
- **Lighthouse** - Performance auditing

### Test Data Required
```
Test User 1:
- Username: testuser1
- Email: test1@example.com
- Password: Test@123

Test User 2:
- Username: testuser2
- Email: test2@example.com
- Password: Test@123

Test Admin:
- Username: admin
- Email: admin@example.com
- Password: Admin@123
```

---

## KNOWN ISSUES TO CHECK

1. ✓ OTP email delivery (Gmail SMTP configuration)
2. ✓ JWT token expiration handling
3. ✓ Database connection pooling
4. ✓ Pagination edge cases
5. ✓ Image upload handling (if implemented)
6. ✓ Date/Time format consistency
7. ✓ Multi-language support (if needed)

---

## SUCCESS CRITERIA

| Category | Target | Status |
|----------|--------|--------|
| Authentication | 100% pass | ❌ |
| Item Management | 100% pass | ❌ |
| Claim Management | 100% pass | ❌ |
| Admin Features | 100% pass | ❌ |
| Security | 100% pass | ❌ |
| Performance | < 2s response | ❌ |
| UI/UX | No broken features | ❌ |

---

## Testing Execution Order

**Day 1**: Authentication & User Management (Phase 1)
**Day 2**: Item Management (Phase 2)
**Day 3**: Claim Management (Phase 3)
**Day 4**: Admin Features (Phase 4)
**Day 5**: Edge Cases & Error Handling (Phase 5)
**Day 6**: Performance, UI/UX, Security (Phases 6-8)

---

## Reporting Issues

When you find a bug, document:
- **Steps to Reproduce**
- **Expected Result**
- **Actual Result**
- **Screenshots/Logs**
- **Browser/Device Info**
- **Severity**: Critical/High/Medium/Low
