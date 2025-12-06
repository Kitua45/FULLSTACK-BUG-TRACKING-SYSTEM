import { getPool } from "../db/config";
import { Project, NewProject, UpdateProject } from "../Types/projects.types";

// Get all projects
export const getAllProjects = async (): Promise<Project[]> => {
  const pool = await getPool();
  const result = await pool.request().query(`SELECT * FROM Projects`);
  return result.recordset;
};

// Get project by ID
export const getProjectById = async (id: number): Promise<Project | null> => {
  const pool = await getPool();
  const result = await pool
    .request()
    .input('id', id)
    .query(`SELECT * FROM Projects WHERE projectid = @id`);
  return result.recordset[0] || null;
};

// Create new project
export const createNewProject = async (project: NewProject): Promise<Project> => {
  const pool = await getPool();
  const result = await pool
    .request()
    .input("title", project.title)
    .input("description", project.description)
    .input("created_by", project.created_by)
    .input("created_at", project.created_at)
    .query(`
      INSERT INTO Projects (title, description, created_by, created_at)
      OUTPUT INSERTED.*
      VALUES (@title, @description, @created_by, @created_at)
    `);
  return result.recordset[0]; // return single object
};

// Update project
export const updateProject = async (id: number, project: UpdateProject): Promise<Project | null> => {
  const pool = await getPool();
  const request = pool.request();

  const fields = Object.entries(project)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => {
      request.input(key, value);
      return `${key} = @${key}`;
    });

  if (fields.length === 0) return null; // nothing to update

  request.input("id", id);
  const query = `UPDATE Projects SET ${fields.join(", ")} OUTPUT INSERTED.* WHERE projectid = @id`;
  const result = await request.query(query);
  return result.recordset[0] || null; // single object
};

// Delete project
export const deleteProject = async (id: number): Promise<Project | null> => {
  const pool = await getPool();
  const result = await pool
    .request()
    .input('id', id)
    .query('DELETE FROM Projects OUTPUT DELETED.* WHERE projectid = @id');
  return result.recordset[0] || null; // single object
};
