# Stage 1: Base Node
FROM node:23-alpine AS base

# Thư mục làm việc
WORKDIR /app

COPY package.json yarn.lock ./

# Cài dependencies
RUN yarn install

# Copy source code
COPY . .
EXPOSE 5173
# Stage 2: Dev (hot reload)
FROM base AS dev
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]