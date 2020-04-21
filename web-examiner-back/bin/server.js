const app = require('../app');

const port = process.env.PORT || 8000;

app.listen(port, '0.0.0.0', () => {
    console.log(`Express server running on port: ${port}`);
});