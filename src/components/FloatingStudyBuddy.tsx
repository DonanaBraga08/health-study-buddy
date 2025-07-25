import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Lightbulb } from "lucide-react";
import studyBuddyImg from "@/assets/study-buddy.png";

const tips = [
  "💡 Use a técnica Pomodoro: 25 min de estudo + 5 min de pausa!",
  "🧠 Faça resumos com suas próprias palavras para memorizar melhor!",
  "📚 Revise o conteúdo em intervalos regulares (1 dia, 1 semana, 1 mês)!",
  "🎯 Defina metas pequenas e alcançáveis para manter a motivação!",
  "💪 Estude em um ambiente livre de distrações!",
];

export const FloatingStudyBuddy = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % tips.length);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-primary shadow-floating hover:shadow-xl transition-all duration-300 animate-bounce-soft"
          size="icon"
        >
          <img 
            src={studyBuddyImg} 
            alt="Study Buddy" 
            className="w-10 h-10 object-contain"
          />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className="bg-gradient-soft rounded-2xl shadow-floating p-4 max-w-sm border-0">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <img 
                src={studyBuddyImg} 
                alt="Study Buddy" 
                className="w-6 h-6 object-contain"
              />
            </div>
            <span className="font-semibold text-sm">Study Buddy</span>
          </div>
          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="icon"
            className="w-6 h-6 h-auto p-1"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <p className="text-sm text-foreground mb-3 leading-relaxed">
          {tips[currentTip]}
        </p>
        
        <div className="flex space-x-2">
          <Button
            onClick={nextTip}
            variant="outline"
            size="sm"
            className="flex-1 bg-white/20 border-white/30"
          >
            <Lightbulb className="w-3 h-3 mr-1" />
            Nova Dica
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-white/20 border-white/30"
          >
            <MessageCircle className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};