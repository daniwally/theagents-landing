# 🎨 FLUJO AUTOMATIZADO: IMAGEN + HEADLINE + LOGO

## 🎯 OBJETIVO
Crear un pipeline que genere imágenes de alta calidad con:
1. **Imagen base** (generada o proporcionada)
2. **Headline dinámico** con Google Fonts perfectas (múltiples pesos/estilos)
3. **Logo PNG transparente** overlay
4. **Automatización completa** via API/script

---

## 📋 OPCIONES EVALUADAS

### **OPCIÓN A: Puppeteer + HTML/CSS** ⭐ RECOMENDADA
**Pros:** Google Fonts nativas, CSS perfecto, flexibilidad total
**Contras:** Overhead de navegador headless

### **OPCIÓN B: Sharp + SVG**
**Pros:** Rápido, lightweight, server-friendly
**Contras:** Fonts TTF descargadas, menos flexibilidad CSS

### **OPCIÓN C: Node Canvas**
**Pros:** Control total, rápido
**Contras:** Fonts TTF requeridas, menos features tipográficas

---

## 🚀 FLUJO PROPUESTO: HÍBRIDO PUPPETEER + SHARP

### **PIPELINE COMPLETO:**

```bash
INPUT → IMAGEN BASE → PUPPETEER RENDER → SHARP COMPOSITE → OUTPUT
```

### **PASO 1: Generación Imagen Base**
```javascript
// Opción 1: AI Image Generation (nano-banana-pro, OpenAI)
const baseImage = await generateAIImage(prompt);

// Opción 2: Imagen proporcionada
const baseImage = inputImagePath;
```

### **PASO 2: HTML Template Engine**
```html
<!DOCTYPE html>
<html>
<head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;700;900&display=swap" rel="stylesheet">
    <style>
        body {
            margin: 0;
            padding: 0;
            width: 1200px;
            height: 800px;
            background: url('{{BASE_IMAGE}}') center/cover;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: relative;
        }
        
        .headline {
            font-family: 'Inter', sans-serif;
            font-size: {{FONT_SIZE}}px;
            font-weight: {{FONT_WEIGHT}};
            color: {{TEXT_COLOR}};
            text-shadow: {{TEXT_SHADOW}};
            padding: {{PADDING}};
            max-width: 60%;
            line-height: 1.2;
            letter-spacing: {{LETTER_SPACING}};
        }
        
        .highlight {
            font-weight: 100;
            font-size: {{HIGHLIGHT_SIZE}}px;
        }
        
        .logo {
            position: absolute;
            bottom: 40px;
            right: 40px;
            width: {{LOGO_WIDTH}}px;
            height: auto;
        }
    </style>
</head>
<body>
    <div class="headline">
        {{HEADLINE_HTML}}
    </div>
    <img src="{{LOGO_PATH}}" class="logo" alt="Logo">
</body>
</html>
```

### **PASO 3: Puppeteer Render Engine**
```javascript
const puppeteer = require('puppeteer');
const handlebars = require('handlebars');

class ImageGenerator {
    constructor() {
        this.browser = null;
        this.templateCache = new Map();
    }
    
    async init() {
        this.browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
    }
    
    async generateImage({ 
        baseImage, 
        headline, 
        fontFamily = 'Inter',
        fontSize = 72,
        fontWeight = 700,
        highlightWeight = 100,
        textColor = '#ffffff',
        textShadow = '2px 2px 4px rgba(0,0,0,0.8)',
        logoPath = 'wtf-logo-transparent.png',
        logoWidth = 200,
        dimensions = { width: 1200, height: 800 }
    }) {
        
        const template = await this.getTemplate();
        
        // Parse headline for mixed weights
        const headlineHtml = this.parseHeadline(headline, fontWeight, highlightWeight);
        
        const html = template({
            BASE_IMAGE: baseImage,
            HEADLINE_HTML: headlineHtml,
            FONT_SIZE: fontSize,
            FONT_WEIGHT: fontWeight,
            HIGHLIGHT_SIZE: fontSize * 1.1,
            TEXT_COLOR: textColor,
            TEXT_SHADOW: textShadow,
            LOGO_PATH: logoPath,
            LOGO_WIDTH: logoWidth,
            PADDING: '60px',
            LETTER_SPACING: '-0.02em'
        });
        
        const page = await this.browser.newPage();
        await page.setViewport(dimensions);
        
        // Load Google Fonts
        await page.goto(`data:text/html,${encodeURIComponent(html)}`, {
            waitUntil: 'networkidle0'
        });
        
        // Wait for fonts to load
        await page.evaluate(() => {
            return document.fonts.ready;
        });
        
        const buffer = await page.screenshot({
            type: 'png',
            quality: 100
        });
        
        await page.close();
        return buffer;
    }
    
    parseHeadline(text, normalWeight, lightWeight) {
        // Detectar palabras que deben ir en light weight
        const lightWords = ['QUE', 'LOS', 'Y', 'DE', 'LA', 'EL'];
        
        return text.split(' ').map(word => {
            const isLight = lightWords.includes(word.toUpperCase());
            const weight = isLight ? lightWeight : normalWeight;
            return `<span style="font-weight: ${weight}">${word}</span>`;
        }).join(' ');
    }
    
    async close() {
        if (this.browser) {
            await this.browser.close();
        }
    }
}
```

