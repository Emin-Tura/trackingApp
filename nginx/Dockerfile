FROM nginx:1.23.0
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
RUN apt-get update && apt-get install -y certbot python3-certbot-nginx vim
# Remove default nginx configuration
RUN rm /etc/nginx/conf.d/*
# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*
# Copy static assets from builder stage
COPY --from=frontend /frontend/build .
# Update the nginx config with our own config file
COPY --from=frontend /frontend/docker-setup/nginx/mern-template.conf /etc/nginx/conf.d/
EXPOSE 80
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]