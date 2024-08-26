const express = require('express');
const stripe = require('stripe')('<YOUR_StripeTestSecretKey_HERE>00Kd1Wt8Fk');
const cors = require('cors');

const app = express();

app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json());

app.post('/api/checkout', (req, res) => {
    console.log(req.body);
    res.send('Recibido');
})

app.listen(3001, () => {
    console.log('Server on port', 3001);
})