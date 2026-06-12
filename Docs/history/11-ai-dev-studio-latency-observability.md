# AI Dev Studio — Forensic Audit & Technical Autopsy

## 1. Executive Summary

### What AI Dev Studio Was Trying to Become

AI Dev Studio evolved from a local AI coding assistant experiment into a more disciplined, observable, local-first development tool focused on code review, auto-fix, diff generation, and LLM behavior control.

The product goal was not to compete directly with cloud-scale tools like GitHub Copilot or fully autonomous coding agents. Instead, the project began moving toward a more specific and realistic value proposition:

> A local-first AI-assisted code review and repair tool designed for constrained machines, predictable behavior, privacy, and controlled LLM execution.

The core idea became:

```text
developer pastes code
→ system reviews code
→ system detects real issues
→ system fixes only when needed
→ system shows diff
→ system exposes latency and model metrics
```

The important shift in this chat was that AI Dev Studio stopped being judged only by whether “the LLM answers” and started being judged by production-style criteria:

* Does the pipeline behave consistently?
* Does the model modify code only when there are real issues?
* Can latency be measured per layer?
* Can the system explain where time is being spent?
* Can prompt behavior be controlled?
* Can local hardware limitations be made visible?

That shift is what made the project more mature.

---

### How It Differed From Previous AI Dev Assistant Versions

Previous AI Dev Assistant iterations were faster, more exploratory, and more agent-driven. They produced interesting results quickly, but they also accumulated architectural uncertainty.

Earlier iterations were characterized by:

* rapid feature building
* heavy reliance on AI agent output
* more fragile architecture
* inconsistent behavior
* unclear separation between review, fix, chat, and orchestration
* less observability
* more “magic” from the LLM
* insufficient measurement of latency

This iteration was different.

It moved slower, but with better engineering discipline.

The main difference was philosophical:

```text
Previous iterations:
"Can an agent build something impressive quickly?"

Current iteration:
"Can we build a controlled, measurable, local-first AI system that behaves predictably?"
```

The current chat emphasized:

* layered architecture
* explicit use cases
* service boundaries
* provider-level metrics
* frontend observability
* prompt constraints
* latency diagnosis
* local model tradeoffs

This made AI Dev Studio less flashy but more technically defensible.

---

## 2. Timeline Reconstruction

### Phase 0 — Imported Project State From Previous Chat

The chat began with a carried-over project summary describing AI Dev Assistant as a local-first tool that could:

* analyze code
* suggest improvements
* auto-fix problems
* show diffs
* support multiple languages
* run using local LLMs through Ollama

The previous architecture had already moved toward a clean-ish layered structure:

```text
backend/app/
├── api/
├── handlers/
├── infrastructure/
├── services/
├── use_cases/
├── schemas/
```

This became the foundation for the current iteration.

The inherited state included:

* FastAPI backend
* vanilla JS frontend
* Ollama provider
* review and fix services
* diff service
* language handlers
* basic tests
* UI with review/fix/diff sections

The roadmap from the previous chat identified latency as the next priority.

---

### Phase 1 — Decision to Prioritize Latency

The first major decision in this chat was to stop adding features and focus on latency.

The reasoning was:

```text
If the assistant is local-first, latency determines usability.
```

The project had working features, but the user did not yet know:

* how long review took
* how long fix took
* whether diff contributed measurable overhead
* whether the backend was slow
* whether Ollama was the bottleneck
* whether cold starts were responsible

This became the central theme of the chat.

---

### Phase 2 — Use Case-Level Latency Instrumentation

The first implementation target was:

```text
backend/app/use_cases/review_and_fix_code.py
```

The use case originally performed:

```python
review = await self.review_service.review_code(artifact)

issues = review.get("issues", []) if isinstance(review, dict) else []

if not issues:
    fix = artifact.code
else:
    fix = await self.fix_service.fix_code(artifact)

diff = generate_diff(...)
```

The improvement added timing using:

```python
from time import perf_counter
```

Metrics added:

* `review_duration_ms`
* `fix_duration_ms`
* `diff_duration_ms`
* `total_duration_ms`

The key architectural decision was to measure orchestration time at the use case level, not in the endpoint.

This preserved the architecture:

```text
API route → use case → services → provider
```

Milestone reached:

```text
The system could now report latency per business step.
```

---

### Phase 3 — Frontend Latency Mini Card

After backend metrics were returned, the UI was extended.

Files affected:

```text
frontend/assets/js/app.js
frontend/assets/css/styles.css
index.html
```

A latency card was added to the results section.

Displayed metrics:

* Review
* Fix
* Diff
* Total

