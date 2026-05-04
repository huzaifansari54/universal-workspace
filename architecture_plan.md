# Architectural Plan: Universal Action Workspace

## 1. System Overview & Philosophy
The **Universal Action Workspace** is a centralized platform designed to unify files, AI models, and external app integrations into a single, manual-first workspace. It prioritizes **intentional execution** over forced automation, giving users full control over when and how actions are triggered.

### Core Principles
- **Manual Control:** No background automation unless explicitly requested.
- **Strict Modularity:** The core system is agnostic of specific tools; functionality is provided by hot-swappable "Modules."
- **Scalability:** Built on a Node.js core with background processing for long-running tasks.

---

## 2. Technology Stack
- **Backend:** Node.js (TypeScript)
- **Framework:** Express.js or Fastify (for high-performance API routing)
- **Database:** PostgreSQL (Relational) - Utilizing `JSONB` for flexible metadata and configurations.
- **Task Queue:** BullMQ with Redis (for background jobs like video processing/uploads)
- **Caching:** Redis (for dynamic module registries and templates)
- **Authentication:** Passport.js (OAuth 2.0 integration)
- **Payments:** Stripe (Subscription management and Webhooks)
- **Encryption:** `crypto` (AES-256-GCM for tokens at rest)

### Database Strategy: Why PostgreSQL?
- **Relational Integrity:** Ensures strict consistency between Users, Modules, and Actions via Foreign Keys.
- **Hybrid Flexibility:** Uses `JSONB` columns for dynamic schemas (Resource metadata, Module configs), providing NoSQL-like flexibility within a structured environment.
- **Performance:** Optimized for the high-volume logging required by the Execution Engine.
- **Type Safety:** Pairs perfectly with TypeScript ORMs (like Prisma) for end-to-end type safety.

---

## 3. Data Model & Database Schema

### Entities
1. **User**
   - `id`: UUID
   - `email`: String
   - `auth_tokens`: Encrypted JSON (OAuth credentials for YouTube, Notion, etc.)
   - `workspace_config`: JSON (User-specific UI/UX settings)
   - `subscription_status`: Enum (Active, Canceled, Past Due)
   - `stripe_customer_id`: String
   - `plan_id`: FK -> SubscriptionPlan

2. **SubscriptionPlan**
   - `id`: UUID
   - `name`: String (e.g., "Free", "Pro", "Enterprise")
   - `price_id`: String (Stripe Price ID)
   - `limits`: JSON (e.g., max_actions_per_month, max_storage)

3. **Resource**
   - `id`: UUID
   - `name`: String
   - `type`: Enum (Video, Image, Text, Document)
   - `storage_path`: String (Local or Cloud URL)
   - `metadata`: JSON (Size, dimensions, duration, etc.)

3. **Module**
   - `id`: UUID
   - `name`: String (e.g., "YouTube Module", "FFmpeg Compressor")
   - `status`: Enum (Active, Inactive, Pending Auth)
   - `config`: JSON (Endpoint URLs, API keys)

4. **Capability**
   - `id`: UUID
   - `module_id`: FK -> Module
   - `name`: String (e.g., "Upload Video", "Compress File")
   - `input_types`: Array<ResourceTypes>
   - `parameters_schema`: JSON (Expected UI fields for the action)

5. **Action (Execution Log)**
   - `id`: UUID
   - `capability_id`: FK -> Capability
   - `user_id`: FK -> User
   - `input_resource_ids`: Array<FK -> Resource>
   - `output_resource_ids`: Array<FK -> Resource>
   - `status`: Enum (Pending, Processing, Completed, Failed)
   - `execution_log`: Text/JSON

6. **Template**
   - `id`: UUID
   - `name`: String (e.g., "Standard Social Media Flow")
   - `steps`: Array<{ module_id, capability_id, order }>

---

## 4. Module System: Dynamic Registration
The core backend implements a **Provider Pattern**.

- **Registration Hook:** When the server starts or a module is added, the module calls a `/register` endpoint.
- **Self-Discovery:** Modules provide a JSON manifest defining their `Capabilities` and the required inputs (e.g., "I need a video file and a string title").
- **Core Decoupling:** The Core Engine stores these capabilities in a dynamic registry (cached in Redis) without needing to know the module's internal logic.

---

## 5. The Execution Engine

### Execution Workflow
1. **Request:** User triggers an Action via the UI.
2. **Validation:** Core checks if the User has authorized the Module and if the Resources match the `input_types`.
3. **Routing:**
   - **Local Execution:** Core spawns a child process or worker thread (e.g., for `ffmpeg` operations).
   - **API Execution:** Core sends a request to the external service using encrypted user tokens.
   - **Assisted Execution:** Core prepares a data payload for client-side redirection or sharing.
4. **Queueing:** Long-running actions are pushed to **BullMQ**. The client receives an `action_id` to poll for status.

---

## 6. Security & Authentication

- **OAuth Middleware:** A centralized service to handle redirects and token exchanges.
- **Encryption at Rest:** 
  - User OAuth tokens are encrypted using a system-level master key before being saved to the database.
  - Decryption happens only in memory during the execution phase.
- **Permission-Based Access Control (PBAC):**
  - Users must "Unlock" a module, which triggers the OAuth flow or credential entry.
  - Capabilities are hidden from the UI if the module is not authorized.

- **Subscription Guards:**
  - The Execution Engine checks `user.subscription_status` before processing premium Capabilities.
  - Webhooks from Stripe automatically update the `subscription_status` and `limits` in the DB.

---

## 7. Performance & Optimization
- **Redis Caching:** Capabilities and Templates are cached to avoid frequent DB lookups during UI rendering.
- **Stream-Based Processing:** For local file operations, the system uses Node.js streams to minimize memory usage.
- **Background Workers:** Dedicated Node.js worker processes handle the Task Queue to keep the API responsive.

---

---

## 9. Frontend Architecture (Web Workspace)
- **Framework:** Next.js 14 (App Router) or Vite + React.
- **Styling:** Vanilla CSS + Radix UI (or Shadcn) for a premium, accessible component set.
- **State Management:** TanStack Query (React Query) for server-state (Resources, Actions) and Zustand for local workspace state.
- **Real-time Updates:** Socket.io or polling the `/actions/:id` endpoint to show progress bars for long-running tasks.

---

## 10. Recommended Project Structure (Monorepo or Unified)
```text
/universal-workspace
  /apps
    /web             <-- Next.js/React Frontend
    /backend         <-- Node.js API (Core Engine)
  /packages
    /shared-types    <-- Shared TypeScript interfaces
    /module-sdk      <-- Base classes for building new modules
```

---

## 11. Implementation Roadmap (Phase 1)
1. **Initialize Monorepo** with TurboRepo or simple folders.
2. **Backend Setup:** Node.js + TypeScript + Prisma (PostgreSQL).
3. **Database Migrations:** User, Plan, and Module tables.
4. **Stripe Webhook Scaffold:** Handle basic subscription events.
5. **Core API:** Resource upload and Module registration logic.
6. **Mock Module:** Test the dynamic registration with a "File Tool".
