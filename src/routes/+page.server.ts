import { sql } from '@vercel/postgres';
import { error } from '@sveltejs/kit';

export async function load() {
  const { rows } = await sql`SELECT id,title, description FROM droplet_templates`;
  if (rows) {
    return { templates: rows };
  }
  throw error(404, 'Not found');
}