Then the UI was improved to format milliseconds into seconds:

```text
19055.18 ms → 19.06 s
```

Color classes were added:

* green / fast
* yellow / medium
* red / slow

This was important because the latency moved from invisible backend data into product feedback.

The UI became diagnostic.

---

### Phase 4 — First Latency Findings

Initial runs showed concerning results:

```text
Review: ~19 s
Fix: 0 ms
Diff: 0 ms
Total: ~19 s
```

This revealed that:

* fix was correctly skipped when no issues existed
* diff was not generated unnecessarily
* almost all time was spent in review

Later, a larger outlier showed:

```text
Review: ~58 s
LLM: ~58 s
```

This triggered the next architectural pivot:

```text
Use case timing was not enough.
Provider-level timing was needed.
```

---

### Phase 5 — Provider-Level Ollama Metrics

The project then moved deeper into:

```text
backend/app/infrastructure/llm/ollama_provider.py
```

The provider originally returned only a string response from Ollama.

A new method was introduced conceptually:

```python
generate_with_metrics()
```

This method returned:

* response text
* LLM duration in milliseconds
* model name
* prompt token count
* response token count
* load duration
* prompt eval duration
* eval duration
* total duration

This was a major milestone because the app stopped treating Ollama like a black box.

New metrics exposed:

```text
llm_review_duration_ms
model
prompt_eval_count
eval_count
load_duration
prompt_eval_duration
eval_duration
```

The project could now distinguish:

```text
backend overhead
vs
LLM load time
vs
prompt evaluation time
vs
token generation time
```

This was one of the strongest engineering achievements in the chat.

---

### Phase 6 — Bug Found in Ollama Provider Prompt Handling

During review of `ollama_provider.py`, an important bug was identified.

The code built:

```python
full_prompt = f"{system_prompt}\n\n{prompt}"
```

but sent:

```python
"prompt": prompt
```

instead of:

```python
"prompt": full_prompt
```

This meant `system_prompt` was effectively ignored.

That mattered because the whole project depended on controlling LLM behavior through system-like instructions.

Milestone:

```text
Prompt control bug identified at infrastructure level.
```

---

### Phase 7 — CodeReviewService Metrics Integration

The next target was:

```text
backend/app/services/code_review_service.py
```

`CodeReviewService` was changed to use:

```python
llm_result = await self.llm.generate_with_metrics(prompt=prompt)
```

Instead of directly receiving a raw string, it now received a structured result containing:

* response
* llm duration
* model metadata
* token counts
* Ollama internal durations

The service then returned:

```python
{
    "review": parsed,
    "llm_duration_ms": ...,
    "model": ...,
    "prompt_eval_count": ...,
    "eval_count": ...,
    ...
}
```

This changed the service contract.

The use case was updated accordingly:

```python
review_result = await self.review_service.review_code(artifact)
review = review_result.get("review", {})
llm_review_duration_ms = review_result.get("llm_duration_ms", 0.0)
```

Milestone:

```text
Review service became observable without leaking infrastructure details into the API route.
```

---

### Phase 8 — LLM Details Displayed in UI

The frontend latency card was then expanded to show:

* LLM duration
* model
* prompt tokens
* response tokens
* load time
* prompt eval time
* eval time

This allowed runs like:

```text
Review: 3.27 s
LLM: 3.27 s
Model: qwen2.5-coder:3b
Prompt tokens: 298
Response tokens: 27
Load: 491.64 ms
Prompt eval: 126.75 ms
Eval: 2.52 s
```

This was the point where the project gained real observability.

The user could now see whether latency came from:

* model load
* prompt processing
* generation
* backend overhead

---

### Phase 9 — Warm vs Cold Behavior Discovery

Multiple repeated tests were performed.

A simple JavaScript snippet produced:

```text
Run 1: high latency / outlier
Run 2: ~2.99 s
Run 3: ~2.89 s
Refresh + rerun: ~2.87 s
```

The conclusion:

```text
The UI refresh did not matter.
The runtime state of Ollama/model memory mattered.
```

The baseline for warm runs became:

```text
~2.8–3.0 seconds for simple review
```

The project discovered:

* cold or semi-cold runs were expensive
* warm runs were stable
* load duration could spike
* prompt eval duration could spike
* eval duration was usually the dominant cost in normal warm runs

This was a major diagnostic milestone.

---

### Phase 10 — Testing Review + Fix With Real Bug Snippet

A JavaScript snippet was introduced:

```javascript
function calculateTotal(items) {
    let total = 0;

    for (let i = 0; i <= items.length; i++) {
        total += items[i].price;
    }

    if (total = 0) {
        return "No items";
    }

    return total.toFixed(2);
}
```

