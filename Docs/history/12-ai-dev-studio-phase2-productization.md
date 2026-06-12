# AI Dev Studio / AI Dev Assistant — Forensic Project Audit

## 1. Executive Summary

AI Dev Studio evolved from a local AI coding assistant experiment into a broader developer productivity platform concept.

The original ambition was not simply to create a chat interface. The project attempted to become a local-first AI development environment capable of:

* reviewing code
* fixing code
* generating code
* scaffolding files or project structures
* supporting multiple programming languages
* integrating with local LLMs
* running on low-resource hardware
* eventually supporting orchestration, agents, memory, recovery, resilience, and observability

The project passed through several identities and technical directions:

1. **Local agential development environment**
2. **AI Dev Assistant inside VS Code**
3. **Multi-agent local assistant**
4. **AI Dev Assistant with advanced orchestration**
5. **AI Dev Assistant V2 / AI Dev Studio**, refocused into a cleaner, modular architecture

The major architectural pivot was moving away from a monolithic “review and fix” flow toward a modular platform organized around capabilities:

* review
* fix
* generate
* scaffold
* explain
* refactor
* test generation

The current thread focused on the V2 direction: a leaner FastAPI + vanilla frontend application with language handlers, review/fix flows, diff generation, latency metrics, and future C# support.

## 2. Origin From Previous Chats

This project did not start in the current chat.

It came from previous conversations where the user had already explored and documented several related projects:

### Previous project: `dev-env`

Path mentioned:

```text
C:\Users\Administrator\proyectos\dev-env
```

Purpose:

Build a free, local, privacy-preserving AI development environment using:

* VS Code
* Continue
* Ollama
* Qwen code models
* Engram for persistent memory

This earlier project focused on setting up a local development environment where an AI assistant could help with coding while keeping data private and local.

### Previous project: `ai-dev-assistant-vscode`

This project attempted to build a native VS Code extension with:

* sidebar/webview UI
* FastAPI backend
* Ollama integration
* contextual code analysis
* local AI chat
* memory/vector storage
* commands such as analyze, generate, and review

Known issue from that stage:

```text
There is no data provider registered that can provide view data.
```

This indicated VS Code view/provider wiring problems, likely around contribution points, activation events, or the registration of the webview/tree provider.

### Previous project: multi-agent local assistant

A later iteration expanded the idea into multi-agent orchestration.

The project began exploring:

* local agents
* scheduling
* event logs
* timelines
* persistent queues
* checkpointing
* recovery
* distributed or semi-distributed execution patterns

Several backend files were mentioned in previous work, including concepts such as:

```text
checkpoint_manager
distributed_scheduler
persistent_queue
event_log
orchestrator
execution_graph
global_timeline
timeline_engine
breakpoint_engine
state_rebuilder
```

This stage became technically ambitious but also more fragile.

### Master Autopsy decision

A prior chat concluded that the older project needed to be documented and partially retired into a historical record.

The user and assistant agreed to produce:

```text
00-MASTER-AUTOPSY.md
```

Purpose:

Document the full evolution, failures, architectural pivots, and lessons learned before starting a cleaner V2.

## 3. What AI Dev Studio Was Trying To Become

AI Dev Studio was trying to become a local-first AI development platform.

It was intended to be more than:

* a chatbot
* a prompt wrapper
* a simple code reviewer
* a toy VS Code extension

The long-term product vision included:

* local execution
* local model support
* code review
* code fixing
* code generation
* project scaffolding
* language-specific behavior
* agentic workflows
* persistent memory
* recovery from failures
* orchestration
* observability
* performance tracking
* resilience under low-resource hardware constraints

The product direction became:

```text
AI-assisted software engineering tool
rather than
simple AI chat interface
```

## 4. How It Differed From Previous AI Dev Assistant Versions

Earlier versions were more experimental and monolithic.

They tried to combine:

* VS Code extension UI
* FastAPI backend
* Ollama
* memory
* multi-agent execution
* orchestration
* timelines
* queueing
* checkpointing

This caused complexity to grow quickly.

The newer AI Dev Studio / V2 direction is different because it emphasizes:

