import mongoose from "mongoose"
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const _model = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    summary: { type: String },
    img: { type: String },
    authorId: { type: ObjectId, ref: 'User', required: true }
}, { timestamps: true })

export default class BlogService {
    get repository() {
        return mongoose.model('blog', _model)
    }
}