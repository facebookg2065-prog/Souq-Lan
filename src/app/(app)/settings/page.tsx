import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div>
      <div className="mb-4">
        <h1 className="font-semibold text-3xl">Settings</h1>
        <p className="text-muted-foreground">Manage your account and store settings.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>
            This section is under construction. Check back later for account management options.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Settings for your profile, store, and notifications will be available here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
