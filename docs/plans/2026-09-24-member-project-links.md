# Member–project links implementation plan

**Goal:** Expand members in place and navigate between their active projects and project leaders.

**Architecture:** Use native details/summary for accessible inline expansion. PROJECTS_DATA.leaderId references MEMBERS_DATA.id; both directions derive from this relationship. Member anchors open and focus the matching card on initial load and hash changes.

**Tech Stack:** Static HTML, CSS variables, vanilla JavaScript, Node test runner.

## Design

Keep the existing dark horizontal cards, mint accents, avatars and typography. Inline expansion preserves page context better than a modal or side panel. Show project links and contacts in the expansion, and a compact linked leader card on both project list and detail views. Members with no active projects get an explicit empty state. Project links stay in the same tab.

## Implementation

1. Update js/data.js to link the real website-maintenance activity to member 1 by ID; use the requested ChuckleNaut spelling.
2. Update js/components.js for native expandable member cards, active project links, reusable leader cards and explicit project detail links.
3. Update js/main.js to open member anchors and reuse leader cards on project details.
4. Extend css/components.css with matching expanded, focus and mobile states.
5. Add scripts/tests/member-projects.test.mjs for relationship, rendering, empty state and anchor behavior. Run node --test scripts/tests/*.test.mjs and syntax/diff checks; inspect desktop and narrow browser layouts where available.
