"""
setup_notebook.py — VitalBahía NotebookLM Setup
================================================
Crea el cuaderno "VitalBahía RAG" en tu cuenta de Google NotebookLM
y sube todas las reglas de negocio como fuente de texto.

ANTES DE CORRER:
  1. notebooklm login   (autenticación browser Google)
  2. python3 python/setup_notebook.py

REQUISITOS:
  pip install "notebooklm-py[browser]"
  playwright install chromium
"""

import asyncio
from notebooklm import NotebookLM

VITALBAHIA_RULES = """
# Centro Médico VitalBahía — Base de Conocimiento Oficial
# Versión 1.0 — RAG Powered by MotorsHub
# Dirección: Alsina 450, Bahía Blanca, Buenos Aires, Argentina

## ESPECIALIDAD: CLÍNICA MÉDICA
- Profesionales: Dra. Gómez y Dr. Rinaldi
- Horario de atención: Lunes a Viernes, 08:00 a 16:00 hs
- REGLA ESTRICTA #1: Los Certificados de "Apto Físico" o "Fichas Escolares"
  SOLO se otorgan en el primer turno del día, es decir, a las 08:00 AM.
  No hay excepciones. Si el paciente llega tarde, debe reagendarse.

## ESPECIALIDAD: ODONTOLOGÍA
- Profesional: Dra. Blanco
- Horario de atención: Martes y Jueves, 10:00 a 18:00 hs
- REGLA ESTRICTA #1: Los pacientes que concurran por "dolor agudo" u "odontología
  de urgencia" SOLO pueden ser atendidos en el último turno del día, que funciona
  como sobreturno a las 17:30 hs. No se asignan turnos de urgencia en otros horarios.
- Para controles de rutina, limpieza o consulta general: cualquier turno disponible.

## ESPECIALIDAD: CARDIOLOGÍA
- Profesionales: Dr. López y Dra. Silva
- Horario de atención: Lunes, Martes y Viernes, 09:00 a 15:00 hs
- REGLA ESTRICTA #1: Los pacientes "Primera Vez" (que nunca antes consultaron en
  Cardiología VitalBahía) DEBEN traer obligatoriamente un ECG (Electrocardiograma)
  de MENOS de 3 meses de antigüedad al momento del turno. Sin ECG no se atiende.
- REGLA ESTRICTA #2: Los turnos de "Riesgo Quirúrgico" SOLO se asignan los días
  MIÉRCOLES. En ningún otro día se otorgan turnos de esta modalidad.

## ESPECIALIDAD: RESONANCIA MAGNÉTICA (RMI)
- Tipo de equipo: RMI de 128 cortes (alta definición)
- Horario general: Lunes a Sábado, 08:00 a 20:00 hs
- REGLA ESTRICTA #1 — CLAUSTROFOBIA: Los pacientes que padecen claustrofobia
  o que requieren sedación/anestesia para tolerar el procedimiento SOLO pueden
  ser agendados los días JUEVES entre las 14:00 y las 20:00 hs. Este es el único
  horario en el que hay presencia de anestesista en el centro.
  NO se pueden asignar turnos con claustrofobia en NINGÚN otro día ni horario.
- PREPARACIÓN OBLIGATORIA para todos los estudios de RMI:
  * Ayuno de 4 horas previo al turno.
  * Prohibido el ingreso con objetos metálicos de cualquier tipo (incluyendo
    ropa con broches metálicos, piercings, prótesis removibles, llaves, monedas).
  * Informar previamente si se tiene marcapasos, implantes cocleares u otro
    dispositivo metálico implantado.

## GUARDRAILS DEL ASISTENTE
- El asistente NUNCA debe diagnosticar enfermedades ni recetar medicamentos.
- Si un paciente describe síntomas graves (dolor de pecho, ahogo, sangrado),
  debe derivar de INMEDIATO al 107 (SAME) o guardia hospitalaria.
- El asistente siempre debe solicitar Nombre y DNI al inicio de la conversación.
- Todas las respuestas deben ser en español con voseo rioplatense (Argentina).
"""

async def main():
    print("🔌 Conectando a NotebookLM...")
    client = NotebookLM()

    print("📓 Creando cuaderno 'VitalBahía RAG — MotorsHub'...")
    notebook = await client.create_notebook(
        title="VitalBahía RAG — MotorsHub v1.0"
    )
    print(f"✅ Cuaderno creado: {notebook.id}")

    print("📄 Subiendo reglas de negocio...")
    source = await notebook.add_source_text(
        text=VITALBAHIA_RULES,
        title="Reglas de Negocio Completas — Centro Médico VitalBahía"
    )
    print(f"✅ Fuente subida: {source.id}")

    print("\n✅ ¡Setup completo!")
    print(f"   Notebook ID: {notebook.id}")
    print(f"   Guardá este ID en tu .env como: NOTEBOOKLM_NOTEBOOK_ID={notebook.id}")

if __name__ == "__main__":
    asyncio.run(main())
