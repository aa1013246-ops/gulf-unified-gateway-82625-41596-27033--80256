import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LucideIcon, ArrowLeft } from "lucide-react";

interface ServiceCardProps {
  title: string;
  titleAr: string;
  description: string;
  icon: LucideIcon;
  href: string;
  gradient: string;
  iconBg: string;
  shadow: string;
  image?: string;
}

const ServiceCard = ({ 
  titleAr, 
  description, 
  icon: Icon, 
  href,
  gradient,
  iconBg,
  shadow,
  image,
}: ServiceCardProps) => {
  return (
    <Link to={href} className="block">
      <Card className={`group relative overflow-hidden border border-border/50 hover:border-primary/30 bg-card transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${shadow}`}>
        {/* Image Header */}
        {image && (
          <div className="relative h-48 overflow-hidden">
            <img 
              src={image} 
              alt={titleAr}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${iconBg} opacity-40 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-30`} />
            
            {/* Icon Badge */}
            <div className="absolute top-4 right-4">
              <div className={`w-14 h-14 rounded-xl bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                <Icon className={`w-7 h-7 bg-gradient-to-br ${iconBg} bg-clip-text text-transparent`} strokeWidth={2.5} />
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
            {titleAr}
          </h3>
          
          <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-3 text-base">
            {description}
          </p>

          {/* Button */}
          <Button 
            className={`w-full bg-gradient-to-r ${iconBg} text-white hover:shadow-lg transition-all duration-300 font-semibold text-base h-12 group-hover:scale-[1.02]`}
          >
            <span className="mr-2">اطلب الخدمة الآن</span>
            <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
          </Button>
        </div>

        {/* Bottom Accent Line */}
        <div className={`h-1 bg-gradient-to-r ${iconBg} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right`} />
      </Card>
    </Link>
  );
};

export default ServiceCard;
