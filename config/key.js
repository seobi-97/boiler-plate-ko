if(process.env.NODE_ENV==='production'){
  //process.env.NODE_ENV 환경변수
  //배포한 상태이면
  module.exports=require('./prod');
}
  //로컬 상태이면
else{
  module.exports=require('./dev');
}