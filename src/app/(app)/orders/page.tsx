import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function OrdersPage() {
  return (
    <div>
      <div className="mb-4">
        <h1 className="font-semibold text-3xl">Orders</h1>
        <p className="text-muted-foreground">View and manage all customer orders.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
          <CardDescription>
            This section is under construction. Check back later for full order management features.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Order management functionality will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
