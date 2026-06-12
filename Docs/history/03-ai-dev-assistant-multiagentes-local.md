# Autopsia técnica del proyecto: AI Dev Assistant local

## 0. Contexto inicial heredado de otros chats

CHAT: Multiagentes AI Local

Este chat no empezó desde cero. Venía de una serie de conversaciones previas donde ya se había construido y revisado un proyecto llamado:

```text
AI Dev Assistant / ai-dev-assistant-vscode
```

Ruta principal detectada durante el trabajo:

```text
C:\WINDOWS\System32\ai-dev-assistant-vscode
```

Backend:

```text
C:\WINDOWS\System32\ai-dev-assistant-vscode\backend
```

Frontend/extensión VS Code:

```text
C:\WINDOWS\System32\ai-dev-assistant-vscode\src\extension.ts
```

También apareció un visor React:

```text
C:\WINDOWS\System32\ai-dev-assistant-vscode\stream-viewer
```

El proyecto venía de fases anteriores donde ya se había trabajado:

* Indexación de workspace.
* Backend FastAPI.
* Sidebar/chat en VS Code.
* Ollama/local LLM.
* PlanGenerator.
* Orchestrator.
* ExecutionEngine.
* Tools para leer/escribir archivos.

La conversación retomó desde un sistema que ya funcionaba parcialmente, pero todavía tenía problemas de arquitectura, bloqueo, streaming, resiliencia y cliente.

---

# 1. Objetivo general del proyecto

Construir un asistente local de desarrollo integrado en VS Code, con:

```text
VS Code Sidebar
   ↓
Backend FastAPI
   ↓
Intent Router
   ↓
Orchestrator
   ↓
Execution Engine / Tools
   ↓
Ollama / LLM local
```

Objetivo conceptual:

> Crear un copiloto local, privado, extensible y resistente, capaz de entender prompts, usar herramientas, leer/escribir archivos, transmitir respuestas en tiempo real y no romperse bajo condiciones reales.

---

# 2. Tecnologías usadas

## Backend

```text
Python
FastAPI
asyncio
SSE / Server-Sent Events
Ollama
requests
ThreadPoolExecutor
ChromaDB / embeddings
Pydantic
```

## Frontend / Extensión

```text
TypeScript
VS Code Extension API
Webview Sidebar
EventSource / SSE
HTML/CSS embebido
```

## Cliente adicional de diagnóstico

```text
React
EventSource
Stream Viewer
```

## Testing / validación

```text
pytest
scripts Python manuales
aiohttp
curl
PowerShell
chaos tests
load tests
```

---

# 3. Árbol lógico del proyecto

```text
ai-dev-assistant-vscode/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── intent_router.py
│   │   ├── orchestrator.py
│   │   ├── execution_engine.py
│   │   ├── request_registry.py
│   │   ├── chat_handler.py
│   │   ├── workspace_indexer.py
│   │   ├── prompt_builder.py
│   │   ├── language_detector.py
│   │   └── llm/
│   │       └── ollama_client.py
│   │
│   ├── test_ttl_failsafe.py
│   ├── validate_resilience.py
│   ├── chaos_e2e_test.py
│   ├── test_phase1_load_simple.py
│   └── test_hardening_validation.py
│
├── src/
│   └── extension.ts
│
├── stream-viewer/
│   ├── package.json
│   ├── src/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── public/
│       └── index.html
│
├── run_backend.py
├── PHASE1_IMPLEMENTATION_COMPLETE.md
├── PHASE1_FIX_SUMMARY.md
├── PROJECT_COMPLETION_SUMMARY.md
├── PRODUCTION_VALIDATION_COMPLETE.md
├── CHAOS_TEST_GUIDE.md
└── STREAM_CONSISTENCY_ARCHITECTURE.md
```

---

# 4. Cronología técnica del chat

## Etapa 1 — Estado inicial: Phase 1 crítica corregida

El chat comenzó con un resumen de correcciones P0 ya aplicadas:

### Fixes P0 aplicados

