import { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { posts, getPostBySlug, type Post } from "./lib/posts";
import "./App.css";

const projects = [
  { name: "InstaMailChecker", kind: "OSINT · C#", description: "Ferramenta que verifica se um e-mail está cadastrado no Instagram.", url: "https://github.com/joaostack/InstaMailChecker" },
  { name: "DllProccessLoader", kind: "SECURITY · C#", description: "Injetor de DLL em processos, criado para estudos de segurança cibernética.", url: "https://github.com/joaostack/DllProccessLoader" },
  { name: "ArpPoison", kind: "NETWORKS · C#", description: "Ferramenta de envenenamento ARP para aprender redes na prática.", url: "https://github.com/joaostack/ArpPoison" },
  { name: "SynPortScan", kind: "NETWORKS · C#", description: "Scanner de portas baseado em SYN half-scan.", url: "https://github.com/joaostack/SynPortScan" },
  { name: "FileDownloader", kind: "CLI · C#", description: "Downloader simples com interface de terminal.", url: "https://github.com/joaostack/FileDownloader" },
  { name: "OrchestraDev", kind: "BACKEND · C#", description: "API para orquestração de containers Docker com Clean Architecture.", url: "https://github.com/joaostack/OrchestraDev" },
];

function App() {
  const [dark, setDark] = useState(() => localStorage.getItem("portfolio-theme") !== "light");
  useEffect(() => { document.documentElement.dataset.theme = dark ? "dark" : "light"; localStorage.setItem("portfolio-theme", dark ? "dark" : "light"); }, [dark]);
  return <div className="site-shell">
    <header className="topbar"><Link className="wordmark" to="/" aria-label="João Henryque, início">root<span>@</span>joaostack:~$</Link><nav aria-label="Navegação principal"><a href="/#sobre">[sobre]</a><a href="/#projetos">[projetos]</a><a href="/#escrita">[escrita]</a></nav><button className="theme-button" onClick={() => setDark(!dark)} aria-label={dark ? "Ativar tema claro" : "Ativar tema escuro"}>{dark ? "☼" : "☾"}</button></header>
    <main><Routes><Route path="/" element={<Home />} /><Route path="/posts/:slug" element={<Article />} /><Route path="*" element={<NotFound />} /></Routes></main>
    <footer className="site-footer"><a className="footer-contact" href="mailto:joaohcontato@proton.me">Tem algo interessante? <span>Vamos conversar ↗</span></a><div className="footer-meta"><span>© {new Date().getFullYear()} João Henryque</span><span>Feito com curiosidade em Pelotas, RS.</span><a href="https://github.com/joaostack">GitHub ↗</a></div></footer>
  </div>;
}

function Home() { return <>
  <section className="hero wrap"><div className="hero-copy"><p className="eyebrow"><span className="availability" /> STATUS: ONLINE · ESTUDANTE DE CS · PELOTAS, BRASIL</p><h1>Construindo para<br /><em>entender.</em></h1><p className="hero-summary">Sou João Henryque. Exploro software, sistemas e segurança — aprendendo ao transformar curiosidade em coisas reais.</p><div className="hero-actions"><a className="button button-primary" href="#projetos"><span>&gt; VER PROJETOS</span><span>↓</span></a><a className="text-link" href="https://github.com/joaostack">GitHub ↗</a></div></div><div className="hero-art" aria-label="Identidade joaostack"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="art-core">jh<span>.</span></div><span className="art-label label-top">SOFTWARE</span><span className="art-label label-right">SYSTEMS</span><span className="art-label label-bottom">SECURITY</span><span className="art-label label-left">CURIOSITY</span><span className="art-cross cross-one">+</span><span className="art-cross cross-two">+</span></div><div className="hero-index"><span>01 / 04</span><span>PORTFOLIO · 2026</span></div></section>
  <section className="intro wrap section" id="sobre"><div className="section-label"><span>01</span><span>UM POUCO SOBRE MIM</span></div><div className="intro-content"><h2>Curiosidade primeiro.<br /><em>Abstrações depois.</em></h2><div><p>Comecei a mexer com hacking e programação por volta dos 12 anos. Desde então, exploro sistemas, participo de CTFs, estudo segurança e crio projetos para entender como as coisas funcionam.</p><p>Sou estudante autodidata de Ciência da Computação. Gosto de aprender fazendo — desmontar uma ideia, descobrir como funciona e construir algo com o que encontrei.</p><div className="tag-list">{["Cybersecurity", "Redes", "Back-end", "Linux", "Fundamentos de CS"].map(tag => <span key={tag}>{tag}</span>)}</div></div></div></section>
  <section className="projects wrap section" id="projetos"><div className="section-label"><span>02</span><span>SELEÇÃO DE PROJETOS</span><span className="section-count">06 REPOSITÓRIOS</span></div><div className="projects-heading"><h2>Feitos para<br /><em>aprender fazendo.</em></h2><p>Cada projeto começa com uma pergunta<br />e termina com algo que posso compartilhar.</p></div><div className="project-grid">{projects.map((p, i) => <a className="project-card" href={p.url} target="_blank" rel="noreferrer" key={p.name}><div className="project-top"><span>{String(i + 1).padStart(2, "0")}</span><span className="project-arrow">↗</span></div><span className="project-kind">{p.kind}</span><h3>{p.name}</h3><p>{p.description}</p><span className="project-visit">VER NO GITHUB <span>↗</span></span></a>)}</div></section>
  <section className="writing wrap section" id="escrita"><div className="section-label"><span>03</span><span>NOTAS DE CAMPO</span><span className="section-count">{posts.length} ARTIGOS</span></div><div className="writing-heading"><h2>Aprender também<br /><em>é documentar.</em></h2><p>Guias, descobertas e anotações<br />do caminho.</p></div><div className="post-list">{posts.map(post => <PostRow key={post.slug} post={post} />)}</div></section>
  <section className="outro wrap"><span className="outro-mark">↗</span><p>SE VOCÊ TAMBÉM GOSTA DE DESCOBRIR COMO AS COISAS FUNCIONAM,</p><a href="mailto:joaohcontato@proton.me">vamos trocar uma ideia<span>↗</span></a></section>
</>; }

function PostRow({ post }: { post: Post }) { return <Link className="post-row" to={`/posts/${post.slug}`}><span className="post-date">{post.date || "ANOTAÇÃO"}</span><span className="post-info"><span className="post-category">{post.category}</span><strong>{post.title}</strong><span>{post.subtitle || post.description}</span></span><span className="post-arrow">↗</span></Link>; }
function Article() { const { slug = "" } = useParams(); const location = useLocation(); const post = getPostBySlug(slug); useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [location.pathname]); if (!post) return <NotFound />; return <article className="article wrap"><Link to="/#escrita" className="article-back">← Todas as notas</Link><header className="article-header"><span className="post-category">{post.category} · {post.date}</span><h1>{post.title}</h1><p>{post.description || post.subtitle}</p></header><div className="markdown"><ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown></div></article>; }
function NotFound() { return <section className="not-found wrap"><span>404</span><h1>Esta página saiu para explorar.</h1><Link className="button button-primary" to="/">Voltar ao início ↗</Link></section>; }
export default App;
