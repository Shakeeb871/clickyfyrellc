// Phosphor icons are bundled locally (assets/vendor/phosphor) so the site does not depend on unpkg.
var head = document.getElementsByTagName("head")[0];

for (const weight of ["regular", "thin", "light", "bold", "fill", "duotone"]) {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = "assets/vendor/phosphor/" + weight + "/style.css";
  head.appendChild(link);
}
