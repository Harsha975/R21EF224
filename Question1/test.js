const express = require('express');

const app = express();
const port = 3000;

const numberData = {
  p: [2, 3, 5, 7, 11],
  f: [1, 1, 2, 3, 5],
  e: [2, 4, 6, 8, 10],
  r: [9, 27, 3, 15, 21]
};

app.get('/numbers/:numberid', (req, res) => {
  const numberid = req.params.numberid;
  const numbers = numberData[numberid];

  if (!numbers) {
    return res.status(400).json({ error: 'Invalid numberid' });
  }

  res.json({ numbers });
});

app.listen(port, () => {
  console.log(`Test server running at http://localhost:${port}`);
});
