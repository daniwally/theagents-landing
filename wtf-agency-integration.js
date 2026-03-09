#!/usr/bin/env node

/**
 * 🎨 WTF AGENCY INTEGRATION
 * Pipeline completo: AI Image Generation + Headline + Logo
 * Integra nano-banana-pro + The Agents Image Generator
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const TheAgentsImageGenerator = require('./image-generator-example');

class WTFAgencyPipeline {
    constructor() {
        this.imageGenerator = new TheAgentsImageGenerator();
        this.tempDir = './temp';
        
        // Ensure temp directory exists
        if (!fs.existsSync(this.tempDir)) {
            fs.mkdirSync(this.tempDir, { recursive: true });
        }
    }
    
    async init() {
        console.log('🚀 Iniciando WTF Agency Pipeline...');
        await this.imageGenerator.init();
    }
    
    /**
     * Pipeline completo: Brief → AI Image → Headline → Logo → Output
     */
    async createCampaignImage(options) {
        const {
            brief,
            headline,
            imagePrompt,
            logoPath = './wtf-logo-transparent.png',
            outputDir = './output',
            campaignName = 'campaign',
            variations = ['wtf-agency'] // Briefs a generar
        } = options;
        
        console.log(`📋 Brief: ${brief}`);
        console.log(`🎯 Headline: "${headline}"`);
        console.log(`🖼️ Image prompt: "${imagePrompt}"`);
        
        try {
            // Step 1: Generar imagen base con AI
            console.log('\n🎨 STEP 1: Generando imagen base con AI...');
            const baseImagePath = await this.generateBaseImage(imagePrompt, campaignName);
            
            // Step 2: Aplicar headline + logo
            console.log('\n✍️ STEP 2: Aplicando headline y logo...');
            const results = await this.applyHeadlineAndLogo({
                baseImagePath,
                headline,
                logoPath,
                variations,
                outputDir,
                campaignName
            });
            
            // Step 3: Cleanup
            console.log('\n🧹 STEP 3: Limpiando archivos temporales...');
            if (fs.existsSync(baseImagePath)) {
                fs.unlinkSync(baseImagePath);
            }
            
            console.log('\n✅ Pipeline completado exitosamente!');
            console.log(`📁 Archivos generados en: ${outputDir}`);
            
            return results;
            
        } catch (error) {
            console.error('❌ Error en pipeline:', error.message);
            throw error;
        }
    }
    
    /**
     * Generar imagen base usando nano-banana-pro
     */
    async generateBaseImage(prompt, campaignName) {
        const filename = `${campaignName}-base-${Date.now()}.png`;
        const outputPath = path.join(this.tempDir, filename);
        
        console.log('🔄 Ejecutando nano-banana-pro...');
        
        return new Promise((resolve, reject) => {
            // Comando nano-banana-pro (ajustar según tu configuración)
            const command = `nano-banana-pro "${prompt}" --output "${outputPath}" --size 1200x800`;
            
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error('❌ Error en nano-banana-pro:', error.message);
                    reject(error);
                    return;
                }
                
                if (!fs.existsSync(outputPath)) {
                    reject(new Error('nano-banana-pro no generó el archivo'));
                    return;
                }
                
                console.log('✅ Imagen base generada:', outputPath);
                resolve(outputPath);
            });
        });
    }
    
    /**
     * Aplicar headline y logo a imagen base
     */
    async applyHeadlineAndLogo(options) {
        const {
            baseImagePath,
            headline,
            logoPath,
            variations,
            outputDir,
            campaignName
        } = options;
        
        // Ensure output directory exists
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        
        const results = [];
        
        for (const brief of variations) {
            const outputFilename = `${campaignName}-${brief}-${Date.now()}.png`;
            const outputPath = path.join(outputDir, outputFilename);
            
            console.log(`📝 Generando variante: ${brief}`);
            
            const result = await this.imageGenerator.generateImage({
                baseImagePath,
                headline,
                brief,
                logoPath: fs.existsSync(logoPath) ? logoPath : null,
                outputPath,
                dimensions: { width: 1200, height: 800 }
            });
            
            results.push({
                brief,
                path: outputPath,
                filename: outputFilename,
                ...result
            });
        }
        
        return results;
    }
    
    /**
     * Batch processing para múltiples campañas
     */
    async createCampaignBatch(campaigns) {
        const allResults = [];
        
        for (const [index, campaign] of campaigns.entries()) {
            console.log(`\n📦 PROCESANDO CAMPAÑA ${index + 1}/${campaigns.length}`);
            console.log('=' .repeat(50));
            
            try {
                const results = await this.createCampaignImage(campaign);
                allResults.push({
                    campaign: campaign.campaignName,
                    success: true,
                    results
                });
            } catch (error) {
                console.error(`❌ Error en campaña ${campaign.campaignName}:`, error.message);
                allResults.push({
                    campaign: campaign.campaignName,
                    success: false,
                    error: error.message
                });
            }
        }
        
        return allResults;
    }
    
    /**
     * Generar reporte de campaña
     */
    generateReport(results) {
        const report = {
            timestamp: new Date().toISOString(),
            total: results.length,
            successful: results.filter(r => r.success).length,
            failed: results.filter(r => !r.success).length,
            files: []
        };
        
        results.forEach(result => {
            if (result.success) {
                result.results.forEach(file => {
                    report.files.push({
                        campaign: result.campaign,
                        brief: file.brief,
                        path: file.path,
                        dimensions: file.dimensions
                    });
                });
            }
        });
        
        return report;
    }
    
    async close() {
        await this.imageGenerator.close();
        console.log('🔒 Pipeline cerrado');
    }
}

