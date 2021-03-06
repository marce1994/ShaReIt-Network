module.exports = function (http, gunOptions) {
    var Gun = require('gun');
    var gun = Gun(gunOptions);
    module.AddObject = function(key,Obj, callback){
        console.log(key);
        var uploads = gun.get('uploads_database');
        Obj.creation_timestamp = Date.now();
        uploads.set(Obj, function(ack) { callback(ack); });
    };
    module.Suscribe = function(callback)
    {
        gun.get('uploads_database').on(function(data, key){
            var puntero = data._['>'];
            var keyNames = Object.keys(puntero);
            gun.get(keyNames[0]).val(function(data){
                callback(data);
            });
        },true);
    }
    return module;
};