```text
Workspace Path Format
Query Parsing
Test Isolation
```

Validación reportada:

```text
6/6 Phase 1 tests passing
12 files indexed
/index-workspace funcionando
/get-context funcionando
2 commits pushed to main
```

Estado inicial:

```text
Sistema estable para avanzar a Phase 2.
```

---

# 5. Orchestrator: primera gran revisión

Se compartió el archivo:

```text
backend/app/orchestrator.py
```

El orchestrator tenía esta responsabilidad:

```text
user_input
   ↓
PlanGenerator
   ↓
ExecutionEngine
   ↓
resultado estructurado
```

## Problemas detectados

### Problema 1: tipo incorrecto de contexto

El orchestrator pasaba:

```python
initial_context=context
```

Pero `ExecutionEngine` esperaba un `dict`, no un `StepContext`.

Fix:

```python
initial_context=context.get_all()
```

### Problema 2: success hardcoded

Antes:

```python
"success": True
```

Después:

```python
"success": execution_result.get("success", False)
```

### Problema 3: tests desactualizados

Tests esperaban `StepContext`, pero ahora se pasaba `dict`.

Resultado:

```text
9/9 tests passing
```

Commit reportado:

```text
1316d9e - P0.5: Fix context passing & execution result handling (CRITICAL)
```

---

# 6. P1 Safety Improvements

Se implementaron mejoras de seguridad en el orchestrator.

## 6.1 Timeout

Se agregó protección para evitar ejecuciones infinitas.

```python
MAX_EXECUTION_TIME_SECONDS = 30
```

Uso:

```python
asyncio.wait_for(...)
```

## 6.2 Max steps

Primero se propuso:

```python
MAX_PLAN_STEPS = 50
```

Luego se ajustó a:

```python
MAX_PLAN_STEPS = 100
```

Motivo:

> 50 era demasiado agresivo para análisis multi-step reales.

## 6.3 Tool validation

Se validó que las tools del plan existieran antes de ejecutar.

Resultado:

```text
9/9 tests passing
```

Commit reportado:

```text
e0259b9 - P1: Add safety improvements
```

---

# 7. P1.5 Hardening: context size limit

Se agregó:

```python
MAX_CONTEXT_SIZE_KB = 100
```

Objetivo:

> Evitar consumo excesivo de memoria por contextos gigantes.

Error nuevo posible:

```text
context_too_large
```

Estado:

```text
Sistema con timeout, max steps, tool validation y context size guard.
```

---

# 8. Problema de DeepSeek/Ollama: el LLM se confundía

Se hicieron pruebas desde el sidebar con DeepSeek/Ollama.

## Ejemplos fallidos

Usuario:

```text
crea un archivo en el desktop que sea un html que diga hola mundo
```

Modelo:

```html
<!DOCTYPE html>...
```

Pero no escribía el archivo.

Usuario:

```text
puedes indicarme la ruta donde guardaste el archivo
```

Modelo:

```text
Sorry, but I can't assist with that...
```

Problemas observados:

```text
- El modelo respondía como chatbot.
- Negaba acceso a tools.
- Cambiaba idioma.
- Se rehusaba a tareas que sí eran de programación.
- No diferenciaba conversación vs acción.
```

Conclusión importante:

> DeepSeek/Ollama no debía decidir todo. El sistema debía controlar intención, routing y ejecución con código determinístico.

---

# 9. PlanGenerator hardening

Archivo revisado:

```text
backend/app/agent/plan_generator.py
```

## Problema

El PlanGenerator dependía demasiado del LLM para generar planes JSON.

Fallos:

```text
- respuestas conversacionales
- markdown en vez de JSON
- refusal messages
- hallucinated tools
- idioma incorrecto
```

## Fixes aplicados

### Role hardening

Se cambió el prompt para definir al modelo como:

```text
DETERMINISTIC PLANNING ENGINE
```

No como chatbot.

### Chat handling

Para requests no accionables:

```json
{"goal": "no_action_needed", "steps": []}
```

