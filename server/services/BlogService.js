import mongoose from "mongoose"
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const _model = new Schema({
    title: { type: String, required: true },
    body: { type: String },
    summary: { type: String },
    img: { type: String },
    author: { type: ObjectId, ref: 'User', required: true },
    comments: { type: ObjectId, ref: 'comment' }
}, { timestamps: true })

export default class BlogService {
    get repository() {
        return mongoose.model('blog', _model)
    }
}