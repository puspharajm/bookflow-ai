import app from './api/index.js';

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Local Backend server listening at http://localhost:${port}`);
});
