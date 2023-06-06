import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import fs from 'fs';

interface IUser {
  id: string;
  password: string;
  email: string;
}

function readUsers (): IUser[] {
  const content = fs.readFileSync('data/users.json', 'utf-8');
  return JSON.parse(content) as IUser[];
}

function generateAccessToken(user: object) {
  return jwt.sign(user, publicKeyStr, { algorithm: 'RS256', expiresIn: '10 years', keyid: 'mykey' });
}

const users = readUsers();

const publicKeyStr = fs.readFileSync('keys-demo/private.pem');

const port = process.env.SSO_PORT  //get the port number from .env file

const app = express()

app.use(express.json()) //This middleware will allow us to pull req.body.<params>

app.get("/login", async (req, res) => {
  const userId = req.query.userId;
  const user = users.find(i => i.id == userId);

  if (user) {
    const accessToken = generateAccessToken(user);

    // Redirect to application with header
    res.redirect(301, `http://localhost:${process.env.APP_PORT}`);
    res.setHeader('Authorization', 'Bearer ' + accessToken);
    res.end();
  } else {
    // Respond with 401 Unauthorized
    res.status(401).json({ error: 'Unauthorized' });
  }
})

app.listen(port, () => { 
  console.log(`Authorization Server running on ${port}...`)
});
