
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { QrCode } from 'lucide-react';
import QRCode from 'qrcode';

const QRCodeGenerator = () => {
  const [text, setText] = useState('');
  const [qrCodeDataURL, setQrCodeDataURL] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const generateQRCode = async (value: string) => {
    if (!value) return;
    
    try {
      const canvas = canvasRef.current;
      if (canvas) {
        await QRCode.toCanvas(canvas, value, {
          width: 280,
          margin: 1,
          color: {
            dark: '#2b2c34',
            light: '#ffffff'
          }
        });
        
        const dataURL = canvas.toDataURL('image/png');
        setQrCodeDataURL(dataURL);
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast({
        title: "Error",
        description: "Failed to generate QR code. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
  };

  const handleGenerateClick = () => {
    if (!text) {
      toast({
        title: "Empty Input",
        description: "Please enter some text or a URL first.",
        variant: "destructive",
      });
      return;
    }
    generateQRCode(text);
  };

  const downloadQRCode = () => {
    if (!qrCodeDataURL) {
      toast({
        title: "No QR Code",
        description: "Generate a QR code first before downloading.",
        variant: "destructive",
      });
      return;
    }

    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrCodeDataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Success",
      description: "QR code downloaded successfully!",
    });
  };

  useEffect(() => {
    // Generate a welcome QR code when component mounts
    generateQRCode('https://lovable.dev');
  }, []);

  return (
    <Card className="w-full max-w-md shadow-lg animate-fade-in border-qr-primary/20">
      <CardHeader className="bg-qr-light rounded-t-lg border-b border-qr-primary/10">
        <CardTitle className="flex items-center justify-center text-qr-dark">
          <QrCode className="text-qr-primary mr-2" size={24} />
          <span>QR Code Generator</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 pb-2 px-6">
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Enter text or URL"
            value={text}
            onChange={handleTextChange}
            className="border-qr-primary/30 focus:border-qr-primary"
          />
        </div>
        <div className="flex justify-center">
          <Button 
            onClick={handleGenerateClick}
            className="bg-qr-primary hover:bg-qr-secondary transition-colors mb-4 w-full"
          >
            Generate QR Code
          </Button>
        </div>
        <div className="flex justify-center p-4 bg-white rounded-md border border-gray-200 mb-4">
          <canvas ref={canvasRef} className="hidden" />
          {qrCodeDataURL ? (
            <img 
              src={qrCodeDataURL} 
              alt="Generated QR Code" 
              className="w-60 h-60"
            />
          ) : (
            <div className="w-60 h-60 flex items-center justify-center bg-gray-100 rounded-md">
              <p className="text-gray-400">QR code will appear here</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="justify-end pb-6 px-6">
        <Button 
          onClick={downloadQRCode} 
          variant="outline" 
          className="border-qr-primary/30 text-qr-primary hover:bg-qr-light hover:text-qr-secondary transition-colors"
          disabled={!qrCodeDataURL}
        >
          Download QR Code
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QRCodeGenerator;
