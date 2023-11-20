import { sql } from '@vercel/postgres';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const { rows } = await sql`SELECT id, title, description, bootstrap FROM droplet_templates WHERE id = ${params.id}`;
  if (rows && rows.length > 0) {
    return { template: rows[0] };
  }
  throw error(404, 'Not found');
}