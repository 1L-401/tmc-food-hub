import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = [
    'MenuPage.jsx',
    'RestaurantMenuPage.jsx',
    'ProfilePage.jsx',
    'CheckoutPage.jsx',
    'CartPage.jsx',
    'MyOrdersPage.jsx'
];

const basePath = path.join(__dirname, 'src', 'pages', 'customer');

files.forEach(f => {
    let p = path.join(basePath, f);
    if (fs.existsSync(p)) {
        let c = fs.readFileSync(p, 'utf8');
        // Remove all data-aos tags
        c = c.replace(/ data-aos="[^"]*"/g, '');
        c = c.replace(/ data-aos-delay="[^"]*"/g, '');
        c = c.replace(/ data-aos-duration="[^"]*"/g, '');
        c = c.replace(/ data-aos-once="[^"]*"/g, '');
        fs.writeFileSync(p, c, 'utf8');
        console.log('Fixed ' + f);
    } else {
        console.log('Not found: ' + f);
    }
});
