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
}

const ServiceCard = ({ 
  titleAr, 
  description, 
  icon: Icon, 
  href,
  gradient,
  iconBg,
  shadow,
}: ServiceCardProps) => {
  return (
    <Link to={href}>
      <Card className={`group relative overflow-hidden border-0 ${gradient} p-[1px] transition-all duration-500 hover:scale-[1.02] hover:shadow-elevated ${shadow}`}>
        <div className="h-full bg-card backdrop-blur-xl rounded-lg p-8 transition-all duration-500 group-hover:bg-card/80">
          {/* Icon */}
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${iconBg} flex items-center justify-center mb-6 shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
            <Icon className="w-8 h-8 text-white" />
          </div>

          {/* Content */}
          <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent group-hover:from-primary group-hover:to-accent transition-all duration-500">
            {titleAr}
          </h3>
          
          <p className="text-muted-foreground mb-6 leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
            {description}
          </p>

          {/* Button */}
          <Button 
            variant="ghost" 
            className="w-full group/btn bg-gradient-to-r from-primary/10 to-accent/10 hover:from-primary/20 hover:to-accent/20 border border-primary/20 hover:border-primary/40 transition-all duration-300"
          >
            <span className="mr-2 font-semibold">تصفح الخدمة</span>
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover/btn:-translate-x-1" />
          </Button>

          {/* Glow Effect */}
          <div className={`absolute -inset-1 bg-gradient-to-r ${iconBg} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-lg -z-10`} />
        </div>
      </Card>
    </Link>
  );
};

export default ServiceCard;
