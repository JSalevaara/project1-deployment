import { sql } from "../database/database.js"

const showAllActiveLists = async () => {
    return await sql`SELECT * FROM shopping_lists WHERE active = TRUE`; 
}

const addNewList = async (name) => {
    await sql`INSERT INTO shopping_lists (name) VALUES (${name})`;
};

const countLists = async () => {
    const count = await sql`SELECT COUNT(id) FROM shopping_lists WHERE active = TRUE`
    if (count[0].count > 0) return count[0].count
    else false
}

const deactivateById = async (id) => {
    await sql`UPDATE shopping_lists SET active = false WHERE id = ${id}`
}

const findById = async (id) => {
    return await sql`SELECT * FROM shopping_lists WHERE id = ${id}`
}
export { showAllActiveLists, addNewList, countLists, deactivateById, findById }