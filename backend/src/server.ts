import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import App from './app';

const port: number = Number(process.env.PORT) ?? 3000;

App.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default App;

