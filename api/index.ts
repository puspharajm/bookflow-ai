import express from 'express';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';

const app = express();
app.use(express.json());

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// --- Forgot Password Route ---
app.post('/api/auth/forgot-password', async (req, res): Promise<any> => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      // Do not disclose whether the email exists
      return res.json({ message: 'If the email exists, instructions have been sent' });
    }

    // TODO: Integrate real email service (e.g., SendGrid, SES) to email a reset token/link.
    console.log(`Password reset requested for ${email}`);
    res.json({ message: 'If the email exists, instructions have been sent' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// --- Auth Routes ---
app.post('/api/auth/signup', async (req, res): Promise<any> => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  try {
    const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, role',
      [name, email, hashedPassword]
    );

    const user = result.rows[0];
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ user, token });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/login', async (req, res): Promise<any> => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token
    });
  } catch (err: any) {
    console.error('Login error:', err);
    res.status(500).json({ error: err.message });
  }
});

// --- Existing Routes ---
// 1. Fetch all appointments
app.get('/api/appointments', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM appointments ORDER BY id DESC');
    // Map backend snake_case column names to camelCase for the frontend types
    const appointments = result.rows.map(row => ({
      id: String(row.id),
      customerName: row.customer_name,
      service: row.service,
      date: row.appointment_date,
      time: row.appointment_time,
      status: row.status,
      staff: row.staff
    }));
    res.json(appointments);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Create new appointment
app.post('/api/appointments', async (req, res) => {
  const { customerName, service, date, time, status, staff } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO appointments (customer_name, service, appointment_date, appointment_time, status, staff)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [customerName, service, date, time, status || 'pending', staff]
    );
    const row = result.rows[0];
    res.json({
      id: String(row.id),
      customerName: row.customer_name,
      service: row.service,
      date: row.appointment_date,
      time: row.appointment_time,
      status: row.status,
      staff: row.staff
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Fetch all CRM leads
app.get('/api/leads', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM crm_leads ORDER BY id ASC');
    const leads = result.rows.map(row => ({
      id: String(row.id),
      name: row.name,
      email: row.email,
      phone: row.phone,
      status: row.status,
      value: row.value,
      lastContact: row.last_contact
    }));
    res.json(leads);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Fetch revenue data
app.get('/api/revenue', async (req, res) => {
  try {
    const result = await pool.query('SELECT name, revenue, bookings FROM revenue_data ORDER BY id ASC');
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Export the Express API
export default app;
