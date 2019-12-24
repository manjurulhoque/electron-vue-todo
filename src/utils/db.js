const sqlite3 = require("sqlite3").verbose();
let db;

function conn() {
    if (!db || !db.open) {
        db = new sqlite3.Database("base.db");
    }
    return db;
}

export const initTable = () => {
    return new Promise((resolve, reject) => {
        let db = conn();
        db.serialize(() => {
            db.run(
                "create table if not exists info (id integer primary key autoincrement, title varchar(255), date datetime)"
            );
            resolve();
        });
    });
};

export const queryAllInfo = () => {
    return new Promise((resolve, reject) => {
        let db = conn();
        db.all("select * from info order by date", (err, rows) => {
            if (err) reject(err);
            resolve(rows || []);
        });
    });
};

export const insertInfo = (title, date) => {
    return new Promise((resolve, reject) => {
        let db = conn();
        let prepare = db.prepare(
            "insert into info ('title', 'date') values (?, ?)"
        );
        prepare.run(title, date);
        prepare.finalize(err => {
            if (!err) resolve();
        });
    });
};

export const updateInfo = (id, title, date) => {
    return new Promise((resolve, reject) => {
        let db = conn();
        let prepare = db.prepare(
            "update info set title = ?, date = ? where id = ?"
        );
        prepare.run(title, date, id);
        prepare.finalize(err => {
            if (!err) resolve();
        });
    });
};

export const deleteInfo = id => {
    return new Promise((resolve, reject) => {
        let db = conn();
        let prepare = db.prepare("DELETE FROM info WHERE id = ?");
        prepare.run(id);
        prepare.finalize(err => {
            if (!err) resolve();
        });
    });
};
