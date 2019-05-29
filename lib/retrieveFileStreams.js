const Writable = require("stream").Writable;

function retrieveFileStreams(conn, config, fileStreamArray, client_type) {
  return Promise.all(
    fileStreamArray.map(file => {
      // make sure we are using sftp library
      if (client_type === "sftp") {
        // make sure we are returning files and not directories
        if (file.type === "-") {
          const ws = Writable();
          ws._write = function(chunk, enc, next) {
            console.dir(chunk);
            next();
          };
          return conn.get(config.fileDownloadDir + file.name, ws, {
            encoding: "utf-8",
            highWaterMark: 65535,
            autoClose: true
          });
        }
      }
    })
  );
}

module.exports = retrieveFileStreams;
