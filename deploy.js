const AutoUpload = require('@minjs/cdn-node-ssh')
const config = require('./.deploy.config')

const upload = new AutoUpload(config)

upload.start()