# Vicbrew site design and archive

The previous live site is preserved by the Git tag
`archive-site-before-redesign-2026-10-11` in `vicbrew/vicbrew`.
It points to commit `e74e7ec83cf6c5d2108c4da5e24d99eb74174fac`, which GitHub Pages
was serving before the redesign.

- [Browse the archived source](https://github.com/vicbrew/vicbrew/tree/archive-site-before-redesign-2026-10-11)
- [Download the old site as a ZIP](https://github.com/vicbrew/vicbrew/archive/refs/tags/archive-site-before-redesign-2026-10-11.zip)

The archive includes the old pages and their assets. It is separate from the live
site and does not change the domain or email configuration.

## Shared design

The main pages use `site.css` for the layout, typography, navigation, and
responsive page components. `site.js` handles active navigation, championship
schedule tabs, and expiry of dated competition notices. The site remains static;
there is no build step or package installation needed to publish it.

`index.html` is the homepage. Navigation and footers are included directly in each
HTML page so they remain usable without JavaScript. The local
`homepage-preview.html` review copy is not part of the published release.

Desktop text sizing and the stacked competition logos are scoped to screens at
least 901 pixels wide. The competition timing labels use pale-blue chips.

The unmaintained Google calendar has been retired. The old `events.html` and
`EventsCalendar.htm` URLs redirect to `comps.html`.

## Featured open competition

The featured event appears in `index.html` and `comps.html`. When featuring a new
competition, update the details and `data-end-date` in both copies. The end date
uses `YYYY-MM-DD`; after its final day in Victoria, the notice switches to a
calendar link. It does not fetch or select the next event automatically.

The initial notice features the Bendigo and Districts Homebrew Competition on
31 October 2026, using the club's supplied poster. The poster link, Facebook link,
and entry enquiry email are included in the notice.

## Results and championship archives

Keep championship schedules and categories as historical event information after
the event, with links to its results. The results archive table remains the source
of truth for the search index. When adding result PDFs, update the corresponding
cell in `results.html` and run `scripts/build_results_search.py` with `pypdf` and
`pdfplumber` available. Confirm the PDF's text layout is recognised by the search
parser. Search cards link directly to the matching PDF page.

When changing shared styles or scripts, update their `?v=` versions in the HTML
pages so returning visitors receive the new assets. Older historical pages
outside the main navigation retain their original files.

## Publishing and restoring

The publishing repository is `https://github.com/vicbrew/vicbrew`. GitHub Pages
serves the repository root from `main` at `https://vicbrew.org/`.

To inspect the previous site, download the tagged ZIP or check out the archive tag
in a separate directory. To restore it as the live site, prepare and review a new
commit restoring that version, then publish that commit to `main`. The archive
tag should remain intact.
