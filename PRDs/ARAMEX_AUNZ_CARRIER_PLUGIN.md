# Aramex AU/NZ (myFastway) Carrier Plugin

| Field | Value |
|-------|-------|
| **Project** | Karrio — Community Plugin |
| **Version** | 2026.1 |
| **Date** | 2026-04-22 |
| **Status** | Draft |
| **Owner** | @kurt |
| **Type** | Integration |
| **Carrier Slug** | `aramex_aunz` |

> See full implementation plan in the artifact: `implementation_plan.md`
> This file is a reference copy for the PRDs directory per repo convention.

---

## Executive Summary

Implement a standalone Karrio community plugin for **Aramex Australia/New Zealand** shipping via the myFastway REST API. The existing `aramex` plugin uses the international SOAP API and is incompatible with AU/NZ.

### Features

- **Rating** — `POST /api/consignments/quote` (Quote v1)
- **Shipping** — 2-step: `POST /api/consignments` + `GET /{id}/labels`
- **Tracking** — `GET /api/track/label/{label}` (per the official myFastway Track wiki)
- **Cancel** — `DELETE /api/consignments/{id}/reason/{reasonId}`

### Key Decisions

| Decision | Choice |
|----------|--------|
| Plugin location | `community/plugins/aramex_aunz/` |
| Auth | OAuth2 Client Credentials (cached, 60-min expiry) |
| Carrier slug | `aramex_aunz` (avoids collision with `aramex`) |
| API style | JSON REST with `{ "data": ... }` envelope |
