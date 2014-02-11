function person(name,number){
    this.name = name;
    this.number = number;
    this.gift;
    this.setGift=function(gift){
        this.gift = gift;
    }
    this.toStr = function(){
        if(this.gift){
            return this.name+":"+this.gift.name+'<br>';
        }else{
            return this.name;
        }

    }
}

function gift(name,count){
    this.name = name;
    this.number;
    this.count = count;
    this.toPerson=function(){
        if(count==0){
            return null;
        }else{
            this.count--;
            return this.name;
        }

    }
    this.toArray = function(){
        var gifts=[];
        for(var i=0;i<this.count;i++){
            gifts.push(new gift(this.name,this.count))
        }
        return gifts;
    }
    this.toStr = function(){
        return this.name;
    }
}


function Draw(persons){
    //存放所有人员和礼品
    this.gifts = [];
    this.persons = persons|| [];
    //保存每次抽奖的结果[[person],[person],[person],[person],[person]]
    this.draws=[];
    //暂时存放
    this.personsTemp=[];
    this.giftsTemp=[];

    this.drawN =function(n){
        var p = this.getRandomSubArray(this.persons,n);
        var g = this.getRandomSubArray(this.gifts,n)
        for(var i=0;i<p.length;i++){
            p[i].setGift(g[i]);
        }
        this.draws.push(p);
    }
    this.randomPersons = function(n){
        this.persons = this.personsTemp.concat(this.persons);
        this.personsTemp = this.getRandomSubArray(this.persons,n);
        return this.personsTemp;
    }
    this.randomGifts = function(n){
        this.gifts = this.giftsTemp.concat(this.gifts);
        this.giftsTemp = this.getRandomSubArray(this.gifts,n);
        return this.giftsTemp;
    }
    this.giftsToPersons = function(){
        if(this.personsTemp.length>0){
            for(var i=0;i<this.personsTemp.length;i++){
                this.personsTemp[i].setGift(this.giftsTemp[i]);
            }
            this.draws.push(this.personsTemp);
            this.personsTemp = [];
            this.giftsTemp = [];
        }
    }

    this.addGift = function(gift){
        this.gifts = this.gifts.concat(gift.toArray())
    }
    this.addGiftArray = function(gifts){
        for(var i=0;i<gifts.length;i++){
            this.addGift(gifts[i])
        }
    }
    this.addPersonArray = function(persons){
        for(var i=0;i<persons.length;i++){
            this.persons.push(persons[i]);
        }
    }
    this.addPerson = function(person){
        this.persons.push(person)
    }
    this.print = function(){
        for(var i=0;i<this.draws.length;i++){
            document.writeln("<br>第"+(i+1)+"批抽奖<br><br>");
            //console.log("第"+(i+1)+"批抽奖\n");
            for(var j=0;j<this.draws[i].length;j++){
                document.writeln(this.draws[i][j].toStr());
                //console.log(this.draws[i][j].toStr());
            }

        }
    }
}
/**
 * 从一个长为m的数组中挑出n个元素，再返回剩下的m-n长的数组
 * @param fromArray
 * @param n
 * @returns {Array}
 */
Draw.prototype.getRandomSubArray = function(fromArray,n){
    var temp = [];
    if (fromArray && n && fromArray instanceof Array) {
        if(n > fromArray.length){
            n = fromArray.length;
        }
        for(var i=fromArray.length-1;i>=0 && n>0;i--,n--){
            temp.push(fromArray.splice(GetRandomNum(0, i),1)[0]);
        }
    }
    return temp;
}








/**
 * 从一个数组中随机取n个放到另一个数组中,返回
 */
function assignArray(from, n) {
    var result = [];
    if (from && n && from instanceof Array && n <= from.length) {
        for(var i=from.length-1;i>=0 && n>0;i--,n--){
            result.push(from.splice(GetRandomNum(0, i),1)[0]);
        }
    }
    return result;
}

/**
 * 输入一个最小值Min，一个最大值Max，随机得到[Min,Max)中一个整数
 * @param Min
 * @param Max
 * @returns {*}
 * @constructor
 */
function GetRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Math.round(Rand * Range));
}