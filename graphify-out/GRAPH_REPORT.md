# Graph Report - Claude Code Website  (2026-11-09)

## Corpus Check
- Corpus is ~29,123 words - fits in a single context window. You may not need a graph.

## Summary
- 183 nodes · 376 edges · 15 communities (9 shown, 6 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 11 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- HTML Utils & Formatting
- Page State & DOM
- Cart & Display Logic
- Build Configuration
- Character & Brand System
- Animation Engine
- Scroll & Thread Motion
- Modal Sheet Interface
- Time & Clock Display
- Order Flow Handlers
- Menu & Product Data

## God Nodes (most connected - your core abstractions)
1. `esc()` - 22 edges
2. `renderPage()` - 19 edges
3. `money()` - 11 edges
4. `viewPickup()` - 10 edges
5. `rise()` - 10 edges
6. `renderOrder()` - 9 edges
7. `viewCart()` - 9 edges
8. `viewReview()` - 9 edges
9. `stop()` - 9 edges
10. `esc()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `renderPage()` --calls--> `esc()`  [EXTRACTED]
  src/page.js → src/lib/html.js
- `dialogs()` --calls--> `esc()`  [EXTRACTED]
  src/sections/chrome.js → src/lib/html.js
- `footer()` --calls--> `esc()`  [EXTRACTED]
  src/sections/chrome.js → src/lib/html.js
- `nav()` --calls--> `esc()`  [EXTRACTED]
  src/sections/chrome.js → src/lib/html.js
- `bestSellers()` --calls--> `esc()`  [EXTRACTED]
  src/sections/featured.js → src/lib/html.js

## Import Cycles
- None detected.

## Communities (15 total, 6 thin omitted)

### Community 0 - "HTML Utils & Formatting"
Cohesion: 0.18
Nodes (31): esc(), findItem(), lowestPrice(), money(), picture(), rise(), stop(), icons (+23 more)

### Community 1 - "Page State & DOM"
Cohesion: 0.06
Nodes (32): ADDONS, bar, body, cats, clock, closeActions, data, enterHero (+24 more)

### Community 2 - "Cart & Display Logic"
Cohesion: 0.12
Nodes (32): addLine(), cartCount(), cartTotal(), dayKey(), displayName(), esc(), figure(), fmtTime() (+24 more)

### Community 3 - "Build Configuration"
Cohesion: 0.09
Nodes (14): argClient, clientDir, creditsFile, css, ctx, html, out, root (+6 more)

### Community 4 - "Character & Brand System"
Cohesion: 0.14
Nodes (12): cupShapes, f(), ICONS, joint(), poses, processScene(), reach(), regular() (+4 more)

### Community 5 - "Animation Engine"
Cohesion: 0.28
Nodes (9): applyPose(), easeInOut(), loop(), pose(), poseOf(), rad(), stopMotion(), walk() (+1 more)

### Community 6 - "Scroll & Thread Motion"
Cohesion: 0.29
Nodes (7): drawThread(), heroLanded(), layoutThread(), onScroll(), placeInk(), scrollMotion(), updateIndex()

### Community 7 - "Modal Sheet Interface"
Cohesion: 0.40
Nodes (5): closeSheet(), openDelivery(), openOrder(), openSheet(), updateActionBar()

### Community 8 - "Time & Clock Display"
Cohesion: 0.67
Nodes (3): tagumNow(), tickClock(), timeText()

## Knowledge Gaps
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `renderPage()` connect `HTML Utils & Formatting` to `Build Configuration`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Should `Page State & DOM` be split into smaller, more focused modules?**
  _Cohesion score 0.05714285714285714 - nodes in this community are weakly interconnected._
- **Should `Cart & Display Logic` be split into smaller, more focused modules?**
  _Cohesion score 0.11895161290322581 - nodes in this community are weakly interconnected._
- **Should `Build Configuration` be split into smaller, more focused modules?**
  _Cohesion score 0.09486166007905138 - nodes in this community are weakly interconnected._
- **Should `Character & Brand System` be split into smaller, more focused modules?**
  _Cohesion score 0.1368421052631579 - nodes in this community are weakly interconnected._