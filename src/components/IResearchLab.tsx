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
import phase7ImgDashboard from '../assets/images/ai-lab/hero-dashboard-chat.png';
import phase7ImgGitLog from '../assets/images/ai-lab/phase31-recovery-git-history.png';
import phase7ImgImportError from '../assets/images/ai-lab/phase31-runtime-startup-recovered-modules.png';
import phase7ImgFileTree from '../assets/images/ai-lab/phase31-distributed-kernel-files.png';
import phase7ImgTerminal from '../assets/images/ai-lab/dashboardTurboHealthy.png';
// Imágenes para AI Dev Studio
import devStudioImg1 from '../assets/images/ai-lab/main-ui.png';
import devStudioImg2 from '../assets/images/ai-lab/review-fix-diff.png';
import devStudioImg6 from '../assets/images/ai-lab/review-fix.png';
import devStudioImg4 from '../assets/images/ai-lab/latency-dashboard.png';
import devStudioImg3 from '../assets/images/ai-lab/endpoint-flow.png';
import devStudioImg5 from '../assets/images/ai-lab/pytest-run.png';

// ========== TODAS LAS FASES (orden cronológico original) ==========
const allPhases = [
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
  // ========== PHASE 31 ==========
  {
    title: 'Phase 31 Recovery & Distributed Runtime Validation',
    period: 'June 2026',
    description:
      'Recovered a previously abandoned distributed execution branch that had been rolled back months earlier.\n\n' +
      'The original branch contained advanced work that extended the system from a local AI assistant into a distributed execution kernel featuring durable execution, multi-node coordination, consensus protocols, chaos engineering, and formal verification research.\n\n' +
      'Using historical Git references, archived notes, and surviving branch snapshots, the system was successfully recovered and validated.',
    tags: [
      'Distributed Systems', 'Durable Execution', 'Checkpointing', 'Consensus',
      'Raft', 'Chaos Engineering', 'Formal Verification', 'System Recovery',
      'Git Forensics', 'Architecture Archaeology', 'Runtime Validation'
    ],
    heroImage: {
      src: phase7ImgDashboard,
      caption: 'Phase 31 runtime successfully restored after reconstructing the distributed execution kernel and dependency graph.'
    },
    galleryImages: [
      { src: phase7ImgGitLog, caption: 'Git archaeology across Phases 20–31.' },
      { src: phase7ImgImportError, caption: 'Recovered modules and successful runtime startup.' },
      { src: phase7ImgFileTree, caption: 'Recovered distributed execution kernel modules.' },
      { src: phase7ImgTerminal, caption: 'End-to-end request execution validation.' }
    ],
    whatWasRecovered: [
      { category: 'Durable Execution System', items: ['Persistent Queue', 'Checkpointing', 'Crash Recovery', 'Replayable State', 'Resumable Workers'] },
      { category: 'Distributed Execution', items: ['Node Registry', 'Distributed Scheduler', 'Task Leasing', 'Failure Recovery', 'Global Coordination'] },
      { category: 'Consensus Research Layer', items: ['Leader Election', 'Global Ordering', 'Deduplication', 'State Reconciliation'] },
      { category: 'Advanced Research Artifacts', items: ['Raft Consensus Prototype', 'Multi-Region Coordination Research', 'Chaos Engineering Framework', 'Formal Verification Layer', 'Lean Proof Skeleton'] }
    ],
    recoveryProcess: [
      'Recovered historical commits: Phase 20 → Durable Execution System (97aa3b6)',
      'Phase 21 → Distributed Multi-Node Execution (84708d7)',
      'Phase 22 → Consensus-Aware Distributed Kernel (69e00da)',
      'Phase 23 → Raft Consensus Layer (a426cfd)',
      'Phase 24 → Formal Verification + Chaos Engineering (66f8341)',
      'Phase 31 → Architecture Freeze + Lean Verification (de0ad4a)',
      'Phase 31 Runtime Validation (June 2026)'
    ],
    importGraphRepair: [
      'from app.node_registry import ...',
      'from app.distributed_scheduler import ...',
      'from app.persistent_queue import ...'
    ],
    rootCauseAnalysis: {
      primaryCause: 'Module relocation without synchronized import graph updates.',
      examples: ['node_registry.py', 'distributed_scheduler.py', 'persistent_queue.py'],
      details: 'were moved into backend/app/ while multiple components still referenced the old paths. This produced cascading import failures that prevented FastAPI startup and created the appearance of a broken architecture. The underlying execution kernel remained intact.'
    },
    recoveryMetrics: {
      branches: 4,
      phases: '20 → 31',
      modules: '6+',
      endpoints: '5+',
      commitsRecovered: '12+',
      runtime: 'YES',
      dashboard: 'YES',
      streamingLayer: 'YES',
      orchestrator: 'YES',
      executionEngine: 'YES'
    },
    runtimeRecoveryEvidence: [
      '✓ FastAPI backend startup',
      '✓ Dashboard operational',
      '✓ Task menu operational',
      '✓ Intent routing operational',
      '✓ Planning engine operational',
      '✓ Execution engine operational',
      '✓ SSE event streaming operational',
      '✓ Resource governance operational',
      '✓ Adaptive performance modes operational',
      '✓ Planner generated execution plans',
      '✓ Code generation tasks executed',
      '✓ Live telemetry verified',
      '✓ End-to-end request execution verified'
    ],
    validationResults: [
      'FastAPI startup', 'System Dashboard', 'Task Menu', 'Intent Routing',
      'Planning Engine', 'Execution Engine', 'Runtime Telemetry',
      'Adaptive Performance Modes', 'SSE Streaming Connectivity',
      'End-to-End Request Execution'
    ],
    verifiedEndpoints: ['/stats-live', '/menu', '/test-connection', '/stream/{request_id}'],
    keyFinding: 'The distributed kernel was never lost. The apparent architectural failure was caused by import graph corruption introduced during refactoring. After reconstructing the dependency graph and restoring critical runtime modules, the Phase 31 system successfully booted, streamed events, executed plans, generated code, and validated its distributed runtime architecture.',
    engineeringLessons: [
      'Architectural failures can be caused by dependency drift rather than defective system design.',
      'Large distributed systems require dependency graph validation after major refactors.',
      'Git history can serve as a long-term disaster recovery mechanism.',
      'Runtime validation is required before declaring a historical architecture permanently lost.',
      'Recovering abandoned systems often requires software archaeology techniques.'
    ],
    learnings: [
      'Git history can preserve months of engineering work long after a rollback.',
      'Distributed systems are significantly harder to refactor than monolithic architectures.',
      'Architectural archaeology is sometimes required to understand large AI systems.',
      'Recovery efforts can reveal capabilities that were believed to be permanently lost.',
      'Import graph corruption can mimic architectural failure — always verify the difference.'
    ]
  }
];

