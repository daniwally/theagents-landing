#!/usr/bin/env node

/**
 * 🎨 THE AGENTS IMAGE GENERATOR
 * Flujo automatizado: Imagen + Headline + Logo con Google Fonts
 */

const puppeteer = require('puppeteer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

class TheAgentsImageGenerator {
    constructor() {
        this.browser = null;
        this.template = null;
        
        // Configuración de estilos por brief
        this.briefStyles = {
            'luxury': {
                fontFamily: 'Playfair Display',
                fontUrl: 'family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400',
                fontSize: 84,
                normalWeight: 700,
                lightWeight: 400,
                textColor: '#ffffff',
                textShadow: '3px 3px 8px rgba(0,0,0,0.9)',
                letterSpacing: '-0.03em'
            },
            'tech': {
                fontFamily: 'Inter',
                fontUrl: 'family=Inter:wght@100;200;300;400;500;600;700;800;900',
                fontSize: 72,
                normalWeight: 600,
                lightWeight: 200,
                textColor: '#ffffff',
                textShadow: '2px 2px 6px rgba(0,0,0,0.8)',
                letterSpacing: '-0.02em'
            },
            'minimal': {
                fontFamily: 'Inter',
                fontUrl: 'family=Inter:wght@100;200;300;400;500;600;700;800;900',
                fontSize: 64,
                normalWeight: 300,
                lightWeight: 100,
                textColor: '#000000',
                textShadow: 'none',
                letterSpacing: '-0.01em'
            },
            'wtf-agency': {
                fontFamily: 'Inter',
                fontUrl: 'family=Inter:wght@100;200;300;400;500;600;700;800;900',
                fontSize: 72,
                normalWeight: 700,
                lightWeight: 100,
                textColor: '#ffffff',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                letterSpacing: '-0.02em'
            }
        };
    }
    
    async init() {
        console.log('🚀 Iniciando The Agents Image Generator...');
        
        this.browser = await puppeteer.launch({
            headless: 'new',
            args: [
                '--no-sandbox', 
                '--disable-setuid-sandbox',
                '--disable-web-security',
                '--disable-features=VizDisplayCompositor'
            ]
        });
        
        this.template = this.compileTemplate();
        console.log('✅ Browser y template listos');
    }
    
    compileTemplate() {
        const templateHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?{{FONT_URL}}&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            margin: 0;
            padding: 0;
            width: {{WIDTH}}px;
            height: {{HEIGHT}}px;
            background: url('file://{{BASE_IMAGE_PATH}}') center/cover no-repeat;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: relative;
            overflow: hidden;
        }
        
        .headline {
            font-family: '{{FONT_FAMILY}}', sans-serif;
            font-size: {{FONT_SIZE}}px;
            color: {{TEXT_COLOR}};
            text-shadow: {{TEXT_SHADOW}};
            padding: {{PADDING}};
            max-width: 65%;
            line-height: 1.1;
            letter-spacing: {{LETTER_SPACING}};
            font-feature-settings: "kern" 1, "liga" 1;
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
        }
        
        .normal-weight {
            font-weight: {{NORMAL_WEIGHT}};
        }
        
        .light-weight {
            font-weight: {{LIGHT_WEIGHT}};
        }
        
        .logo {
            position: absolute;
            bottom: {{LOGO_BOTTOM}}px;
            right: {{LOGO_RIGHT}}px;
            width: {{LOGO_WIDTH}}px;
            height: auto;
            opacity: {{LOGO_OPACITY}};
        }
    </style>
</head>
<body>
    <div class="headline">
        {{{HEADLINE_HTML}}}
    </div>
    {{#if SHOW_LOGO}}
    <img src="file://{{LOGO_PATH}}" class="logo" alt="Logo">
    {{/if}}
</body>
</html>`;
        
        return handlebars.compile(templateHtml);
    }
    
    parseHeadline(text, briefStyle) {
        // Palabras que van en peso ligero
        const lightWords = ['QUE', 'LOS', 'DE', 'LA', 'EL', 'Y', 'EN', 'CON', 'POR', 'PARA'];
        
        return text.split(' ').map(word => {
            const isLight = lightWords.includes(word.toUpperCase());
            const className = isLight ? 'light-weight' : 'normal-weight';
            return `<span class="${className}">${word}</span>`;
        }).join(' ');
    }
    
    async generateImage(options) {
        const {
            baseImagePath,
            headline,
            brief = 'wtf-agency',
            logoPath = null,
            outputPath = './generated-image.png',
            dimensions = { width: 1200, height: 800 },
            customStyle = {}
        } = options;
        
        console.log(`🎨 Generando imagen: "${headline}"`);
        console.log(`📋 Brief: ${brief}`);
        
        // Obtener estilo del brief
        const style = { ...this.briefStyles[brief], ...customStyle };
        
        if (!style) {
            throw new Error(`Brief '${brief}' no encontrado`);
        }
        
        // Verificar que la imagen base existe
        if (!fs.existsSync(baseImagePath)) {
            throw new Error(`Imagen base no encontrada: ${baseImagePath}`);
        }
        
        // Parse del headline con pesos mezclados
        const headlineHtml = this.parseHeadline(headline, style);
        
        // Preparar variables para template
        const templateVars = {
            BASE_IMAGE_PATH: path.resolve(baseImagePath),
            HEADLINE_HTML: headlineHtml,
            FONT_FAMILY: style.fontFamily,
            FONT_URL: style.fontUrl,
            FONT_SIZE: style.fontSize,
            NORMAL_WEIGHT: style.normalWeight,
            LIGHT_WEIGHT: style.lightWeight,
            TEXT_COLOR: style.textColor,
            TEXT_SHADOW: style.textShadow,
            LETTER_SPACING: style.letterSpacing,
            WIDTH: dimensions.width,
            HEIGHT: dimensions.height,
            PADDING: Math.round(dimensions.width * 0.05) + 'px', // 5% del ancho
            SHOW_LOGO: !!logoPath,
            LOGO_PATH: logoPath ? path.resolve(logoPath) : '',
            LOGO_WIDTH: Math.round(dimensions.width * 0.15), // 15% del ancho
            LOGO_BOTTOM: Math.round(dimensions.height * 0.05), // 5% del alto
            LOGO_RIGHT: Math.round(dimensions.width * 0.03), // 3% del ancho
            LOGO_OPACITY: 0.95
        };
        
        const html = this.template(templateVars);
        
        console.log('📄 HTML generado, renderizando...');
        
        const page = await this.browser.newPage();
        await page.setViewport(dimensions);
        
        // Cargar HTML y esperar fonts
        await page.setContent(html, { waitUntil: 'networkidle0' });
        
        // Esperar que las Google Fonts estén listas
        await page.evaluate(() => {
            return document.fonts.ready;
        });
        
        // Extra wait para asegurar render completo
        await page.waitForTimeout(1000);
        
        console.log('📸 Capturando screenshot...');
        
        const buffer = await page.screenshot({
            type: 'png',
            quality: 100,
            fullPage: false
        });
        
        await page.close();
        
        // Guardar archivo
        fs.writeFileSync(outputPath, buffer);
        
        console.log(`✅ Imagen generada: ${outputPath}`);
        console.log(`📏 Dimensiones: ${dimensions.width}x${dimensions.height}`);
        
        return {
            buffer,
            outputPath,
            dimensions,
            style: brief
        };
    }
    
    async close() {
        if (this.browser) {
            await this.browser.close();
            console.log('🔒 Browser cerrado');
        }
    }
    
    // Método para generar múltiples variantes
    async generateVariants(baseOptions, variants = []) {
        const results = [];
        
        for (const [index, variant] of variants.entries()) {
            const options = { ...baseOptions, ...variant };
            const outputPath = `./variant-${index + 1}-${variant.brief || 'default'}.png`;
            
            const result = await this.generateImage({ ...options, outputPath });
            results.push(result);
        }
        
        return results;
    }
}

// Función de ejemplo
async function example() {
    const generator = new TheAgentsImageGenerator();
    
    try {
        await generator.init();
        
        // Ejemplo 1: Estilo WTF Agency (como la imagen que enviaste)
        await generator.generateImage({
            baseImagePath: './test-base-image.jpg', // Reemplazar con imagen real
            headline: 'MAS HUMANOS QUE LOS HUMANOS',
            brief: 'wtf-agency',
            logoPath: './wtf-logo-transparent.png', // Opcional
            outputPath: './wtf-agency-example.png'
        });
        
        // Ejemplo 2: Múltiples variantes
        const variants = await generator.generateVariants({
            baseImagePath: './test-base-image.jpg',
            headline: 'CREATIVIDAD ARTIFICIAL'
        }, [
            { brief: 'tech', outputPath: './tech-variant.png' },
            { brief: 'luxury', outputPath: './luxury-variant.png' },
            { brief: 'minimal', outputPath: './minimal-variant.png' }
        ]);
        
        console.log(`✨ ${variants.length} variantes generadas`);
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await generator.close();
    }
}

// CLI Interface
if (require.main === module) {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.log(`
🎨 THE AGENTS IMAGE GENERATOR

Uso:
  node image-generator-example.js [imagen] [headline] [brief] [logo] [output]

Parámetros:
  imagen   - Ruta a la imagen base
  headline - Texto del headline  
  brief    - Estilo: tech|luxury|minimal|wtf-agency
  logo     - Ruta al logo PNG (opcional)
  output   - Archivo de salida (opcional)

Ejemplo:
  node image-generator-example.js ./base.jpg "MAS HUMANOS QUE LOS HUMANOS" wtf-agency ./logo.png ./result.png
        `);
        process.exit(0);
    }
    
    if (args[0] === '--example') {
        example();
    } else {
        // CLI usage
        const [imagePath, headline, brief = 'wtf-agency', logoPath, outputPath] = args;
        
        if (!imagePath || !headline) {
            console.error('❌ Imagen y headline son requeridos');
            process.exit(1);
        }
        
        (async () => {
            const generator = new TheAgentsImageGenerator();
            
            try {
                await generator.init();
                
                await generator.generateImage({
                    baseImagePath: imagePath,
                    headline,
                    brief,
                    logoPath: logoPath || null,
                    outputPath: outputPath || './output.png'
                });
                
            } catch (error) {
                console.error('❌ Error:', error.message);
                process.exit(1);
            } finally {
                await generator.close();
            }
        })();
    }
}

module.exports = TheAgentsImageGenerator;