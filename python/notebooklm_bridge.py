"""
notebooklm_bridge.py — FastAPI bridge para NotebookLM
======================================================
Microservicio Python que expone NotebookLM como API REST.
El servidor Express (Node.js) lo llama en Phase 2.

Levantar:
  uvicorn python.notebooklm_bridge:app --port 5001 --reload

Endpoints:
  POST /query   → busca respuesta en el notebook
  GET  /health  → status check
"""

import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from notebooklm import NotebookLM

app = FastAPI(title="VitalBahía NotebookLM Bridge", version="1.0.0")

NOTEBOOK_ID = os.environ.get("NOTEBOOKLM_NOTEBOOK_ID", "")

class QueryRequest(BaseModel):
    question: str
    notebook_id: str | None = None


class QueryResponse(BaseModel):
    answer: str
    sources: list[str] = []


@app.get("/health")
async def health():
    return {"status": "ok", "notebook_id": NOTEBOOK_ID}


@app.post("/query", response_model=QueryResponse)
async def query_notebook(req: QueryRequest):
    nb_id = req.notebook_id or NOTEBOOK_ID
    if not nb_id:
        raise HTTPException(status_code=400, detail="notebook_id requerido")

    try:
        client = NotebookLM()
        notebook = await client.get_notebook(nb_id)
        result = await notebook.query(req.question)
        return QueryResponse(
            answer=result.answer,
            sources=[s.title for s in (result.sources or [])],
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5001)