Expected issues:

* off-by-one runtime bug
* unsafe array/property access
* assignment instead of comparison

First attempts showed review quality problems:

* missed real bugs
* misclassified issues
* incorrectly criticized `toFixed()`
* sometimes did not trigger fix

This shifted focus from pure latency to:

```text
latency + review quality + review/fix alignment
```

---

### Phase 11 — Review Prompt Hardening

The review prompt was tightened.

The original review prompt returned:

```json
{
  "issues": [],
  "improvements": [],
  "best_practices": [],
  "performance": []
}
```

But the model sometimes wandered.

A more focused “bug review” prompt was introduced.

It emphasized:

* return only JSON
* no markdown
* no reasoning
* no extra keys
* only real bug-level issues
* maximum 3 issues
* distinguish runtime vs logic vs syntax
* do not call off-by-one an infinite loop
* report unsafe array/property access as runtime

The output shape was simplified to:

```json
{
  "issues": [
    {
      "line": number,
      "type": "syntax | runtime | logic | unknown",
      "description": "short description"
    }
  ]
}
```

This improved quality:

```text
line 5 runtime: Array access may be out of bounds
line 9 logic: Assignment operator used instead of equality check
```

Milestone:

```text
Prompt design measurably improved model behavior.
```

---

### Phase 12 — Fix Service Metrics

The same observability strategy was extended to:

```text
backend/app/services/code_fix_service.py
```

Fix now had:

* `llm_fix_duration_ms`
* `fix_model`
* `fix_prompt_eval_count`
* `fix_eval_count`
* `fix_load_duration`
* `fix_prompt_eval_duration`
* `fix_eval_duration`

This completed the main pipeline observability:

```text
review LLM metrics
fix LLM metrics
diff time
total time
```

---

### Phase 13 — Ollama Runtime Optimization

NotebookLM recommendations were evaluated.

The useful ones were identified as:

* `keep_alive`
* explicit `num_ctx`
* `format: "json"` for review
* `num_predict`
* later: quantization checks and thread benchmarking

The provider was updated conceptually to support:

```python
keep_alive="24h"
num_ctx=2048
format="json"
num_predict=160
```

For review:

```python
llm_result = await self.llm.generate_with_metrics(
    prompt=prompt,
    format="json",
    num_ctx=2048,
    num_predict=160,
)
```

For fix:

```python
llm_result = await self.llm.generate_with_metrics(
    prompt=prompt,
    num_ctx=2048,
    num_predict=300,
)
```

The result was significant.

Simple snippet:

```text
Before: ~2.8–3.0 s
After: ~1.28 s
```

Bug snippet:

```text
Before: ~44–48 s
After: ~27.25 s
```

Milestone:

```text
Latency improved through provider-level runtime configuration without changing the entire architecture.
```

---

### Phase 14 — Fix Prompt Improvement Attempt

The fix prompt was then improved to handle unsafe property access.

The goal was to fix not only:

```javascript
i <= items.length
```

and:

```javascript
total = 0
```

but also:

```javascript
items[i].price
```

The prompt added rules like:

* guard unsafe array/property access
* fix out-of-bounds array loops
* replace accidental assignment in conditions
* preserve structure
* smallest safe change

The resulting fix improved correctness:

```javascript
for (let i = 0; i < items.length; i++) {
    if (items[i] && items[i].price !== undefined) {
        total += items[i].price;
    }
}

if (total === 0) {
    return "No items";
}
```

But it added inline comments despite instructions:

```javascript
// Fixed the loop condition...
// Guarded array access...
// Changed assignment...
```

This created a new roadblock:

```text
Better correctness, but worse discipline and worse latency.
```

Latency increased:

```text
Review: ~37.4 s
Fix: ~30.0 s
Total: ~67.4 s
```

Final state:

```text
Fix quality improved, but prompt needed stricter anti-comment constraints and lower num_predict.
```

---

## 3. Technical Architecture

### Backend Architecture

The backend follows a layered architecture:

```text
backend/app/
├── api/
├── schemas/
├── use_cases/
├── services/
├── handlers/
├── infrastructure/
```

Responsibilities:

```text
api/
  receives HTTP requests
  delegates to use cases

schemas/
  defines request/response contracts
  defines CodeArtifact

use_cases/
  orchestrates business flows

services/
  implements reusable domain logic:
  - review
  - fix
  - diff

handlers/
  encapsulates language-specific behavior

infrastructure/
  integrates with external/local systems:
  - Ollama provider
```

