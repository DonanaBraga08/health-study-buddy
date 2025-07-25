import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, BookOpen, Brain, Target } from "lucide-react";

interface StudyWidgetProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  action: string;
  gradient?: string;
  onClick?: () => void;
}

export const StudyWidget = ({ 
  title, 
  subtitle, 
  icon, 
  action, 
  gradient = "bg-gradient-primary",
  onClick 
}: StudyWidgetProps) => {
  return (
    <Card className={`${gradient} border-0 shadow-widget hover:shadow-floating transition-all duration-300 transform hover:scale-105 cursor-pointer`} onClick={onClick}>
      <div className="p-6 text-center">
        <div className="mb-4 flex justify-center">
          <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
            {icon}
          </div>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-white/80 text-sm mb-4">{subtitle}</p>
        <Button 
          variant="secondary" 
          size="sm" 
          className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
        >
          {action}
        </Button>
      </div>
    </Card>
  );
};

export const QuickStudyWidgets = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StudyWidget
        title="Pomodoro"
        subtitle="Sessão de 25 min focada"
        icon={<Clock className="w-6 h-6 text-white" />}
        action="Iniciar"
        gradient="bg-gradient-primary"
      />
      <StudyWidget
        title="Resumo IA"
        subtitle="Resuma textos complexos"
        icon={<BookOpen className="w-6 h-6 text-white" />}
        action="Criar"
        gradient="bg-gradient-study"
      />
      <StudyWidget
        title="Perguntar"
        subtitle="Tire suas dúvidas"
        icon={<Brain className="w-6 h-6 text-white" />}
        action="Perguntar"
        gradient="bg-gradient-soft"
      />
      <StudyWidget
        title="Metas"
        subtitle="Acompanhe progresso"
        icon={<Target className="w-6 h-6 text-white" />}
        action="Ver"
        gradient="bg-gradient-primary"
      />
    </div>
  );
};