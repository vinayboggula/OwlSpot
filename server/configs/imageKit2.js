import ImageKit from '@imagekit/nodejs';
import 'dotenv/config';

const imagekit2 = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY2,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY2,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT2
});

export default imagekit2;