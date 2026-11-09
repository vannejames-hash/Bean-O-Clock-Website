# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated (inferred from the brief, not asked): static HTML/CSS with one small ES module, rendered by a dependency-free Node build (`node build.mjs --client <id>`). Chosen because each client site must be fast on Philippine mobile networks, cheap to host anywhere static, and re-skinned per client from config files alone.

## Users

- **Primary:** people in Tagum City who find a local café on Google, Facebook or a delivery app, mostly on a phone, deciding in seconds whether to walk in, order ahead for pickup, or get delivery.
- **Buyer of the service:** the café owner, who sees the demo and decides whether to pay for a digital storefront. (Inferred from the brief.)

## Product Purpose

A reusable "digital storefront" for local food businesses. It puts the menu with prices, the location, contact details and ordering paths (order ahead for pickup, delivery via the shop's app listing) in one fast mobile page. It succeeds when a visitor goes from discovery to an order or a visit without leaving it. The first build is a sales demo for Bean O' Clock Coffee To-Go.

## Positioning

Each site is built from the shop's own menu boards, logo and photographs, so it looks made for that shop, not taken from a template, while the system underneath is shared and configured per client.

## Operating Context

- Visitors arrive from Google Maps, Facebook pages and delivery apps.
- Shops already run Facebook pages and sometimes Foodpanda or GrabFood listings.
- Payment happens at the counter. There is no POS, payment or backend in the demo.
- New clients follow: enter business data, upload assets, set the brand, add the menu, set ordering links, deploy.

## Capabilities and Constraints

- Order-ahead flow (cart, pickup time, name and mobile, review, confirmation) runs on the frontend only and is labelled as a demo.
- Delivery opens the shop's verified delivery link. With no verified link it shows a labelled demo note with call and message options.
- Business content lives in `clients/<id>/` (business, menu, theme, content); UI lives in `src/`.
- No admin dashboard yet.
- **Undecided:** real order transport (SMS, Messenger or POS), hosting and domain, and package pricing.

## Brand Commitments

- Every client's own name, logo, colours, menu wording and prices are used as given.
- Nothing factual is invented. Unknown facts are omitted or shown as clearly labelled placeholders.

## Evidence on Hand

- Bean O' Clock facts and their sources: `clients/bean-o-clock/SOURCES.md`.
- No testimonials, case studies or customer figures exist. The only rating shown is the shop's public Google rating.

## Product Principles

1. The menu and both ordering paths are reachable from the first screen on a phone.
2. The shop's truth comes first: unknown facts are omitted or labelled, never filled in.
3. Each site looks made for its shop; the system stays invisible.
4. Fast before fancy: motion is decoration and never hides content.

## Accessibility & Inclusion

WCAG 2.2 AA as the working standard: semantic structure, keyboard and screen-reader access to the whole order flow, 44px touch targets, and full content under reduced motion. (Inferred from the brief.)
