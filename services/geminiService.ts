import { GoogleGenAI, Type, Schema } from "@google/genai";

// We use a class to instantiate with the user's provided key
export class GeminiService {
  private ai: GoogleGenAI | null = null;

  constructor(apiKey: string) {
    if (apiKey) {
      this.ai = new GoogleGenAI({ apiKey });
    }
  }

  setApiKey(apiKey: string) {
    if (apiKey) {
      this.ai = new GoogleGenAI({ apiKey });
    }
  }

  isConfigured(): boolean {
    return this.ai !== null;
  }

  async refactorExperience(description: string): Promise<string> {
    if (!this.ai) throw new Error("API Key not configured");

    const prompt = `
      Atue como um Consultor de Carreira Sênior especializado em currículos executivos.
      
      TAREFA: Refatore a descrição da experiência profissional abaixo.
      
      DIRETRIZES DE ESTILO:
      1. Use o formato 'Ação + Contexto + Resultado (com Métricas se possível)'.
      2. Inicie cada ponto com um verbo de ação forte no passado.
      3. IMPORTANTE: Não use formatação Markdown (como **negrito** ou *itálico*). O texto deve ser plano (plain text).
      4. Use o caractere '•' (bullet point) para listar os itens.
      5. Remova placeholders genéricos como '[Número]' se não houver dados, adaptando a frase para soar profissional sem eles.
      
      Descrição original para refatorar:
      "${description}"
      
      Retorne apenas a lista de tópicos refatorada, sem introduções.
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      
      let text = response.text || description;
      
      // Post-processing cleanup just in case the model ignores instructions
      text = text.replace(/\*\*/g, ''); // Remove bold markdown
      text = text.replace(/^\* /gm, '• '); // Replace asterisk bullets with clean dots
      
      return text;
    } catch (error) {
      console.error("Gemini Refactor Error:", error);
      throw error;
    }
  }

  async analyzeATS(resumeText: string, jobDescription: string): Promise<{ suggestions: string[] }> {
    if (!this.ai) throw new Error("API Key not configured");

    // Define strict schema for JSON output
    const responseSchema: Schema = {
      type: Type.OBJECT,
      properties: {
        suggestions: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "Lista de 5 sugestões de melhoria (habilidades ou frases chaves)."
        }
      },
      required: ["suggestions"]
    };

    const prompt = `
      Analise o currículo anexo em comparação com a descrição da vaga.
      Sugira cinco frases-chave ou habilidades técnicas/interpessoais que, se adicionadas ao currículo, maximizariam sua pontuação em um sistema ATS.
      Justifique brevemente cada sugestão.

      Currículo:
      ${resumeText.substring(0, 4000)}

      Descrição da Vaga:
      ${jobDescription.substring(0, 2000)}
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: responseSchema,
        }
      });

      const json = JSON.parse(response.text || '{"suggestions": []}');
      return json;
    } catch (error) {
      console.error("Gemini ATS Error:", error);
      return { suggestions: ["Erro ao analisar. Verifique sua chave API."] };
    }
  }
}