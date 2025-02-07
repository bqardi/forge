import bcrypt from "bcrypt";
import User from "../models/User.js";
import { event, hook } from "../utils/hookManager/index.js";
import { firstTimeCleanup } from "../utils/scripts/firstTimeCleanup.js";

export async function firstTimeSetupController(req, res) {
  await hook.action(event.onRouteBackend, "first-time-setup");
  res.render("first-time-setup", {
    layoutType: "first-time-setup",
    title: "Setup",
    content: "Please setup a user to continue",
  });
}

export async function firstTimeSetupAttemptController(req, res) {
  const { username, password, email } = req.body;

  try {
    if (await User.findOne({ where: { username } })) {
      console.log("User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    await hook.action(event.onRouteBackend, "first-time-setup-attempt");

    firstTimeCleanup();

    res.json({ message: "User created" });
  } catch (err) {
    console.error("Setup error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}
