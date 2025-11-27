
import React, { useState } from "react";
import { Experience, Education, ResumeData } from "../types";
import {
  Plus,
  Trash2,
  Sparkles,
  Wand2,
  GraduationCap,
  Upload,
  X,
  User,
  Briefcase,
  BookOpen,
} from "lucide-react";
import { GeminiService } from "../services/geminiService";

interface ResumeEditorProps {
  resume: ResumeData;
  setResume: React.Dispatch<React.SetStateAction<ResumeData>>;
  geminiService: GeminiService;
  onRunAtsScan: () => void;
}

export const ResumeEditor: React.FC<ResumeEditorProps> = ({
  resume,
  setResume,
  geminiService,
  onRunAtsScan,
}) => {
  const [activeTab, setActiveTab] = useState<
    "personal" | "experience" | "education" | "courses" | "skills"
  >("experience");
  const [loadingRefactor, setLoadingRefactor] = useState<string | null>(null);

  const updateField = (field: keyof ResumeData, value: any) => {
    setResume((prev) => ({ ...prev, [field]: value }));
  };

  const handleExperienceChange = (
    id: string,
    field: keyof Experience,
    value: string
  ) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      role: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    setResume((prev) => ({
      ...prev,
      experience: [newExp, ...prev.experience],
    }));
  };

  const removeExperience = (id: string) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.filter((e) => e.id !== id),
    }));
  };

  const handleEducationChange = (
    id: string,
    field: keyof Education,
    value: string
  ) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      degree: "",
      institution: "",
      year: "",
    };
    setResume((prev) => ({ ...prev, education: [newEdu, ...prev.education] }));
  };

  const removeEducation = (id: string) => {
    setResume(prev => ({ ...prev, education: prev.education.filter(e => e.id !== id) }));
  };

  const handleCourseChange = (id: string, field: 'name' | 'institution' | 'year', value: string) => {
    setResume(prev => ({
      ...prev,
      courses: prev.courses.map(course => course.id === id ? { ...course, [field]: value } : course)
    }));
  };

  const addCourse = () => {
    const newCourse = {
      id: Date.now().toString(),
      name: '',
      institution: '',
      year: ''
    };
    setResume(prev => ({ ...prev, courses: [newCourse, ...prev.courses] }));
  };

  const removeCourse = (id: string) => {
    setResume(prev => ({ ...prev, courses: prev.courses.filter(c => c.id !== id) }));
  };

  const handleRefactor = async (id: string, text: string) => {
    if (!text.trim()) return;
    if (!geminiService.isConfigured()) {
      alert("Por favor, configure sua chave API da Gemini nas configurações.");
      return;
    }

    setLoadingRefactor(id);
    try {
      const optimized = await geminiService.refactorExperience(text);
      handleExperienceChange(id, "description", optimized);
    } catch (e) {
      alert("Falha ao refatorar. Verifique o console.");
    } finally {
      setLoadingRefactor(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 h-full flex flex-col">
      {/* Tabs */}
      {/* Tabs */}
      <div className="px-4 md:px-6 pt-4 md:pt-6 pb-2">
        <div className="flex p-1 bg-slate-100/80 rounded-xl overflow-x-auto no-scrollbar gap-1">
          <button
            onClick={() => setActiveTab("personal")}
            className={`flex-1 min-w-fit px-4 flex items-center justify-center py-2.5 text-sm md:text-base font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
              activeTab === "personal"
                ? "bg-white text-indigo-600 shadow-sm ring-1 ring-black/5"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
            }`}
          >
            <User
              className={`w-4 h-4 md:w-5 md:h-5 mr-2 ${
                activeTab === "personal" ? "text-indigo-500" : "text-slate-400"
              }`}
            />
            Pessoal
          </button>
          <button
            onClick={() => setActiveTab("experience")}
            className={`flex-1 min-w-fit px-4 flex items-center justify-center py-2.5 text-sm md:text-base font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
              activeTab === "experience"
                ? "bg-white text-indigo-600 shadow-sm ring-1 ring-black/5"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
            }`}
          >
            <Briefcase
              className={`w-4 h-4 md:w-5 md:h-5 mr-2 ${
                activeTab === "experience"
                  ? "text-indigo-500"
                  : "text-slate-400"
              }`}
            />
            Experiência
          </button>
          <button
            onClick={() => setActiveTab("education")}
            className={`flex-1 min-w-fit px-4 flex items-center justify-center py-2.5 text-sm md:text-base font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
              activeTab === "education"
                ? "bg-white text-indigo-600 shadow-sm ring-1 ring-black/5"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
            }`}
          >
            <GraduationCap
              className={`w-4 h-4 md:w-5 md:h-5 mr-2 ${
                activeTab === "education" ? "text-indigo-500" : "text-slate-400"
              }`}
            />
            Formação
          </button>
          <button
            onClick={() => setActiveTab("courses")}
            className={`flex-1 min-w-fit px-4 flex items-center justify-center py-2.5 text-sm md:text-base font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
              activeTab === "courses"
                ? "bg-white text-indigo-600 shadow-sm ring-1 ring-black/5"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
            }`}
          >
            <BookOpen
              className={`w-4 h-4 md:w-5 md:h-5 mr-2 ${
                activeTab === "courses" ? "text-indigo-500" : "text-slate-400"
              }`}
            />
            Cursos
          </button>
          <button
            onClick={() => setActiveTab("skills")}
            className={`flex-1 min-w-fit px-4 flex items-center justify-center py-2.5 text-sm md:text-base font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
              activeTab === "skills"
                ? "bg-white text-indigo-600 shadow-sm ring-1 ring-black/5"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
            }`}
          >
            <Sparkles
              className={`w-4 h-4 md:w-5 md:h-5 mr-2 ${
                activeTab === "skills" ? "text-indigo-500" : "text-slate-400"
              }`}
            />
            Habilidades
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 overflow-y-auto flex-1 space-y-6">
        {activeTab === "personal" && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Image Upload Section */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative group">
                <div
                  className={`w-20 h-20 rounded-full border-2 border-slate-200 overflow-hidden flex items-center justify-center bg-slate-50 ${
                    !resume.photoUrl ? "text-slate-300" : ""
                  }`}
                >
                  {resume.photoUrl ? (
                    <img
                      src={resume.photoUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Upload className="w-8 h-8 opacity-50" />
                  )}
                </div>
                {resume.photoUrl && (
                  <button
                    onClick={() => updateField("photoUrl", "")}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600"
                    title="Remover foto"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-500 uppercase mb-1">
                  Foto do Perfil
                </label>
                <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-white border border-slate-300 rounded-md shadow-sm text-base font-medium text-slate-700 hover:bg-slate-50">
                  <Upload className="w-5 h-5 mr-2" />
                  Escolher Imagem
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () =>
                          updateField("photoUrl", reader.result);
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
                <p className="text-sm text-slate-400 mt-1">
                  Recomendado: 400x400px, fundo neutro.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-500 uppercase mb-1">
                Nome Completo
              </label>
              <input
                type="text"
                value={resume.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-slate-900 text-base"
                placeholder="Seu nome"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-500 uppercase mb-1">
                Título Profissional
              </label>
              <input
                type="text"
                value={resume.title}
                onChange={(e) => updateField("title", e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-white text-slate-900 text-base"
                placeholder="Ex: Engenheiro de Software Senior"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-500 uppercase mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={resume.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-900 text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-500 uppercase mb-1">
                  Telefone
                </label>
                <input
                  type="text"
                  value={resume.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-900 text-base"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-500 uppercase mb-1">
                Endereço Residencial
              </label>
              <input
                type="text"
                value={resume.address || ""}
                onChange={(e) => updateField("address", e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-white text-slate-900 mb-2 text-base"
                placeholder="Rua, Número, Bairro"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={resume.city || ""}
                  onChange={(e) => updateField("city", e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-white text-slate-900 text-base"
                  placeholder="Cidade"
                />
                <input
                  type="text"
                  value={resume.state || ""}
                  onChange={(e) => updateField("state", e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-white text-slate-900 text-base"
                  placeholder="Estado (UF)"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-500 uppercase mb-1">
                Resumo Profissional
              </label>
              <textarea
                rows={4}
                value={resume.summary}
                onChange={(e) => updateField("summary", e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none resize-none bg-white text-slate-900 text-base"
                placeholder="Breve resumo de suas qualificações..."
              />
            </div>
          </div>
        )}

        {activeTab === "experience" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold text-slate-700">
                Histórico Profissional
              </h3>
              <button
                onClick={addExperience}
                className="flex items-center text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors"
              >
                <Plus className="w-3 h-3 mr-1" /> Adicionar
              </button>
            </div>

            {resume.experience.map((exp) => (
              <div
                key={exp.id}
                className="bg-slate-50 p-4 rounded-lg border border-slate-200 group"
              >
                <div className="flex justify-between mb-3">
                  <input
                    type="text"
                    value={exp.role}
                    onChange={(e) =>
                      handleExperienceChange(exp.id, "role", e.target.value)
                    }
                    className="bg-transparent font-medium text-slate-800 placeholder-slate-400 focus:outline-none w-1/2"
                    placeholder="Cargo"
                  />
                  <button
                    onClick={() => removeExperience(exp.id)}
                    className="text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) =>
                      handleExperienceChange(exp.id, "company", e.target.value)
                    }
                    className="bg-white p-2 text-sm border border-slate-200 rounded focus:ring-1 focus:ring-blue-400 outline-none text-slate-900"
                    placeholder="Empresa"
                  />
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={exp.startDate}
                      onChange={(e) =>
                        handleExperienceChange(
                          exp.id,
                          "startDate",
                          e.target.value
                        )
                      }
                      className="bg-white p-2 text-sm w-full border border-slate-200 rounded focus:ring-1 focus:ring-blue-400 outline-none text-slate-900"
                      placeholder="Início"
                    />
                    <input
                      type="text"
                      value={exp.endDate}
                      onChange={(e) =>
                        handleExperienceChange(
                          exp.id,
                          "endDate",
                          e.target.value
                        )
                      }
                      className="bg-white p-2 text-sm w-full border border-slate-200 rounded focus:ring-1 focus:ring-blue-400 outline-none text-slate-900"
                      placeholder="Fim"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="flex justify-between text-xs font-semibold text-slate-500 uppercase mb-1">
                    Descrição das atividades
                    <button
                      onClick={() => handleRefactor(exp.id, exp.description)}
                      disabled={loadingRefactor === exp.id}
                      className={`flex items-center space-x-1 text-xs px-2 py-0.5 rounded transition-all ${
                        loadingRefactor === exp.id
                          ? "bg-slate-200 text-slate-500"
                          : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-sm hover:shadow-md"
                      }`}
                    >
                      {loadingRefactor === exp.id ? (
                        <span>Refatorando...</span>
                      ) : (
                        <>
                          <Sparkles className="w-3 h-3" />
                          <span>Otimizar com Gemini</span>
                        </>
                      )}
                    </button>
                  </label>
                  <textarea
                    rows={4}
                    value={exp.description}
                    onChange={(e) =>
                      handleExperienceChange(
                        exp.id,
                        "description",
                        e.target.value
                      )
                    }
                    className="w-full p-3 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-purple-400 outline-none leading-relaxed bg-white text-slate-900"
                    placeholder="Descreva suas responsabilidades..."
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "education" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold text-slate-700">
                Formação Acadêmica
              </h3>
              <button
                onClick={addEducation}
                className="flex items-center text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors"
              >
                <Plus className="w-3 h-3 mr-1" /> Adicionar
              </button>
            </div>

            {resume.education.map((edu) => (
              <div
                key={edu.id}
                className="bg-slate-50 p-4 rounded-lg border border-slate-200 group"
              >
                <div className="flex justify-between mb-3">
                  <div className="flex items-center space-x-2 w-1/2">
                    <GraduationCap className="w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) =>
                        handleEducationChange(edu.id, "degree", e.target.value)
                      }
                      className="bg-transparent font-medium text-slate-800 placeholder-slate-400 focus:outline-none w-full"
                      placeholder="Grau / Curso"
                    />
                  </div>
                  <button
                    onClick={() => removeEducation(edu.id)}
                    className="text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) =>
                        handleEducationChange(
                          edu.id,
                          "institution",
                          e.target.value
                        )
                      }
                      className="bg-white p-2 text-sm w-full border border-slate-200 rounded focus:ring-1 focus:ring-blue-400 outline-none text-slate-900"
                      placeholder="Instituição de Ensino"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={edu.year}
                      onChange={(e) =>
                        handleEducationChange(edu.id, "year", e.target.value)
                      }
                      className="bg-white p-2 text-sm w-full border border-slate-200 rounded focus:ring-1 focus:ring-blue-400 outline-none text-slate-900"
                      placeholder="Ano"
                    />
                  </div>
                </div>
              </div>
            ))}

            {resume.education.length === 0 && (
                <div className="text-center py-8 text-slate-400 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                    <GraduationCap className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Nenhuma formação adicionada ainda.</p>
                </div>
            )}
          </div>
        )}

        {activeTab === "courses" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
             <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold text-slate-700">Cursos Técnicos e Certificações</h3>
              <button 
                onClick={addCourse}
                className="flex items-center text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors"
              >
                <Plus className="w-3 h-3 mr-1" /> Adicionar
              </button>
            </div>

            {resume.courses.map((course) => (
              <div key={course.id} className="bg-slate-50 p-4 rounded-lg border border-slate-200 group">
                <div className="flex justify-between mb-3">
                   <div className="flex items-center space-x-2 w-1/2">
                    <BookOpen className="w-4 h-4 text-slate-400" />
                    <input 
                        type="text" 
                        value={course.name} 
                        onChange={e => handleCourseChange(course.id, 'name', e.target.value)}
                        className="bg-transparent font-medium text-slate-800 placeholder-slate-400 focus:outline-none w-full"
                        placeholder="Nome do Curso"
                    />
                   </div>
                  <button onClick={() => removeCourse(course.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                 <div className="grid grid-cols-3 gap-2">
                     <div className="col-span-2">
                         <input 
                            type="text" 
                            value={course.institution} 
                            onChange={e => handleCourseChange(course.id, 'institution', e.target.value)}
                            className="bg-white p-2 text-sm w-full border border-slate-200 rounded focus:ring-1 focus:ring-blue-400 outline-none text-slate-900"
                            placeholder="Instituição"
                        />
                     </div>
                     <div>
                        <input 
                            type="text" 
                            value={course.year} 
                            onChange={e => handleCourseChange(course.id, 'year', e.target.value)}
                            className="bg-white p-2 text-sm w-full border border-slate-200 rounded focus:ring-1 focus:ring-blue-400 outline-none text-slate-900"
                            placeholder="Ano/Carga Horária"
                        />
                     </div>
                 </div>
              </div>
            ))}

            {resume.courses.length === 0 && (
                <div className="text-center py-8 text-slate-400 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                    <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Nenhum curso adicionado ainda.</p>
                </div>
            )}
          </div>
        )}

        {activeTab === "skills" && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                Habilidades (Separadas por vírgula)
              </label>
              <textarea
                rows={6}
                value={resume.skills}
                onChange={(e) => updateField("skills", e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none resize-none bg-white text-slate-900"
                placeholder="JavaScript, React, Gestão de Projetos, Comunicação..."
              />
              <p className="text-xs text-slate-400 mt-2">
                Dica: Use a análise ATS para descobrir quais habilidades faltam.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <button
                onClick={onRunAtsScan}
                className="w-full flex items-center justify-center py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors shadow-lg"
              >
                <Wand2 className="w-4 h-4 mr-2" />
                Executar Análise ATS da Vaga
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
