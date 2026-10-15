/*
 * Form handling for every page: contact / comment forms, newsletter forms and
 * the header search. Settings come from assets/js/site-config.js.
 */
(function () {
  "use strict";

  var config = window.SITE_CONFIG || {};
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  // Field names derived from the template's placeholders (inputs ship without names)
  var NAME_MAP = [
    [/name/i, "name"],
    [/mail/i, "email"],
    [/phone|mobile/i, "phone"],
    [/department|service/i, "department"],
    [/subject/i, "subject"],
    [/website|url/i, "website"],
    [/message|comment/i, "message"],
  ];

  function toast(type, title, text) {
    if (!document.getElementById("toast-container")) {
      var c = document.createElement("div");
      c.id = "toast-container";
      document.body.appendChild(c);
    }
    var icon = type === "success" ? "ph-fill ph-check-circle" : "ph-fill ph-warning-circle";
    if (typeof window.toastMessage === "function") {
      window.toastMessage(type, title, text, icon);
    } else {
      window.alert(title + "\n" + text);
    }
  }

  function formType(form) {
    if (form.querySelector(".search-input-field")) return "search";
    var fields = form.querySelectorAll("input:not([type=hidden]), textarea, select");
    if (fields.length === 1 && (fields[0].type === "email" || /mail/i.test(fields[0].placeholder))) {
      return "newsletter";
    }
    return form.closest(".blog-details-area, .comment-area") || /comment/i.test(form.textContent)
      ? "comment"
      : "contact";
  }

  function prepareFields(form) {
    var used = {};
    form.querySelectorAll("input, textarea, select").forEach(function (el) {
      if (el.name || el.type === "hidden" || el.type === "submit") return;
      var hint = (el.placeholder || el.getAttribute("aria-label") || "") + " " + el.type;
      var name = el.tagName === "TEXTAREA" ? "message" : "field";
      for (var i = 0; i < NAME_MAP.length; i++) {
        if (NAME_MAP[i][0].test(hint)) { name = NAME_MAP[i][1]; break; }
      }
      if (used[name]) name = name + "_" + (++used[name]); else used[name] = 1;
      el.name = name;
      if (name === "email") el.type = "email";
      if (name === "phone") el.type = "tel";
      if (!el.getAttribute("aria-label") && el.placeholder) el.setAttribute("aria-label", el.placeholder);
    });
    // Messages are optional in the template but empty enquiries are useless
    var msg = form.querySelector("textarea");
    if (msg) msg.required = true;

    // Honeypot against spam bots; contact.php rejects anything that fills it
    if (!form.querySelector("[name=_gotcha]")) {
      var trap = document.createElement("input");
      trap.type = "text";
      trap.name = "_gotcha";
      trap.tabIndex = -1;
      trap.autocomplete = "off";
      trap.setAttribute("aria-hidden", "true");
      trap.style.cssText = "position:absolute;left:-9999px;width:1px;height:1px;opacity:0";
      form.appendChild(trap);
    }
  }

  // Template uses <a href="javascript:void(0)"> as the send button; make it submit
  function wireSubmitLinks(form) {
    form.querySelectorAll('a[href^="javascript"], a.theme-btn-main').forEach(function (a) {
      a.setAttribute("role", "button");
      a.addEventListener("click", function (e) {
        e.preventDefault();
        if (form.requestSubmit) form.requestSubmit(); else form.dispatchEvent(new Event("submit", { cancelable: true }));
      });
    });
  }

  function validate(form) {
    var firstBad = null;
    form.querySelectorAll("input, textarea, select").forEach(function (el) {
      if (el.name === "_gotcha" || el.type === "hidden") return;
      var v = el.value.trim();
      var ok = true;
      if (el.required && !v) ok = false;
      else if (el.type === "email" && v && !EMAIL_RE.test(v)) ok = false;
      else if (el.type === "tel" && v && !/^[+()\d\s.-]{6,20}$/.test(v)) ok = false;
      el.classList.toggle("is-invalid", !ok);
      el.setAttribute("aria-invalid", ok ? "false" : "true");
      if (!ok && !firstBad) firstBad = el;
    });
    if (firstBad) {
      firstBad.focus();
      var label = firstBad.placeholder || firstBad.name;
      toast("danger", "Please check the form", firstBad.type === "email" && firstBad.value
        ? "Enter a valid email address."
        : label.replace(/\.+$/, "") + " is required.");
      return false;
    }
    return true;
  }

  function mailtoFallback(form, type) {
    var to = config.contactEmail;
    if (!to) return false;
    var lines = [];
    new FormData(form).forEach(function (v, k) {
      if (k !== "_gotcha" && v) lines.push(k.charAt(0).toUpperCase() + k.slice(1) + ": " + v);
    });
    var subject = type === "newsletter" ? "Newsletter subscription" : "Website enquiry";
    window.location.href = "mailto:" + to + "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(lines.join("\n"));
    return true;
  }

  function setBusy(form, busy) {
    form.classList.toggle("is-sending", busy);
    form.setAttribute("aria-busy", busy ? "true" : "false");
    form.querySelectorAll("button, a[role=button]").forEach(function (b) {
      b.style.pointerEvents = busy ? "none" : "";
      b.style.opacity = busy ? "0.6" : "";
    });
  }

  function send(form, type) {
    var data = new FormData(form);
    data.append("form_type", type);
    data.append("page", window.location.pathname.split("/").pop() || "index.html");
    setBusy(form, true);

    return fetch(config.formEndpoint || "contact.php", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    })
      .then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (body) {
          if (!res.ok || body.ok === false) {
            var err = new Error(body.message || body.error || "HTTP " + res.status);
            err.server = res.status < 500 && res.status !== 404 && res.status !== 405;
            throw err;
          }
          return body;
        });
      })
      .then(function (body) {
        form.reset();
        form.querySelectorAll(".is-invalid").forEach(function (el) { el.classList.remove("is-invalid"); });
        toast("success", type === "newsletter" ? "Subscribed" : "Message sent",
          body.message || (type === "newsletter"
            ? "Thanks! You are on the list."
            : "Thanks for reaching out. We'll get back to you shortly."));
      })
      .catch(function (err) {
        // Validation errors from the server are shown as-is
        if (err.server) {
          toast("danger", "Not sent", err.message);
          return;
        }
        // Endpoint unreachable (e.g. static hosting without PHP): hand over to the mail app
        if (mailtoFallback(form, type)) {
          toast("success", "Almost done", "Your email app has opened with the message. Just press send.");
        } else {
          toast("danger", "Not sent", "Something went wrong. Please try again later.");
        }
      })
      .then(function () { setBusy(form, false); });
  }

  function handleSearch(form) {
    var input = form.querySelector(".search-input-field");
    input.name = "q";
    input.setAttribute("aria-label", "Search the site");
    form.setAttribute("action", "search.html");
    form.setAttribute("method", "get");
    form.setAttribute("role", "search");
    form.addEventListener("submit", function (e) {
      if (!input.value.trim()) {
        e.preventDefault();
        input.focus();
      }
    });
  }

  function init() {
    document.querySelectorAll("form").forEach(function (form) {
      if (form.dataset.formReady) return;
      form.dataset.formReady = "1";
      var type = formType(form);
      if (type === "search") return handleSearch(form);

      form.setAttribute("novalidate", "");
      form.setAttribute("method", "post");
      form.setAttribute("action", config.formEndpoint || "contact.php");
      prepareFields(form);
      wireSubmitLinks(form);
      form.addEventListener("input", function (e) {
        if (e.target.classList.contains("is-invalid")) e.target.classList.remove("is-invalid");
      });
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        if (form.classList.contains("is-sending")) return;
        if (form.querySelector("[name=_gotcha]").value) return; // bot
        if (validate(form)) send(form, type);
      });
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