* modular backend structure
* capability-based architecture
* explicit use cases
* handlers per language
* separation of API, use cases, services, infrastructure, prompts, and utilities
* avoiding premature over-engineering
* scaling features gradually

The new philosophy is:

```text
Start with stable review/fix.
Then add generation.
Then scaffold.
Then orchestration.
```

Not:

```text
Build agents, memory, orchestration, extension, and product UI all at once.
```

## 5. Timeline Reconstruction

### Phase 0 — Local AI Development Environment

Approximate source: previous chat.

Goal:

Create a local AI development environment using VS Code and local models.

Technologies involved:

* Windows 11
* VS Code
* Continue
* Ollama
* Qwen code models
* Engram
* local memory

Project path:

```text
C:\Users\Administrator\proyectos\dev-env
```

Main goal:

Have a private, free AI coding environment without depending on cloud AI services.

Status:

Partial / exploratory.

Key lesson:

Local-first development is possible, but setup complexity becomes significant when combining editor extensions, model runtimes, memory tools, and orchestration.

---

### Phase 1 — VS Code AI Dev Assistant

Approximate source: previous chat.

Goal:

Build a VS Code extension called AI Dev Assistant.

Features attempted:

* VS Code sidebar
* webview
* chat interface
* FastAPI backend
* Ollama integration
* code analysis commands
* code generation commands

Known package identity:

```json
{
  "name": "ai-dev-assistant-vscode",
  "displayName": "AI Dev Assistant",
  "description": "Local AI assistant for development"
}
```

Important issue:

```text
There is no data provider registered that can provide view data.
```

This suggested a frontend-extension architecture problem, not necessarily an AI problem.

Likely causes:

* provider not registered
* activation event mismatch
* incorrect view ID
* webview provider not bound correctly
* contribution mismatch in `package.json`

Status:

Partial.

Major lesson:

VS Code extension development adds a separate layer of complexity. Before building the extension, the backend and product capability model should be stable.

---

### Phase 2 — Chat AI in VS Code

Approximate source: previous chat.

Goal:

Make the assistant actually respond through the VS Code interface.

Progress:

The chat began responding successfully.

Architecture at this stage included:

* VS Code UI
* FastAPI backend
* Ollama
* code assistant behavior
* local-first operation

A summary from that stage described the system as:

```text
AI Dev Assistant is a complete, local and scalable solution that integrates:
- Native VS Code interface
- FastAPI backend
- code AI with Ollama
- persistent vector memory
- code analysis, generation and review
- real-time contextual chat
- 100% private and without cloud dependencies
```

Status:

Partially successful.

Major lesson:

The project proved the feasibility of local chat and backend integration, but the architecture still needed stronger boundaries.

---

### Phase 3 — Multi-Agent Local Assistant

Approximate source: previous chat.

Goal:

Expand from a simple assistant to a multi-agent development system.

Concepts introduced:

* agents
* orchestrator
* scheduler
* persistent queues
* execution graph
* event log
* timeline
* breakpoints
* state rebuild/recovery

Likely files or modules mentioned:

```text
backend/app/main.py
checkpoint_manager
distributed_scheduler
persistent_queue
event_log
orchestrator
execution_graph
global_timeline
timeline_engine
breakpoint_engine
state_rebuilder
```

This phase attempted to move into advanced agentic orchestration.

Status:

Partial / complex / likely unstable.

Major lesson:

The system started showing signs of architectural overload. Too many advanced systems were introduced before the core product loop was stable.

---

### Phase 4 — Advanced Orchestration / Recovery / Timeline Work

Approximate source: previous chats.

Goal:

Make the assistant resilient and stateful.

Systems explored:

* checkpointing
* state recovery
* event logs
* global timeline
* timeline engine
* breakpoint engine
* persistent queues
* scheduler
* state rebuilder

This phase introduced production-engineering ideas into the project.

Status:

Partial.

Important technical direction:

The project was no longer only about AI prompts. It became a distributed-systems-style local orchestration experiment.

Major lesson:

The user demonstrated strong systems thinking, but the architecture required documentation, simplification, and a V2 reset.

---

### Phase 5 — Autopsy and Reset Decision

Approximate source: previous chat.

Goal:

Stop accumulating complexity and document what had happened.

Decision:

Create historical documents under:

