# XIOWRICH Luxury Perfume Store

XIOWRICH is a full-stack luxury perfume storefront built with React, Vite, and
Express. It includes a responsive product catalog, search and filtering, a
persistent browser cart, checkout, and optional MongoDB and Razorpay support.

> Product information, prices, shipping terms, and fragrance notes are demo
> content. Verify all business details before accepting real orders.

## Features

- Responsive storefront with five perfume products
- Seven A4 print images shown individually in a responsive gallery
- Original A4 print PDF available from the gallery and footer
- Product search and category filtering
- Cart quantity controls with `localStorage` persistence
- Customer checkout form with server-side validation
- Demo order creation with in-memory storage
- Optional MongoDB order persistence
- Optional Razorpay order creation and signature verification
- CORS-configured Express API

## Tech stack

- **Frontend:** React 18, Vite, `lucide-react`
- **Backend:** Node.js, Express, Mongoose
- **Payments:** Razorpay API (optional)
- **Storage:** MongoDB (optional; demo memory storage is used otherwise)

## Project structure

```text
.
├── client/
│   ├── public/products/     Product images
│   ├── public/a4-prints/    Original embedded A4 print images
│   ├── public/A4 Prints.pdf Original printable artwork
│   └── src/                 React application and styles
├── server/
│   ├── index.js             Express API
│   └── .env.example         Server environment template
├── package.json             Workspace scripts
└── README.md
```

## Requirements

- Node.js 20 or newer is recommended
- npm
- MongoDB, optional
- Razorpay test credentials, optional

## Run locally

From the project root:

```bash
npm install
npm run dev
```

The development servers run at:

- Storefront: <http://localhost:5173>
- API: <http://localhost:5000>
- API health check: <http://localhost:5000/api/health>

On Windows systems where PowerShell blocks `npm.ps1`, run the equivalent
command with the Windows npm launcher:

```powershell
npm.cmd install
npm.cmd run dev
```

Run only one service when needed:

```bash
npm run dev:client
npm run dev:server
```

## Environment configuration

The frontend uses `https://xiowrich.vercel.app` as its production API base URL.
For local development, create `client/.env` from the example to point it at
the local API:

Copy the server template before configuring optional integrations:

```bash
cp server/.env.example server/.env
```

Available server variables:

| Variable | Purpose |
| --- | --- |
| `PORT` | API port, default `5000` |
| `CLIENT_ORIGIN` | Allowed frontend origin, default `http://localhost:5173` |
| `MONGODB_URI` | MongoDB connection string |
| `RAZORPAY_KEY_ID` | Razorpay public key |
| `RAZORPAY_KEY_SECRET` | Razorpay private server secret |

The frontend API variable is `VITE_API_BASE_URL`. It defaults to
`https://xiowrich.vercel.app` and can be overridden with a local API URL.

Do not commit `server/.env` or expose `RAZORPAY_KEY_SECRET` in frontend code.

## API endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Reports API, database, and payment status |
| `GET` | `/api/products` | Returns the product catalog |
| `POST` | `/api/orders` | Validates and creates a demo order |
| `POST` | `/api/payments/create-order` | Creates a Razorpay order |
| `POST` | `/api/payments/verify` | Verifies a Razorpay payment signature |

The payment endpoints return a configuration error until Razorpay test
credentials are added to `server/.env`.

The product catalog includes each product's primary image and gallery image
paths. The API also serves those assets from `/products/<filename>`, allowing
the frontend to load the complete backend catalog and its images.

## Production checklist

Vercel is configured to build the React client and serve the Express API from
the same deployment. The SPA fallback keeps direct visits to `/about`,
`/contact`, `/privacy`, `/returns`, and `/track-order` from returning 404.
If the Vercel project still uses `server` as its Root Directory, the
server-local Vercel configuration and build script provide the same behavior.

- Use MongoDB or another persistent database instead of demo memory storage.
- Add real shipping, tax, cancellation, refund, privacy, and terms policies.
- Configure HTTPS, authentication, rate limiting, input validation, logging,
  and backups.
- Persist and reconcile verified payments before fulfilling orders.
- Add an authenticated admin panel before allowing order management.
- Test all payments with Razorpay test credentials before going live.
- Replace all placeholder product and delivery information.
