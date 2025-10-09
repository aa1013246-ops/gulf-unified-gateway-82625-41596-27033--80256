import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Package, Truck, MapPin, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Track = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleTrack = () => {
    if (trackingNumber.trim()) {
      setShowResults(true);
    }
  };

  const trackingSteps = [
    { 
      icon: Package, 
      label: "تم الاستلام", 
      time: "10:30 صباحاً - 15 يناير 2025",
      location: "الرياض، المملكة العربية السعودية",
      completed: true 
    },
    { 
      icon: Truck, 
      label: "قيد النقل", 
      time: "02:15 مساءً - 15 يناير 2025",
      location: "مركز الفرز الرئيسي - جدة",
      completed: true 
    },
    { 
      icon: MapPin, 
      label: "خارج للتسليم", 
      time: "08:00 صباحاً - 16 يناير 2025",
      location: "دبي، الإمارات العربية المتحدة",
      completed: true 
    },
    { 
      icon: CheckCircle2, 
      label: "تم التسليم", 
      time: "قريباً",
      location: "في انتظار التسليم",
      completed: false 
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30" dir="rtl">
      <Header />
      <WhatsAppButton />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              تتبع شحنتك
            </h1>
            <p className="text-xl text-muted-foreground">
              تابع حالة شحنتك في الوقت الفعلي
            </p>
          </div>

          {/* Search Card */}
          <Card className="p-8 shadow-elevated mb-12">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input 
                placeholder="أدخل رقم التتبع (مثال: GU123456789)" 
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleTrack()}
                className="flex-1 h-14 text-lg"
              />
              <Button 
                size="lg" 
                onClick={handleTrack}
                className="bg-primary hover:bg-primary/90 text-white h-14 px-8"
              >
                <Search className="ml-2 w-5 h-5" />
                تتبع الآن
              </Button>
            </div>
          </Card>

          {/* Tracking Results */}
          {showResults && (
            <Card className="p-8 shadow-elevated animate-fade-in">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-foreground">معلومات الشحنة</h2>
                  <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                    قيد التوصيل
                  </span>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">رقم التتبع: </span>
                    <span className="font-semibold text-foreground">{trackingNumber || "GU123456789"}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">الوزن: </span>
                    <span className="font-semibold text-foreground">2.5 كجم</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">المرسل: </span>
                    <span className="font-semibold text-foreground">الرياض، السعودية</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">المستلم: </span>
                    <span className="font-semibold text-foreground">دبي، الإمارات</span>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-foreground mb-6">مسار الشحنة</h3>
                {trackingSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={index} className="flex gap-4 relative">
                      {/* Connector Line */}
                      {index !== trackingSteps.length - 1 && (
                        <div 
                          className={`absolute right-[22px] top-12 w-0.5 h-16 ${
                            step.completed ? "bg-primary" : "bg-border"
                          }`}
                        />
                      )}
                      
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                        step.completed 
                          ? "bg-primary text-white shadow-glow" 
                          : "bg-secondary text-muted-foreground"
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 pb-8">
                        <h4 className={`text-lg font-bold mb-1 ${
                          step.completed ? "text-foreground" : "text-muted-foreground"
                        }`}>
                          {step.label}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-1">{step.time}</p>
                        <p className="text-sm text-muted-foreground">{step.location}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Additional Info */}
              <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm text-center text-foreground">
                  <span className="font-semibold">ملاحظة:</span> سيتم تحديث معلومات التتبع كل ساعة. للاستفسارات اتصل بخدمة العملاء.
                </p>
              </div>
            </Card>
          )}

          {/* Help Section */}
          {!showResults && (
            <Card className="p-8 shadow-card">
              <h3 className="text-xl font-bold mb-4 text-foreground">كيفية العثور على رقم التتبع؟</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>تحقق من رسالة التأكيد الإلكترونية التي أرسلناها لك بعد الشحن</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>ابحث عن الرقم المطبوع على إيصال الشحن</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>اتصل بخدمة العملاء لدينا إذا كنت بحاجة للمساعدة</span>
                </li>
              </ul>
            </Card>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Track;
