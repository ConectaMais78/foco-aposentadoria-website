
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange, onRemove }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Por favor, selecione apenas arquivos de imagem');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error('A imagem deve ter no máximo 5MB');
      return;
    }

    setIsUploading(true);

    try {
      // Converter arquivo para base64 ou usar URL.createObjectURL para preview local
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onChange(result);
        toast.success('Imagem carregada com sucesso!');
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error('Erro ao carregar a imagem');
    } finally {
      setIsUploading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove();
    }
    onChange('');
  };

  return (
    <div className="space-y-3">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      {value ? (
        <div className="relative group">
          <div className="relative rounded-lg overflow-hidden border border-gray-300">
            <img 
              src={value} 
              alt="Preview" 
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="flex space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleClick}
                  className="bg-white/90 hover:bg-white"
                >
                  <Upload className="h-4 w-4 mr-1" />
                  Trocar
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleRemove}
                  className="bg-red-500/90 hover:bg-red-500 text-white border-red-500"
                >
                  <X className="h-4 w-4 mr-1" />
                  Remover
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all
            ${isDragging 
              ? 'border-orange bg-orange/5 scale-105' 
              : 'border-gray-300 hover:border-orange hover:bg-orange/5'
            }
            ${isUploading ? 'pointer-events-none opacity-50' : ''}
          `}
        >
          <div className="flex flex-col items-center space-y-3">
            <div className={`p-3 rounded-full ${isDragging ? 'bg-orange text-white' : 'bg-gray-100 text-gray-500'}`}>
              {isUploading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-500"></div>
              ) : (
                <ImageIcon className="h-6 w-6" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">
                {isUploading ? 'Carregando...' : 'Arraste uma imagem ou clique para selecionar'}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, GIF até 5MB
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
