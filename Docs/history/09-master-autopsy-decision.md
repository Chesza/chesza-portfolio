# 00-MASTER-AUTOPSY.md

# AI Dev Assistant — Master Autopsy & V2 Design Document

## Estado del documento

Documento maestro de referencia.

Este archivo resume la evolución completa del proyecto AI Dev Assistant, los problemas encontrados, las decisiones arquitectónicas tomadas y el diseño oficial de AI Dev Assistant V2.

Los documentos históricos detallados permanecen en:

```text
docs/history/

01-dev-env-error-webview-vscode.md
02-ai-dev-assistant-chat-ai-vscode.md
03-ai-dev-assistant-multiagentes-local.md
04-ai-dev-assistant-fase-13-a-31.md
05-ai-dev-assistant-chaos-imports-v2.md
```

---

# Resumen Ejecutivo

AI Dev Assistant comenzó como una extensión de VS Code conectada a un backend local para asistir tareas de desarrollo de software mediante IA.

Durante múltiples iteraciones evolucionó desde un simple chat conectado a Ollama hasta un sistema complejo que incorporaba:

* Streaming SSE
* Context awareness
* Tool execution
* Approval flow
* Rollback
* Sandbox
* Observabilidad
* Event sourcing
* Replay
* Timeline
* Live debugger
* Multi-agent orchestration
* Distributed execution
* Consensus
* Chaos engineering
* Formal verification

La arquitectura alcanzó un nivel muy avanzado, pero el crecimiento acelerado produjo una acumulación significativa de complejidad técnica y problemas estructurales.

La decisión final fue conservar el proyecto original como laboratorio histórico y comenzar AI Dev Assistant V2 desde una base limpia.

---

# Objetivo Original

Construir un asistente de desarrollo local capaz de:

* Comprender proyectos de software.
* Analizar código.
* Generar código.
* Modificar código.
* Revisar código.
* Ejecutar herramientas.
* Operar dentro de VS Code.
* Funcionar completamente local.

---

# Evolución del Proyecto

## Fase Inicial

Componentes:

```text
VS Code Extension
FastAPI
Ollama
TypeScript
Python
```

Capacidades:

```text
Analyze
Generate
Review
Chat
```

---

## Chat Integrado

Se construyó:

```text
ChatViewProvider
Sidebar
Webview
Backend local
```

Problemas:

```text
Webview registration
Activation events
Provider binding
```

Resultado:

```text
Chat funcional dentro de VS Code
```

---

## Streaming

Implementación:

```text
SSE
EventSource
Streaming de tokens
```

Problemas:

```text
Reconexiones infinitas
Streams duplicados
Deadlocks
```

Solución:

```text
Mover SSE al Extension Host
```

Resultado:

```text
Streaming estable
```

---

## Context Awareness

Implementación:

```text
Workspace detection
File tree analysis
Search
Read file
Context builder
```

Resultado:

```text
El agente dejó de trabajar "a ciegas"
```

---

## Tool System

Implementación:

```text
read_file
write_file
edit_file
search_code
list_files
```

Resultado:

```text
Ejecución real sobre proyectos
```

---

## Approval Flow

Implementación:

```text
Diff generation
Apply
Reject
Rollback
```

Resultado:

```text
Control humano antes de modificar código
```

---

## Safety Layer

Implementación:

```text
Validation
Security scan
Sandbox
Test execution
```

Resultado:

```text
Cambios más seguros
```

---

## Observabilidad

Implementación:

```text
Execution tracking
Metrics
Timings
Execution history
```

Resultado:

```text
Pipeline visible
```

---

## Event Sourcing

Implementación:

```text
Event Bus
Replay
Timeline
State reconstruction
```

Resultado:

```text
Ejecuciones reproducibles
```

---

## Runtime Avanzado

Implementación:

```text
Breakpoints
Pause
Resume
Execution graph
Workers
Queues
```

Resultado:

```text
Base para runtime distribuido
```

---

## Distributed Execution

Implementación:

```text
Node Registry
Distributed Scheduler
Leasing
Failure Recovery
```

Commit relevante:

```text
84708d7
Fase 21
```

---

## Consensus Layer

Implementación:

```text
Leader election
Global ordering
Quorum
Raft
```

Fases:

```text
22
23
```

---

## Formal Verification

Implementación:

