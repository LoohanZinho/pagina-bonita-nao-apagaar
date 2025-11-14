'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from './button';
import { FaWhatsapp } from 'react-icons/fa';

export function CallToActionDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const handleRedirect = () => {
    window.open('https://wa.me/5591981588512', '_blank');
    onOpenChange(false);
  };
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Que tal uma consultoria gratuita?</AlertDialogTitle>
          <AlertDialogDescription>
            Vamos conversar por 15 minutos. Vou entender sua necessidade e
            mostrar como posso ajudar seu projeto a decolar. Sem compromisso.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            onClick={handleRedirect}
            className="w-full bg-green-500 hover:bg-green-600 text-white rounded-full shadow-md hover:shadow-lg transition-all"
          >
            <FaWhatsapp className="mr-2 h-4 w-4" />
            Agendar no WhatsApp
          </Button>
          <AlertDialogAction asChild>
            <Button variant="ghost" onClick={() => onOpenChange(false)}>
              Agora não
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
