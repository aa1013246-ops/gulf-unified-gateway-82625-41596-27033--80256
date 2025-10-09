import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Package, Truck, Globe, Shield, Zap, Search, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import heroImage from "@/assets/logistics-hero.jpg";
import deliveryPerson from "@/assets/delivery-person.jpg";
import warehouse from "@/assets/warehouse.jpg";
import tracking from "@/assets/tracking.jpg";

const Index = () => {
  return (
    <div className="min-h-screen" dir="rtl">
      <Header />
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[600px] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/80 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white animate-fade-in">
              حلول شحن متكاملة تربط الخليج بالعالم
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed animate-fade-in">
              خدمات لوجستية سريعة وآمنة وموثوقة في جميع أنحاء دول مجلس التعاون الخليجي وخارجها
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
              <Link to="/services">
                <Button size="lg" className="text-lg px-10 py-7 bg-primary hover:bg-primary/90 text-white shadow-intense">
                  استكشف خدماتنا
                </Button>
              </Link>
              <Link to="/track">
                <Button size="lg" variant="outline" className="text-lg px-10 py-7 bg-white/10 border-white text-white hover:bg-white hover:text-foreground backdrop-blur-sm">
                  تتبع شحنتك
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Track Shipment Quick Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-8 shadow-elevated">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-2 text-foreground">تتبع شحنتك</h2>
              <p className="text-muted-foreground">أدخل رقم التتبع لمعرفة حالة شحنتك</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input 
                placeholder="أدخل رقم التتبع" 
                className="flex-1 h-14 text-lg"
              />
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white h-14 px-8">
                <Search className="ml-2 w-5 h-5" />
                تتبع الآن
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-24 bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">خدماتنا</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              نقدم مجموعة شاملة من الحلول اللوجستية لتلبية جميع احتياجاتك
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Service 1 */}
            <Card className="group overflow-hidden hover:shadow-elevated transition-all duration-500 hover:-translate-y-2">
              <div className="h-64 overflow-hidden">
                <img 
                  src={deliveryPerson} 
                  alt="الشحن السريع المحلي" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Truck className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">الشحن السريع المحلي</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  نوصل شحناتك بأمان وفي الوقت المحدد إلى جميع أنحاء الخليج خلال 24-48 ساعة
                </p>
                <Link to="/services">
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors">
                    اعرف المزيد
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Service 2 */}
            <Card className="group overflow-hidden hover:shadow-elevated transition-all duration-500 hover:-translate-y-2">
              <div className="h-64 overflow-hidden">
                <img 
                  src={tracking} 
                  alt="التوصيل الدولي" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Globe className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">التوصيل الدولي</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  خدمات شحن عالمية موثوقة إلى أكثر من 200 دولة حول العالم مع ضمان الجودة
                </p>
                <Link to="/services">
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors">
                    اعرف المزيد
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Service 3 */}
            <Card className="group overflow-hidden hover:shadow-elevated transition-all duration-500 hover:-translate-y-2">
              <div className="h-64 overflow-hidden">
                <img 
                  src={warehouse} 
                  alt="خدمات التجارة الإلكترونية" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Package className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">خدمات التجارة الإلكترونية</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  حلول شاملة لمتاجر الإنترنت تشمل التخزين والتعبئة والتوصيل من الباب للباب
                </p>
                <Link to="/services">
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors">
                    اعرف المزيد
                  </Button>
                </Link>
              </div>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-12 py-6 text-lg shadow-glow">
                عرض جميع الخدمات
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">لماذا تختار Gulf Unified؟</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              نحن شريكك الموثوق في عالم اللوجستيات والشحن
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Feature 1 */}
            <div className="text-center p-8 rounded-2xl hover:shadow-card transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">سرعة فائقة</h3>
              <p className="text-muted-foreground leading-relaxed">
                نضمن توصيل شحناتك في أسرع وقت ممكن مع الحفاظ على أعلى معايير الجودة والأمان
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-8 rounded-2xl hover:shadow-card transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">موثوقية عالية</h3>
              <p className="text-muted-foreground leading-relaxed">
                نحن معتمدون ومطابقون لجميع المعايير المحلية والدولية مع سجل حافل في الثقة والأمانة
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-8 rounded-2xl hover:shadow-card transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">تغطية واسعة</h3>
              <p className="text-muted-foreground leading-relaxed">
                نغطي جميع دول الخليج وأكثر من 200 دولة حول العالم لضمان وصول شحناتك إلى أي مكان
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-foreground via-foreground/95 to-foreground/90 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              جاهز لشحن طلبك؟
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed">
              انضم إلى آلاف العملاء الذين يثقون بخدماتنا اللوجستية المتميزة
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/services">
                <Button size="lg" className="text-xl px-12 py-8 bg-primary hover:bg-primary/90 text-white shadow-intense">
                  ابدأ الشحن الآن
                </Button>
              </Link>
              <Link to="/track">
                <Button size="lg" variant="outline" className="text-xl px-12 py-8 bg-white/10 border-white text-white hover:bg-white hover:text-foreground backdrop-blur-sm">
                  تتبع شحنة
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
