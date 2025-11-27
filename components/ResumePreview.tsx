import React from 'react';
import { ResumeData } from '../types';
import { Mail, Phone, MapPin } from 'lucide-react';

interface ResumePreviewProps {
  resume: ResumeData;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ resume }) => {
  const skillsList = resume.skills.split(',').map(s => s.trim()).filter(s => s.length > 0);

  const displayLocation = [
    resume.address,
    [resume.city, resume.state].filter(Boolean).join(' - ')
  ].filter(Boolean).join(', ') || resume.location;

  return (
    <div className="bg-slate-300 p-8 overflow-y-auto h-full flex justify-center items-start print:bg-white print:p-0 print:block print:overflow-visible print:h-auto">
        {/* A4 Page container */}
      <div className="a4-page text-slate-800 print:shadow-none print:m-0 print:w-full">
        
        {/* Header */}
        <header className="border-b-2 border-slate-800 pb-6 mb-6 flex justify-between items-start gap-6">
            <div className="flex-1">
                <h1 className="text-4xl font-bold tracking-tight text-slate-900 uppercase mb-2">{resume.name || 'Seu Nome'}</h1>
                <h2 className="text-xl text-slate-600 font-medium mb-4">{resume.title || 'Título Profissional'}</h2>
                
                <div className="flex flex-wrap gap-4 text-base text-slate-600">
                    {resume.email && (
                        <div className="flex items-center">
                            <Mail className="w-4 h-4 mr-1.5" />
                            {resume.email}
                        </div>
                    )}
                    {resume.phone && (
                        <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-1.5" />
                            {resume.phone}
                        </div>
                    )}
                    {displayLocation && (
                        <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1.5" />
                            {displayLocation}
                        </div>
                    )}
                </div>
            </div>

            {resume.photoUrl && (
                <div className="w-24 h-24 shrink-0 rounded-full border-2 border-slate-200 overflow-hidden shadow-sm">
                    <img 
                        src={resume.photoUrl} 
                        alt={resume.name} 
                        className="w-full h-full object-cover"
                    />
                </div>
            )}
        </header>

        {/* Summary */}
        {resume.summary && (
            <section className="mb-6">
                <h3 className="text-base font-bold uppercase tracking-wider text-slate-500 mb-2">Resumo Profissional</h3>
                <p className="text-base leading-relaxed text-justify">{resume.summary}</p>
            </section>
        )}

        {/* Experience */}
        {resume.experience.length > 0 && (
            <section className="mb-6">
                <h3 className="text-base font-bold uppercase tracking-wider text-slate-500 mb-3">Experiência Profissional</h3>
                <div className="space-y-4">
                    {resume.experience.map(exp => (
                        <div key={exp.id}>
                            <div className="flex justify-between items-baseline mb-1">
                                <h4 className="font-bold text-lg text-slate-800">{exp.role}</h4>
                                <span className="text-base text-slate-500 whitespace-nowrap">{exp.startDate} - {exp.endDate}</span>
                            </div>
                            <div className="text-base font-semibold text-slate-600 mb-1">{exp.company}</div>
                            <p className="text-base leading-relaxed text-slate-700 whitespace-pre-line text-justify">
                                {exp.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        )}

        {/* Education */}
        {resume.education.length > 0 && (
            <section className="mb-6">
                <h3 className="text-base font-bold uppercase tracking-wider text-slate-500 mb-3">Formação Acadêmica</h3>
                <div className="space-y-4">
                    {resume.education.map(edu => (
                        <div key={edu.id}>
                            <div className="flex justify-between items-baseline mb-1">
                                <h4 className="font-bold text-lg text-slate-800">{edu.degree}</h4>
                                <span className="text-base text-slate-500 whitespace-nowrap">{edu.year}</span>
                            </div>
                            <div className="text-base text-slate-600">{edu.institution}</div>
                        </div>
                    ))}
                </div>
            </section>
        )}

        {/* Courses */}
        {resume.courses.length > 0 && (
            <section className="mb-6">
                <h3 className="text-base font-bold uppercase tracking-wider text-slate-500 mb-3">Cursos e Certificações</h3>
                <div className="space-y-4">
                    {resume.courses.map(course => (
                        <div key={course.id}>
                            <div className="flex justify-between items-baseline mb-1">
                                <h4 className="font-bold text-lg text-slate-800">{course.name}</h4>
                                <span className="text-base text-slate-500 whitespace-nowrap">{course.year}</span>
                            </div>
                            <div className="text-base text-slate-600">{course.institution}</div>
                        </div>
                    ))}
                </div>
            </section>
        )}

        {/* Skills */}
        {skillsList.length > 0 && (
            <section>
                 <h3 className="text-base font-bold uppercase tracking-wider text-slate-500 mb-3">Habilidades</h3>
                 <div className="flex flex-wrap gap-2">
                    {skillsList.map((skill, index) => (
                        <span key={index} className="bg-slate-100 text-slate-700 px-3 py-1 rounded text-base font-medium print:bg-slate-100 print:text-slate-800 print:border-none">
                            {skill}
                        </span>
                    ))}
                 </div>
            </section>
        )}

      </div>
    </div>
  );
};