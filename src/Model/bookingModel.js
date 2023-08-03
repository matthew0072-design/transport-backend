const mongoose = require("mongoose")
const {Schema} = mongoose

const bookingSchema = new Schema({
    from: {
      type: String,
      required: [true, "Your Picking point is required"],
    },

    to: {
      type: String,
      required: [true, "Your Destination is required"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    

})

const bookingModel = mongoose.model("Book", bookingSchema);

module.exports = bookingModel;
