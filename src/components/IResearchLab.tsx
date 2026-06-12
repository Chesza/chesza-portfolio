import { useState, useRef, useEffect, useCallback } from 'react';
import {
  ChevronDownIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CpuChipIcon,
  WrenchIcon,
  BoltIcon,
  CubeIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/24/outline';

import phase1Img from '../assets/images/ai-lab/webinar.png';
import phase1Img2 from '../assets/images/ai-lab/manual.png';
import phase2Img from '../assets/images/ai-lab/master-ai-dev-copia.png';
import phase2Img2 from '../assets/images/ai-lab/engram.png';
import phase3Img from '../assets/images/ai-lab/ai-dev-assistant-copy.png';
import phase3Img2 from '../assets/images/ai-lab/fast-api.png';
import phase4Img from '../assets/images/ai-lab/ai-dev-assistant-vscode-chat2.png';
import phase5Img from '../assets/images/ai-lab/Checkpoint-ResumePipelineRecovery.png';
import phase6Img from '../assets/images/ai-lab/project_pipeline.png';
import phase6Img2 from '../assets/images/ai-lab/system_guard.png';
import phase6Img3 from '../assets/images/ai-lab/intent_router.png';
import phase7Img1 from '../assets/images/ai-lab/phase31-recovery-git-history.png';
import phase7Img2 from '../assets/images/ai-lab/dashboard.png';
import phase7Img3 from '../assets/images/ai-lab/terminal-endpoints.png';
import phase7Img4 from '../assets/images/ai-lab/phase31-distributed-kernel-files.png';
import devStudioImg1 from '../assets/images/ai-lab/main-ui.png';
import devStudioImg2 from '../assets/images/ai-lab/review-fix-diff.png';
import devStudioImg6 from '../assets/images/ai-lab/review-fix.png';
import devStudioImg4 from '../assets/images/ai-lab/latency-dashboard.png';
import devStudioImg3 from '../assets/images/ai-lab/endpoint-flow.png';
import devStudioImg5 from '../assets/images/ai-lab/pytest-run.png';

const phases = [
  {
    title: 'Knowledge Reconstruction',
    period: 'March 2026',
    description:
      'Consolidated fragmented information from webinars, technical notes, videos, and community resources into a structured installation and learning guide for local AI development environments.',
    tags: ['NotebookLM', 'Research', 'Local AI'],
    image: phase1Img,
    image2: phase1Img2,
    caption2: 'Practical step-by-step guide I built from fragmented notes',
    caption1: 'Reference diagram from a webinar that influenced the early direction of this research.',
    evolutionText:
      'I reinterpreted the high-level architecture into concrete local-first components: replaced cloud dependencies with Ollama, adapted the planner for local execution, and simplified the orchestration to run on a single machine.',
    learnings: [
      'Most webinars demonstrate outcomes but omit implementation details.',
      'Building a personal knowledge base accelerates experimentation.',
      'NotebookLM proved useful for synthesizing technical information.',
      'Understanding the ecosystem mattered more than copying code.',
    ],
  },
  {
    title: 'Local AI Environment',
    period: 'March 2026',
    description:
      'Built a local AI development environment using Continue, Ollama, MCP, and Engram. Experimented with persistent memory, agent workflows, and project-scoped knowledge retention to understand how local-first AI systems behave in practice.',
    tags: ['Continue', 'Ollama', 'Engram', 'MCP'],
    image: phase2Img,
    image2: phase2Img2,
    infrastructureConstraints: {
      hardware: [
        'Intel i7-1165G7',
        '16 GB RAM',
        'No dedicated GPU',
      ],
      keyFindings: [
        'Local memory systems add operational cost.',
        'Smaller models were faster but often lacked tool capabilities.',
        'Agent orchestration increases coordination overhead.',
        'Hardware limits became architectural constraints.',
      ],
    },
    keyResearchFindings: {
      models: [
        '1.5B models were fast but lacked tool capabilities.',
        '3B models supported tools but exceeded practical interactive latency.',
      ],
      memory: [
        'Persistent memory worked reliably through Engram.',
        'Memory systems introduced additional coordination overhead.',
      ],
      performance: [
        'Context size had a larger impact on latency than expected.',
        'Tool-enabled workflows amplified resource consumption.',
      ],
      architecture: [
        'System architecture mattered more than model size.',
        'Agent coordination became a larger bottleneck than inference.',
      ],
      hardware: [
        'Consumer hardware can run local AI workflows.',
        'Resource limits became architectural constraints.',
      ],
      footer: 'Based on multiple experiments using Ollama, Continue, Engram, MCP servers, and local coding models.',
    },
    learnings: [
      'Knowledge capture became as important as code generation.',
      'Local AI systems need memory, not only models.',
      'MCP enables tool interoperability beyond a single assistant.',
      'Persistent context improves continuity across experiments.',
    ],
  },
  {
    title: 'AI Dev Assistant',
    period: 'April 2026',
    description:
      'Built the first working prototype of a local AI development assistant using FastAPI, Ollama, and a modular service architecture. The system supported code analysis, generation, and review workflows through dedicated endpoints and became the foundation for later orchestration and resilience experiments.',
    tags: ['FastAPI', 'Ollama', 'ChromaDB'],
    image: phase3Img,
    image2: phase3Img2,
    whatWasBuilt: [
      '✓ Code Analysis',
      '✓ Code Generation',
      '✓ Code Review',
      '✓ FastAPI Backend',
      '✓ Ollama Integration',
      '✓ ChromaDB Memory',
    ],
    learnings: [
      'Building a working prototype reveals limitations faster than research alone.',
      'Service separation made experimentation easier.',
      'Local LLM latency became an architectural constraint.',
      'Tooling architecture matters as much as model quality.',
    ],
  },
  {
    title: 'VS Code AI Assistant',
    period: 'April 2026',
    description:
      'Built and tested a VS Code extension for local AI workflows using the Extension Development Host. The system included task routing, language detection, performance modes, pipeline monitoring, cache metrics, latency tracking, and resource limits designed to prevent local workloads from overwhelming the machine. ' +
      'This phase explored how far a local AI assistant could be pushed before orchestration overhead, RAM usage, and hardware constraints became architectural concerns.',
    tags: ['Checkpointing', 'Resume', 'Durable Execution', 'SSE', 'FastAPI'],
    image: phase4Img,
    learnings: [
      'Long-running AI workflows need durable state, not only retries.',
      'Checkpointing makes failures recoverable instead of catastrophic.',
      'Resume logic requires careful handling of side effects and idempotency.',
      'Operational controls become essential as pipelines grow longer.',
    ],
  },
  {
    title: 'Durable Execution',
    period: 'April 2026',
    description:
      'Implemented checkpoint and resume support for long-running local AI pipelines. Execution state was persisted throughout the workflow, allowing interrupted runs to continue from the first pending step instead of restarting from scratch. ' +
      'The system exposed APIs for checkpoint management and streamed execution updates to clients through Server-Sent Events (SSE).',
    tags: ['Durable Execution', 'Checkpointing', 'Recovery', 'Fault Tolerance'],
    image: phase5Img,
    coreConcepts: [
      '• Checkpointing',
      '• Resume',
      '• Replay',
      '• Durable State',
      '• Crash Recovery',
      '• SSE Progress Streaming',
    ],
    learnings: [
      'Long-running AI workflows require durable state.',
      'Checkpointing is easier than recovering lost context.',
      'Recovery logic must be designed from the beginning.',
      'Execution state becomes part of the architecture.',
    ],
  },
  {
    title: 'Resilience Engineering',
    period: 'April 2026',
    description:
      'Designed and tested resilience mechanisms for local AI workloads, including checkpoint recovery, auto-degradation, resource protection, timeout handling, fallback strategies, and chaos engineering experiments.',
    tags: ['System Guard', 'Fallbacks', 'Auto-Degradation', 'Recovery'],
    image: phase6Img,
    secondaryImages: [
      { src: phase6Img2, caption: 'System Guard - CPU/RAM Limits, Throttling, Emergency Stop' },
      { src: phase6Img3, caption: 'Intent Router - Fallback Metrics, Auto Degradation, Recovery Tracking' }
    ],
    protectionMechanisms: [
      '✓ CPU Guard',
      '✓ RAM Guard',
      '✓ Queue Limits',
      '✓ Timeout Handling',
      '✓ Auto-Degradation',
      '✓ Recovery Tracking',
      '✓ Fallback Metrics',
    ],
    learnings: [
      'Reliability is a feature, not an afterthought.',
      'Local AI systems require resource governance.',
      'Checkpointing enables durable execution.',
      'Auto-degradation is often better than failure.',
      'Observability becomes critical as complexity grows.',
    ],
  },
  {
    title: 'Phase 31 Recovery & Distributed Kernel Recovery',
    period: 'June 2026',
    description:
      'Recovered a previously abandoned distributed execution branch that had been rolled back months earlier.\n\n' +
      'The original branch contained advanced work that extended the system from a local AI assistant into a distributed execution kernel featuring durable execution, multi-node coordination, consensus protocols, chaos engineering, and formal verification research.\n\n' +
      'Using historical Git references, archived notes, and surviving branch snapshots, the system was reconstructed and partially reactivated.',
    tags: [
      'Distributed Systems', 'Durable Execution', 'Checkpointing', 'Consensus',
      'Raft', 'Chaos Engineering', 'Formal Verification', 'System Recovery',
      'Git Forensics', 'Architecture Archaeology'
    ],
    galleryImages: [
      { src: phase7Img1, caption: 'Git log --oneline showing phases 20–31' },
      { src: phase7Img2, caption: 'Dashboard functioning after recovery' },
      { src: phase7Img3, caption: 'Terminal with /stats-live, /menu, /stream/{request_id}' },
      { src: phase7Img4, caption: 'Recovered file tree: node_registry.py, distributed_scheduler.py, persistent_queue.py, orchestrator.py, execution_graph.py, state_rebuilder.py' }
    ],
    whatWasRecovered: [
      { category: 'Durable Execution System', items: ['Persistent Queue', 'Checkpointing', 'Crash Recovery', 'Replayable State', 'Resumable Workers'] },
      { category: 'Distributed Execution', items: ['Node Registry', 'Distributed Scheduler', 'Task Leasing', 'Failure Recovery', 'Global Coordination'] },
      { category: 'Consensus Layer', items: ['Leader Election', 'Global Ordering', 'Deduplication', 'State Reconciliation'] },
      { category: 'Advanced Research', items: ['Raft-based Consensus', 'Multi-Region Coordination', 'Chaos Engineering', 'Formal Verification', 'Lean Proof Skeleton'] }
    ],
    recoveryProcess: [
      'Recovered historical commits: Phase 20 → Durable Execution System (97aa3b6)',
      'Phase 21 → Distributed Multi-Node Execution (84708d7)',
      'Phase 22 → Consensus-Aware Distributed Kernel (69e00da)',
      'Phase 23 → Raft Consensus Layer (a426cfd)',
      'Phase 24 → Formal Verification + Chaos Engineering (66f8341)',
      'Phase 31 → Architecture Freeze + Lean Verification (de0ad4a)'
    ],
    importGraphRepair: [
      'from app.node_registry import ...',
      'from app.distributed_scheduler import ...',
      'from app.persistent_queue import ...'
    ],
    validationResults: [
      'FastAPI startup',
      'Runtime telemetry',
      'Adaptive performance modes',
      'System Dashboard',
      'Distributed runtime modules',
      'SSE streaming endpoint connectivity'
    ],
    verifiedEndpoints: ['/stats-live', '/menu', '/test-connection', '/stream/{request_id}'],
    keyFinding: 'The rollback had not destroyed the distributed kernel. The implementation survived inside preserved Git branches and could still be restored and executed after repairing the dependency graph.',
    learnings: [
      'Git history can preserve months of engineering work long after a rollback.',
      'Distributed systems are significantly harder to refactor than monolithic architectures.',
      'Architectural archaeology is sometimes required to understand large AI systems.',
      'Recovery efforts can reveal capabilities that were believed to be permanently lost.'
    ]
  },
  {
    title: 'AI Dev Studio',
    period: 'May 2026',
    description:
      'Refocused the research into a practical local-first code review and code-fix tool with diff visualization and a simple web UI.',
    tags: ['Code Review', 'Code Fix', 'Local-First'],
    galleryImages: [
      { src: devStudioImg1, caption: 'Main UI - Code review interface' },
      { src: devStudioImg2, caption: 'Review + Fix + Diff workflow' },
      { src: devStudioImg6, caption: 'Review + Fix workflow' },
      { src: devStudioImg4, caption: 'Latency dashboard' },
      { src: devStudioImg3, caption: 'Endpoint flow: Core ReviewAndFix use case coordinating review generation, conditional auto-fix creation, diff generation, and end-to-end latency instrumentation.' },
      { src: devStudioImg5, caption: 'Regression testing after introducing provider-level latency metrics and observability instrumentation.' },
    ],
    whyReset: `Previous experiments explored orchestration, durable execution, checkpoint recovery, distributed runtimes, and resilience engineering.

Although technically successful, the increasing complexity produced diminishing returns for daily developer workflows.

AI Dev Studio was created as a deliberate reset: a smaller, local-first tool focused on practical code review, code fixes, diffs, and observability.`,
    startingOver: {
      story: `After the complexity reached in AI Dev Assistant, I decided to restart from zero.
The goal was to build a small, understandable, and useful tool for daily developer tasks: review code, suggest fixes, show diffs, and run completely locally.`,
      objective: 'Build a local-first code review assistant focused on practical developer workflows.',
      coreFeatures: [
        'Code Review - Detect issues, explain findings, structured output',
        'Code Fix - Generate corrected code, preserve original intent, minimal changes',
        'Unified Diff - Before/After comparison, visual verification of changes',
        'Multi-Language Support - Python (full), JavaScript (Beta)'
      ],
      warning: '⚠️ JavaScript support was experimental and did not guarantee correct fixes in every scenario.',
      architecture: `Frontend (HTML/CSS/JS)
    ↓
FastAPI API Layer
    ↓
ReviewAndFix Use Case
    ↓
Review Service / Fix Service / Diff Service
    ↓
Ollama Provider`,
      stack: ['Python', 'FastAPI', 'Ollama', 'JavaScript', 'HTML', 'CSS', 'pytest', 'difflib']
    },
    challenges: [
      'LLM outputs were not always valid JSON, requiring defensive parsing and normalization.',
      'Prompt assembly bugs affected review quality, leading to a refactored prompt pipeline with versioned templates.',
      'Diff generation required handling no-change scenarios, which was solved with fallback logic and validation before UI rendering.',
      'Introducing latency metrics caused regression failures that had to be corrected, resulting in a dedicated metrics testing suite.',
    ],
    observability: {
      problem: 'The system worked, but there was no visibility into where execution time was being spent.',
      solution: 'Instrumentation across the entire review pipeline.',
      metricsTracked: [
        'review_duration_ms',
        'fix_duration_ms',
        'diff_duration_ms',
        'total_duration_ms',
        'llm_duration_ms'
      ],
      architecture: `UI
 ↓
Use Case Metrics
 ↓
Service Metrics
 ↓
LLM Provider Metrics`,
      keyInsight: 'Most latency originated from LLM execution rather than backend processing. Without observability, optimization efforts would have targeted the wrong layer.',
      lessons: [
        'Measure first. Optimize later.',
        'Separate business latency from model latency.',
        'Observability is a product feature, not an afterthought.'
      ]
    },
    learnings: [
      'User experience matters even in research tools.',
      'Diff visualization makes AI suggestions actionable.',
      'Local-first gives users trust and control.',
      'Instrumentation revealed the real bottlenecks.',
      'Observability guided optimization to the LLM layer.'
    ]
  },
];

const pipelineSteps = [
  'Knowledge Discovery',
  'Knowledge Reconstruction',
  'Local Environment',
  'AI Assistant',
  'Agent Planner',
  'Agent Orchestrator',
  'Durable Execution',
  'Resilience Research',
  'Phase 31 Recovery & Distributed Kernel Recovery',
  'AI Dev Studio',
];

export default function AIResearchLab() {
  const [openIndex, setOpenIndex] = useState<number>(-1);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [currentPhaseImages, setCurrentPhaseImages] = useState<string[]>([]);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const togglePhase = (index: number) => {
    const isOpening = openIndex !== index;
    setOpenIndex(isOpening ? index : -1);
  };

  const isFirstRender = useRef(true);

useEffect(() => {
  if (isFirstRender.current) {
    isFirstRender.current = false;
    return;
  }
  if (openIndex !== -1 && buttonRefs.current[openIndex]) {
    buttonRefs.current[openIndex]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}, [openIndex]);

  const openLightbox = (images: string[], index: number) => {
    setCurrentPhaseImages(images);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setCurrentPhaseImages([]);
  };

  const goToPrevious = useCallback(() => {
    if (lightboxIndex !== null && lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
    } else if (lightboxIndex === 0 && currentPhaseImages.length > 0) {
      setLightboxIndex(currentPhaseImages.length - 1);
    }
  }, [lightboxIndex, currentPhaseImages.length]);

  const goToNext = useCallback(() => {
    if (lightboxIndex !== null && lightboxIndex < currentPhaseImages.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
    } else if (lightboxIndex === currentPhaseImages.length - 1 && currentPhaseImages.length > 0) {
      setLightboxIndex(0);
    }
  }, [lightboxIndex, currentPhaseImages.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === 'ArrowLeft') goToPrevious();
        if (e.key === 'ArrowRight') goToNext();
        if (e.key === 'Escape') closeLightbox();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, goToPrevious, goToNext]);

  return (
    <section id="ai-research-lab" className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-4">
        <span className="text-sm font-semibold tracking-wider text-sky-400 border-l-4 border-sky-400 pl-3">
          AI RESEARCH LAB
        </span>
      </div>
      <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
        From AI curiosity to practical developer tools.
      </h2>
      <p className="text-slate-300 text-lg max-w-3xl mb-8">
        A personal research initiative focused on local-first AI systems,
        agent orchestration, resilience patterns, and practical developer
        tooling under real hardware constraints.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
          <div className="text-2xl md:text-3xl font-bold text-cyan-400">6+</div>
          <div className="text-sm text-slate-400">Major Prototypes</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
          <div className="text-2xl md:text-3xl font-bold text-cyan-400">4</div>
          <div className="text-sm text-slate-400">Architectural Iterations</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
          <div className="text-2xl md:text-3xl font-bold text-cyan-400">8+</div>
          <div className="text-sm text-slate-400">Months of Research</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
          <div className="text-2xl md:text-3xl font-bold text-cyan-400">100%</div>
          <div className="text-sm text-slate-400">Local-First</div>
        </div>
      </div>

      <div className="relative pl-4 md:pl-8 border-l-2 border-slate-800 ml-4 space-y-4">
        {phases.map((phase, index) => {
          const isOpen = openIndex === index;
          const isSpecial = phase.title.includes('Phase 31') || phase.title === 'AI Dev Studio';

          const getAllImages = (): string[] => {
            const images: string[] = [];
            if (phase.galleryImages) {
              phase.galleryImages.forEach(img => images.push(img.src));
            } else if (phase.secondaryImages) {
              images.push(phase.image);
              phase.secondaryImages.forEach(img => images.push(img.src));
            } else if (phase.image2) {
              images.push(phase.image);
              images.push(phase.image2);
            } else if (phase.image) {
              images.push(phase.image);
            }
            return images;
          };

          const phaseImages = getAllImages();

          return (
            <div key={phase.title} className="relative">
              {index < phases.length - 1 && (
                <div className="absolute left-[-2px] top-8 bottom-0 w-0.5 bg-slate-700/50 -translate-x-1/2" />
              )}
              <button
                ref={(el) => { buttonRefs.current[index] = el; }}
                onClick={() => togglePhase(index)}
                className="w-full text-left group"
              >
                <div className={`flex items-center justify-between gap-4 p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-cyan-500 transition ${isSpecial ? 'md:py-6' : ''}`}>
                  <div className="flex items-center gap-4">
                    <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 border border-slate-700 text-cyan-400 font-mono text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <div className="text-sm text-slate-400">{phase.period}</div>
                      <div className={`text-lg font-semibold text-slate-100 ${isSpecial ? 'md:text-xl' : ''}`}>
                        {phase.title}
                      </div>
                    </div>
                  </div>
                  <ChevronDownIcon
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              {isOpen && (
                <div className={`mt-3 ml-12 space-y-4 mb-12 ${isSpecial ? 'space-y-6' : ''}`}>
                  <div className="space-y-2">
                    {phase.galleryImages ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {phase.galleryImages.map((img, idx) => (
                          <div key={idx}>
                            <div
                              className="rounded-xl overflow-hidden border border-slate-700 bg-slate-900 cursor-pointer transition hover:opacity-90"
                              onClick={() => openLightbox(phaseImages, idx)}
                            >
                              <img
                                src={img.src}
                                alt={img.caption}
                                className="w-full h-auto object-contain opacity-80"
                              />
                            </div>
                            {img.caption && (
                              <p className="text-xs text-slate-400 italic mt-2 text-center">
                                {img.caption}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : phase.secondaryImages ? (
                      <>
                        <div
                          className="rounded-xl overflow-hidden border border-slate-700 bg-slate-900 cursor-pointer transition hover:opacity-90"
                          onClick={() => openLightbox(phaseImages, 0)}
                        >
                          <img
                            src={phase.image}
                            alt={`${phase.title} - principal`}
                            className="w-full h-auto object-contain opacity-80"
                          />
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                          {phase.secondaryImages.map((img, idx) => (
                            <div key={idx} className="flex-1">
                              <div
                                className="rounded-xl overflow-hidden border border-slate-700 bg-slate-900 flex items-center justify-center h-[280px] md:h-[320px] cursor-pointer transition hover:opacity-90"
                                onClick={() => openLightbox(phaseImages, idx + 1)}
                              >
                                <img
                                  src={img.src}
                                  alt={img.caption}
                                  className="w-full h-full object-contain opacity-80"
                                />
                              </div>
                              <p className="text-xs text-slate-400 italic mt-2 text-center">
                                {img.caption}
                              </p>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : phase.image2 ? (
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                          <div
                            className="rounded-xl overflow-hidden border border-slate-700 bg-slate-900 flex items-center justify-center h-[280px] md:h-[320px] cursor-pointer transition hover:opacity-90"
                            onClick={() => openLightbox(phaseImages, 0)}
                          >
                            <img
                              src={phase.image}
                              alt={`${phase.title} screenshot`}
                              className="w-full h-full object-contain opacity-80"
                            />
                          </div>
                          {phase.caption1 && (
                            <p className="text-xs text-slate-400 italic mt-2 text-center">
                              {phase.caption1}
                            </p>
                          )}
                        </div>
                        <div className="flex-1">
                          <div
                            className="rounded-xl overflow-hidden border border-slate-700 bg-slate-900 flex items-center justify-center h-[280px] md:h-[320px] cursor-pointer transition hover:opacity-90"
                            onClick={() => openLightbox(phaseImages, 1)}
                          >
                            <img
                              src={phase.image2}
                              alt="Inspiration diagram"
                              className="w-full h-full object-contain opacity-80"
                            />
                          </div>
                          {phase.caption2 && (
                            <p className="text-xs text-slate-400 italic mt-2 text-center">
                              {phase.caption2}
                            </p>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div
                        className="rounded-xl overflow-hidden border border-slate-700 cursor-pointer transition hover:opacity-90"
                        onClick={() => openLightbox(phaseImages, 0)}
                      >
                        <img
                          src={phase.image}
                          alt={`${phase.title} screenshot`}
                          className="w-full h-auto object-contain opacity-80"
                        />
                      </div>
                    )}
                  </div>

                  {phase.evolutionText && (
                    <div>
                      <h4 className="text-md font-semibold text-cyan-400 mb-2">
                        How this concept influenced later experiments
                      </h4>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {phase.evolutionText}
                      </p>
                    </div>
                  )}

                  <div className="text-slate-300 leading-relaxed whitespace-pre-line">
                    {phase.description}
                  </div>

                  {phase.infrastructureConstraints && (
                    <div className="bg-slate-900/20 rounded-xl p-4 border border-slate-700">
                      <h4 className="text-md font-semibold text-cyan-400 mb-3">
                        Hardware Constraints
                      </h4>
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                          <h5 className="text-sm font-semibold text-slate-200 mb-2">Hardware:</h5>
                          <ul className="space-y-1 text-slate-300 text-sm list-disc pl-5">
                            {phase.infrastructureConstraints.hardware.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex-1">
                          <h5 className="text-sm font-semibold text-slate-200 mb-2">Key Findings:</h5>
                          <ul className="space-y-1 text-slate-300 text-sm list-disc pl-5">
                            {phase.infrastructureConstraints.keyFindings.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {phase.keyResearchFindings && (
                    <div className="bg-slate-900/20 rounded-xl p-4 border border-slate-700">
                      <h4 className="text-md font-semibold text-cyan-400 mb-3 border-l-4 border-cyan-400 pl-3">
                        Key Research Findings
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <CpuChipIcon className="w-4 h-4 text-slate-400" />
                            <h5 className="text-sm font-semibold text-slate-200">Models</h5>
                          </div>
                          <ul className="space-y-1 text-slate-300 text-sm list-disc pl-5">
                            {phase.keyResearchFindings.models.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <WrenchIcon className="w-4 h-4 text-slate-400" />
                            <h5 className="text-sm font-semibold text-slate-200">Memory</h5>
                          </div>
                          <ul className="space-y-1 text-slate-300 text-sm list-disc pl-5">
                            {phase.keyResearchFindings.memory.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <BoltIcon className="w-4 h-4 text-slate-400" />
                            <h5 className="text-sm font-semibold text-slate-200">Performance</h5>
                          </div>
                          <ul className="space-y-1 text-slate-300 text-sm list-disc pl-5">
                            {phase.keyResearchFindings.performance.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <CubeIcon className="w-4 h-4 text-slate-400" />
                            <h5 className="text-sm font-semibold text-slate-200">Architecture</h5>
                          </div>
                          <ul className="space-y-1 text-slate-300 text-sm list-disc pl-5">
                            {phase.keyResearchFindings.architecture.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        {phase.keyResearchFindings.hardware && (
                          <div className="md:col-span-2">
                            <div className="flex items-center gap-2 mb-1">
                              <ComputerDesktopIcon className="w-4 h-4 text-slate-400" />
                              <h5 className="text-sm font-semibold text-slate-200">Hardware</h5>
                            </div>
                            <ul className="space-y-1 text-slate-300 text-sm list-disc pl-5">
                              {phase.keyResearchFindings.hardware.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      {phase.keyResearchFindings.footer && (
                        <div className="mt-4 pt-3 border-t border-slate-700/50 text-xs text-slate-400 italic text-center">
                          {phase.keyResearchFindings.footer}
                        </div>
                      )}
                    </div>
                  )}

                  {phase.whatWasBuilt && (
                    <div className="bg-slate-900/20 rounded-xl p-4 border border-slate-700">
                      <h4 className="text-md font-semibold text-cyan-400 mb-2 border-l-4 border-cyan-400 pl-3">
                        What Was Built
                      </h4>
                      <ul className="space-y-1 text-slate-300 text-sm list-disc pl-5">
                        {phase.whatWasBuilt.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {phase.coreConcepts && (
                    <div className="bg-slate-900/20 rounded-xl p-4 border border-slate-700">
                      <h4 className="text-md font-semibold text-cyan-400 mb-2 border-l-4 border-cyan-400 pl-3">
                        Core Concepts
                      </h4>
                      <ul className="space-y-1 text-slate-300 text-sm list-disc pl-5">
                        {phase.coreConcepts.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {phase.protectionMechanisms && (
                    <div className="bg-slate-900/20 rounded-xl p-4 border border-slate-700">
                      <h4 className="text-md font-semibold text-cyan-400 mb-2 border-l-4 border-cyan-400 pl-3">
                        Protection Mechanisms
                      </h4>
                      <ul className="space-y-1 text-slate-300 text-sm list-disc pl-5">
                        {phase.protectionMechanisms.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {phase.whatWasRecovered && (
                    <div className="bg-slate-900/20 rounded-xl p-4 border border-slate-700">
                      <h4 className="text-md font-semibold text-cyan-400 mb-3 border-l-4 border-cyan-400 pl-3">
                        Recovered Capabilities
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {phase.whatWasRecovered.map((block, idx) => (
                          <div key={idx}>
                            <h5 className="text-sm font-semibold text-slate-200 mb-1">{block.category}</h5>
                            <ul className="space-y-1 text-slate-300 text-sm list-disc pl-5">
                              {block.items.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {phase.recoveryProcess && (
                    <div className="bg-slate-900/20 rounded-xl p-4 border border-slate-700">
                      <h4 className="text-md font-semibold text-cyan-400 mb-2 border-l-4 border-cyan-400 pl-3">
                        Recovery Process
                      </h4>
                      <ul className="space-y-1 text-slate-300 text-sm list-disc pl-5">
                        {phase.recoveryProcess.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {phase.importGraphRepair && (
                    <div className="bg-slate-900/20 rounded-xl p-4 border border-slate-700">
                      <h4 className="text-md font-semibold text-cyan-400 mb-2 border-l-4 border-cyan-400 pl-3">
                        Import Graph Repair
                      </h4>
                      <ul className="space-y-1 text-slate-300 text-sm font-mono pl-5">
                        {phase.importGraphRepair.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {phase.validationResults && (
                    <div className="bg-slate-900/20 rounded-xl p-4 border border-slate-700">
                      <h4 className="text-md font-semibold text-cyan-400 mb-2 border-l-4 border-cyan-400 pl-3">
                        Validation Results
                      </h4>
                      <div className="grid md:grid-cols-2 gap-2">
                        {phase.validationResults.map((item) => (
                          <div key={item} className="text-slate-300 text-sm flex items-center gap-2">
                            <span className="text-cyan-400">✓</span> {item}
                          </div>
                        ))}
                      </div>
                      {phase.verifiedEndpoints && (
                        <div className="mt-3 pt-2 border-t border-slate-700/50">
                          <p className="text-xs text-slate-400">Verified endpoints: {phase.verifiedEndpoints.join(', ')}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {phase.keyFinding && (
                    <div className="bg-slate-900/30 rounded-xl p-4 border-l-4 border-cyan-500">
                      <h4 className="text-md font-semibold text-cyan-400 mb-1">Key Finding</h4>
                      <p className="text-slate-300 text-sm leading-relaxed">{phase.keyFinding}</p>
                    </div>
                  )}

                  {phase.whyReset && (
                    <div className="bg-slate-900/20 rounded-xl p-4 border border-slate-700">
                      <h4 className="text-md font-semibold text-cyan-400 mb-2 border-l-4 border-cyan-400 pl-3">
                        Why The Reset Happened
                      </h4>
                      <p className="text-slate-300 text-sm whitespace-pre-line">{phase.whyReset}</p>
                    </div>
                  )}

                  {phase.startingOver && (
                    <div className="space-y-4">
                      <div className="bg-slate-900/20 rounded-xl p-4 border border-slate-700">
                        <h4 className="text-md font-semibold text-cyan-400 mb-2 border-l-4 border-cyan-400 pl-3">
                          Starting Over
                        </h4>
                        <p className="text-slate-300 text-sm whitespace-pre-line mb-3">{phase.startingOver.story}</p>
                        <p className="text-slate-300 text-sm"><strong className="text-cyan-400">Objective:</strong> {phase.startingOver.objective}</p>
                      </div>
                      <div className="bg-slate-900/20 rounded-xl p-4 border border-slate-700">
                        <h4 className="text-md font-semibold text-cyan-400 mb-2 border-l-4 border-cyan-400 pl-3">
                          Core Features
                        </h4>
                        <ul className="space-y-1 text-slate-300 text-sm list-disc pl-5">
                          {phase.startingOver.coreFeatures.map((feature) => (
                            <li key={feature}>{feature}</li>
                          ))}
                        </ul>
                        {phase.startingOver.warning && (
                          <p className="text-xs text-yellow-500 mt-2">{phase.startingOver.warning}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {phase.challenges && (
                    <div className="bg-slate-900/20 rounded-xl p-4 border border-slate-700">
                      <h4 className="text-md font-semibold text-cyan-400 mb-2 border-l-4 border-cyan-400 pl-3">
                        Challenges Encountered
                      </h4>
                      <ul className="space-y-1 text-slate-300 text-sm list-disc pl-5">
                        {phase.challenges.map((challenge) => (
                          <li key={challenge}>{challenge}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {phase.startingOver?.architecture && (
                    <div className="bg-slate-900/20 rounded-xl p-4 border border-slate-700">
                      <h4 className="text-md font-semibold text-cyan-400 mb-2 border-l-4 border-cyan-400 pl-3">
                        Architecture
                      </h4>
                      <pre className="text-slate-300 text-sm font-mono whitespace-pre">{phase.startingOver.architecture}</pre>
                    </div>
                  )}

                  {phase.startingOver?.stack && (
                    <div className="bg-slate-900/20 rounded-xl p-4 border border-slate-700">
                      <h4 className="text-md font-semibold text-cyan-400 mb-2 border-l-4 border-cyan-400 pl-3">
                        Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {phase.startingOver.stack.map((tech) => (
                          <span key={tech} className="px-2 py-1 bg-slate-800 rounded-md text-xs text-slate-300 border border-slate-700">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {phase.observability && (
                    <div className="space-y-4">
                      <div className="bg-slate-900/20 rounded-xl p-4 border border-slate-700">
                        <h4 className="text-md font-semibold text-cyan-400 mb-2 border-l-4 border-cyan-400 pl-3">
                          Observability & Latency Analysis
                        </h4>
                        <p className="text-slate-300 text-sm"><strong className="text-cyan-400">Problem:</strong> {phase.observability.problem}</p>
                        <p className="text-slate-300 text-sm mt-1"><strong className="text-cyan-400">Solution:</strong> {phase.observability.solution}</p>
                      </div>
                      <div className="bg-slate-900/20 rounded-xl p-4 border border-slate-700">
                        <h4 className="text-md font-semibold text-cyan-400 mb-2 border-l-4 border-cyan-400 pl-3">
                          Metrics Tracked
                        </h4>
                        <ul className="space-y-1 text-slate-300 text-sm list-disc pl-5">
                          {phase.observability.metricsTracked.map((metric) => (
                            <li key={metric}><code className="text-xs bg-slate-800 px-1 rounded">{metric}</code></li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-slate-900/20 rounded-xl p-4 border border-slate-700">
                        <h4 className="text-md font-semibold text-cyan-400 mb-2 border-l-4 border-cyan-400 pl-3">
                          Instrumentation Architecture
                        </h4>
                        <pre className="text-slate-300 text-sm font-mono whitespace-pre">{phase.observability.architecture}</pre>
                      </div>
                      <div className="bg-slate-900/30 rounded-xl p-4 border-l-4 border-cyan-500">
                        <h4 className="text-md font-semibold text-cyan-400 mb-1">Key Insight</h4>
                        <p className="text-slate-300 text-sm">{phase.observability.keyInsight}</p>
                      </div>
                      <div className="bg-slate-900/20 rounded-xl p-4 border border-slate-700">
                        <h4 className="text-md font-semibold text-cyan-400 mb-2 border-l-4 border-cyan-400 pl-3">
                          Lessons Learned
                        </h4>
                        <ul className="space-y-1 text-slate-300 text-sm list-disc pl-5">
                          {phase.observability.lessons.map((lesson) => (
                            <li key={lesson}>{lesson}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  <div className="bg-slate-900/30 rounded-xl p-4 border-l-4 border-cyan-500">
                    <h4 className="text-md font-semibold text-cyan-400 mb-2">
                      {phase.title === 'Local AI Environment' ? 'Engineering Insights' :
                       phase.title === 'AI Dev Assistant' ? 'Lessons Learned' :
                       phase.title === 'VS Code AI Assistant' ? 'Architectural Lessons' :
                       phase.title === 'Durable Execution' ? 'Key Insights' :
                       phase.title === 'Resilience Engineering' ? 'Resilience Lessons' :
                       phase.title.includes('Phase 31') ? 'Recovery Lessons' :
                       phase.title === 'AI Dev Studio' ? 'Product Lessons' :
                       'What I Learned'}
                    </h4>
                    <ul className="space-y-1 text-slate-300 text-sm list-disc pl-5">
                      {phase.learnings.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {phase.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-slate-800 rounded-full text-sm text-slate-300 border border-cyan-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-16 pt-8 border-t border-slate-800">
        <h3 className="text-2xl font-bold text-cyan-400 mb-8 text-center">
          AI Research Journey Pipeline
        </h3>
        <div className="hidden md:flex flex-wrap justify-center items-center gap-0">
          {pipelineSteps.map((step, idx) => (
            <div key={step} className="flex items-center">
              <div className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-medium text-slate-200 shadow-md text-center min-w-[110px] max-w-[130px] whitespace-normal break-words">
                {step}
              </div>
              {idx < pipelineSteps.length - 1 && (
                <div className="mx-2 text-cyan-400 text-xl font-bold">→</div>
              )}
            </div>
          ))}
        </div>
        <div className="md:hidden flex flex-col items-center gap-1">
          {pipelineSteps.map((step, idx) => (
            <div key={step} className="flex flex-col items-center">
              <div className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-medium text-slate-200 shadow-md text-center min-w-[140px] whitespace-normal break-words">
                {step}
              </div>
              {idx < pipelineSteps.length - 1 && (
                <div className="text-cyan-400 text-lg my-1">↓</div>
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-slate-200 font-bold text-base md:text-lg mt-6 tracking-wide">
          Research → Prototype → Platform → Recovery → Product
        </p>
      </div>

      <div className="mt-16 pt-8 border-t border-slate-800">
        <h3 className="text-2xl font-bold text-cyan-400 mb-6 text-center">
          What This Research Taught Me
        </h3>
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {[
            'Complexity is not the same as capability.',
            'Reliability matters more than autonomy.',
            'Local AI systems are constrained by hardware.',
            'Observability is a feature, not an afterthought.',
            'Durable execution requires state management.',
            'Recovery mechanisms must be designed early.',
            'Smaller products often deliver more value than larger architectures.'
          ].map((lesson) => (
            <div key={lesson} className="flex items-start gap-3">
              <span className="text-cyan-400 text-lg mt-0.5">✓</span>
              <span className="text-slate-200 leading-relaxed">{lesson}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-slate-800">
        <h3 className="text-2xl font-bold text-cyan-400 mb-6">Key Lessons</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            'More agents do not automatically create better systems.',
            'Hardware constraints shape architecture.',
            'Resilience matters more than autonomy.',
            'The system around the model is often more important than the model itself.',
          ].map((lesson) => (
            <div key={lesson} className="flex items-start gap-3">
              <span className="text-cyan-400 text-lg mt-0.5">✓</span>
              <span className="text-slate-200 leading-relaxed">{lesson}</span>
            </div>
          ))}
        </div>
      </div>

            {/* Lightbox Modal con navegación */}
      {lightboxIndex !== null && currentPhaseImages.length > 0 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeLightbox}
          tabIndex={0}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <img
              src={currentPhaseImages[lightboxIndex]}
              alt={`Imagen ${lightboxIndex + 1} de ${currentPhaseImages.length}`}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
            
            {/* Flecha izquierda - solo si hay imagen anterior */}
            {currentPhaseImages.length > 1 && lightboxIndex > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
                aria-label="Imagen anterior"
              >
                <ChevronLeftIcon className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            )}

            {/* Flecha derecha - solo si hay imagen siguiente */}
            {currentPhaseImages.length > 1 && lightboxIndex < currentPhaseImages.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
                aria-label="Imagen siguiente"
              >
                <ChevronRightIcon className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            )}

            {/* Contador - solo si hay más de 1 imagen */}
            {currentPhaseImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 text-white text-xs md:text-sm">
                {lightboxIndex + 1} / {currentPhaseImages.length}
              </div>
            )}

            {/* Botón cerrar (siempre visible) */}
            <button
              onClick={closeLightbox}
              className="absolute top-2 right-2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
              aria-label="Cerrar"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}