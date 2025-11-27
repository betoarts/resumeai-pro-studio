import React, { useMemo, useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { DashboardMetric, ResumeData } from '../types';
import { Filter, TrendingUp, Users, Mail, CheckCircle, BrainCircuit } from 'lucide-react';

// Mock Data to simulate the Google Sheets source with diverse Brazilian market sectors
const MOCK_DATA: DashboardMetric[] = [
  // Tecnologia
  { id: '1', versionName: 'Versão Tech Lead', dateCreated: '2023-10-01', sector: 'Tecnologia e TI', appliedCount: 10, emailResponseCount: 5, interviewCount: 3, openRate: 0.3, atsScore: 75 },
  { id: '2', versionName: 'Versão Dev Frontend', dateCreated: '2023-10-05', sector: 'Tecnologia e TI', appliedCount: 15, emailResponseCount: 8, interviewCount: 6, openRate: 0.4, atsScore: 82 },
  
  // Gestão
  { id: '3', versionName: 'Versão Gerente de Projetos', dateCreated: '2023-10-10', sector: 'Gestão e Projetos', appliedCount: 8, emailResponseCount: 2, interviewCount: 1, openRate: 0.125, atsScore: 65 },
  
  // Vendas e Varejo
  { id: '4', versionName: 'Vendedor Responsável (Shopping)', dateCreated: '2023-10-12', sector: 'Vendas e Varejo', appliedCount: 25, emailResponseCount: 10, interviewCount: 8, openRate: 0.32, atsScore: 88 },
  { id: '5', versionName: 'Executivo de Contas Sr', dateCreated: '2023-10-14', sector: 'Vendas e Varejo', appliedCount: 12, emailResponseCount: 4, interviewCount: 3, openRate: 0.25, atsScore: 78 },
  { id: '6', versionName: 'Representante Comercial', dateCreated: '2023-10-18', sector: 'Vendas e Varejo', appliedCount: 30, emailResponseCount: 15, interviewCount: 5, openRate: 0.16, atsScore: 91 },

  // Saúde e Farmácia
  { id: '7', versionName: 'Farmacêutico Responsável', dateCreated: '2023-10-20', sector: 'Saúde e Farmácia', appliedCount: 8, emailResponseCount: 6, interviewCount: 5, openRate: 0.62, atsScore: 94 },
  { id: '8', versionName: 'Técnico de Enfermagem UTI', dateCreated: '2023-10-22', sector: 'Saúde e Farmácia', appliedCount: 18, emailResponseCount: 12, interviewCount: 9, openRate: 0.5, atsScore: 89 },
  { id: '9', versionName: 'Atendente de Farmácia', dateCreated: '2023-10-23', sector: 'Saúde e Farmácia', appliedCount: 40, emailResponseCount: 10, interviewCount: 4, openRate: 0.1, atsScore: 72 },

  // Administrativo e Financeiro
  { id: '10', versionName: 'Auxiliar Administrativo', dateCreated: '2023-10-25', sector: 'Administração', appliedCount: 50, emailResponseCount: 5, interviewCount: 2, openRate: 0.04, atsScore: 60 },
  { id: '11', versionName: 'Analista Financeiro Jr', dateCreated: '2023-10-26', sector: 'Administração', appliedCount: 20, emailResponseCount: 8, interviewCount: 4, openRate: 0.2, atsScore: 85 },

  // Técnico e Operacional
  { id: '12', versionName: 'Técnico em Refrigeração', dateCreated: '2023-10-28', sector: 'Técnico e Manutenção', appliedCount: 5, emailResponseCount: 4, interviewCount: 4, openRate: 0.8, atsScore: 70 },
  { id: '13', versionName: 'Eletricista Predial', dateCreated: '2023-10-29', sector: 'Técnico e Manutenção', appliedCount: 10, emailResponseCount: 7, interviewCount: 5, openRate: 0.5, atsScore: 75 },

  // Logística
  { id: '14', versionName: 'Analista de Logística', dateCreated: '2023-11-01', sector: 'Logística e Supply', appliedCount: 15, emailResponseCount: 5, interviewCount: 3, openRate: 0.2, atsScore: 81 },
  { id: '15', versionName: 'Auxiliar de Almoxarifado', dateCreated: '2023-11-02', sector: 'Logística e Supply', appliedCount: 22, emailResponseCount: 6, interviewCount: 2, openRate: 0.09, atsScore: 68 },

  // Educação
  { id: '16', versionName: 'Professor de Inglês', dateCreated: '2023-11-05', sector: 'Educação', appliedCount: 12, emailResponseCount: 8, interviewCount: 6, openRate: 0.5, atsScore: 92 },
];

interface DashboardProps {
  resume: ResumeData;
}

export const Dashboard: React.FC<DashboardProps> = ({ resume }) => {
  const [sectorFilter, setSectorFilter] = useState<string>('Todos');

  const filteredData = useMemo(() => {
    if (sectorFilter === 'Todos') return MOCK_DATA;
    return MOCK_DATA.filter(d => d.sector === sectorFilter);
  }, [sectorFilter]);

  // Calculations for KPIs
  const totalResumes = filteredData.length;
  const avgOpenRate = filteredData.reduce((acc, curr) => acc + curr.openRate, 0) / (totalResumes || 1);
  const avgAtsScore = filteredData.reduce((acc, curr) => acc + curr.atsScore, 0) / (totalResumes || 1);

  const sectors = ['Todos', ...Array.from(new Set(MOCK_DATA.map(d => d.sector))).sort()];

  // Generate Skills Data based on current resume
  const skillsData = useMemo(() => {
    const skills = resume.skills.split(',').map(s => s.trim()).filter(s => s.length > 0);
    
    if (skills.length === 0) return [];

    // Simulate ATS scoring for skills (deterministic based on string to avoid jitter)
    return skills.slice(0, 8).map(skill => {
        let hash = 0;
        for (let i = 0; i < skill.length; i++) {
            hash = skill.charCodeAt(i) + ((hash << 5) - hash);
        }
        const score = 65 + (Math.abs(hash) % 30); // Random score between 65 and 95
        return { name: skill, score };
    }).sort((a, b) => b.score - a.score);
  }, [resume.skills]);

  return (
    <div className="p-6 bg-slate-100 min-h-screen space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
            <h1 className="text-2xl font-bold text-slate-900">Painel de Desempenho</h1>
            <p className="text-slate-600">Analytics integrado com dados simulados do Looker Studio</p>
        </div>
        
        <div className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-sm border border-slate-200 mt-4 md:mt-0">
          <Filter className="w-4 h-4 text-slate-500" />
          <select 
            className="bg-transparent text-sm text-slate-700 focus:outline-none font-medium min-w-[150px]"
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
          >
            {sectors.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center space-x-4">
            <div className="p-3 bg-blue-50 text-blue-700 rounded-full">
                <Users className="w-6 h-6" />
            </div>
            <div>
                <p className="text-sm font-medium text-slate-500">Versões Criadas</p>
                <p className="text-2xl font-bold text-slate-900">{totalResumes}</p>
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center space-x-4">
            <div className="p-3 bg-emerald-50 text-emerald-700 rounded-full">
                <TrendingUp className="w-6 h-6" />
            </div>
            <div>
                <p className="text-sm font-medium text-slate-500">Taxa de Entrevista</p>
                <p className="text-2xl font-bold text-slate-900">{(avgOpenRate * 100).toFixed(1)}%</p>
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center space-x-4">
            <div className="p-3 bg-violet-50 text-violet-700 rounded-full">
                <CheckCircle className="w-6 h-6" />
            </div>
            <div>
                <p className="text-sm font-medium text-slate-500">Média Pontuação ATS</p>
                <p className="text-2xl font-bold text-slate-900">{avgAtsScore.toFixed(0)}</p>
            </div>
        </div>
         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center space-x-4">
            <div className="p-3 bg-amber-50 text-amber-700 rounded-full">
                <Mail className="w-6 h-6" />
            </div>
            <div>
                <p className="text-sm font-medium text-slate-500">Retorno por E-mail</p>
                <p className="text-2xl font-bold text-slate-900">
                    {filteredData.reduce((acc, curr) => acc + curr.emailResponseCount, 0)}
                </p>
            </div>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Evolução: Taxa de Resposta vs Pontuação ATS</h3>
            <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={filteredData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis 
                            dataKey="dateCreated" 
                            tick={{fontSize: 12, fill: '#64748b'}} 
                            tickFormatter={(value) => new Date(value).toLocaleDateString()} 
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis 
                            yAxisId="left" 
                            orientation="left" 
                            stroke="#059669" 
                            tick={{fontSize: 12, fill: '#059669'}} 
                            unit="%" 
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis 
                            yAxisId="right" 
                            orientation="right" 
                            stroke="#4f46e5" 
                            tick={{fontSize: 12, fill: '#4f46e5'}} 
                            domain={[0, 100]} 
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                            itemStyle={{ color: '#1e293b' }}
                        />
                        <Legend />
                        <Line yAxisId="left" type="monotone" dataKey="openRate" name="Taxa Conversão" stroke="#059669" strokeWidth={3} dot={{r: 4, fill: '#059669'}} activeDot={{r: 6}} />
                        <Line yAxisId="right" type="monotone" dataKey="atsScore" name="Score ATS" stroke="#4f46e5" strokeWidth={3} dot={{r: 4, fill: '#4f46e5'}} activeDot={{r: 6}} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-800">Top Competências (Análise Atual)</h3>
                <div className="flex items-center text-xs text-violet-700 bg-violet-50 px-2 py-1 rounded-full font-medium">
                    <BrainCircuit className="w-3 h-3 mr-1" />
                    <span>IA ATS Simulator</span>
                </div>
            </div>
             <div className="h-72">
                {skillsData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={skillsData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                            <XAxis type="number" domain={[0, 100]} hide />
                            <YAxis type="category" dataKey="name" width={100} tick={{fontSize: 11, fill: '#475569', fontWeight: 500}} axisLine={false} tickLine={false} />
                            <Tooltip 
                                cursor={{fill: '#f8fafc'}}
                                contentStyle={{borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} 
                            />
                            <Bar dataKey="score" name="Relevância Mercado" fill="#7c3aed" radius={[0, 4, 4, 0]} barSize={24} />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-lg">
                        <BrainCircuit className="w-8 h-8 mb-2 opacity-50" />
                        <p>Adicione habilidades no editor para visualizar a análise de impacto.</p>
                    </div>
                )}
            </div>
        </div>
      </div>

      {/* Detail Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-800">Detalhes das Versões Geradas</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-xs tracking-wider">
                    <tr>
                        <th className="px-6 py-4 border-b border-slate-200">Versão</th>
                        <th className="px-6 py-4 border-b border-slate-200">Setor</th>
                        <th className="px-6 py-4 border-b border-slate-200 text-center">Vagas Aplicadas</th>
                        <th className="px-6 py-4 border-b border-slate-200 text-center">Taxa Conversão</th>
                        <th className="px-6 py-4 border-b border-slate-200 text-center">Score ATS</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filteredData.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 font-semibold text-slate-900">{item.versionName}</td>
                            <td className="px-6 py-4 text-slate-700">{item.sector}</td>
                            <td className="px-6 py-4 text-center text-slate-700">{item.appliedCount}</td>
                            <td className="px-6 py-4 text-center">
                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                                    item.openRate > avgOpenRate ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                                }`}>
                                    {(item.openRate * 100).toFixed(1)}%
                                </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                                <div className="flex items-center justify-center">
                                    <span className={`w-2.5 h-2.5 rounded-full mr-2 ${item.atsScore >= 80 ? 'bg-emerald-500' : item.atsScore >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}></span>
                                    <span className="font-medium text-slate-900">{item.atsScore}</span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
      </div>
    </div>
  );
};