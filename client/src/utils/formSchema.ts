"use client";

import { z } from "zod";

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "⚡ Username must be at least 2 characters long!" })
    .max(50, { message: "🚀 Username can't exceed 50 characters!" }),
  email: z
    .string()
    .email({ message: "📧 Please enter a valid email address!" }),
  password: z
    .string()
    .min(8, { message: "🔒 Password must be at least 8 characters long!" }),
});

export default formSchema;
