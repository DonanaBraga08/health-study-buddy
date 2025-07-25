import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Heart, Star } from "lucide-react";
import studyBuddyImg from "@/assets/study-buddy.png";

const motivationalMessages = [
  "Vamos estudar! Você está no caminho certo! 📚",
  "Que tal uma pausa? Seu cérebro merece! 🧠",
  "Anatomia hoje? Eu te ajudo a memorizar! 💪",
  "Lembre-se: cada página estudada é um passo mais perto do seu sonho! ✨",
  "Hora do quiz! Vamos testar seus conhecimentos? 🎯"
];

export const StudyBuddy = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [mood, setMood] = useState<'happy' | 'encouraging' | 'celebrating'>('happy');

  const nextMessage = () => {
    setCurrentMessage((prev) => (prev + 1) % motivationalMessages.length);
    setMood(prev => prev === 'happy' ? 'encouraging' : prev === 'encouraging' ? 'celebrating' : 'happy');
  };

  return (
    <Card className="bg-gradient-soft border-0 shadow-widget hover:shadow-floating transition-all duration-300 mb-8">
      <div className="p-6 flex items-center space-x-4">
        <div className="relative">
          <div className={`w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center animate-bounce-soft ${mood === 'celebrating' ? 'animate-pulse-soft' : ''}`}>
            <img 
              src={studyBuddyImg} 
              alt="Study Buddy" 
              className="w-12 h-12 object-contain"
            />
          </div>
          <div className="absolute -top-1 -right-1">
            {mood === 'celebrating' && <Star className="w-4 h-4 text-warning animate-pulse" />}
            {mood === 'encouraging' && <Heart className="w-4 h-4 text-destructive animate-pulse" />}
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-2">Seu Study Buddy</h3>
          <p className="text-muted-foreground text-sm mb-3 animate-slide-up">
            {motivationalMessages[currentMessage]}
          </p>
          <Button 
            onClick={nextMessage}
            variant="outline" 
            size="sm"
            className="bg-white/10 border-primary/30 text-primary hover:bg-primary/10"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Nova mensagem
          </Button>
        </div>
      </div>
    </Card>
  );
};