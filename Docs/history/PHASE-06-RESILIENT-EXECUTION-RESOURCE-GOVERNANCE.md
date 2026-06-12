Findings (each item = exact path, function / fragment, what it is, why it matters, which properties it demonstrates)

- File: project_pipeline.py  
  Function/fragment: `run_pipeline` — checkpoint skeleton creation + initial save (lines ~180–196)  
  Description: Builds initial `checkpoint` object and immediately calls `checkpoint_manager.save(checkpoint)`.  
  Why it matters: Ensures resumability from pipeline start (survives crashes before first step).  
  Demonstrates: Reliability, Fault tolerance, Production hardening.

- File: project_pipeline.py  
  Function/fragment: `run_pipeline` — per‑step checkpoint update and save (lines ~319–323)  
  Description: After each step, updates `current_step`, `context`, step `status`, and persists checkpoint.  
  Why it matters: Incremental persistence allows resume from last successful step and limits rework.  
  Demonstrates: Resilience, Fault tolerance, Reliability.

- File: project_pipeline.py  
  Function/fragment: `run_pipeline` — cancellation branch marking step `cancelled` + save (lines ~228–235)  
  Description: When cancelled, writes cancelled state to checkpoint and saves for operations visibility.  
  Why it matters: Safe operational cancellation with persisted state for correct resume/cleanup.  
  Demonstrates: Fault tolerance, Production hardening.

- File: project_pipeline.py  
  Function/fragment: `run_pipeline` — checkpoint deletion on full success (lines ~354–360)  
  Description: Deletes checkpoint when pipeline completes successfully to avoid stale state.  
  Why it matters: Prevents accumulating obsolete resumable data and reduces disk footprint.  
  Demonstrates: Resource governance, Production hardening.

- File: checkpoint_manager.py  
  Function/fragment: `CheckpointManager.save(self, data)` (lines ~38–50)  
  Description: File-backed JSON write with `created_at`/`updated_at` and basic error logging. Storage path `backend/data/checkpoints/{id}.json`.  
  Why it matters: Concrete persistence mechanism (simple, local, auditable) for resumes.  
  Demonstrates: Reliability, Fault tolerance (basic), Production hardening.

- File: checkpoint_manager.py  
  Function/fragment: `CheckpointManager.load(self, request_id)` (lines ~49–60)  
  Description: Loads JSON checkpoint, returns None if missing, logs errors.  
  Why it matters: Safe detection of resumable state and graceful failure handling.  
  Demonstrates: Reliability, Fault tolerance.

- File: project_pipeline.py  
  Function/fragment: `resume_pipeline` — compute `start_from` (first pending step) (lines ~436–446)  
  Description: Iterates `cp.get("steps", [])` to find first non‑`"done"` step; sets `start_from`.  
  Why it matters: Precise resume entrypoint avoids re-running completed steps and supports idempotent continuation.  
  Demonstrates: Reliability, Fault tolerance.

- File: main.py  
  Function/fragment / endpoint: `@app.post("/resume/{checkpoint_id}")` → `resume_checkpoint` (lines ~906–953)  
  Description: Public resume API: loads checkpoint, creates new request id, registers SSE buffers, spawns async resume task calling `resume_pipeline`. Returns `stream_url`/metadata.  
  Why it matters: Operational interface for resuming pipelines with real‑time SSE streaming.  
  Demonstrates: Reliability, Production hardening, Resource governance (via queue gating).

- File: main.py  
  Function/fragment / endpoint: `@app.get("/checkpoints")` → `list_checkpoints` (lines ~973–981)  
  Description: Lists active (non‑expired) checkpoints with metadata (current step, timestamps).  
  Why it matters: Operations visibility for resumable runs and audit.  
  Demonstrates: Production hardening, Reliability.

- File: system_guard.py  
  Function/fragment: `SystemGuard` (whole file) — thresholds, `should_throttle`, `is_emergency`, `should_block_new_requests` (MAX_RAM_PERCENT, EMERGENCY_RAM, COOLDOWN_SECONDS)  
  Description: Hardware-aware protection measuring CPU/RAM (via psutil) and queue size; returns throttle/block decisions.  
  Why it matters: Protects host from overload (RAM/CPU), prevents system freezes on resource-constrained machines.  
  Demonstrates: Resource governance, Resilience, Production hardening.

- File: project_pipeline.py  
  Function/fragment: `_wait_for_capacity` + usage — queue thresholds + throttling behavior (QUEUE_ABORT, QUEUE_CRITICAL, QUEUE_HIGH, QUEUE_MODERATE) (lines ~539–565 and callers)  
  Description: Uses control stats and `system_guard` to throttle, sleep, or abort pipeline steps based on queue and system pressure.  
  Why it matters: Backpressure/overload protection, graceful degradation of pipeline work under load.  
  Demonstrates: Backpressure handling, Resilience, Production hardening.

