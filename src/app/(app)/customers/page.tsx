import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function CustomersPage() {
  return (
    <div>
      <div className="mb-4">
        <h1 className="font-semibold text-3xl">Customers</h1>
        <p className="text-muted-foreground">View and manage your customer base.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Customers</CardTitle>
          <CardDescription>
            This section is under construction. Check back later for full customer management features.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Customer list and management tools will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
