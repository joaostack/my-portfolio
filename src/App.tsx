import "./App.css";
import { useEffect, useState, type ReactNode } from "react";
import { animate } from "animejs";

type Theme = "light" | "dark";

type Post = {
  slug: string;
  date: string;
  category: string;
  title: string;
  description: string;
  content: ReactNode;
};

type PostCardProps = {
  post: Post;
  onOpen: () => void;
};

import ExploitingUnisocRedmiA5 from "./posts/ExploitingUnisocRedmiA5";
import WindowsDotNetEnvironment from "./posts/WindowsDotNetEnvironment";

/*
|--------------------------------------------------------------------------
| POSTS
|--------------------------------------------------------------------------
|
| Para adicionar um novo post:
|
| 1. Crie um arquivo em src/posts/
| 2. Importe o componente aqui
| 3. Adicione um objeto nesta lista
|
*/

const posts: Post[] = [
  {
    slug: "exploiting-unisoc-redmi-a5",
    date: "06.02.2026",
    category: "SECURITY",
    title: "Exploiting Unisoc Redmi A5",
    description:
      "Pesquisa sobre o Redmi A5, Unisoc T7250, CVE-2022-38694 e o processo de desbloqueio do bootloader.",
    content: <ExploitingUnisocRedmiA5 />,
  },

  {
    slug: "windows-dotnet-environment",
    date: "06.02.2026",
    category: "WINDOWS · C#",
    title: "Configuração do meu Windows voltado para o desenvolvimento DotNET/C#",
    description:
      "Minha configuração de ambiente para desenvolvimento com .NET e C#, utilizando PowerShell, Windows Terminal, Starship e NeoVim.",
    content: <WindowsDotNetEnvironment />,
  },
];

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

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (selectedPost) {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });

      return;
    }

    animate(".page", {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
      easing: "easeOutCubic",
    });

    animate(".hero-title", {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 1000,
      delay: 150,
      easing: "easeOutCubic",
    });

    animate(".hero-description", {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
      delay: 350,
      easing: "easeOutCubic",
    });

    animate(".project-card", {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 700,
      delay: (_el, i) => 450 + i * 80,
      easing: "easeOutCubic",
    });

    animate(".post-card", {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 700,
      delay: (_el, i) => 650 + i * 100,
      easing: "easeOutCubic",
    });
  }, [selectedPost]);

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  const openPost = (post: Post) => {
    setSelectedPost(post);
  };

  const closePost = () => {
    setSelectedPost(null);

    setTimeout(() => {
      document
        .getElementById("posts")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  if (selectedPost) {
    return (
      <div className="page">
        <header className="navbar">
          <div className="nav-inner">
            <button className="brand" onClick={closePost}>
              <span className="brand-mark">J</span>
              <span>joaostack</span>
            </button>

            <div className="post-navbar-actions">
              <button
                className="theme-button"
                onClick={toggleTheme}
                aria-label="Alternar tema"
              >
                {theme === "dark" ? "☼" : "☾"}
              </button>
            </div>
          </div>
        </header>

        <main className="post-page">
          <div className="post-page-inner">
            <button className="post-back" onClick={closePost}>
              <span>←</span>
              Voltar para os posts
            </button>

            <header className="post-page-header">
              <div className="post-page-meta">
                <span>{selectedPost.date}</span>
                <span>{selectedPost.category}</span>
              </div>

              <h1>{selectedPost.title}</h1>

              <p>{selectedPost.description}</p>
            </header>

            <div className="post-article">
              {selectedPost.content}
            </div>

            <div className="post-end">
              <button className="post-back" onClick={closePost}>
                <span>←</span>
                Voltar para os posts
              </button>
            </div>
          </div>
        </main>

        <footer className="footer">
          <div>
            <span className="footer-label">JOAOSTACK</span>

            <h2>
              Building to
              <br />
              understand.
            </h2>
          </div>

          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} João Henryque</span>
            <span>Computer Science · Software · Systems</span>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="page">
      <header className="navbar">
        <div className="nav-inner">
          <a href="#home" className="brand">
            <span className="brand-mark">J</span>
            <span>joaostack</span>
          </a>

          <nav className="nav-links">
            <a href="#sobre">Sobre</a>
            <a href="#projetos">Projetos</a>
            <a href="#posts">Posts</a>
            <a href="#links">Links</a>
            <a href="#contato">Contato</a>
          </nav>

          <button
            className="theme-button"
            onClick={toggleTheme}
            aria-label="Alternar tema"
          >
            {theme === "dark" ? "☼" : "☾"}
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
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
              Estudante autodidata de Ciência da Computação interessado em
              desenvolvimento de software, sistemas, redes e segurança.
            </p>

            <div className="hero-actions">
              <a href="#projetos" className="button button-primary">
                Ver projetos
                <span>↗</span>
              </a>

              <a href="#posts" className="button button-secondary">
                Ler posts
              </a>

              <a href="#sobre" className="button button-secondary">
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

        <section id="sobre" className="section about-section">
          <div className="section-label">01 / SOBRE</div>

          <div className="section-content">
            <h2>
              Curiosidade primeiro.
              <br />
              Abstrações depois.
            </h2>

            <div className="about-text">
              <p>
                Comecei a mexer com hacking e programação por volta dos 12 anos
                e durante todo esse tempo tive contato com diversas linguagens
                e tecnologias.
              </p>

              <p>
                Desde então fico explorando sistemas, participando de CTFs,
                estudando segurança e criando projetos para entender melhor
                como as coisas funcionam.
              </p>

              <p>Atualmente meus principais interesses são:</p>

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

        <section id="projetos" className="section projects-section">
          <div className="section-label">02 / PROJETOS</div>

          <div className="section-content">
            <div className="projects-header">
              <h2>Coisas que construí.</h2>

              <span className="project-count">06 projetos</span>
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

        <section id="posts" className="section posts-section">
          <div className="section-label">03 / POSTS</div>

          <div className="section-content">
            <div className="posts-header">
              <div>
                <h2>O que estou escrevendo.</h2>

                <p className="posts-intro">
                  Estudos, experiências e anotações sobre programação,
                  sistemas, segurança e tecnologia.
                </p>
              </div>

              <span className="post-count">
                {posts.length.toString().padStart(2, "0")}{" "}
                {posts.length === 1 ? "post" : "posts"}
              </span>
            </div>

            <div className="posts-list">
              {posts.map((post) => (
                <PostCard
                  key={post.slug}
                  post={post}
                  onOpen={() => openPost(post)}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="links" className="section links-section">
          <div className="section-label">04 / LINKS</div>

          <div className="section-content">
            <h2>Encontre-me.</h2>

            <div className="links-list">
              <a
                href="https://joaostack.github.io/"
                target="_blank"
                rel="noreferrer"
              >
                <span>Papers</span>
                <span>joaostack.github.io ↗</span>
              </a>

              <a
                href="https://github.com/joaostack"
                target="_blank"
                rel="noreferrer"
              >
                <span>GitHub</span>
                <span>github.com/joaostack ↗</span>
              </a>

              <a
                href="https://tryhackme.com/p/joaostack"
                target="_blank"
                rel="noreferrer"
              >
                <span>TryHackMe</span>
                <span>tryhackme.com/p/joaostack ↗</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer id="contato" className="footer">
        <div>
          <span className="footer-label">GET IN TOUCH</span>

          <h2>
            Let's build
            <br />
            something.
          </h2>
        </div>

        <a href="mailto:joaohcontato@proton.me" className="footer-email">
          joaohcontato@proton.me
          <span>↗</span>
        </a>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} João Henryque</span>
          <span>Computer Science · Software · Systems</span>
        </div>
      </footer>
    </div>
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
    <article className="project-card">
      <div className="project-top">
        <span>{number}</span>
        <span>{language}</span>
      </div>

      <div className="project-body">
        <h3>{title}</h3>

        <p>{description}</p>

        <a href={href} target="_blank" rel="noreferrer">
          View repository
          <span>↗</span>
        </a>
      </div>
    </article>
  );
}

function PostCard({ post, onOpen }: PostCardProps) {
  return (
    <article className="post-card">
      <div className="post-meta">
        <span>{post.date}</span>
        <span>{post.category}</span>
      </div>

      <div className="post-content">
        <h3>{post.title}</h3>

        <p>{post.description}</p>

        <button className="post-open" onClick={onOpen}>
          Read post
          <span>↗</span>
        </button>
      </div>
    </article>
  );
}

export default App;
