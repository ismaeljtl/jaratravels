import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Lock, RefreshCw, Trash2, Calendar, Users, Mail, Phone, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  service_name: string;
  service_price: string;
  service_duration: string;
  booking_date: string;
  participants: number;
  payment_method: string;
  message: string | null;
  status: string;
  created_at: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminKey, setAdminKey] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminKey.trim()) {
      toast.error("Please enter the admin key");
      return;
    }
    
    // Store key and try to fetch bookings to validate
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('admin-bookings', {
        headers: { 'x-admin-key': adminKey }
      });

      if (error || data?.error) {
        toast.error("Invalid admin key");
        setIsLoading(false);
        return;
      }

      setIsAuthenticated(true);
      setBookings(data.bookings || []);
      sessionStorage.setItem("adminKey", adminKey);
      toast.success("Login successful");
    } catch (err) {
      toast.error("Authentication failed");
    }
    setIsLoading(false);
  };

  const fetchBookings = async () => {
    const key = sessionStorage.getItem("adminKey") || adminKey;
    if (!key) return;

    setIsLoading(true);
    try {
      const url = statusFilter !== "all" ? `?status=${statusFilter}` : "";
      const { data, error } = await supabase.functions.invoke(`admin-bookings${url}`, {
        headers: { 'x-admin-key': key }
      });

      if (error || data?.error) {
        if (data?.error === "Unauthorized") {
          setIsAuthenticated(false);
          sessionStorage.removeItem("adminKey");
          toast.error("Session expired");
        } else {
          toast.error("Failed to fetch bookings");
        }
        setIsLoading(false);
        return;
      }

      setBookings(data.bookings || []);
    } catch (err) {
      toast.error("Failed to fetch bookings");
    }
    setIsLoading(false);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    const key = sessionStorage.getItem("adminKey");
    if (!key) return;

    try {
      const { data, error } = await supabase.functions.invoke('admin-bookings', {
        method: 'PATCH',
        headers: { 'x-admin-key': key },
        body: { id, status: newStatus }
      });

      if (error || data?.error) {
        toast.error("Failed to update status");
        return;
      }

      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
      toast.success("Status updated");
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const deleteBooking = async (id: string) => {
    const key = sessionStorage.getItem("adminKey");
    if (!key) return;

    try {
      const { data, error } = await supabase.functions.invoke(`admin-bookings?id=${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-key': key }
      });

      if (error || data?.error) {
        toast.error("Failed to delete booking");
        return;
      }

      setBookings(prev => prev.filter(b => b.id !== id));
      toast.success("Booking deleted");
    } catch (err) {
      toast.error("Failed to delete booking");
    }
  };

  useEffect(() => {
    const savedKey = sessionStorage.getItem("adminKey");
    if (savedKey) {
      setAdminKey(savedKey);
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings();
    }
  }, [isAuthenticated, statusFilter]);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      pending: "secondary",
      confirmed: "default",
      cancelled: "destructive",
      completed: "outline"
    };
    return <Badge variant={variants[status] || "secondary"}>{status}</Badge>;
  };

  const getPaymentLabel = (method: string) => {
    const labels: Record<string, string> = {
      "mbway": "MBWay",
      "bank-transfer": "Bank Transfer",
      "paypal": "PayPal"
    };
    return labels[method] || method;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-PT", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>Admin Access</CardTitle>
            <CardDescription>Enter your admin key to access the dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="adminKey">Admin Key</Label>
                <Input
                  id="adminKey"
                  type="password"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  placeholder="Enter admin key"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Login"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => navigate("/")}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold">Bookings Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchBookings}
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                sessionStorage.removeItem("adminKey");
                setIsAuthenticated(false);
                setAdminKey("");
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{bookings.length}</div>
              <p className="text-sm text-muted-foreground">Total Bookings</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-yellow-600">
                {bookings.filter(b => b.status === "pending").length}
              </div>
              <p className="text-sm text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">
                {bookings.filter(b => b.status === "confirmed").length}
              </div>
              <p className="text-sm text-muted-foreground">Confirmed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600">
                {bookings.filter(b => b.status === "completed").length}
              </div>
              <p className="text-sm text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-4 mb-6">
          <Label>Filter by status:</Label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bookings Table */}
        <Card>
          <CardHeader>
            <CardTitle>Bookings</CardTitle>
            <CardDescription>Manage all tour bookings</CardDescription>
          </CardHeader>
          <CardContent>
            {bookings.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No bookings found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Participants</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{booking.name}</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {booking.email}
                            </div>
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {booking.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{booking.service_name}</div>
                          <div className="text-sm text-muted-foreground">
                            {booking.service_price} • {booking.service_duration}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            {formatDate(booking.booking_date)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            {booking.participants}
                          </div>
                        </TableCell>
                        <TableCell>{getPaymentLabel(booking.payment_method)}</TableCell>
                        <TableCell>
                          <Select
                            value={booking.status}
                            onValueChange={(value) => updateStatus(booking.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue>{getStatusBadge(booking.status)}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="confirmed">Confirmed</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {booking.message && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setSelectedBooking(booking)}
                                title="View message"
                              >
                                <MessageSquare className="w-4 h-4" />
                              </Button>
                            )}
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-destructive">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Booking</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete this booking from {booking.name}? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => deleteBooking(booking.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Message Modal */}
        {selectedBooking && (
          <AlertDialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Message from {selectedBooking.name}</AlertDialogTitle>
                <AlertDialogDescription className="whitespace-pre-wrap">
                  {selectedBooking.message}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Close</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
};

export default Admin;
