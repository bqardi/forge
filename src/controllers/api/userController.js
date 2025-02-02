import { updateUser, createUser, deleteUser } from "../../services/user.js";
import { event, hook } from "../../utils/hookManager/index.js";

export async function createUserController(req, res) {
  try {
    if (!req.body.username) {
      return res.status(400).json({ message: "Username is required" });
    }

    const affectedRows = await createUser(req.body);

    if (affectedRows === 0) {
      return res.status(500).json({ message: "Internal server error" });
    }

    await hook.action(event.onRouteBackend, "user-create");
    req.session.notification = {
      type: "success",
      message: "User created successfully!",
    };
    res.status(200).json({ message: req.session.notification.message });
  } catch (err) {
    console.error("Failed to update user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateUserController(req, res) {
  try {
    const affectedRows = await updateUser(req.body);

    if (affectedRows === -1)
      return res.status(200).json({ message: "Nothing to update" });
    if (affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    await hook.action(event.onRouteBackend, "user-update");
    req.session.notification = {
      type: "success",
      message: "User updated successfully!",
    };
    res.status(200).json({ message: req.session.notification.message });
  } catch (err) {
    console.error("Failed to update profile:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteUserController(req, res) {
  try {
    const id = req.params.id;

    const affectedRows = await deleteUser(id);

    if (affectedRows === 0) {
      return res.status(500).json({ message: "Internal server error" });
    }

    if (affectedRows === -1) {
      return res.status(400).json({ message: "Cannot delete the last user" });
    }

    await hook.action(event.onRouteBackend, "user-delete");
    req.session.notification = {
      type: "success",
      message: "User deleted successfully!",
    };
    res.status(200).json({ message: req.session.notification.message });
  } catch (err) {
    console.error("Failed to update user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}
