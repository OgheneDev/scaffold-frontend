"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuthStore } from "@/lib/auth/auth-store";
import { authApi } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(8, "Must be at least 8 characters"),
  newPassword: z.string().min(8, "Must be at least 8 characters"),
});

const deleteSchema = z.object({
  password: z.string().min(8, "Must be at least 8 characters"),
});

export default function SettingsPage() {
  const user = useAuthStore((s) => s.user);
  const setSession = useAuthStore((s) => s.setSession);
  const accessToken = useAuthStore((s) => s.accessToken);
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user?.name ?? "" },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
  });

  const deleteForm = useForm<z.infer<typeof deleteSchema>>({
    resolver: zodResolver(deleteSchema),
  });

  const [deleteOpen, setDeleteOpen] = useState(false);

  async function onProfileSubmit(values: z.infer<typeof profileSchema>) {
    try {
      const updated = await authApi.updateProfile(values);
      if (accessToken) setSession({ ...updated }, accessToken);
      toast.success("Profile updated");
    } catch (err) {
      toast.error(
        err instanceof ApiError ? err.message : "Couldn't update your profile",
      );
    }
  }

  async function onPasswordSubmit(values: z.infer<typeof passwordSchema>) {
    try {
      await authApi.changePassword(values);
      toast.success("Password changed. Please log in again.");
      passwordForm.reset();
      await logout();
      router.push("/login");
    } catch (err) {
      toast.error(
        err instanceof ApiError ? err.message : "Couldn't change your password",
      );
    }
  }

  async function onDeleteSubmit(values: z.infer<typeof deleteSchema>) {
    try {
      await authApi.deleteAccount(values);
      toast.success("Account deleted");
      router.push("/");
    } catch (err) {
      toast.error(
        err instanceof ApiError ? err.message : "Couldn't delete your account",
      );
    }
  }

  return (
    <div className="max-w-xl space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-fg">
          Settings
        </h1>
        <p className="mt-1 text-sm text-fg-muted">
          Manage your profile, security, and account.
        </p>
      </div>

      <Card>
        <form onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              Your name is shown across the dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...profileForm.register("name")} />
              {profileForm.formState.errors.name ? (
                <p className="text-xs text-danger">
                  {profileForm.formState.errors.name.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={user?.email ?? ""} disabled />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              size="sm"
              disabled={profileForm.formState.isSubmitting}
            >
              {profileForm.formState.isSubmitting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : null}
              Save changes
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card>
        <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Changing your password signs you out of every device.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="currentPassword">Current password</Label>
              <Input
                id="currentPassword"
                type="password"
                {...passwordForm.register("currentPassword")}
              />
              {passwordForm.formState.errors.currentPassword ? (
                <p className="text-xs text-danger">
                  {passwordForm.formState.errors.currentPassword.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="newPassword">New password</Label>
              <Input
                id="newPassword"
                type="password"
                {...passwordForm.register("newPassword")}
              />
              {passwordForm.formState.errors.newPassword ? (
                <p className="text-xs text-danger">
                  {passwordForm.formState.errors.newPassword.message}
                </p>
              ) : null}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              size="sm"
              variant="secondary"
              disabled={passwordForm.formState.isSubmitting}
            >
              {passwordForm.formState.isSubmitting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : null}
              Update password
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card className="border-danger/30">
        <CardHeader>
          <CardTitle className="text-danger">Danger zone</CardTitle>
          <CardDescription>
            Permanently delete your account and every site in it.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                Delete account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <form onSubmit={deleteForm.handleSubmit(onDeleteSubmit)}>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete your account?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This deletes your account and all sites permanently. Confirm
                    with your password.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="space-y-1.5">
                  <Label htmlFor="deletePassword">Password</Label>
                  <Input
                    id="deletePassword"
                    type="password"
                    {...deleteForm.register("password")}
                  />
                  {deleteForm.formState.errors.password ? (
                    <p className="text-xs text-danger">
                      {deleteForm.formState.errors.password.message}
                    </p>
                  ) : null}
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
                  <Button
                    type="submit"
                    variant="destructive"
                    disabled={deleteForm.formState.isSubmitting}
                  >
                    {deleteForm.formState.isSubmitting ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : null}
                    Delete account
                  </Button>
                </AlertDialogFooter>
              </form>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </div>
  );
}