```text
docs/history/
```

Mentioned historical files:

```text
01-dev-env-error-webview-vscode.md
02-ai-dev-assistant-chat-ai-vscode.md
03-ai-dev-assistant-multiagentes-local.md
04-ai...
```

The user wanted a master document:

```text
00-MASTER-AUTOPSY.md
```

Purpose:

Capture failures, successes, technologies, decisions, phases, and lessons.

Status:

Completed as a strategic pivot.

Major decision:

Start a cleaner V2 instead of continuing to patch the overloaded version.

---

### Phase 6 — AI Dev Assistant V2 / AI Dev Studio

Source: current chat context.

Goal:

Build a cleaner, modular local-first AI coding assistant.

Current core capabilities:

* code review
* code fix
* diff generation
* multi-language support
* low-resource optimization
* local LLM support
* simple frontend
* FastAPI backend

Current architecture:

Backend:

* Python
* FastAPI
* `review_and_fix` endpoint
* `CodeReviewService`
* `CodeFixService`
* `LanguageHandler`
* `PythonHandler`
* `JavaScriptHandler`
* `generate_diff()` using `difflib`

Frontend:

* vanilla JavaScript
* HTML
* CSS
* language selector
* code textarea
* review button
* clear button
* loading indicator
* review output
* fix output
* diff output
* copy fix button
* responsive card-based layout

Status:

Working and demo-ready for review/fix.

---

### Phase 7 — Phase 2 Productization

Source: current chat.

Current roadmap:

```text
Phase 2 — Productize the core
```

Tasks:

1. Polish JavaScript behavior
2. Measure latency
3. Add C# support

Known gaps:

* JavaScript output sometimes includes unnecessary changes
* JavaScript review quality is model-dependent
* latency has not yet been measured
* C# support is not implemented yet

Decision made:

Add timing metrics to backend:

```json
{
  "metrics": {
    "review_time_ms": 842,
    "fix_time_ms": 1260,
    "total_time_ms": 2108
  }
}
```

Recommended implementation:

Use Python’s:

```python
perf_counter()
```

Status:

Planned / ready to implement.

---

### Phase 8 — Architecture Refactor for Scalability

Source: current chat.

Important user concern:

The user correctly identified that future features such as scaffold generation and function generation should not all be placed inside `reviewAndFix`.

This triggered an architectural correction.

New principle:

```text
review_and_fix should be a composed use case, not the center of the application.
```

Recommended structure:

```text
app/
├── main.py
├── api/
│   └── routes/
│       ├── review.py
│       ├── fix.py
│       └── review_fix.py
├── schemas/
│   ├── review.py
│   ├── fix.py
│   └── review_fix.py
├── use_cases/
│   ├── review_code.py
│   ├── fix_code.py
│   └── review_and_fix_code.py
├── handlers/
│   ├── language_handler.py
│   ├── python_handler.py
│   ├── javascript_handler.py
│   └── csharp_handler.py
├── services/
│   ├── diff_service.py
│   ├── timing_service.py
│   └── language_handler_factory.py
├── infrastructure/
│   └── llm/
│       └── ollama_client.py
├── prompts/
│   ├── python/
│   ├── javascript/
│   └── csharp/
└── utils/
    ├── json_parser.py
    └── code_cleaner.py
```

Status:

Architectural design completed. Implementation pending.

Major lesson:

The project should be organized by product capability, not by one endpoint.

## 6. Technical Architecture

## 6.1 Backend Architecture

Current backend stack:

* Python
* FastAPI
* service classes
* language handlers
* diff generation
* planned timing metrics

Current core endpoint:

```text
review_and_fix
```

Current flow:

```text
Request
  ↓
FastAPI endpoint
  ↓
CodeReviewService
  ↓
LanguageHandler.review()
  ↓
LLM
  ↓
Review JSON
  ↓
CodeFixService
  ↓
LanguageHandler.fix()
  ↓
LLM
  ↓
Fixed code
  ↓
generate_diff()
  ↓
Response
```

Current response shape:

```json
{
  "review": {},
  "fixed_code": "",
  "diff": ""
}
```

Planned response shape:

