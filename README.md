# viagogo-clone — ticket marketplace demo

A pixel-faithful clone of [viagogo.fr](https://www.viagogo.fr) built with **Next.js 15 (App Router) + React 19 + Tailwind CSS**, with a full **admin panel** for managing events, tickets and images.

```bash
npm install
npm run dev      # development — http://localhost:3000
npm run build    # production build (stop the dev server first!)
npm start        # serve the production build
```

> ⚠ Never run `npm run build` while a dev server is running, and never run two dev
> servers on this folder at once — they share the `.next` folder and corrupt each
> other (you'll see `PackFileCacheStrategy` cache warnings; fix: delete `.next`, restart).

---

## How the ticket logic works

### The data model (3 layers)

```
EventItem  ──  a performer's event (name, venue, city, date, image, popularity)
   │
   └── Listing[]  ──  the actual TICKETS for that event
                      (zone, section, row, price, allowed quantities,
                       ticket type, features, deal score)
```

**Key rule: events don't own their prices — tickets do.** Two event fields are *derived*
and recomputed automatically every time a ticket changes:

| Event field | Derived from |
|---|---|
| `minPrice` ("from €X") | the **cheapest ticket** of the event |
| `listingCount` | the **number of ticket listings** |

Each ticket's **deal score** is also computed, never typed by hand:
- price < 1.3 × cheapest → **"Great deal"**
- price > 2.2 × cheapest → **"Premium"**
- otherwise → **"Average price"**

### Where data lives

```
data/db.json          ← THE source of truth (gitignored, created on first run)
  {
    "events":   [ ...EventItem ],
    "listings": { "<eventId>": [ ...Listing ] }
  }

lib/data.ts           ← seed data only — used to create db.json the first time
lib/store.ts          ← SERVER-ONLY read/write API over db.json
                        (getEvents, upsertEvent, saveListing, syncing derived fields,
                         image list/upload/delete)
lib/derive.ts         ← pure helpers usable anywhere (search, sort, deal score,
                         the seeded ticket generator)
```

Every public page reads from the store per request (`dynamic = "force-dynamic"`),
so **admin changes appear on the site immediately**. "Reset to seed data" on the
admin dashboard restores the original state.

### The purchase flow (why it's tamper-proof)

1. Event page (`/event/[id]`) lists the event's stored tickets.
2. Selecting a ticket navigates to `/checkout?event=X&listing=Y&qty=N` —
   **the URL only identifies the ticket, it never carries a price**.
3. The checkout page resolves price/section/zone **server-side from the store**
   and clamps `qty` to the listing's allowed quantities. A deleted/fake listing id
   shows "no longer available".
4. Payment is a demo form — no real charges, nothing persisted yet (an Orders
   model is the natural next step).

---

## The admin panel — `/admin`

Password: `ADMIN_PASSWORD` in `.env.local` (default `admin123` — change it).
Auth = SHA-256 session cookie, enforced by `middleware.ts` on every `/admin/*` route.

| Page | What you do there |
|---|---|
| **Dashboard** | counts (events, tickets, images), quick links, "Reset to seed data" |
| **Events** | table of all events (filter by category) → create / edit / delete |
| **Events → Edit** | name, performer, category, date, venue, city, country, popularity, image picker. Price/count are shown read-only ("derived from tickets") |
| **Events → 🎟 Tickets** | manage the event's ticket listings: add / edit / delete each ticket (zone, section, row, price, max qty, type, features) or **Regenerate** a fresh set. Deal scores + event "from" price update automatically |
| **Images** | upload (≤5 MB), delete, filtered by category: Concerts / Sports / Theatre (used by events), **Site assets** (referenced from code — protected), **Unused** (safe to delete) |

Creating an event: the URL slug is derived from the performer name, a starter set
of tickets is generated from your "base ticket price", and you refine them in the
Tickets screen.

All mutations are Next.js **Server Actions** (`app/admin/actions.ts`) that call
`revalidatePath` — no separate API server.

---

## Project structure

```
app/
  layout.tsx            minimal root layout (fonts, body)
  (site)/               PUBLIC SITE (has viagogo header/footer)
    page.tsx            homepage (interactive filters: type/city/date)
    concerts|sport|theatre/   category pages
    event/[id]/         event page with seat map + stored tickets
    checkout/           server-validated checkout
    search/             search results
  admin/
    login/              standalone login
    (panel)/            ADMIN (own chrome: top bar + sidebar, full width)
      page.tsx          dashboard
      events/           table, EventForm, [id]/tickets manager
      images/           image grid + upload
    actions.ts          all server actions (auth, events, tickets, images)
  api/search/           suggestion endpoint for the header search box
components/             UI components (cards, carousels, header, admin forms…)
lib/                    types, seed data, store, pure helpers, formatting, auth
data/db.json            runtime data (auto-created, gitignored)
public/images/          all imagery (event photos + site artwork)
middleware.ts           /admin auth guard
```

## Design fidelity

Layout metrics (card sizes 220/280×352, 24px gaps, container 1200+32px, pill and
button styles, fonts) were **sampled from the live viagogo.fr with Playwright**
(`_capture.mjs`, gitignored) and matched section by section.