- File: system_mode.py  
  Function/fragment: `SYSTEM_MODES` and `max_pipelines` mapping (mode → `max_pipelines`) (lines ~26–40, ~181–182)  
  Description: Adaptive system modes (e.g., conservative performance settings) that tune `max_pipelines`.  
  Why it matters: Hardware-aware execution tuning (lower concurrency on small machines).  
  Demonstrates: Resource governance, Hardware-aware execution, Production hardening.

- File: control_layer_v2.py  
  Function/fragment: queue thresholds and decision logic (contains `QUEUE_CRITICAL` and code rejecting low‑priority tasks when queue large)  
  Description: Central queue control and fairness policy used by pipeline and routers.  
  Why it matters: Centralized queue controls that enforce priority and reject or deprioritize heavy tasks when overloaded.  
  Demonstrates: Queue control, Backpressure handling, Production hardening.

- File: intent_router.py  
  Function/fragment: request blocking/throttling decisions (uses `system_guard.should_block_new_requests()`, checks `control.get_stats().get("queue_size")`, enforces fast‑lane routing)  
  Description: Routes ambiguous requests to fast chat lane; blocks or delays heavy action pipeline when system guard signals emergency. Tracks `degraded_successes` for auto‑degradation metrics.  
  Why it matters: Prevents heavy tasks from overwhelming system; implements auto‑degrade routing for better UX under pressure.  
  Demonstrates: Auto degradation, Resource governance, Reliability.

- File: execution_context.py and `backend/app/step_context` related (files: execution_context.py, execution_engine.py)  
  Function/fragment: memory truncation and `MAX_*` constants (prevents unbounded memory growth; truncates step results)  
  Description: Enforces per‑step and total memory limits in in‑process context storage.  
  Why it matters: Prevents local OOM when storing LLM outputs and step results; key for running on 16GB machines.  
  Demonstrates: Resource governance, Reliability, Production hardening.

- File: decision_engine.py  
  Function/fragment: Execution memory loop detection and skip/retry logic (if tool fails repeatedly, skip)  
  Description: Detects repeated tool failures and prevents retry loops; records failures in execution memory.  
  Why it matters: Prevents wasteful retries and cascading failures.  
  Demonstrates: Fault tolerance, Resilience, Production hardening.

- File: orchestrator.py / design docs (PHASE_10_2_ORCHESTRATOR_DESIGN.md)  
  Function/fragment: orchestration_config includes `memory_budget`, `timeout_per_step`, `max_concurrent_tasks` (config lines)  
  Description: Design-level resource caps and timeouts for steps and overall orchestrations.  
  Why it matters: Architectural policy for enforcing resource/time budgets at orchestration level.  
  Demonstrates: Resource governance, Timeout protection, Production hardening.

- File: checkpoint_manager.py & main.py startup code  
  Function/fragment: `cleanup_expired()` called during startup (main.py lines ~2189–2192)  
  Description: Periodic checkpoint cleanup to remove old checkpoints and free disk resources.  
  Why it matters: Prevents disk accumulation of old data; housekeeping for resource governance.  
  Demonstrates: Resource governance, Production hardening.

Best portfolio screenshot candidates (high value, include code + one-line caption)

- project_pipeline.py — lines showing `MAX_PIPELINES = 1` and `PIPELINE_GLOBAL_TIMEOUT = 180` and `_pipeline_semaphore = asyncio.Semaphore(MAX_PIPELINES)`  
  Caption: "Pipeline concurrency limits and global timeout tuned for low‑memory hosts."

- project_pipeline.py — lines showing `QUEUE_CRITICAL/QUEUE_HIGH/QUEUE_MODERATE/QUEUE_ABORT` and `_wait_for_capacity` sleep/abort logic  
  Caption: "Queue thresholds and backpressure: progressive throttling and partial‑abort under heavy load."

- system_guard.py — definitions `MAX_RAM_PERCENT`, `EMERGENCY_RAM`, `should_throttle`, `is_emergency`, `should_block_new_requests`  
  Caption: "Hardware‑aware guard: CPU/RAM thresholds with emergency blocking to protect the host."

- system_mode.py — mapping of `SYSTEM_MODES` → `max_pipelines` and `system_mode.max_pipelines` usage in pipeline gating  
  Caption: "System modes adapt concurrency to host capacity (hardware‑aware execution)."

- checkpoint_manager.py — `save/load/delete` methods and storage path (`backend/data/checkpoints/*.json`)  
  Caption: "Checkpoint persistence for resume: file‑backed, timestamped snapshots."

- intent_router.py — auto‑degradation helper `generate_simplified_prompt()` and recording `degraded_successes`  
  Caption: "Auto‑degradation flow: simplifies requests automatically when heavy flows fail."

- decision_engine.py — logic that detects repeated tool failures and skips retries  
  Caption: "Failure-suppression: prevents infinite retry loops by skipping repeatedly failing tools."

- execution_context.py — memory truncation constants & truncation logic  
  Caption: "Context memory truncation to bound per‑step memory footprint."

- main.py — `/resume/{checkpoint_id}` endpoint block showing new stream id creation and `asyncio.create_task(_resume_runner())`  
  Caption: "Resume API: spawn resumable pipeline execution with SSE streaming."

