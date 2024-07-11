const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 9876;

const API_TOKEN ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIwNjc5MDE1LCJpYXQiOjE3MjA2Nzg3MTUsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjU2ODBjYmQyLWJkMzEtNDYwNS05M2JhLTQ3MjFkMDQ2YmUwOSIsInN1YiI6ImhhcnNoYW05NzVAZ21haWwuY29tIn0sImNvbXBhbnlOYW1lIjoiUkVWQSBVTklWRVJTSVRZIiwiY2xpZW50SUQiOiI1NjgwY2JkMi1iZDMxLTQ2MDUtOTNiYS00NzIxZDA0NmJlMDkiLCJjbGllbnRTZWNyZXQiOiJYdW9YYnVzd1Fud1NERG5HIiwib3duZXJOYW1lIjoiSEFSU0hBIE0iLCJvd25lckVtYWlsIjoiaGFyc2hhbTk3NUBnbWFpbC5jb20iLCJyb2xsTm8iOiJSMjFFRjIyNCJ9.c3_3M6GKz_FqSPkZZx0T_3Tsfp0n3JyUx9Bo0xvfyQA"
let numbers = [];

const apiEndpoints = {
    p: 'http://20.244.56.144/test/primes',
    f: 'http://20.244.56.144/test/fibo',
    e: 'http://20.244.56.144/test/even',
    r: 'http://20.244.56.144/test/rand'
};

app.get('/numbers/:numberId', async (req, res) => {
    console.log(API_TOKEN);
    const numberId = req.params.numberId;
    const endpoint = apiEndpoints[numberId];
    if (!endpoint) {
        return res.status(404).json({ error: 'Invalid number ID' });
    }

    try {
        const response = await axios.get(endpoint, {
            timeout: 500,
            headers: {
                Authorization: `Bearer ${API_TOKEN}`
            }
        });
        numbers = response.data.numbers;
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch number from external API', details: error.message });
    }

    const average = numbers.reduce((acc, cur) => acc + cur, 0) / numbers.length;
    res.json({
        windowPrevState: numbers.slice(0, numbers.length - 1),
        windowCurrState: numbers,
        numbers,
        avg: average.toFixed(2)
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
