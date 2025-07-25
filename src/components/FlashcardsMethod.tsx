import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CreditCard, Plus, RotateCcw, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Flashcard {
  id: number;
  front: string;
  back: string;
}

export const FlashcardsMethod = () => {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isStudying, setIsStudying] = useState(false);
  const { toast } = useToast();

  const addCard = () => {
    if (!front.trim() || !back.trim()) {
      toast({
        title: "Preencha ambos os campos",
        description: "Frente e verso do cartão são obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const newCard: Flashcard = {
      id: Date.now(),
      front: front.trim(),
      back: back.trim()
    };

    setCards([...cards, newCard]);
    setFront("");
    setBack("");
    
    toast({
      title: "Cartão adicionado! 📚",
      description: `Total: ${cards.length + 1} cartões`
    });
  };

  const startStudying = () => {
    if (cards.length === 0) {
      toast({
        title: "Adicione cartões primeiro",
        description: "Crie pelo menos um flashcard para estudar.",
        variant: "destructive"
      });
      return;
    }
    setIsStudying(true);
    setCurrentCardIndex(0);
    setShowAnswer(false);
  };

  const nextCard = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowAnswer(false);
    } else {
      toast({
        title: "Parabéns! 🎉",
        description: "Você revisou todos os cartões!"
      });
      setIsStudying(false);
    }
  };

  const reset = () => {
    setCards([]);
    setFront("");
    setBack("");
    setIsStudying(false);
    setCurrentCardIndex(0);
    setShowAnswer(false);
  };

  return (
    <Card className="shadow-widget border-0 bg-gradient-soft text-white">
      <CardHeader className="text-center">
        <CreditCard className="w-8 h-8 mx-auto mb-2 animate-pulse-soft" />
        <CardTitle className="text-lg">Flashcards</CardTitle>
        <p className="text-white/80 text-sm">Memorização ativa</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isStudying ? (
          <>
            <div className="space-y-2">
              <Input
                placeholder="Frente do cartão (pergunta)"
                value={front}
                onChange={(e) => setFront(e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              />
              <Textarea
                placeholder="Verso do cartão (resposta)"
                value={back}
                onChange={(e) => setBack(e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 min-h-20"
              />
            </div>
            
            <div className="flex justify-center space-x-2">
              <Button
                onClick={addCard}
                variant="secondary"
                size="sm"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                <Plus className="w-4 h-4 mr-1" />
                Adicionar
              </Button>
              <Button
                onClick={startStudying}
                variant="secondary"
                size="sm"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                <Eye className="w-4 h-4 mr-1" />
                Estudar ({cards.length})
              </Button>
              <Button
                onClick={reset}
                variant="secondary"
                size="sm"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center space-y-4">
            <div className="text-sm text-white/80">
              Cartão {currentCardIndex + 1} de {cards.length}
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 min-h-24 flex items-center justify-center">
              <p className="text-center">
                {!showAnswer ? cards[currentCardIndex]?.front : cards[currentCardIndex]?.back}
              </p>
            </div>
            
            <div className="flex justify-center space-x-2">
              <Button
                onClick={() => setShowAnswer(!showAnswer)}
                variant="secondary"
                size="sm"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                {showAnswer ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
                {showAnswer ? 'Ocultar' : 'Mostrar'}
              </Button>
              {showAnswer && (
                <Button
                  onClick={nextCard}
                  variant="secondary"
                  size="sm"
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                >
                  Próximo
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};