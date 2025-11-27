import React from 'react';
import { 
  Bot, Sparkles, BarChart3, ShieldCheck, 
  ArrowRight, CheckCircle2, Zap, Key, ExternalLink, Star 
} from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
      
      {/* Navbar */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200">
                  IA
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">ResumeAI <span className="text-slate-400 font-normal">Studio</span></span>
          </div>
          <button 
            onClick={onEnterApp}
            className="text-sm font-semibold text-white bg-slate-900 px-5 py-2.5 rounded-full hover:bg-slate-800 transition-all shadow-md hover:shadow-lg"
          >
            Acessar Plataforma
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-50/50 skew-x-12 translate-x-32 hidden lg:block"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
                
                {/* Text Content */}
                <div className="lg:w-1/2 text-center lg:text-left animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-8 shadow-sm">
                        <Sparkles className="w-3 h-3 text-amber-500" /> Potencializado por Google Gemini 2.0
                    </div>
                    
                    <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]">
                        Seu Currículo, <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                            Aprovado por Robôs.
                        </span>
                    </h1>
                    
                    <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                        Passe pelos filtros ATS com a ajuda de IA avançada. Refatore experiências, alinhe palavras-chave e monitore métricas de sucesso em tempo real.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                        <button 
                            onClick={onEnterApp}
                            className="group relative px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
                        >
                            <span className="flex items-center justify-center">
                                Criar Currículo Grátis
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>
                        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                            <div className="flex -space-x-2">
                                {[1,2,3].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                                        <img src={`https://randomuser.me/api/portraits/men/${30+i}.jpg`} alt="User" />
                                    </div>
                                ))}
                            </div>
                            <span className="ml-2">+10k currículos gerados</span>
                        </div>
                    </div>
                </div>

                {/* Visual Content - Floating Image */}
                <div className="lg:w-1/2 relative animate-fade-in-up delay-200 hidden lg:block">
                    <div className="relative w-full aspect-[4/3] animate-float">
                        {/* Abstract Background Decoration */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl opacity-20 blur-lg rotate-3"></div>
                        
                        {/* Main Image Container */}
                        <div className="relative h-full w-full bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
                            <img 
                                src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=2070" 
                                alt="Professional working on resume" 
                                className="w-full h-full object-cover opacity-90"
                            />
                            
                            {/* Overlay UI Mockup Elements */}
                            <div className="absolute top-8 left-8 right-8 bottom-8 bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/50">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden">
                                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" alt="Avatar" />
                                    </div>
                                    <div className="space-y-2 flex-1">
                                        <div className="h-3 w-32 bg-slate-800 rounded-full"></div>
                                        <div className="h-2 w-20 bg-slate-300 rounded-full"></div>
                                    </div>
                                    <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center">
                                        <Star className="w-3 h-3 mr-1" /> Score 92/100
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="h-2 w-full bg-slate-200 rounded-full"></div>
                                    <div className="h-2 w-5/6 bg-slate-200 rounded-full"></div>
                                    <div className="h-2 w-4/6 bg-slate-200 rounded-full"></div>
                                </div>
                                <div className="mt-6 flex gap-3">
                                    <div className="h-8 w-24 bg-indigo-600 rounded-lg"></div>
                                    <div className="h-8 w-8 bg-slate-200 rounded-lg"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </header>

      {/* Social Proof / Trusted By */}
      <section className="py-10 border-y border-slate-100 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
              <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-6">Tecnologia baseada em</p>
              <div className="flex flex-wrap justify-center items-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                  {/* Logos simulados com texto para não depender de SVGs externos complexos */}
                  <span className="text-xl font-bold text-slate-600 flex items-center"><Bot className="mr-2"/> Gemini 2.0</span>
                  <span className="text-xl font-bold text-slate-600 flex items-center"><Zap className="mr-2"/> Vercel</span>
                  <span className="text-xl font-bold text-slate-600 flex items-center"><ShieldCheck className="mr-2"/> React Secure</span>
                  <span className="text-xl font-bold text-slate-600 flex items-center"><BarChart3 className="mr-2"/> Analytics</span>
              </div>
          </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative Background Image */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-slate-50 rounded-full -translate-x-1/2 -z-10"></div>

        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Ferramentas de Elite para sua Carreira</h2>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto">Não é apenas um editor de texto. É um estrategista de carreira pessoal.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Feature 1 */}
                <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-100 transition-all group duration-300">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                        <Bot className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Refatoração IA (ARM)</h3>
                    <p className="text-slate-600 leading-relaxed mb-6">
                        Transformamos descrições genéricas em bullets poderosos no formato "Ação-Resultado-Métrica", o padrão preferido por recrutadores da Google e Amazon.
                    </p>
                    <div className="h-1 w-12 bg-blue-200 rounded group-hover:w-full transition-all duration-500"></div>
                </div>

                {/* Feature 2 */}
                <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:border-purple-100 hover:shadow-2xl hover:shadow-purple-100 transition-all group duration-300 md:-translate-y-4">
                    <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-8 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                        <ShieldCheck className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Auditoria ATS em Tempo Real</h3>
                    <p className="text-slate-600 leading-relaxed mb-6">
                        Cole a descrição da vaga e nossa IA analisa seu currículo instantaneamente, sugerindo as palavras-chave exatas que faltam para você passar no filtro inicial.
                    </p>
                    <div className="h-1 w-12 bg-purple-200 rounded group-hover:w-full transition-all duration-500"></div>
                </div>

                {/* Feature 3 */}
                <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:border-emerald-100 hover:shadow-2xl hover:shadow-emerald-100 transition-all group duration-300">
                    <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                        <BarChart3 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Dashboard de Performance</h3>
                    <p className="text-slate-600 leading-relaxed mb-6">
                        Visualize dados simulados de suas aplicações. Entenda quais versões do seu currículo têm a maior taxa de conversão para entrevistas.
                    </p>
                    <div className="h-1 w-12 bg-emerald-200 rounded group-hover:w-full transition-all duration-500"></div>
                </div>
            </div>
        </div>
      </section>

      {/* Image Break Section */}
      <section className="relative h-[400px] overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2070" 
            alt="Office workspace" 
            className="absolute inset-0 w-full h-full object-cover attachment-fixed"
          />
          <div className="absolute inset-0 bg-slate-900/70 flex items-center justify-center text-center px-6">
              <div className="max-w-3xl animate-fade-in-up">
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Construa o futuro da sua carreira hoje.</h2>
                  <p className="text-slate-300 text-lg mb-8">Junte-se a profissionais que estão conseguindo 3x mais entrevistas.</p>
                  <button onClick={onEnterApp} className="px-8 py-3 bg-white text-slate-900 rounded-full font-bold hover:bg-indigo-50 transition-colors">
                      Começar Agora
                  </button>
              </div>
          </div>
      </section>

      {/* Guide Section */}
      <section className="py-24 bg-slate-50 overflow-hidden relative">
         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row gap-16 items-start">
                
                {/* How to Use */}
                <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-12 flex items-center text-slate-900">
                        <span className="bg-indigo-600 text-white p-2 rounded-lg mr-4">
                             <Zap className="w-6 h-6" />
                        </span>
                        Como usar a IA no seu CV
                    </h2>
                    
                    <div className="space-y-10 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200">
                        <div className="flex gap-8 relative">
                            <div className="w-8 h-8 rounded-full bg-indigo-600 border-4 border-slate-50 flex items-center justify-center font-bold text-white shrink-0 z-10 text-sm">1</div>
                            <div>
                                <h4 className="font-bold text-xl text-slate-900 mb-2">Refatoração de Experiência</h4>
                                <p className="text-slate-600 leading-relaxed">
                                    No editor, escreva suas tarefas de forma simples. Clique no botão <span className="text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded text-xs">Otimizar com Gemini</span>. 
                                    A IA reescreverá o texto com verbos de ação e foco em resultados.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-8 relative">
                            <div className="w-8 h-8 rounded-full bg-indigo-600 border-4 border-slate-50 flex items-center justify-center font-bold text-white shrink-0 z-10 text-sm">2</div>
                            <div>
                                <h4 className="font-bold text-xl text-slate-900 mb-2">Scanner de Vagas (ATS)</h4>
                                <p className="text-slate-600 leading-relaxed">
                                    Na aba "Habilidades", clique em "Executar Análise ATS". Cole a descrição da vaga desejada. O sistema listará exatamente o que adicionar ao seu currículo.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* API Key Box */}
                <div className="flex-1 w-full">
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-200 transition-colors"></div>
                        
                        <h3 className="text-xl font-bold mb-6 flex items-center text-slate-900">
                            <Key className="w-5 h-5 mr-2 text-indigo-600" />
                            Obtendo sua Chave Gemini (Opcional)
                        </h3>
                        <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                            Para ativar os recursos de inteligência artificial, você precisa de uma chave de API gratuita da Google. O aplicativo funciona normalmente sem ela (modo manual), mas a "mágica" acontece com a chave.
                        </p>

                        <div className="space-y-4 bg-slate-50 p-5 rounded-xl mb-8 border border-slate-100">
                            <div className="flex items-center text-sm text-slate-700">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 shrink-0" />
                                Acesse <strong>aistudio.google.com</strong>
                            </div>
                            <div className="flex items-center text-sm text-slate-700">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 shrink-0" />
                                Faça login com sua conta Google
                            </div>
                            <div className="flex items-center text-sm text-slate-700">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 shrink-0" />
                                Clique em "Get API Key" e crie uma nova chave
                            </div>
                        </div>

                        <a 
                            href="https://aistudio.google.com/app/apikey" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            Gerar Chave no Google AI Studio <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                        <p className="text-xs text-center text-slate-400 mt-4">Sua chave é salva apenas no armazenamento local do seu navegador com segurança.</p>
                    </div>
                </div>
            </div>
         </div>
      </section>

      {/* Footer / Final CTA */}
      <footer className="py-20 bg-white border-t border-slate-100 text-center">
        <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-slate-900 mb-8">Pronto para destacar seu perfil?</h2>
            <button 
                onClick={onEnterApp}
                className="px-12 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-bold text-xl shadow-xl shadow-indigo-200 hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
                Acessar o Editor Agora
            </button>
            <div className="mt-16 flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 mb-4 md:mb-0">
                    <div className="w-6 h-6 bg-slate-200 rounded-md flex items-center justify-center text-slate-500 font-bold text-xs">IA</div>
                    <span>ResumeAI Studio</span>
                </div>
                <div>© 2024 ResumeAI Studio. Powered by Google Gemini.</div>
            </div>
        </div>
      </footer>
    </div>
  );
};