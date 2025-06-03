# Use an official node.js runtime as a parent image
FROM  node:18-alpine
# Set the working directory in the container to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container at /app
COPY package*.json ./
# Install any needed packages specified in package.json
RUN npm install
# Copy the rest of the application code to the container at /app
COPY . .

# Expose the port the app runs on
EXPOSE 5004

#Define ye command to run your app
CMD ["node","./server.js"] 

