const path = require('path');
const fs = require('fs');

class PlayerVideoController {
    playerVideo = async (req, res, next) => {
        console.log('playerVideo');
        if (req.url != '/server.js') {
            //var url = __dirname + req.url;
            //const url = __dirname + '/assets/hls/segment0.ts';
            const url = '/Users/a0p0bj7/Documents/develop/others/zapping-stream/src/assets/hls/segment0.ts';
            console.log(`url ${url}`);
            fs.stat(url, function (err, stat) {
                if (err) {
                    //res.writeHead(404, { 'Content-Type': 'text/html' });
                    //res.end('Your requested URI(' + req.url + ') wasn\'t found on our server');
                    console.log(err);
                } else {
                    var type = 'video/mp4';//mime.getType(url);
                    var fileSize = stat.size;

                    //var range = req.headers.range;
                    const range = 'bytes=0-1234500';
                    if (range) {
                        var parts = range.replace(/bytes=/, "").split("-");
                        var start = parseInt(parts[0], 10);
                        var end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
                        var chunksize = (end - start) + 1;
                        var file = fs.createReadStream(url, { start, end });
                        var head = {
                            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                            'Accept-Ranges': 'bytes',
                            'Content-Length': chunksize,
                            'Content-Type': type
                        }
                        //res.writeHead(206, head);
                        file.pipe(res);
                        res.status(206).send(head);

                    } else {
                        var head = {
                            'Content-Length': fileSize,
                            'Content-Type': type
                        }
                        res.writeHead(200, head);

                        fs.createReadStream(url).pipe(res);
                    }
                }
            });
        } else {
            res.writeHead(403, { 'Content-Type': 'text/html' });
            res.end('Sorry, access to that file is Forbidden');
        }

        res.render('../views/pages/player');
    };
}

module.exports = new PlayerVideoController;