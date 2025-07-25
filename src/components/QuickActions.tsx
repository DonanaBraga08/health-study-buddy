import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Brain, 
  FileText, 
  Sparkles,
  Send,
  Upload
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const QuickActions = () => {
  const [activeTab, setActiveTab] = useState<'summary' | 'question'>('summary');
  const [text, setText] = useState('');
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSummary = async () => {
    if (!text.trim()) return;
    
    setIsLoading(true);
    // Simular processamento
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Resumo criado! ✨",
        description: "Seu texto foi resumido com sucesso.",
      });
    }, 2000);
  };

  const handleQuestion = async () => {
    if (!question.trim()) return;
    
    setIsLoading(true);
    // Simular processamento
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Resposta pronta! 🎯",
        description: "Sua dúvida foi esclarecida.",
      });
    }, 1500);
  };

  return (
    <Card className="shadow-widget border-0 bg-card">
      <div className="p-6">
        <div className="flex items-center justify-center mb-6">
          <div className="flex bg-secondary rounded-lg p-1">
            <Button
              variant={activeTab === 'summary' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('summary')}
              className="rounded-md"
            >
              <FileText className="w-4 h-4 mr-2" />
              Resumir
            </Button>
            <Button
              variant={activeTab === 'question' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('question')}
              className="rounded-md"
            >
              <Brain className="w-4 h-4 mr-2" />
              Perguntar
            </Button>
          </div>
        </div>

        {activeTab === 'summary' && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-primary" />
                Resumo Inteligente
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Cole seu texto ou faça upload de um arquivo para gerar um resumo automaticamente.
              </p>
            </div>
            
            <Textarea
              placeholder="Cole aqui o texto que você quer resumir..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[120px] resize-none"
            />
            
            <div className="flex items-center space-x-2">
              <Button
                onClick={handleSummary}
                disabled={!text.trim() || isLoading}
                variant="widget"
                size="sm"
                className="flex-1"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                ) : (
                  <Sparkles className="w-4 h-4 mr-2" />
                )}
                {isLoading ? 'Resumindo...' : 'Gerar Resumo'}
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-xs">
                <BookOpen className="w-3 h-3 mr-1" />
                PDF suportado
              </Badge>
              <Badge variant="secondary" className="text-xs">
                <FileText className="w-3 h-3 mr-1" />
                DOCX suportado
              </Badge>
            </div>
          </div>
        )}

        {activeTab === 'question' && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2 flex items-center">
                <Brain className="w-5 h-5 mr-2 text-primary" />
                Assistente de Estudos
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Faça qualquer pergunta sobre medicina, enfermagem, farmácia ou outras áreas da saúde.
              </p>
            </div>
            
            <Input
              placeholder="Ex: O que é hipertensão arterial?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleQuestion()}
            />
            
            <Button
              onClick={handleQuestion}
              disabled={!question.trim() || isLoading}
              variant="study"
              size="sm"
              className="w-full"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              {isLoading ? 'Pensando...' : 'Enviar Pergunta'}
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setQuestion('O que é diabetes mellitus?')}
                className="text-xs justify-start"
              >
                O que é diabetes mellitus?
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setQuestion('Como funciona o sistema cardiovascular?')}
                className="text-xs justify-start"
              >
                Sistema cardiovascular?
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};