```json
{
  "review": {},
  "fixed_code": "",
  "diff": "",
  "metrics": {
    "review_time_ms": 0,
    "fix_time_ms": 0,
    "total_time_ms": 0
  }
}
```

Architectural issue identified:

The endpoint should not contain business logic.

Recommended target flow:

```text
API route
  ↓
ReviewAndFixCodeUseCase
  ↓
ReviewCodeUseCase
  ↓
FixCodeUseCase
  ↓
DiffService
  ↓
TimingService
  ↓
Response schema
```

## 6.2 Frontend Architecture

Current frontend stack:

* vanilla JavaScript
* HTML
* CSS

Current UI features:

* required language selector
* code input textarea
* review/fix button
* clear button
* loading state
* review result panel
* fix result panel
* diff result panel
* copy fixed code button
* scrollable cards
* responsive layout

Frontend behavior:

```text
User selects language
  ↓
User pastes code
  ↓
User clicks Review/Fix
  ↓
Frontend calls backend
  ↓
Backend returns review/fix/diff
  ↓
Frontend renders:
    - JSON review
    - highlighted fixed code
    - colored diff
    - metrics, planned
```

Planned frontend additions:

* C# in selector
* metrics panel
* better handling of empty or invalid responses
* eventually separate UI modes:

  * Review
  * Fix
  * Generate
  * Scaffold

## 6.3 LLM Integration

Current model strategy:

* local-first
* Ollama-compatible
* optimized for low-resource machines
* model-dependent output quality

LLM usage:

* review prompt
* fix prompt

Known risks:

* invalid JSON
* markdown fences around code
* over-refactoring
* unnecessary formatting changes
* hallucinated issues
* inconsistent language-specific behavior

Mitigations discussed:

* stricter prompts
* conservative fix instructions
* JSON-only review responses
* code fence stripping
* fallback JSON response
* return original code if no issues exist
* post-processing for suspiciously short output

## 6.4 Agent Architecture

Earlier versions explored agent architecture more heavily than the current V2.

Concepts included:

* orchestrator
* distributed scheduler
* execution graph
* persistent queue
* event log
* timeline engine
* breakpoint engine
* state rebuilder

Current V2 does not yet implement the full agent system.

Instead, V2 is moving toward capability-based use cases first.

Recommended future agent model:

```text
User request
  ↓
Intent router
  ↓
Capability use case
  ↓
Language handler
  ↓
LLM/tool executor
  ↓
Validation
  ↓
Result
```

Future agents could include:

* ReviewerAgent
* FixerAgent
* GeneratorAgent
* ScaffoldAgent
* TestAgent
* ExplainerAgent
* RefactorAgent

But current recommendation is to avoid adding agents until the basic capability architecture is stable.

## 6.5 Orchestration Flow

Previous orchestration concepts:

```text
Request
  ↓
Orchestrator
  ↓
Execution graph
  ↓
Scheduler
  ↓
Agent/task execution
  ↓
Event log
  ↓
Checkpoint manager
  ↓
Timeline
  ↓
Recovery/state rebuild
```

Current V2 orchestration:

Simple sequential orchestration:

```text
review → fix → diff
```

Recommended V2 orchestration:

Use case composition:

```text
ReviewAndFixCodeUseCase
  ├── ReviewCodeUseCase
  ├── FixCodeUseCase
  ├── DiffService
  └── TimingService
```

This gives a clean path to future orchestration without reintroducing complexity too early.

## 6.6 Memory Systems

Earlier versions referenced:

* Engram
* persistent memory
* vector memory
* contextual memory

Purpose:

* remember prior code context
* maintain project knowledge
* improve assistant continuity
* support richer local development assistance

Current V2 status:

Memory is not part of the active minimal review/fix loop.

Recommended future memory design:

```text
memory/
├── project_memory.py
├── conversation_memory.py
├── vector_store.py
├── memory_indexer.py
└── memory_retriever.py
```

Suggested memory use cases:

* remember project architecture
* retrieve relevant files
* store prior fixes
* store user preferences
* store language/project conventions

Status:

Previously explored. Not yet reintroduced in V2.

## 6.7 Streaming Systems

Earlier versions mentioned real-time contextual chat.

Streaming was likely relevant for:

* chat responses
* long-running LLM outputs
* progress updates
* agent execution logs

