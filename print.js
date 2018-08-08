const fs=require('fs');
const path=require('path');


const print=function (req,status,msg){
    let ip=getClientIp(req);
    let method=req.method;
    let req_data=req.url;
    let this_date=getNowFormatDate();
    let zhaungtai=status||'error';
    let tips=msg||'未知错误';
    if(typeof tips==='object'){
    	tips=JSON.stringify(tips);
    }
    let data=ip+' '+this_date +' '+zhaungtai+' '+method+' '+req_data+' '+tips+'\n';  
    let filepath='../log/'+getFormatDate()+'.log'
	fs.appendFile(path.join(__dirname, filepath), data, (err) => {
		if(err){
		  	console.log(err);
		}else{
		}
	});
}

const getFormatDate=function (){
	var date = new Date();
	var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear()+month+strDate;
    return currentdate;
}

 const getNowFormatDate=function () {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}

const getClientIp = function (req) {
    let address = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress || '';
    let ip = address.match(/\d+.\d+.\d+.\d+/);
    return ip ? ip.join('.') : null;
};

module.exports=print