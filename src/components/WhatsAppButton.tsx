import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phoneNumber = "966XXXXXXXXX"; // Replace with actual number
  const message = "مرحباً، أريد الاستفسار عن خدماتكم";

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] rounded-full shadow-intense flex items-center justify-center group transition-all duration-300 hover:scale-110 animate-pulse-glow"
      aria-label="تواصل عبر واتساب"
    >
      <MessageCircle className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
    </button>
  );
};

export default WhatsAppButton;