Current V2 status:

No confirmed streaming implementation in this current thread.

Recommended future streaming architecture:

```text
API
  ↓
Streaming endpoint / WebSocket / SSE
  ↓
LLM token stream
  ↓
Frontend live rendering
```

Possible use cases:

* live generation
* long scaffold operations
* agent execution logs
* review progress
* model latency visualization

Status:

Potential future enhancement.

## 6.8 Recovery Systems

Earlier architecture included recovery concepts:

* checkpoint manager
* persistent queue
* event log
* state rebuilder
* timeline engine
* breakpoint engine

Purpose:

* recover interrupted tasks
* replay execution state
* debug agent workflows
* resume long-running operations
* avoid losing progress

Current V2 status:

Not yet implemented.

Recommended future approach:

Do not reintroduce the full recovery system immediately.

Start with:

* request logs
* operation IDs
* saved input/output payloads
* simple checkpoint per operation
* retry-safe task records

Then evolve to full state rebuilding later.

## 6.9 Resilience Systems

Earlier versions explored production-style resilience.

Mentioned or implied systems:

* checkpointing
* persistent queues
* recovery
* scheduling
* state rebuild
* chaos testing
* timeout handling
* degradation

Current V2 needs:

* timeout handling for LLM calls
* frontend loading state timeout
* backend response validation
* model failure fallback
* safe JSON parser
* concurrency control
* resource protection

## 7. Major Features Implemented

## 7.1 Code Review

Purpose:

Analyze code and return structured issues.

Architecture:

```text
CodeReviewService
  ↓
LanguageHandler.review()
  ↓
LLM prompt
  ↓
JSON response
```

Files involved or proposed:

```text
app/services/code_review_service.py
app/handlers/language_handler.py
app/handlers/python_handler.py
app/handlers/javascript_handler.py
app/prompts/{language}/review.txt
app/schemas/review.py
```

Status:

Completed for Python. Experimental for JavaScript.

## 7.2 Code Fix

Purpose:

Use the review result to produce corrected code.

Architecture:

```text
CodeFixService
  ↓
LanguageHandler.fix()
  ↓
LLM prompt
  ↓
fixed code
```

Files involved or proposed:

```text
app/services/code_fix_service.py
app/handlers/python_handler.py
app/handlers/javascript_handler.py
app/prompts/{language}/fix.txt
app/schemas/fix.py
```

Status:

Working. JavaScript still needs conservative prompt tuning.

## 7.3 Review And Fix Flow

Purpose:

Run review, run fix, and return diff.

Architecture:

```text
review_and_fix endpoint
  ↓
review service
  ↓
fix service
  ↓
generate_diff()
  ↓
response
```

Status:

Working and demo-ready.

Architectural concern:

This should become a composed use case, not a central monolithic endpoint.

Recommended future file:

```text
app/use_cases/review_and_fix_code.py
```

## 7.4 Diff Generation

Purpose:

Show what changed between original and fixed code.

Technology:

```python
difflib
```

Files involved:

```text
generate_diff()
diff_utils.py or diff_service.py
```

Recommended future location:

```text
app/services/diff_service.py
```

Status:

Working.

## 7.5 Multi-Language Handler Architecture

Purpose:

Support multiple languages without duplicating endpoint logic.

Current handlers:

```text
LanguageHandler
PythonHandler
JavaScriptHandler
```

Planned:

```text
CSharpHandler
```

Architecture:

```text
LanguageHandlerFactory
  ↓
language-specific handler
  ↓
review/fix/generate/scaffold capability
```

Status:

Partially implemented. Python stable, JavaScript experimental, C# planned.

## 7.6 JavaScript Support

Purpose:

Allow JavaScript review and fix.

Status:

Experimental but usable.

Known issues:

* unnecessary changes
* model-dependent output
* occasional imperfect review

Recommended improvements:

* stricter prompt
* conservative fix rules
* no refactor unless required
* preserve identifiers
* preserve formatting
* strip markdown fences
* return original code if no issues exist

## 7.7 C# Support

Purpose:

Add C# as the next supported language.

Planned files:

```text
app/handlers/csharp_handler.py
app/prompts/csharp/review.txt
app/prompts/csharp/fix.txt
```

