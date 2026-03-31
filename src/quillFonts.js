import Quill from "quill";

const Font = Quill.import("formats/font");

Font.whitelist = [
  "sans-serif",
  "serif",
  "monospace",
  "poppins",
  "roboto",
  "arial",
  "times-new-roman",
  "courier-new",
  "georgia",
  "tahoma",
  "verdana",
];

Quill.register(Font, true);
