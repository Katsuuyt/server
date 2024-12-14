const multer = require('multer');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({
    storage: multer.diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        },
    }),
});

// Endpoint untuk upload
app.post('/api/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    const shortLink = `server.katsuazaa.web.id/${file.originalname}`; // Ganti dengan domainmu
    const longLink = `server.katsuazaa.web.id/uploads/${file.originalname}`; // Ganti dengan domainmu

    const uploadsDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir);
    }

    res.status(200).json({
        shortLink: shortLink,
        longLink: longLink,
        size: file.size,
    });
});

// Mulai server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
