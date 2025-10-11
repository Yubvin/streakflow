import { useState, useRef } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Upload, Camera, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface AvatarUploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentAvatar?: string | null;
  userInitials: string;
  onSave: (avatarUrl: string) => void;
}

export function AvatarUploadModal({ 
  open, 
  onOpenChange, 
  currentAvatar, 
  userInitials, 
  onSave 
}: AvatarUploadModalProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentAvatar || null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    setSelectedFile(file);

    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file to upload');
      return;
    }

    setIsUploading(true);

    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you would upload to your storage service here
      // For demo purposes, we'll use the preview URL
      if (previewUrl) {
        onSave(previewUrl);
        toast.success('Profile picture updated successfully!');
        onOpenChange(false);
      }
    } catch (error) {
      toast.error('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setPreviewUrl(currentAvatar || null);
    setSelectedFile(null);
    onOpenChange(false);
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    setSelectedFile(null);
  };

  return (
    <Dialog open={open} onOpenChange={handleCancel}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Change Profile Picture
          </DialogTitle>
          <DialogDescription>
            Upload a new profile picture. Supported formats: PNG, JPG (max 5MB)
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Avatar Preview */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={previewUrl || undefined} />
                <AvatarFallback className="text-xl">{userInitials}</AvatarFallback>
              </Avatar>
              {selectedFile && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                  <Upload className="w-3 h-3 text-white" />
                </div>
              )}
            </div>

            {selectedFile && (
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            )}
          </div>

          {/* Upload Section */}
          <div className="space-y-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1"
                disabled={isUploading}
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose Image
              </Button>

              {previewUrl && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleRemove}
                  className="flex-1"
                  disabled={isUploading}
                >
                  Remove
                </Button>
              )}
            </div>

            {/* File Requirements */}
            <div className="bg-muted/50 p-3 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">Requirements:</p>
                  <ul className="text-xs text-muted-foreground space-y-0.5">
                    <li>• Supported formats: PNG, JPG, JPEG</li>
                    <li>• Maximum file size: 5MB</li>
                    <li>• Recommended: Square images (1:1 ratio)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 space-y-2 space-y-reverse sm:space-y-0">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}