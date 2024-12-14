import multer from 'multer';
import nextConnect from 'next-connect';
import fs from 'fs';
import path from 'path';

const upload = multer({
    storage: multer.diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        },
    }),
});

const apiRoute = nextConnect({
    onError(err, req, res) {
        res.status(501).json({ error: `Sorry something Happened! ${err.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    },
});

apiRoute.use(upload.single('file')).post((req, res) => {
    const file = req.file;
    const shortLink = `https://yourdomain.com/${file.originalname}`; // Ganti dengan domainmu
    const longLink = `https://yourdomain.com/uploads/${file.originalname}`; // Ganti dengan domainmu

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

export default apiRoute;