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

# Expose app in port
EXPOSE 4200

# Comando por defecto para ejecutar el script de inicialización
CMD ["npm", "run", "start"]