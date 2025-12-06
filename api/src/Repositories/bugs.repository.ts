// src/repositories/bugs.repository.ts
import { getPool } from '../db/config';
import * as mssql from 'mssql';
import { Bug } from '../Types/bugs.types';

export class BugsRepository {
  private table = 'Bugs';

  // Get all bugs
  async getAllBugs(): Promise<Bug[]> {
    const pool = await getPool();
    const result = await pool.request()
      .query(`SELECT * FROM ${this.table} ORDER BY created_at DESC`);
    return result.recordset || [];
  }

  // Get a single bug by ID
  async findById(bug_id: number): Promise<Bug | null> {
    const pool = await getPool();
    const result = await pool.request()
      .input('bugid', mssql.Int, bug_id)
      .query(`SELECT * FROM ${this.table} WHERE bugid = @bugid`);
    return result.recordset[0] ?? null;
  }

  // Get all bugs by project ID
  async findAllByProject(project_id: number): Promise<Bug[]> {
    const pool = await getPool();
    const res = await pool.request()
      .input('project_id', mssql.Int, project_id)
      .query(`SELECT * FROM ${this.table} WHERE projectid = @project_id ORDER BY created_at DESC`);
    return res.recordset || [];
  }

  // Create a new bug
  async create(b: Bug) {
    const pool = await getPool();
    const result = await pool.request()
      .input('projectid', mssql.Int, b.projectid)
      .input('reported_by', mssql.Int, b.reported_by)
      .input('assigned_to', mssql.Int, b.assigned_to ?? null)
      .input('title', mssql.VarChar(150), b.title)
      .input('description', mssql.Text, b.description ?? null)
      .input('severity', mssql.VarChar(20), b.severity)
      .input('status', mssql.VarChar(20), b.status)
      .input('created_at', mssql.DateTime, b.created_at ?? new Date())
      .input('updated_at', mssql.DateTime, b.updated_at ?? new Date())
      .query(`
        INSERT INTO ${this.table} (projectid, reported_by, assigned_to, title, description, severity, status, created_at, updated_at)
        VALUES (@projectid, @reported_by, @assigned_to, @title, @description, @severity, @status, @created_at, @updated_at)
      `);

    return result.recordset;
  }

  // Update an existing bug by ID
  async update(bugid: number, updates: Partial<Bug>) {
    const pool = await getPool();
    const fields: string[] = [];
    const request = pool.request().input('bugid', mssql.Int, bugid);

    // Dynamically add fields to update
    if (updates.projectid !== undefined) {
      request.input('projectid', mssql.Int, updates.projectid);
      fields.push('projectid = @projectid');
    }
    if (updates.reported_by !== undefined) {
      request.input('reported_by', mssql.Int, updates.reported_by);
      fields.push('reported_by = @reported_by');
    }
    if (updates.assigned_to !== undefined) {
      request.input('assigned_to', mssql.Int, updates.assigned_to);
      fields.push('assigned_to = @assigned_to');
    }
    if (updates.title !== undefined) {
      request.input('title', mssql.VarChar(150), updates.title);
      fields.push('title = @title');
    }
    if (updates.description !== undefined) {
      request.input('description', mssql.Text, updates.description);
      fields.push('description = @description');
    }
    if (updates.severity !== undefined) {
      request.input('severity', mssql.VarChar(20), updates.severity);
      fields.push('severity = @severity');
    }
    if (updates.status !== undefined) {
      request.input('status', mssql.VarChar(20), updates.status);
      fields.push('status = @status');
    }

    // Always update updated_at
    request.input('updated_at', mssql.DateTime, new Date());
    fields.push('updated_at = @updated_at');

    const query = `UPDATE ${this.table} SET ${fields.join(', ')} WHERE bugid = @bugid`;
    await request.query(query);
  }

  // Delete a bug by ID
  async delete(bugid: number) {
    const pool = await getPool();
    await pool.request()
      .input('bugid', mssql.Int, bugid)
      .query(`DELETE FROM ${this.table} WHERE bugid = @bugid`);
  }
}