```text
Invariants
Chaos testing
Verification framework
Lean skeleton
```

Fases:

```text
24
31
```

Commit final:

```text
de0ad4a
```

---

# Crisis Arquitectónica

Problemas principales:

## Imports inconsistentes

Coexistían:

```python
from app...
from backend.app...
from .module...
from module...
```

Consecuencias:

```text
ModuleNotFoundError
ImportError
NameError
```

---

## Scripts de arranque múltiples

Existían:

```text
run_server.py
run_backend.py
start-dev.ps1
start-dev.bat
start_backend.ps1
```

Cada uno utilizaba convenciones distintas.

---

## Acoplamiento excesivo

Las fases avanzadas dependían de:

```text
Persistent queue
Checkpointing
Replay
Scheduler
Node registry
Consensus
```

Lo que dificultaba aislar errores.

---

# Lecciones Aprendidas

## Lección 1

No avanzar de fase sin estabilidad comprobada.

---

## Lección 2

Mantener una sola convención de imports.

---

## Lección 3

Mantener un único método oficial de arranque.

---

## Lección 4

Construir vertical slices completos.

---

## Lección 5

No introducir agentes antes de tener:

```text
Chat estable
Contexto
Tools
Seguridad
Persistencia
Observabilidad
```

---

# Decisión Final

El repositorio original se conserva como:

```text
Laboratorio histórico
Referencia arquitectónica
Fuente de ideas
```

No será la base de desarrollo futuro.

---

# Nacimiento de AI Dev Assistant V2

Nuevo objetivo:

Construir un sistema simple, estable y entendible antes de introducir complejidad avanzada.

---

# Arquitectura Oficial V2

```text
ai-dev-assistant-v2/

backend/
│
├── run.py
├── requirements.txt
│
└── app/
    ├── __init__.py
    ├── main.py
    │
    ├── api/
    │   └── routes/
    │
    ├── core/
    │
    ├── services/
    │
    ├── models/
    │
    └── tests/
```

---

# Regla de Imports V2

Única convención permitida:

```python
from app.services.chat_service import ChatService
```

No usar:

```python
from backend.app...
from .module...
```

salvo casos muy específicos.

---

# Roadmap Oficial V2

## Fase 0

Foundation

```text
Config
Logging
Health endpoint
Tests
```

---

## Fase 1

Chat

```text
VS Code
FastAPI
Ollama
Streaming
```

---

## Fase 2

Project Awareness

```text
Workspace
Context Builder
Search
Read File
```

---

## Fase 3

Tool System

```text
Tool Registry
Execution Layer
```

---

## Fase 4

Planner

```text
Tasks
Plans
Steps
```

---

## Fase 5

Approval Flow

```text
Diff
Apply
Reject
```

---

## Fase 6

Safety Layer

```text
Validation
Security
Sandbox
```

---

## Fase 7

Memory

```text
SQLite
History
Executions
```

---

## Fase 8

Observability

```text
Metrics
Tracing
Dashboards
```

---

## Fase 9

Agent Layer

Solo después de completar todas las fases anteriores.

---

# Regla Principal

No implementar:

```text
Distributed systems
Consensus
Raft
Formal verification
Chaos engineering
```

hasta que Fase 0–9 estén terminadas, probadas y documentadas.

---

# Estado Actual

Proyecto histórico:

```text
C:\Users\Administrator\proyectos\ai-dev-assistant-vscode
```

Proyecto nuevo:

```text
C:\Users\Administrator\proyectos\ai-dev-assistant-v2
```

Estado:

```text
Inicio de Fase 0
Foundation
```
Immediately after the academic architecture paper, the project attempted to wire the distributed execution kernel into the application through modules such as node registry, distributed scheduler, persistent queue, global timeline, execution graph, event log, breakpoints, timeline engine, and state rebuilder. This became the last known advanced architecture state before the rollback.

See Note 171 — Distributed Kernel Import Map Before Rollback

Recovered Phase 31 distributed execution branch after rollback. Backend services, runtime telemetry, adaptive system modes, menu routing, and SSE streaming endpoints were successfully restored. The SSE channel accepted connections and remained open, demonstrating that the streaming infrastructure survived the recovery process. Further investigation was required only for event emission within the recovered execution pipeline.

See image phase31-recovery-sse-endpoint-alive

Fin del documento.