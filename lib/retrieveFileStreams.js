function retrieveFileStreams(conn, config, fileStreamArray, client_type) {
  return Promise.all(
    fileStreamArray.map(file => {
      // make sure we are using sftp library
      if (client_type === "sftp") {
        // make sure we are returning files and not directories
        if (file.type === "-") {
          fileName = (config.fileDownloadDir + file.name).toString();
          return conn.fastGet(fileName);
        }
      }
    })
  );
}

module.exports = retrieveFileStreams;
