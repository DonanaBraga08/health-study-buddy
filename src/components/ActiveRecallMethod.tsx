import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Lightbulb, CheckCircle, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ActiveRecallMethod = () => {
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [phase, setPhase] = useState<'setup' | 'questions' | 'answers' | 'review'>('setup');
  const [currentIndex, setCurrentIndex] = useState(0);
  const { toast } = useToast();

  const startQuestions = () => {
    if (!topic.trim()) {
      toast({
        title: "Escolha um tópico",
        description: "Digite o assunto que você quer revisar.",
        variant: "destructive"
      });
      return;
    }
    setPhase('questions');
    toast({
      title: "Fase 1: Perguntas 🤔",
      description: "Crie perguntas sobre o tópico que você estudou."
    });
  };

  const addQuestion = () => {
    if (!currentQuestion.trim()) return;
    setQuestions([...questions, currentQuestion.trim()]);
    setCurrentQuestion("");
  };

  const startAnswering = () => {
    if (questions.length === 0) {
      toast({
        title: "Adicione perguntas primeiro",
        description: "Crie pelo menos uma pergunta para continuar.",
        variant: "destructive"
      });
      return;
    }
    setPhase('answers');
    setCurrentIndex(0);
    toast({
      title: "Fase 2: Respostas 💡",
      description: "Agora responda suas perguntas sem consultar material."
    });
  };

  const submitAnswer = () => {
    if (!currentAnswer.trim()) return;
    const newAnswers = [...answers];
    newAnswers[currentIndex] = currentAnswer.trim();
    setAnswers(newAnswers);
    
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentAnswer("");
    } else {
      setPhase('review');
      toast({
        title: "Concluído! 🎉",
        description: "Revise suas respostas e identifique pontos para melhorar."
      });
    }
  };

  const reset = () => {
    setTopic("");
    setQuestions([]);
    setCurrentQuestion("");
    setAnswers([]);
    setCurrentAnswer("");
    setPhase('setup');
    setCurrentIndex(0);
  };

  return (
    <Card className="shadow-widget border-0 bg-gradient-primary text-white">
      <CardHeader className="text-center">
        <Lightbulb className="w-8 h-8 mx-auto mb-2 animate-pulse-soft" />
        <CardTitle className="text-lg">Active Recall</CardTitle>
        <p className="text-white/80 text-sm">Recuperação ativa da memória</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {phase === 'setup' && (
          <>
            <Input
              placeholder="Ex: Anatomia do Coração"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
            />
            <Button
              onClick={startQuestions}
              variant="secondary"
              size="sm"
              className="w-full bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              Começar
            </Button>
          </>
        )}

        {phase === 'questions' && (
          <>
            <div className="text-center text-sm text-white/80 mb-2">
              Tópico: {topic}
            </div>
            <Textarea
              placeholder="Digite uma pergunta sobre o tópico..."
              value={currentQuestion}
              onChange={(e) => setCurrentQuestion(e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), addQuestion())}
            />
            <div className="text-sm text-white/80">
              Perguntas criadas: {questions.length}
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={addQuestion}
                variant="secondary"
                size="sm"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                Adicionar Pergunta
              </Button>
              <Button
                onClick={startAnswering}
                variant="secondary"
                size="sm"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                Começar a Responder
              </Button>
            </div>
          </>
        )}

        {phase === 'answers' && (
          <>
            <div className="text-center text-sm text-white/80 mb-2">
              Pergunta {currentIndex + 1} de {questions.length}
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mb-3">
              <p className="text-center font-medium">{questions[currentIndex]}</p>
            </div>
            <Textarea
              placeholder="Sua resposta..."
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
            />
            <Button
              onClick={submitAnswer}
              variant="secondary"
              size="sm"
              className="w-full bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              {currentIndex < questions.length - 1 ? 'Próxima' : 'Finalizar'}
            </Button>
          </>
        )}

        {phase === 'review' && (
          <>
            <div className="text-center text-sm text-white/80 mb-3">
              Revisão das suas respostas
            </div>
            <div className="space-y-3 max-h-40 overflow-y-auto">
              {questions.map((question, index) => (
                <div key={index} className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <p className="font-medium text-sm mb-2">{question}</p>
                  <p className="text-white/80 text-xs">{answers[index] || 'Sem resposta'}</p>
                </div>
              ))}
            </div>
            <Button
              onClick={reset}
              variant="secondary"
              size="sm"
              className="w-full bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Nova Sessão
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};