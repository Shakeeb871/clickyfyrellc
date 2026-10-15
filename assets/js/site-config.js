/*
 * Site-wide settings. Edit these values before going live.
 *
 * formEndpoint  Where every form (contact, comment, newsletter) is POSTed.
 *               "contact.php" works on any PHP host (cPanel, Hostinger, etc.).
 *               On a static host (GitHub Pages, Netlify) use a form service URL
 *               instead, e.g. "https://formspree.io/f/xxxxxxx".
 * contactEmail  Shown as a fallback: if the endpoint cannot be reached the
 *               visitor's mail app opens with the message already filled in.
 *               Also set the same address in contact.php ($TO_EMAIL).
 * social        Your profile URLs. Every social icon/link on every page is
 *               pointed at these automatically (assets/js/site.js).
 */
window.SITE_CONFIG = {
  siteName: "Clicky Fyre",
  formEndpoint: "contact.php",
  contactEmail: "info@example.com",
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    twitter: "https://x.com/",
    linkedin: "https://www.linkedin.com/",
    pinterest: "https://www.pinterest.com/",
    youtube: "https://www.youtube.com/",
    behance: "https://www.behance.net/",
    dribbble: "https://dribbble.com/",
  },
};
