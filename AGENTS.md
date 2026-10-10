# Project rules

- Accounts use Lovable Cloud auth (email/password + Google) through `src/contexts/AuthContext.tsx`; profile fields live in `public.profiles` — why: real sign-in instead of the old local-only demo.
- Cart and checkout remain client-side only (no orders saved or payments taken) — why: no payment provider is connected yet.
