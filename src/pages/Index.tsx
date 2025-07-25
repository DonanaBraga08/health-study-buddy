import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QuickStudyWidgets } from "@/components/StudyWidget";
import { StudyBuddy } from "@/components/StudyBuddy";
import { StudyProgress } from "@/components/StudyProgress";
import { PomodoroTimer } from "@/components/PomodoroTimer";
import { FeynmanMethod } from "@/components/FeynmanMethod";
import { FlashcardsMethod } from "@/components/FlashcardsMethod";
import { ActiveRecallMethod } from "@/components/ActiveRecallMethod";
import { MindMapMethod } from "@/components/MindMapMethod";
import { QuickActions } from "@/components/QuickActions";
import { FloatingStudyBuddy } from "@/components/FloatingStudyBuddy";
import { Heart, BookOpen, Settings, User } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center shadow-soft">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">EstudaSaúde</h1>
                <p className="text-sm text-muted-foreground">Seu parceiro de estudos</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Olá, futuro profissional da saúde! 👋
          </h2>
          <p className="text-lg text-muted-foreground">
            Que tal começarmos mais uma sessão de estudos produtiva?
          </p>
        </div>

        {/* Study Buddy */}
        <StudyBuddy />

        {/* Quick Actions */}
        <QuickStudyWidgets />

        {/* Progress Section */}
        <StudyProgress />

        {/* Study Methods */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-foreground">Métodos de Estudo</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <PomodoroTimer />
            <FeynmanMethod />
            <FlashcardsMethod />
            <ActiveRecallMethod />
            <MindMapMethod />
            <QuickActions />
          </div>
        </div>

        {/* Today's Goals */}
        <Card className="shadow-soft border-0 bg-gradient-soft">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-primary" />
              Metas de Hoje
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">2h</div>
                <div className="text-sm text-muted-foreground">Estudar Anatomia</div>
                <Button variant="outline" size="sm" className="mt-2 bg-white/10 border-white/20">
                  Iniciar
                </Button>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-success mb-1">5</div>
                <div className="text-sm text-muted-foreground">Flashcards</div>
                <Button variant="outline" size="sm" className="mt-2 bg-white/10 border-white/20">
                  Revisar
                </Button>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-warning mb-1">1</div>
                <div className="text-sm text-muted-foreground">Quiz</div>
                <Button variant="outline" size="sm" className="mt-2 bg-white/10 border-white/20">
                  Fazer
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </main>
      
      {/* Floating Study Buddy */}
      <FloatingStudyBuddy />
    </div>
  );
};

export default Index;