// ========== TIMELINE: Phase 31 al PRINCIPIO ==========
const phase31 = allPhases[allPhases.length - 1];
const otherPhases = allPhases.slice(0, -1);
const phases = [phase31, ...otherPhases];

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

const devStudioImages = [
  { src: devStudioImg2, caption: 'Review + Fix + Diff workflow' },
  { src: devStudioImg6, caption: 'Review → Fix workflow' },
  { src: devStudioImg4, caption: 'Latency dashboard' },
  { src: devStudioImg3, caption: 'Endpoint flow and orchestration path' },
  { src: devStudioImg5, caption: 'Regression testing after instrumentation changes' },
  { src: devStudioImg1, caption: 'Initial code review interface' },
];

export default function AIResearchLab() {
  const [openIndex, setOpenIndex] = useState<number>(-1);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [currentPhaseImages, setCurrentPhaseImages] = useState<string[]>([]);
  const [showDevStudioCaseStudy, setShowDevStudioCaseStudy] = useState(false);
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

      {/* ========== PROJECT RESOURCES ========== */}
      <div className="flex flex-wrap gap-4 mb-12">
        <a
          href="https://github.com/Chesza/ai-dev-assistant-vscode"
          target="_blank"
          rel="noreferrer"
          className="px-6 py-3 bg-sky-500 rounded-lg font-medium text-sm hover:bg-sky-600 transition"
        >
          View GitHub
        </a>
        <button
          onClick={() => {
            const timeline = document.getElementById('timeline');
            if (timeline) {
              timeline.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
          className="px-6 py-3 bg-sky-500 rounded-lg font-medium text-sm hover:bg-sky-600 transition"
        >
          Explore Journey
        </button>
        <button
          onClick={() => {
            const timeline = document.getElementById('timeline');
            if (timeline) {
              timeline.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
          className="px-6 py-3 bg-sky-500 rounded-lg font-medium text-sm hover:bg-sky-600 transition"
        >
          31 Engineering Phases
        </button>
      </div>

      {/* ========== MÉTRICAS ACTUALIZADAS ========== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
          <div className="text-2xl md:text-3xl font-bold text-cyan-400">31</div>
          <div className="text-sm text-slate-400">Engineering Phases</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
          <div className="text-2xl md:text-3xl font-bold text-cyan-400">8+</div>
          <div className="text-sm text-slate-400">Months Research</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
          <div className="text-2xl md:text-3xl font-bold text-cyan-400">100%</div>
          <div className="text-sm text-slate-400">Local-First</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
          <div className="text-2xl md:text-3xl font-bold text-cyan-400">6+</div>
          <div className="text-sm text-slate-400">Major Prototypes</div>
        </div>
      </div>

      {/* ========== TIMELINE (sin línea vertical) ========== */}
      <div id="timeline" className="space-y-4">
        {phases.map((phase, index) => {
          const isOpen = openIndex === index;
          const isSpecial = phase.title.includes('Phase 31');

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

          const galleryImages = 'galleryImages' in phase && phase.galleryImages ? phase.galleryImages : [];
          const phaseImages = getAllImages();
          
          return (
            <div key={phase.title} className="relative">
              <button
                ref={(el) => { buttonRefs.current[index] = el; }}
                onClick={() => togglePhase(index)}
                className="w-full text-left group"
              >
                <div className={`flex items-center justify-between gap-4 p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-cyan-500 transition ${isSpecial ? 'md:py-6 border-cyan-500/30' : ''}`}>
                  <div className="flex items-center gap-4">
                    <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 border border-slate-700 text-cyan-400 font-mono text-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <div className="text-sm text-slate-400">{phase.period}</div>
                      <div className={`text-lg font-semibold text-slate-100 ${isSpecial ? 'md:text-xl text-cyan-400' : ''}`}>
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
                    {phase.heroImage && (
                      <div className="mb-4">
                        <div
                          className="rounded-xl overflow-hidden border border-slate-700 bg-slate-900 cursor-pointer transition hover:opacity-90"
                          onClick={() => {
                            const heroImages = [phase.heroImage.src];
                            const galleryImages = phase.galleryImages?.map(img => img.src) || [];
                            const allImages = [...heroImages, ...galleryImages];
                            openLightbox(allImages, 0);
                          }}
                        >
                          <img
                            src={phase.heroImage.src}
                            alt="Dashboard recovered"
                            className="w-full h-auto object-contain opacity-80"
                          />
                        </div>
                        <p className="text-xs text-slate-400 italic mt-2 text-center max-w-3xl mx-auto">
                          {phase.heroImage.caption}
                        </p>
                      </div>
                    )}

                    {galleryImages.length > 0 && !phase.heroImage && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {galleryImages.map((img: { src: string; caption: string }, idx: number) => (
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
                    )}

                    {phase.heroImage && phase.galleryImages && phase.galleryImages.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        {phase.galleryImages.map((img, idx) => (
                          <div key={idx}>
                            <div
                              className="rounded-xl overflow-hidden border border-slate-700 bg-slate-900 cursor-pointer transition hover:opacity-90"
                              onClick={() => {
                                const heroImages = [phase.heroImage.src];
                                const galleryImages = phase.galleryImages.map(img => img.src);
                                const allImages = [...heroImages, ...galleryImages];
                                openLightbox(allImages, idx + 1);
                              }}
                            >
                              <img
                                src={img.src}
                                alt={img.caption}
                                className="w-full h-48 md:h-56 object-cover opacity-80"
                              />
                            </div>
                            <p className="text-xs text-slate-400 italic mt-2 text-center">
                              {img.caption}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {!phase.heroImage && !phase.galleryImages && phase.secondaryImages && (
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
                    )}

                    {!phase.heroImage && !phase.galleryImages && !phase.secondaryImages && phase.image2 && (
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
                    )}

                    {!phase.heroImage && !phase.galleryImages && !phase.secondaryImages && !phase.image2 && phase.image && (
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
                      <h4 className="text-md font-semibold text-cyan-400 mb-3">Hardware Constraints</h4>
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
                    {/* Models */}
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
                    {/* Memory */}
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
                    {/* Performance */}
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
                    {/* Architecture */}
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
                    {/* Hardware */}
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

                  <div className="bg-slate-900/30 rounded-xl p-4 border-l-4 border-cyan-500">
                    <h4 className="text-md font-semibold text-cyan-400 mb-2">
                      {phase.title === 'Local AI Environment' ? 'Engineering Insights' :
                       phase.title === 'AI Dev Assistant' ? 'Lessons Learned' :
                       phase.title === 'VS Code AI Assistant' ? 'Architectural Lessons' :
                       phase.title === 'Durable Execution' ? 'Key Insights' :
                       phase.title === 'Resilience Engineering' ? 'Resilience Lessons' :
                       phase.title.includes('Phase 31') ? 'Recovery Lessons' :
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

      {/* ========== AI RESEARCH JOURNEY PIPELINE ========== */}
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

      {/* ========== WHAT THIS RESEARCH TAUGHT ME ========== */}
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

      {/* ========== KEY LESSONS ========== */}
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

      {/* ========== AI DEV STUDIO - PROYECTO CARD ========== */}
      <section className="mt-16 pt-8 border-t border-slate-800">
        <div className="mb-4">
          <span className="text-sm font-semibold tracking-wider text-cyan-400 border-l-4 border-cyan-400 pl-3">
            AI PRODUCT
          </span>
        </div>
        <p className="text-slate-400 mb-8 text-lg">
          From research to a practical developer tool.
        </p>

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 md:p-8 shadow-xl">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Left column: project narrative */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-2">
                AI Dev Studio
              </h2>
              <p className="text-cyan-400 font-medium text-sm mb-5">
                From Research To Product
              </p>

              <p className="text-slate-300 text-sm leading-relaxed mb-6 border-l-4 border-slate-700 pl-4">
                Refocused the research into a practical local-first code review and code-fix tool with diff visualization and a simple web UI.
              </p>

              <div className="mb-5">
                <h3 className="text-lg font-semibold text-cyan-300 mb-1">Overview</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  AI Dev Studio is the next evolution of the AI research journey. Instead of continuously increasing complexity, the project focuses on building smaller, more reliable and maintainable AI systems. The goal is to transform years of experimentation into a practical developer product.
                </p>
              </div>

              <div className="mb-5">
                <h3 className="text-lg font-semibold text-cyan-300 mb-1">Architecture</h3>
                <div className="bg-slate-800/50 rounded-lg p-3 font-mono text-xs text-slate-300 whitespace-pre overflow-x-auto">
{`Frontend (HTML/CSS/JS)
    ↓
FastAPI API Layer
    ↓
ReviewAndFix Use Case
    ↓
Review Service / Fix Service / Diff Service
    ↓
Ollama Provider`}
                </div>
              </div>

              <div className="mb-5">
                <h3 className="text-lg font-semibold text-cyan-300 mb-1">Goals</h3>
                <ul className="text-slate-300 text-sm list-disc pl-5 space-y-1">
                  <li>Build a maintainable local-first AI tool</li>
                  <li>Focus on code review and code-fix workflows</li>
                  <li>Show diffs so AI suggestions become actionable</li>
                  <li>Use observability to understand real bottlenecks</li>
                </ul>
              </div>

              <div className="mb-5">
                <h3 className="text-lg font-semibold text-cyan-300 mb-1">Status</h3>
                <div className="flex flex-wrap gap-2">
                  {['Private Repository', 'Active Development', 'AI Engineering', 'Code Analysis', 'Developer Experience'].map((status) => (
                    <span
                      key={status}
                      className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-cyan-500/30"
                    >
                      {status}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-200 mb-2">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'FastAPI', 'Ollama', 'JavaScript', 'HTML', 'CSS', 'pytest', 'difflib'].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 bg-slate-800 rounded-full text-xs text-slate-300 border border-cyan-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setShowDevStudioCaseStudy(true)}
                className="px-5 py-2.5 bg-cyan-500 rounded-lg font-medium text-sm hover:bg-cyan-400 transition inline-flex items-center gap-2"
              >
                Read Case Study
              </button>
            </div>

            {/* Right column: hero image + compact supporting gallery */}
            <div className="space-y-4">
              <div>
                <div
                  className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-800 cursor-pointer transition hover:opacity-90 shadow-2xl"
                  onClick={() => openLightbox(devStudioImages.map((img) => img.src), 0)}
                >
                  <img
                    src={devStudioImg2}
                    alt="AI Dev Studio review, fix and diff workflow"
                    className="w-full h-auto object-contain"
                  />
                  <div className="absolute inset-0 pointer-events-none rounded-xl ring-1 ring-inset ring-white/10" />
                </div>
                <p className="text-xs text-slate-400 italic mt-2 text-center">
                  Review + Fix + Diff workflow
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {devStudioImages.slice(1).map((img, idx) => (
                  <button
                    type="button"
                    key={img.caption}
                    className="group text-left"
                    onClick={() => openLightbox(devStudioImages.map((item) => item.src), idx + 1)}
                  >
                    <div className="rounded-lg overflow-hidden border border-slate-700 bg-slate-800 transition group-hover:border-cyan-400/70 group-hover:opacity-90">
                      <img
                        src={img.src}
                        alt={img.caption}
                        className="w-full h-28 md:h-32 object-cover object-top"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 italic mt-1 text-center line-clamp-2">
                      {img.caption}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== AI DEV STUDIO CASE STUDY MODAL ========== */}
      {showDevStudioCaseStudy && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowDevStudioCaseStudy(false);
            }
          }}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-800/50">
              <div>
                <h3 className="text-lg font-semibold text-slate-100">Case Study: AI Dev Studio</h3>
                <p className="text-xs text-cyan-400">Local-first code review and code-fix tool</p>
              </div>
              <button
                onClick={() => setShowDevStudioCaseStudy(false)}
                className="p-2 rounded-lg hover:bg-slate-700 transition text-slate-400 hover:text-white"
                aria-label="Close AI Dev Studio case study"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
              <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-6 items-start">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-cyan-400">AI Dev Studio</h2>
                  <p className="text-slate-300 italic mt-1">From Research To Product</p>
                  <p className="text-slate-300 leading-relaxed mt-4">
                    Refocused the research into a practical local-first code review and code-fix tool with diff visualization and a simple web UI.
                  </p>
                </div>
                <div>
                  <div
                    className="rounded-xl overflow-hidden border border-slate-700 bg-slate-800 cursor-pointer hover:opacity-90 transition"
                    onClick={() => openLightbox(devStudioImages.map((img) => img.src), 0)}
                  >
                    <img
                      src={devStudioImg2}
                      alt="AI Dev Studio review, fix and diff workflow"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                  <p className="text-xs text-slate-400 italic mt-2 text-center">
                    Main workflow: review, fix and diff verification
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {devStudioImages.slice(1).map((img, idx) => (
                  <button
                    type="button"
                    key={img.caption}
                    className="group text-left"
                    onClick={() => openLightbox(devStudioImages.map((item) => item.src), idx + 1)}
                  >
                    <div className="rounded-lg overflow-hidden border border-slate-700 bg-slate-800 transition group-hover:border-cyan-400/70 group-hover:opacity-90">
                      <img
                        src={img.src}
                        alt={img.caption}
                        className="w-full h-24 object-cover object-top"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 italic mt-1 text-center line-clamp-2">
                      {img.caption}
                    </p>
                  </button>
                ))}
              </div>

              <div className="bg-slate-900/30 rounded-xl p-4 border border-slate-700">
                <h3 className="text-lg font-semibold text-cyan-300 mb-2">Why The Reset Happened</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-3">
                  Previous experiments explored orchestration, durable execution, checkpoint recovery, distributed runtimes, and resilience engineering.
                </p>
                <p className="text-slate-300 text-sm leading-relaxed mb-3">
                  Although technically successful, the increasing complexity produced diminishing returns for daily developer workflows.
                </p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  AI Dev Studio was created as a deliberate reset: a smaller, local-first tool focused on practical code review, code fixes, diffs, and observability.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-900/30 rounded-xl p-4 border border-slate-700">
                  <h3 className="text-lg font-semibold text-cyan-300 mb-2">Starting Over</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-3">
                    After the complexity reached in AI Dev Assistant, I decided to restart from zero. The goal was to build a small, understandable, and useful tool for daily developer tasks: review code, suggest fixes, show diffs, and run completely locally.
                  </p>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    <span className="font-semibold text-cyan-300">Objective:</span> Build a local-first code review assistant focused on practical developer workflows.
                  </p>
                </div>

                <div className="bg-slate-900/30 rounded-xl p-4 border border-slate-700">
                  <h3 className="text-lg font-semibold text-cyan-300 mb-2">Core Features</h3>
                  <ul className="text-slate-300 text-sm list-disc pl-5 space-y-1">
                    <li><strong>Code Review</strong> — Detect issues, explain findings, structured output</li>
                    <li><strong>Code Fix</strong> — Generate corrected code, preserve original intent, minimal changes</li>
                    <li><strong>Unified Diff</strong> — Before/After comparison, visual verification of changes</li>
                    <li><strong>Multi-Language Support</strong> — Python full support, JavaScript beta</li>
                  </ul>
                  <p className="text-xs text-amber-300 mt-3">
                    ⚠️ JavaScript support was experimental and did not guarantee correct fixes in every scenario.
                  </p>
                </div>
              </div>

              <div className="bg-slate-900/30 rounded-xl p-4 border border-slate-700">
                <h3 className="text-lg font-semibold text-cyan-300 mb-2">Challenges Encountered</h3>
                <ul className="text-slate-300 text-sm list-disc pl-5 space-y-1">
                  <li>LLM outputs were not always valid JSON, requiring defensive parsing and normalization.</li>
                  <li>Prompt assembly bugs affected review quality, leading to a refactored prompt pipeline with versioned templates.</li>
                  <li>Diff generation required handling no-change scenarios, solved with fallback logic and validation before UI rendering.</li>
                  <li>Introducing latency metrics caused regression failures that had to be corrected, resulting in a dedicated metrics testing suite.</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-900/30 rounded-xl p-4 border border-slate-700">
                  <h3 className="text-lg font-semibold text-cyan-300 mb-2">Architecture</h3>
                  <pre className="bg-slate-800/60 rounded-lg p-3 text-xs text-slate-300 overflow-x-auto">{`Frontend (HTML/CSS/JS)
    ↓
FastAPI API Layer
    ↓
ReviewAndFix Use Case
    ↓
Review Service / Fix Service / Diff Service
    ↓
Ollama Provider`}</pre>
                </div>

                <div className="bg-slate-900/30 rounded-xl p-4 border border-slate-700">
                  <h3 className="text-lg font-semibold text-cyan-300 mb-2">Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Python', 'FastAPI', 'Ollama', 'JavaScript', 'HTML', 'CSS', 'pytest', 'difflib'].map((tech) => (
                      <span key={tech} className="px-2 py-0.5 bg-slate-800 rounded-full text-xs text-slate-300 border border-cyan-500/30">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-900/30 rounded-xl p-4 border border-slate-700">
                  <h3 className="text-lg font-semibold text-cyan-300 mb-2">Observability & Latency Analysis</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-2">
                    <span className="font-semibold text-cyan-300">Problem:</span> The system worked, but there was no visibility into where execution time was being spent.
                  </p>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    <span className="font-semibold text-cyan-300">Solution:</span> Instrumentation across the entire review pipeline.
                  </p>
                </div>

                <div className="bg-slate-900/30 rounded-xl p-4 border border-slate-700">
                  <h3 className="text-lg font-semibold text-cyan-300 mb-2">Metrics Tracked</h3>
                  <ul className="text-slate-300 text-sm list-disc pl-5 space-y-1 font-mono">
                    <li>review_duration_ms</li>
                    <li>fix_duration_ms</li>
                    <li>diff_duration_ms</li>
                    <li>total_duration_ms</li>
                    <li>llm_duration_ms</li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-900/30 rounded-xl p-4 border border-slate-700">
                  <h3 className="text-lg font-semibold text-cyan-300 mb-2">Instrumentation Architecture</h3>
                  <pre className="bg-slate-800/60 rounded-lg p-3 text-xs text-slate-300 overflow-x-auto">{`UI
 ↓
Use Case Metrics
 ↓
Service Metrics
 ↓
LLM Provider Metrics`}</pre>
                </div>

                <div className="bg-slate-900/30 rounded-xl p-4 border-l-4 border-cyan-500">
                  <h3 className="text-lg font-semibold text-cyan-300 mb-2">Key Insight</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Most latency originated from LLM execution rather than backend processing. Without observability, optimization efforts would have targeted the wrong layer.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-900/30 rounded-xl p-4 border border-slate-700">
                  <h3 className="text-lg font-semibold text-cyan-300 mb-2">Lessons Learned</h3>
                  <ul className="text-slate-300 text-sm list-disc pl-5 space-y-1">
                    <li>Measure first. Optimize later.</li>
                    <li>Separate business latency from model latency.</li>
                    <li>Observability is a product feature, not an afterthought.</li>
                  </ul>
                </div>

                <div className="bg-slate-900/30 rounded-xl p-4 border border-slate-700">
                  <h3 className="text-lg font-semibold text-cyan-300 mb-2">Product Lessons</h3>
                  <ul className="text-slate-300 text-sm list-disc pl-5 space-y-1">
                    <li>User experience matters even in research tools.</li>
                    <li>Diff visualization makes AI suggestions actionable.</li>
                    <li>Local-first gives users trust and control.</li>
                    <li>Instrumentation revealed the real bottlenecks.</li>
                    <li>Observability guided optimization to the LLM layer.</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {['Code Review', 'Code Fix', 'Local-First'].map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-cyan-500/30">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-slate-700 bg-slate-800/50 flex justify-end">
              <button
                onClick={() => setShowDevStudioCaseStudy(false)}
                className="px-4 py-2 bg-cyan-500 rounded-lg font-medium text-sm hover:bg-cyan-400 transition"
              >
                Close Case Study
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========== LIGHTBOX MODAL ========== */}
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
            
            {currentPhaseImages.length > 1 && lightboxIndex > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
                aria-label="Imagen anterior"
              >
                <ChevronLeftIcon className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            )}

            {currentPhaseImages.length > 1 && lightboxIndex < currentPhaseImages.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
                aria-label="Imagen siguiente"
              >
                <ChevronRightIcon className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            )}

            {currentPhaseImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 text-white text-xs md:text-sm">
                {lightboxIndex + 1} / {currentPhaseImages.length}
              </div>
            )}

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