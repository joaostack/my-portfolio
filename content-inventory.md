# Inventário de conteúdo do portfólio

Arquivo de referência com os textos preservados antes da reconstrução da interface.

## Identidade
- João Henryque — joaostack
- Software · Systems · Security
- Estudante autodidata de Ciência da Computação, de Pelotas, RS
- Curiosidade primeiro. Abstrações depois.
- Building to understand

## Sobre
Comecei a mexer com hacking e programação por volta dos 12 anos e durante todo esse tempo tive contato com diversas linguagens e tecnologias.
Desde então fico explorando sistemas, participando de CTFs, estudando segurança e criando projetos para entender melhor como as coisas funcionam.

Interesses: CyberSecurity; Redes de Computadores; Desenvolvimento Back-End; Sistemas Linux; Fundamentos de CS.

## Projetos
- InstaMailChecker — Ferramenta de OSINT que verifica se um e-mail está cadastrado no Instagram. — C# — https://github.com/joaostack/InstaMailChecker
- DllProccessLoader — Injetor de DLL em processos. Foco em estudos de segurança cibernética. — C# — https://github.com/joaostack/DllProccessLoader
- ArpPoison — Ferramenta de envenenamento ARP para aplicar conhecimentos de redes. — C# — https://github.com/joaostack/ArpPoison
- SynPortScan — Scanner de portas baseado em SYN half-scan. — C# — https://github.com/joaostack/SynPortScan
- FileDownloader — Downloader simples com interface de terminal. — C# — https://github.com/joaostack/FileDownloader
- OrchestraDev — API de orquestração de containers Docker com Clean Architecture. — C# — https://github.com/joaostack/OrchestraDev

## Links
- Papers: https://joaostack.github.io/
- GitHub: https://github.com/joaostack
- TryHackMe: https://tryhackme.com/p/joaostack
- Contato: joaohcontato@proton.me

## Artigos completos

### 
exploiting-unisoc-redmi-a5.md

````markdown
---
title:  "Exploiting Unisoc Redmi A5"
subtitle:
---

### ‼️ DISCLAIMER
**Não me responsabilizo por quaisquer danos, é de sua responsabilidade realizar este procedimento.**

⚠️ **Durante o processo de desbloqueio, o aparelho será restaurado de fábrica! Não esqueça de fazer backup dos seus arquivos.**

## Prefácio
O **Redmi A5** é um celular de entrada lançado em Março de 2025, baseado no Android 15 Go Edition. Seu processador é um **Unisoc T7250** e contém 4GB de memória ram e 128GB de armazenamento.

Por alguns meses fiz várias pesquisas tentando encontrar alguma maneira para desbloquear o Bootloader e realizar root. Navegando em alguns posts do **XDA Developers**, descobri que o chipset **T7250** é vulneravel a **CVE-2022-38694** cuja vulnerabilidade permite executar códigos com privilégios **BootROM**. Sabendo disso, resolvi correr o risco em realizar o procedimento de desbloqueio no meu **Redmi A5**.

