# Next.js Dynamic Routes & Static Optimization Guide

## Understanding the "Error during authentication" Messages

### What's Happening?

During `npm run build`, you see messages like:

```
Error during authentication: Error: Dynamic server usage: Route / couldn't be rendered statically because it used `cookies`.
```

**This is NOT a real error!** Here's what's going on:

1. **Build Process**: Next.js attempts to **statically pre-render** all routes during build
2. **Dynamic API Used**: Your routes call `verifyAuth()` → which uses `cookies()`
3. **Static Context Fails**: `cookies()` cannot run in a static context (no request exists yet)
4. **Error is Caught**: Your try-catch in `verify-auth.ts` line 36 logs this
5. **Next.js Adapts**: Next.js marks these routes as **dynamic** (server-rendered on demand)

### Is This Bad?

**No!** Your authenticated routes _should_ be dynamic. The issue is just the console noise during build.

## Solutions to Optimize & Clean Up

### Option 1: Route Segment Config (Recommended)

Tell Next.js explicitly which routes are dynamic to skip static generation attempts.

#### For Public Routes (Can Be Static)

If a route doesn't need authentication, make it static:

```tsx
// app/(platform)/(home)/page.tsx
export const dynamic = "force-static"; // or 'auto'
export const revalidate = 3600; // Revalidate every hour (ISR)

export default async function HomePage() {
  // Don't call verifyAuth here - move to client component if needed
  return <div>...</div>;
}
```

#### For Authenticated Routes (Must Be Dynamic)

```tsx
// app/(platform)/(admin)/dashboard/page.tsx
export const dynamic = "force-dynamic"; // Always server-render
// or
export const dynamic = "auto"; // Let Next.js decide

export default async function DashboardPage() {
  const { isAuth, user } = await verifyAuth();
  return <DashboardClient />;
}
```

### Option 2: Improve Error Handling in verifyAuth

Replace the console.error with a conditional check:

```typescript
export const verifyAuth = cache(async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return { isAuth: false, user: null };
    }

    const dataDecoded = await decryptToken(token);

    if (!dataDecoded || !dataDecoded.sub) {
      return { isAuth: false, user: null };
    }

    const user = dataDecoded.sub;
    return { isAuth: true, user, token };
  } catch (error) {
    // Only log in development and if it's not a build-time error
    if (
      process.env.NODE_ENV === "development" &&
      !(
        error instanceof Error && error.message.includes("Dynamic server usage")
      )
    ) {
      console.error("Error during authentication:", error);
    }
    return { isAuth: false, user: null, token: undefined };
  }
});
```

### Option 3: Separate Public & Protected Routes

Create different route patterns:

```
app/
├── (public)/           # Static routes (no auth)
│   ├── page.tsx
│   ├── about/
│   └── products/
│
└── (protected)/        # Dynamic routes (with auth)
    ├── layout.tsx     # Add authentication check here
    ├── dashboard/
    └── settings/
```

Then in `(protected)/layout.tsx`:

```tsx
export const dynamic = "force-dynamic";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuth, user } = await verifyAuth();

  if (!isAuth) {
    redirect("/login");
  }

  return <>{children}</>;
}
```

## Performance Optimization Strategies

### 1. Use Static Generation for Public Pages

```tsx
// app/(public)/products/page.tsx
export const revalidate = 3600; // ISR - Revalidate every hour

export default async function ProductsPage() {
  const products = await getProducts(); // This runs at build time
  return <ProductList products={products} />;
}
```

### 2. Use Partial Pre-rendering (Next.js 14+)

```tsx
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      {/* Static part */}
      <Header />

      {/* Dynamic part */}
      <Suspense fallback={<Loading />}>
        <UserProfile />
      </Suspense>
    </>
  );
}
```

### 3. Use Route Handlers for API Routes

Instead of server components for data fetching:

```typescript
// app/api/auth/verify/route.ts
export const dynamic = "force-dynamic";

export async function GET() {
  const { isAuth, user } = await verifyAuth();
  return Response.json({ isAuth, user });
}
```

### 4. Cache Responses Strategically

```tsx
// With fetch
const data = await fetch("https://api.example.com/data", {
  next: {
    revalidate: 60, // Cache for 60 seconds
    tags: ["products"], // Tag for on-demand revalidation
  },
});

// With unstable_cache
import { unstable_cache } from "next/cache";

const getCachedProducts = unstable_cache(
  async () => getProducts(),
  ["products"],
  { revalidate: 3600, tags: ["products"] },
);
```

## Recommended Configuration for Your App

Based on your current structure:

### 1. Update `verify-auth.ts`

```typescript
export const verifyAuth = cache(async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return { isAuth: false, user: null };
    }

    const dataDecoded = await decryptToken(token);
    if (!dataDecoded || !dataDecoded.sub) {
      return { isAuth: false, user: null };
    }

    return { isAuth: true, user: dataDecoded.sub, token };
  } catch (error) {
    // Silently handle build-time errors
    return { isAuth: false, user: null, token: undefined };
  }
});
```

### 2. Add Route Configs

```tsx
// app/(platform)/(admin)/dashboard/page.tsx
export const dynamic = "force-dynamic";

// app/(platform)/(home)/page.tsx
export const dynamic = "auto"; // Let Next.js optimize

// app/(platform)/(home)/products/page.tsx
export const revalidate = 300; // ISR with 5-minute revalidation
```

## Summary

| Route Type                | Configuration                     | Benefit                    |
| ------------------------- | --------------------------------- | -------------------------- |
| Public (no auth)          | `dynamic = 'force-static'` or ISR | Fast, cached, SEO-friendly |
| Protected (auth required) | `dynamic = 'force-dynamic'`       | Real-time user data        |
| Mixed content             | Use `Suspense` boundaries         | Best of both worlds        |

The build messages are **informational only** - your app works perfectly! The optimizations above will:

- ✅ Reduce build noise
- ✅ Improve performance
- ✅ Better utilize Next.js caching
- ✅ Provide clearer intent in code
