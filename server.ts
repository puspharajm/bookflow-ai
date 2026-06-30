import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Database Initialization
async function initDb() {
  const client = await pool.connect();
  try {
    console.log('Setting up database tables...');

    // 1. Appointments Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS appointments (
        id SERIAL PRIMARY KEY,
        customer_name VARCHAR(100) NOT NULL,
        service VARCHAR(100) NOT NULL,
        appointment_date VARCHAR(50) NOT NULL,
        appointment_time VARCHAR(50) NOT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'pending',
        staff VARCHAR(100) NOT NULL
      )
    `);

    // 2. CRM Leads Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS crm_leads (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'new',
        value INT NOT NULL DEFAULT 0,
        last_contact VARCHAR(50) NOT NULL
      )
    `);

    // 3. Revenue Data Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS revenue_data (
        id SERIAL PRIMARY KEY,
        name VARCHAR(10) NOT NULL,
        revenue INT NOT NULL DEFAULT 0,
        bookings INT NOT NULL DEFAULT 0
      )
    `);

    // Seed tables if empty
    const apptsCount = await client.query('SELECT COUNT(*) FROM appointments');
    if (parseInt(apptsCount.rows[0].count) === 0) {
      console.log('Seeding initial appointments...');
      await client.query(`
        INSERT INTO appointments (customer_name, service, appointment_date, appointment_time, status, staff) VALUES
        ('Eleanor Pena', 'Premium Consultation', '2024-05-15', '10:00 AM', 'confirmed', 'Dr. Sarah'),
        ('Guy Hawkins', 'Follow-up', '2024-05-15', '11:30 AM', 'pending', 'Mike Ross'),
        ('Brooklyn Simmons', 'Initial Assessment', '2024-05-15', '02:00 PM', 'confirmed', 'Dr. Sarah'),
        ('Jane Cooper', 'Therapy Session', '2024-05-16', '09:00 AM', 'completed', 'Mike Ross')
      `);
    }

    const leadsCount = await client.query('SELECT COUNT(*) FROM crm_leads');
    if (parseInt(leadsCount.rows[0].count) === 0) {
      console.log('Seeding initial CRM leads...');
      await client.query(`
        INSERT INTO crm_leads (name, email, phone, status, value, last_contact) VALUES
        ('Darlene Robertson', 'darlene@example.com', '+1 555-1234', 'new', 150, '2h ago'),
        ('Jacob Jones', 'jacob@example.com', '+1 555-5678', 'new', 300, '5h ago'),
        ('Cody Fisher', 'cody@example.com', '+1 555-9012', 'interested', 450, '1d ago'),
        ('Bessie Cooper', 'bessie@example.com', '+1 555-3456', 'booked', 150, '2d ago'),
        ('Wade Warren', 'wade@example.com', '+1 555-7890', 'booked', 600, '3d ago'),
        ('Ralph Edwards', 'ralph@example.com', '+1 555-2345', 'converted', 1200, '1w ago')
      `);
    }

    const revCount = await client.query('SELECT COUNT(*) FROM revenue_data');
    if (parseInt(revCount.rows[0].count) === 0) {
      console.log('Seeding initial revenue data...');
      await client.query(`
        INSERT INTO revenue_data (name, revenue, bookings) VALUES
        ('Jan', 4000, 24),
        ('Feb', 5200, 35),
        ('Mar', 4800, 28),
        ('Apr', 7000, 45),
        ('May', 8500, 56),
        ('Jun', 11000, 78)
      `);
    }

    // 4. Users Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
  email_verified BOOLEAN DEFAULT FALSE,
          verification_token VARCHAR(255),
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'user'
      )
    `);

    // Seed Super-admin user
    const superAdminEmail = 'Puspharaj.m2003@gmail.com';
    const superAdminCheck = await client.query('SELECT * FROM users WHERE email = $1', [superAdminEmail]);
    if (superAdminCheck.rows.length === 0) {
      console.log('Seeding Super-admin profile...');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('Push@2003', salt);
      await client.query(`
        INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)
      `, ['Puspharaj M', superAdminEmail, hashedPassword, 'super-admin']);
    }

    console.log('Database verification and seeding completed successfully.');
  } catch (err) {
    console.error('Error setting up database:', err);
  } finally {
    client.release();
  }
}

// Initialize connection and tables
initDb().then(() => {
  // Start server after database tables check
  app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
  });
});

// API Routes

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

// Serve frontend assets in production
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
