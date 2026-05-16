# wptp-adapter-browser

## Purpose

Lift **browser HTTP Archive (HAR)** traces into [WPTP IR v0](https://github.com/theorem6/wptp-ir) route nodes. **Bronze** — observed URLs become routes; no full DOM or replay yet.

## Public API

- `importHarJson(har)` → `IrDocumentV0`

## Invariants

- Dedupes identical method + pathname pairs.
- Records `http.fetch` effect with hostname when URL parses.
- Legal use requires customer-owned or licensed capture only.

## Non-goals

- Playwright script generation in v0.
- Response body schema inference.

## Quick start

```bash
npm install && npm test
```
