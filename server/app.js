const express = require('express');
const app = express();
require('express-async-errors');

app.use('/', (req, res, next) => {
  console.log(req.method, req.url)

  res.on('finish', () => {
  console.log(res.statusCode)
  })

  next()
})

app.use((req, res, next) => {
  const error = new Error("The requested resource couldn't be found.")
  error.statusCode = 404;
  next(error)
})

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  res.json({
    message: err.message,
    statusCode: status
  });
});

// app.use(function(req, res, next) {
//   var err = new Error("The requested resource couldn't be found.");
//   err.status = 404;
//   next(err);
// })

// For testing purposes, GET /
app.get('/', (req, res) => {
  res.json("Express server running. No content provided at root level. Please use another route.");
});

// For testing express.json middleware
app.post('/test-json', (req, res, next) => {
//  send the body as JSON with a Content-Type header of "application/json"
  /// finishes the response, res.end()
  res.json(req.body);
  next();
});

// For testing express-async-errors
app.get('/test-error', async (req, res) => {
  throw new Error("Hello World!")
});

const port = 5050;
app.listen(port, () => console.log('Server is listening on port', port));
