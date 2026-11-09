# Self-assessment — PA#2 · Responsive prototype (CSC13008)

Submitted by:
- 24120184 — Nguyễn Thành Dự
- 24120294 — Nguyễn Đức Duy

Stack: React + Vite + Tailwind CSS v4 (HashRouter). Screens: `/#/`, `/#/hoi-thoai`, `/#/lich-chup`.
Final checks run on 2026-11-09 against `npx vite preview` of the last build.

**I claim: 87 / 100**

| # | Criterion | Max | I claim | Evidence |
|---|---|---|---|---|
| 1 | Three linked screens that trace back to the GradStudio brief | 20 | 17 | `PROTOTYPE.md` §3 lists each path, its PA#1 screen and where its links go. The features follow `docs/PROPOSAL.md` (the brief text for the 3 screens). **Màn 1:** "Xem gói chụp" and "Chat với studio" scroll to their sections; **Gửi** is a `<Link>` to `/hoi-thoai`. **Màn 2:** opens on the 09:00 clash with **Tạo booking** disabled; Chọn 14:00 → Mô phỏng phản hồi của Linh (Chốt giờ này / Từ chối) → "Đã chốt lịch" → **Tạo booking** becomes a `<Link>` to `/lich-chup`; Gửi báo giá vào chat; Đặt lại demo (commit `bcf35e2`). **Màn 3:** Mô phỏng thanh toán (Hủy keeps Chờ cọc; Thành công → Đã đặt lịch); status tabs; Đặt lại demo (commit `cb9cc51`). A Playwright script clicked the whole flow at 360 px with 0 console errors (AI-LOG entry 7). No `href="#"`; every link goes to a route in `App.jsx`. Deductions: see *What we did not manage* (Fix these list not checked; photos are placeholders). |
| 2 | Responsive at 360, 768 and 1280 px | 25 | 23 | `screenshots/` holds 9 full-page shots (commit `53aac2b`, retaken after the last code change). Script results at all 9 page×width pairs: `scrollWidth > clientWidth` → `false`; nothing sticks out past the right edge (except inside the table's `overflow-x-auto` wrapper); `clientWidth` equals the set width; no standalone button or link under 44 px at 360. Long items wrap: "Gói Kỷ yếu lớp trọn ngày – 40 học sinh…" (Màn 1), "Tôn Nữ Hoàng Phương Thảo Nguyên" (Màn 2), the "Bao gồm" row (Màn 3). Layout changes: Màn 2 is 1 column at 360, a 12-column grid at 768, and 3 columns at 1280. Deduction: the checks were run by a script, not by us in the DevTools device toolbar. |
| 3 | Semantic, valid HTML | 20 | 18 | `checks/validator-index.txt`, `validator-hoi-thoai.txt` and `validator-lich-chup.txt`: 0 errors and 0 warnings on the rendered `outerHTML` (commit `8712936`). The first run found a duplicate `<title>` and a `<div>` inside `<dl>`; both were fixed (AI-LOG entry 8). Every screen has `<header>`, `<nav>`, `<main>` and `<footer>`, one `<h1>` and no skipped heading levels (script). Actions are `<button type="button">` and navigation is `<Link>`. Every input has a visible `<label>` linked by `htmlFor`/`id`. There are no `<img>` elements (images are captioned blocks). Deduction: the DevTools Accessibility pane was not opened by hand, and the HTML was POSTed to the checker by script rather than pasted into Text input. |
| 4 | Design you can check | 10 | 9 | Tokens live in `@theme` in `src/index.css`, with contrast tables in `docs/design/TOKENS.md`. Spacing uses only the 1/2/3/4/6/8/12/16 steps (rule in `CLAUDE.md`). There are no arbitrary values (`p-[13px]`), no `!important`, no `style={{}}`, and no `sm:`/`lg:`/`2xl:`; the only off-scale values are `top-10` and `top-24` for the map pin in `Schedule.jsx`. Body text is 16 px. A script checked every text node at ≥ 4.5:1 contrast and found none failing. Tailwind is the only CSS framework, and fonts are system fonts. Each screen has one solid brand button: Gửi / Tạo booking / Thanh toán cọc 30%. |
| 5 | The brief and the rules file | 10 | 8 | `brief.md` has prompts 1–9, verbatim and in order. Prompt 1 sets the constraints: framework, spacing scale, mobile first and breakpoints, no fixed widths, semantic rules, links, and the done checks. `CLAUDE.md` (first commit `2741335`, React update `cb8a976`) records the stack, the allowed dependencies, a NEVER list and the done definition (3 widths, W3C via Text input, Accessibility pane). Deduction: prompts 4–9 are short chat messages; they rely on `CLAUDE.md` for constraints instead of restating them. |
| 6 | AI-LOG.md | 10 | 8 | `AI-LOG.md` has entries 1, 2 and 4–9. Each names the person, the tool and the request, plus the result commits, Changed, Rejected and what was checked. Entries 6–8 record what the assistant got wrong and which check caught it: the 360 px admin header overflow (width script), missing Màn 2/3 interactions (checked against the brief), and the duplicate `<title>` and `<dl>` child (W3C). Entry 6 records the rejected `/booking` split. Deductions: entry 3 (tokens, Duy) is missing, and entries 6–9 were written at the end of the session, not in the same commit as each piece of work. |
| 7 | Commit history | 5 | 4 | `git log` shows: `2741335` CLAUDE.md alone first, then `1230ab1` shared components, `2e200a3` Màn 1, `bcf35e2` Màn 2, `cb9cc51` Màn 3, `53aac2b` responsive, `8712936` checks, then docs. Each intermediate commit was built (`git archive` + `vite build`) and builds. Commits carry the real name of whoever made them. Deduction: the responsive commit holds only the page-width token and the screenshots, because the mobile-first classes were written together with each screen. |
| | **Total** | **100** | **87** | |

## What we did not manage

- **The brief's "Fix these" list was not checked.** It is in the GradStudio final project brief on Classroom, which is not in the repo. We checked the screens against `docs/PROPOSAL.md` and `LINK.md` only, so a problem on that list could still be present.
- **No real photos.** The hero, package cards and gallery are captioned colour blocks, because we had no photo set we were allowed to put in the repo. The page has no `<img>` elements.
- **Màn 3 always shows the 24/10 14:00 booking.** If the admin picks 15:00 or 25/10 on Màn 2, Màn 3 still shows 14:00, because each screen must fill itself when opened directly (noted in `PROTOTYPE.md` §5).
- **The work split did not match the history.** `docs/PHAN-CONG.md` gave Màn 1 and Màn 3 to Duy, but the React code for all three screens was written on Dự's machine (Dự + assistant), so those commits are under Dự's name. Duy's work is the rules file, the layout and the tokens (commits `2741335` to `1e1805a`).
- **Several checks were run by script, not by hand.** These are widths, contrast, labels and W3C. Nobody opened the DevTools Accessibility pane or the device toolbar to confirm them.
- **AI-LOG entry 3 (tokens) is missing**, and entries 6–9 were written at the end of the day instead of with each commit.
- **The first version left out required features.** It shipped Màn 2 in a fixed "already agreed" state and Màn 3 without the payment simulation, and `PROTOTYPE.md` called this a design choice. It was fixed after we re-read the brief (AI-LOG entry 7).

## What we would do differently

- Read the brief's feature list for each screen before writing code and turn it into a checklist, instead of auditing at the end.
- Write the AI-LOG entry in the same commit as the work it describes.
- Keep the responsive pass as its own step: first build each screen at 360 only, commit, then add `md:`/`xl:` in one responsive commit.
- Open DevTools (device toolbar, Accessibility pane) by hand on each screen once, as well as running the scripts.
- Agree on the work split again when the stack changes (the switch to React moved all the code onto one machine).