### **PASO 4: Post-processing con Sharp (opcional)**
```javascript
const sharp = require('sharp');

async function postProcess(imageBuffer, adjustments = {}) {
    return await sharp(imageBuffer)
        .modulate({
            brightness: adjustments.brightness || 1.0,
            saturation: adjustments.saturation || 1.0
        })
        .sharpen()
        .png({ quality: 95 })
        .toBuffer();
}
```

---

## 🎛️ CONFIGURACIONES DINÁMICAS

### **Font Variants Support:**
```javascript
const fontConfig = {
    'Inter': {
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        googleUrl: 'family=Inter:wght@100;200;300;400;500;600;700;800;900'
    },
    'Playfair Display': {
        weights: [400, 500, 600, 700, 800, 900],
        googleUrl: 'family=Playfair+Display:wght@400;500;600;700;800;900'
    }
    // ... más fonts
};
```

### **Brief-based Generation:**
```javascript
const briefToStyle = {
    'luxury': {
        fontFamily: 'Playfair Display',
        fontSize: 84,
        fontWeight: 700,
        textColor: '#ffffff',
        textShadow: '3px 3px 6px rgba(0,0,0,0.9)'
    },
    'tech': {
        fontFamily: 'Inter',
        fontSize: 72,
        fontWeight: 600,
        textColor: '#ffffff',
        textShadow: '1px 1px 3px rgba(0,0,0,0.7)'
    },
    'minimal': {
        fontFamily: 'Inter',
        fontSize: 64,
        fontWeight: 300,
        textColor: '#000000',
        textShadow: 'none'
    }
};
```

---

## 📦 IMPLEMENTACIÓN PRÁCTICA

### **NPM Dependencies:**
```bash
npm install puppeteer sharp handlebars google-font-installer
```

### **Usage Example:**
```javascript
const generator = new ImageGenerator();
await generator.init();

const result = await generator.generateImage({
    baseImage: './base-image.jpg',
    headline: 'MAS HUMANOS QUE LOS HUMANOS',
    fontFamily: 'Inter',
    fontSize: 72,
    logoPath: './wtf-logo-transparent.png'
});

fs.writeFileSync('./output.png', result);
```

---

## ⚡ OPTIMIZACIONES

1. **Font Caching:** Descargar TTFs una vez, reutilizar
2. **Template Caching:** Compilar Handlebars templates una vez
3. **Browser Pool:** Reutilizar instancias Puppeteer
4. **Image Optimization:** Sharp pipeline automático
5. **CDN Integration:** Subir a S3/Cloudinary post-generación

---

## 🎯 VENTAJAS DE ESTE APPROACH

✅ **Google Fonts nativas:** Renderizado perfecto, todos los pesos  
✅ **CSS completo:** Flexbox, gradients, shadows, transforms  
✅ **Mixed font weights:** En una sola línea  
✅ **Logo overlay:** PNG transparente automático  
✅ **Responsive:** Diferentes tamaños/formatos  
✅ **Brief-driven:** Estilos automáticos según contexto  

Este flujo te da la calidad de diseño manual con la velocidad de automatización. Perfect para The Agents system. 🗺️