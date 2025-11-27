import React, { useState, useEffect, useMemo } from 'react';
import { ResumeEditor } from './components/ResumeEditor';
import { ResumePreview } from './components/ResumePreview';
import { Dashboard } from './components/Dashboard';
import { LandingPage } from './components/LandingPage';
import { GeminiService } from './services/geminiService';
import { AppSection, ResumeData } from './types';
import { Layout, FileText, Settings, BarChart3, Key, X, Check, Loader2, Download, Upload, Home, ExternalLink, Coffee } from 'lucide-react';
import { DonationModal } from './components/DonationModal';

// Default initial state
const INITIAL_RESUME: ResumeData = {
  id: '1',
  name: '',
  versionName: 'Vaga Padrão',
  title: '',
  email: '',
  phone: '',
  location: '',
  address: '',
  city: '',
  state: '',
  summary: '',
  experience: [],
  education: [],
  courses: [],
  skills: '',
  photoUrl: ''
};

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.EDITOR);
  const [resume, setResume] = useState<ResumeData>(INITIAL_RESUME);
  const [userApiKey, setUserApiKey] = useState<string>('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [showDownloadTooltip, setShowDownloadTooltip] = useState(true);
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');
  
  // ATS Modal State
  const [isAtsModalOpen, setIsAtsModalOpen] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [atsAnalysis, setAtsAnalysis] = useState<string[] | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Initialize service. 
  // We prioritize the user key if set, otherwise fallback to env (if available for demo purposes)
  const geminiService = useMemo(() => {
    return new GeminiService(userApiKey || process.env.API_KEY || '');
  }, [userApiKey]);

  useEffect(() => {
    // Load key from storage on mount
    const storedKey = localStorage.getItem('gemini_api_key');
    if (storedKey) setUserApiKey(storedKey);
    
    // Load resume from storage
    const storedResume = localStorage.getItem('current_resume');
    if (storedResume) {
        try {
            setResume(JSON.parse(storedResume));
        } catch(e) {}
    }
  }, []);

  useEffect(() => {
    // Save resume changes
    localStorage.setItem('current_resume', JSON.stringify(resume));
  }, [resume]);

  const handleSaveKey = (key: string) => {
    setUserApiKey(key);
    localStorage.setItem('gemini_api_key', key);
  };

  const handleDownloadPdf = () => {
    window.print();
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(resume, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `resume-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsedData = JSON.parse(content);
        // Basic validation: check if it has required fields or structure
        if (parsedData && typeof parsedData === 'object') {
            setResume(parsedData);
            alert('Dados importados com sucesso!');
        } else {
            alert('Arquivo inválido.');
        }
      } catch (error) {
        alert('Erro ao ler o arquivo. Certifique-se de que é um JSON válido.');
      }
    };
    reader.readAsText(file);
    // Reset input
    event.target.value = '';
  };

  const runAtsScan = async () => {
    if (!jobDescription.trim()) return;
    setIsAnalyzing(true);
    setAtsAnalysis(null);
    try {
        const resumeText = JSON.stringify(resume);
        const result = await geminiService.analyzeATS(resumeText, jobDescription);
        setAtsAnalysis(result.suggestions);
    } catch (e) {
        setAtsAnalysis(['Erro na análise.']);
    } finally {
        setIsAnalyzing(false);
    }
  };

  // Render Landing Page if active
  if (showLanding) {
    return <LandingPage onEnterApp={() => setShowLanding(false)} />;
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-slate-50 text-slate-900 font-sans print:h-auto print:overflow-visible print:block">
      
      {/* Top Navbar */}
      <nav className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 z-10 shrink-0 print:hidden">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setShowLanding(true)}>
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
                IA
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-800">ResumeAI <span className="text-slate-400 font-normal hidden sm:inline">Studio</span></span>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-lg">
            <button 
                onClick={() => setActiveSection(AppSection.EDITOR)}
                className={`flex items-center px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeSection === AppSection.EDITOR ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
                <FileText className="w-4 h-4 mr-2" /> Editor
            </button>
            <button 
                onClick={() => setActiveSection(AppSection.DASHBOARD)}
                className={`flex items-center px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeSection === AppSection.DASHBOARD ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
                <BarChart3 className="w-4 h-4 mr-2" /> Painel
            </button>
        </div>

        <div className="flex items-center space-x-3">
            {activeSection === AppSection.EDITOR && (
                <div className="relative">
                    <button 
                        onClick={() => {
                            setIsDonationModalOpen(true);
                            setShowDownloadTooltip(false);
                        }}
                        className="flex items-center px-3 md:px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg font-medium"
                    >
                        <Coffee className="w-4 h-4 md:mr-2" />
                        <span className="hidden md:inline">Ajude no Cafezinho ☕</span>
                    </button>
                    
                    {/* PDF Download Tooltip */}
                    {showDownloadTooltip && (
                        <div className="absolute top-full right-0 mt-3 w-48 bg-slate-900 text-white text-xs rounded-lg p-3 shadow-xl z-50 animate-bounce-subtle">
                            <div className="absolute -top-1 right-4 w-2 h-2 bg-slate-900 transform rotate-45"></div>
                            <div className="flex justify-between items-start">
                                <p className="font-medium leading-tight">
                                    Baixe seu PDF aqui! 📄
                                </p>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowDownloadTooltip(false);
                                    }}
                                    className="text-slate-400 hover:text-white ml-2"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
            <button 
                onClick={() => setIsSettingsOpen(true)}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    geminiService.isConfigured() 
                        ? 'text-slate-600 hover:bg-slate-100 border border-slate-200' 
                        : 'text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 animate-pulse'
                }`}
                title="Configurar API Key"
            >
                <Key className="w-4 h-4 mr-2" />
                {geminiService.isConfigured() ? 'API Key' : 'Configurar IA'}
            </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative print:overflow-visible print:h-auto print:block">
        {activeSection === AppSection.EDITOR && (
             <div className="h-full flex flex-col relative print:h-auto print:block print:overflow-visible">
                {/* Mobile Tab Switcher */}
                <div className="md:hidden flex mx-4 mt-4 mb-2 bg-slate-200 p-1 rounded-lg shrink-0 print:hidden">
                    <button
                        onClick={() => setMobileTab('editor')}
                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${mobileTab === 'editor' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'}`}
                    >
                        Editor
                    </button>
                    <button
                        onClick={() => setMobileTab('preview')}
                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${mobileTab === 'preview' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'}`}
                    >
                        Visualizar
                    </button>
                </div>

                <div className="flex-1 flex flex-col md:flex-row overflow-hidden print:h-auto print:block print:overflow-visible">
                    <div className={`${mobileTab === 'editor' ? 'block' : 'hidden md:block'} w-full md:w-1/2 lg:w-5/12 p-4 h-full overflow-hidden print:hidden`}>
                        <ResumeEditor 
                            resume={resume} 
                            setResume={setResume} 
                            geminiService={geminiService}
                            onRunAtsScan={() => setIsAtsModalOpen(true)}
                        />
                    </div>
                    {/* 
                        Print Styles Logic:
                        - Removed print:fixed to allow natural flow
                        - Added print:static to respect document flow
                        - print:w-full print:h-auto: Full dimensions
                    */}
                    <div className={`${mobileTab === 'preview' ? 'block' : 'hidden md:block'} w-full md:w-1/2 lg:w-7/12 h-full bg-slate-200/50 print:block print:static print:w-full print:h-auto print:overflow-visible print:bg-white`}>
                        <ResumePreview resume={resume} />
                    </div>
                </div>
             </div>
        )}
        
        {activeSection === AppSection.DASHBOARD && (
            <div className="h-full overflow-y-auto print:hidden">
                <Dashboard resume={resume} />
            </div>
        )}
      </main>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 print:hidden">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 transform transition-all">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-800 flex items-center">
                        <Key className="w-5 h-5 mr-2 text-indigo-500" /> Configurar Gemini API
                    </h3>
                    <button onClick={() => setIsSettingsOpen(false)} className="text-slate-400 hover:text-slate-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <p className="text-sm text-slate-600 mb-4">
                    Para utilizar os recursos de inteligência artificial (Refatoração ARM e Análise ATS), você precisa fornecer sua chave de API da Google Gemini.
                </p>

                <div className="mb-6">
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">API Key</label>
                    <input 
                        type="password" 
                        value={userApiKey}
                        onChange={(e) => handleSaveKey(e.target.value)}
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-sm bg-white text-slate-900"
                        placeholder="Cole sua chave aqui..."
                    />
                    <div className="flex items-center mt-2">
                        <div className={`w-2 h-2 rounded-full mr-2 ${geminiService.isConfigured() ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="text-xs text-slate-500">
                            Status: {geminiService.isConfigured() ? 'Ativo' : 'Inativo (Chave Ausente)'}
                        </span>
                    </div>
                </div>
                
                {/* Data Management */}
                <div className="mb-6 pt-6 border-t border-slate-100">
                    <h4 className="text-xs font-semibold text-slate-500 uppercase mb-3">Gerenciamento de Dados</h4>
                    <div className="flex gap-3">
                        <button 
                            onClick={handleExportData}
                            className="flex-1 flex items-center justify-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium border border-indigo-100"
                        >
                            <Download className="w-4 h-4 mr-2" /> Backup
                        </button>
                        <label className="flex-1 flex items-center justify-center px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium border border-slate-200 cursor-pointer">
                            <Upload className="w-4 h-4 mr-2" /> Restaurar
                            <input 
                                type="file" 
                                accept=".json"
                                onChange={handleImportData}
                                className="hidden"
                            />
                        </label>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                        Salve um backup dos seus dados para não perder seu progresso.
                    </p>
                </div>

                <div className="mt-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <p className="text-xs text-slate-500 mb-2">Não tem uma chave?</p>
                    <a 
                        href="https://aistudio.google.com/app/apikey" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-indigo-600 font-semibold hover:underline flex items-center"
                    >
                        Gerar chave no Google AI Studio <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                </div>

                <div className="flex justify-end mt-6">
                    <button 
                        onClick={() => setIsSettingsOpen(false)}
                        className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 text-sm font-medium"
                    >
                        Concluído
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* ATS Analysis Modal */}
      {isAtsModalOpen && (
           <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 print:hidden">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col transform transition-all">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="text-xl font-bold text-slate-800">Otimização ATS</h3>
                        <button onClick={() => setIsAtsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="p-6 overflow-y-auto flex-1">
                        {!atsAnalysis ? (
                            <div className="space-y-4">
                                <p className="text-sm text-slate-600">Cole a descrição da vaga abaixo para comparar com seu currículo atual.</p>
                                <textarea 
                                    className="w-full h-48 p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm leading-relaxed bg-white text-slate-900"
                                    placeholder="Cole a descrição da vaga aqui..."
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                ></textarea>
                                <div className="flex justify-end">
                                    <button 
                                        onClick={runAtsScan}
                                        disabled={isAnalyzing || !jobDescription.trim()}
                                        className="flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                                    >
                                        {isAnalyzing ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analisando...
                                            </>
                                        ) : (
                                            <>Analisar Compatibilidade</>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                                    <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                                        <Check className="w-5 h-5 mr-2" /> Análise Concluída
                                    </h4>
                                    <p className="text-sm text-green-700">
                                        A IA Gemini analisou seu currículo contra a vaga e sugere as seguintes adições para aumentar seu score ATS:
                                    </p>
                                </div>
                                
                                <ul className="space-y-3">
                                    {atsAnalysis.map((suggestion, idx) => (
                                        <li key={idx} className="flex items-start bg-slate-50 p-3 rounded-md">
                                            <span className="bg-indigo-100 text-indigo-700 font-bold text-xs px-2 py-0.5 rounded-full mr-3 mt-0.5">#{idx + 1}</span>
                                            <span className="text-slate-700 text-sm">{suggestion}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex justify-end pt-4">
                                     <button 
                                        onClick={() => setAtsAnalysis(null)}
                                        className="text-sm text-slate-500 hover:text-indigo-600 underline mr-4"
                                    >
                                        Nova Análise
                                    </button>
                                    <button 
                                        onClick={() => setIsAtsModalOpen(false)}
                                        className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm"
                                    >
                                        Fechar e Editar
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
           </div>
      )}
      {/* Donation Modal */}
      <DonationModal 
        isOpen={isDonationModalOpen} 
        onClose={() => setIsDonationModalOpen(false)} 
        onConfirmDownload={handleDownloadPdf} 
      />
    </div>
  );
}

export default App;