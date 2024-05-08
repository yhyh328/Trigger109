# Use the official Node.js image from Docker Hub
FROM node:latest

# Set the working directory inside the container
WORKDIR /chat

# Add the current directory contents into the container at /chat
COPY . /chat

# Install dependencies
RUN npm install

# Your app binds to port 5001, so you'll use EXPOSE to map that port
EXPOSE 5001

# Define environment variables
# ENV PORT 5001

ENV DB mongodb://13.209.82.252:27017/kakao-talk
# ENV CORS_ORIGIN http://localhost:3000

#####

# ENV DB mongodb://localhost:27017/kakao-talk
# ENV DB mongodb://host.docker.internal:27017/kakao-talk
# ENV CORS_ORIGIN "https://k10c109.p.ssafy.io"

# Command to run your app
CMD ["node", "index.js"]
