# Use Node v20
FROM node:20-slim

# Set working directory
WORKDIR /app

# Initialize a clean project file and set it to use ES Modules (import/export)
RUN npm init -y && npm pkg set type="module"

# Install ONLY Express (the only thing the server needs to run)
RUN npm install express

# Copy the server file
COPY server.js ./

# Copy the BUILT website (the dist folder)
COPY dist ./dist

# Expose the port
ENV PORT=8080
EXPOSE 8080

# Start the server
CMD ["node", "server.js"]