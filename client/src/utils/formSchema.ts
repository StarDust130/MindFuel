"use client";

import { z } from "zod";

// Register schema validation
export const registerSchema = z.object({
  username: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(30, "Username can't exceed 30 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    )
    .trim(), // Trim whitespace
  email: z.string().email("Invalid email address").trim(),
  password: z
    .string()
    .min(8, "Password must be at least 6 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"), // e.g., !@#$%
  role: z.enum(["student", "teacher"]),
});

// Login schema validation
export const loginSchema = z.object({
  email: z.string().email("Invalid email address").trim(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"), // e.g., !@#$%
});
