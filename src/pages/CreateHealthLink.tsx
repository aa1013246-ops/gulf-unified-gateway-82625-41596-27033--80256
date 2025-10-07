import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Heart, Calendar, Copy, Check } from "lucide-react";
import { useCreateLink } from "@/hooks/useSupabase";
import { useToast } from "@/hooks/use-toast";
import { COUNTRIES } from "@/lib/countries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreateHealthLink = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const createLink = useCreateLink();
  const [generatedLink, setGeneratedLink] = useState<string>("");
  const [copied, setCopied] = useState(false);
  
  const countryData = COUNTRIES.find((c) => c.code === country);
  
  const [formData, setFormData] = useState({
    patientName: "",
    patientPhone: "",
    patientEmail: "",
    nationalId: "",
    serviceType: "",
    preferredDate: "",
    preferredTime: "",
    symptoms: "",
    notes: "",
  });

  const serviceTypes = [
    "استشارة عامة",
    "طب الأسنان",
    "العيون",
    "الجلدية",
    "العظام",
    "القلب",
    "الأطفال",
    "النساء والولادة",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!formData.patientName || !formData.patientPhone || !formData.serviceType) {
        toast({
          title: "خطأ",
          description: "يرجى ملء جميع الحقول المطلوبة",
          variant: "destructive",
        });
        return;
      }

      const result = await createLink.mutateAsync({
        type: "health",
        country_code: country!,
        payload: {
          patient: {
            name: formData.patientName,
            phone: formData.patientPhone,
            email: formData.patientEmail,
            nationalId: formData.nationalId,
          },
          appointment: {
            serviceType: formData.serviceType,
            preferredDate: formData.preferredDate,
            preferredTime: formData.preferredTime,
          },
          medical: {
            symptoms: formData.symptoms,
            notes: formData.notes,
          },
          currency: countryData?.currency || "SAR",
        },
      });

      setGeneratedLink(result.microsite_url);
    } catch (error) {
      console.error("Error creating health link:", error);
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
            <h2 className="text-2xl font-bold mb-4">تم إنشاء الحجز بنجاح!</h2>
            <p className="text-muted-foreground mb-6">
              شارك هذا الرابط مع المريض لتأكيد الموعد والدفع
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
                إنشاء حجز جديد
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
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">حجز موعد طبي</h1>
              <p className="text-muted-foreground">احجز موعدك مع أفضل الأطباء المعتمدين</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Information */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">معلومات المريض</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="patientName">اسم المريض *</Label>
                <Input
                  id="patientName"
                  value={formData.patientName}
                  onChange={(e) => setFormData({...formData, patientName: e.target.value})}
                  placeholder="أدخل الاسم الكامل"
                  required
                />
              </div>
              <div>
                <Label htmlFor="nationalId">رقم الهوية</Label>
                <Input
                  id="nationalId"
                  value={formData.nationalId}
                  onChange={(e) => setFormData({...formData, nationalId: e.target.value})}
                  placeholder="XXXXXXXXXX"
                />
              </div>
              <div>
                <Label htmlFor="patientPhone">رقم الهاتف *</Label>
                <Input
                  id="patientPhone"
                  value={formData.patientPhone}
                  onChange={(e) => setFormData({...formData, patientPhone: e.target.value})}
                  placeholder="+966 XX XXX XXXX"
                  required
                />
              </div>
              <div>
                <Label htmlFor="patientEmail">البريد الإلكتروني</Label>
                <Input
                  id="patientEmail"
                  type="email"
                  value={formData.patientEmail}
                  onChange={(e) => setFormData({...formData, patientEmail: e.target.value})}
                  placeholder="patient@example.com"
                />
              </div>
            </div>
          </Card>

          {/* Appointment Details */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">تفاصيل الموعد</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="serviceType">نوع الخدمة *</Label>
                <Select
                  value={formData.serviceType}
                  onValueChange={(value) => setFormData({...formData, serviceType: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع الخدمة" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="preferredDate">التاريخ المفضل</Label>
                <Input
                  id="preferredDate"
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <Label htmlFor="preferredTime">الوقت المفضل</Label>
                <Input
                  id="preferredTime"
                  type="time"
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({...formData, preferredTime: e.target.value})}
                />
              </div>
            </div>
          </Card>

          {/* Medical Details */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">التفاصيل الطبية</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="symptoms">الأعراض أو سبب الزيارة</Label>
                <Textarea
                  id="symptoms"
                  value={formData.symptoms}
                  onChange={(e) => setFormData({...formData, symptoms: e.target.value})}
                  placeholder="اشرح الأعراض أو سبب طلب الموعد..."
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="notes">ملاحظات إضافية</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="أي ملاحظات أو معلومات إضافية..."
                  rows={3}
                />
              </div>
            </div>
          </Card>

          {/* Submit */}
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={createLink.isPending}
          >
            <Calendar className="ml-2 h-5 w-5" />
            {createLink.isPending ? "جاري الحجز..." : "تأكيد الحجز"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateHealthLink;
