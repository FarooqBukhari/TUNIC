import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import { Server } from 'socket.io'
import { createServer } from 'http'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import variantRoutes from './routes/variantRoutes.js'
import inquiryRoutes from './routes/inquiryRoutes.js'
import Message from './models/messageModel.js'

dotenv.config()

connectDB()

const app = express()
const server = createServer(app)
const PORT = process.env.PORT || 5000
server.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
const socketIO = new Server(server, {
  cors: {
    origins: ['http://localhost:3000', 'https://tunic.herokuapp.com/']
  }
})

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/variants', variantRoutes)
app.use('/api/inquiries', inquiryRoutes)


const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)


socketIO.on('connection', (socket) => {

  socket.on('userId', (userId) => {
    // Get the last 10 messages from the database.
    Message.find({chatWith: userId.userId}).sort({ createdAt: -1 }).limit(20).exec((err, messages) => {
      if (err) return console.error(err);

      // Send the last messages to the user.
      socket.emit('init', messages);
    });
  })

  // Listen to connected users for a new message.
  socket.on('message', (msg) => {
    // Create a message with the content and the name of the user.
    const message = new Message({
      content: msg.content,
      name: msg.name,
      chatWith: msg.userId
    });

    // Save the message to the database.
    message.save((err) => {
      if (err) return console.error(err);
    });

    // Notify all other users about a new message.
    socket.broadcast.emit('push', msg);
  });
});
