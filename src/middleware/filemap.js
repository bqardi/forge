export function filemap(req, res, next) {
  let url = req.url;

  // Normalize URLs
  if (url.endsWith(".html")) {
    url = url.replace(".html", "");
  }

  next();
}