The architecture intentionally separates business flow from LLM infrastructure.

This matters because the LLM is unreliable and must be controlled by the architecture, not trusted blindly.

---

### Frontend Architecture

Frontend is vanilla HTML/CSS/JavaScript.

Main pieces:

```text
index.html
assets/css/styles.css
assets/js/app.js
```

Responsibilities:

```text
index.html
  layout
  controls
  result panels
  latency card

styles.css
  app shell
  cards
  grid layout
  latency styling
  diff colors
  responsive layout

app.js
  collects input
  sends request to backend
  renders review
  renders fix
  renders diff
  renders latency metrics
  handles copy
  handles clear
```

The frontend is not just decorative. It became an observability surface.

---

### LLM Integration

LLM integration is handled by:

```text
OllamaProvider
```

The provider calls:

```text
http://localhost:11434/api/generate
```

Key features:

* local model execution
* model selection through environment variable
* temperature control
* timeout handling
* metrics extraction
* keep-alive support
* context window control
* optional JSON mode
* optional output token limit

The model used during testing:

```text
qwen2.5-coder:3b
```

Key lesson:

```text
The provider must expose LLM internals because local inference behavior is variable.
```

---

### Agent Architecture

This version is not a full autonomous multi-agent system.

It is better described as:

```text
controlled service-agent pipeline
```

Logical agents:

```text
Review Service
  role: bug detector

Fix Service
  role: code repairer

Diff Service
  role: change explainer

Use Case
  role: orchestrator
```

Unlike earlier multi-agent experiments, this iteration avoided uncontrolled autonomy.

The system does not let the LLM decide the whole workflow.

Instead:

```text
use case decides when fix runs
LLM only performs bounded tasks
architecture enforces constraints
```

That is a major maturity improvement.

---

### Orchestration Flow

The main flow:

```text
User submits CodeArtifact
        ↓
API endpoint receives request
        ↓
ReviewAndFixCodeUseCase.execute()
        ↓
CodeReviewService.review_code()
        ↓
OllamaProvider.generate_with_metrics()
        ↓
review JSON parsed and normalized
        ↓
if issues are empty:
    return original code as fix
    skip fix LLM call
else:
    CodeFixService.fix_code()
    OllamaProvider.generate_with_metrics()
        ↓
if fixed code differs:
    generate_diff(original, fix)
        ↓
return review, fix, diff, latency
        ↓
frontend renders all results
```

Important rule:

```text
No issues → no fix → no diff
```

This protects code from unnecessary LLM modification.

---

### Memory Systems

No persistent memory system was implemented in this chat.

Engram and memory-based retrieval were discussed as future possibilities, but they were not integrated.

Current memory state:

```text
No vector memory
No semantic recall
No persisted review history
No agent long-term memory
```

This was a deliberate non-priority because the immediate bottleneck was latency, not context recall.

---

### Streaming Systems

Streaming was discussed as a possible future UX improvement.

It was not implemented.

Current state:

```text
stream: False
```

The app waits for a complete Ollama response before rendering.

Potential future value:

* improve perceived latency
* show progress while model generates
* reduce user uncertainty during slow local inference

But actual total execution time would remain similar.

---

### Recovery Systems

No full recovery system exists in this chat.

However, there are partial defensive behaviors:

* JSON parse failure returns an error object
* LLM HTTP errors are raised through provider
* frontend catches request errors
* no fix is applied if review finds no issues
* diff is only generated when fixed code differs

Not implemented:

* retry policy
* fallback model
* partial response recovery
* checkpointing
* request cancellation
* automatic degradation

---

### Resilience Systems

Partial resilience exists through:

* strict prompts
* timeout handling
* deterministic temperature
* no-fix-on-no-issues rule
* output cleaning
* issue normalization
* latency metrics
* frontend display of provider metrics

But full production resilience is incomplete.

Missing:

* circuit breaker
* queueing
* concurrency limits
* rate limiting
* model fallback
* degraded “fast mode”
* structured error taxonomy

---

## 4. Major Features Implemented

### Feature 1 — Review and Fix Pipeline

**Purpose**

To analyze code, detect issues, optionally fix the code, and return the result.

**Files involved**

```text
backend/app/use_cases/review_and_fix_code.py
backend/app/services/code_review_service.py
backend/app/services/code_fix_service.py
backend/app/services/diff_service.py
backend/app/schemas/common.py
```

**Architecture**

Use case orchestrates services. Review decides whether fix should run. Diff is generated only if fix changes the code.

**Status**

Completed, but quality still improving.

**Milestone**

Major milestone.

---

### Feature 2 — No-Fix-When-No-Issues Rule

