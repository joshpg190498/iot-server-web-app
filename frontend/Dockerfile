# Build stage
FROM node:20.14-alpine AS builder

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de dependencias a la imagen del contenedor
COPY package*.json .

# Instala las dependencias del proyecto
RUN npm install

# Copia todo el código de la aplicación al contenedor
COPY . .

# Instala las dependencias del proyecto
RUN npm run build --prod

# Etapa de producción
FROM nginx:alpine

# Copia los archivos de la aplicación Angular a la carpeta donde Nginx los servirá
COPY --from=builder /app/dist/frontend /usr/share/nginx/html

# Exponer el puerto por defecto de Nginx
EXPOSE 80