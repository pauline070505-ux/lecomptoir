import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  ShieldCheck, LogOut, Package, Gavel, Trophy, Clock,
  Plus, Pencil, Trash2, X, Save, StopCircle,
} from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type AuctionObject = Tables<"auction_objects">;

interface AuctionForm {
  name: string;
  description: string;
  category: string;
  creator: string;
  image: string;
  starting_price: number;
  current_bid: number;
  min_bid_increment: number;
  ends_at: string;
}

const emptyForm: AuctionForm = {
  name: "", description: "", category: "", creator: "", image: "",
  starting_price: 0, current_bid: 0, min_bid_increment: 1,
  ends_at: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
};

const AdminDashboard = () => {
  const [objects, setObjects] = useState<AuctionObject[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<AuctionForm>(emptyForm);
  const [showAdd, setShowAdd] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchObjects = async () => {
    const { data } = await supabase
      .from("auction_objects")
      .select("*")
      .order("created_at", { ascending: false });
    setObjects(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchObjects(); }, []);

  const stats = {
    total: objects.length,
    active: objects.filter((o) => new Date(o.ends_at) > new Date() && !o.winner_user_id).length,
    sold: objects.filter((o) => o.payment_status === "paid").length,
    pending: objects.filter((o) => o.payment_status === "awaiting_payment").length,
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const handleEndNow = async (id: number) => {
    if (!confirm("Terminer cette enchère maintenant ?")) return;
    const { error } = await supabase
      .from("auction_objects")
      .update({ ends_at: new Date().toISOString() })
      .eq("id", id);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Enchère terminée !" });
      fetchObjects();
    }
  };

  const handleAdd = async () => {
    const { ends_at, ...rest } = form;
    const { error } = await supabase.from("auction_objects").insert({
      ...rest,
      current_bid: form.starting_price,
      ends_at: new Date(ends_at).toISOString(),
    });
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Produit ajouté !" });
      setShowAdd(false);
      setForm(emptyForm);
      fetchObjects();
    }
  };

  const handleUpdate = async (id: number) => {
    const { ends_at, ...rest } = form;
    const { error } = await supabase.from("auction_objects").update({
      ...rest,
      ends_at: new Date(ends_at).toISOString(),
    }).eq("id", id);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Produit mis à jour !" });
      setEditingId(null);
      fetchObjects();
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer ce produit ?")) return;
    const { error } = await supabase.from("auction_objects").delete().eq("id", id);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Produit supprimé" });
      fetchObjects();
    }
  };

  const startEdit = (obj: AuctionObject) => {
    setEditingId(obj.id);
    setForm({
      name: obj.name, description: obj.description, category: obj.category,
      creator: obj.creator, image: obj.image, starting_price: obj.starting_price,
      current_bid: obj.current_bid, min_bid_increment: obj.min_bid_increment,
      ends_at: new Date(obj.ends_at).toISOString().slice(0, 16),
    });
  };

  const renderFormFields = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {([
        ["name", "Nom", "text"],
        ["category", "Catégorie", "text"],
        ["creator", "Créateur", "text"],
        ["image", "URL Image", "text"],
        ["starting_price", "Prix de départ (€)", "number"],
        ["min_bid_increment", "Incrément minimum (€)", "number"],
      ] as const).map(([key, label, type]) => (
        <div key={key} className="space-y-1">
          <Label>{label}</Label>
          <Input
            type={type}
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: type === "number" ? Number(e.target.value) : e.target.value })}
          />
        </div>
      ))}
      <div className="md:col-span-2 space-y-1">
        <Label>Description</Label>
        <textarea
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-[80px]"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-serif font-semibold text-primary">Administration</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" /> Déconnexion
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total produits", value: stats.total, icon: Package, color: "text-primary" },
            { label: "Enchères actives", value: stats.active, icon: Gavel, color: "text-accent" },
            { label: "Vendus", value: stats.sold, icon: Trophy, color: "text-[hsl(var(--success))]" },
            { label: "En attente", value: stats.pending, icon: Clock, color: "text-[hsl(var(--warning))]" },
          ].map((s) => (
            <Card key={s.label}>
              <CardContent className="pt-6 flex items-center gap-4">
                <s.icon className={`h-8 w-8 ${s.color}`} />
                <div>
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add product */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-serif">Gestion des produits</CardTitle>
            <Button size="sm" onClick={() => { setShowAdd(!showAdd); setForm(emptyForm); }}>
              {showAdd ? <X className="h-4 w-4 mr-1" /> : <Plus className="h-4 w-4 mr-1" />}
              {showAdd ? "Annuler" : "Ajouter"}
            </Button>
          </CardHeader>
          {showAdd && (
            <CardContent className="space-y-4 border-t border-border pt-4">
              {renderFormFields()}
              <Button onClick={handleAdd}>
                <Save className="h-4 w-4 mr-2" /> Enregistrer
              </Button>
            </CardContent>
          )}
          <CardContent>
            {loading ? (
              <p className="text-muted-foreground text-center py-8">Chargement...</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Catégorie</TableHead>
                      <TableHead>Prix départ</TableHead>
                      <TableHead>Enchère actuelle</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {objects.map((obj) => (
                      <TableRow key={obj.id}>
                        {editingId === obj.id ? (
                          <TableCell colSpan={6}>
                            <div className="space-y-4">
                              {renderFormFields()}
                              <div className="flex gap-2">
                                <Button size="sm" onClick={() => handleUpdate(obj.id)}>
                                  <Save className="h-4 w-4 mr-1" /> Sauvegarder
                                </Button>
                                <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>
                                  Annuler
                                </Button>
                              </div>
                            </div>
                          </TableCell>
                        ) : (
                          <>
                            <TableCell className="font-medium">{obj.name}</TableCell>
                            <TableCell>{obj.category}</TableCell>
                            <TableCell>{obj.starting_price} €</TableCell>
                            <TableCell>{obj.current_bid} €</TableCell>
                            <TableCell>
                              {obj.winner_user_id
                                ? obj.payment_status === "paid"
                                  ? <span className="text-[hsl(var(--success))] font-medium">Vendu</span>
                                  : <span className="text-[hsl(var(--warning))] font-medium">En attente</span>
                                : new Date(obj.ends_at) > new Date()
                                  ? <span className="text-accent font-medium">Active</span>
                                  : <span className="text-muted-foreground">Terminée</span>}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-1">
                                <Button size="icon" variant="ghost" onClick={() => startEdit(obj)}>
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleDelete(obj.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
