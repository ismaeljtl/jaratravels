import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, RefreshCw, Trash2, Calendar, Users, Mail, Phone, MessageSquare, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
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
  const { user, session, isLoading: authLoading, signOut } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  const fetchBookings = async () => {
    if (!session) return;

    setIsLoading(true);
    try {
      const url = statusFilter !== "all" ? `?status=${statusFilter}` : "";
      const { data, error } = await supabase.functions.invoke(`admin-bookings${url}`, {
        headers: { 
          Authorization: `Bearer ${session.access_token}`
        }
      });

      if (error || data?.error) {
        if (data?.error === "Unauthorized") {
          toast.error("Sessão expirada. Por favor, faça login novamente.");
          await signOut();
          navigate("/auth");
        } else {
          toast.error("Erro ao carregar reservas");
        }
        setIsLoading(false);
        return;
      }

      setBookings(data.bookings || []);
    } catch (err) {
      toast.error("Erro ao carregar reservas");
    }
    setIsLoading(false);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    if (!session) return;

    try {
      const { data, error } = await supabase.functions.invoke('admin-bookings', {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${session.access_token}` },
        body: { id, status: newStatus }
      });

      if (error || data?.error) {
        toast.error("Erro ao atualizar estado");
        return;
      }

      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
      toast.success("Estado atualizado");
    } catch (err) {
      toast.error("Erro ao atualizar estado");
    }
  };

  const deleteBooking = async (id: string) => {
    if (!session) return;

    try {
      const { data, error } = await supabase.functions.invoke(`admin-bookings?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${session.access_token}` }
      });

      if (error || data?.error) {
        toast.error("Erro ao eliminar reserva");
        return;
      }

      setBookings(prev => prev.filter(b => b.id !== id));
      toast.success("Reserva eliminada");
    } catch (err) {
      toast.error("Erro ao eliminar reserva");
    }
  };

  const handleLogout = async () => {
    await signOut();
    toast.success("Logout efetuado");
    navigate("/auth");
  };

  useEffect(() => {
    if (user && session) {
      fetchBookings();
    }
  }, [user, session, statusFilter]);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      pending: "secondary",
      confirmed: "default",
      cancelled: "destructive",
      completed: "outline"
    };
    const labels: Record<string, string> = {
      pending: "Pendente",
      confirmed: "Confirmado",
      cancelled: "Cancelado",
      completed: "Concluído"
    };
    return <Badge variant={variants[status] || "secondary"}>{labels[status] || status}</Badge>;
  };

  const getPaymentLabel = (method: string) => {
    const labels: Record<string, string> = {
      "mbway": "MBWay",
      "bank-transfer": "Transferência",
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

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!user) {
    return null;
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
            <div>
              <h1 className="text-2xl font-bold">Painel de Reservas</h1>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchBookings}
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
              Atualizar
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
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
              <p className="text-sm text-muted-foreground">Total</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-yellow-600">
                {bookings.filter(b => b.status === "pending").length}
              </div>
              <p className="text-sm text-muted-foreground">Pendentes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">
                {bookings.filter(b => b.status === "confirmed").length}
              </div>
              <p className="text-sm text-muted-foreground">Confirmados</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600">
                {bookings.filter(b => b.status === "completed").length}
              </div>
              <p className="text-sm text-muted-foreground">Concluídos</p>
            </CardContent>
          </Card>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-4 mb-6">
          <Label>Filtrar por estado:</Label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="pending">Pendentes</SelectItem>
              <SelectItem value="confirmed">Confirmados</SelectItem>
              <SelectItem value="cancelled">Cancelados</SelectItem>
              <SelectItem value="completed">Concluídos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bookings Table */}
        <Card>
          <CardHeader>
            <CardTitle>Reservas</CardTitle>
            <CardDescription>Gerir todas as reservas de tours</CardDescription>
          </CardHeader>
          <CardContent>
            {bookings.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                Nenhuma reserva encontrada
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Serviço</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Participantes</TableHead>
                      <TableHead>Pagamento</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Ações</TableHead>
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
                              <SelectItem value="pending">Pendente</SelectItem>
                              <SelectItem value="confirmed">Confirmado</SelectItem>
                              <SelectItem value="cancelled">Cancelado</SelectItem>
                              <SelectItem value="completed">Concluído</SelectItem>
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
                                title="Ver mensagem"
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
                                  <AlertDialogTitle>Eliminar Reserva</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Tem a certeza que pretende eliminar a reserva de {booking.name}? Esta ação não pode ser revertida.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => deleteBooking(booking.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Eliminar
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
                <AlertDialogTitle>Mensagem de {selectedBooking.name}</AlertDialogTitle>
                <AlertDialogDescription className="whitespace-pre-wrap">
                  {selectedBooking.message}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Fechar</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
};

export default Admin;