### Language consistency

Se indicó mantener el idioma del usuario.

### Output enforcement

Reglas estrictas:

```text
RAW JSON ONLY
NO apologies
NO markdown
NO text before/after JSON
```

### Chat response detection

Se agregó detección de respuestas tipo chatbot antes de parsear.

### Tool validation

Validación estricta contra herramientas reales.

---

# 10. Intent Router: decisión arquitectónica clave

Se definió que el sistema no debía dejar que el LLM clasificara todo.

Se creó:

```text
backend/app/intent_router.py
```

## Función

Clasificar deterministicamente:

```text
CHAT
ACTION
```

Ejemplos:

```text
"hola"                         → CHAT
"qué es python"                → CHAT
"crea un archivo index.html"   → ACTION
"abre main.py"                 → ACTION
"lee config.json"              → ACTION
"abre la puerta"               → fallback/chat
```

## Reglas

ACTION si detecta:

```text
crear, leer, escribir, abrir, borrar
file extensions: .py, .html, .json, .ts
archivo, carpeta, ruta, path
```

CHAT si detecta:

```text
hola
qué es
explícame
tell me
general question
```

Resultado inicial:

```text
20 tests passing
```

---

# 11. ChatHandler

Se implementó:

```text
backend/app/chat_handler.py
```

Objetivo:

> Manejar conversación simple sin pasar por el planner/orchestrator.

Pero se detectó un problema:

Aunque el IntentRouter existía, `/chat` lo estaba saltando.

## Bug crítico

```text
/chat endpoint bypassed intent router
```

Fix:

```text
/chat ahora debe pasar por handle_user_request()
```

También se quitó lógica redundante del ChatHandler.

---

# 12. Problemas con timeouts, asyncio y zombie threads

Este fue uno de los momentos más importantes del chat.

## Problema inicial

Se intentó envolver ejecución con:

```python
asyncio.wait_for()
run_in_executor()
```

Pero se detectó que:

```text
wait_for sobre run_in_executor no mata el thread subyacente.
```

Resultado:

```text
Zombie threads.
Sistema se vuelve lento o no responde.
```

## Hallazgo

OllamaClient usaba:

```python
requests.post(...)
```

Es decir, I/O bloqueante.

Por eso:

```text
task.cancel() no detenía requests.post()
```

Conclusión:

> No puedes cancelar elegantemente una operación bloqueante dentro de un thread si la librería no coopera.

---

# 13. Hybrid executor controlado

Se decidió:

```text
- Mantener Orchestrator async.
- Aislar solo plan generation en run_in_executor.
- Controlar ThreadPoolExecutor.
```

Cambios:

```python
ThreadPoolExecutor(max_workers=10)
```

Se agregó:

```python
queue_size = self.executor._work_queue.qsize()
```

para detectar backlog.

Timeouts alineados:

```text
Router UX timeout: 12s
Ollama requests timeout: 10s / luego 30s según ajuste
```

Hubo varias iteraciones porque primero se intentó cancelar, luego se entendió que el sistema debía adaptarse al LLM local lento.

---

# 14. Cambio de paradigma: “Nunca esperes al LLM”

Frase clave del proyecto:

> No esperes al LLM. Adáptate a él.

Se cambió el diseño de request/response bloqueante a:

```text
POST /route-request
   ↓
request_id inmediato
   ↓
GET /stream/{request_id}
   ↓
resultado en background
```

Esto transformó la arquitectura:

Antes:

```text
request → esperar LLM → response
```

Después:

```text
request → request_id → stream attach → background execution
```

---

# 15. Background Result Recovery

Se creó:

```text
backend/app/request_registry.py
```

Responsabilidades:

```text
- registrar tasks por request_id
- guardar resultados
- permitir polling
- permitir streaming
- limpiar resultados viejos
```

Nuevos endpoints:

```text
GET /result/{request_id}
GET /registry-metrics
```

Estados:

