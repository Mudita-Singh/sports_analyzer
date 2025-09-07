import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  mobile: text("mobile").notNull().unique(),
  password: text("password").notNull(),
  isGuest: text("is_guest").default("false"),
});

export const userProfiles = pgTable("user_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  height: integer("height").notNull(), // in cm
  weight: integer("weight").notNull(), // in kg
  age: integer("age").notNull(),
  sport: text("sport").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  mobile: true,
  password: true,
  isGuest: true,
});

export const insertUserProfileSchema = createInsertSchema(userProfiles).pick({
  userId: true,
  height: true,
  weight: true,
  age: true,
  sport: true,
});

export const loginSchema = z.object({
  mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const userInfoSchema = z.object({
  height: z.number().min(120, "Height must be at least 120cm").max(250, "Height must be at most 250cm"),
  weight: z.number().min(30, "Weight must be at least 30kg").max(200, "Weight must be at most 200kg"),
  age: z.number().min(10, "Age must be at least 10").max(100, "Age must be at most 100"),
  sport: z.string().min(1, "Please select a sport"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;
export type UserProfile = typeof userProfiles.$inferSelect;
