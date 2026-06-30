import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

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
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
