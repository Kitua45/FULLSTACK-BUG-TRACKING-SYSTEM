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
    const result = await pool.request()
        .input("title", project.title)
        .input("description", project.description)
        .input("status", project.status)
        .input("created_by", project.created_by)
        .query(`
            INSERT INTO Projects (title, description, status, created_by)
            OUTPUT INSERTED.*
            VALUES (@title, @description, @status, @created_by)
        `);

    return result.recordset[0]; // returns the inserted project
};

// Update project
export const updateProject = async (id: number, data: UpdateProject): Promise<Project> => {
  const pool = await getPool();
  const result = await pool.request()
    .input("id", id)
    .input("title", data.title)
    .input("description", data.description)
    .input("status", data.status)
    .query(`
      UPDATE Projects
      SET title = @title,
          description = @description,
          status = @status,
          updated_at = GETDATE()
      OUTPUT INSERTED.*
      WHERE projectid = @id
    `);

  return result.recordset[0];
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

const ProjectRepository = {
  getAllProjects,
  getProjectById,
  createNewProject,
  updateProject,
  deleteProject,
};

export default ProjectRepository;
