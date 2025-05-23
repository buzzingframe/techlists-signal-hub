
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, Image, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadZoneProps {
  onFilesSelected: (files: File[]) => void;
  acceptedTypes?: string[];
  maxFiles?: number;
  maxSize?: number; // in MB
  currentFiles?: File[];
  className?: string;
}

export function FileUploadZone({
  onFilesSelected,
  acceptedTypes = ["image/*"],
  maxFiles = 5,
  maxSize = 10,
  currentFiles = [],
  className
}: FileUploadZoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter(file => {
      const isValidType = acceptedTypes.some(type => 
        file.type.match(type.replace("*", ".*"))
      );
      const isValidSize = file.size <= maxSize * 1024 * 1024;
      return isValidType && isValidSize;
    });

    const totalFiles = currentFiles.length + validFiles.length;
    if (totalFiles <= maxFiles) {
      onFilesSelected([...currentFiles, ...validFiles]);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = currentFiles.filter((_, i) => i !== index);
    onFilesSelected(newFiles);
  };

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  return (
    <div className={cn("space-y-4", className)}>
      <Card
        className={cn(
          "border-2 border-dashed transition-colors",
          dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25",
          "hover:border-primary/50 cursor-pointer"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          <Upload className="h-10 w-10 text-muted-foreground mb-4" />
          <p className="text-lg font-medium mb-2">
            Drop files here or click to upload
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            {acceptedTypes.join(", ")} up to {maxSize}MB each
          </p>
          <Button variant="outline" type="button">
            Choose Files
          </Button>
        </CardContent>
      </Card>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept={acceptedTypes.join(",")}
        onChange={handleChange}
        className="hidden"
      />

      {currentFiles.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {currentFiles.map((file, index) => (
            <Card key={index} className="relative">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  {file.type.startsWith("image/") ? (
                    <Image className="h-8 w-8 text-blue-500" />
                  ) : (
                    <FileText className="h-8 w-8 text-gray-500" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(index);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
