
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function getClaude(message: string, context?: string) {
  try {
    const systemPrompt = context || 
      "Eres un asistente especializado en alquileres temporarios y gestión de propiedades. " +
      "Ayudas a propietarios a optimizar sus ingresos y gestionar mejor sus propiedades.";

    const response = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 1000,
      temperature: 0.7,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: message
        }
      ]
    });

    return {
      success: true,
      message: response.content[0].type === 'text' ? response.content[0].text : '',
      usage: response.usage
    };
  } catch (error) {
    console.error('Error with Claude API:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: ''
    };
  }
}

export async function analyzeProperty(propertyData: any) {
  const prompt = `
    Analiza esta propiedad para alquiler temporal y proporciona recomendaciones:
    
    Datos de la propiedad: ${JSON.stringify(propertyData, null, 2)}
    
    Por favor proporciona:
    1. Análisis de potencial de ingresos
    2. Recomendaciones de mejora
    3. Estrategias de precios
    4. Sugerencias de marketing
  `;

  return await getClaude(prompt, "Eres un experto en análisis de propiedades para alquiler temporal.");
}
