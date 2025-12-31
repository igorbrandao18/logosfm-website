# AzureCast Streaming Server - Guia de Configuração

## 📋 Pré-requisitos

- Docker e Docker Compose instalados
- Porta 8000 disponível
- Domínio configurado: `streaming-prod.brandaodeveloper.com.br`

## 🚀 Instalação

### 1. Acessar o servidor

```bash
ssh root@72.60.253.154
```

### 2. Navegar para o diretório

```bash
cd /opt/logosfm-website/azurecast
```

### 3. Instalar AzureCast

#### Opção A: Download direto do AzureCast

```bash
# Baixar AzureCast
wget https://github.com/AzuraCast/AzuraCast/releases/latest/download/azuracast.tar.gz

# Extrair para o diretório data
tar -xzf azuracast.tar.gz -C data/
rm azuracast.tar.gz

# Ajustar permissões
chown -R 1001:1001 data/
```

#### Opção B: Usar Docker Compose oficial do AzureCast

Se preferir usar a instalação oficial do AzureCast, você pode substituir o `docker-compose.yml` atual pelo oficial.

### 4. Configurar variáveis de ambiente (se necessário)

Crie um arquivo `.env` se o AzureCast precisar de configurações específicas:

```bash
cat > .env << 'EOF'
AZURACAST_DB_PASSWORD=senha_segura_aqui
AZURACAST_ADMIN_EMAIL=admin@brandaodeveloper.com.br
AZURACAST_ADMIN_PASSWORD=senha_admin_segura
EOF
```

### 5. Iniciar o container

```bash
docker-compose up -d --build
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
