FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY backend ./backend
COPY server.js ./server.js
COPY --from=build /app/dist/ACAP ./public
USER node
EXPOSE 3000
CMD ["node", "server.js"]
