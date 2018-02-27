function indexViewModel() {
    var self = {};

    self.fileNames = ko.observableArray();

    self.title = ko.observable();
    self.description = ko.observable();
    self.img = ko.observable();
    self.tags = ko.observableArray();
    self.magnetLink = ko.observable();

    self.seeding = ko.observable(false);
    self.torrent = ko.observable();

    self.uploadSpeed = ko.observable();
    self.downloadSpeed = ko.observable();
    self.peerCount = ko.observable();
    return self;
};