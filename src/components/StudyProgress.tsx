import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Flame, BookOpen, Clock } from "lucide-react";

interface ProgressMetric {
  label: string;
  value: number;
  total: number;
  color: string;
  icon: React.ReactNode;
}

export const StudyProgress = () => {
  const metrics: ProgressMetric[] = [
    {
      label: "Anatomia",
      value: 75,
      total: 100,
      color: "bg-success",
      icon: <BookOpen className="w-4 h-4" />
    },
    {
      label: "Fisiologia", 
      value: 60,
      total: 100,
      color: "bg-primary",
      icon: <BookOpen className="w-4 h-4" />
    },
    {
      label: "Farmacologia",
      value: 40,
      total: 100,
      color: "bg-warning",
      icon: <BookOpen className="w-4 h-4" />
    }
  ];

  const weeklyStats = {
    studyDays: 5,
    totalHours: 12,
    streak: 3
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Progress por Matéria */}
      <Card className="shadow-soft border-0 bg-card">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-warning" />
            Progresso por Matéria
          </h3>
          <div className="space-y-4">
            {metrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium flex items-center">
                    {metric.icon}
                    <span className="ml-2">{metric.label}</span>
                  </span>
                  <span className="text-sm text-muted-foreground">{metric.value}%</span>
                </div>
                <Progress 
                  value={metric.value} 
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Estatísticas da Semana */}
      <Card className="shadow-soft border-0 bg-card">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Flame className="w-5 h-5 mr-2 text-destructive" />
            Esta Semana
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">{weeklyStats.studyDays}</div>
              <div className="text-sm text-muted-foreground">Dias de Estudo</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success mb-1">{weeklyStats.totalHours}h</div>
              <div className="text-sm text-muted-foreground">Total Estudado</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning mb-1">{weeklyStats.streak}</div>
              <div className="text-sm text-muted-foreground">Sequência</div>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
              <Clock className="w-3 h-3 mr-1" />
              Consistente
            </Badge>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              <Trophy className="w-3 h-3 mr-1" />
              Top 10%
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  );
};