Review focus:

* null handling
* async/await misuse
* exception handling
* resource disposal
* LINQ misuse
* syntax problems
* maintainability

Status:

Planned.

## 7.8 Latency Metrics

Purpose:

Measure model and backend performance.

Planned metrics:

```text
review_time_ms
fix_time_ms
total_time_ms
```

Technology:

```python
perf_counter()
```

Recommended file:

```text
app/services/timing_service.py
```

Status:

Planned.

## 7.9 Frontend Result Panels

Purpose:

Make output readable and demo-friendly.

Implemented panels:

* review JSON
* fixed code
* colored diff

Additional UI:

* copy fix button
* loading indicator
* responsive layout
* scrollable cards

Status:

Working.

## 7.10 Project Scaffolding

Purpose:

Generate files/folders/project structure.

Status:

Planned future feature.

Important architectural note:

Scaffolding must not be placed inside `review_and_fix`.

Recommended future files:

```text
app/api/routes/scaffold.py
app/use_cases/scaffold_project.py
app/schemas/scaffold.py
app/prompts/{language}/scaffold.txt
```

## 7.11 Code Generation

Purpose:

Generate functions, components, or code blocks from natural language.

Status:

Planned for Phase 3.

Recommended future files:

```text
app/api/routes/generate.py
app/use_cases/generate_code.py
app/schemas/generate.py
app/prompts/{language}/generate.txt
```

## 8. Production Engineering Work

## 8.1 Resource Protection

Relevant because the system targets low-resource machines and local models.

Needed protections:

* limit prompt size
* limit code input size
* timeout LLM calls
* avoid concurrent overload
* prevent multiple simultaneous expensive operations
* return friendly failure messages

Status:

Recognized need. Not fully implemented in V2.

## 8.2 Auto-Degradation

Purpose:

Keep the system usable when local hardware or model performance is limited.

Possible degradation strategies:

* skip fix if review fails
* return review only when fix times out
* disable scaffold on low memory
* reduce context size
* use smaller model
* switch to simpler prompts
* show partial result

Status:

Conceptual / future.

## 8.3 Checkpointing

Earlier versions had references to:

```text
checkpoint_manager.save
checkpoint_manager.load
```

Purpose:

Save execution state and resume/recover later.

Status:

Explored in earlier orchestration-heavy versions. Not yet reintroduced in V2.

## 8.4 Recovery

Earlier systems referenced:

```text
state_rebuilder
event_log
persistent_queue
timeline_engine
```

Purpose:

Recover after crash/interruption.

Status:

Partial in previous versions. Future V2 should start simpler.

Recommended first step:

Store operation records:

```text
operation_id
input
language
status
started_at
completed_at
error
review_result
fixed_code
diff
metrics
```

## 8.5 Observability

Current planned observability:

* latency metrics
* review time
* fix time
* total time

Recommended future observability:

* operation logs
* LLM call logs
* error category
* model name
* token count if available
* input size
* output size
* timeout count
* retry count

Status:

Latency metrics planned.

## 8.6 Chaos Testing

The user previously wanted to implement a chaos testing suite.

Purpose:

Intentionally break backend systems and validate robustness.

Possible chaos tests:

* LLM timeout
* invalid JSON
* empty response
* corrupted checkpoint
* queue failure
* frontend disconnect
* model unavailable
* high concurrency
* oversized input
* partial stream interruption

Status:

Planned / remembered as future work.

## 8.7 Security Controls

Security risks:

* arbitrary code input
* prompt injection
* local file access if scaffold/generation later writes files
* accidental overwrite
* exposing local paths
* unsafe shell execution if future agents run commands

Recommended controls:

* never execute generated code automatically
* explicit confirmation before file writes
* sandbox path restrictions
* max input size
* no arbitrary shell commands without approval
* safe file creation policy
* audit log for scaffold operations

Status:

Not fully implemented. Important for future scaffold/generation features.

## 8.8 Timeout Handling

Needed for:

* local LLM calls
* slow models
* large code input
* frontend waiting states

Recommended:

```text
LLM timeout
request timeout
frontend timeout display
retry policy
partial fallback
```

Status:

Not yet confirmed implemented.

