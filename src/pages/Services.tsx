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

const Services = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>();

  const services = [
    {
      title: "Chalet Booking",
      titleAr: "حجز الشاليهات",
      description: "احجز شاليه أحلامك بأسعار مخصصة وإطلالات خلابة",
      icon: Home,
      href: selectedCountry ? `/create/${selectedCountry.code}/chalet` : "#",
      gradient: "bg-gradient-chalet",
      iconBg: "from-blue-500 to-cyan-500",
      shadow: "shadow-blue-500/20",
    },
    {
      title: "Shipping Services",
      titleAr: "خدمات الشحن",
      description: "شحن سريع وآمن مع أفضل شركات الشحن المعتمدة",
      icon: Package,
      href: selectedCountry ? `/create/${selectedCountry.code}/shipping` : "#",
      gradient: "bg-gradient-shipping",
      iconBg: "from-purple-500 to-pink-500",
      shadow: "shadow-purple-500/20",
    },
    {
      title: "Invoices",
      titleAr: "الفواتير",
      description: "إنشاء وإدارة الفواتير الإلكترونية بسهولة",
      icon: FileText,
      href: selectedCountry ? `/create/${selectedCountry.code}/invoice` : "#",
      gradient: "bg-gradient-invoice",
      iconBg: "from-blue-600 to-blue-400",
      shadow: "shadow-blue-500/20",
    },
    {
      title: "Health Services",
      titleAr: "الخدمات الصحية",
      description: "حجز مواعيد طبية وخدمات صحية معتمدة",
      icon: Heart,
      href: selectedCountry ? `/create/${selectedCountry.code}/health` : "#",
      gradient: "bg-gradient-health",
      iconBg: "from-red-500 to-rose-500",
      shadow: "shadow-red-500/20",
    },
    {
      title: "Logistics",
      titleAr: "الخدمات اللوجستية",
      description: "حلول لوجستية متكاملة للشركات والأفراد",
      icon: Truck,
      href: selectedCountry ? `/create/${selectedCountry.code}/logistics` : "#",
      gradient: "bg-gradient-logistics",
      iconBg: "from-violet-500 to-purple-600",
      shadow: "shadow-violet-500/20",
    },
    {
      title: "Contracts",
      titleAr: "العقود",
      description: "إدارة وتوثيق العقود الإلكترونية بأمان",
      icon: Building2,
      href: selectedCountry ? `/create/${selectedCountry.code}/contract` : "#",
      gradient: "bg-gradient-contract",
      iconBg: "from-amber-500 to-orange-500",
      shadow: "shadow-amber-500/20",
    },
  ];

  const handleCountryChange = (countryCode: string) => {
    const country = COUNTRIES.find((c) => c.code === countryCode);
    setSelectedCountry(country);
  };

  return (
    <div className="min-h-screen py-12 bg-gradient-to-b from-background via-card/20 to-background" dir="rtl">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm border border-primary/30 rounded-full px-6 py-3 mb-6 animate-fade-in shadow-glow">
            <Package className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-sm font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              جميع الخدمات في مكان واحد
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            اختر خدمتك
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            ابدأ بتحديد الدولة، ثم اختر الخدمة المناسبة لاحتياجاتك
          </p>
        </div>

        {/* Country Dropdown */}
        <div className="mb-16">
          <div className="max-w-md mx-auto">
            <label className="block text-xl font-bold mb-4 text-center bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              اختر الدولة
            </label>
            <Select onValueChange={handleCountryChange}>
              <SelectTrigger className="w-full h-16 text-lg bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-2 border-border hover:border-primary/50 transition-all duration-300 shadow-card hover:shadow-elevated rounded-xl">
                <SelectValue placeholder="اختر دولة..." />
              </SelectTrigger>
              <SelectContent className="bg-popover/95 backdrop-blur-xl border-border shadow-elevated rounded-xl z-[100]">
                {COUNTRIES.map((country) => (
                  <SelectItem
                    key={country.code}
                    value={country.code}
                    className="text-lg py-4 cursor-pointer hover:bg-primary/10 focus:bg-primary/10 rounded-lg my-1 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{country.flag}</span>
                      <div className="text-right">
                        <div className="font-bold text-foreground">{country.nameAr}</div>
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
            <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                الخدمات المتاحة في {selectedCountry.nameAr}
              </span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {services.map((service) => (
                <ServiceCard key={service.title} {...service} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-32">
            <div className="w-32 h-32 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse-glow shadow-glow">
              <Package className="w-16 h-16 text-primary-foreground" />
            </div>
            <p className="text-2xl font-semibold text-muted-foreground mb-4">
              الرجاء اختيار دولة لعرض الخدمات المتاحة
            </p>
            <p className="text-lg text-muted-foreground/70">
              اختر من بين 6 دول خليجية
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
