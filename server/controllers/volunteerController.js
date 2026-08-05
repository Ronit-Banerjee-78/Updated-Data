import express from 'express';
import pool, { isDbConnected } from '../models/db.js';

const router = express.Router();

let memoryVolunteers = [
  {
    id: 'v-1',
    name: 'Anirban Mukherjee',
    email: 'anirban.m@gmail.com',
    phone: '+91 98301 23456',
    program: 'Indigenous Farming & Seed Conservation',
    location: 'Kolkata, West Bengal',
    availability: 'Weekends',
    skills: 'Organic farming, Soil testing, Photography',
    motivation: 'I want to contribute my weekend time towards seed conservation and sustainable village living.',
    status: 'pending',
    createdAt: new Date('2026-07-28').toISOString()
  },
  {
    id: 'v-2',
    name: 'Sutapa Sarkar',
    email: 'sutapa.s@yahoo.com',
    phone: '+91 94332 87654',
    program: 'Auxiliary Education Center',
    location: 'Burdwan, West Bengal',
    availability: 'Seasonal / Full-time',
    skills: 'Teaching primary children, Bengali literature, Music',
    motivation: 'Passionate about teaching village youth about nature and local heritage.',
    status: 'approved',
    createdAt: new Date('2026-07-30').toISOString()
  }
];

let nextVolId = 3;

// GET /api/volunteers
router.get('/', async (req, res) => {
  try {
    if (!isDbConnected) {
      return res.json({ success: true, volunteers: memoryVolunteers });
    }

    try {
      const result = await pool.query('SELECT * FROM volunteers ORDER BY created_at DESC');
      res.json({ success: true, volunteers: result.rows });
    } catch (dbErr) {
      console.warn("DB query failed for volunteers, using memory fallback:", dbErr.message);
      res.json({ success: true, volunteers: memoryVolunteers });
    }
  } catch (error) {
    console.error("Error fetching volunteers:", error.message);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// POST /api/volunteers
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, program, location, availability, skills, motivation } = req.body;

    if (!name || !email) {
      return res.status(400).json({ success: false, error: 'Name and Email are required' });
    }

    const newVol = {
      id: `v-${Date.now()}`,
      name,
      email,
      phone: phone || '',
      program: program || 'General Volunteer',
      location: location || '',
      availability: availability || 'Flexible',
      skills: skills || '',
      motivation: motivation || '',
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    if (!isDbConnected) {
      memoryVolunteers.unshift(newVol);
      return res.json({ success: true, volunteer: newVol });
    }

    try {
      await pool.query(
        `CREATE TABLE IF NOT EXISTS volunteers (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT,
          program TEXT,
          location TEXT,
          availability TEXT,
          skills TEXT,
          motivation TEXT,
          status TEXT DEFAULT 'pending',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`
      );

      const result = await pool.query(
        `INSERT INTO volunteers (id, name, email, phone, program, location, availability, skills, motivation, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
        [newVol.id, name, email, phone || '', program || '', location || '', availability || '', skills || '', motivation || '', 'pending']
      );

      res.json({ success: true, volunteer: result.rows[0] });
    } catch (dbErr) {
      console.warn("DB insert failed for volunteer, using memory fallback:", dbErr.message);
      memoryVolunteers.unshift(newVol);
      res.json({ success: true, volunteer: newVol });
    }
  } catch (error) {
    console.error("Error creating volunteer application:", error.message);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// PUT /api/volunteers/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    if (!isDbConnected) {
      const idx = memoryVolunteers.findIndex(v => v.id === id);
      if (idx !== -1) {
        memoryVolunteers[idx] = { ...memoryVolunteers[idx], status: status || memoryVolunteers[idx].status, notes };
        return res.json({ success: true, volunteer: memoryVolunteers[idx] });
      }
      return res.status(404).json({ success: false, error: 'Volunteer not found' });
    }

    try {
      const result = await pool.query(
        `UPDATE volunteers SET status = COALESCE($1, status) WHERE id = $2 RETURNING *`,
        [status, id]
      );
      if (result.rows.length > 0) {
        res.json({ success: true, volunteer: result.rows[0] });
      } else {
        res.status(404).json({ success: false, error: 'Volunteer not found' });
      }
    } catch (dbErr) {
      const idx = memoryVolunteers.findIndex(v => v.id === id);
      if (idx !== -1) {
        memoryVolunteers[idx] = { ...memoryVolunteers[idx], status: status || memoryVolunteers[idx].status };
        return res.json({ success: true, volunteer: memoryVolunteers[idx] });
      }
      res.status(404).json({ success: false, error: 'Volunteer not found' });
    }
  } catch (error) {
    console.error("Error updating volunteer:", error.message);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// DELETE /api/volunteers/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!isDbConnected) {
      memoryVolunteers = memoryVolunteers.filter(v => v.id !== id);
      return res.json({ success: true });
    }

    try {
      await pool.query('DELETE FROM volunteers WHERE id = $1', [id]);
      memoryVolunteers = memoryVolunteers.filter(v => v.id !== id);
      res.json({ success: true });
    } catch (dbErr) {
      memoryVolunteers = memoryVolunteers.filter(v => v.id !== id);
      res.json({ success: true });
    }
  } catch (error) {
    console.error("Error deleting volunteer:", error.message);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

export { router as volunteerRoutes };
