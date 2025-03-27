import sqlite3 from "sqlite3";

const tasks = new sqlite3.Database('tasks.db', sqlite3.OPEN_READWRITE);
const users = new sqlite3.Database('users.db', sqlite3.OPEN_READWRITE);
const tokens = new sqlite3.Database('tokens.db', sqlite3.OPEN_READWRITE);

tasks.run('CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, userId STRING, title TEXT NOT NULL, description TEXT, status TEXT);', (err) => {
    if (err) {
        console.error('Ошибка создания таблицы:', err);
    } else {
        console.log('Таблица создана успешно');
    }
});

users.run('CREATE TABLE IF NOT EXISTS users (userId STRING PRIMARY KEY, password TEXT, status TEXT);', (err) => {
    if (err) {
        console.error('Ошибка создания таблицы:', err);
    } else {
        console.log('Таблица создана успешно');
    }
});

tokens.run('CREATE TABLE IF NOT EXISTS tokens (userId STRING, refreshToken STRING);', (err) => {
    if (err) {
        console.error('Ошибка создания таблицы:', err);
    } else {
        console.log('Таблица создана успешно');
    }
});

const db = {
    tasks,
    users,
    tokens
}

export default db;