```json
{ "status": "pending" }
{ "status": "completed", "result": ... }
{ "status": "failed", "error": ... }
```

---

# 16. Deduplication + cache hot + orphan cancellation

Se mejoró `request_registry.py`.

## 16.1 Deduplication

Mismo input:

```text
3 requests idénticos → 1 task real
```

Implementado con hash:

```text
SHA256(normalized_input + versions)
```

## 16.2 Cache hot

Si una respuesta terminó recientemente:

```text
mismo input → respuesta instantánea
```

TTL de cache:

```text
5 minutos
```

## 16.3 Orphan cancellation

Si nadie escucha/pollee:

```text
cancelar task abandonada
```

Luego se endureció porque la cancelación por idle era agresiva.

---

# 17. Versioned cache

Se detectó riesgo:

> Cache servía resultados aunque cambiaran prompts/tools.

Fix:

```text
TOOLS_VERSION
PROMPT_VERSION
```

Se incluyeron en el hash.

---

# 18. Streaming consistency architecture

Se cambió de tokens sueltos a eventos estructurados.

Antes:

```text
"hola"
" mundo"
```

Después:

```json
{
  "seq": 12,
  "type": "token",
  "data": "hola",
  "timestamp": 123456
}
```

Eventos:

```text
start
sync
token
done
error
```

## Mejoras

```text
- seq incremental
- request_state
- sync for late joiners
- stream buffers
- stream listeners
```

Esto permitió:

```text
Cliente A conecta al inicio
Cliente B conecta tarde
Cliente B recibe sync + buffer + live stream
```

---

# 19. Web Viewer React

Se construyó:

```text
stream-viewer/
```

Con:

```text
React
EventSource
request_id input
status
output
logs
gap detection
```

Propósito:

> No reemplazar VS Code, sino servir como osciloscopio del stream.

Se explicó que:

```text
VS Code = producto final
Web Viewer = herramienta de validación
```

---

# 20. Request ID alignment

Bug crítico detectado:

```text
/route-request no devolvía request_id
```

Esto desconectaba:

```text
Pipeline A: route-request
Pipeline B: stream/{request_id}
```

Fix conceptual:

```text
request_id debe nacer una sola vez al inicio de handle_user_request
y propagarse a todo.
```

Reglas:

```text
- request_id se genera una sola vez.
- se retorna en todos los paths.
- solo se registra task si hay ACTION.
- no se generan UUIDs nuevos por cada return.
```

Se agregó en:

```text
CHAT path
ACTION path
ERROR path
UNKNOWN intent
general exception
```

Resultado:

```json
{
  "request_id": "...",
  "meta": {
    "stream_url": "/stream/...",
    "poll_url": "/result/...",
    "supports_stream": true
  }
}
```

---

# 21. Non-blocking endpoint

Se detectó que aunque había `create_task`, aún se hacía:

```python
await asyncio.wait({orch_task}, timeout=12)
```

Eso seguía bloqueando.

Fix:

```python
orch_task = asyncio.create_task(...)
registry.register_task(...)
return immediately
```

Resultado esperado:

```text
/route-request responde rápido
/stream/{id} lleva el trabajo pesado
```

---

# 22. Validación de timing

Se creó un test directo async.

Hallazgo:

```text
A → B → C → D → E < 1ms
```

Checkpoints:

```text
A: entry
B: dedup
C: classify
D: create_task
E: register
```

Conclusión:

```text
App logic < 1ms
HTTP layer ~30-50ms
```

Esto separó correctamente:

```text
Latencia de aplicación
vs
latencia de transporte
```

---

# 23. Production validation

Se crearon tests:

```text
test_A_endpoint_latency.py
test_B_streaming_real.py
test_C_multitab_coalescing.py
validate_diagnostic.py
```

Resultados reportados:

```text
TEST B: Streaming passed
endpoint 34ms
stream connection 12ms
events flowing

TEST C: Coalescing perfect
3 requests → 1 stream
100% dedup

TEST A: HTTP roundtrip 49ms
```

---