## 8.9 Concurrency Controls

Needed because local models are resource-heavy.

Recommended:

* one active generation per session
* backend semaphore
* queue for long-running operations
* reject or defer excessive requests
* per-operation status

Status:

Not yet confirmed implemented.

## 9. Lessons Learned

## 9.1 Technical Lessons

1. Local AI coding assistants are feasible.
2. Ollama-based workflows can support private development assistance.
3. LLM output must be validated aggressively.
4. JSON-only prompts still need fallback parsers.
5. Code fences must be stripped from model responses.
6. Diff generation is simple but highly valuable for UX.
7. Language-specific prompts are necessary.
8. JavaScript and C# require different review priorities than Python.
9. A working demo can be built with FastAPI and vanilla JS.
10. The system should separate AI logic from API routes.

## 9.2 Architectural Lessons

1. Do not build the whole product around `review_and_fix`.
2. Organize by capabilities, not endpoints.
3. Use cases are essential for scale.
4. Handlers should be language-specific.
5. Prompts should eventually live outside Python code.
6. Agents should not be introduced before the core capability model is stable.
7. Recovery/orchestration systems need a clear reason to exist.
8. VS Code extension work should come after backend stabilization.
9. Modular architecture avoids future rewrites.
10. `review_and_fix` is a workflow, not the platform.

## 9.3 Hardware Limitations Discovered

Because the project targets low-resource machines and local LLMs, likely limitations include:

* slow response times
* model latency
* memory pressure
* limited concurrency
* long prompts causing delays
* inconsistent model quality
* local model selection tradeoffs

This is why latency metrics became important.

## 9.4 Tradeoffs Made

### Simplicity vs power

The project moved away from highly complex orchestration toward a smaller, more reliable core.

### Local-first vs cloud quality

Local models preserve privacy and cost control but can have weaker consistency than premium cloud models.

### Vanilla frontend vs complex frontend framework

Using vanilla JS keeps the app lightweight and easier to debug.

### Sequential flow vs agentic workflow

Current V2 uses simple review → fix → diff sequencing. This is less powerful than agents but much easier to stabilize.

### Modular architecture vs speed

Refactoring into use cases and services takes longer upfront but prevents future architectural collapse.

## 10. Portfolio Evidence

## 10.1 Strong Portfolio Screenshots

Recommended screenshots:

1. Main UI with language selector, code textarea, and review button.
2. Review result JSON displayed cleanly.
3. Fixed code panel with corrected code.
4. Colored diff panel showing before/after changes.
5. Copy Fix button visible.
6. Responsive card layout.
7. JavaScript example showing conservative fix.
8. C# example once implemented.
9. Metrics panel showing review/fix/total latency.
10. Folder structure showing clean modular architecture.
11. FastAPI docs screen showing endpoints.
12. Terminal running local backend.
13. Ollama/local model running.
14. VS Code project tree with handlers/use cases/prompts folders.
15. Historical `docs/history` folder showing autopsy discipline.

## 10.2 Files That Best Represent The Project

Current / planned important files:

```text
app/main.py
app/api/routes/review.py
app/api/routes/fix.py
app/api/routes/review_fix.py
app/use_cases/review_code.py
app/use_cases/fix_code.py
app/use_cases/review_and_fix_code.py
app/handlers/language_handler.py
app/handlers/python_handler.py
app/handlers/javascript_handler.py
app/handlers/csharp_handler.py
app/services/language_handler_factory.py
app/services/diff_service.py
app/services/timing_service.py
app/infrastructure/llm/ollama_client.py
app/prompts/python/review.txt
app/prompts/python/fix.txt
app/prompts/javascript/review.txt
app/prompts/javascript/fix.txt
app/prompts/csharp/review.txt
app/prompts/csharp/fix.txt
frontend/index.html
frontend/app.js
frontend/styles.css
docs/history/
00-MASTER-AUTOPSY.md
```

Previous advanced architecture files worth preserving as evidence:

```text
checkpoint_manager
distributed_scheduler
persistent_queue
event_log
orchestrator
execution_graph
global_timeline
timeline_engine
breakpoint_engine
state_rebuilder
```

Even if these were abandoned or partially implemented, they demonstrate systems-level experimentation.

