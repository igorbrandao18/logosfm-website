# Use nginx para servir o site estático
FROM nginx:alpine

# Cria o diretório do site
RUN mkdir -p /usr/share/nginx/logosfm-website

# Copia a configuração customizada do nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos do site para o diretório do nginx
COPY . /usr/share/nginx/logosfm-website

# Expõe a porta 8000
EXPOSE 8000

# Inicia o nginx
CMD ["nginx", "-g", "daemon off;"]

