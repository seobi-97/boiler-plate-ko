const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; //몇자리 인지 설정
const jwt =require('jsonwebtoken');

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
  //다른것으로 바꾸는 경우
  else{
    next();
  }
  
});

userSchema.methods.comparePassword=function(plainPassword, cb){
  //plainPassword 123456와 암호화된 비밀번호 맞는지 확인
  bcrypt.compare(plainPassword,this.password, function(err, isMatch){
    if(err)return cb(err);
      cb(null,isMatch)
  })
}

userSchema.methods.generateToken=function(cb){
  var user=this;
  //jsonwebtoken을 이용해서 토큰 생성하기
  var token = jwt.sign(user._id.toHexString(), 'secretToken');
  //user._id+'secretToken'=token

  user.token=token;
  user.save(function(err,user){
    if(err)return cb(err);
    cb(null,user)
  })
}

userSchema.statics.findByToken=function(token,cb){
  var user=this;
  //토큰을 decode한다.
  jwt.verify(token,'secretToken',function(err,decoded){
    //유저 아이디를 이용해서 유저를 찾은 다음에
    //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
    user.findOne({"_id":decoded,"token":token},function(err,user){
      if(err)return cb(err);
      cb(null,user)
    })
  })
  
}
const User=mongoose.model('User',userSchema)

module.exports={User}