import mongoose from 'mongoose';


export default class mongodb {
    static instance = null;
    cached = { conn: null, promise: null };
    uri = process.env.MONGODB_URI;

    constructor() {
        if (mongodb.instance == null) {
            mongodb.instance = this;

            if (!this.uri) {
                throw new Error('Please define the MONGODB_URI environment variable');
            }
            this.cached = mongoose;
        }
        return mongodb.instance;
    }

    async dbConnect() {
        if (this.cached.conn) {
            return this.cached.conn;
        }

        if (!this.cached.promise) {
            this.cached.promise = mongoose.connect(this.uri).then((mongoose) => {
                return mongoose;
            });
        }
        this.cached.conn = await this.cached.promise;
        return this.cached.conn;
    }
}
