/*
 * Client-side site search for search.html. Reads ?q= and ranks pages from
 * window.SEARCH_INDEX (built by tools/build-search-index.py).
 */
(function () {
  "use strict";

  var pages = window.SEARCH_INDEX || [];
  var input = document.getElementById("search-page-input");
  var summary = document.getElementById("search-summary");
  var list = document.getElementById("search-results");

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function escapeRe(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function snippet(text, terms) {
    var lower = text.toLowerCase();
    var at = -1;
    for (var i = 0; i < terms.length && at < 0; i++) at = lower.indexOf(terms[i]);
    var start = Math.max(0, at - 60);
    var cut = text.slice(start, start + 200);
    var html = (start > 0 ? "&hellip;" : "") + escapeHtml(cut) + (start + 200 < text.length ? "&hellip;" : "");
    var re = new RegExp("(" + terms.map(escapeRe).join("|") + ")", "gi");
    return html.replace(re, "<mark>$1</mark>");
  }

  function search(query) {
    var terms = query.toLowerCase().split(/\s+/).filter(function (t) { return t.length > 1; });
    if (!terms.length) return [];
    return pages
      .map(function (p) {
        var title = p.title.toLowerCase();
        var heads = p.headings.join(" ").toLowerCase();
        var text = p.text.toLowerCase();
        var score = 0;
        for (var i = 0; i < terms.length; i++) {
          var t = terms[i];
          var hit = false;
          if (title.indexOf(t) >= 0) { score += 10; hit = true; }
          if (heads.indexOf(t) >= 0) { score += 4; hit = true; }
          var n = text.split(t).length - 1;
          if (n) { score += Math.min(n, 5); hit = true; }
          if (!hit) return null; // every term must appear somewhere
        }
        return { page: p, score: score, terms: terms };
      })
      .filter(Boolean)
      .sort(function (a, b) { return b.score - a.score; });
  }

  function render(query) {
    list.innerHTML = "";
    if (!query) {
      summary.textContent = "Type a word above to search the site.";
      return;
    }
    var results = search(query);
    summary.innerHTML = results.length
      ? results.length + " result" + (results.length === 1 ? "" : "s") + " for <strong>&ldquo;" + escapeHtml(query) + "&rdquo;</strong>"
      : "No results for <strong>&ldquo;" + escapeHtml(query) + "&rdquo;</strong>. Try a different word, or <a class=\"text-decoration-underline\" href=\"contact.html\">contact us</a>.";
    results.forEach(function (r) {
      var li = document.createElement("li");
      li.className = "search-result-item tw-mb-8 tw-pb-8 border-bottom border-neutral-200";
      li.innerHTML =
        '<a href="' + encodeURI(r.page.url) + '" class="search-result-title d-inline-block tw-text-9 fw-semibold text-white hover-text-main-600 tw-mb-2">' +
        escapeHtml(r.page.title) + "</a>" +
        '<span class="d-block tw-text-sm text-neutral-500 tw-mb-2">' + escapeHtml(r.page.url) + "</span>" +
        '<p class="mb-0">' + snippet(r.page.text, r.terms) + "</p>";
      list.appendChild(li);
    });
  }

  var query = (new URLSearchParams(window.location.search).get("q") || "").trim();
  if (input) input.value = query;
  if (query) document.title = "Search: " + query;
  render(query);
})();
