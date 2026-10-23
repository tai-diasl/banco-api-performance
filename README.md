# Banco API Performance Tests

Testes de performance da API bancária utilizando **JavaScript e k6**, com o objetivo de avaliar o comportamento da aplicação perante diferentes níveis de carga e analisar métricas como tempo de resposta, taxa de pedidos e falhas.

## 1. Introdução

Este projeto tem como objetivo praticar e demonstrar testes de performance aplicados a uma API bancária, utilizando o [k6](https://grafana.com/docs/k6/latest/), uma ferramenta de testes de carga que permite definir cenários de teste através de scripts JavaScript.

Os testes permitem observar como a API se comporta perante múltiplos pedidos, identificar possíveis problemas de desempenho e analisar indicadores relevantes para a qualidade do software.

O projeto utiliza a variável de ambiente `BASE_URL` para configurar o endereço da API a testar, evitando a necessidade de definir diretamente o URL nos scripts de teste.

## 2. Tecnologias utilizadas

- **JavaScript:** linguagem utilizada para desenvolver os scripts de teste.
- **k6:** ferramenta de testes de carga e performance.
- **Git:** sistema de controlo de versões.
- **GitHub:** plataforma de alojamento do repositório.
- **PowerShell:** terminal utilizado para configurar as variáveis de ambiente e executar os testes.

## 3. Estrutura do repositório

```text
banco-api-performance/
├── config/     # Arquivo de configuração de variáveis de ambiente
├── fixtures/   # Dados de entrada para os testes (rx.: usuários, payloads=)
├── helpers/    # Funções utilitárias reutilizáveis para interação com a API
├── tests/      # Casos de teste organizados por módulo de API
├── utils/      # Funções utilitárias reutilizáveis
├── .gitignore 
└── README.md   # Este documento
```

### Objetivo de cada grupo de ficheiros

| Pasta ou ficheiro | Objetivo |
|---|---|
| `config/` | Arquivo de configuração de variáveis de ambiente. |
| `fixtures/` | Organizar dados de teste necessários para preparar e executar os cenários. |
| `helpers/` | Reunir funções auxiliares reutilizáveis pelos diferentes scripts de teste. |
| `tests/` | Armazenar os scripts que executam os cenários de teste de performance. |
| `utils/` | Funções utilitárias reutilizáveis. |
| `.gitignore` | Definir ficheiros e pastas que não devem ser versionados pelo Git. |
| `README.md` | Documentar o projeto, as tecnologias e os procedimentos de instalação e execução. |

O ficheiro `tests/login.test.js` contém o cenário de teste de login utilizado nos comandos de execução apresentados neste documento.

## 4. Instalação e execução do projeto

### 4.1. Pré-requisitos

Antes de começar, é necessário instalar:

- [Git](https://git-scm.com/downloads), para clonar o repositório.
- [k6](https://grafana.com/docs/k6/latest/set-up/install-k6/), para executar os testes de performance.

Não é necessário instalar o Node.js apenas para executar os scripts com k6, uma vez que o k6 possui o seu próprio motor de execução de JavaScript.

Para confirmar a instalação, executar no terminal:

```powershell
git --version
k6 version
```

### 4.2. Clonar o repositório

No terminal do VS Code ou no PowerShell, executar:

```powershell
git clone https://github.com/tai-diasl/banco-api-performance.git
```

Aceder à pasta do projeto:

```powershell
cd banco-api-performance
```

### 4.3. Configurar a variável de ambiente BASE_URL

A variável `BASE_URL` define o endereço base da API que será utilizada pelos testes.

No PowerShell, configurar a variável antes de executar o k6:

```powershell
$env:BASE_URL = "http://localhost:3000"
```

**Importante:** substituir o exemplo pelo endereço real da API que se pretende testar. O endereço e a porta devem corresponder à configuração do serviço em execução.

A variável fica disponível no terminal atual. Se for aberto um novo terminal, deverá ser configurada novamente.

### 4.4. Executar os testes de performance

Para executar o cenário de login:

```powershell
k6 run tests/login.test.js
```

O k6 apresentará no terminal as métricas recolhidas durante a execução, incluindo informações sobre os pedidos realizados, os tempos de resposta e eventuais falhas.

A execução depende de a API estar acessível no endereço configurado em `BASE_URL` e de o cenário de teste estar preparado para utilizar essa variável.

### 4.5. Acompanhar o relatório em tempo real

O k6 disponibiliza um dashboard Web que permite acompanhar visualmente os resultados durante a execução.

No PowerShell, configurar a variável de ambiente para ativar o dashboard:

```powershell
$env:K6_WEB_DASHBOARD = "true"
```

Em seguida, executar o teste:

```powershell
k6 run tests/login.test.js
```

Durante a execução, abrir no navegador:

http://localhost:5665

O dashboard permite acompanhar as métricas de performance em tempo real. A disponibilidade do relatório depende de o teste estar em execução e de a porta configurada estar acessível.

### 4.6. Exportar o relatório HTML

O k6 também permite exportar o dashboard para um ficheiro HTML através da variável de ambiente `K6_WEB_DASHBOARD_EXPORT`.

No PowerShell, configurar as variáveis:

```powershell
$env:K6_WEB_DASHBOARD = "true"
$env:K6_WEB_DASHBOARD_EXPORT = "html-report.html"
```

Depois, executar o teste:

```powershell
k6 run tests/login.test.js
```

No final da execução, o relatório será exportado para o ficheiro `html-report.html`, no diretório de trabalho, desde que a execução termine normalmente e a exportação seja concluída com sucesso.

O ficheiro pode ser aberto num navegador para consultar o relatório após a execução.

**Nota:** a exportação HTML e o dashboard em tempo real utilizam as funcionalidades Web do k6. As variáveis devem ser configuradas antes de iniciar o comando `k6 run`.

### 4.7. Executar o teste com dashboard e exportação

Para configurar as duas funcionalidades e executar o cenário numa sequência de comandos no PowerShell:

```powershell
$env:BASE_URL = "http://localhost:3000"
$env:K6_WEB_DASHBOARD = "true"
$env:K6_WEB_DASHBOARD_EXPORT = "html-report.html"

k6 run tests/login.test.js
```

Esta sequência configura o endereço da API, ativa o dashboard e define o nome do relatório HTML a exportar.

Durante a execução, o dashboard pode ser consultado em `http://localhost:5665`. No final, o ficheiro HTML deverá estar disponível no diretório de trabalho.

**Atenção:** executar testes de carga apenas em sistemas próprios ou em ambientes para os quais exista autorização, ajustando a intensidade dos testes à capacidade do serviço.

---

## Objetivo do projeto

Este repositório faz parte do meu percurso de aprendizagem em Qualidade de Software, com foco na prática de testes de performance, na utilização de JavaScript e k6 e na análise de métricas relevantes para a avaliação do comportamento de APIs.