# 24. Phase 1 Robustness

Se implementaron tres piezas:

## 24.1 Listener tracking

Saber cuántos clientes escuchan un stream.

## 24.2 Grace period

Si un cliente se desconecta:

```text
esperar 5s antes de cancelar
```

Luego se endureció para que si el cliente reconecta dentro del grace period, no se cancele.

## 24.3 Event buffer

Ring buffer:

```text
últimos 100 eventos
```

Late joiners reciben replay.

## 24.4 Metrics endpoint

Se agregó:

```text
GET /metrics
```

Métricas:

```text
active_streams
dedup_hits
time_to_first_token
flapping_clients
timeout_cancellations
```

Load test reportado:

```text
75 concurrent
98.7% dedup efficiency
100% success rate
37.7ms average latency
8 reconnections handled
```

---

# 25. Grace period hardening

Edge case probado:

```text
cliente desconecta
grace period 5s
cliente reconecta a los 3.5s
task NO se cancela
stream continúa
```

Resultado:

```text
HARDENING TEST PASSED
```

---

# 26. TTL Failsafe

Se detectó otro riesgo:

```text
_monitor_task_timeout existía, pero no siempre se spawneaba correctamente.
```

Se implementó:

```text
safe_spawn_ttl()
_delayed_ttl_spawn()
```

Arquitectura:

```text
PRIMARY spawn
   ↓ falla
FALLBACK delayed spawn
   ↓ falla
CRITICAL metric/log
```

Métricas nuevas:

```text
ttl_spawn_success
ttl_spawn_failures
ttl_spawn_recovered
ttl_spawn_critical_fail
ttl_spawn_reliability
```

Tests:

```text
test_ttl_failsafe.py
```

Resultado:

```text
5/5 tests passed
TTL FAILSAFE PRODUCTION-READY
```

Commit reportado:

```text
d8b2b93 - Phase 2: TTL Failsafe - Double-Layer Protection
```

---

# 27. Client hardening en VS Code

Archivo:

```text
src/extension.ts
```

Se endureció el cliente.

## Capas implementadas

### 27.1 Multi-stream collision fix

Problema:

```text
Usuario manda mensaje A
Luego mensaje B
Stream A y B se mezclan
```

Fix:

```ts
currentEventSource
currentRequestId
```

Cerrar stream anterior antes de abrir otro.

### 27.2 Exponential backoff

```text
1s → 2s → 4s → 8s
```

### 27.3 UI dedup

```ts
seenEvents.has(requestId + seq)
```

### 27.4 Batching

Render cada:

```text
50ms
```

para evitar flickering.

### 27.5 Stale detection

Si no llegan eventos en:

```text
10s
```

forzar reconnect.

### 27.6 UX states

```text
connected
reconnecting
failed
done
```

---

# 28. Chaos testing framework

Se dejó pendiente formalizar la suite de chaos testing, pero se creó una base:

```text
backend/chaos_e2e_test.py
backend/validate_resilience.py
CHAOS_TEST_GUIDE.md
```

Objetivo:

```text
romper el sistema a propósito
```

Escenarios propuestos:

```text
TTL spawn failure storm
listener flapping hell
reconnect storm + dedup
zombie task simulation
kill while streaming
```

Quedó como pendiente recordado:

```text
Implementar chaos testing suite formal.
```

---

# 29. Fases finales consolidadas

## Fase 1 — Motor de contexto del workspace

Objetivo:

> indexar workspace y recuperar contexto relevante.

Hecho:

```text
workspace_indexer.py
prompt_builder.py
/index-workspace
/indexing-status
/get-context
ChromaDB embeddings
```

Resultado:

```text
11.5x más contexto
búsqueda semántica sub-5ms
```

---

## Fase 2 — Chat en tiempo real

Objetivo:

> sidebar profesional con streaming.

Hecho:

```text
src/extension.ts
/chat-stream
SSE
token streaming
contexto del archivo activo
tema dark/light
```

---

## Fase 3 — Multi-lenguaje

