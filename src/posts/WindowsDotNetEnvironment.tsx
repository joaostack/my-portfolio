export default function WindowsDotNetEnvironment() {
  return (
    <>
      <p>
        Últimamente usar o Windows 11 têm-se tornado uma tarefa desafiadora
        para alguns quando se trata de otimização, estabilidade e segurança.
      </p>

      <p>
        De maneira definitiva, permaneci no Windows mesmo depois de ter
        passado os últimos 5 anos usando Linux como sistema operacional
        principal.
      </p>

      <p>
        O porque de eu me manter no Windows foi quando comecei a ter o
        seguinte pensamento: não faz o menor sentido passar horas configurando
        um ambiente Linux e ainda ter certa falta de suporte em certos
        softwares/games.
      </p>

      <p>
        Sem generalização, amo Linux. Porém, também tive problemas de
        desempenho e suporte relacionado à minha GPU.
      </p>

      <p>
        Então, aqui, compartilho minha configuração do meu ambiente de
        desenvolvimento DotNET/C# com base NeoVim, PowerShell 7 +
        Windows Terminal + StarShip.
      </p>

      <h2>Introdução: Configurações básicas</h2>

      <p>
        Para um melhor suporte a softwares de terceiros, sem assinaturas
        (ou até seus softwares) e execução de scripts PowerShell, ative o
        modo desenvolvedor que pode ser encontrado em:
      </p>

      <pre>
        <code>
          Settings → System → Advanced → Developer Mode
        </code>
      </pre>

      <p>
        Também defina o Windows Terminal como aplicativo de terminal padrão.
        Essa opção pode ser localizada na mesma seção do modo desenvolvedor.
      </p>

      <p>
        Por questões práticas, recomendo ativar o sudo também. Isso ajuda
        bastante, pois você não precisa reabrir um terminal como administrador.
      </p>

      <h2>Containers: WSL e Windows Sandbox</h2>

      <p>
        Este passo é opcional, mas caso queira ter um sistema Linux dentro do
        Windows, ative em:
      </p>

      <pre>
        <code>
          Settings → System → Optional features → More Windows Features
        </code>
      </pre>

      <p>
        Ative a opção Windows Subsystem for Linux e Windows Sandbox, que
        fornece um ambiente isolado para testar softwares.
      </p>

      <p>
        Após isso reinicie seu computador e instale a versão mais recente
        do WSL.
      </p>

      <p>Para listar as distribuições disponíveis:</p>

      <pre>
        <code>{`wsl --list -o`}</code>
      </pre>

      <p>Em seguida instale o sistema de sua preferência:</p>

      <pre>
        <code>{`wsl --install <nome>`}</code>
      </pre>

      <h2>Instalando a versão mais recente do PowerShell</h2>

      <p>
        As versões que estão pré-instaladas no Windows são versões antigas,
        como a 5.1, e possuem algumas limitações em relação às versões atuais.
      </p>

      <p>
        Para instalar uma versão atual do PowerShell, abra o Windows Terminal
        e execute:
      </p>

      <pre>
        <code>{`winget install Microsoft.PowerShell`}</code>
      </pre>

      <h2>Configurando o Windows Terminal</h2>

      <p>
        Se por acaso o Windows Terminal não existir na sua máquina, instale
        através do repositório oficial ou pela Microsoft Store.
      </p>

      <h3>KeyMaps úteis</h3>

      <ul>
        <li>CTRL + Shift + T — Nova Aba</li>
        <li>CTRL + Shift + W — Fecha aba atual</li>
        <li>CTRL + ALT + 1/2/3… — Troca de aba</li>
        <li>
          CTRL + Shift + 1/2/3… — Abre um perfil diferente
        </li>
      </ul>

      <p>
        Abra as configurações do Windows Terminal e, no canto inferior
        esquerdo, clique em:
      </p>

      <pre>
        <code>Open JSON file</code>
      </pre>

      <p>
        Então cole a configuração utilizada no artigo original, salve e
        reabra o terminal.
      </p>

      <h2>Fontes</h2>

      <p>
        No diretório utilizado no artigo está a fonte Consolas Nerd.
      </p>

      <p>
        A fonte de sua preferência deve ser do tipo “nerd”, pois o NeoVim
        e Starship carregam alguns ícones específicos para esse tipo de fonte.
      </p>

      <h2>StarShip</h2>

      <p>
        O StarShip é um prompt escrito na linguagem Rust, altamente
        personalizável e rápido.
      </p>

      <p>
        A instalação pode ser feita através do:
      </p>

      <pre>
        <code>{`winget install --id Starship.Starship`}</code>
      </pre>

      <p>Após concluir a instalação:</p>

      <pre>
        <code>{`mkdir ~/.config`}</code>
      </pre>

      <p>
        Crie um arquivo:
      </p>

      <pre>
        <code>~/.config/starship.toml</code>
      </pre>

      <p>
        Para defini-lo como prompt padrão, abra o arquivo da variável
        <code> $PROFILE </code>
        com seu editor de preferência.
      </p>

      <pre>
        <code>notepad $PROFILE</code>
      </pre>

      <h2>NeoVim</h2>

      <p>
        O NeoVim é um editor de código altamente personalizável e versátil.
        Ele é perfeito para quem busca performance e produtividade.
      </p>

      <p>
        A instalação do NeoVim pode ser feita diretamente pelo site oficial
        ou pelo Winget:
      </p>

      <pre>
        <code>{`winget install Neovim.Neovim`}</code>
      </pre>

      <p>
        Minha configuração NeoVim é baseada na distro AstroNvim.
        Escolhi a AstroNvim em respeito à sua reputação quanto ao desempenho.
      </p>

      <h3>Dependências</h3>

      <ul>
        <li>Python 3+</li>
        <li>NodeJS + npm/npx</li>
        <li>TDM-GCC</li>
        <li>Git</li>
      </ul>

      <p>
        Uma vez que a instalação esteja concluída, execute:
      </p>

      <pre>
        <code>
          git clone https://github.com/joaostack/stacknvim $env:LOCALAPPDATA\nvim
        </code>
      </pre>

      <p>
        Inicie o NeoVim e aguarde o processo de instalação dos pacotes
        finalizar:
      </p>

      <pre>
        <code>nvim</code>
      </pre>

      <p>
        Com o NeoVim aberto, pressione a tecla “:” e digite o seguinte
        comando para instalar o servidor LSP Roslyn usando o Mason:
      </p>

      <pre>
        <code>MasonInstall roslyn</code>
      </pre>

      <h2>Conclusão</h2>

      <p>
        Com essas configurações, o Windows passa a funcionar como um ambiente
        de desenvolvimento mais próximo do fluxo que costumo utilizar no
        Linux, mantendo compatibilidade com softwares e jogos que utilizo.
      </p>
    </>
  );
}
