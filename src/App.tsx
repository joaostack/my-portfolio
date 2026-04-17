import "./App.css";
import { useEffect } from "react";
import { animate } from "animejs";

function App() {
  useEffect(() => {
    // animação carregbamento do site
    animate(".container", {
      opacity: [0, 1],
      duration: 1000,
      loop: false,
      easing: "easeInOut",
    });

    animate(".title", {
      y: ["100%", "0%"],
      duration: 1250,
      ease: "out(3)",
      loop: false,
    });
  }, []);

  return (
    <>
      <div className="container mx-auto">
        <header className="p-6">
          <nav className="sticky inset-0 p-4 border-b border-green-900 flex flex-col md:flex-row lg:flex-row justify-between">
            <p className="font-bold italic text-green-500 animate-pulse">
              [Embrace the Computer Science]
            </p>

            <ul className="flex md:flex-row flex-col space-x-6">
              <li>
                <a className="hover:text-white" href="#home">&gt; Home</a>
              </li>
              <li>
                <a className="hover:text-white" href="#sobre">&gt; Sobre</a>
              </li>
              <li>
                <a className="hover:text-white" href="#projetos">
                  &gt; Projetos
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#links">&gt; Links</a>
              </li>
              <li>
                <a className="hover:text-white" href="#contato">&gt; Contato</a>
              </li>
            </ul>
          </nav>
        </header>

        <section id="home" className="max-w-6xl px-6 py-16">
          <h1 className="title text-shadow-[0_0_10px_rgba(34,197,94,0.5)] text-5xl lg:text-9xl md:text-7xl font-black mb-4">
            JOAOSTACK
          </h1>
          CyberSecurity & Development

          <p className="text-green-600 mt-2 font-bold">
            root@joaostack:~# ./status.sh
            <p className="animate-pulse">
              Status: Online
            </p>
          </p>
        </section>

        <section id="sobre" className="max-w-6xl px-6 py-16">
          <h2 className="mb-10 border-l-4 border-green-500 pl-4 uppercase">
            Sobre
          </h2>
          <p className="text-green-600">
            Comecei a mexer com hacking e programação por volta dos 12 anos e
            durante todo esse tempo tive contato com diversas linguagens e
            tecnologias. Desde então fico explorando sistemas, participando de
            CTFs, estudando segurança e criando alguns projetos.
          </p>

          <br />

          <p className="text-green-600">
            Tenho um amplo interesse em vários âmbitos da tecnologia, mas meu
            foco é destinado a:

            <ul className="list-disc list-inside">
              <li>CyberSecurity (Pentesting / Cyber Threat Intelligence)</li>
              <li>Redes de Computadores</li>
              <li>Desenvolvimento Backend / Web</li>
              <li>Sistemas Linux / Bash Scripting</li>
              <li>Fundamentos de Ciência da Computação</li>
              <li>Algoritmos / Estrutura de Dados</li>
            </ul>
          </p>
        </section>

        <section id="projetos" className="max-w-12xl px-6 py-16">
          <h2 className="mb-10 border-l-4 border-green-500 pl-4 uppercase">
            Projetos
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="section-card border border-green-900 p-6 bg-green-950/10 hover:bg-green-500/10 transition group">
              <div className="flex justify-between mb-4">
                <span className="text-xs text-green-700">PROJETO</span>
                <span className="w-2 h-2 bg-green-500 rounded-full group-hover:animate-ping" />
              </div>
              <h3 className="text-lg text-green-200 mb-2">InstaMailChecker</h3>
              <p className="text-sm text-green-600 mb-3">
                Uma ferramenta de OSINT que verifica se tal e-mail especificado
                está cadastrado no Instagram.
              </p>
              <div className="flex gap-2 text-[15px]">
                <span className="border border-green-800 px-1">
                  <a
                    target="_blank"
                    href="https://github.com/joaostack/InstaMailChecker"
                  >
                    GITHUB
                  </a>
                </span>
              </div>
            </div>

            <div className="section-card border border-green-900 p-6 bg-green-950/10 hover:bg-green-500/10 transition group">
              <div className="flex justify-between mb-4">
                <span className="text-xs text-green-700">PROJETO</span>
                <span className="w-2 h-2 bg-green-500 rounded-full group-hover:animate-ping" />
              </div>
              <h3 className="text-lg text-green-200 mb-2">DllProccessLoader</h3>
              <p className="text-sm text-green-600 mb-3">
                Injetor de DLL em processos. Desenvolvido como foco em estudos
                de segurança cibernética.
              </p>
              <div className="flex gap-2 text-[15px]">
                <span className="border border-green-800 px-1">
                  <a
                    target="_blank"
                    href="https://github.com/joaostack/DllProccessLoader"
                  >
                    GITHUB
                  </a>
                </span>
              </div>
            </div>

            <div className="section-card border border-green-900 p-6 bg-green-950/10 hover:bg-green-500/10 transition group">
              <div className="flex justify-between mb-4">
                <span className="text-xs text-green-700">PROJETO</span>
                <span className="w-2 h-2 bg-green-500 rounded-full group-hover:animate-ping" />
              </div>
              <h3 className="text-lg text-green-200 mb-2">ArpPoison</h3>
              <p className="text-sm text-green-600 mb-3">
                Ferramenta de envenenamento da tabela ARP. Desenvolvi para
                aplicar meus conhecimentos em redes de computadores.
              </p>
              <div className="flex gap-2 text-[15px]">
                <span className="border border-green-800 px-1">
                  <a
                    target="_blank"
                    href="https://github.com/joaostack/ArpPoison"
                  >
                    GITHUB
                  </a>
                </span>
              </div>
            </div>

            <div className="section-card border border-green-900 p-6 bg-green-950/10 hover:bg-green-500/10 transition group">
              <div className="flex justify-between mb-4">
                <span className="text-xs text-green-700">PROJETO</span>
                <span className="w-2 h-2 bg-green-500 rounded-full group-hover:animate-ping" />
              </div>
              <h3 className="text-lg text-green-200 mb-2">SynPorScan</h3>
              <p className="text-sm text-green-600 mb-3">
                Ferramenta de descoberta de portas abertas (baseada em
                half-scan). Projeto desenvolvido para aplicar meus conhecimentos
                de redes de computadores.
              </p>
              <div className="flex gap-2 text-[15px]">
                <span className="border border-green-800 px-1">
                  <a
                    target="_blank"
                    href="https://github.com/joaostack/SynPortScan"
                  >
                    GITHUB
                  </a>
                </span>
              </div>
            </div>

            <div className="section-card border border-green-900 p-6 bg-green-950/10 hover:bg-green-500/10 transition group">
              <div className="flex justify-between mb-4">
                <span className="text-xs text-green-700">PROJETO</span>
                <span className="w-2 h-2 bg-green-500 rounded-full group-hover:animate-ping" />
              </div>
              <h3 className="text-lg text-green-200 mb-2">FileDownloader</h3>
              <p className="text-sm text-green-600 mb-3">
                Downloader de arquivos simples desenvolvido em C# com uma
                interface de terminal bonita.
              </p>
              <div className="flex gap-2 text-[15px]">
                <span className="border border-green-800 px-1">
                  <a
                    target="_blank"
                    href="https://github.com/joaostack/FileDownloader"
                  >
                    GITHUB
                  </a>
                </span>
              </div>
            </div>
          </div>
        </section>

        <section id="links" className="max-w-6xl px-6 py-16">
          <h2 className="mb-10 border-l-4 border-green-500 pl-4 uppercase">
            Links
          </h2>
          <p className="text-green-600">
            <p>
              Papers:
              <a
                href="https://joaostack.github.io/"
                target="_blank"
                className="ml-2 italic underline text-blue-500"
              >
                joaostack.github.io
              </a>
            </p>

            <p>
              GitHub:
              <a
                href="https://github.com/joaostack"
                target="_blank"
                className="ml-2 italic underline text-blue-500"
              >
                github.com/joaostack
              </a>
            </p>

            <p>
              TryHackMe:
              <a
                href="https://tryhackme.com/p/joaostack"
                target="_blank"
                className="ml-2 italic underline text-blue-500"
              >
                tryhackme.com/p/joaostack
              </a>
            </p>
          </p>
        </section>

        <footer
          id="contato"
          className="text-center py-20 border-t border-green-900"
        >
          <p className="text-green-700 mb-4 tracking-widest animate-pulse uppercase">
            End Transmission
          </p>
          <a
            href="mailto:joaohcontato@proton.me"
            className="border border-green-500 px-6 py-2 hover:bg-green-500 hover:text-black transition"
          >
            Contato
          </a>
        </footer>
      </div>
    </>
  );
}

export default App;