**Purpose**

Prevent unnecessary LLM modifications to correct code.

**Files involved**

```text
review_and_fix_code.py
code_review_service.py
```

**Architecture**

Use case checks:

```python
issues = review.get("issues", [])
if not issues:
    fix = artifact.code
```

**Status**

Completed.

**Milestone**

Major milestone because it introduced behavioral control over the LLM.

---

### Feature 3 — Diff Generation

**Purpose**

Show what changed between original and fixed code.

**Files involved**

```text
services/diff_service.py
app.js
styles.css
index.html
```

**Architecture**

Backend generates unified diff. Frontend formats additions/removals.

**Status**

Completed.

**Milestone**

Major milestone for usability.

---

### Feature 4 — Latency Metrics at Use Case Level

**Purpose**

Measure review, fix, diff, and total pipeline time.

**Files involved**

```text
review_and_fix_code.py
```

**Architecture**

Uses `perf_counter()` around each step.

**Status**

Completed.

**Milestone**

Major milestone.

---

### Feature 5 — Provider-Level Ollama Metrics

**Purpose**

Expose model-level timing and token metrics.

**Files involved**

```text
ollama_provider.py
code_review_service.py
code_fix_service.py
review_and_fix_code.py
app.js
```

**Architecture**

Provider extracts Ollama response metadata and propagates it through services and use case.

**Status**

Completed.

**Milestone**

One of the most important milestones in the project.

---

### Feature 6 — Latency Card UI

**Purpose**

Make latency visible to the user.

**Files involved**

```text
index.html
styles.css
app.js
```

**Architecture**

Frontend renders latency object returned by backend.

**Status**

Completed.

**Milestone**

Major UX/observability milestone.

---

### Feature 7 — Warm/Cold Runtime Diagnosis

**Purpose**

Determine whether latency comes from cold starts or inference.

**Files involved**

```text
ollama_provider.py
app.js
```

**Architecture**

Uses `load_duration`, `prompt_eval_duration`, and `eval_duration`.

**Status**

Completed diagnostically, not yet turned into an explicit feature label.

**Milestone**

Major diagnostic milestone.

---

### Feature 8 — JSON-Mode Review Optimization

**Purpose**

Constrain review output and reduce response drift.

**Files involved**

```text
ollama_provider.py
code_review_service.py
```

**Architecture**

Ollama request supports:

```python
format="json"
num_predict=160
num_ctx=2048
```

**Status**

Implemented conceptually and tested successfully.

**Milestone**

Major performance/behavior milestone.

---

### Feature 9 — Prompt Hardening for Review

**Purpose**

Improve issue detection quality and reduce verbose responses.

**Files involved**

```text
code_review_service.py
language handlers
```

**Architecture**

Prompt narrowed from general review to bug-focused review.

**Status**

Partially completed; improved quality but not perfect.

**Milestone**

Major milestone in LLM behavior control.

---

### Feature 10 — Prompt Hardening for Fix

**Purpose**

Improve fix completeness, especially unsafe array/property access.

**Files involved**

```text
code_fix_service.py
```

**Architecture**

Fix prompt added explicit rules for array bounds, unsafe access, and assignment-in-condition.

**Status**

Partial.

Improved correctness but introduced comments and high latency.

**Milestone**

Partial milestone; needs another iteration.

---

## 5. Production Engineering Work

### Resource Protection

Implemented or partially implemented:

* local-first model execution
* timeout for Ollama request
* `num_ctx` control
* `num_predict` control
* `keep_alive` control
* no unnecessary fix call when no issues exist

Not implemented:

* memory ceiling detection
* CPU load detection
* automatic model selection
* request queue
* concurrency limiting

---

### Auto-Degradation

Not implemented.

Potential future degradation modes:

```text
if latency high:
    use fast review mode

if model unavailable:
    show degraded mode

if prompt too large:
    truncate or ask user to reduce input

if fix too slow:
    return review only
```

---

### Checkpointing

Not implemented.

There is no persistent job state or resumable request flow.

---

### Recovery

Partial only.

Implemented:

* frontend try/catch around request
* JSON parse error handling
* no diff on unchanged fix
* no fix on no issues

Not implemented:

* automatic retry
* provider fallback
* retry with smaller prompt
* retry with JSON repair
* cancellation

---

### Observability

Strongest production engineering area in this chat.

Implemented:

* use case latency
* review latency
* fix latency
* diff latency
* total latency
* LLM review latency
* LLM fix latency
* model name
* prompt token count
* response token count
* load duration
* prompt eval duration
* eval duration

