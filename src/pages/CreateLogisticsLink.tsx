import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Truck, Package, Copy, Check } from "lucide-react";
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

const CreateLogisticsLink = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const createLink = useCreateLink();
  const [generatedLink, setGeneratedLink] = useState<string>("");
  const [copied, setCopied] = useState(false);
  
  const countryData = COUNTRIES.find((c) => c.code === country);
  
  const [formData, setFormData] = useState({
    serviceType: "",
    companyName: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    pickupAddress: "",
    pickupCity: "",
    deliveryAddress: "",
    deliveryCity: "",
    cargoType: "",
    weight: "",
    dimensions: "",
    specialInstructions: "",
  });

  const serviceTypes = [
    "نقل البضائع",
    "التخزين",
    "التوزيع",
    "الشحن الدولي",
    "النقل السريع",
    "الشحن الجوي",
    "الشحن البحري",
  ];

  const cargoTypes = [
    "عام",
    "قابل للكسر",
    "مبرد",
    "خطر",
    "ثقيل",
    "معدات",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!formData.serviceType || !formData.contactName || !formData.contactPhone) {
        toast({
          title: "خطأ",
          description: "يرجى ملء جميع الحقول المطلوبة",
          variant: "destructive",
        });
        return;
      }

      const result = await createLink.mutateAsync({
        type: "logistics",
        country_code: country!,
        payload: {
          service: {
            type: formData.serviceType,
            companyName: formData.companyName,
          },
          contact: {
            name: formData.contactName,
            phone: formData.contactPhone,
            email: formData.contactEmail,
          },
          pickup: {
            address: formData.pickupAddress,
            city: formData.pickupCity,
          },
          delivery: {
            address: formData.deliveryAddress,
            city: formData.deliveryCity,
          },
          cargo: {
            type: formData.cargoType,
            weight: formData.weight,
            dimensions: formData.dimensions,
          },
          specialInstructions: formData.specialInstructions,
          currency: countryData?.currency || "SAR",
        },
      });

      setGeneratedLink(result.microsite_url);
    } catch (error) {
      console.error("Error creating logistics link:", error);
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
            <h2 className="text-2xl font-bold mb-4">تم إنشاء الطلب بنجاح!</h2>
            <p className="text-muted-foreground mb-6">
              شارك هذا الرابط مع العميل لعرض التفاصيل والدفع
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
                إنشاء طلب جديد
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
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">طلب خدمة لوجستية</h1>
              <p className="text-muted-foreground">حلول لوجستية متكاملة للشركات والأفراد</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Type */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">نوع الخدمة</h2>
            <div>
              <Label htmlFor="serviceType">اختر الخدمة *</Label>
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
          </Card>

          {/* Contact Information */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">معلومات التواصل</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contactName">اسم الشخص المسؤول *</Label>
                <Input
                  id="contactName"
                  value={formData.contactName}
                  onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                  placeholder="أدخل الاسم"
                  required
                />
              </div>
              <div>
                <Label htmlFor="companyName">اسم الشركة</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                  placeholder="اختياري"
                />
              </div>
              <div>
                <Label htmlFor="contactPhone">رقم الهاتف *</Label>
                <Input
                  id="contactPhone"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                  placeholder="+966 XX XXX XXXX"
                  required
                />
              </div>
              <div>
                <Label htmlFor="contactEmail">البريد الإلكتروني</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                  placeholder="email@example.com"
                />
              </div>
            </div>
          </Card>

          {/* Pickup & Delivery */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">تفاصيل الاستلام والتسليم</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pickupAddress">عنوان الاستلام</Label>
                <Input
                  id="pickupAddress"
                  value={formData.pickupAddress}
                  onChange={(e) => setFormData({...formData, pickupAddress: e.target.value})}
                  placeholder="العنوان الكامل"
                />
              </div>
              <div>
                <Label htmlFor="pickupCity">مدينة الاستلام</Label>
                <Input
                  id="pickupCity"
                  value={formData.pickupCity}
                  onChange={(e) => setFormData({...formData, pickupCity: e.target.value})}
                  placeholder="المدينة"
                />
              </div>
              <div>
                <Label htmlFor="deliveryAddress">عنوان التسليم</Label>
                <Input
                  id="deliveryAddress"
                  value={formData.deliveryAddress}
                  onChange={(e) => setFormData({...formData, deliveryAddress: e.target.value})}
                  placeholder="العنوان الكامل"
                />
              </div>
              <div>
                <Label htmlFor="deliveryCity">مدينة التسليم</Label>
                <Input
                  id="deliveryCity"
                  value={formData.deliveryCity}
                  onChange={(e) => setFormData({...formData, deliveryCity: e.target.value})}
                  placeholder="المدينة"
                />
              </div>
            </div>
          </Card>

          {/* Cargo Details */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">تفاصيل البضاعة</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cargoType">نوع البضاعة</Label>
                <Select
                  value={formData.cargoType}
                  onValueChange={(value) => setFormData({...formData, cargoType: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع البضاعة" />
                  </SelectTrigger>
                  <SelectContent>
                    {cargoTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="weight">الوزن (كجم)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData({...formData, weight: e.target.value})}
                  placeholder="0.0"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="dimensions">الأبعاد (الطول × العرض × الارتفاع)</Label>
                <Input
                  id="dimensions"
                  value={formData.dimensions}
                  onChange={(e) => setFormData({...formData, dimensions: e.target.value})}
                  placeholder="مثال: 100 × 50 × 30 سم"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="specialInstructions">تعليمات خاصة</Label>
                <Textarea
                  id="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={(e) => setFormData({...formData, specialInstructions: e.target.value})}
                  placeholder="أي تعليمات خاصة للتعامل مع البضاعة..."
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
            <Package className="ml-2 h-5 w-5" />
            {createLink.isPending ? "جاري الإرسال..." : "تقديم الطلب"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateLogisticsLink;
