# AzureCast Dockerfile
# Esta imagem será configurada quando o AzureCast for instalado
FROM nginx:alpine

# Cria o diretório do AzureCast
RUN mkdir -p /var/www/azurecast

# Copia a configuração do nginx para AzureCast
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 8000
EXPOSE 8000

# Inicia o nginx
CMD ["nginx", "-g", "daemon off;"]

