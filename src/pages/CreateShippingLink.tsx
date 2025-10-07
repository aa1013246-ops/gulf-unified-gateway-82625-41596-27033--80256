import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, Package, Copy, Check } from "lucide-react";
import { useShippingCarriers, useCreateLink } from "@/hooks/useSupabase";
import { useToast } from "@/hooks/use-toast";
import { COUNTRIES } from "@/lib/countries";
import shippingHero from "@/assets/shipping-hero.jpg";

const CreateShippingLink = () => {
  const { country } = useParams<{ country: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [generatedLink, setGeneratedLink] = useState<string>("");

  const { data: carriers, isLoading: carriersLoading } = useShippingCarriers(country);
  const createLink = useCreateLink();

  const [formData, setFormData] = useState({
    carrierId: "",
    senderName: "",
    senderPhone: "",
    senderAddress: "",
    recipientName: "",
    recipientPhone: "",
    recipientAddress: "",
    packageDescription: "",
    weight: "",
    dimensions: "",
    serviceType: "standard",
    price: "",
  });

  const countryData = COUNTRIES.find((c) => c.code === country);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedCarrier = carriers?.find((c) => c.id === formData.carrierId);
    if (!selectedCarrier) {
      toast({
        title: "خطأ",
        description: "الرجاء اختيار شركة شحن",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await createLink.mutateAsync({
        type: "shipping",
        country_code: country!,
        provider_id: formData.carrierId,
        payload: {
          carrier: selectedCarrier,
          sender: {
            name: formData.senderName,
            phone: formData.senderPhone,
            address: formData.senderAddress,
          },
          recipient: {
            name: formData.recipientName,
            phone: formData.recipientPhone,
            address: formData.recipientAddress,
          },
          package: {
            description: formData.packageDescription,
            weight: formData.weight,
            dimensions: formData.dimensions,
          },
          serviceType: formData.serviceType,
          price: parseFloat(formData.price),
          currency: countryData?.currency || "AED",
        },
      });

      setGeneratedLink(result.microsite_url);
    } catch (error) {
      console.error("Error creating link:", error);
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

  if (carriersLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Package className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" dir="rtl">
      {/* Hero Section */}
      <div className="relative h-80 overflow-hidden">
        <img 
          src={shippingHero} 
          alt="Shipping Services" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-2xl">
              خدمات الشحن
            </h1>
            <p className="text-xl text-white/90 drop-shadow-lg">
              {countryData?.nameAr}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 -mt-20 relative z-10 max-w-5xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/services")}
          className="mb-6 bg-card/80 backdrop-blur-sm hover:bg-card border border-border shadow-card"
        >
          <ArrowRight className="w-4 h-4 ml-2" />
          العودة للخدمات
        </Button>

        {carriersLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Package className="w-12 h-12 animate-pulse mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">جاري التحميل...</p>
            </div>
          </div>
        ) : generatedLink ? (
          <Card className="p-8 text-center">
            <div className="w-20 h-20 bg-gradient-success rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4">تم إنشاء الرابط بنجاح!</h2>
            <p className="text-muted-foreground mb-6">
              شارك هذا الرابط مع العميل لإتمام الدفع
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
                إنشاء رابط جديد
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Carrier Selection */}
              <div>
                <Label htmlFor="carrier">شركة الشحن *</Label>
                <Select
                  value={formData.carrierId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, carrierId: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر شركة الشحن" />
                  </SelectTrigger>
                  <SelectContent>
                    {carriers?.map((carrier) => (
                      <SelectItem key={carrier.id} value={carrier.id}>
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4" />
                          {carrier.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sender Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">بيانات المرسل</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="senderName">الاسم *</Label>
                    <Input
                      id="senderName"
                      required
                      value={formData.senderName}
                      onChange={(e) =>
                        setFormData({ ...formData, senderName: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="senderPhone">رقم الهاتف *</Label>
                    <Input
                      id="senderPhone"
                      type="tel"
                      required
                      value={formData.senderPhone}
                      onChange={(e) =>
                        setFormData({ ...formData, senderPhone: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="senderAddress">العنوان *</Label>
                  <Textarea
                    id="senderAddress"
                    required
                    value={formData.senderAddress}
                    onChange={(e) =>
                      setFormData({ ...formData, senderAddress: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Recipient Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">بيانات المستلم</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="recipientName">الاسم *</Label>
                    <Input
                      id="recipientName"
                      required
                      value={formData.recipientName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          recipientName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="recipientPhone">رقم الهاتف *</Label>
                    <Input
                      id="recipientPhone"
                      type="tel"
                      required
                      value={formData.recipientPhone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          recipientPhone: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="recipientAddress">العنوان *</Label>
                  <Textarea
                    id="recipientAddress"
                    required
                    value={formData.recipientAddress}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        recipientAddress: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* Package Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">تفاصيل الشحنة</h3>
                <div>
                  <Label htmlFor="packageDescription">وصف الشحنة *</Label>
                  <Textarea
                    id="packageDescription"
                    required
                    value={formData.packageDescription}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        packageDescription: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="weight">الوزن (كجم) *</Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.1"
                      required
                      value={formData.weight}
                      onChange={(e) =>
                        setFormData({ ...formData, weight: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="dimensions">الأبعاد (سم) *</Label>
                    <Input
                      id="dimensions"
                      placeholder="طول × عرض × ارتفاع"
                      required
                      value={formData.dimensions}
                      onChange={(e) =>
                        setFormData({ ...formData, dimensions: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="serviceType">نوع الخدمة *</Label>
                    <Select
                      value={formData.serviceType}
                      onValueChange={(value) =>
                        setFormData({ ...formData, serviceType: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">عادي</SelectItem>
                        <SelectItem value="express">سريع</SelectItem>
                        <SelectItem value="cod">الدفع عند الاستلام</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div>
                <Label htmlFor="price">
                  السعر ({countryData?.currency}) *
                </Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  required
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={createLink.isPending}
              >
                {createLink.isPending ? "جاري الإنشاء..." : "إنشاء رابط الشحنة"}
              </Button>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CreateShippingLink;
