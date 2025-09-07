import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { loginSchema, userInfoSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Login endpoint
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { mobile, password } = loginSchema.parse(req.body);
      
      const user = await storage.getUserByMobile(mobile);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      res.json({ user, success: true });
    } catch (error) {
      res.status(400).json({ message: "Invalid request data" });
    }
  });

  // Guest login endpoint
  app.post("/api/auth/guest", async (req, res) => {
    try {
      const user = await storage.createGuestUser();
      res.json({ user, success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to create guest user" });
    }
  });

  // Register endpoint
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { mobile, password } = loginSchema.parse(req.body);
      
      const existingUser = await storage.getUserByMobile(mobile);
      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      }
      
      const user = await storage.createUser({ mobile, password, isGuest: "false" });
      res.json({ user, success: true });
    } catch (error) {
      res.status(400).json({ message: "Invalid request data" });
    }
  });

  // Get user profile
  app.get("/api/profile/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const profile = await storage.getUserProfile(userId);
      
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      
      res.json(profile);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });

  // Create/Update user profile
  app.post("/api/profile", async (req, res) => {
    try {
      const { userId, height, weight, age, sport } = req.body;
      const profileData = userInfoSchema.parse({ height, weight, age, sport });
      
      const existingProfile = await storage.getUserProfile(userId);
      
      let profile;
      if (existingProfile) {
        profile = await storage.updateUserProfile(userId, profileData);
      } else {
        profile = await storage.createUserProfile({ 
          userId, 
          ...profileData 
        });
      }
      
      res.json({ profile, success: true });
    } catch (error) {
      res.status(400).json({ message: "Invalid profile data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
