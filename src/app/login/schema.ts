import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email('Invalid email address').min(1,'Email harus diisi'),
    password: z.string().min(6, 'Password harus diisi'),
  });
  
  export  type LoginFormInputs = z.infer<typeof loginSchema>;