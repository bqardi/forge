import { setSetting } from "../../services/setting.js";
import { initializeTheme } from "../../utils/themeHandler.js";

export async function themeToggleController(req, res) {
  try {
    const { theme, isActive } = req.body;

    const setting = await setSetting({
      key: "active_theme",
      value: theme,
      isActive,
    });

    !isActive && (await initializeTheme(theme));

    res.status(200).json({ message: "Theme updated successfully" });
  } catch (err) {
    console.error("Failed to update theme:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}