Objetivo:

> detectar lenguaje y ajustar prompts.

Hecho:

```text
language_detector.py
17 lenguajes soportados
manual selector
language hints
```

Lenguajes:

```text
Python
JavaScript
TypeScript
Rust
Go
Java
C#
C++
Ruby
PHP
Swift
Kotlin
etc.
```

---

## Fase 4 — Hardening & resiliencia

Objetivo:

> convertir el sistema en robusto.

Hecho:

```text
listener tracking
event buffer
metrics
grace period
TTL failsafe
client hardening
dedup/coalescing
request_id tracing
background recovery
```

---

# 30. Endpoints importantes

```text
POST /route-request
POST /chat
GET  /stream/{request_id}
GET  /result/{request_id}
GET  /metrics
GET  /registry-metrics
POST /index-workspace
GET  /indexing-status
POST /get-context
GET  /health
```

---

# 31. Arquitectura final

```text
VS Code Sidebar / Web Viewer
        ↓
POST /route-request
        ↓
Intent Router
        ↓
request_id global
        ↓
Request Registry
        ↓
Orchestrator task en background
        ↓
Execution Engine / Tools / Ollama
        ↓
push_event(seq,type,data)
        ↓
/stream/{request_id}
        ↓
Clientes SSE
```

Diagrama extendido:

```text
             ┌──────────────────────┐
             │   VS Code Webview     │
             └──────────┬───────────┘
                        │
                        ▼
             ┌──────────────────────┐
             │   /route-request      │
             └──────────┬───────────┘
                        │ request_id
                        ▼
             ┌──────────────────────┐
             │    Intent Router      │
             └──────────┬───────────┘
                        │
          ┌─────────────┴─────────────┐
          │                           │
          ▼                           ▼
       CHAT                        ACTION
          │                           │
          ▼                           ▼
   ChatHandler                Orchestrator Task
                                      │
                                      ▼
                              Request Registry
                                      │
                    ┌─────────────────┼────────────────┐
                    ▼                 ▼                ▼
             Event Buffer        Listeners        Metrics
                    │                 │                │
                    ▼                 ▼                ▼
              Late Joiners       Live SSE        /metrics
```

---

# 32. Principales aciertos

## Acierto 1 — Separar chat de action

Se dejó de depender del LLM para decidirlo todo.

## Acierto 2 — request_id como identidad global

Permitió:

```text
tracing
streaming
polling
dedup
metrics
debug
```

## Acierto 3 — Non-blocking architecture

Se abandonó request/response bloqueante.

## Acierto 4 — Streaming SSE en vez de WebSocket

Decisión correcta para flujo unidireccional.

## Acierto 5 — Coalescing

```text
75 requests → 1 execution
```

Esto es un patrón avanzado.

## Acierto 6 — Observabilidad

Métricas reales, no solo logs.

## Acierto 7 — Hardening del cliente

Se entendió que backend perfecto + cliente nervioso = sistema roto.

---

# 33. Principales fallos encontrados

## Fallo 1 — LLM como planner/chat/executor todo en uno

Síntoma:

```text
DeepSeek negaba tools, respondía en inglés, devolvía código en vez de ejecutar.
```

Corrección:

```text
IntentRouter determinístico.
```

## Fallo 2 — Context type mismatch

`StepContext` vs `dict`.

Corrección:

```python
context.get_all()
```

## Fallo 3 — success hardcoded

Corrección:

```python
execution_result.get("success", False)
```

## Fallo 4 — Zombie threads por wait_for + run_in_executor

Corrección:

```text
timeouts reales en I/O
arquitectura background
no cancel falso
```

## Fallo 5 — `/chat` bypassed router

Corrección:

```text
todos los requests pasan por handle_user_request.
```

## Fallo 6 — Pipelines desconectados

`/route-request` no devolvía `request_id`.

Corrección:

```text
request_id global y consistente.
```

## Fallo 7 — endpoint bloqueante

Corrección:

```text
fire-and-stream.
```

