import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL || ['http://localhost:5173', 'http://localhost:4173']
}));
app.use(express.json());

// Configure Nodemailer for Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

// Initialize SQLite database
const dbPath = join(__dirname, 'vdev_signals.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err);
  } else {
    console.log('Connected to SQLite database at', dbPath);
    // Create tables if they don't exist
    db.run(`
      CREATE TABLE IF NOT EXISTS signals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT,
        name TEXT,
        email TEXT,
        problem TEXT,
        build TEXT,
        stage TEXT,
        requested_date TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }
});

app.post('/api/submit-signal', (req, res) => {
  const { type, name, email, problem, build, stage, requested_date } = req.body;
  
  const stmt = db.prepare(`
    INSERT INTO signals (type, name, email, problem, build, stage, requested_date)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run([type, name, email, problem, build, stage, requested_date], function(err) {
    if (err) {
      console.error('Error inserting signal:', err);
      res.status(500).json({ error: 'Failed to save signal to database' });
    } else {
      console.log(`Signal saved with ID: ${this.lastID}`);

      // Send Email Notification
      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER,
        subject: `VDEV Build Signal: ${name}`,
        html: `
          <div style="font-family: 'Courier New', monospace; max-width: 600px; margin: 0 auto; background-color: #030303; border: 1px solid #333; padding: 30px; color: #fff;">
            <div style="border-bottom: 1px solid #333; padding-bottom: 20px; margin-bottom: 20px;">
              <h2 style="color: #D4AF37; margin: 0; font-size: 14px; letter-spacing: 2px; text-transform: uppercase;">VDEV // SECURE COMMS</h2>
              <p style="color: #888; font-size: 12px; margin-top: 5px;">Build Signal Received [ ID: ${this.lastID} ]</p>
            </div>
            
            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              <tr>
                <td style="padding: 15px 0; border-bottom: 1px solid #222; color: #888; width: 35%; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Initiated By</td>
                <td style="padding: 15px 0; border-bottom: 1px solid #222; color: #fff; font-weight: bold;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 15px 0; border-bottom: 1px solid #222; color: #888; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Email Identity</td>
                <td style="padding: 15px 0; border-bottom: 1px solid #222; color: #fff;"><a href="mailto:${email}" style="color: #D4AF37; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 15px 0; border-bottom: 1px solid #222; color: #888; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Requested Time</td>
                <td style="padding: 15px 0; border-bottom: 1px solid #222; color: #fff;">${requested_date && requested_date !== 'N/A' ? new Date(requested_date).toLocaleString() : 'As soon as possible'}</td>
              </tr>
              <tr>
                <td style="padding: 15px 0; border-bottom: 1px solid #222; color: #888; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Current Stage</td>
                <td style="padding: 15px 0; border-bottom: 1px solid #222; color: #fff;">${stage}</td>
              </tr>
            </table>

            <div style="margin-top: 30px;">
              <h3 style="color: #888; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 10px;">What Needs To Be Built</h3>
              <div style="background-color: #0A0A0A; border: 1px solid #222; padding: 15px; color: #fff; line-height: 1.5; font-family: sans-serif;">
                ${build}
              </div>
            </div>

            <div style="margin-top: 30px;">
              <h3 style="color: #888; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 10px;">Problem Statement</h3>
              <div style="background-color: #0A0A0A; border: 1px solid #222; padding: 15px; color: #fff; line-height: 1.5; font-family: sans-serif;">
                ${problem}
              </div>
            </div>

            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #333; text-align: center; color: #555; font-size: 10px; text-transform: uppercase; letter-spacing: 1px;">
              SYSTEM GENERATED BY VDEV SIGNAL MODULE
            </div>
          </div>
        `
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          // We still return success because it saved to DB
          res.status(200).json({ success: true, id: this.lastID, emailSent: false });
        } else {
          console.log('Email sent:', info.response);
          res.status(200).json({ success: true, id: this.lastID, emailSent: true });
        }
      });
    }
  });
  stmt.finalize();
});

// Endpoint to view signals (for admin purposes)
app.get('/api/view-signals', (req, res) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized. Invalid or missing API Key.' });
  }

  db.all('SELECT * FROM signals ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Failed to retrieve signals' });
    } else {
      res.status(200).json(rows);
    }
  });
});

// Serve static frontend files (Render Full-Stack Setup)
app.use(express.static(join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`VDEV Signal API running on http://localhost:${PORT}`);
});
