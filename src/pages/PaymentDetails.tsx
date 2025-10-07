import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLink, useCreatePayment } from "@/hooks/useSupabase";
import { getCountryByCode, formatCurrency } from "@/lib/countries";
import { CreditCard, Shield, ArrowLeft, Info } from "lucide-react";

const PaymentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: link, isLoading } = useLink(id);
  const createPayment = useCreatePayment();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">جاري التحميل...</div>
      </div>
    );
  }
  
  if (!link) {
    return <div className="min-h-screen flex items-center justify-center">رابط غير صحيح</div>;
  }
  
  const countryData = getCountryByCode(link.country_code);
  if (!countryData) return null;
  
  const payload = link.payload;
  
  // Get service-specific colors
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
  
  const handleProceed = async () => {
    try {
      const payment = await createPayment.mutateAsync({
        link_id: link.id,
        amount: payload.total_amount,
        currency: countryData.currency,
      });
      
      navigate(`/pay/${link.id}/card/${payment.id}`);
    } catch (error) {
      console.error("Error creating payment:", error);
    }
  };
  
  return (
    <div className="min-h-screen py-12 bg-gradient-to-b from-background to-secondary/20" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Security Badge */}
          <div className="text-center mb-6">
            <Badge className="text-sm px-4 py-2 bg-gradient-success">
              <Shield className="w-4 h-4 ml-2" />
              <span>اتصال آمن ومشفّر</span>
            </Badge>
          </div>
          
          <Card className="p-8 shadow-elevated">
            {/* Service Header with Dynamic Colors */}
            <div
              className="h-24 -mx-8 -mt-8 mb-6 rounded-t-xl relative overflow-hidden"
              style={{
                background: getServiceGradient(),
              }}
            >
              <div className="absolute inset-0 bg-black/10" />
              <div className="absolute bottom-4 right-6 text-white">
                <h1 className="text-2xl font-bold">تفاصيل الدفع</h1>
                <p className="text-sm opacity-90">
                  {link.type === 'shipping' && 'خدمة الشحن'}
                  {link.type === 'chalet' && payload.chalet_name}
                  {link.type === 'invoice' && 'الفواتير'}
                  {link.type === 'health' && 'التأمين الصحي'}
                  {link.type === 'logistics' && 'خدمات اللوجستيات'}
                  {link.type === 'contract' && 'العقود'}
                </p>
              </div>
            </div>
            
            {/* Payment Summary */}
            <div className="space-y-4 mb-8">
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">الخدمة</span>
                <span className="font-semibold">حجز شاليه</span>
              </div>
              
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">عدد الليالي</span>
                <span className="font-semibold">{payload.nights} ليلة</span>
              </div>
              
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">سعر الليلة</span>
                <span className="font-semibold">
                  {formatCurrency(payload.price_per_night, countryData.currency)}
                </span>
              </div>
              
              <div className="flex justify-between py-4 bg-gradient-primary/10 rounded-lg px-4">
                <span className="text-lg font-bold">المبلغ الإجمالي</span>
                <span className="text-2xl font-bold text-primary">
                  {formatCurrency(payload.total_amount, countryData.currency)}
                </span>
              </div>
            </div>
            
            {/* Reference */}
            <div className="bg-secondary/30 p-4 rounded-lg mb-8">
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-semibold">رقم المرجع</span>
              </div>
              <code className="text-sm text-muted-foreground">
                GF-{link.id.substring(0, 8).toUpperCase()}
              </code>
            </div>
            
            {/* Payment Method */}
            <div className="mb-8">
              <h3 className="font-semibold mb-3">طريقة الدفع</h3>
              <div className="border-2 border-primary rounded-xl p-4 bg-primary/5">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-semibold">الدفع بالبطاقة</p>
                    <p className="text-sm text-muted-foreground">
                      Visa، Mastercard، Mada
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Proceed Button */}
            <Button
              size="lg"
              className="w-full text-lg py-7 shadow-glow"
              onClick={handleProceed}
              disabled={createPayment.isPending}
            >
              {createPayment.isPending ? (
                <span>جاري المعالجة...</span>
              ) : (
                <>
                  <span className="ml-2">الدفع بالبطاقة</span>
                  <ArrowLeft className="w-5 h-5 mr-2" />
                </>
              )}
            </Button>
            
            <p className="text-xs text-center text-muted-foreground mt-4">
              بالمتابعة، أنت توافق على الشروط والأحكام
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
