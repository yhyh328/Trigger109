# Use a specific version of node rather than a tag like lts-alpine for better reproducibility
FROM node:14-alpine as builder

# Set the working directory
WORKDIR /app

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Set environment variables
ENV REACT_APP_SIGNALING_SERVER=https://k10c109.p.ssafy.io
ENV REACT_APP_STUN_SERVERS=stun:stun4.l.google.com:19302
ENV REACT_APP_TURN_SERVERS=turn:numb.viagenie.ca
ENV CORS_ORIGIN=https://k10c109.p.ssafy.io
ENV DB=mongodb://k10c109.p.ssafy.io:27017/kakao-talk

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# You can either build or start the app depending on the use-case
# For development:
# CMD ["npm", "start"]

# Install serve to serve static files in production
RUN npm install -g serve

# For production:
RUN npm run build
# Serve static files using a simple HTTP server if you are not using an external server like nginx
# e.g., `npm install -g serve`
CMD ["serve", "-s", "build", "-l", "3000"]

# Expose the port the app runs on
EXPOSE 3000
