import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GitBranch, Plus, RotateCcw, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MindMapNode {
  id: number;
  text: string;
  isMain: boolean;
  parentId?: number;
}

export const MindMapMethod = () => {
  const [centralTopic, setCentralTopic] = useState("");
  const [nodes, setNodes] = useState<MindMapNode[]>([]);
  const [newNodeText, setNewNodeText] = useState("");
  const [selectedParentId, setSelectedParentId] = useState<number | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const { toast } = useToast();

  const startMindMap = () => {
    if (!centralTopic.trim()) {
      toast({
        title: "Digite o tópico central",
        description: "O mapa mental precisa de um tema principal.",
        variant: "destructive"
      });
      return;
    }

    const mainNode: MindMapNode = {
      id: Date.now(),
      text: centralTopic.trim(),
      isMain: true
    };

    setNodes([mainNode]);
    setIsStarted(true);
    setSelectedParentId(mainNode.id);
    
    toast({
      title: "Mapa Mental iniciado! 🗺️",
      description: "Agora adicione subtópicos relacionados."
    });
  };

  const addNode = () => {
    if (!newNodeText.trim()) return;

    const newNode: MindMapNode = {
      id: Date.now(),
      text: newNodeText.trim(),
      isMain: false,
      parentId: selectedParentId || undefined
    };

    setNodes([...nodes, newNode]);
    setNewNodeText("");
    
    toast({
      title: "Nó adicionado! 🌱",
      description: "Continue expandindo seu mapa mental."
    });
  };

  const removeNode = (id: number) => {
    // Remove o nó e todos os seus filhos
    const nodeToRemove = nodes.find(n => n.id === id);
    if (nodeToRemove?.isMain) return; // Não permite remover o nó principal

    const removeNodeAndChildren = (nodeId: number): number[] => {
      const children = nodes.filter(n => n.parentId === nodeId);
      let toRemove = [nodeId];
      children.forEach(child => {
        toRemove = [...toRemove, ...removeNodeAndChildren(child.id)];
      });
      return toRemove;
    };

    const idsToRemove = removeNodeAndChildren(id);
    setNodes(nodes.filter(n => !idsToRemove.includes(n.id)));
  };

  const reset = () => {
    setCentralTopic("");
    setNodes([]);
    setNewNodeText("");
    setSelectedParentId(null);
    setIsStarted(false);
  };

  const getNodesByParent = (parentId?: number) => {
    return nodes.filter(n => n.parentId === parentId);
  };

  const renderNode = (node: MindMapNode, level: number = 0) => {
    const children = getNodesByParent(node.id);
    const isSelected = selectedParentId === node.id;

    return (
      <div key={node.id} className={`ml-${level * 4}`}>
        <div 
          className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition-colors ${
            isSelected ? 'bg-white/30' : 'bg-white/10 hover:bg-white/20'
          } ${node.isMain ? 'border border-white/40' : ''}`}
          onClick={() => setSelectedParentId(node.id)}
        >
          <span className={`${node.isMain ? 'font-bold text-lg' : 'text-sm'} flex-1`}>
            {node.text}
          </span>
          {!node.isMain && (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                removeNode(node.id);
              }}
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-white/60 hover:text-white"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          )}
        </div>
        <div className="ml-4">
          {children.map(child => renderNode(child, level + 1))}
        </div>
      </div>
    );
  };

  return (
    <Card className="shadow-widget border-0 bg-gradient-study text-white">
      <CardHeader className="text-center">
        <GitBranch className="w-8 h-8 mx-auto mb-2 animate-pulse-soft" />
        <CardTitle className="text-lg">Mapa Mental</CardTitle>
        <p className="text-white/80 text-sm">Organize ideias visualmente</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isStarted ? (
          <>
            <Input
              placeholder="Tópico central (ex: Sistema Nervoso)"
              value={centralTopic}
              onChange={(e) => setCentralTopic(e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
            />
            <Button
              onClick={startMindMap}
              variant="secondary"
              size="sm"
              className="w-full bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              Criar Mapa Mental
            </Button>
          </>
        ) : (
          <>
            <div className="max-h-40 overflow-y-auto space-y-1">
              {nodes.filter(n => n.isMain).map(node => renderNode(node))}
            </div>

            <div className="border-t border-white/20 pt-3">
              <div className="text-xs text-white/60 mb-2">
                {selectedParentId ? `Adicionando a: ${nodes.find(n => n.id === selectedParentId)?.text}` : 'Selecione um nó'}
              </div>
              <div className="flex space-x-2">
                <Input
                  placeholder="Novo subtópico..."
                  value={newNodeText}
                  onChange={(e) => setNewNodeText(e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60 text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && addNode()}
                />
                <Button
                  onClick={addNode}
                  variant="secondary"
                  size="sm"
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Button
              onClick={reset}
              variant="secondary"
              size="sm"
              className="w-full bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Novo Mapa
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};