This is the most impressive production-style achievement in the chat.

---

### Chaos Testing

Not implemented in this chat.

Relevant future tests:

* Ollama unavailable
* invalid JSON response
* model timeout
* huge prompt
* malformed code
* unsupported language
* slow fix
* empty response
* response with comments despite instructions

---

### Security Controls

Partial.

Implemented indirectly:

* local-first execution
* no cloud dependency in normal flow
* no automatic file writing
* no direct execution of generated code
* no automatic application of fix to filesystem

Not implemented:

* input sanitization policy
* prompt injection mitigation
* sandboxing
* security review mode
* secrets detection
* file access controls

---

### Timeout Handling

Implemented at provider level:

```python
timeout=180.0
```

This prevents indefinite waits but is still high.

Future improvement:

```text
review timeout: 30s
fix timeout: 45s
fallback: return partial result
```

---

### Concurrency Controls

Not implemented.

Risks:

* multiple simultaneous requests could overload Ollama
* local CPU/RAM contention could increase latency
* no queue or backpressure

Future improvement:

```text
single-flight queue for local model calls
```

---

## 6. Lessons Learned

### Technical Lessons

1. LLM latency must be measured at multiple layers.
2. Backend time and model time are not the same.
3. Ollama exposes useful internal metrics.
4. `eval_duration` often dominates warm runs.
5. `load_duration` explains cold or semi-cold outliers.
6. `prompt_eval_duration` can spike unexpectedly.
7. JSON mode reduces output drift.
8. `num_predict` helps contain verbose generations.
9. Prompts must constrain not only content but also response shape.
10. Fix prompts can improve correctness but increase latency.

---

### Architectural Lessons

1. The LLM must not control orchestration.
2. The use case should decide whether fix runs.
3. Provider-level metrics should not leak directly into endpoint logic.
4. Services should translate LLM outputs into domain objects.
5. A local AI tool needs observability from the beginning.
6. Prompt design is part of architecture, not just wording.
7. Separating review and fix makes measurement possible.
8. Keeping diff separate makes the flow explainable.
9. A simple frontend can become a powerful diagnostic tool.
10. Local-first products require runtime awareness.

---

### Hardware Limitations Discovered

The project revealed that local inference is highly sensitive to runtime state.

Observed behavior:

```text
simple warm review: ~1.28 s after optimization
simple earlier baseline: ~2.8–3.0 s
complex review+fix after optimization: ~27.25 s
complex review+fix before optimization: ~44–48 s
worst observed outliers: ~58–67 s
```

Key limitations:

* local model generation speed is the main bottleneck
* cold or semi-cold starts create large spikes
* prompt eval can become unexpectedly expensive
* more complete reasoning increases latency
* smaller models may still struggle with reasoning quality

---

### Tradeoffs Made

#### Quality vs Latency

Better review and fix prompts improved correctness but sometimes increased runtime.

#### Local Privacy vs Cloud Speed

Local Ollama preserved privacy but created higher latency than cloud APIs likely would.

#### Simplicity vs Agent Autonomy

The system avoided full autonomous agents in favor of controlled service roles.

#### Prompt Strictness vs Flexibility

Stricter prompts improved consistency but sometimes reduced the model’s ability to infer unstated fixes.

#### Minimal Fix vs Complete Fix

Smallest safe change reduced risk, but sometimes missed related safety improvements.

---

## 7. Portfolio Evidence

### Strong Portfolio Screenshots

1. Main UI with code input, review, fix, diff, and latency card.
2. Latency card showing:

   * model
   * prompt tokens
   * response tokens
   * load
   * prompt eval
   * eval
3. Diff card showing `<=` changed to `<` and `=` changed to `===`.
4. Review JSON showing classified issues:

   * runtime
   * logic
5. Console output showing full latency payload.
6. Before/after latency comparison:

   * 44–48 s before optimization
   * 27.25 s after provider tuning
7. Code screenshot of `ReviewAndFixCodeUseCase`.
8. Code screenshot of `OllamaProvider.generate_with_metrics`.
9. Code screenshot of `CodeReviewService`.
10. Folder tree showing layered architecture.

---

### Files That Best Represent the Project

Strongest portfolio files:

```text
backend/app/use_cases/review_and_fix_code.py
backend/app/infrastructure/llm/ollama_provider.py
backend/app/services/code_review_service.py
backend/app/services/code_fix_service.py
backend/app/services/diff_service.py
frontend/assets/js/app.js
frontend/assets/css/styles.css
index.html
backend/app/handlers/factory.py
backend/app/schemas/common.py
```

---

### Most Impressive Technical Achievements

