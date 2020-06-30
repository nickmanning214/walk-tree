

module.exports = function cloneObj(obj,Class)
{
    const clone = Object.assign( {}, obj ); 
    Object.setPrototypeOf( clone, Class.prototype );

    function transferProps(obj1,obj2){
        let keys = Object.keys(obj1);
        keys.forEach(key=>{
            if (typeof obj1[key])
            else{
                obj2[key] == obj1[key];
            }
        })
    }

    transferProps(obj,)

}
