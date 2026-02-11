# 🚀 Guía de Despliegue y Verificación SEO - HOUKMI EXPORT

## 📋 Pre-Despliegue: Checklist

### ✅ Verificaciones Locales

1. **Compilar el proyecto**
   ```bash
   npm run build
   ```
   - Verificar que no hay errores de compilación
   - Confirmar que todas las páginas se generan correctamente

2. **Probar localmente**
   ```bash
   npm run dev
   ```
   - Navegar a `http://localhost:3000`
   - Verificar todas las páginas de idiomas
   - Verificar todas las páginas de productos
   - Comprobar que los metadatos se cargan correctamente

3. **Verificar archivos críticos**
   - ✅ `/public/sitemap.xml` existe
   - ✅ `/public/robots.txt` existe
   - ✅ Schema markup se renderiza en el HTML

---

## 🌐 Despliegue

### Opción 1: Vercel (Recomendado para Next.js)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel --prod
```

### Opción 2: Netlify

```bash
# Build command
npm run build

# Publish directory
.next
```

### Opción 3: Servidor propio

```bash
# Build
npm run build

# Start
npm start
```

---

## 🔍 Post-Despliegue: Verificaciones Críticas

### 1. **Verificar Sitemap.xml**
- URL: `https://houkmiexport.com/sitemap.xml`
- ✅ Debe cargar correctamente
- ✅ Debe mostrar 37 URLs
- ✅ Debe incluir hreflang tags

### 2. **Verificar Robots.txt**
- URL: `https://houkmiexport.com/robots.txt`
- ✅ Debe cargar correctamente
- ✅ Debe referenciar el sitemap

### 3. **Verificar Metadatos en Páginas**

Abrir cada página y verificar en el código fuente (`Ctrl+U`):

**Home (Inglés):** `https://houkmiexport.com/en`
```html
<title>Fresh Fruit & Vegetable Exporter from Morocco | HOUKMI EXPORT - 35+ Years Experience</title>
<meta name="description" content="Leading Moroccan fruit and vegetable exporter...">
<link rel="alternate" hreflang="en" href="https://houkmiexport.com/en"/>
<link rel="alternate" hreflang="fr" href="https://houkmiexport.com/fr"/>
<!-- etc -->
```

**Producto (Tomates en Francés):** `https://houkmiexport.com/fr/products/tomatoes`
```html
<title>Exportateur de Tomates Maroc | Fournisseur Grossiste Tomates Fraîches - HOUKMI EXPORT</title>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Tomates Fraîches"
  ...
}
</script>
```

### 4. **Verificar Schema Markup**

