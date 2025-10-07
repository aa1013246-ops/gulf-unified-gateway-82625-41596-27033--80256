import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, FileText, Plus, Trash2, Copy, Check } from "lucide-react";
import { useCreateLink } from "@/hooks/useSupabase";
import { useToast } from "@/hooks/use-toast";
import { COUNTRIES } from "@/lib/countries";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

const CreateInvoiceLink = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const createLink = useCreateLink();
  const [generatedLink, setGeneratedLink] = useState<string>("");
  const [copied, setCopied] = useState(false);
  
  const countryData = COUNTRIES.find((c) => c.code === country);
  
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    invoiceNumber: "",
    notes: "",
  });

  const [items, setItems] = useState<InvoiceItem[]>([
    { id: "1", description: "", quantity: 1, price: 0 }
  ]);

  const addItem = () => {
    setItems([...items, { 
      id: Date.now().toString(), 
      description: "", 
      quantity: 1, 
      price: 0 
    }]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validation
      if (!formData.clientName || !formData.invoiceNumber) {
        toast({
          title: "خطأ",
          description: "يرجى ملء جميع الحقول المطلوبة",
          variant: "destructive",
        });
        return;
      }

      if (items.some(item => !item.description || item.price <= 0)) {
        toast({
          title: "خطأ",
          description: "يرجى إكمال تفاصيل جميع البنود",
          variant: "destructive",
        });
        return;
      }

      const result = await createLink.mutateAsync({
        type: "invoice",
        country_code: country!,
        payload: {
          client: {
            name: formData.clientName,
            email: formData.clientEmail,
            phone: formData.clientPhone,
          },
          invoiceNumber: formData.invoiceNumber,
          items: items,
          total: calculateTotal(),
          currency: countryData?.currency || "SAR",
          notes: formData.notes,
        },
      });

      setGeneratedLink(result.microsite_url);
    } catch (error) {
      console.error("Error creating invoice link:", error);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    toast({
      title: "تم النسخ",
      description: "تم نسخ الرابط إلى الحافظة",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  if (generatedLink) {
    return (
      <div className="min-h-screen py-12 bg-gradient-to-b from-background via-card/20 to-background" dir="rtl">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="p-8 text-center">
            <div className="w-20 h-20 bg-gradient-success rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4">تم إنشاء الفاتورة بنجاح!</h2>
            <p className="text-muted-foreground mb-6">
              شارك هذا الرابط مع العميل لعرض الفاتورة والدفع
            </p>
            <div className="bg-muted p-4 rounded-lg mb-6 break-all">
              <code className="text-sm">{generatedLink}</code>
            </div>
            <div className="flex gap-4 justify-center">
              <Button onClick={copyLink}>
                {copied ? (
                  <>
                    <Check className="w-4 h-4 ml-2" />
                    تم النسخ
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 ml-2" />
                    نسخ الرابط
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={() => setGeneratedLink("")}>
                إنشاء فاتورة جديدة
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-gradient-to-b from-background via-card/20 to-background" dir="rtl">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/services")}
            className="mb-4"
          >
            <ArrowRight className="ml-2 h-4 w-4" />
            العودة للخدمات
          </Button>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">إنشاء فاتورة إلكترونية</h1>
              <p className="text-muted-foreground">املأ البيانات لإنشاء فاتورة احترافية</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Client Information */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">معلومات العميل</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="clientName">اسم العميل *</Label>
                <Input
                  id="clientName"
                  value={formData.clientName}
                  onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                  placeholder="أدخل اسم العميل"
                  required
                />
              </div>
              <div>
                <Label htmlFor="invoiceNumber">رقم الفاتورة *</Label>
                <Input
                  id="invoiceNumber"
                  value={formData.invoiceNumber}
                  onChange={(e) => setFormData({...formData, invoiceNumber: e.target.value})}
                  placeholder="INV-001"
                  required
                />
              </div>
              <div>
                <Label htmlFor="clientEmail">البريد الإلكتروني</Label>
                <Input
                  id="clientEmail"
                  type="email"
                  value={formData.clientEmail}
                  onChange={(e) => setFormData({...formData, clientEmail: e.target.value})}
                  placeholder="client@example.com"
                />
              </div>
              <div>
                <Label htmlFor="clientPhone">رقم الهاتف</Label>
                <Input
                  id="clientPhone"
                  value={formData.clientPhone}
                  onChange={(e) => setFormData({...formData, clientPhone: e.target.value})}
                  placeholder="+966 XX XXX XXXX"
                />
              </div>
            </div>
          </Card>

          {/* Invoice Items */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">بنود الفاتورة</h2>
              <Button type="button" onClick={addItem} size="sm" variant="outline">
                <Plus className="ml-2 h-4 w-4" />
                إضافة بند
              </Button>
            </div>
            
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="grid md:grid-cols-12 gap-3 p-4 bg-muted/30 rounded-lg">
                  <div className="md:col-span-5">
                    <Label>الوصف</Label>
                    <Input
                      value={item.description}
                      onChange={(e) => updateItem(item.id, "description", e.target.value)}
                      placeholder="وصف الخدمة أو المنتج"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>الكمية</Label>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, "quantity", parseInt(e.target.value) || 1)}
                    />
                  </div>
                  <div className="md:col-span-3">
                    <Label>السعر</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.price}
                      onChange={(e) => updateItem(item.id, "price", parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="md:col-span-2 flex items-end">
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      disabled={items.length === 1}
                      className="w-full"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between items-center text-2xl font-bold">
                <span>المجموع الكلي:</span>
                <span className="text-primary">{calculateTotal().toFixed(2)} ر.س</span>
              </div>
            </div>
          </Card>

          {/* Notes */}
          <Card className="p-6">
            <Label htmlFor="notes">ملاحظات إضافية</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="أي ملاحظات إضافية للعميل..."
              rows={4}
            />
          </Card>

          {/* Submit */}
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={createLink.isPending}
          >
            {createLink.isPending ? "جاري الإنشاء..." : "إنشاء الفاتورة"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateInvoiceLink;
