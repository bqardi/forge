import { updateUser } from "../../services/user.js";
import { event, hook } from "../../utils/hookManager/index.js";

export async function updateUserController(req, res) {
  try {
    const affectedRows = await updateUser(req.body);

    if (affectedRows === -1)
      return res.status(200).json({ message: "Nothing to update" });
    if (affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    await hook.action(event.onRouteBackend, "api");
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("Failed to update profile:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}
