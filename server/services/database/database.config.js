const { DB_URL } = process.env;
export const DATABASE_URL = DB_URL || "mongodb://localhost:27017/profiler";
