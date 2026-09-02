"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff, Check, X } from "lucide-react";
import { AuthShell } from "@/components/layout/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/lib/auth/auth-store";
import { ApiError } from "@/lib/api/client";

// Strict validation schema enforcing strong passwords and confirmation
const schema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "Must contain a lowercase letter")
      .regex(/[A-Z]/, "Must contain an uppercase letter")
      .regex(/\d/, "Must contain a number")
      .regex(/[^a-zA-Z\d]/, "Must contain a special character"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

export default function RegisterPage() {
  const registerUser = useAuthStore((s) => s.register);
  const router = useRouter();

  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // useForm configured with mode: "onChange" to enable real-time disabled state on the submit button
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const passwordValue = watch("password", "");

  // Dynamic rules for the visual checklist
  const passwordRules = [
    { label: "At least 8 characters", met: passwordValue.length >= 8 },
    {
      label: "Uppercase & lowercase letters",
      met: /[a-z]/.test(passwordValue) && /[A-Z]/.test(passwordValue),
    },
    { label: "At least one number", met: /\d/.test(passwordValue) },
    {
      label: "At least one special character",
      met: /[^a-zA-Z\d]/.test(passwordValue),
    },
  ];

  const strengthScore = passwordRules.filter((rule) => rule.met).length;
  const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];

  const getScoreColor = (score: number) => {
    if (score <= 1) return "bg-danger";
    if (score === 2) return "bg-warning";
    if (score === 3) return "bg-success/70";
    return "bg-success";
  };

  async function onSubmit(values: FormValues) {
    setServerError(null);
    try {
      await registerUser(values.name, values.email, values.password);
      toast.success("Account created");
      router.push("/dashboard");
    } catch (err) {
      setServerError(
        err instanceof ApiError
          ? err.message
          : "Something went wrong. Try again.",
      );
    }
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Start from a template and have a site live today."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-fg hover:text-accent">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            autoComplete="name"
            placeholder="Jane Cooper"
            {...register("name")}
          />
          {errors.name ? (
            <p className="text-xs text-danger">{errors.name.message}</p>
          ) : null}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            {...register("email")}
          />
          {errors.email ? (
            <p className="text-xs text-danger">{errors.email.message}</p>
          ) : null}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Create a strong password"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-fg-muted hover:text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>

          {/* Dynamic Password Strength Meter & Rules */}
          {passwordValue.length > 0 && (
            <div className="pt-2 flex flex-col gap-3">
              {/* Meter Bars */}
              <div className="flex gap-1.5 h-1.5">
                {[1, 2, 3, 4].map((index) => (
                  <div
                    key={index}
                    className={`h-full flex-1 rounded-full transition-colors duration-300 ${
                      index <= strengthScore
                        ? getScoreColor(strengthScore)
                        : "bg-bg-inset border border-border"
                    }`}
                  />
                ))}
              </div>

              {/* Requirement Checklist */}
              <div className="space-y-1.5">
                <p className="text-xs font-medium text-fg">
                  Password strength:{" "}
                  <span
                    className={
                      strengthScore === 4 ? "text-success" : "text-fg-muted"
                    }
                  >
                    {strengthLabels[strengthScore]}
                  </span>
                </p>
                <ul className="space-y-1.5">
                  {passwordRules.map((rule, idx) => (
                    <li
                      key={idx}
                      className={`flex items-center gap-2 text-xs transition-colors duration-200 ${
                        rule.met ? "text-success" : "text-fg-muted"
                      }`}
                    >
                      {rule.met ? (
                        <Check className="size-3.5" />
                      ) : (
                        <X className="size-3.5 opacity-50" />
                      )}
                      {rule.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-1.5 pt-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Repeat your password"
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-fg-muted hover:text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
            >
              {showConfirmPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword ? (
            <p className="text-xs text-danger">
              {errors.confirmPassword.message}
            </p>
          ) : null}
        </div>

        {serverError ? (
          <p className="rounded-md border border-danger/30 bg-danger/10 px-3 py-2 text-xs text-danger">
            {serverError}
          </p>
        ) : null}

        <Button
          type="submit"
          className="w-full mt-4"
          // Form cannot be submitted unless valid (strong password + fields match)
          disabled={isSubmitting || !isValid}
        >
          {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
          Create account
        </Button>
      </form>
    </AuthShell>
  );
}
