import loanDashboard from './assets/loan.chesza.com.png'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import emailPreviewImg from './assets/images/email-preview.png';
import AIResearchLab from './components/IResearchLab';
import jsonToSqlImg from './assets/images/json-to-sql-generator.png';
import { XMarkIcon } from '@heroicons/react/24/outline';
function App() {
  return (
    <main className="min-h-[85vh] bg-slate-950 text-white">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-16">
        <p className="text-lg md:text-xl font-bold tracking-wide text-white mb-6">
          SHIRLEY ALVARADO
        </p>

        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          I design,
          <br />
          build,
          <br />
          and automate
          <br />
          digital solutions.
        </h1>

        <p className="mt-8 max-w-3xl text-slate-300 text-lg">
          Creative by background, strategic by nature, and technical by choice. I thrive at the intersection of design, technology, and automation, building practical and elegant solutions that solve real-world problems.
        </p>

        <div className="mt-10 flex gap-4">
          <a
            href="#projects"
            className="px-6 py-3 bg-sky-500 rounded-lg font-medium hover:bg-sky-600 transition"
          >
            View Projects
          </a>

          <a
            href="#contact"
            className="px-6 py-3 border border-slate-700 rounded-lg font-medium hover:bg-slate-900 transition"
          >
            Contact Me
          </a>
        </div>
      </section>

      {/* What I Build */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-10">What I Build</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Digital Experiences - link a Featured Project */}
          <a
            href="#projects"
            className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-amber-400 transition flex flex-col group cursor-pointer"
          >
            <h3 className="text-2xl font-semibold mb-3 text-amber-400 group-hover:text-amber-300 transition">Digital Experiences</h3>
            <p className="text-slate-300 mb-4">
              Websites, interfaces, and digital products that combine usability, design, and business goals.
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {['UI/UX', 'WordPress', 'E-commerce', 'Branding'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-slate-800 rounded-full text-sm text-slate-300 border border-amber-400/40"
                >
                  {tech}
                </span>
              ))}
            </div>
          </a>
                               
          {/* Business Applications - link a JSON to SQL Generator */}
          <a
            href="#json-to-sql"
            className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-rose-400 transition flex flex-col group cursor-pointer"
          >
            <h3 className="text-2xl font-semibold mb-3 text-rose-400 group-hover:text-rose-300 transition">Business Applications</h3>
            <p className="text-slate-300 mb-4">
              Full-stack applications designed to solve real business problems, streamline operations, and improve decision-making.
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {['React', 'TypeScript', 'Node.js', 'C#', 'SQL'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-slate-800 rounded-full text-sm text-slate-300 border border-rose-400/40"
                >
                  {tech}
                </span>
              ))}
            </div>
          </a>

          {/* AI & Automation - link a AI Research Lab */}
          <a
            href="#ai-research-lab"
            className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-cyan-400 transition flex flex-col group cursor-pointer"
          >
            <h3 className="text-2xl font-semibold mb-3 text-cyan-400 group-hover:text-cyan-300 transition">AI & Automation</h3>
            <p className="text-slate-300 mb-4">
              Intelligent workflows, AI-powered assistants, and process automation that reduce repetitive work and increase efficiency.
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {['AI Agents', 'OpenAI', 'MCP', 'Workflow Automation'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-slate-800 rounded-full text-sm text-slate-300 border border-cyan-400/40"
                >
                  {tech}
                </span>
              ))}
            </div>
          </a>
        </div>
      </section>

      {/* Featured Project */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-16">
        {/* Línea superior */}
        <div className="mb-4">
          <span className="text-sm font-semibold tracking-wider text-amber-400 border-l-4 border-amber-400 pl-3">
            FEATURED PROJECT
          </span>
        </div>
        <p className="text-slate-400 mb-8 text-lg">
          Real-world software built from concept to production.
        </p>
                  
        {/* Tarjeta principal con grid: texto + imagen */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 md:p-8 shadow-xl">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Columna izquierda: contenido narrativo */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-amber-400 mb-4">
                Loan Management System
              </h2>
                  
              <p className="text-slate-300 text-base mb-6 border-l-4 border-slate-700 pl-4">
                A production-ready web application designed to manage loan payments, track balances, and automate communication between stakeholders.
              </p>
                  
              {/* Challenge */}
              <div className="mb-5">
                <h3 className="text-lg font-semibold text-amber-300 mb-1">Challenge</h3>
                <p className="text-slate-300 text-sm">
                  Manual tracking, communication gaps, and limited visibility.
                </p>
              </div>
                  
              {/* Solution */}
              <div className="mb-5">
                <h3 className="text-lg font-semibold text-amber-300 mb-1">Solution</h3>
                <p className="text-slate-300 text-sm">
                  A centralized platform with automated notifications and real-time reporting.
                </p>
              </div>
                  
              {/* Key Features - lista compacta */}
              <div className="mb-5">
                <h3 className="text-lg font-semibold text-amber-300 mb-2">Key Features</h3>
                <div className="grid grid-cols-1 gap-1 text-sm">
                  {[
                    'Real-time payment tracking',
                    'Automated email notifications',
                    'Balance and progress calculations',
                    'CSV export and reporting',
                    'Responsive dashboard',
                    'Audit-friendly payment history',
                  ].map((feature) => (
                    <div key={feature} className="text-slate-300 flex items-center gap-2">
                      <span className="text-amber-400 font-bold">✓</span> {feature}
                    </div>
                  ))}
                </div>
              </div>
                
              {/* Tech Stack */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-200 mb-2">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {['React', 'TypeScript', 'Node.js', 'Express', 'SQLite', 'Tailwind CSS'].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 bg-slate-800 rounded-full text-xs text-slate-300 border border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
                
              {/* Botones */}
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="https://loan.chesza.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-amber-500 rounded-lg font-medium text-sm hover:bg-amber-400 transition inline-flex items-center gap-2"
                >
                  Live Demo
                </a>
                <a
                  href="https://github.com/Chesza/loan-management-system"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 border border-slate-700 rounded-lg font-medium text-sm hover:bg-slate-800 transition inline-flex items-center gap-2"
                >
                  View on GitHub
                </a>
                 <button
                  onClick={() => document.getElementById('email-preview-modal')?.classList.remove('hidden')}
                  className="px-5 py-2.5 bg-amber-500 rounded-lg font-medium text-sm hover:bg-amber-400 transition inline-flex items-center gap-2"
                >
                  ✉️ Email Notification
                </button>
              </div>
            </div>
                
            {/* Columna derecha: captura de pantalla */}
            <div className="relative rounded-xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-800">
              {/* Simulación de barra del navegador */}
              <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs text-slate-400 bg-slate-700 px-3 py-0.5 rounded-md flex-1 text-center">
                  loan.chesza.com/dashboard
                </div>
              </div>
              {/* Captura de loan dashboard */}
              <img
                src={loanDashboard}
                alt="Loan Management System Dashboard"
                className="w-full h-auto object-cover"
              />
              {/* Opcional: un overlay muy sutil para dar profundidad */}
              <div className="absolute inset-0 pointer-events-none rounded-xl ring-1 ring-inset ring-white/10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* JSON to SQL Generator */}
      <section id="json-to-sql" className="max-w-6xl mx-auto px-6 py-16 scroll-mt-16">
        {/* Línea superior */}
        <div className="mb-4">
          <span className="text-sm font-semibold tracking-wider text-rose-400 border-l-4 border-rose-400 pl-3">
            BUSINESS APPLICATION
          </span>
        </div>
        <p className="text-slate-400 mb-8 text-lg">
          Internal tooling designed to eliminate repetitive work.
        </p>

        {/* Tarjeta principal */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 md:p-8 shadow-xl">
          {/* Grid de 2 columnas: texto + imagen */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Columna izquierda: contenido narrativo */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-rose-400 mb-4">
                JSON to SQL Generator
              </h2>

              {/* Overview */}
              <div className="mb-5">
                <h3 className="text-lg font-semibold text-rose-300 mb-1">Overview</h3>
                <p className="text-slate-300 text-sm">
                  Developed an internal browser-based automation tool that transforms batches of JSON configuration files into executable SQL scripts used during internal data ingestion workflows.
                </p>
                <p className="text-slate-300 text-sm mt-2 mb-12">
                  The application was designed to reduce repetitive manual tasks, improve consistency, and accelerate operational processes while protecting proprietary business logic.
                </p>
              </div>

              {/* Problem */}
              <div className="mb-5">
                <h3 className="text-lg font-semibold text-rose-300 mb-1">Problem</h3>
                <p className="text-slate-300 text-sm">
                  Teams needed to manually inspect and transform multiple structured configuration files into executable SQL scripts. The process was repetitive, time-consuming, and prone to human error.
                </p>
              </div>
            </div>

            {/* Columna derecha: captura de pantalla */}
            <div>
              <div 
                className="relative rounded-xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-800 cursor-pointer transition hover:opacity-90"
                onClick={() => {
                  const modal = document.getElementById('image-lightbox');
                  const img = document.getElementById('lightbox-image') as HTMLImageElement | null;
                  if (modal && img) {
                    img.src = jsonToSqlImg;
                    modal.classList.remove('hidden');
                  }
                }}
              >
                <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs text-slate-400 bg-slate-700 px-3 py-0.5 rounded-md flex-1 text-center">
                    json-to-sql.internal.tool
                  </div>
                </div>
                <img
                  src={jsonToSqlImg}
                  alt="JSON to SQL Generator Interface"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 pointer-events-none rounded-xl ring-1 ring-inset ring-white/10"></div>
              </div>
              <p className="text-xs text-slate-400 italic mt-2 text-center">
                Click to expand
              </p>
            </div>
          </div>

          {/* Fila de 2 columnas debajo: Solution + Impact */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 mt-8 pt-6 border-t border-slate-700/50">
            {/* Columna izquierda: Solution */}
            <div>
              <h3 className="text-lg font-semibold text-rose-300 mb-2">Solution</h3>
              <p className="text-slate-300 text-sm mb-2">
                Built a local browser application capable of:
              </p>
              <ul className="text-slate-300 text-sm list-disc pl-5 space-y-0.5">
                <li>Processing 100+ JSON files simultaneously</li>
                <li>Automatically cleaning malformed JSON structures</li>
                <li>Extracting multiple configuration layers</li>
                <li>Generating executable SQL scripts</li>
                <li>Packaging outputs for immediate use</li>
              </ul>

              {/* Botones - ahora dentro de Solution */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => document.getElementById('case-study-modal')?.classList.remove('hidden')}
                  className="px-5 py-2.5 bg-rose-500 rounded-lg font-medium text-sm hover:bg-rose-400 transition inline-flex items-center gap-2"
                >
                  📄 Read Case Study
                </button>
                <span className="px-5 py-2.5 border border-slate-700 rounded-lg font-medium text-sm text-slate-400 cursor-default">
                  Internal Tool
                </span>
              </div>
            </div>

            {/* Columna derecha: Impact */}
            <div>
              <h3 className="text-lg font-semibold text-rose-300 mb-2">Impact</h3>
              <ul className="text-slate-300 text-sm list-disc pl-5 space-y-1">
                <li>Reduced approximately two months of manual work</li>
                <li>Minimized repetitive tasks</li>
                <li>Improved consistency and reliability</li>
                <li>Reduced human error</li>
                <li>Continues to inspire later internal versions</li>
              </ul>
            </div>
          </div>

          {/* Technologies - debajo de Solution + Impact */}
          <div className="mt-6 pt-4 border-t border-slate-700/50">
            <h3 className="text-lg font-semibold text-rose-300 mb-2">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {['HTML5', 'CSS3', 'JavaScript', 'JSON Processing', 'SQL Script Generation', 'Browser APIs', 'Workflow Automation'].map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 bg-slate-800 rounded-full text-xs text-slate-300 border border-rose-500/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Security Notice - 100% ancho al final */}
          <div className="mt-6 pt-4 border-t border-slate-700/50">
            <p className="text-xs text-slate-400 italic">
              🔒 This project has been intentionally abstracted to protect proprietary business logic, internal workflows, and company-sensitive implementation details. The public documentation focuses exclusively on the engineering challenges, architecture, and automation outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Lightbox para la imagen (sin flechas) */}
      <div
        id="image-lightbox"
        className="hidden fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            document.getElementById('image-lightbox')?.classList.add('hidden');
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            document.getElementById('image-lightbox')?.classList.add('hidden');
          }
        }}
      >
        <div className="relative max-w-[90vw] max-h-[90vh]">
          <img
            id="lightbox-image"
            src={jsonToSqlImg}
            alt="JSON to SQL Generator - Ampliada"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          />
          <button
            onClick={() => document.getElementById('image-lightbox')?.classList.add('hidden')}
            className="absolute top-2 right-2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
            aria-label="Cerrar"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Case Study Modal */}
      <div
        id="case-study-modal"
        className="hidden fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            document.getElementById('case-study-modal')?.classList.add('hidden');
          }
        }}
      >
        <div className="relative max-w-4xl w-full max-h-[90vh] bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden flex flex-col">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-800/50">
            <div className="flex items-center gap-3">
              <span className="text-rose-400 font-mono text-sm">📄</span>
              <h3 className="text-lg font-semibold text-slate-100">Case Study: JSON to SQL Generator</h3>
            </div>
            <button
              onClick={() => document.getElementById('case-study-modal')?.classList.add('hidden')}
              className="p-2 rounded-lg hover:bg-slate-700 transition text-slate-400 hover:text-white"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-rose-400">JSON to SQL Generator</h2>
              <p className="text-slate-300 text-sm italic">Internal Tool — Case Study</p>

              <hr className="border-slate-700 my-4" />

              <h3 className="text-lg font-semibold text-rose-300">Context</h3>
              <p className="text-slate-300">
                A large-scale data ingestion workflow required processing large batches of JSON configuration files. Each file needed to be manually inspected, cleaned, and transformed into executable SQL scripts. This process was repetitive, error-prone, and consumed significant engineering resources.
              </p>

              <h3 className="text-lg font-semibold text-rose-300 mt-6">Challenge</h3>
              <ul className="text-slate-300 list-disc pl-5 space-y-1">
                <li>Process 100+ JSON files per batch</li>
                <li>Handle malformed or incomplete JSON structures</li>
                <li>Extract configuration data from nested structures</li>
                <li>Generate valid, executable SQL scripts</li>
                <li>Package outputs for immediate use</li>
                <li>Protect proprietary business logic</li>
              </ul>

              <h3 className="text-lg font-semibold text-rose-300 mt-6">Approach</h3>
              <p className="text-slate-300">
                Built a lightweight browser-based tool that operates entirely client-side, ensuring no data leaves the user's machine. The tool leverages native browser capabilities and lightweight frontend technologies to:
              </p>
              <ul className="text-slate-300 list-disc pl-5 space-y-1">
                <li><strong>Batch Processing:</strong> Accept multiple JSON files simultaneously</li>
                <li><strong>Auto-Cleaning:</strong> Detect and repair malformed JSON structures</li>
                <li><strong>Multi-Layer Extraction:</strong> Navigate nested configuration hierarchies</li>
                <li><strong>SQL Generation:</strong> Transform extracted data into executable SQL</li>
                <li><strong>Output Packaging:</strong> Bundle results for immediate use</li>
              </ul>

              <h3 className="text-lg font-semibold text-rose-300 mt-6">Results</h3>
              <ul className="text-slate-300 list-disc pl-5 space-y-1">
                <li><strong>2 months</strong> of manual work reduced</li>
                <li><strong>Significantly</strong> reduced human errors</li>
                <li><strong>Substantially</strong> faster than manual processing</li>
                <li><strong>Zero</strong> data leakage (client-side only)</li>
                <li><strong>Inspired</strong> subsequent internal automation tools</li>
              </ul>

              <h3 className="text-lg font-semibold text-rose-300 mt-6">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {['HTML5', 'CSS3', 'JavaScript', 'JSON Processing', 'SQL Generation', 'Browser APIs', 'Workflow Automation'].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-rose-500/30">
                    {tech}
                  </span>
                ))}
              </div>

              <h3 className="text-lg font-semibold text-rose-300 mt-6">Engineering Lessons</h3>
              <ul className="text-slate-300 list-disc pl-5 space-y-1">
                <li>Browser-based tools can deliver enterprise-grade automation</li>
                <li>Client-side processing eliminates data privacy concerns</li>
                <li>Simple solutions often outperform complex architectures</li>
                <li>Internal tools deserve the same engineering rigor as products</li>
                <li>Automation ROI is measurable and compelling</li>
              </ul>

              <hr className="border-slate-700 my-4" />

              <p className="text-xs text-slate-400 italic">
                🔒 This case study has been intentionally abstracted to protect proprietary business logic, internal workflows, and company-sensitive implementation details. The documentation focuses exclusively on engineering challenges, architecture decisions, and measurable outcomes.
              </p>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-4 border-t border-slate-700 bg-slate-800/50 flex justify-end">
            <button
              onClick={() => document.getElementById('case-study-modal')?.classList.add('hidden')}
              className="px-4 py-2 bg-rose-500 rounded-lg font-medium text-sm hover:bg-rose-400 transition"
            >
              Close Case Study
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox para la imagen (sin flechas) */}
      <div
        id="image-lightbox"
        className="hidden fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            document.getElementById('image-lightbox')?.classList.add('hidden');
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            document.getElementById('image-lightbox')?.classList.add('hidden');
          }
        }}
      >
        <div className="relative max-w-[90vw] max-h-[90vh]">
          <img
            id="lightbox-image"
            src={jsonToSqlImg}
            alt="JSON to SQL Generator - Ampliada"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          />
          <button
            onClick={() => document.getElementById('image-lightbox')?.classList.add('hidden')}
            className="absolute top-2 right-2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
            aria-label="Cerrar"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Case Study Modal */}
      <div
        id="case-study-modal"
        className="hidden fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            document.getElementById('case-study-modal')?.classList.add('hidden');
          }
        }}
      >
        <div className="relative max-w-4xl w-full max-h-[90vh] bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden flex flex-col">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-800/50">
            <div className="flex items-center gap-3">
              <span className="text-rose-400 font-mono text-sm">📄</span>
              <h3 className="text-lg font-semibold text-slate-100">Case Study: JSON to SQL Generator</h3>
            </div>
            <button
              onClick={() => document.getElementById('case-study-modal')?.classList.add('hidden')}
              className="p-2 rounded-lg hover:bg-slate-700 transition text-slate-400 hover:text-white"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-rose-400">JSON to SQL Generator</h2>
              <p className="text-slate-300 text-sm italic">Internal Tool — Case Study</p>

              <hr className="border-slate-700 my-4" />

              <h3 className="text-lg font-semibold text-rose-300">Context</h3>
              <p className="text-slate-300">
                A large-scale data ingestion workflow required processing hundreds of JSON configuration files daily. Each file needed to be manually inspected, cleaned, and transformed into executable SQL scripts. This process was repetitive, error-prone, and consumed significant engineering resources.
              </p>

              <h3 className="text-lg font-semibold text-rose-300 mt-6">Challenge</h3>
              <ul className="text-slate-300 list-disc pl-5 space-y-1">
                <li>Process 100+ JSON files per batch</li>
                <li>Handle malformed or incomplete JSON structures</li>
                <li>Extract configuration data from nested structures</li>
                <li>Generate valid, executable SQL scripts</li>
                <li>Package outputs for immediate deployment</li>
                <li>Protect proprietary business logic</li>
              </ul>

              <h3 className="text-lg font-semibold text-rose-300 mt-6">Approach</h3>
              <p className="text-slate-300">
                Built a lightweight browser-based tool that operates entirely client-side, ensuring no data leaves the user's machine. The tool uses native JavaScript and browser APIs to:
              </p>
              <ul className="text-slate-300 list-disc pl-5 space-y-1">
                <li><strong>Batch Processing:</strong> Accept multiple JSON files simultaneously</li>
                <li><strong>Auto-Cleaning:</strong> Detect and repair malformed JSON structures</li>
                <li><strong>Multi-Layer Extraction:</strong> Navigate nested configuration hierarchies</li>
                <li><strong>SQL Generation:</strong> Transform extracted data into executable SQL</li>
                <li><strong>Output Packaging:</strong> Bundle results for immediate use</li>
              </ul>

              <h3 className="text-lg font-semibold text-rose-300 mt-6">Results</h3>
              <ul className="text-slate-300 list-disc pl-5 space-y-1">
                <li><strong>2 months</strong> of manual work reduced</li>
                <li><strong>100%</strong> reduction in transcription errors</li>
                <li><strong>5x</strong> faster than manual processing</li>
                <li><strong>Zero</strong> data leakage (client-side only)</li>
                <li><strong>Inspired</strong> subsequent internal automation tools</li>
              </ul>

              <h3 className="text-lg font-semibold text-rose-300 mt-6">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {['HTML5', 'CSS3', 'JavaScript', 'JSON Processing', 'SQL Generation', 'Browser APIs', 'Workflow Automation'].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-rose-500/30">
                    {tech}
                  </span>
                ))}
              </div>

              <h3 className="text-lg font-semibold text-rose-300 mt-6">Engineering Lessons</h3>
              <ul className="text-slate-300 list-disc pl-5 space-y-1">
                <li>Browser-based tools can deliver enterprise-grade automation</li>
                <li>Client-side processing eliminates data privacy concerns</li>
                <li>Simple solutions often outperform complex architectures</li>
                <li>Internal tools deserve the same engineering rigor as products</li>
                <li>Automation ROI is measurable and compelling</li>
              </ul>

              <hr className="border-slate-700 my-4" />

              <p className="text-xs text-slate-400 italic">
                🔒 This case study has been intentionally abstracted to protect proprietary business logic, internal workflows, and company-sensitive implementation details. The documentation focuses exclusively on engineering challenges, architecture decisions, and measurable outcomes.
              </p>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-4 border-t border-slate-700 bg-slate-800/50 flex justify-end">
            <button
              onClick={() => document.getElementById('case-study-modal')?.classList.add('hidden')}
              className="px-4 py-2 bg-rose-500 rounded-lg font-medium text-sm hover:bg-rose-400 transition"
            >
              Close Case Study
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox para la imagen (sin flechas) */}
      <div
        id="image-lightbox"
        className="hidden fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            document.getElementById('image-lightbox')?.classList.add('hidden');
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            document.getElementById('image-lightbox')?.classList.add('hidden');
          }
        }}
      >
        <div className="relative max-w-[90vw] max-h-[90vh]">
          <img
            id="lightbox-image"
            src={jsonToSqlImg}
            alt="JSON to SQL Generator - Ampliada"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          />
          <button
            onClick={() => document.getElementById('image-lightbox')?.classList.add('hidden')}
            className="absolute top-2 right-2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
            aria-label="Cerrar"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Case Study Modal */}
      <div
        id="case-study-modal"
        className="hidden fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            document.getElementById('case-study-modal')?.classList.add('hidden');
          }
        }}
      >
        <div className="relative max-w-4xl w-full max-h-[90vh] bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden flex flex-col">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-800/50">
            <div className="flex items-center gap-3">
              <span className="text-rose-400 font-mono text-sm">📄</span>
              <h3 className="text-lg font-semibold text-slate-100">Case Study: JSON to SQL Generator</h3>
            </div>
            <button
              onClick={() => document.getElementById('case-study-modal')?.classList.add('hidden')}
              className="p-2 rounded-lg hover:bg-slate-700 transition text-slate-400 hover:text-white"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-rose-400">JSON to SQL Generator</h2>
              <p className="text-slate-300 text-sm italic">Internal Tool — Case Study</p>

              <hr className="border-slate-700 my-4" />

              <h3 className="text-lg font-semibold text-rose-300">Context</h3>
              <p className="text-slate-300">
                A large-scale data ingestion workflow required processing hundreds of JSON configuration files daily. Each file needed to be manually inspected, cleaned, and transformed into executable SQL scripts. This process was repetitive, error-prone, and consumed significant engineering resources.
              </p>

              <h3 className="text-lg font-semibold text-rose-300 mt-6">Challenge</h3>
              <ul className="text-slate-300 list-disc pl-5 space-y-1">
                <li>Process 100+ JSON files per batch</li>
                <li>Handle malformed or incomplete JSON structures</li>
                <li>Extract configuration data from nested structures</li>
                <li>Generate valid, executable SQL scripts</li>
                <li>Package outputs for immediate deployment</li>
                <li>Protect proprietary business logic</li>
              </ul>

              <h3 className="text-lg font-semibold text-rose-300 mt-6">Approach</h3>
              <p className="text-slate-300">
                Built a lightweight browser-based tool that operates entirely client-side, ensuring no data leaves the user's machine. The tool uses native JavaScript and browser APIs to:
              </p>
              <ul className="text-slate-300 list-disc pl-5 space-y-1">
                <li><strong>Batch Processing:</strong> Accept multiple JSON files simultaneously</li>
                <li><strong>Auto-Cleaning:</strong> Detect and repair malformed JSON structures</li>
                <li><strong>Multi-Layer Extraction:</strong> Navigate nested configuration hierarchies</li>
                <li><strong>SQL Generation:</strong> Transform extracted data into executable SQL</li>
                <li><strong>Output Packaging:</strong> Bundle results for immediate use</li>
              </ul>

              <h3 className="text-lg font-semibold text-rose-300 mt-6">Results</h3>
              <ul className="text-slate-300 list-disc pl-5 space-y-1">
                <li><strong>2 months</strong> of manual work reduced</li>
                <li><strong>100%</strong> reduction in transcription errors</li>
                <li><strong>5x</strong> faster than manual processing</li>
                <li><strong>Zero</strong> data leakage (client-side only)</li>
                <li><strong>Inspired</strong> subsequent internal automation tools</li>
              </ul>

              <h3 className="text-lg font-semibold text-rose-300 mt-6">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {['HTML5', 'CSS3', 'JavaScript', 'JSON Processing', 'SQL Generation', 'Browser APIs', 'Workflow Automation'].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-rose-500/30">
                    {tech}
                  </span>
                ))}
              </div>

              <h3 className="text-lg font-semibold text-rose-300 mt-6">Engineering Lessons</h3>
              <ul className="text-slate-300 list-disc pl-5 space-y-1">
                <li>Browser-based tools can deliver enterprise-grade automation</li>
                <li>Client-side processing eliminates data privacy concerns</li>
                <li>Simple solutions often outperform complex architectures</li>
                <li>Internal tools deserve the same engineering rigor as products</li>
                <li>Automation ROI is measurable and compelling</li>
              </ul>

              <hr className="border-slate-700 my-4" />

              <p className="text-xs text-slate-400 italic">
                🔒 This case study has been intentionally abstracted to protect proprietary business logic, internal workflows, and company-sensitive implementation details. The documentation focuses exclusively on engineering challenges, architecture decisions, and measurable outcomes.
              </p>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-4 border-t border-slate-700 bg-slate-800/50 flex justify-end">
            <button
              onClick={() => document.getElementById('case-study-modal')?.classList.add('hidden')}
              className="px-4 py-2 bg-rose-500 rounded-lg font-medium text-sm hover:bg-rose-400 transition"
            >
              Close Case Study
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox para la imagen (sin flechas) */}
      <div
        id="image-lightbox"
        className="hidden fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            document.getElementById('image-lightbox')?.classList.add('hidden');
          }
        }}
      >
        <div className="relative max-w-[90vw] max-h-[90vh]">
          <img
            id="lightbox-image"
            src=""
            alt="JSON to SQL Generator - Ampliada"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          />
          {/* Botón cerrar (siempre visible) */}
          <button
            onClick={() => document.getElementById('image-lightbox')?.classList.add('hidden')}
            className="absolute top-2 right-2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
            aria-label="Cerrar"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Case Study Modal */}
      <div
        id="case-study-modal"
        className="hidden fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            document.getElementById('case-study-modal')?.classList.add('hidden');
          }
        }}
      >
        <div className="relative max-w-4xl w-full max-h-[90vh] bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden flex flex-col">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-800/50">
            <div className="flex items-center gap-3">
              <span className="text-rose-400 font-mono text-sm">📄</span>
              <h3 className="text-lg font-semibold text-slate-100">Case Study: JSON to SQL Generator</h3>
            </div>
            <button
              onClick={() => document.getElementById('case-study-modal')?.classList.add('hidden')}
              className="p-2 rounded-lg hover:bg-slate-700 transition text-slate-400 hover:text-white"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-rose-400">JSON to SQL Generator</h2>
              <p className="text-slate-300 text-sm italic">Internal Tool — Case Study</p>

              <hr className="border-slate-700 my-4" />

              <h3 className="text-lg font-semibold text-rose-300">Context</h3>
              <p className="text-slate-300">
                A large-scale data ingestion workflow required processing hundreds of JSON configuration files daily. Each file needed to be manually inspected, cleaned, and transformed into executable SQL scripts. This process was repetitive, error-prone, and consumed significant engineering resources.
              </p>

              <h3 className="text-lg font-semibold text-rose-300 mt-6">Challenge</h3>
              <ul className="text-slate-300 list-disc pl-5 space-y-1">
                <li>Process 100+ JSON files per batch</li>
                <li>Handle malformed or incomplete JSON structures</li>
                <li>Extract configuration data from nested structures</li>
                <li>Generate valid, executable SQL scripts</li>
                <li>Package outputs for immediate deployment</li>
                <li>Protect proprietary business logic</li>
              </ul>

              <h3 className="text-lg font-semibold text-rose-300 mt-6">Approach</h3>
              <p className="text-slate-300">
                Built a lightweight browser-based tool that operates entirely client-side, ensuring no data leaves the user's machine. The tool uses native JavaScript and browser APIs to:
              </p>
              <ul className="text-slate-300 list-disc pl-5 space-y-1">
                <li><strong>Batch Processing:</strong> Accept multiple JSON files simultaneously</li>
                <li><strong>Auto-Cleaning:</strong> Detect and repair malformed JSON structures</li>
                <li><strong>Multi-Layer Extraction:</strong> Navigate nested configuration hierarchies</li>
                <li><strong>SQL Generation:</strong> Transform extracted data into executable SQL</li>
                <li><strong>Output Packaging:</strong> Bundle results for immediate use</li>
              </ul>

              <h3 className="text-lg font-semibold text-rose-300 mt-6">Results</h3>
              <ul className="text-slate-300 list-disc pl-5 space-y-1">
                <li><strong>2 months</strong> of manual work reduced</li>
                <li><strong>100%</strong> reduction in transcription errors</li>
                <li><strong>5x</strong> faster than manual processing</li>
                <li><strong>Zero</strong> data leakage (client-side only)</li>
                <li><strong>Inspired</strong> subsequent internal automation tools</li>
              </ul>

              <h3 className="text-lg font-semibold text-rose-300 mt-6">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {['HTML5', 'CSS3', 'JavaScript', 'JSON Processing', 'SQL Generation', 'Browser APIs', 'Workflow Automation'].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-rose-500/30">
                    {tech}
                  </span>
                ))}
              </div>

              <h3 className="text-lg font-semibold text-rose-300 mt-6">Engineering Lessons</h3>
              <ul className="text-slate-300 list-disc pl-5 space-y-1">
                <li>Browser-based tools can deliver enterprise-grade automation</li>
                <li>Client-side processing eliminates data privacy concerns</li>
                <li>Simple solutions often outperform complex architectures</li>
                <li>Internal tools deserve the same engineering rigor as products</li>
                <li>Automation ROI is measurable and compelling</li>
              </ul>

              <hr className="border-slate-700 my-4" />

              <p className="text-xs text-slate-400 italic">
                🔒 This case study has been intentionally abstracted to protect proprietary business logic, internal workflows, and company-sensitive implementation details. The documentation focuses exclusively on engineering challenges, architecture decisions, and measurable outcomes.
              </p>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-4 border-t border-slate-700 bg-slate-800/50 flex justify-end">
            <button
              onClick={() => document.getElementById('case-study-modal')?.classList.add('hidden')}
              className="px-4 py-2 bg-rose-500 rounded-lg font-medium text-sm hover:bg-rose-400 transition"
            >
              Close Case Study
            </button>
          </div>
        </div>
      </div>

      {/* Email Preview Modal */}
      <div
        id="email-preview-modal"
        className="hidden fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            document.getElementById('email-preview-modal')?.classList.add('hidden');
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            document.getElementById('email-preview-modal')?.classList.add('hidden');
          }
        }}
      >
        <div className="relative max-w-[90vw] max-h-[90vh]">
          <img
            src={emailPreviewImg}
            alt="Email Preview - Loan Management System"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          />
          <button
            onClick={() => document.getElementById('email-preview-modal')?.classList.add('hidden')}
            className="absolute top-2 right-2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
            aria-label="Cerrar"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      <AIResearchLab />        
      {/* My Journey */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        {/* Encabezado */}
        <div className="mb-4">
          <span className="text-sm font-semibold tracking-wider text-sky-400 border-l-4 border-sky-400 pl-3">
            MY JOURNEY
          </span>
        </div>
        <p className="text-slate-400 mb-12 text-lg">
          The intersection of design, technology, and strategy.
        </p>
                
        {/* Frase destacada con color sky */}
        {/* Frase destacada en blanco */}
        <div className="mb-16">
          <div className="space-y-2 md:space-y-3">
            <p className="text-4xl md:text-6xl lg:text-7xl font-medium text-slate-100  leading-[1.1]">
              Creative by background.
            </p>
            <p className="text-4xl md:text-6xl lg:text-7xl font-medium text-slate-100  leading-[1.1]">
              Strategic by nature.
            </p>
            <p className="text-4xl md:text-6xl lg:text-7xl font-medium text-slate-100  leading-[1.1]">
              Technical by choice.
            </p>
          </div>
        </div>
                
        {/* Texto narrativo */}
        <div className="max-w-2xl">
          <p className="text-slate-300 text-base leading-relaxed">
            My professional journey didn't begin in software.
            <br /><br />
            It started in design — learning how visual communication, user experience, and creativity shape the way people interact with products and ideas.
            <br /><br />
            Over time, that curiosity expanded into web development, business systems, and enterprise software, where I discovered a passion for solving problems through technology.
            <br /><br />
            Today, I combine design thinking, software engineering, automation, and strategic planning to build solutions that are not only functional, but meaningful, scalable, and easy to use.
          </p>
        </div>
      </section>
                
      {/* Let's Build Something Meaningful */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-4">
          <span className="text-sm font-semibold tracking-wider text-sky-400 border-l-4 border-sky-400 pl-3">
            LET'S CONNECT
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-6">
          Let's Build Something Meaningful
        </h2>
        <p className="text-slate-300 text-lg mb-6 max-w-2xl">
          I'm always interested in meaningful projects, creative ideas, and opportunities to build something useful.
        </p>

        {/* Contenedor vertical: primero los íconos, luego el botón */}
        <div className="flex flex-col items-start gap-6">
          <div className="flex flex-wrap gap-8">
            <a
              href="https://github.com/Chesza?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-sky-400 transition text-3xl"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/shirley-alvarado-soto"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-sky-400 transition text-3xl"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="mailto:shirley@codecrc.com"
              className="text-white hover:text-sky-400 transition text-3xl"
              aria-label="Email"
            >
              <FaEnvelope />
            </a>
          </div>
          <a
            href="/resume.pdf"
            download
            className="px-6 py-3 bg-sky-600 rounded-lg font-medium hover:bg-sky-500 transition"
          >
            Download Resume
          </a>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-8 border-t border-slate-800 text-center text-slate-500 text-sm">
        <p>♞ Shirley Alvarado — Built with React, TypeScript, and curiosity.</p>
      </footer>
    </main>
  )
}

export default App