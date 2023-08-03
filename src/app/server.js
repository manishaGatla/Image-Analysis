const express = require('express');
const multer = require('multer'); // A middleware for handling multipart/form-data, which includes file uploads.
const { BlobServiceClient } = require('@azure/storage-blob');
const cors = require('cors');


const { ShareServiceClient, ShareDirectoryClient } = require('@azure/storage-file-share');

const app = express();
const port = 3200;
app.use(cors());

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Azure Blob Storage configuration
const connectionString = 'DefaultEndpointsProtocol=https;AccountName=ucmcloudproject;AccountKey=AmelEK+7/VuiBH9C8hntRJZ/Yfj3P9tgC3A+zggO5cx0oSj7HpWrD5aJJG0t5enKQN3xjwyGKuLc+AStDEHJrQ==;EndpointSuffix=core.windows.net';
const containerName = 'project';

const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient(containerName);

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }

    const blobName = file.originalname;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.upload(file.buffer, file.buffer.length);

    return res.status(200).send('File uploaded successfully.');
  } catch (error) {
    return res.status(500).send('An error occurred while uploading the file.');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

//

const fileShareName = 'cloudprojectresult';
const imageFilePath = 'ImageAnalysis_Result.txt';
const textFilePath = 'normaltext_Result.txt';

app.get('/getData', async (req,res ) =>{
  let type = req.query.type;
    const shareServiceClient = ShareServiceClient.fromConnectionString(connectionString);   
  const shareClient = shareServiceClient.getShareClient(fileShareName);
  const directoryClient = shareClient.getDirectoryClient(''); // Use an empty string to point to the root of the file share
  const fileClient = type == 'text/plain' ?  directoryClient.getFileClient(textFilePath) : directoryClient.getFileClient(imageFilePath);


  try {
    const downloadResponse = await fileClient.download();
    console.log('entered download');
    const fileContents = await streamToString(downloadResponse.readableStreamBody);
    console.log('File content:', fileContents);
    return res.json(fileContents);
  } catch (error) {
    console.error('Error reading file:', error.message);
  
}
});


// Helper function to convert stream to string
async function streamToString(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on('data', (data) => {
      chunks.push(data.toString());
    });
    readableStream.on('end', () => {
      resolve(chunks.join(''));
    });
    readableStream.on('error', reject);
  });
}

