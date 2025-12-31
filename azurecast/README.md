# AzureCast Streaming Server - Guia de Instalação Oficial

## 📋 Pré-requisitos

- Docker e Docker Compose instalados (o script instala automaticamente se necessário)
- Porta 8000 disponível
- Domínio configurado: `streaming-prod.brandaodeveloper.com.br`

## 🚀 Instalação Oficial (Método Recomendado)

O AzureCast usa um script de instalação oficial (`docker.sh`) que gerencia tudo automaticamente, incluindo Docker, Docker Compose e a configuração completa.

### 1. Acessar o servidor

```bash
ssh root@72.60.253.154
```

### 2. Navegar para o diretório

```bash
cd /opt/logosfm-website/azurecast
```

### 3. Baixar e executar o script oficial de instalação

```bash
# Baixar o script oficial do AzureCast
curl -fsSL https://raw.githubusercontent.com/AzuraCast/AzuraCast/main/docker.sh > docker.sh

# Tornar executável
chmod a+x docker.sh

# Executar instalação (modo não-interativo)
yes '' | ./docker.sh install
```

O script irá:
- Instalar Docker e Docker Compose (se necessário)
- Baixar as imagens Docker do AzureCast
- Criar os arquivos de configuração (`.env`, `docker-compose.yml`)
- Iniciar todos os serviços

### 4. Configurar porta customizada (8000)

Após a instalação, edite o `docker-compose.override.yml` ou `.env` para mapear a porta:

```bash
# Criar override para porta 8000
cat > docker-compose.override.yml << 'EOF'
version: '2.2'

services:
  web:
    ports:
      - "8000:80"
EOF

# Reiniciar com nova configuração
./docker.sh restart
```

### 5. Aguardar inicialização

O AzureCast leva alguns minutos para inicializar completamente. Acompanhe os logs:

```bash
./docker.sh logs
```

Quando aparecer "AzuraCast is now ready", acesse via navegador!

### 6. Acessar o AzureCast

Após a inicialização, acesse:
- **IP direto:** http://72.60.253.154:8000
- **Domínio:** http://streaming-prod.brandaodeveloper.com.br (após DNS propagar)

Na primeira vez, você será redirecionado para criar a conta de administrador.

## 📝 Comandos Úteis do Script

```bash
# Ver status dos containers
./docker.sh ps

# Ver logs
./docker.sh logs

# Reiniciar serviços
./docker.sh restart

# Parar serviços
./docker.sh stop

# Iniciar serviços
./docker.sh start

# Atualizar AzureCast
./docker.sh update

# Instalar Docker (se necessário)
./docker.sh install-docker

# Instalar Docker Compose (se necessário)
./docker.sh install-docker-compose
```

## 🔧 Configuração do Nginx (Proxy Reverso)

O Nginx no servidor host já está configurado em `/etc/nginx/sites-available/streaming-prod.brandaodeveloper.com.br` para:
- Escutar na porta 80
- Proxificar para `http://localhost:8000`
- Suportar streaming (proxy_buffering off)

## 🌐 Configuração DNS

Certifique-se de que o DNS está configurado:

**Registro A:**
- **Nome:** `streaming-prod`
- **Tipo:** `A`
- **Valor:** `72.60.253.154`
- **TTL:** `3600`

## 🔒 Configurar SSL/HTTPS

Após o DNS propagar, configure SSL:

```bash
certbot --nginx -d streaming-prod.brandaodeveloper.com.br
```

## 📚 Documentação Oficial

- [AzureCast Installation Guide](https://www.azuracast.com/docs/getting-started/installation/docker/)
- [AzureCast GitHub](https://github.com/AzuraCast/AzuraCast)
- [AzureCast Documentation](https://www.azuracast.com/docs/)

## 🛠️ Troubleshooting

### Porta 8000 não responde:
```bash
# Verificar se os containers estão rodando
./docker.sh ps

# Ver logs para identificar problemas
./docker.sh logs

# Reiniciar serviços
./docker.sh restart
```

### Erro ao instalar Docker/Docker Compose:
```bash
cd /opt/logosfm-website/azurecast
./docker.sh install-docker
./docker.sh install-docker-compose
./docker.sh install
```

### Verificar firewall:
```bash
ufw status
ufw allow 8000/tcp
```

### 6. Verificar logs

```bash
docker-compose logs -f
```

## 🔧 Configuração do Nginx

O nginx já está configurado para:
- Escutar na porta 8000
- Reconhecer o domínio `streaming-prod.brandaodeveloper.com.br`
- Suportar streaming (proxy_buffering off)
- Suportar PHP-FPM (se necessário)

## 🌐 Configuração DNS

Certifique-se de que o DNS está configurado:

**Registro A:**
- **Nome:** `streaming-prod`
- **Tipo:** `A`
- **Valor:** `72.60.253.154`
- **TTL:** `3600`

## 🔒 Configurar SSL/HTTPS

Após o DNS propagar, configure SSL:

```bash
certbot --nginx -d streaming-prod.brandaodeveloper.com.br
```

## 📝 Estrutura de Diretórios

```
/opt/logosfm-website/azurecast/
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── data/              # Volume montado - arquivos do AzureCast aqui
│   └── index.html    # Temporário - será substituído pela instalação
└── README.md
```

## 🔍 Verificação

### Verificar se está rodando:

```bash
# Ver containers
docker ps | grep azurecast

# Testar porta 8000
curl http://localhost:8000

# Ver logs
docker logs azurecast-streaming
```

### Acessar via navegador:

- **IP direto:** http://72.60.253.154:8000
- **Domínio:** http://streaming-prod.brandaodeveloper.com.br (após DNS propagar)
- **HTTPS:** https://streaming-prod.brandaodeveloper.com.br (após configurar SSL)

## 🛠️ Troubleshooting

### Porta 8000 não responde:
```bash
# Verificar se o container está rodando
docker ps | grep azurecast

# Reiniciar o container
cd /opt/logosfm-website/azurecast
docker-compose restart
```

### Erro 403 Forbidden:
- Verificar permissões do diretório `data/`
- Verificar se há arquivo `index.html` ou `index.php` em `data/`

### Erro de conexão:
- Verificar firewall: `ufw status`
- Verificar se a porta 8000 está aberta: `netstat -tlnp | grep 8000`

## 📚 Documentação Oficial

- [AzureCast GitHub](https://github.com/AzuraCast/AzuraCast)
- [AzureCast Documentation](https://www.azuracast.com/docs/)

## 🔄 Atualização

Para atualizar o AzureCast:

```bash
cd /opt/logosfm-website/azurecast
docker-compose pull
docker-compose up -d --build
```