Executive summary (phase suggestion + high‑level plan)

- Phase name suggestion: "Phase 11B — Resilient Execution & Local Host Protection"  
- Objective: Protect local host and ensure long-running pipelines are resumable, bounded, and safe to run on constrained machines by adding guardrails (throttles, timeouts, mode tuning), checkpoint/resume, auto‑degradation, and memory limits.  
- Architecture: Local guard layer (`system_guard` + `system_mode`), queue/control layer (`control_layer_v2`), pipeline runner with per‑step checkpointing (`project_pipeline` + `checkpoint_manager`), intent router auto‑degrade, and orchestration policies (timeouts, budgets). Endpoints provide ops control and SSE streaming for visibility.  
- Problems solved: OOMs and freezes under heavy load, runaway queues from slow clients, inability to resume long pipelines after failure, excessive retries and loops, poor UX when heavy tasks fail.  
- Risks mitigated: host resource exhaustion, indefinite memory growth, lost partial progress, noisy retries, and uncontrolled concurrency on small machines.  
- Key lessons learned: enforce conservative defaults on constrained hosts (low `MAX_PIPELINES`), persist per-step state for resumability, prefer simple file-backed checkpoints for local deployments (but plan DB migration), instrument CPU/RAM metrics and use them in adaptive throttling, and add auto‑degradation as a UX safety net.

Documentation → implementation mapping (which docs exist and how they connect)

- AUTO_DEGRADATION_IMPLEMENTATION.md / VALIDATION_AUTO_DEGRADATION.md / test_auto_degradation.py  
  Summary: Detailed design, validation guide and tests for the 3‑tier auto‑degrade fallback. Implementation evidence: intent_router.py has `generate_simplified_prompt()` and metrics counters; tests validate production readiness. Connection: docs ↔ router code + tests proving behavior.

- PRODUCTION_HARDENING.md, PRODUCTION_DEPLOYMENT_READY.md, PRODUCTION_CONCERNS_10_2.md  
  Summary: Production hardening checklist and risk matrix (memory growth, queue safety, metrics). Implementation evidence: execution_context.py (memory truncation), system_guard.py (hardware thresholds), project_pipeline.py backpressure & timeouts. Connection: docs prescribe limits and checks which are implemented across code.

- PHASE_10_2_ORCHESTRATOR_DESIGN.md and PHASE_10_2_IMPLEMENTATION.md  
  Summary: Orchestration resource configs (`memory_budget`, `timeout_per_step`, `max_concurrent_tasks`) and execution policies. Implementation evidence: orchestrator design lines + project_pipeline.py and system_mode.py reflect these constraints. Connection: design → enforcement (config → code).

- PHASE_10_1_STABILITY_REVIEW.md / PHASE_10_1_FROZEN.md / PHASE_10_1_FINAL_IMPLEMENTATION.md  
  Summary: Memory safety invariants and truncation parameters. Implementation evidence: execution_context.py and StepContext enforce truncation and bounded memory usage. Connection: foundational memory constraints from phase 10.1 used by Phase 11B.

- `PHASE_9_3_SUMMARY.md` / PHASE9_3_SECURITY_ARCHITECTURE.md  
  Summary: Rate limiting and security measures (API rate limits). Implementation evidence: references to rate limiter and code comments; orchestrator endpoints include rate check placeholders. Connection: rate limiting and auth complement resource protections.

Best‑of‑the‑repo picks (top candidates for portfolio screenshots)

1. project_pipeline.py — cluster showing: `MAX_PIPELINES`, `_pipeline_semaphore = asyncio.Semaphore(MAX_PIPELINES)`, `PIPELINE_GLOBAL_TIMEOUT` (clearly demonstrates concurrency + timeout).  
2. system_guard.py — shows psutil checks, `MAX_RAM_PERCENT`, `EMERGENCY_RAM`, `should_block_new_requests()` (hardware guard).  
3. project_pipeline.py — `_wait_for_capacity` which applies `system_guard`, sleeps, or aborts (backpressure & abort logic).  
4. checkpoint_manager.py — `save/load/delete` (checkpoint persistence path).  
5. main.py — `/resume/{checkpoint_id}` endpoint showing SSE/new request id spawn (ops interface).  
6. intent_router.py — `generate_simplified_prompt()` and `degraded_successes` logging (auto‑degrade evidence).  
7. execution_context.py — truncation comments and code showing memory safeguards.  
8. decision_engine.py — repeated-failure detection and "skip" logic (circuit-breaker style behavior).

Final note / recommended next artifact (read‑only)

- For portfolio: capture the code blocks listed above (single file views showing the constants + adjacent logic) plus one small diagram or one-line callout tying them together (e.g., “Host protection: system_guard → control_layer → pipeline throttling → checkpointing”). If you want, I can export those exact code excerpts into a single read‑only markdown file (no edits to repo) or generate a PDF with those snippets and the captions — confirm which format you prefer.