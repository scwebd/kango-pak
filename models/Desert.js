const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const desertSchema = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true
    }
})

const Desert = mongoose.model("Desert", desertSchema);

module.exports = Desert;