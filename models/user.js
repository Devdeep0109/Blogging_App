const {createHmac ,randomBytes} = require("crypto");
const {Schema ,model} = require('mongoose');

const userSchema = new Schema({
    fullName:{
        type : String,
        required : true,
    },
    email:{
        type : String,
        required : true,
        unqiue: true,
    },
    // hashing the password
    salt:{
        type : String,
    },
    password:{
        type : String,
        required:true,
    },
    profileImageUrl:{
        type:String,
        default : "/images/default.png",
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER",
    }

},{timestamps:true});

// for encryption of password......
userSchema.pre("save" ,function(next){
    const user = this;
    if(!user.isModified("password"))
    return ;

const salt = randomBytes(16).toString();
const hashedPassword = createHmac("sha256" ,salt)
.update(user.password)
.digest("hex");

this.salt = salt;
this.password = hashedPassword;

})


const User = model('BlogUser' ,userSchema);

module.exports = User;