## 10.3 Most Impressive Technical Achievements

1. Local-first AI development architecture.
2. FastAPI backend integrated with local LLM flow.
3. Multi-language handler abstraction.
4. End-to-end review → fix → diff flow.
5. Diff visualization.
6. Frontend usability without heavy framework.
7. Recognition of model-dependent output quality.
8. Conservative prompt engineering strategy.
9. Planned latency instrumentation.
10. Architectural pivot from monolith to modular use cases.
11. Previous exploration of checkpointing, recovery, timelines, and orchestration.
12. Willingness to perform technical autopsy instead of hiding failed complexity.
13. Clear roadmap from review/fix to generation/scaffold.
14. Product thinking around recruiter-facing portfolio evidence.

## 11. Final Assessment

If a recruiter looked at this project, several things would stand out.

## 11.1 What Would Stand Out

The project is not just another AI chatbot.

It shows an attempt to build a real developer tool with:

* backend architecture
* frontend UX
* local model integration
* language abstraction
* code review/fix pipeline
* diff generation
* future extensibility
* documentation discipline
* production-engineering awareness

The most impressive part is the evolution: the user encountered complexity, documented it, extracted lessons, and pivoted to a cleaner architecture.

## 11.2 What Demonstrates Senior-Level Thinking

Senior-level thinking appears in these decisions:

* identifying that `review_and_fix` should not become the center of the system
* separating endpoints from business logic
* introducing use cases
* planning services like `DiffService` and `TimingService`
* treating prompts as maintainable assets
* designing language handlers
* recognizing when orchestration is premature
* documenting failures as architectural evidence
* thinking about scalability before adding scaffold/generate features

The strongest senior signal is not just the code. It is the architectural correction.

## 11.3 What Demonstrates Systems Thinking

Systems thinking appears in the earlier and current concerns around:

* orchestration
* checkpointing
* persistent queues
* event logs
* state rebuilding
* timelines
* recovery
* latency
* resource limits
* local hardware constraints
* timeout handling
* chaos testing
* degradation
* observability

Even where these systems were not fully completed, the project shows awareness of how real software behaves under failure.

## 11.4 What Differentiates It From A Simple AI Chat Application

A simple AI chat app usually has:

```text
input box → model → answer
```

AI Dev Studio has or plans:

```text
code input
  ↓
language selection
  ↓
language handler
  ↓
review use case
  ↓
fix use case
  ↓
diff service
  ↓
metrics
  ↓
frontend panels
  ↓
future generate/scaffold capabilities
```

It also includes awareness of:

* local execution
* model limitations
* structured outputs
* parsing failures
* modular architecture
* recovery concepts
* production concerns
* portfolio-grade documentation

This makes it a software engineering project, not just a prompt experiment.

## 12. Recommended Next Step

Before adding more features, the project should implement the modular backend structure.

Recommended immediate sequence:

1. Create `api/routes`.
2. Create `schemas`.
3. Create `use_cases`.
4. Move diff logic into `DiffService`.
5. Add `TimingService`.
6. Keep `review_and_fix` as a composed use case.
7. Move prompts into `prompts/`.
8. Add `CSharpHandler`.
9. Add frontend metrics panel.
10. Validate Python, JavaScript, and C# end-to-end.

After that, begin Phase 3:

```text
Generate Code
```

Then Phase 4:

```text
Scaffold Project
```

Only after those are stable should the project revisit:

* VS Code extension
* agents
* memory
* checkpointing
* orchestration
* streaming
* recovery
* chaos testing

## 13. Final Conclusion

AI Dev Studio is best understood as the second-generation redesign of an ambitious local AI development assistant.

The earlier versions proved many ideas but accumulated too much complexity too quickly. The current direction is stronger because it transforms those lessons into a modular, capability-based architecture.

The project demonstrates:

* persistence through debugging
* ability to learn from failed architecture
* practical product thinking
* local AI engineering
* backend/frontend integration
* systems-level curiosity
* concern for scalability and maintainability

For a technical portfolio, the project should be presented not as a perfect finished product, but as an engineering journey:

```text
Experiment → Failure → Autopsy → Redesign → Modular Product Direction
```

That story is valuable because it shows real engineering maturity.