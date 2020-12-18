const mongoose = require("mongoose");
const Facilities = require('./facilitiesModel');
const Rating = require('./ratingModel');
const Follow = require('./followModel');
// const Notification = require('./NotificationModel');

const accommodationSchema = mongoose.Schema({
    ownerId:{
        type: String,
		required: true
    },
    ownerName:{
        type: String,
        required: true
    },
    ownerPhone:{
        type: String,
        required: true
    },
    houseNumber: {//So nha
        type: String,
		required: true
    },
    street:{//Ten duong
        type: String,
		required: true
    },
    ward:{
        type: String,
        required: true
    },
    district:{//Quan/Huyen
        type: String,
		required: true
    },
    city:{//Thanh pho
        type: String,
		required: true
    },
    publicPlace:{
        type: String,
		required: true
    },
    accommodationType:{
        type: String,
		enum: [ 'phòng trọ', 'chung cư mini', 'nhà nguyên căn', 'chung cư nguyên căn' ],
		required: true
    },
    avaiable:{//So luong nha con trong
        type: Boolean,
        default: true
    },
    price:{//Month
        type: Number,
        required: true
    },
    seperateAccommodation:{//Chung chủ
        type: Boolean,
        required: true,
    },
    livingArea:{//Diện tích
        type: Number,
        required: true
    },
    photos:{
        type: [String],
        required: true
    },
    watch:{//Số người bấm vào xem
        type: Number,
        default: 0
    },
    materialFacilities:{//CSVC
        type: mongoose.Schema.Types.ObjectId,
		ref: 'facilities',
		required: true
    },
    comment:{//Bình luận
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment',
    },
    rating:{//Đánh giá
        type: mongoose.Schema.Types.ObjectId,
        ref: 'rating',
    },
    timeToLive: {//Weeks
        type: Number,
        required: true,
        default: 1
    },
    postedDate:{
        type: Date,
        default: Date.now()
    },
    pending: {
        type: Boolean,
        default: true
    },
    avgRate: {
        type: String,
        default: (Math.random()*5).toFixed(1)
    },
    title: {
        type: String,
        required: true,
        default: "cho thuê nhà trọ giá rẻ"
    }
})


//Pre save send notification

const Accommodation = mongoose.model("accommodation", accommodationSchema);

module.exports = Accommodation;