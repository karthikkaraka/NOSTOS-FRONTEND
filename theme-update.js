import fs from 'fs';
import path from 'path';

const files = [
    'src/index.css',
    'src/pages/home/Home.css',
    'src/pages/login/Login.css',
    'src/pages/registration/registration.css',
    'src/pages/PostItem/PostItem.css',
    'src/pages/itemDetail/itemDetail.css',
    'src/pages/selfclaims/selfClaims.css',
    'src/components/navigate/Nav.css',
    'src/components/item/Item.css',
    'src/components/claim/Claim.css',
    'src/components/myclaim/MyClaim.css',
    'src/components/profile/Profile.css',
    'src/components/pagination/Pagination.css',
    'src/components/otpVerify/OtpVerify.css'
];

const basePath = 'c:/ALL/ALLProjects/nostosFrontend';

const replacements = [
    [/Matcha & Clay Theme/g, 'Sunset Tropics Theme'],
    [/#8A9A74/gi, '#FF6B57'], // Matcha -> Papaya
    [/#606C50/gi, '#E55543'], // Dark Matcha -> Dark Papaya
    [/#C06C59/gi, '#FFB03A'], // Clay -> Mango
    [/#3E322A/gi, '#3B203E'], // Espresso -> Deep Plum (covers both Text Dark and Accent Violet, keeping it readable)
    [/#B89C82/gi, '#00C9B1'], // Sand -> Tropical Aqua
    [/#9C4B3D/gi, '#E24A68'], // Rust -> Hot Pink
    [/#4A3C32/gi, '#4F3054'], // Text Body -> Plum
    [/#7A7D71/gi, '#87728B'], // Text Muted -> Muted Plum
    [/#9EA295/gi, '#B7A5BC'], // Text Dim -> Dim Plum
    [/#E6E1D6/gi, '#FFEAD4'], // Page BG -> Pale Peach
    [/#F2EFE9/gi, '#FFFFFF'], // Card BG -> White
    [/#DCD7CA/gi, '#FFEDEB'], // Soft BG -> Soft Blush
    [/#E8E4D9/gi, '#FFE1DE'], // Hover BG -> Blush Hover
    
    // Fix rgba
    [/rgba\(\s*138\s*,\s*154\s*,\s*116\s*/g, 'rgba(255, 107, 87'], // Papaya rgba
    [/rgba\(\s*192\s*,\s*108\s*,\s*89\s*/g, 'rgba(255, 176, 58'], // Mango rgba
    [/rgba\(\s*62\s*,\s*50\s*,\s*42\s*/g, 'rgba(59, 32, 62']    // Deep Plum rgba
];

let updatedCount = 0;

for (const file of files) {
    const fullPath = path.join(basePath, file);
    if (fs.existsSync(fullPath)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        let originalContent = content;
        
        for (const [regex, replacement] of replacements) {
            content = content.replace(regex, replacement);
        }
        
        if (content !== originalContent) {
            fs.writeFileSync(fullPath, content, 'utf8');
            console.log(`Updated ${file}`);
            updatedCount++;
        } else {
            console.log(`No changes needed in ${file}`);
        }
    } else {
        console.log(`File not found: ${file}`);
    }
}

console.log(`Successfully updated ${updatedCount} files to Sunset Tropics.`);
