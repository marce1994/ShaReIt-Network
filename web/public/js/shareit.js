var shareit = {};

shareit.social = shareit.prototype = {
    //configuration section
    parentPermLink: 'shareit-project-webtorrent-steemit-webapp',
    parentAuthor: 'pablobianco',
    jsonMetadata: { app: 'shareit' },
    //---------------------
    userName: undefined, postkey: undefined,

    /**
     * @description Used to configure the library, without this, we cant call any post, and vote operation.
     * @param {string} userName Represents user's name in steemit.
     * @param {string} password Represents user's password in steemit.
     */
    configure: function (userName, password) {
        this.userName = userName;
        this.postkey = steem.auth.getPrivateKeys(userName, password, ['posting']).posting;
        console.log(this.postkey);
        console.log('Is valid postKet? ', steem.auth.isWif(this.postkey));
    },

    /**
     * @description Used to up vote some comment/post.
     * @param {string} author Represents post/comment's owner.
     * @param {string} permLink Represents post/comment's perma link.
     * @param {function} callback Used to return success or not callback(err, success: true/false);
     */
    upVote(author, permLink, callback) {
        /* @params username, password, author, permlink, weight */
        steem.broadcast.vote(postkey, userName, author, permLink, 10000, function (err, result) {
            callback(err, result !== undefined);
        });
    },

    /**
     * @description Used to down vote some comment/post.
     * @param {string} author Represents post/comment's owner.
     * @param {string} permLink Represents post/comment's perma link.
     * @param {function} callback Used to return success or not callback(err, success: true/false);
     */
    downVote(author, permLink, callback) {
        /* @params username, password, author, permlink, weight */
        steem.broadcast.vote(postkey, userName, author, permLink, -10000, function (err, result) {
            callback(err, result !== undefined);
        });
    },

    /**
     * @description Used to get account's information.
     * @param {string} username Represents the user.
     * @param {function} callback It's used to return account's information callback(err, accountInfo).
     */
    getAccountInformation(username, callback) {
        steem.api.getAccounts([username], function (err, result) {
            if (result.length == 0) {
                console.log('Username doesnt exists');
                callback({ err: 'Account doesnt exists' }, null);
            } else {
                var object = {};
                object.reputation = steem.formatter.reputation(result[0].reputation);
                object.votingPower = result[0].voting_power;
                object.name = result[0].name;
                object.jsonMetadata = result[0].json_metadata;
                callback(null, object);
            }
        });
    },

    /**
     * @description Used to create a post in steemit.
     * @param {string} title Represents post's title.
     * @param {string} body Represents post's body/text.
     * @param {[string]} tags Represents post's categories and/or subcategories(first it's main categorie).  
     * @param {function} callback It's used to returns post data callback(err, {permLink,author}).
     */
    post(title, body, tags, callback) {
        var bodyMinLenght = 55; var valid = true; var msg = []; var titleMinLength = 5;
        if (title === undefined || title.length <= titleMinLength) {
            valid = false;
            msg.push('title must have a minimum length of ' + titleMinLength);
        }
        if (body === undefined || body.length <= bodyMinLenght) {
            valid = false;
            msg.push('body must have a minimum length of ' + bodyMinLenght);
        }
        if (valid) {
            var commentPermLink = steem.formatter.commentPermlink(userName, parentPermLink);
            jsonMetadata.tags = tags;
            steem.broadcast.comment(postkey, parentAuthor, parentPermLink, userName, commentPermLink, title, body, jsonMetadata, function (err, result) {
                callback(err, { permLink: commentPermLink, author: userName });
            });
        } else {
            callback({ msg }, undefined);
        }
    },
    
    /**
     * @description Creates a comment under a post(post is comment's parent). 
     * @param {string} body Text that represents the comment.
     * @param {string} author Post owner user name(not comment owner).
     * @param {string} authorPermLink Identifies the post in steemit(/author/authorPermLink).
     */    
    comment(body, author, authorPermLink, callback) {
        var valid = true; var msg = []; var bodyMinLenght = 55;
        if (body === undefined || body.length <= bodyMinLenght) {
            valid = false;
            msg.push('body must have a minimum length of ' + bodyMinLenght);
        }
        if (valid) {
            var commentPermLink = steem.formatter.commentPermlink(author, authorPermLink);
            steem.broadcast.comment(postkey, author, authorPermLink, userName, commentPermLink, '', body, jsonMetadata, function (err, result) {
                //it returns how to access to this post, optional.
                callback(err, { permLink: commentPermLink, author: userName });
            });
        } else {
            callback({ msg }, undefined);
        }
    }
};

/**
 * Torrent Module
 */
shareit.torrent = shareit.prototype = {
    webTorrent: new WebTorrent(),    
    torrents: [],

    /**
     * @description Return true if WebTorrent it's supported.
     */
    webTorrentSupported() {
        if (WebTorrent.WEBRTC_SUPPORT) {
            console.log("WebTorrent supported");
            return true;
        } else {
            console.log("WebTorrent not supported");
            console.log("Get a real browser");
            return false;
        }
    },

    /**
     * @description This function it's used to begin sharing content, like videos over p2p webtorrent network.
     * @param {*} files This object represents files/folder to share.
     * @param {function} updateFunction A function that its called every xxx miliseconds to send torrent status.
     * @param {function} callback A function that returns torrent information to post to shareit-network.
     */
    seedFiles(files, updateFunction, callback) {
        webTorrent.seed(files, function (torrent) {
            console.log("Torrent created, now sharing.");
            var t = {};
            t.magnet = torrent.magnetURI;
            callback(t);
            //some more things
            torrents.push(torrent);
            // Trigger statistics refresh
            setInterval(onProgress, 500)
            onProgress()
            // Statistics
            function onProgress() {
                object = {};
                object.numPeers = torrent.numPeers + (torrent.numPeers === 1 ? ' peer' : ' peers');
                object.uploadSpeed = prettyBytes(torrent.uploadSpeed) + '/s';
                object.downloadSpeed = prettyBytes(torrent.downloadSpeed) + '/s';
                updateFunction(object);
            }
        });
    },
    
    /**
     * @description This method begins to share some magnet link from shareit-network.
     * @param {string} magnet Represents magnet URI to be shared.
     * @param {function} updateFunction A function that its called every xxx miliseconds to send torrent status.
     */
    seedMagnetLink(magnet, updateFunction) {
        webTorrent.seed(magnet, function (torrent) {
            console.log("Sharing torrent");
            var t = {};
            t.magnet = torrent.magnetURI;  
            //some more things
            torrents.push(t);
            // Trigger statistics refresh
            setInterval(onProgress, 500)
            onProgress()
            // Statistics
            function onProgress() {
                object = {};
                object.numPeers = torrent.numPeers + (torrent.numPeers === 1 ? ' peer' : ' peers');
                object.uploadSpeed = prettyBytes(torrent.uploadSpeed) + '/s';
                object.downloadSpeed = prettyBytes(torrent.downloadSpeed) + '/s';
                updateFunction(object);
            }
        });
    }
};

// Just an utility to see better upload and downloads speeds/s
/**
 * @description Converts horrible number, to kB, MB, GB, TB.
 * @param {num} num Represents a number to be beautify and converted to data size type.
 */
function prettyBytes(num) {
    var exponent, unit, neg = num < 0, units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    if (neg) num = -num
    if (num < 1) return (neg ? '-' : '') + num + ' B'
    exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1)
    num = Number((num / Math.pow(1000, exponent)).toFixed(2))
    unit = units[exponent]
    return (neg ? '-' : '') + num + ' ' + unit
};