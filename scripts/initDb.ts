import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

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
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'user',
        email_verified BOOLEAN DEFAULT FALSE,
        verification_token VARCHAR(255)
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

initDb().then(() => {
  console.log("Finished running DB Init.");
  process.exit(0);
});
