import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AnalyticsPage() {
  return (
    <div>
      <div className="mb-4">
        <h1 className="font-semibold text-3xl">Analytics</h1>
        <p className="text-muted-foreground">Analyze your sales and performance.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Analytics Dashboard</CardTitle>
          <CardDescription>
            This section is under construction. Check back later for detailed analytics and reports.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Advanced analytics charts and data will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
