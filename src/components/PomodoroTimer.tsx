import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, RotateCcw, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutos em segundos
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'work' | 'break'>('work');
  const { toast } = useToast();

  const totalTime = phase === 'work' ? 25 * 60 : 5 * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (phase === 'work') {
        toast({
          title: "Pausa merecida! 🎉",
          description: "Hora de relaxar por 5 minutos.",
        });
        setPhase('break');
        setTimeLeft(5 * 60);
      } else {
        toast({
          title: "Volta ao trabalho! 💪",
          description: "Vamos começar um novo ciclo de estudos.",
        });
        setPhase('work');
        setTimeLeft(25 * 60);
      }
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, phase, toast]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleStart = () => setIsActive(!isActive);
  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(phase === 'work' ? 25 * 60 : 5 * 60);
  };

  return (
    <Card className="shadow-widget border-0 bg-gradient-primary text-white">
      <div className="p-6 text-center">
        <div className="mb-4">
          <Clock className="w-8 h-8 mx-auto mb-2 animate-pulse-soft" />
          <h3 className="text-lg font-semibold mb-1">
            {phase === 'work' ? 'Tempo de Estudo' : 'Pausa'}
          </h3>
          <p className="text-white/80 text-sm">
            {phase === 'work' ? 'Foque nos seus estudos!' : 'Relaxe um pouco!'}
          </p>
        </div>

        <div className="mb-6">
          <div className="text-4xl font-bold mb-4 font-mono">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <Progress 
            value={progress} 
            className="h-2 bg-white/20"
          />
        </div>

        <div className="flex justify-center space-x-2">
          <Button
            onClick={handleStart}
            variant="secondary"
            size="sm"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isActive ? 'Pausar' : 'Iniciar'}
          </Button>
          <Button
            onClick={handleReset}
            variant="secondary"
            size="sm"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>
      </div>
    </Card>
  );
};