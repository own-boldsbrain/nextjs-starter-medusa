FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy storefront sources (use service build context = ./YSH_storefront)
COPY package.json ./
COPY . ./

WORKDIR /app/YSH_storefront

# Install dependencies using the appropriate package manager (yarn | pnpm | npm)
RUN if [ -f yarn.lock ]; then \
			corepack enable && yarn install --frozen-lockfile; \
		elif [ -f pnpm-lock.yaml ]; then \
			pnpm install --frozen-lockfile; \
		elif [ -f package-lock.json ]; then \
			npm ci; \
		else \
			npm install; \
		fi

# Build (Next.js)
RUN pnpm build || yarn build || npm run build

EXPOSE 3000

ENV NODE_ENV=production

CMD ["pnpm", "start"]
