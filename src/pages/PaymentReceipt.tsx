import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePayment, useLink } from "@/hooks/useSupabase";
import { getCountryByCode, formatCurrency } from "@/lib/countries";
import { CheckCircle2, Download, Home, Share2 } from "lucide-react";
import chaletHero from "@/assets/chalet-hero.jpg";
import shippingHero from "@/assets/shipping-hero.jpg";

const PaymentReceipt = () => {
  const { paymentId } = useParams();
  const { data: payment } = usePayment(paymentId);
  const { data: link } = useLink(payment?.link_id || undefined);
  
  if (!payment || !link) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">جاري التحميل...</div>
      </div>
    );
  }
  
  const countryData = getCountryByCode(link.country_code);
  if (!countryData) return null;
  
  const payload = link.payload;
  
  // Get service-specific image and gradient
  const getServiceImage = () => {
    switch (link.type) {
      case 'shipping':
        return shippingHero;
      case 'chalet':
        return chaletHero;
      default:
        return chaletHero;
    }
  };
  
  const getServiceGradient = () => {
    switch (link.type) {
      case 'shipping':
        return 'var(--shipping-gradient)';
      case 'chalet':
        return 'var(--chalet-gradient)';
      case 'invoice':
        return 'var(--invoice-gradient)';
      case 'health':
        return 'var(--health-gradient)';
      case 'logistics':
        return 'var(--logistics-gradient)';
      case 'contract':
        return 'var(--contract-gradient)';
      default:
        return 'var(--gradient-primary)';
    }
  };
  
  return (
    <div className="min-h-screen py-12 bg-gradient-to-b from-secondary/30 to-background" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Success Animation */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-success rounded-full flex items-center justify-center mx-auto mb-4 animate-scale-in shadow-elevated">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-2">تم الدفع بنجاح!</h1>
            <p className="text-lg text-muted-foreground">
              شكراً لك، تم تأكيد حجزك
            </p>
          </div>
          
          <Card className="p-8 shadow-elevated">
            {/* Service Header with Image */}
            <div
              className="h-40 -mx-8 -mt-8 mb-6 rounded-t-xl relative overflow-hidden"
              style={{
                backgroundImage: `url(${getServiceImage()})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
              <div 
                className="absolute inset-0" 
                style={{ background: getServiceGradient(), opacity: 0.7 }}
              />
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <CheckCircle2 className="w-16 h-16 text-white drop-shadow-lg" />
              </div>
            </div>
            
            {/* Receipt Header */}
            <div className="text-center pb-6 border-b border-border mb-6">
              <Badge className="text-sm px-4 py-2 bg-gradient-success mb-3">
                <CheckCircle2 className="w-4 h-4 ml-2" />
                <span>مدفوع</span>
              </Badge>
              
              <p className="text-sm text-muted-foreground">رقم الإيصال</p>
              <p className="text-2xl font-bold">
                GF-{payment.id.substring(0, 8).toUpperCase()}
              </p>
            </div>
            
            {/* Details */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">الخدمة</span>
                <span className="font-semibold">
                  {link.type === 'shipping' && 'خدمة الشحن'}
                  {link.type === 'chalet' && payload.chalet_name}
                  {link.type === 'invoice' && 'الفواتير'}
                  {link.type === 'health' && 'التأمين الصحي'}
                  {link.type === 'logistics' && 'خدمات اللوجستيات'}
                  {link.type === 'contract' && 'العقود'}
                </span>
              </div>
              
              {link.type === 'chalet' && (
                <>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">المدة</span>
                    <span className="font-semibold">{payload.nights} ليلة</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">عدد الضيوف</span>
                    <span className="font-semibold">{payload.guest_count} ضيف</span>
                  </div>
                </>
              )}
              
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">طريقة الدفع</span>
                <span className="font-semibold">
                  بطاقة •••• {payment.last_four}
                </span>
              </div>
              
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">التاريخ</span>
                <span className="font-semibold" dir="ltr">
                  {new Date(payment.created_at).toLocaleDateString("ar-SA")}
                </span>
              </div>
              
              <div className="flex justify-between py-4 bg-gradient-success/10 rounded-lg px-4">
                <span className="text-lg font-bold">المبلغ المدفوع</span>
                <span className="text-2xl font-bold text-green-500">
                  {formatCurrency(payment.amount, payment.currency)}
                </span>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="flex-1" variant="outline">
                <Download className="w-5 h-5 ml-2" />
                <span>تحميل الإيصال</span>
              </Button>
              
              <Button size="lg" className="flex-1" variant="outline">
                <Share2 className="w-5 h-5 ml-2" />
                <span>مشاركة</span>
              </Button>
            </div>
            
            <Button
              size="lg"
              className="w-full mt-4"
              onClick={() => (window.location.href = "/")}
            >
              <Home className="w-5 h-5 ml-2" />
              <span>العودة للرئيسية</span>
            </Button>
            
            <p className="text-xs text-center text-muted-foreground mt-6">
              سيتم إرسال تفاصيل الحجز إلى بريدك الإلكتروني
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentReceipt;
