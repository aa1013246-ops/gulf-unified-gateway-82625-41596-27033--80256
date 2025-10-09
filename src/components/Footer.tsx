import { Link } from "react-router-dom";
import { Package, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-foreground to-foreground/90 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-glow">
                <Package className="w-7 h-7 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold">Gulf Unified</span>
                <span className="text-xs text-white/70">حلول لوجستية متكاملة</span>
              </div>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              نربط دول الخليج بالعالم من خلال حلول لوجستية سريعة وآمنة وموثوقة
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/80 hover:text-white transition-colors text-sm">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white/80 hover:text-white transition-colors text-sm">
                  خدماتنا
                </Link>
              </li>
              <li>
                <Link to="/track" className="text-white/80 hover:text-white transition-colors text-sm">
                  تتبع الشحنة
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4">خدماتنا</h3>
            <ul className="space-y-2">
              <li className="text-white/80 text-sm">الشحن السريع المحلي</li>
              <li className="text-white/80 text-sm">التوصيل الدولي</li>
              <li className="text-white/80 text-sm">خدمات التجارة الإلكترونية</li>
              <li className="text-white/80 text-sm">التتبع الذكي</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">تواصل معنا</h3>
            <div className="space-y-3">
              <p className="text-white/80 text-sm">
                الهاتف: <span className="text-white">+966 XX XXX XXXX</span>
              </p>
              <p className="text-white/80 text-sm">
                البريد: <span className="text-white">info@gulfunified.com</span>
              </p>
              <div className="flex gap-3 pt-2">
                <a href="#" className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm">
            © 2025 Gulf Unified. جميع الحقوق محفوظة
          </p>
          <div className="flex gap-6">
            <Link to="#" className="text-white/60 hover:text-white text-sm transition-colors">
              سياسة الخصوصية
            </Link>
            <Link to="#" className="text-white/60 hover:text-white text-sm transition-colors">
              الشروط والأحكام
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
