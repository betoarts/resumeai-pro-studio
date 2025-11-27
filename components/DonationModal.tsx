import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Copy, Download, Coffee, Check } from 'lucide-react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmDownload: () => void;
}

const PIX_CODE = "00020126810014br.gov.bcb.pix01362989a9f4-54ba-4f35-87b5-700d326541020219Ajude no Cafezinho 27600016BR.COM.PAGSEGURO0136B9881BCF-4A89-4188-8A7B-59E81BD21DA6520489995303986540510.005802BR5925HUMBERTO DA SILVA MOURA N6007Gramado62290525PAGS0000010002511270919896304C7EE";

export const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose, onConfirmDownload }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(PIX_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 print:hidden animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white text-center relative">
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/20 rounded-full p-1 transition-colors"
            >
                <X className="w-5 h-5" />
            </button>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
                <Coffee className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-1">Ajude no Cafezinho! ☕</h3>
            <p className="text-indigo-100 text-sm">Sua contribuição mantém o projeto vivo.</p>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col items-center">
            <div className="bg-white p-4 rounded-xl shadow-lg border border-slate-100 mb-6">
                <QRCodeSVG value={PIX_CODE} size={180} level="M" />
            </div>

            <p className="text-slate-600 text-center text-sm mb-6">
                Escaneie o QR Code acima com seu app de banco ou copie o código Pix abaixo:
            </p>

            <button 
                onClick={handleCopy}
                className="w-full flex items-center justify-center px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-medium transition-colors mb-6 group border border-slate-200"
            >
                {copied ? <Check className="w-4 h-4 mr-2 text-green-600" /> : <Copy className="w-4 h-4 mr-2 text-slate-400 group-hover:text-slate-600" />}
                {copied ? <span className="text-green-600">Código Copiado!</span> : "Copiar Código Pix"}
            </button>

            <div className="w-full border-t border-slate-100 pt-6">
                <button 
                    onClick={() => {
                        onConfirmDownload();
                        onClose();
                    }}
                    className="w-full flex items-center justify-center px-6 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                    <Download className="w-5 h-5 mr-2" />
                    Baixar PDF do Currículo
                </button>
                <p className="text-center text-xs text-slate-400 mt-3">
                    O download é liberado independente da doação.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};
