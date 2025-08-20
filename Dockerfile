# Stage 1: Build the Angular application
FROM node:alpine AS build

# Setup the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy other files and folders to the working directory
COPY . .

# Build Angular application in PROD mode
RUN npm run build --prod

# Stage 2: Serve the application using serve:ssr
FROM node:alpine AS serve
# Setup the working directory
WORKDIR /usr/src/app
# Copy the built application from the build stage
COPY --from=build /usr/src/app/dist /usr/src/app/dist
COPY --from=build /usr/src/app/dist/kitchensink/3rdpartylicenses.txt /usr/src/app/dist/kitchensink/browser/3rdpartylicenses.txt
# Copy the package.json and package-lock.json
COPY package.json package-lock.json ./
# Install only production dependencies
RUN npm install --only=production
# Expose the port the app runs on
EXPOSE 4000
# Start the application
CMD ["npm", "run", "serve:ssr"]
