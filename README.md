# logosfm-website

Website da Logos FM - Site estático servido via Docker e nginx.

## 🚀 Como executar localmente

### Pré-requisitos
- Docker
- Docker Compose

### Executar com Docker Compose

```bash
# Build e start do container
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar o container
docker-compose down
```

O site estará disponível em: **http://localhost:8000**

### Executar apenas com Docker

```bash
# Build da imagem
docker build -t logosfm-website .

# Executar o container
docker run -d -p 8000:8000 --name logosfm-website logosfm-website

# Parar o container
docker stop logosfm-website
docker rm logosfm-website
```

## 📦 Estrutura do Projeto

```
logosfm-website/
├── Dockerfile              # Configuração do Docker
├── docker-compose.yml      # Orquestração com Docker Compose
├── nginx.conf             # Configuração do nginx
├── .dockerignore          # Arquivos ignorados no build
├── .gitignore            # Arquivos ignorados no Git
├── .github/
│   └── workflows/
│       └── docker-deploy.yml  # Pipeline CI/CD
├── index.html            # Página principal
├── assets/               # CSS, JS, imagens, fontes
└── tmp/                  # Arquivos temporários/imagens
```

## 🔄 Pipeline CI/CD

O projeto possui um pipeline GitHub Actions que:
- Faz build da imagem Docker em cada push
- Testa se a imagem funciona corretamente
- Gera um artefato com a imagem Docker (apenas em push para main/master)

### Workflow
- **Trigger:** Push ou Pull Request para `main` ou `master`
- **Build:** Cria imagem Docker
- **Test:** Verifica se o container inicia e responde na porta 8000
- **Artifact:** Salva a imagem Docker como artefato (apenas em push)

## 🐳 Deploy no Servidor

Para fazer deploy no servidor:

1. **Copiar arquivos para o servidor:**
```bash
scp -r . root@72.60.253.154:/opt/logosfm-website
```

2. **No servidor, executar:**
```bash
cd /opt/logosfm-website
docker-compose up -d --build
```

3. **Verificar se está rodando:**
```bash
docker-compose ps
curl http://localhost:8000
```

## 📝 Notas

- O site roda na porta **8000** por padrão
- Usa **nginx alpine** (imagem leve)
- Configuração otimizada com cache e gzip
- Suporta SPA (Single Page Application) com fallback para index.html

## 🔧 Configuração

### Alterar porta

Para alterar a porta, edite:
- `docker-compose.yml` - mapeamento de porta
- `nginx.conf` - porta de escuta do nginx
- `Dockerfile` - EXPOSE (opcional, apenas documentação)

### Variáveis de ambiente

Atualmente não há variáveis de ambiente configuradas. Para adicionar, edite o `docker-compose.yml`:

```yaml
services:
  web:
    environment:
      - ENV_VAR=value
```

---

<!-- Security scan triggered at 2025-09-02 04:08:02 -->
<!-- Security scan triggered at 2025-09-09 05:42:19 -->
<!-- Security scan triggered at 2025-09-28 15:42:39 -->
