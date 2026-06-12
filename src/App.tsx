import loanDashboard from './assets/loan.chesza.com.png'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import AIResearchLab from './components/IResearchLab';
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
            
          {/* Business Applications - sin link por ahora */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-rose-400 transition flex flex-col">
            <h3 className="text-2xl font-semibold mb-3 text-rose-400">Business Applications</h3>
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
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-16">
        {/* Línea superior */}
        <div className="mb-4">
          <span className="text-sm font-semibold tracking-wider text-sky-400 border-l-4 border-sky-400 pl-3">
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