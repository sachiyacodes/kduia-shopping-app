# Shopping App

A small React shopping-cart exercise, forked from the [IBM Developer Skills Network starter](https://github.com/ibm-developer-skills-network/kduia-shopping-app). Vite builds the app and Vitest runs the component tests.

The missing starter components are completed here: add named items with USD prices, remove individual items, view the running total, and choose an in-store or online shopping label. Amounts are stored as integer cents so ordinary decimal totals remain exact.

This is coursework, not an online shop. There is no checkout, payment, inventory, delivery service, account, or backend. Cart contents live in memory and reset when the page reloads. The shopping location is only a label and does not affect prices.

## Run locally

Use Node.js 24 and npm:

```sh
npm ci
npm start
```

Open the local address printed by the development server. Keep the development server on a trusted local machine.

## Checks

```sh
npm test
npm run build
npm audit
```

Tests cover adding/removing items, exact decimal totals, invalid prices, duplicate item identity, and the location control. The production bundle is written to `dist/`. Run `npm run preview` for a local preview of that bundle. CI runs the tests, production build, and dependency audit.

## Maintenance limits

The original Create React App toolchain was replaced with Vite and Vitest to remove its unpatched dependency tree. The cart behavior and regression tests are preserved. Build output now uses `dist/` rather than CRA's `build/`; update any hosting configuration accordingly. JSX source files use `.jsx` extensions, and `index.html` is the root entry point.

The app targets modern browsers and a site-root deployment. It has no production server or legacy-browser polyfills. Check `npm audit` as dependencies evolve; a clean advisory report does not prove the app secure against every possible issue.

## Attribution and license

Original learning scaffold: IBM Developer Skills Network. This fork completes the cart context/components and adds regression tests and project documentation. The original [Apache-2.0 license](LICENSE) is preserved.
