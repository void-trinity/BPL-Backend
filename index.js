const express = require('express');

const router = require('./router');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(router);

app.listen(PORT, () => console.log(`App successfully started on port ${PORT}`));