1. Provider-level Ollama observability.
2. Use case orchestration that prevents unnecessary fix calls.
3. Latency card showing real internal model metrics.
4. Prompt hardening based on measured model failures.
5. Local-first architecture with no cloud dependency.
6. Diff-based UX.
7. Separation of infrastructure from business flow.
8. Diagnosis of warm vs cold runtime behavior.
9. Runtime optimization using `keep_alive`, `num_ctx`, JSON format, and `num_predict`.
10. Honest identification of model limitations.

---

## 8. Final Assessment

### What Would Stand Out to a Recruiter

A recruiter or technical interviewer would notice that this is not just another AI wrapper.

The standout points:

* local LLM integration
* FastAPI backend
* layered architecture
* real observability
* prompt iteration
* latency benchmarking
* UI that exposes engineering metrics
* controlled fix behavior
* diff generation
* honest handling of limitations

This demonstrates applied AI engineering rather than simple API consumption.

---

### What Demonstrates Senior-Level Thinking

Senior-level thinking appears in:

1. refusing to trust the LLM blindly
2. adding metrics before optimizing
3. separating business orchestration from infrastructure
4. measuring before making assumptions
5. identifying quality/latency tradeoffs
6. preventing unnecessary code modification
7. using fakes in tests
8. treating prompt behavior as a system design problem
9. distinguishing cold-start from generation cost
10. documenting roadblocks honestly

The strongest senior-level insight:

```text
The LLM is unreliable, so the architecture must control it.
```

---

### What Demonstrates Systems Thinking

Systems thinking appears in the way the project connects:

```text
local hardware
↓
Ollama runtime
↓
provider metrics
↓
service behavior
↓
use case orchestration
↓
frontend observability
↓
user experience
```

The project does not treat latency as one number.

It decomposes latency into:

* load
* prompt eval
* eval
* review
* fix
* diff
* total

That is systems thinking.

---

### What Differentiates It From a Simple AI Chat Application

A simple AI chat application usually does this:

```text
user prompt → LLM response
```

AI Dev Studio does this:

```text
code artifact
→ language-specific prompt context
→ structured review
→ issue normalization
→ conditional fix
→ diff generation
→ provider-level metrics
→ frontend observability
```

Differentiators:

* code-specific workflow
* local model
* no-fix-on-clean-code rule
* structured output
* diff generation
* latency analysis
* prompt hardening
* model introspection
* layered backend
* portfolio-ready engineering narrative

---

# 9. Top 10 Most Important Code Files

## 1. `backend/app/use_cases/review_and_fix_code.py`

### Why It Exists

This file orchestrates the core business flow:

```text
review → optional fix → optional diff → response
```

### Architectural Problem It Solves

It prevents API routes from knowing business logic and prevents services from controlling the whole application flow.

### Why It Was Important

It became the central control point for:

* deciding whether fix should run
* measuring total pipeline latency
* skipping unnecessary work
* assembling the final response

### Major Milestone?

Yes.

This is one of the most important files in the project.

### Portfolio Screenshot?

Yes.

A screenshot showing the use case orchestration would strongly demonstrate clean architecture.

---

## 2. `backend/app/infrastructure/llm/ollama_provider.py`

### Why It Exists

It encapsulates communication with Ollama.

### Architectural Problem It Solves

It isolates infrastructure from domain logic.

Services do not need to know HTTP details, Ollama payload format, or runtime options.

### Why It Was Important

This became the main observability gateway.

It exposed:

* LLM duration
* model name
* prompt tokens
* response tokens
* load duration
* prompt eval duration
* eval duration
* keep alive
* context window
* JSON mode
* output token limits

### Major Milestone?

Yes.

This was arguably the most important technical milestone in the chat.

### Portfolio Screenshot?

Absolutely.

A screenshot of `generate_with_metrics()` would show serious AI engineering maturity.

---

## 3. `backend/app/services/code_review_service.py`

### Why It Exists

It builds review prompts, calls the LLM, parses JSON, cleans output, normalizes issues, and returns structured review results.

### Architectural Problem It Solves

It keeps review-specific logic out of the use case and provider.

### Why It Was Important

It became the main site of prompt engineering and model behavior control.

It handled:

* JSON cleaning
* issue normalization
* prompt hardening
* metrics propagation
* invalid JSON fallback

### Major Milestone?

Yes.

Review quality improvements were one of the most important achievements.

### Portfolio Screenshot?

Yes.

Especially the prompt and `generate_with_metrics()` integration.

---

## 4. `backend/app/services/code_fix_service.py`

### Why It Exists

It generates corrected code from a code artifact.

