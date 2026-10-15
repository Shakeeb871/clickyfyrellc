/*
 * Small site-wide fixes for the template's placeholder links:
 * - social links point at the profiles in SITE_CONFIG.social and open in a new tab
 * - "Scroll down" and other bare "#" links scroll to the next section instead of jumping to the top
 */
(function () {
  "use strict";

  var social = (window.SITE_CONFIG || {}).social || {};
  var PLATFORMS = {
    facebook: /facebook|\/face\./i,
    instagram: /instagram|\/ins\./i,
    twitter: /twitter|x-logo|\/twi\./i,
    linkedin: /linkedin|\/link?\./i,
    pinterest: /pinterest/i,
    youtube: /youtube/i,
    behance: /behance/i,
    dribbble: /dribbble|\/dri\./i,
  };
  // Two-letter labels some layouts use instead of icons
  var SHORT = { fb: "facebook", in: "instagram", tw: "twitter", x: "twitter", lk: "linkedin", li: "linkedin", pi: "pinterest", yt: "youtube" };

  function platformOf(a) {
    var href = a.getAttribute("href") || "";
    // Leave real content links (e.g. a specific YouTube video) alone
    if (/youtube\.com\/watch|youtu\.be\//i.test(href)) return null;
    var hostMatch = href.match(/^https?:\/\/(?:www\.)?([a-z]+)\.(?:com|net)\/?$/i);
    if (hostMatch && social[hostMatch[1].toLowerCase()]) return hostMatch[1].toLowerCase();
    if (href !== "#" && href !== "") return null;
    var hint = a.textContent + " " + Array.prototype.map.call(
      a.querySelectorAll("i, img, svg"),
      function (el) { return (el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className) + " " + (el.getAttribute("alt") || "") + " " + (el.getAttribute("src") || ""); }
    ).join(" ");
    var short = SHORT[a.textContent.trim().toLowerCase()];
    if (short && social[short]) return short;
    for (var key in PLATFORMS) {
      if (social[key] && PLATFORMS[key].test(hint)) return key;
    }
    return null;
  }

  function nextSection(a) {
    var section = a.closest("section, .banner-area, [class*='hero'], [class*='banner']");
    var el = section;
    while (el && !el.nextElementSibling) el = el.parentElement;
    return el ? el.nextElementSibling : null;
  }

  function init() {
    document.querySelectorAll("a[href]").forEach(function (a) {
      var key = platformOf(a);
      if (key) {
        a.href = social[key];
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        if (!a.getAttribute("aria-label") && !a.textContent.trim()) a.setAttribute("aria-label", key);
        return;
      }
      if (a.getAttribute("href") === "#" && /scroll/i.test(a.textContent)) {
        a.addEventListener("click", function (e) {
          e.preventDefault();
          var target = nextSection(a);
          if (!target) return;
          var smoother = window.ScrollSmoother && window.ScrollSmoother.get && window.ScrollSmoother.get();
          if (smoother) smoother.scrollTo(target, true, "top top");
          else target.scrollIntoView({ behavior: "smooth" });
        });
      }
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
