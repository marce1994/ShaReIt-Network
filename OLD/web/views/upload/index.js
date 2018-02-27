var viewModel;
var webTorrent = new WebTorrent();

var fileInput;
var imgInput;

$(function(){
    viewModel = indexViewModel();
    ko.applyBindings(viewModel);

    fileInput = $('input:file[name=upload]');
    imgInput = $('input:file[name=image]');

    imgInput.on('change', function(){
        //$("#imgpreview").app
        //archivo como src
        var reader = new FileReader();
        reader.onload = function(e) {
            var imageCompressor = new ImageCompressor;
            var compressorSettings = {
                toWidth : 300,
                toHeight : 300,
                mimeType : 'image/png',
                mode : 'strict',
                quality : 0.6,
                speed : 'low'
            };
            imageCompressor.run(e.target.result, compressorSettings, function(compressedSrc){
                viewModel.img(compressedSrc);
                $('#imgpreview').attr('src', viewModel.img());                
            });
        }
        reader.readAsDataURL(imgInput[0].files[0]);
    });

    fileInput.on('change',function(){
        if(fileInput[0].files.length > 0){
            viewModel.fileNames([]);
            for (var index = 0; index < fileInput[0].files.length; index++) {
                var element = fileInput[0].files[index];
                viewModel.fileNames.push(element.name);
            }
        }else{
            console.log("debe seleccionar archivos");
        }
    });
    
    if (WebTorrent.WEBRTC_SUPPORT) {
        console.log("WebTorrent soportado");
    } else {
        console.log("WebTorrent no soportado");
        console.log("Favor de usar un browser decente");
    }
});

function publishTorrent(){
    console.log("publishing torrent...");
    var obj = {};

    var valid = true;
    if(viewModel.title() == null) valid = false;
    if(viewModel.description() == null) valid = false;
    if(viewModel.img() == null) valid = false;
    if(viewModel.tags() == null) valid = false;
    if(valid){
        webTorrent.seed(fileInput[0].files, function(torrent){
            viewModel.seeding(true);
            console.log("Torrent created.");
            viewModel.torrent(torrent);
            viewModel.magnetLink(torrent.magnetURI);
            var Obj = {
                title : viewModel.title(),
                description : viewModel.description(),
                img : viewModel.img(),
                tags : viewModel.tags(),
                magnet : viewModel.magnetLink(),
            }
            postShare(Obj);
            // Trigger statistics refresh
            setInterval(onProgress, 500)
            onProgress()
            // Statistics
            function onProgress () {
                // Peers
                viewModel.peerCount(torrent.numPeers + (torrent.numPeers === 1 ? ' peer' : ' peers'));

                // Speed rates
                viewModel.uploadSpeed(prettyBytes(torrent.downloadSpeed) + '/s');
                viewModel.downloadSpeed(prettyBytes(torrent.uploadSpeed) + '/s');
            }
        });
    }else{
        console.log("faltan campos");
    }
}
// Human readable bytes util
function prettyBytes(num) {
    var exponent, unit, neg = num < 0, units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    if (neg) num = -num
    if (num < 1) return (neg ? '-' : '') + num + ' B'
    exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1)
    num = Number((num / Math.pow(1000, exponent)).toFixed(2))
    unit = units[exponent]
    return (neg ? '-' : '') + num + ' ' + unit
}

function postShare(data){
    console.log(data);
    $.ajax({
        type: "POST",
        url: '/webapi/upload',
        data: data,
        dataType: 'json',
        success: function(){
            console.log("posted")
        },
    });
}