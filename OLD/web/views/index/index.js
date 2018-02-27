var viewModel;

$(document).ready(function(){
    viewModel = indexViewModel();
    ko.applyBindings(viewModel);
    loadLatestUploads();
});

function loadLatestUploads(){
    $.ajax({
        url: "/webapi/lastestuploads",
        type: "GET",
        contentType: "application/json",
        success: function(res) {
            res.docs.forEach(function(element) {
                viewModel.latestUploads.push(element);
            }, this);
            console.log(res);
        }
    });
}

var socket = io.connect();

socket.on('messages', function(data) {
    console.log(data);
});

socket.on('new', function(data) {
    viewModel.latestUploads.push(data);
    console.log(data);
});