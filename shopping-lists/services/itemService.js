import { sql } from "../database/database.js"

const findById = async (id) => {
    const rows = await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${id} ORDER BY  collected ASC, name ASC`
    if (rows && rows.length > 0) {
        return rows
    } else {
        return {id: 0, name: "unknown"}
    }
};

const addItem = async (id, name) => {
    await sql`INSERT INTO shopping_list_items (name, shopping_list_id) VALUES (${name}, ${id})`
}

const collectById = async (id) => {
    await sql`UPDATE shopping_list_items SET collected = true WHERE id = ${id}`
}

const countItems = async () => {
    const count = await sql`SELECT COUNT (id) FROM shopping_list_items`
    if (count[0].count > 0) return count[0].count
    else false
}

export {findById, addItem, collectById, countItems}