import { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { animate } from "animejs";

import { getPostBySlug, posts, type Post } from "./lib/posts";
import "./App.css";
import { Metadata } from "./components/Metadata";

type Theme = "dark" | "light";

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((c) => (c === "dark" ? "light" : "dark"));

  return (
    <>
      <Metadata
        title="João H. | joaostack"
        description="João Henryque - Software · Systems · Security Portfolio - Pelotas, RS"
        og={{
          title: "João Henryque - Portfolio",
          description: "João Henryque - Software · Systems · Security Portfolio - Pelotas, RS",
          type: "website",
          images: ["https://joaostack.github.io/og-image.jpg"],
        }}
        twitter={{
          card: "summary_large_image",
          title: "João Henryque - Portfolio",
          description: "João Henryque - Software · Systems · Security Portfolio - Pelotas, RS",
          site: "@joaostack",
          images: ["https://joaostack.github.io/og-image.jpg"],
        }}
      />
      <div className="terminal">
      <header className="terminal-header">
        <div className="terminal-bar">
          <div className="terminal-controls">
            <span className="control close" />
            <span className="control minimize" />
            <span className="control maximize" />
          </div>
          <div className="terminal-title">joaostack@portfolio:~$</div>
          <div
            className="theme-toggle"
            onClick={toggleTheme}
            role="button"
            tabIndex={0}
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            <span className="theme-icon">{theme === "dark" ? "☀" : "☾"}</span>
            <span className="theme-text">
              {theme === "dark" ? "LIGHT" : "DARK"}
            </span>
          </div>
        </div>
        <nav className="terminal-nav" aria-label="Main navigation">
          <a href="/#sobre" className="nav-item" data-text="SOBRE">
            SOBRE
          </a>
          <a href="/#projetos" className="nav-item" data-text="PROJETOS">
            PROJETOS
          </a>
          <a href="/#posts" className="nav-item" data-text="POSTS">
            POSTS
          </a>
          <a href="/#links" className="nav-item" data-text="LINKS">
            LINKS
          </a>
          <a href="/#contato" className="nav-item" data-text="CONTATO">
            CONTATO
          </a>
        </nav>
      </header>

      <main className="terminal-body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:slug" element={<PostPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="terminal-footer" id="contato">
        <div className="footer-content">
          <div className="footer-left">
            <span className="prompt">root@portfolio:~#</span>
            <span className="command">echo "Let's build something."</span>
          </div>
          <a href="mailto:joaohcontato@proton.me" className="footer-email">
            <span className="prompt">root@portfolio:~#</span>
            <span className="command">mailto:joaohcontato@proton.me</span>
            <span className="arrow">▶</span>
          </a>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} João Henryque</span>
            <span>Computer Science · Software · Systems · Security</span>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}

function Home() {
  useEffect(() => {
    animate(".terminal-body > *", {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
      delay: (_, i) => i * 100,
      easing: "easeOutExpo",
    });

    animate(".hero-title .line", {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 800,
      delay: (_, i) => 200 + i * 150,
      easing: "easeOutExpo",
    });

    animate(".hero-tagline", {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
      delay: 800,
      easing: "easeOutExpo",
    });

    animate(".cta-group .btn", {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 500,
      delay: (_, i) => 1000 + i * 100,
      easing: "easeOutExpo",
    });

    animate(".section", {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 700,
      delay: (_, i) => 1200 + i * 150,
      easing: "easeOutExpo",
    });
  }, []);

  return (
    <>
      <section className="hero section" id="home">
        <div className="hero-grid">
          <div className="hero-main">
            <div className="hero-header">
              <span className="prompt">joaostack@portfolio:~$</span>
              <span className="command whoami">whoami</span>
            </div>
            <pre className="hero-output">
              <code>
                {`joaostack
  └─ Software · Systems · Security
      └─ Self-taught CS Student
          └─ Building to understand`}
              </code>
            </pre>

            <h1 className="hero-title">
              <span className="line">JOÃO</span>
              <span className="line">HENRYQUE.</span>
            </h1>

            <p className="hero-tagline">
              <span className="bracket">[</span>
              <span className="keyword">Curiosidade primeiro.</span>
              <span className="bracket">]</span>
              <br />
              <span className="bracket">[</span>
              <span className="keyword">Abstrações depois.</span>
              <span className="bracket">]</span>
            </p>

            <div className="cta-group">
              <a href="#projetos" className="btn btn-primary">
                <span>VER PROJETOS</span>
                <span className="btn-arrow">▶</span>
              </a>
              <a href="#sobre" className="btn btn-secondary">
                <span>SOBRE MIM</span>
              </a>
            </div>
          </div>

          <aside className="hero-side">
            <div className="side-panel">
              <div className="panel-header">
                <span className="prompt">joaostack@portfolio:~$</span>
                <span className="command">cat ~/profile.txt</span>
              </div>
              <pre className="panel-content">
                <code>{`STATUS: ONLINE
LOCAL: Brazil

INTERESTS:
  [x] CyberSecurity
  [x] Computer Networks
  [x] Backend Development
  [x] Linux Systems
  [x] CS Fundamentals

CTF: Active
BUILDING: Always`}</code>
              </pre>
            </div>
          </aside>
        </div>
      </section>

      <section className="section about-section" id="sobre">
        <div className="section-header">
          <span className="section-index">01</span>
          <h2 className="section-title">SOBRE</h2>
        </div>
        <div className="section-body">
          <div className="about-content">
            <div className="text-block">
              <p>
                Comecei a mexer com hacking e programação por volta dos 12 anos
                e durante todo esse tempo tive contato com diversas linguagens e
                tecnologias.
              </p>
              <p>
                Desde então fico explorando sistemas, participando de CTFs,
                estudando segurança e criando projetos para entender melhor como
                as coisas funcionam.
              </p>
              <p>Atualmente meus principais interesses são:</p>
            </div>
            <ul className="interest-grid">
              <li className="interest-item">
                <span className="check">[✓]</span>
                <span>CyberSecurity</span>
              </li>
              <li className="interest-item">
                <span className="check">[✓]</span>
                <span>Redes de Computadores</span>
              </li>
              <li className="interest-item">
                <span className="check">[✓]</span>
                <span>Desenvolvimento Back-End</span>
              </li>
              <li className="interest-item">
                <span className="check">[✓]</span>
                <span>Sistemas Linux</span>
              </li>
              <li className="interest-item">
                <span className="check">[✓]</span>
                <span>Fundamentos de CS</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section projects-section" id="projetos">
        <div className="section-header">
          <span className="section-index">02</span>
          <h2 className="section-title">PROJETOS</h2>
        </div>
        <div className="section-body">
          <div className="projects-header">
            <p className="projects-desc">Coisas que construí para aprender.</p>
            <span className="project-count">
              {posts.length + 6} repositórios
            </span>
          </div>
          <div className="projects-grid">
            <ProjectCard
              number="01"
              language="C#"
              title="InstaMailChecker"
              description="Ferramenta de OSINT que verifica se um e-mail está cadastrado no Instagram."
              href="https://github.com/joaostack/InstaMailChecker"
            />
            <ProjectCard
              number="02"
              language="C#"
              title="DllProccessLoader"
              description="Injetor de DLL em processos. Foco em estudos de segurança cibernética."
              href="https://github.com/joaostack/DllProccessLoader"
            />
            <ProjectCard
              number="03"
              language="C#"
              title="ArpPoison"
              description="Ferramenta de envenenamento ARP para aplicar conhecimentos de redes."
              href="https://github.com/joaostack/ArpPoison"
            />
            <ProjectCard
              number="04"
              language="C#"
              title="SynPortScan"
              description="Scanner de portas baseado em SYN half-scan."
              href="https://github.com/joaostack/SynPortScan"
            />
            <ProjectCard
              number="05"
              language="C#"
              title="FileDownloader"
              description="Downloader simples com interface de terminal."
              href="https://github.com/joaostack/FileDownloader"
            />
            <ProjectCard
              number="06"
              language="C#"
              title="OrchestraDev"
              description="API de orquestração de containers Docker com Clean Architecture."
              href="https://github.com/joaostack/OrchestraDev"
            />
          </div>
        </div>
      </section>

      <section className="section posts-section" id="posts">
        <div className="section-header">
          <span className="section-index">03</span>
          <h2 className="section-title">POSTS</h2>
        </div>
        <div className="section-body">
          <div className="posts-header">
            <p className="posts-desc">Documentando o que aprendo.</p>
            <span className="post-count">{posts.length} artigos</span>
          </div>
          <div className="posts-list">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="section links-section" id="links">
        <div className="section-header">
          <span className="section-index">04</span>
          <h2 className="section-title">LINKS</h2>
        </div>
        <div className="section-body">
          <div className="links-list">
            <a
              href="https://joaostack.github.io/"
              target="_blank"
              rel="noreferrer"
              className="link-item"
            >
              <div className="link-info">
                <span className="link-label">PAPERS</span>
                <span className="link-url">joaostack.github.io</span>
              </div>
              <span className="link-arrow">▶</span>
            </a>
            <a
              href="https://github.com/joaostack"
              target="_blank"
              rel="noreferrer"
              className="link-item"
            >
              <div className="link-info">
                <span className="link-label">GITHUB</span>
                <span className="link-url">github.com/joaostack</span>
              </div>
              <span className="link-arrow">▶</span>
            </a>
            <a
              href="https://tryhackme.com/p/joaostack"
              target="_blank"
              rel="noreferrer"
              className="link-item"
            >
              <div className="link-info">
                <span className="link-label">TRYHACKME</span>
                <span className="link-url">tryhackme.com/p/joaostack</span>
              </div>
              <span className="link-arrow">▶</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function ProjectCard({
  number,
  language,
  title,
  description,
  href,
}: {
  number: string;
  language: string;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <article className="project-card" data-number={number}>
      <div className="card-header">
        <span className="card-number">#{number}</span>
        <span className="card-lang">[{language}]</span>
      </div>
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-desc">{description}</p>
        <a href={href} target="_blank" rel="noreferrer" className="card-link">
          <span>VER REPOSITÓRIO</span>
          <span className="link-arrow">▶</span>
        </a>
      </div>
    </article>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <article className="post-card">
      <div className="post-meta">
        <span className="post-category">[{post.category}]</span>
        <span className="post-date">{post.date}</span>
      </div>
      <Link to={`/posts/${post.slug}`} className="post-link">
        <h3 className="post-title">{post.title}</h3>
        <p className="post-excerpt">{post.description}</p>
        <span className="read-more">
          LER ARTIGO <span className="arrow">▶</span>
        </span>
      </Link>
    </article>
  );
}

function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();

  const post = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  if (!post) return <NotFound />;

  const postUrl = `https://joaostack.github.io/posts/${post.slug}`;

  return (
    <>
      <Metadata
        title={`${post.title} | João H.`}
        description={post.description}
        og={{
          title: post.title,
          description: post.description,
          type: "article",
          url: postUrl,
          site_name: "João Henryque",
          locale: "pt_BR",
          images: ["https://joaostack.github.io/og-image.jpg"],
        }}
        twitter={{
          card: "summary_large_image",
          title: post.title,
          description: post.description,
          site: "@joaostack",
          images: ["https://joaostack.github.io/og-image.jpg"],
        }}
      />
      <article className="post-page section">
        <Link to="/" className="back-link">
          <span className="prompt">joaostack@portfolio:~$</span>
          <span className="command">cd ..</span>
        </Link>

        <header className="post-header">
          <div className="post-meta-header">
            <span className="post-category">[{post.category}]</span>
            <span className="post-date">{post.date}</span>
          </div>
          <h1 className="post-title-main">{post.title}</h1>
          <p className="post-description">{post.description}</p>
        </header>

        <div className="post-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ href, children }) => (
                <a href={href} target="_blank" rel="noreferrer">
                  {children}
                </a>
              ),
              code: ({ children, ...props }) => {
                const inline = !props.className;
                return (
                  <code className={inline ? "inline-code" : ""} {...props}>
                    {children}
                  </code>
                );
              },
              pre: ({ children, ...props }) => (
                <pre {...props}>
                  <div className="code-header">
                    <span className="code-controls">
                      <span />
                      <span />
                      <span />
                    </span>
                  </div>
                  {children}
                </pre>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>

      <footer className="terminal-footer" id="contato">
        <div className="footer-content">
          <div className="footer-left">
            <span className="prompt">root@portfolio:~#</span>
            <span className="command">echo "Let's build something."</span>
          </div>
          <a href="mailto:joaohcontato@proton.me" className="footer-email">
            <span className="prompt">root@portfolio:~#</span>
            <span className="command">mailto:joaohcontato@proton.me</span>
            <span className="arrow">▶</span>
          </a>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} João Henryque</span>
            <span>Computer Science · Software · Systems · Security</span>
          </div>
        </div>
      </footer>
    </>
  );
}

function NotFound() {
  return (
    <>
      <Metadata
        title="404 - Página Não Encontrada | João H."
        description="Página não encontrada - João Henryque Portfolio"
        og={{
          title: "404 - Página Não Encontrada",
          description: "Página não encontrada - João Henryque Portfolio",
          type: "website",
          url: "https://joaostack.github.io/404",
          site_name: "João Henryque",
          locale: "pt_BR",
          images: ["https://joaostack.github.io/og-image.jpg"],
        }}
        twitter={{
          card: "summary",
          title: "404 - Página Não Encontrada",
          description: "Página não encontrada - João Henryque Portfolio",
          site: "@joaostack",
          images: ["https://joaostack.github.io/og-image.jpg"],
        }}
      />
      <section className="not-found section">
        <div className="error-container">
          <span className="error-code">404</span>
          <h1 className="error-title">PÁGINA NÃO ENCONTRADA</h1>
          <p className="error-desc">
            O caminho especificado não existe no sistema.
          </p>
          <Link to="/" className="btn btn-primary">
            <span>VOLTAR AO INÍCIO</span>
            <span className="btn-arrow">▶</span>
          </Link>
        </div>
      </section>

      <footer className="terminal-footer" id="contato">
        <div className="footer-content">
          <div className="footer-left">
            <span className="prompt">root@portfolio:~#</span>
            <span className="command">echo "Let's build something."</span>
          </div>
          <a href="mailto:joaohcontato@proton.me" className="footer-email">
            <span className="prompt">root@portfolio:~#</span>
            <span className="command">mailto:joaohcontato@proton.me</span>
            <span className="arrow">▶</span>
          </a>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} João Henryque</span>
            <span>Computer Science · Software · Systems · Security</span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
