# 🎨 The Agents Image Generator

Generador automático de imágenes con headlines dinámicos y Google Fonts perfectas para **The Agents by WTF Agency**.

## ✨ Features

- 🖼️ **Imagen base** (generada por AI o proporcionada)
- ✍️ **Headlines dinámicos** con Google Fonts nativas
- 🎨 **Múltiples pesos de fuente** en una sola línea
- 🏷️ **Logo overlay** PNG transparente
- 📋 **Estilos por brief** (tech, luxury, minimal, wtf-agency)
- 🚀 **Automatización completa** vía script/API

## 🚀 Quick Start

### 1. Instalación

```bash
npm install
```

### 2. Uso Básico

```bash
node image-generator-example.js ./imagen-base.jpg "MAS HUMANOS QUE LOS HUMANOS" wtf-agency ./logo.png ./resultado.png
```

### 3. Ejemplo Programático

```javascript
const TheAgentsImageGenerator = require('./image-generator-example');

const generator = new TheAgentsImageGenerator();
await generator.init();

await generator.generateImage({
    baseImagePath: './base-image.jpg',
    headline: 'MAS HUMANOS QUE LOS HUMANOS',
    brief: 'wtf-agency',
    logoPath: './wtf-logo-transparent.png',
    outputPath: './output.png'
});

await generator.close();
```

## 🎯 Briefs Disponibles

### **`wtf-agency`** (Recomendado)
- **Font:** Inter (100 + 700)
- **Style:** Moderno, impactante
- **Use case:** Campaña The Agents

### **`tech`**
- **Font:** Inter (200 + 600)  
- **Style:** Tecnológico, clean
- **Use case:** Productos tech, AI

### **`luxury`**
- **Font:** Playfair Display (400 + 700)
- **Style:** Premium, elegante
- **Use case:** Marcas luxury

### **`minimal`**
- **Font:** Inter (100 + 300)
- **Style:** Minimalista, sutil
- **Use case:** Diseño clean

## 📏 Configuración Avanzada

### Custom Styling

```javascript
await generator.generateImage({
    baseImagePath: './imagen.jpg',
    headline: 'TEXTO PERSONALIZADO',
    brief: 'tech',
    customStyle: {
        fontSize: 84,
        normalWeight: 800,
        lightWeight: 100,
        textColor: '#ff0000',
        textShadow: '3px 3px 6px rgba(0,0,0,0.9)'
    }
});
```

### Múltiples Variantes

```javascript
const variants = await generator.generateVariants({
    baseImagePath: './base.jpg',
    headline: 'CREATIVIDAD ARTIFICIAL'
}, [
    { brief: 'tech', outputPath: './tech-version.png' },
    { brief: 'luxury', outputPath: './luxury-version.png' },
    { brief: 'minimal', outputPath: './minimal-version.png' }
]);
```

## 🛠️ API Reference

### `generateImage(options)`

**Parámetros:**

| Parámetro | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `baseImagePath` | string | - | **Requerido.** Ruta a imagen base |
| `headline` | string | - | **Requerido.** Texto del headline |
| `brief` | string | `'wtf-agency'` | Estilo predefinido |
| `logoPath` | string | `null` | Ruta al logo PNG (opcional) |
| `outputPath` | string | `'./generated-image.png'` | Archivo de salida |
| `dimensions` | object | `{width: 1200, height: 800}` | Dimensiones de salida |
| `customStyle` | object | `{}` | Override de estilos |

**Retorna:**
```javascript
{
    buffer: Buffer,      // PNG buffer
    outputPath: string,  // Ruta del archivo guardado
    dimensions: object,  // Dimensiones finales
    style: string        // Brief usado
}
```

## 🎨 Mixed Font Weights

El sistema automáticamente aplica **pesos diferentes** dentro del mismo headline:

```
"MAS HUMANOS QUE LOS HUMANOS"
 ^^^         ^^^     ^^^
Bold       Light   Bold
```

### Palabras que van en Light Weight:
- QUE, LOS, DE, LA, EL, Y, EN, CON, POR, PARA

### Personalizar Parsing:

```javascript
// En el código fuente, modificar parseHeadline()
parseHeadline(text, briefStyle) {
    const lightWords = ['QUE', 'LOS', 'CUSTOM_WORD'];
    // ...resto del código
}
```

## 🔧 Troubleshooting

### Error: "Imagen base no encontrada"
- Verificar que el archivo existe
- Usar rutas absolutas o relativas correctas
- Formatos soportados: JPG, PNG, WebP

### Error: "Font no carga"
- Verificar conexión a internet (Google Fonts CDN)
- Puppeteer puede requerir `--no-sandbox` en algunos entornos

### Calidad de imagen
- Para máxima calidad, usar imágenes base de alta resolución
- El sistema mantiene aspect ratio automáticamente

## 📦 Dependencies

- **Puppeteer**: Renderizado HTML con Google Fonts
- **Handlebars**: Template engine
- **Sharp**: Post-processing de imagen (opcional)

## 🚀 Production Tips

1. **Caching**: Mantener instancia del browser activa
2. **Font Preload**: Precargar Google Fonts comunes
3. **Image Optimization**: Pipeline con Sharp para compresión
4. **Batch Processing**: Generar múltiples imágenes en lote

## 📈 Performance

- **Cold Start**: ~2-3 segundos (incluye launch browser)
- **Warm**: ~500ms-1s por imagen
- **Memory**: ~50-100MB por instancia
- **Concurrency**: Soporta múltiples workers

## 🎯 Use Cases WTF Agency

### Campañas Automatizadas
```javascript
// Generar variantes de campaña
const headlines = [
    'MAS HUMANOS QUE LOS HUMANOS',
    'CREATIVIDAD SIN LIMITES',
    'EL FUTURO ES ARTIFICIAL'
];

for (const headline of headlines) {
    await generator.generateImage({
        baseImagePath: `./campaign/${headline.slug}.jpg`,
        headline,
        brief: 'wtf-agency'
    });
}
```

### A/B Testing Visual
```javascript
// Diferentes estilos para mismo mensaje
await generator.generateVariants({
    baseImagePath: './product.jpg',
    headline: 'LANZAMIENTO GLOBAL'
}, [
    { brief: 'tech', outputPath: './version-tech.png' },
    { brief: 'luxury', outputPath: './version-premium.png' }
]);
```

## 🤝 Contributing

1. Fork el proyecto
2. Crear branch de feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Add: nueva funcionalidad'`)
4. Push al branch (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 License

MIT License - ver [LICENSE](LICENSE) para detalles.

---

**🗺️ Creado por The Agents para WTF Agency**

*Brief Destroyers. Sistema de creatividad amplificada por IA.*