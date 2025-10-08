import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { usePayment, useUpdatePayment, useLink } from "@/hooks/useSupabase";
import { Shield, AlertCircle, Check, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import chaletHero from "@/assets/chalet-hero.jpg";
import shippingHero from "@/assets/shipping-hero.jpg";

const PaymentOTP = () => {
  const { id, paymentId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: payment, refetch } = usePayment(paymentId);
  const updatePayment = useUpdatePayment();
  const { data: link } = useLink(payment?.link_id || undefined);
  
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  
  useEffect(() => {
    if (payment?.locked_until) {
      const lockTime = new Date(payment.locked_until).getTime();
      const now = Date.now();
      
      if (now < lockTime) {
        setIsLocked(true);
        setError("تم حظر عملية الدفع مؤقتاً لأسباب أمنية.");
      } else {
        setIsLocked(false);
      }
    }
  }, [payment]);
  
  const handleSubmit = async () => {
    if (!payment || isLocked) return;
    
    setError("");
    
    // Check if OTP matches
    if (otp === payment.otp) {
      // Success!
      await updatePayment.mutateAsync({
        paymentId: payment.id,
        updates: {
          status: "confirmed",
          receipt_url: `/pay/${id}/receipt/${payment.id}`,
        },
      });
      
      toast({
        title: "تم بنجاح!",
        description: "تم تأكيد الدفع بنجاح",
      });
      
      navigate(`/pay/${id}/receipt/${payment.id}`);
    } else {
      // Wrong OTP
      const newAttempts = payment.attempts + 1;
      
      if (newAttempts >= 3) {
        // Lock for 15 minutes
        const lockUntil = new Date(Date.now() + 15 * 60 * 1000).toISOString();
        
        await updatePayment.mutateAsync({
          paymentId: payment.id,
          updates: {
            attempts: newAttempts,
            locked_until: lockUntil,
          },
        });
        
        setIsLocked(true);
        setError("تم حظر عملية الدفع مؤقتاً لأسباب أمنية.");
        
        toast({
          title: "تم الحظر",
          description: "لقد تجاوزت عدد المحاولات المسموحة",
          variant: "destructive",
        });
      } else {
        // Increment attempts
        await updatePayment.mutateAsync({
          paymentId: payment.id,
          updates: {
            attempts: newAttempts,
          },
        });
        
        setError(`رمز التحقق غير صحيح. حاول مرة أخرى. (${3 - newAttempts} محاولات متبقية)`);
        refetch();
      }
    }
  };
  
  // FOR TESTING: Display actual OTP (remove in production)
  useEffect(() => {
    if (payment?.otp) {
      console.log("🔐 OTP للاختبار:", payment.otp);
    }
  }, [payment]);
  
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
              <span>التحقق الآمن</span>
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
              <Shield className="w-12 h-12 text-white relative z-10 animate-pulse-glow drop-shadow-lg" />
            </div>
            
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold">رمز التحقق</h1>
              <p className="text-sm text-muted-foreground">أدخل الرمز المرسل</p>
            </div>
            
            {/* Info */}
            <div className="bg-secondary/30 p-4 rounded-lg mb-6">
              <p className="text-sm text-muted-foreground">
                تم إرسال رمز التحقق إلى هاتفك المسجل في البنك. الرجاء إدخاله أدناه.
              </p>
            </div>
            
            {/* Testing Note */}
            {payment?.otp && (
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 mb-6">
                <p className="text-sm text-amber-500">
                  <strong>للاختبار فقط:</strong> رمز OTP = {payment.otp}
                </p>
              </div>
            )}
            
            {/* OTP Input */}
            <div className="mb-6">
              <Input
                placeholder="----"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
                inputMode="numeric"
                className="h-16 text-center text-3xl tracking-widest font-bold"
                disabled={isLocked}
                maxLength={4}
              />
            </div>
            
            {/* Error Message */}
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 mb-6 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}
            
            {/* Attempts Counter */}
            {payment && payment.attempts > 0 && !isLocked && (
              <div className="text-center mb-6">
                <p className="text-sm text-muted-foreground">
                  المحاولات المتبقية: <strong>{3 - payment.attempts}</strong>
                </p>
              </div>
            )}
            
            {/* Submit Button */}
            <Button
              size="lg"
              className="w-full text-lg py-7"
              onClick={handleSubmit}
              disabled={updatePayment.isPending || isLocked || otp.length < 4}
            >
              {updatePayment.isPending ? (
                <span>جاري التحقق...</span>
              ) : isLocked ? (
                <span>محظور مؤقتاً</span>
              ) : (
                <>
                  <Check className="w-5 h-5 ml-2" />
                  <span>تأكيد</span>
                </>
              )}
            </Button>
            
            <p className="text-xs text-center text-muted-foreground mt-4">
              لم تستلم الرمز؟ تحقق من رسائلك أو اتصل بالبنك
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentOTP;
