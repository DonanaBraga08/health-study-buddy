import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Brain, Play, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const FeynmanMethod = () => {
  const [topic, setTopic] = useState("");
  const [explanation, setExplanation] = useState("");
  const [isActive, setIsActive] = useState(false);
  const { toast } = useToast();

  const handleStart = () => {
    if (!topic.trim()) {
      toast({
        title: "Escolha um tópico",
        description: "Digite o assunto que você quer explicar.",
        variant: "destructive"
      });
      return;
    }
    setIsActive(true);
    toast({
      title: "Método Feynman iniciado! 🧠",
      description: "Explique o conceito com suas próprias palavras.",
    });
  };

  const handleReset = () => {
    setTopic("");
    setExplanation("");
    setIsActive(false);
  };

  return (
    <Card className="shadow-widget border-0 bg-gradient-study text-white">
      <CardHeader className="text-center">
        <Brain className="w-8 h-8 mx-auto mb-2 animate-pulse-soft" />
        <CardTitle className="text-lg">Método Feynman</CardTitle>
        <p className="text-white/80 text-sm">Ensine para aprender melhor</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Input
            placeholder="Ex: Sistema Cardiovascular"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
            disabled={isActive}
          />
        </div>
        
        {isActive && (
          <div>
            <Textarea
              placeholder="Explique o conceito como se estivesse ensinando para uma criança..."
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60 min-h-32"
            />
          </div>
        )}

        <div className="flex justify-center space-x-2">
          <Button
            onClick={handleStart}
            disabled={isActive}
            variant="secondary"
            size="sm"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <Play className="w-4 h-4 mr-1" />
            Iniciar
          </Button>
          <Button
            onClick={handleReset}
            variant="secondary"
            size="sm"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};