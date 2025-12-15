import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ChatPage() {
  return (
    <div>
      <div className="mb-4">
        <h1 className="font-semibold text-3xl">Chat & Support</h1>
        <p className="text-muted-foreground">Communicate with buyers and manage support tickets.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Messaging Center</CardTitle>
          <CardDescription>
            This section is under construction. Check back later for internal messaging features.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>The chat interface will be available here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