// Ejemplos de uso
const campaignExamples = [
    {
        brief: 'Lanzamiento The Agents',
        headline: 'MAS HUMANOS QUE LOS HUMANOS',
        imagePrompt: 'cinematic portrait of an AI android face, hyper-realistic, futuristic, glowing eyes, metallic skin, dark dramatic lighting',
        campaignName: 'the-agents-launch',
        variations: ['wtf-agency', 'tech'],
        outputDir: './campaigns/the-agents'
    },
    {
        brief: 'Campaña Creatividad',
        headline: 'CREATIVIDAD SIN LIMITES',
        imagePrompt: 'abstract creative explosion, colorful paint splash, artistic chaos, modern art style, high contrast',
        campaignName: 'creatividad-infinita',
        variations: ['luxury', 'wtf-agency'],
        outputDir: './campaigns/creatividad'
    },
    {
        brief: 'Producto AI',
        headline: 'EL FUTURO ES ARTIFICIAL',
        imagePrompt: 'futuristic AI interface, holographic displays, blue and purple neon lights, cyberpunk aesthetics',
        campaignName: 'futuro-ai',
        variations: ['tech', 'minimal'],
        outputDir: './campaigns/futuro-ai'
    }
];

// CLI Interface
if (require.main === module) {
    const args = process.argv.slice(2);
    
    if (args.length === 0 || args[0] === '--help') {
        console.log(`
🎨 WTF AGENCY PIPELINE

Uso:
  node wtf-agency-integration.js [comando] [parámetros]

Comandos:
  single     Campaña individual
  batch      Procesar lote de campañas
  example    Ejecutar ejemplos predefinidos

Single:
  node wtf-agency-integration.js single "HEADLINE" "image prompt" campaign-name

Ejemplo:
  node wtf-agency-integration.js single "MAS HUMANOS QUE LOS HUMANOS" "futuristic AI portrait" the-agents
        `);
        process.exit(0);
    }
    
    const command = args[0];
    
    (async () => {
        const pipeline = new WTFAgencyPipeline();
        
        try {
            await pipeline.init();
            
            switch (command) {
                case 'single':
                    const [, headline, imagePrompt, campaignName] = args;
                    if (!headline || !imagePrompt || !campaignName) {
                        console.error('❌ Parámetros faltantes para single');
                        process.exit(1);
                    }
                    
                    await pipeline.createCampaignImage({
                        brief: 'Campaña custom',
                        headline,
                        imagePrompt,
                        campaignName,
                        variations: ['wtf-agency', 'tech']
                    });
                    break;
                    
                case 'batch':
                    console.log('📦 Procesando lote de campañas...');
                    const batchResults = await pipeline.createCampaignBatch(campaignExamples);
                    const report = pipeline.generateReport(batchResults);
                    
                    console.log('\n📊 REPORTE FINAL:');
                    console.log(`Total: ${report.total} campañas`);
                    console.log(`Exitosas: ${report.successful}`);
                    console.log(`Fallidas: ${report.failed}`);
                    console.log(`Archivos generados: ${report.files.length}`);
                    
                    // Guardar reporte
                    fs.writeFileSync('./campaign-report.json', JSON.stringify(report, null, 2));
                    break;
                    
                case 'example':
                    console.log('🎬 Ejecutando ejemplo individual...');
                    await pipeline.createCampaignImage(campaignExamples[0]);
                    break;
                    
                default:
                    console.error(`❌ Comando desconocido: ${command}`);
                    process.exit(1);
            }
            
        } catch (error) {
            console.error('❌ Error:', error.message);
            process.exit(1);
        } finally {
            await pipeline.close();
        }
    })();
}

module.exports = WTFAgencyPipeline;