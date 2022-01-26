const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; //몇자리 인지 설정


const userSchema = mongoose.Schema({
  name:{
    type: String,
    maxlength: 50
  },
  email:{
    type: String,
    trim: true,
    unique:1
  },
  password:{
    type:String,
    minlength:5
  },
  lastname:{
    type: String,
    maxlength: 50
  },
  role:{
    type: Number,
    default: 0
  },
  image:String,
  token:{
    type: String
  },
  tokenExp:{
    type:Number
  }
})

//mongoose에서 가져오는 메소드
//index.js에서 save하기전에 진행
userSchema.pre('save',function(next){
  var user = this;
  //비밀번호가 변경이 될때만 암호화
  if(user.isModified('password')){
    //비밀번호 암호화
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
        // Store hash in your password DB.
      });
    });
  }
  
});

const User=mongoose.model('User',userSchema)

module.exports={User}