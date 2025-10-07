import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Building2, FileText, Copy, Check } from "lucide-react";
import { useCreateLink } from "@/hooks/useSupabase";
import { useToast } from "@/hooks/use-toast";
import { COUNTRIES } from "@/lib/countries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreateContractLink = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const createLink = useCreateLink();
  const [generatedLink, setGeneratedLink] = useState<string>("");
  const [copied, setCopied] = useState(false);
  
  const countryData = COUNTRIES.find((c) => c.code === country);
  
  const [formData, setFormData] = useState({
    contractType: "",
    contractTitle: "",
    firstPartyName: "",
    firstPartyId: "",
    firstPartyPhone: "",
    firstPartyEmail: "",
    secondPartyName: "",
    secondPartyId: "",
    secondPartyPhone: "",
    secondPartyEmail: "",
    contractValue: "",
    startDate: "",
    endDate: "",
    paymentTerms: "",
    terms: "",
    specialConditions: "",
  });

  const contractTypes = [
    "عقد عمل",
    "عقد إيجار",
    "عقد شراكة",
    "عقد توريد",
    "عقد خدمات",
    "عقد استشارات",
    "عقد بيع",
    "عقد تسويق",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!formData.contractType || !formData.contractTitle || !formData.firstPartyName || !formData.secondPartyName) {
        toast({
          title: "خطأ",
          description: "يرجى ملء جميع الحقول المطلوبة",
          variant: "destructive",
        });
        return;
      }

      const result = await createLink.mutateAsync({
        type: "contract",
        country_code: country!,
        payload: {
          contract: {
            type: formData.contractType,
            title: formData.contractTitle,
            value: formData.contractValue,
            paymentTerms: formData.paymentTerms,
            startDate: formData.startDate,
            endDate: formData.endDate,
          },
          firstParty: {
            name: formData.firstPartyName,
            id: formData.firstPartyId,
            phone: formData.firstPartyPhone,
            email: formData.firstPartyEmail,
          },
          secondParty: {
            name: formData.secondPartyName,
            id: formData.secondPartyId,
            phone: formData.secondPartyPhone,
            email: formData.secondPartyEmail,
          },
          terms: formData.terms,
          specialConditions: formData.specialConditions,
          currency: countryData?.currency || "SAR",
        },
      });

      setGeneratedLink(result.microsite_url);
    } catch (error) {
      console.error("Error creating contract link:", error);
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

  if (generatedLink) {
    return (
      <div className="min-h-screen py-12 bg-gradient-to-b from-background via-card/20 to-background" dir="rtl">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="p-8 text-center">
            <div className="w-20 h-20 bg-gradient-success rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4">تم إنشاء العقد بنجاح!</h2>
            <p className="text-muted-foreground mb-6">
              شارك هذا الرابط مع الأطراف المعنية لمراجعة العقد والتوقيع
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
                إنشاء عقد جديد
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-gradient-to-b from-background via-card/20 to-background" dir="rtl">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/services")}
            className="mb-4"
          >
            <ArrowRight className="ml-2 h-4 w-4" />
            العودة للخدمات
          </Button>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">إنشاء عقد إلكتروني</h1>
              <p className="text-muted-foreground">أنشئ عقدك الإلكتروني بأمان واحترافية</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contract Basic Info */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">معلومات العقد الأساسية</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="contractType">نوع العقد *</Label>
                <Select
                  value={formData.contractType}
                  onValueChange={(value) => setFormData({...formData, contractType: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع العقد" />
                  </SelectTrigger>
                  <SelectContent>
                    {contractTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="contractTitle">عنوان العقد *</Label>
                <Input
                  id="contractTitle"
                  value={formData.contractTitle}
                  onChange={(e) => setFormData({...formData, contractTitle: e.target.value})}
                  placeholder="أدخل عنوان العقد"
                  required
                />
              </div>
              <div>
                <Label htmlFor="contractValue">قيمة العقد (ر.س)</Label>
                <Input
                  id="contractValue"
                  type="number"
                  value={formData.contractValue}
                  onChange={(e) => setFormData({...formData, contractValue: e.target.value})}
                  placeholder="0.00"
                />
              </div>
              <div>
                <Label htmlFor="paymentTerms">شروط الدفع</Label>
                <Input
                  id="paymentTerms"
                  value={formData.paymentTerms}
                  onChange={(e) => setFormData({...formData, paymentTerms: e.target.value})}
                  placeholder="مثال: دفعة مقدمة 30%"
                />
              </div>
              <div>
                <Label htmlFor="startDate">تاريخ البداية</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="endDate">تاريخ النهاية</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                />
              </div>
            </div>
          </Card>

          {/* First Party */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">بيانات الطرف الأول *</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstPartyName">الاسم / الشركة *</Label>
                <Input
                  id="firstPartyName"
                  value={formData.firstPartyName}
                  onChange={(e) => setFormData({...formData, firstPartyName: e.target.value})}
                  placeholder="اسم الطرف الأول"
                  required
                />
              </div>
              <div>
                <Label htmlFor="firstPartyId">رقم الهوية / السجل التجاري</Label>
                <Input
                  id="firstPartyId"
                  value={formData.firstPartyId}
                  onChange={(e) => setFormData({...formData, firstPartyId: e.target.value})}
                  placeholder="XXXXXXXXXX"
                />
              </div>
              <div>
                <Label htmlFor="firstPartyPhone">رقم الهاتف</Label>
                <Input
                  id="firstPartyPhone"
                  value={formData.firstPartyPhone}
                  onChange={(e) => setFormData({...formData, firstPartyPhone: e.target.value})}
                  placeholder="+966 XX XXX XXXX"
                />
              </div>
              <div>
                <Label htmlFor="firstPartyEmail">البريد الإلكتروني</Label>
                <Input
                  id="firstPartyEmail"
                  type="email"
                  value={formData.firstPartyEmail}
                  onChange={(e) => setFormData({...formData, firstPartyEmail: e.target.value})}
                  placeholder="email@example.com"
                />
              </div>
            </div>
          </Card>

          {/* Second Party */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">بيانات الطرف الثاني *</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="secondPartyName">الاسم / الشركة *</Label>
                <Input
                  id="secondPartyName"
                  value={formData.secondPartyName}
                  onChange={(e) => setFormData({...formData, secondPartyName: e.target.value})}
                  placeholder="اسم الطرف الثاني"
                  required
                />
              </div>
              <div>
                <Label htmlFor="secondPartyId">رقم الهوية / السجل التجاري</Label>
                <Input
                  id="secondPartyId"
                  value={formData.secondPartyId}
                  onChange={(e) => setFormData({...formData, secondPartyId: e.target.value})}
                  placeholder="XXXXXXXXXX"
                />
              </div>
              <div>
                <Label htmlFor="secondPartyPhone">رقم الهاتف</Label>
                <Input
                  id="secondPartyPhone"
                  value={formData.secondPartyPhone}
                  onChange={(e) => setFormData({...formData, secondPartyPhone: e.target.value})}
                  placeholder="+966 XX XXX XXXX"
                />
              </div>
              <div>
                <Label htmlFor="secondPartyEmail">البريد الإلكتروني</Label>
                <Input
                  id="secondPartyEmail"
                  type="email"
                  value={formData.secondPartyEmail}
                  onChange={(e) => setFormData({...formData, secondPartyEmail: e.target.value})}
                  placeholder="email@example.com"
                />
              </div>
            </div>
          </Card>

          {/* Terms & Conditions */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">البنود والشروط</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="terms">بنود العقد الرئيسية</Label>
                <Textarea
                  id="terms"
                  value={formData.terms}
                  onChange={(e) => setFormData({...formData, terms: e.target.value})}
                  placeholder="اكتب البنود الرئيسية للعقد..."
                  rows={5}
                />
              </div>
              <div>
                <Label htmlFor="specialConditions">شروط خاصة</Label>
                <Textarea
                  id="specialConditions"
                  value={formData.specialConditions}
                  onChange={(e) => setFormData({...formData, specialConditions: e.target.value})}
                  placeholder="أي شروط أو ملاحظات خاصة..."
                  rows={3}
                />
              </div>
            </div>
          </Card>

          {/* Submit */}
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={createLink.isPending}
          >
            <FileText className="ml-2 h-5 w-5" />
            {createLink.isPending ? "جاري الإنشاء..." : "إنشاء العقد"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateContractLink;
