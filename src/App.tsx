import { useEffect, useState } from "react";
import { animate } from "animejs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import { getPostBySlug, posts, type Post } from "./lib/posts";

type Theme = "light" | "dark";

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme");

    if (saved === "light" || saved === "dark") {
      return saved;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <Routes>
      <Route
        path="*"
        element={
          <Site
            theme={theme}
            setTheme={setTheme}
          />
        }
      />
    </Routes>
  );
}

function Site({
  theme,
  setTheme,
}: {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const toggleTheme = () => {
    setTheme((current) =>
      current === "dark" ? "light" : "dark"
    );
  };

  return (
    <div className="page">
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/posts/:slug"
          element={<PostPage />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </div>
  );
}

/* =========================================================
   NAVBAR
========================================================= */

function Navbar({
  theme,
  onToggleTheme,
}: {
  theme: Theme;
  onToggleTheme: () => void;
}) {
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link
          to="/"
          className="brand"
        >
          <span className="brand-mark">J</span>
          <span>joaostack</span>
        </Link>

        <nav className="nav-links">
          <a href="/#sobre">Sobre</a>
          <a href="/#projetos">Projetos</a>
          <a href="/#posts">Posts</a>
          <a href="/#links">Links</a>
          <a href="/#contato">Contato</a>
        </nav>

        <div className="nav-actions">
          <button
            className="theme-button"
            onClick={onToggleTheme}
            aria-label="Alternar tema"
          >
            {theme === "dark" ? "☼" : "☾"}
          </button>
        </div>
      </div>
    </header>
  );
}

/* =========================================================
   HOME
========================================================= */

function Home() {
  useEffect(() => {
    animate(".hero-title", {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 900,
      easing: "easeOutCubic",
    });

    animate(".hero-description", {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
      delay: 150,
      easing: "easeOutCubic",
    });

    animate(".hero-actions", {
      opacity: [0, 1],
      translateY: [15, 0],
      duration: 700,
      delay: 300,
      easing: "easeOutCubic",
    });

    animate(".project-card", {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 650,
      delay: (_el, index) => 400 + index * 70,
      easing: "easeOutCubic",
    });

    animate(".post-card", {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 650,
      delay: (_el, index) => 500 + index * 80,
      easing: "easeOutCubic",
    });
  }, []);

  return (
    <>
      <main>
        {/* HERO */}

        <section
          id="home"
          className="hero"
        >
          <div className="hero-content">
            <div className="eyebrow">
              <span className="status-dot" />

              Software · Systems · Security
            </div>

            <h1 className="hero-title">
              João
              <br />
              <span>Henryque.</span>
            </h1>

            <p className="hero-description">
              Estudante autodidata de Ciência da Computação
              interessado em desenvolvimento de software,
              sistemas, redes e segurança.
            </p>

            <div className="hero-actions">
              <a
                href="#projetos"
                className="button button-primary"
              >
                Ver projetos
                <span>↗</span>
              </a>

              <a
                href="#posts"
                className="button button-secondary"
              >
                Ler posts
              </a>

              <a
                href="#sobre"
                className="button button-secondary"
              >
                Sobre mim
              </a>
            </div>
          </div>

          <div className="hero-side">
            <div className="hero-line" />

            <span>
              Building to understand
              <br />
              how things work.
            </span>
          </div>
        </section>

        {/* SOBRE */}

        <section
          id="sobre"
          className="section about-section"
        >
          <div className="section-label">
            01 / SOBRE
          </div>

          <div className="section-content">
            <h2>
              Curiosidade primeiro.
              <br />
              Abstrações depois.
            </h2>

            <div className="about-text">
              <p>
                Comecei a mexer com hacking e programação por
                volta dos 12 anos e durante todo esse tempo
                tive contato com diversas linguagens e
                tecnologias.
              </p>

              <p>
                Desde então fico explorando sistemas,
                participando de CTFs, estudando segurança e
                criando projetos para entender melhor como as
                coisas funcionam.
              </p>

              <p>
                Atualmente meus principais interesses são:
              </p>

              <ul>
                <li>CyberSecurity</li>
                <li>Redes de Computadores</li>
                <li>Desenvolvimento Back-End</li>
                <li>Sistemas Linux</li>
                <li>Fundamentos de Ciência da Computação</li>
              </ul>
            </div>
          </div>
        </section>

        {/* PROJETOS */}

        <section
          id="projetos"
          className="section projects-section"
        >
          <div className="section-label">
            02 / PROJETOS
          </div>

          <div className="section-content">
            <div className="projects-header">
              <h2>Coisas que construí.</h2>

              <span className="project-count">
                06 projetos
              </span>
            </div>

            <div className="projects-grid">
              <ProjectCard
                number="01"
                language="C#"
                title="InstaMailChecker"
                description="Uma ferramenta de OSINT que verifica se um e-mail especificado está cadastrado no Instagram."
                href="https://github.com/joaostack/InstaMailChecker"
              />

              <ProjectCard
                number="02"
                language="C#"
                title="DllProccessLoader"
                description="Injetor de DLL em processos. Desenvolvido com foco em estudos de segurança cibernética."
                href="https://github.com/joaostack/DllProccessLoader"
              />

              <ProjectCard
                number="03"
                language="C#"
                title="ArpPoison"
                description="Ferramenta de envenenamento da tabela ARP desenvolvida para aplicar conhecimentos de redes."
                href="https://github.com/joaostack/ArpPoison"
              />

              <ProjectCard
                number="04"
                language="C#"
                title="SynPortScan"
                description="Ferramenta de descoberta de portas abertas baseada em half-scan."
                href="https://github.com/joaostack/SynPortScan"
              />

              <ProjectCard
                number="05"
                language="C#"
                title="FileDownloader"
                description="Downloader de arquivos simples desenvolvido em C# com uma interface de terminal."
                href="https://github.com/joaostack/FileDownloader"
              />

              <ProjectCard
                number="06"
                language="C#"
                title="OrchestraDev"
                description="API de orquestração de containers Docker desenvolvida em C# usando HTTP e Clean Architecture."
                href="https://github.com/joaostack/OrchestraDev"
              />
            </div>
          </div>
        </section>

        {/* POSTS */}

        <section
          id="posts"
          className="section posts-section"
        >
          <div className="section-label">
            03 / POSTS
          </div>

          <div className="section-content">
            <div className="posts-header">
              <div>
                <h2>O que estou escrevendo.</h2>

                <p className="posts-intro">
                  Estudos, experiências e anotações sobre
                  programação, sistemas, segurança e
                  tecnologia.
                </p>
              </div>

              <span className="post-count">
                {posts.length
                  .toString()
                  .padStart(2, "0")}{" "}
                {posts.length === 1
                  ? "post"
                  : "posts"}
              </span>
            </div>

            <div className="posts-list">
              {posts.map((post) => (
                <PostCard
                  key={post.slug}
                  post={post}
                />
              ))}
            </div>
          </div>
        </section>

        {/* LINKS */}

        <section
          id="links"
          className="section links-section"
        >
          <div className="section-label">
            04 / LINKS
          </div>

          <div className="section-content">
            <h2>Encontre-me.</h2>

            <div className="links-list">
              <a
                href="https://joaostack.github.io/"
                target="_blank"
                rel="noreferrer"
              >
                <span>Papers</span>
                <span>
                  joaostack.github.io ↗
                </span>
              </a>

              <a
                href="https://github.com/joaostack"
                target="_blank"
                rel="noreferrer"
              >
                <span>GitHub</span>
                <span>
                  github.com/joaostack ↗
                </span>
              </a>

              <a
                href="https://tryhackme.com/p/joaostack"
                target="_blank"
                rel="noreferrer"
              >
                <span>TryHackMe</span>
                <span>
                  tryhackme.com/p/joaostack ↗
                </span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

/* =========================================================
   POST PAGE
========================================================= */

function PostPage() {
  const { slug } = useParams();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return <NotFound />;
  }

  return (
    <>
      <main className="post-page">
        <div className="post-page-inner">
          <Link
            to="/#posts"
            className="post-back"
          >
            <span>←</span>
            Voltar para os posts
          </Link>

          <header className="post-page-header">
            <div className="post-page-meta">
              <span>{post.date}</span>
              <span>{post.category}</span>
            </div>

            <h1>{post.title}</h1>

            <p>{post.description}</p>
          </header>

          <article className="post-article">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ href, children, ...props }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    {...props}
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </article>

          <div className="post-end">
            <Link
              to="/#posts"
              className="post-back"
            >
              <span>←</span>
              Voltar para os posts
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

/* =========================================================
   POST CARD
========================================================= */

function PostCard({
  post,
}: {
  post: Post;
}) {
  return (
    <Link
      to={`/posts/${post.slug}`}
      className="post-card"
    >
      <div className="post-meta">
        <span>{post.date}</span>
        <span>{post.category}</span>
      </div>

      <div className="post-content">
        <h3>{post.title}</h3>

        <p>{post.description}</p>

        <span className="post-open">
          Read post
          <span>↗</span>
        </span>
      </div>
    </Link>
  );
}

/* =========================================================
   PROJECT CARD
========================================================= */

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
    <article className="project-card">
      <div className="project-top">
        <span>{number}</span>
        <span>{language}</span>
      </div>

      <div className="project-body">
        <h3>{title}</h3>

        <p>{description}</p>

        <a
          href={href}
          target="_blank"
          rel="noreferrer"
        >
          View repository
          <span>↗</span>
        </a>
      </div>
    </article>
  );
}

/* =========================================================
   FOOTER
========================================================= */

function Footer() {
  return (
    <footer
      id="contato"
      className="footer"
    >
      <div>
        <span className="footer-label">
          GET IN TOUCH
        </span>

        <h2>
          Let's build
          <br />
          something.
        </h2>
      </div>

      <a
        href="mailto:joaohcontato@proton.me"
        className="footer-email"
      >
        joaohcontato@proton.me
        <span>↗</span>
      </a>

      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} João Henryque
        </span>

        <span>
          Computer Science · Software · Systems
        </span>
      </div>
    </footer>
  );
}

/* =========================================================
   404
========================================================= */

function NotFound() {
  return (
    <main className="not-found">
      <span className="section-label">
        404
      </span>

      <h1>
        Página não encontrada.
      </h1>

      <p>
        O post ou página que você tentou acessar
        não existe.
      </p>

      <Link
        to="/"
        className="button button-primary"
      >
        Voltar para o início
        <span>↗</span>
      </Link>
    </main>
  );
}

export default App;
