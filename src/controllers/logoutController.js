export function logoutController(req, res) {
  res
    .status(200)
    .clearCookie("auth_token")
    .json({ message: "Logged out successfully" });
}
