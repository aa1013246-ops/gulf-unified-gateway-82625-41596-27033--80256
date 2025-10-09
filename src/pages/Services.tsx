import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Truck, Globe, Package, Shield, MapPin, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import deliveryPerson from "@/assets/delivery-person.jpg";
import international from "@/assets/international.jpg";
import ecommerce from "@/assets/ecommerce.jpg";
import tracking from "@/assets/tracking.jpg";
import warehouse from "@/assets/warehouse.jpg";
import serviceShipping from "@/assets/service-shipping.jpg";

const Services = () => {
  const services = [
    {
      title: "الشحن السريع المحلي",
      description: "نوصل شحناتك بأمان وفي الوقت المحدد إلى جميع أنحاء الخليج خلال 24-48 ساعة",
      icon: Truck,
      image: deliveryPerson,
      link: "/create/sa/shipping",
    },
    {
      title: "التوصيل الدولي",
      description: "خدمات شحن عالمية موثوقة إلى أكثر من 200 دولة حول العالم",
      icon: Globe,
      image: international,
      link: "/create/sa/shipping",
    },
    {
      title: "خدمات التجارة الإلكترونية",
      description: "حلول شاملة لمتاجر الإنترنت تشمل التخزين والتعبئة والتوصيل",
      icon: Package,
      image: ecommerce,
      link: "/create/sa/shipping",
    },
    {
      title: "التتبع الذكي",
      description: "تتبع شحناتك في الوقت الفعلي عبر تطبيقنا المتطور",
      icon: MapPin,
      image: tracking,
      link: "/track",
    },
    {
      title: "التغليف الآمن",
      description: "نوفر مواد تغليف عالية الجودة لحماية شحناتك",
      icon: Shield,
      image: warehouse,
      link: "/create/sa/shipping",
    },
    {
      title: "الاستلام من الباب",
      description: "خدمة استلام مجانية من موقعك في أي وقت يناسبك",
      icon: Clock,
      image: serviceShipping,
      link: "/create/sa/shipping",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30" dir="rtl">
      <Header />
      <WhatsAppButton />

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">خدماتنا اللوجستية</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            نقدم مجموعة شاملة من الحلول اللوجستية لتلبية احتياجاتك
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="group overflow-hidden hover:shadow-elevated transition-all duration-500 hover:-translate-y-2">
                <div className="h-64 overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-foreground">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <Link to={service.link}>
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white">
                      اعرف المزيد
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Services;