**Herramienta:** [Google Rich Results Test](https://search.google.com/test/rich-results)

Probar estas URLs:
- `https://houkmiexport.com/en`
- `https://houkmiexport.com/en/products/tomatoes`
- `https://houkmiexport.com/fr/products/oranges`

✅ Debe detectar:
- Organization Schema
- Product Schema
- BreadcrumbList Schema

### 5. **Verificar Hreflang**

**Herramienta:** [Hreflang Tags Testing Tool](https://www.aleydasolis.com/english/international-seo-tools/hreflang-tags-generator/)

Probar:
- `https://houkmiexport.com/en`
- `https://houkmiexport.com/fr/products/tomatoes`

✅ Debe mostrar 6 alternates correctos

---

## 📊 Envío a Motores de Búsqueda

### 1. **Google Search Console**

1. Ir a: https://search.google.com/search-console
2. Agregar propiedad: `houkmiexport.com`
3. Verificar dominio (DNS o archivo HTML)
4. **Enviar Sitemap:**
   - Ir a: Sitemaps → Agregar nuevo sitemap
   - URL: `https://houkmiexport.com/sitemap.xml`
   - Clic en "Enviar"

5. **Verificar Cobertura:**
   - Esperar 24-48 horas
   - Ir a: Cobertura
   - Verificar que las 37 URLs están indexadas

6. **Verificar Hreflang:**
   - Ir a: Internacional → Idioma
   - Verificar que detecta los 6 idiomas

### 2. **Yandex Webmaster** (IMPORTANTE para Rusia 🇷🇺)

1. Ir a: https://webmaster.yandex.com
2. Agregar sitio: `houkmiexport.com`
3. Verificar dominio
4. **Enviar Sitemap:**
   - Ir a: Indexación → Sitemap
   - URL: `https://houkmiexport.com/sitemap.xml`
   - Clic en "Agregar"

5. **Configurar región:**
   - Ir a: Configuración → Región
   - Seleccionar: "Internacional"

### 3. **Bing Webmaster Tools**

1. Ir a: https://www.bing.com/webmasters
2. Agregar sitio: `houkmiexport.com`
3. Verificar dominio
4. **Enviar Sitemap:**
   - Ir a: Sitemaps → Enviar sitemap
   - URL: `https://houkmiexport.com/sitemap.xml`

---

## 📈 Monitoreo Post-Lanzamiento

### Semana 1-2: Indexación

**Google Search Console:**
- Verificar que las páginas se están indexando
- Revisar errores de rastreo
- Verificar que hreflang funciona correctamente

**Comando de verificación rápida:**
```
site:houkmiexport.com
```
En Google, debería mostrar las páginas indexadas.

### Semana 3-4: Posicionamiento

**Verificar rankings para keywords principales:**

**Inglés:**
- "fresh fruit exporter Morocco"
- "vegetable exporter Morocco"
- "tomato exporter Morocco"

**Francés:**
- "exportateur fruits Maroc"
- "fournisseur fruits frais Maroc"

**Alemán:**
- "Obstexporteur Marokko"
- "Gemüseexporteur Marokko"

**Ruso:**
- "экспортер фруктов Марокко"
- "поставщик овощей Марокко"

**Herramientas recomendadas:**
- Google Search Console (Performance)
- Ahrefs
- SEMrush
- Yandex Metrica (para Rusia)

### Mes 1-3: Optimización Continua

1. **Analizar qué keywords están funcionando**
2. **Identificar páginas con bajo rendimiento**
3. **Crear contenido adicional basado en datos**
4. **Construir backlinks B2B:**
   - Directorios de exportadores
   - Cámaras de comercio
   - Asociaciones agrícolas
   - Portales B2B (Alibaba, TradeKey, etc.)

---

## 🎯 KPIs a Monitorear

### Métricas SEO
- ✅ Páginas indexadas (objetivo: 37/37)
- ✅ Impresiones en búsqueda
- ✅ Clics desde búsqueda
- ✅ CTR promedio
- ✅ Posición promedio por keyword

### Métricas de Negocio
- ✅ Formularios de contacto enviados
- ✅ Clics en WhatsApp
- ✅ Tiempo en página de productos
- ✅ Tasa de rebote por idioma

---

## 🔧 Solución de Problemas Comunes

### Problema: Sitemap no se carga
**Solución:**
- Verificar que el archivo está en `/public/sitemap.xml`
- Verificar permisos del archivo
- Limpiar caché del navegador

### Problema: Hreflang no detectado
**Solución:**
- Verificar que las URLs son absolutas (con https://)
- Verificar que todos los idiomas tienen alternates recíprocos
- Usar la herramienta de validación de Google

### Problema: Schema markup no válido
**Solución:**
- Usar Google Rich Results Test
- Verificar que el JSON-LD es válido
- Revisar consola del navegador por errores

### Problema: Páginas no se indexan
**Solución:**
- Verificar robots.txt no está bloqueando
- Verificar que las páginas tienen contenido único
- Solicitar indexación manual en Google Search Console

---

## 📞 Soporte Adicional

Si necesitas ayuda adicional:
1. Revisar documentación de Next.js: https://nextjs.org/docs
2. Guía de SEO internacional de Google: https://developers.google.com/search/docs/advanced/crawling/international
3. Yandex SEO Guide: https://yandex.com/support/webmaster/

---

## ✅ Checklist Final

- [ ] Sitio desplegado en producción
- [ ] Sitemap.xml accesible
- [ ] Robots.txt accesible
- [ ] Metadatos verificados en todas las páginas
- [ ] Schema markup validado
- [ ] Hreflang verificado
- [ ] Sitemap enviado a Google Search Console
- [ ] Sitemap enviado a Yandex Webmaster
- [ ] Sitemap enviado a Bing Webmaster Tools
- [ ] Analytics configurado (Google Analytics / Yandex Metrica)
- [ ] Monitoreo de keywords configurado

---

**¡Tu sitio está listo para dominar el mercado B2B de exportación de frutas y verduras! 🚀🍅🍊🌶️🍉**