### Architectural Problem It Solves

It separates fixing behavior from review behavior.

### Why It Was Important

It allowed the system to measure review and fix independently.

It also became the second major LLM behavior-control surface.

### Major Milestone?

Yes, but currently partial.

The fix prompt improved correctness but still needs discipline improvements.

### Portfolio Screenshot?

Yes.

Good screenshot if paired with before/after fix output.

---

## 5. `frontend/assets/js/app.js`

### Why It Exists

It drives the frontend behavior.

### Architectural Problem It Solves

It connects the browser UI to the backend pipeline.

### Why It Was Important

It evolved from simple request rendering into an observability interface.

It handles:

* request submission
* result rendering
* syntax highlighting
* copy fix
* diff rendering
* latency rendering
* console diagnostics

### Major Milestone?

Yes.

The latency card made the project demonstrable.

### Portfolio Screenshot?

Yes.

Especially `renderLatency()`.

---

## 6. `frontend/assets/css/styles.css`

### Why It Exists

It styles the app UI.

### Architectural Problem It Solves

It makes the app usable and readable.

### Why It Was Important

It solved layout problems and supported:

* card layout
* responsive grid
* scrollable code panels
* diff coloring
* latency severity classes
* full-width latency diagnostics

### Major Milestone?

Medium.

Important for UX and portfolio polish.

### Portfolio Screenshot?

Yes, especially if showing the UI.

---

## 7. `index.html`

### Why It Exists

It defines the frontend structure.

### Architectural Problem It Solves

It provides the user-facing shell for code input and result inspection.

### Why It Was Important

It made the backend pipeline usable without Postman or curl.

It includes:

* language selector
* code textarea
* review card
* fix card
* diff card
* latency card

### Major Milestone?

Yes for productization.

### Portfolio Screenshot?

Yes.

The rendered UI is one of the strongest visuals.

---

## 8. `backend/app/services/diff_service.py`

### Why It Exists

It generates a diff between original and fixed code.

### Architectural Problem It Solves

It separates comparison logic from LLM logic.

### Why It Was Important

It made fixes auditable.

Without diff, users would have to manually inspect the entire fixed output.

### Major Milestone?

Yes.

Diff transformed the tool from “LLM output” to “reviewable change.”

### Portfolio Screenshot?

Yes.

Diff output is very portfolio-friendly.

---

## 9. `backend/app/handlers/factory.py`

### Why It Exists

It selects the correct language handler.

### Architectural Problem It Solves

It prevents review/fix services from hardcoding language-specific behavior.

### Why It Was Important

It supports extensibility for:

* Python
* JavaScript
* C#
* future languages

### Major Milestone?

Medium to major.

Important architectural extension point.

### Portfolio Screenshot?

Maybe.

Better as part of an architecture diagram than a standalone screenshot.

---

## 10. `backend/app/schemas/common.py`

### Why It Exists

It defines shared schema objects such as `CodeArtifact`.

### Architectural Problem It Solves

It centralizes data contracts.

### Why It Was Important

It helped stabilize the boundary between frontend/API/use cases/services.

### Major Milestone?

Medium.

Important but less visually impressive.

### Portfolio Screenshot?

Maybe.

Useful in combination with the use case.

---

# 10. Final Project Status

## Completed

* local-first review/fix pipeline
* use case orchestration
* diff generation
* frontend cards
* latency card
* provider-level metrics
* review prompt improvement
* fix prompt improvement attempt
* Ollama runtime optimization
* warm/cold behavior diagnosis

## Partial

* fix correctness
* review precision
* model discipline
* latency optimization
* schema polish
* frontend review UX

## Not Implemented

* persistent memory
* streaming
* recovery system
* auto-degradation
* concurrency control
* cloud fallback
* security review mode
* project scaffolding
* code generation
* file persistence
* historical benchmark storage

---

# 11. Final Assessment for Portfolio

AI Dev Studio is strongest when presented not as a revolutionary coding assistant, but as a serious applied AI engineering project.

The best pitch is:

> I built a local-first AI code review and fix assistant using Ollama, FastAPI, and a layered backend architecture. The most important part of the project was not just calling an LLM, but instrumenting and controlling it: measuring review/fix latency, exposing model internals, diagnosing cold-start behavior, constraining prompts, and handling the tradeoff between code quality and local inference speed.

That is the real value.

This project demonstrates:

* backend engineering
* applied AI integration
* local LLM constraints
* observability
* prompt engineering
* product thinking
* systems thinking
* honest technical judgment

It is not just an AI chat app.

It is a controlled local AI coding pipeline with measurable behavior.