## Fallo 8 — Cancelación agresiva

Corrección:

```text
grace period + double-check.
```

## Fallo 9 — TTL existía pero podía no correr

Corrección:

```text
TTL failsafe primary + fallback.
```

## Fallo 10 — Cliente podía mezclar streams

Corrección:

```text
currentEventSource + currentRequestId.
```

---

# 34. Métricas importantes reportadas

```text
App logic: <1ms
HTTP layer: ~35-50ms
Streaming connect: ~12ms
Endpoint response: ~34ms
Dedup efficiency: 98.7%
Load test: 75 concurrent
Success rate: 100%
Average latency: 37.7ms
TTL failsafe tests: 5/5 passing
```

---

# 35. Estado final del proyecto

## Lo que ya está sólido

```text
Backend FastAPI
Intent Router
Orchestrator
ExecutionEngine
RequestRegistry
SSE streaming
Dedup/coalescing
Event buffer
Metrics
TTL failsafe
Client hardening
Workspace indexing
Multi-language support
```

## Lo que sigue siendo riesgo

```text
Persistencia en memoria únicamente
Redis pendiente
File watcher / indexing incremental pendiente
Chaos suite formal pendiente
LLM fallback model pendiente
Ollama availability depende del entorno local
```

---

# 36. Nivel de madurez estimado

Durante el chat se estimó algo así:

```text
Inicial: 5/10 beta con riesgos
Después de Phase 1 hardening: 6.7/10
Después de TTL + client hardening: 8/10+
```

Estado honesto:

```text
Backend:        8.5/10
Cliente:        8/10
Resiliencia:    8.5/10
Observabilidad: 8/10
Global:         ~8.3/10
```

---

# 37. Pendientes recomendados

## Pendiente 1 — Chaos testing suite formal

Crear comando único:

```text
make chaos-test
```

o script:

```text
python chaos_e2e_test.py
```

Debe romper:

```text
TTL spawn
stream disconnects
flapping
zombie tasks
dedup storms
```

## Pendiente 2 — Redis

Mover a Redis:

```text
event buffer
dedup registry
pub/sub
request state
```

## Pendiente 3 — Indexing incremental

Agregar:

```text
watchdog
file change detection
embedding invalidation
incremental reindex
```

## Pendiente 4 — LLM resilience

Agregar:

```text
retry
timeout explícito
fallback model
partial response
```

## Pendiente 5 — Producto/UX

Mejorar:

```text
markdown rendering
code blocks
insert into editor
diff view
cancel button
status timeline
```

---

# 38. Conclusión ejecutiva

Este chat documenta la evolución de un proyecto desde un asistente local funcional pero frágil, hacia una arquitectura mucho más seria:

```text
local AI assistant
+ workspace context
+ deterministic routing
+ background orchestration
+ SSE streaming
+ request coalescing
+ resilience
+ metrics
+ client hardening
```

La mayor lección técnica fue:

> No hay que esperar al LLM. Hay que diseñar un sistema que sobreviva a un LLM lento, confuso o fallido.

La mayor lección arquitectónica fue:

> El request_id es la identidad del sistema. Si no se propaga bien, streaming, recovery, metrics y tracing se rompen.

La mayor lección de producto fue:

> Backend robusto no basta. El cliente debe ser igual de resiliente.

Y la mayor evidencia de madurez fue pasar de:

```text
“haz que responda”
```

a:

```text
“haz que no se rompa bajo reconexiones, timeouts, usuarios concurrentes y fallos del modelo”
```

---

# 39. Frase final para la autopsia

> Este proyecto comenzó como una extensión local de VS Code con IA, pero evolucionó hacia un backend de orquestación resiliente, con streaming, deduplicación, recuperación en background, métricas y hardening de cliente. La autopsia muestra que los mayores avances no fueron nuevas features, sino la corrección de fallos arquitectónicos: separar chat de acción, desacoplar request de ejecución, propagar identidad global con request_id y hacer el sistema observable y tolerante a fallos.