## Requisitos
Sistema operacional Windows.\
Drivers SPD e WinUSB/LibUSB.
- [SPD_Driver](https://androiddatahost.com/dsa6h)
- [Zadig](https://github.com/pbatard/libwdi/releases)

## Primeiro Passo

Você deve ativar o modo desenvolvedor e manter habilitado a opção "**USB Debugging**" e "**OEM Unlock**".
Após realizar este procedimento, será necessário colocar seu smartphone em **preloader** (modo em que inicia o dispositivo antes do sistema operacional, baixo nível).

Para entrar no modo Preloader, você deve desligar seu aparelho e após isso pressionar o botão de volume menos (-) + power até que seu computador reconheça no Gerenciador de Dispositivos do Windows. (A tela ficará desligada)

## Segundo Passo
Concluindo o primeiro passo, agora você deve baixar o exploit para o processador (Unisoc):\
[DOWNLOAD](https://github.com/TomKing062/CVE-2022-38694_unlock_bootloader/releases/download/1.72/ums9230e_Tecno_KL4.zip)

## Terceiro Passo
Com o exploit baixado, você deve conectar seu smartphone no computador usando um cabo USB e rodar o arquivo ```unlock_autopatch_9230.bat``` e aguardar até que o processo seja finalizado.\
É esperado que seu dispositivo reinicie algumas vezes e após a conclusão é normal que apareça um cadeado desbloqueado na logo de boot (sinal de que foi desbloqueado com sucesso).

#### ⚠️ (ISSO VAI APAGAR TODOS OS DADOS) Em caso de brick, crie um arquivo ```fix.bat``` na mesma pasta do exploit, e cole o seguinte conteúdo no arquivo.
```batch
setlocal enabledelayedexpansion

spd_dump exec_addr 0x65015f08 fdl fdl1-dl.bin 0x65000800 fdl fdl2-dl.bin 0x9efffe00 exec r boot w splloader splloader.bin w uboot uboot.bin  w misc misc-wipe.bin reset

pause
```
Refaça o processo para entrar no modo preloader e rode o ```fix.bat```.
```
````

### 
windevenvironment.md

````markdown
---
title:  "Configuração do meu Windows voltado para o desenvolvimento DotNET/C#"
subtitle:
---

## Sumário
0. [Prefácio](#prefácio)
1. [Introdução: Configurações básicas](#introdução-configurações-básicas)
2. [Containers: WSL e Windows SandBox](#containers-wsl-e-windows-sandbox)
3. [Instalando a versão mais recente do PowerShell](#instalando-a-versão-mais-recente-do-powershell)
4. [Configurando o Windows Terminal](#configurando-o-windows-terminal)
5. [Fontes](#fontes)
6. [StarShip](#starship)
7. [NeoVim](#neovim)

## Prefácio
Últimamente usar o **Windows 11** têm-se tornado uma tarefa desafiadora para alguns quando se trata de _otimização_, _estabilidade_ e _segurança_.

De maneira definitiva, permaneci no **Windows** mesmo depois de ter passado os últimos 5 anos usando **Linux** como sistema operacional principal.

O porque de eu me manter no **Windows** foi quando comecei a ter o seguinte pensamento: _Não faz o menor sentido passar horas configurando um ambiente Linux e ainda ter certa falta de suporte em certos softwares/games (sem generalização, amo **Linux**)._ Além de me ocorrer problemas de desempenho e suporte relacionado a minha **GPU**.

Então, aqui, compartilho minha configuração do meu ambiente de desenvolvimento **DotNET**/**C#** com base **NeoVim**, **PowerShell 7** + **Windows Terminal** + **StarShip**.

## Introdução: Configurações básicas
Para um melhor suporte a softwares de terceiros, sem assinaturas (ou até seus softwares) e execução de scripts **PowerShell**, ative o modo desenvolvedor que pode ser encontrado em:

```Settings -> System -> Advanced -> Developer Mode```

Também defina o **Windows Terminal** como aplicativo de terminal padrão. Essa opção pode ser localizada na mesma seção do modo desenvolvedor.

Por questões práticas, recomendo ativar o '**sudo**' também (vai ajudar bastante, você não vai precisar reabrir um terminal como adminstrador).

## Containers: WSL e Windows SandBox
Este passo é opcional, mas caso queira ter um sistema linux dentro do seu windows, ative em:

```Settings -> System -> Optional features -> More Windows Features```

Ative a opção **Windows Subsystem for Linux** e **Windows Sandbox** (ambiente isolado, uso para testar softwares).

Após isso reinicie seu computador e entre até o repositório do GitHub:
[WSL](https://github.com/microsoft/WSL/releases)

Baixe e instale a versão mais recente (isso vai instalar a última versão do WSL).

Para listar as distros disponíveis para instalar, rode o seguinte comando:
```powershell
wsl --list -o
```
Em seguida instale o sistema de sua preferência com:
```powershell
wsl --install <nome>
```

## Instalando a versão mais recente do PowerShell
As versões que estão pré-instaladas no windows são versões antigas (5.1) e com certos problemas de desempenho (além de não possuir um autocomplete que preste kk).

Para resolver este problema, abra o seu windows terminal e digite:
```powershell
winget install Microsoft.PowerShell
```

## Configurando o Windows Terminal
Se por acaso o windows terminal não existir na sua máquina, instale atráves deste repositório:
[Terminal](https://github.com/microsoft/terminal/releases)

(Ou pela Microsoft Store).

KeyMaps úteis:
- **CTRL** + **Shift** + **T** - Nova Aba
- **CTRL** + **Shift** + **W** - Fecha aba atual
- **CTRL** + **ALT** + **1/2/3...** - Troca de aba
- **CTRL** + **Shift** + **1/2/3...** - Abre um perfil diferente (ex: cmd, windows powershell, wsl...)

Abra as configurações do windows terminal, logo em seguida, no canto inferior esquerdo clique em:

```Open JSON file```

Então cole a seguinte configuração [settings.json](https://github.com/joaostack/WinDev-Environment/blob/main/configuracoes/settings.json)
salve e reabra o terminal.

Se quiser, pode definir como fundo este wallpaper:
[gavrl-snowy-forest.jpg](https://github.com/joaostack/WinDev-Environment/blob/main/configuracoes/gavrl-snowy-forest.jpg)

## Fontes
No seguinte diretório você irá localizar a fonte que uso:
[Consolas Nerd](https://github.com/joaostack/WinDev-Environment/tree/main/configuracoes/fontes)

A fonte de sua preferência deve ser do tipo "nerd", pois o **neovim** e **starship** carregam alguns icones específicos para esse tipo de fonte.

[Nerd Fonts](https://www.nerdfonts.com/font-downloads)

## StarShip
O **StarShip** é um prompt escrito na linguagem **Rust**, altamente personalizável e rápido (como **ZSH**).

A instalação é simples, semelhante a instalação do **PowerShell 7**.

```powershell
winget install --id Starship.Starship
```

Após concluir a instalação, execute o seguinte comando:
```powershell
mkdir ~/.config
```

Crie um arquivo "**~/.config/starship.toml**" e cole o conteúdo deste:
[starship.toml](https://github.com/joaostack/WinDev-Environment/blob/main/configuracoes/starship.toml)

Para defini-lo como prompt padrão, abra o arquivo da variável **$PROFILE** com seu editor de preferência (ex: **notepad $PROFILE**).

Logo em seguida cole o conteúdo do arquivo:
[Microsoft.PowerShell_profile.ps1](https://github.com/joaostack/WinDev-Environment/blob/main/configuracoes/Microsoft.PowerShell_profile.ps1) salve e feche.

## NeoVim
O **NeoVim** (_NVim_) é um editor de código altamente personalizavel e versátil, ele é perfeito para quem busca performance e produtividade.

A instalação do **NeoVim** pode ser feita diretamente pelo [site oficial](https://neovim.io/doc/install/) ou pelo **winget**.

```powershell
winget install Neovim.Neovim
```

Minha configuração **NeoVim** é baseada na distro [AstroNvim](https://astronvim.com/).
Escolhi a **AstroNvim** em respeito a sua reputação quanto ao desempenho.

Antes de iniciar a instalação da distro, você precisa das seguintes dependências:
- [Python3+](http://python.org/)
- [NodeJS + npm/npx](https://nodejs.org/en)
- [TDM-GCC](https://jmeubank.github.io/tdm-gcc/download/)
- [Git](https://git-scm.com/install/windows)

Uma vez que a instalação concluída, execute o seguinte comando:
```powershell
git clone https://github.com/joaostack/stacknvim $env:LOCALAPPDATA\nvim
```

Inicie o **NeoVim** e aguarde o processo de instalação dos pacotes finalizar.
```
nvim
```

Com o **NeoVim** aberto, pressione a tecla "**:**" e digite o seguinte comando para instalar o servidor **LSP Roslyn** usando o **Mason**:
```
MasonInstall roslyn
```
````
