// Create web server
// -----------------

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto');

// Create express app
const app = express();

// Allow cross origin resource sharing
app.use(cors());

// Parse request body to json
app.use(bodyParser.json());

// Store comments
const commentsByPostId = {};

// Get comments for a post
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Add a comment to a post
app.post('/posts/:id/comments', (req, res) => {
  // Generate random id
  const commentId = randomBytes(4).toString('hex');

  // Get comment content from request body
  const { content } = req.body;

  // Get comments for post
  const comments = commentsByPostId[req.params.id] || [];

  // Add new comment to comments array
  comments.push({ id: commentId, content });

  // Save comments
  commentsByPostId[req.params.id] = comments;

  // Send response
  res.status(201).send(comments);
});

// Listen for requests
app.listen(4001, () => {
  console.log('Listening on 4001');
});