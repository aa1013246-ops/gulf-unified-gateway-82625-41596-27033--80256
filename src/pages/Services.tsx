import { useState } from "react";
import { Home, Package, FileText, Heart, Truck, Building2 } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import { Country, COUNTRIES } from "@/lib/countries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import serviceShipping from "@/assets/service-shipping.jpg";
import serviceChalet from "@/assets/service-chalet.jpg";
import serviceHealth from "@/assets/service-health.jpg";
import serviceInvoice from "@/assets/service-invoice.jpg";
import serviceLogistics from "@/assets/service-logistics.jpg";
import serviceContract from "@/assets/service-contract.jpg";

const Services = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>();

  const services = [
    {
      title: "Chalet Booking",
      titleAr: "حجز الشاليهات",
      description: "احجز شاليه أحلامك بأسعار مخصصة وإطلالات خلابة على الشاطئ أو الجبال مع مرافق فاخرة ومسابح خاصة",
      icon: Home,
      href: selectedCountry ? `/create/${selectedCountry.code}/chalet` : "#",
      gradient: "bg-gradient-chalet",
      iconBg: "from-blue-500 to-cyan-500",
      shadow: "shadow-blue-500/20",
      image: serviceChalet,
    },
    {
      title: "Shipping Services",
      titleAr: "خدمات الشحن",
      description: "شحن سريع وآمن مع أفضل شركات الشحن المعتمدة، تتبع شحناتك لحظة بلحظة مع ضمان الوصول في الوقت المحدد",
      icon: Package,
      href: selectedCountry ? `/create/${selectedCountry.code}/shipping` : "#",
      gradient: "bg-gradient-shipping",
      iconBg: "from-purple-500 to-pink-500",
      shadow: "shadow-purple-500/20",
      image: serviceShipping,
    },
    {
      title: "Invoices",
      titleAr: "الفواتير الإلكترونية",
      description: "إنشاء وإدارة الفواتير الإلكترونية بسهولة، متوافقة مع معايير الفوترة الإلكترونية ومتطلبات هيئة الزكاة والضريبة",
      icon: FileText,
      href: selectedCountry ? `/create/${selectedCountry.code}/invoice` : "#",
      gradient: "bg-gradient-invoice",
      iconBg: "from-blue-600 to-blue-400",
      shadow: "shadow-blue-500/20",
      image: serviceInvoice,
    },
    {
      title: "Health Services",
      titleAr: "الخدمات الصحية",
      description: "حجز مواعيد طبية وخدمات صحية معتمدة مع أفضل الأطباء والمستشفيات، رعاية صحية شاملة على مدار الساعة",
      icon: Heart,
      href: selectedCountry ? `/create/${selectedCountry.code}/health` : "#",
      gradient: "bg-gradient-health",
      iconBg: "from-red-500 to-rose-500",
      shadow: "shadow-red-500/20",
      image: serviceHealth,
    },
    {
      title: "Logistics",
      titleAr: "الخدمات اللوجستية",
      description: "حلول لوجستية متكاملة للشركات والأفراد، إدارة سلسلة التوريد والتخزين والتوزيع بكفاءة عالية",
      icon: Truck,
      href: selectedCountry ? `/create/${selectedCountry.code}/logistics` : "#",
      gradient: "bg-gradient-logistics",
      iconBg: "from-violet-500 to-purple-600",
      shadow: "shadow-violet-500/20",
      image: serviceLogistics,
    },
    {
      title: "Contracts",
      titleAr: "العقود الإلكترونية",
      description: "إدارة وتوثيق العقود الإلكترونية بأمان، توقيع رقمي معتمد وحفظ آمن للوثائق مع إمكانية المشاركة الفورية",
      icon: Building2,
      href: selectedCountry ? `/create/${selectedCountry.code}/contract` : "#",
      gradient: "bg-gradient-contract",
      iconBg: "from-amber-500 to-orange-500",
      shadow: "shadow-amber-500/20",
      image: serviceContract,
    },
  ];

  const handleCountryChange = (countryCode: string) => {
    const country = COUNTRIES.find((c) => c.code === countryCode);
    setSelectedCountry(country);
  };

  return (
    <div className="min-h-screen py-16 bg-gradient-to-b from-secondary/30 via-background to-secondary/20" dir="rtl">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white border-2 border-primary/20 rounded-full px-6 py-3 mb-8 animate-fade-in shadow-lg">
            <Package className="w-5 h-5 text-primary" />
            <span className="text-sm font-bold text-foreground">
              منصة خدمات متكاملة للخليج
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground leading-tight">
            اختر <span className="text-primary">خدمتك</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            نقدم لك أفضل الخدمات في منطقة الخليج بجودة عالمية وأسعار تنافسية
          </p>
        </div>

        {/* Country Dropdown */}
        <div className="mb-20">
          <div className="max-w-lg mx-auto">
            <label className="block text-2xl font-bold mb-6 text-center text-foreground">
              🌍 اختر الدولة
            </label>
            <Select onValueChange={handleCountryChange}>
              <SelectTrigger className="w-full h-20 text-xl bg-white border-2 border-border hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl rounded-2xl font-semibold">
                <SelectValue placeholder="اختر دولة للبدء..." />
              </SelectTrigger>
              <SelectContent className="bg-white border-2 border-border shadow-2xl rounded-2xl z-[100]">
                {COUNTRIES.map((country) => (
                  <SelectItem
                    key={country.code}
                    value={country.code}
                    className="text-xl py-5 cursor-pointer hover:bg-primary/10 focus:bg-primary/10 rounded-xl my-1 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{country.flag}</span>
                      <div className="text-right">
                        <div className="font-bold text-foreground text-lg">{country.nameAr}</div>
                        <div className="text-sm text-muted-foreground">
                          {country.name}
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Services Grid */}
        {selectedCountry ? (
          <div className="animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
                الخدمات المتاحة في <span className="text-primary">{selectedCountry.nameAr}</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                اختر الخدمة المناسبة واستمتع بأفضل العروض
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {services.map((service) => (
                <ServiceCard key={service.title} {...service} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-32 max-w-2xl mx-auto">
            <div className="w-40 h-40 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-2xl">
              <Package className="w-20 h-20 text-primary" strokeWidth={1.5} />
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-4">
              ابدأ رحلتك الآن
            </h3>
            <p className="text-xl text-muted-foreground mb-2">
              اختر دولة من القائمة أعلاه
            </p>
            <p className="text-lg text-muted-foreground/70">
              نخدم 6 دول في منطقة الخليج العربي
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
