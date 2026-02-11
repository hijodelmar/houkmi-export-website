# 🛠️ Comandos Útiles - HOUKMI EXPORT

## 📦 Instalación y Configuración

```bash
# Instalar dependencias
npm install

# o con yarn
yarn install
```

---

## 🚀 Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# El sitio estará disponible en:
# http://localhost:3000
```

**URLs de prueba local:**
- Home EN: http://localhost:3000/en
- Home FR: http://localhost:3000/fr
- Tomates EN: http://localhost:3000/en/products/tomatoes
- Naranjas FR: http://localhost:3000/fr/products/oranges
- Sitemap: http://localhost:3000/sitemap.xml
- Robots: http://localhost:3000/robots.txt

---

## 🏗️ Build y Producción

```bash
# Compilar para producción
npm run build

# Iniciar servidor de producción
npm start

# El sitio estará disponible en:
# http://localhost:3000
```

---

## 🔍 Verificaciones Pre-Despliegue

### 1. Verificar que el build funciona
```bash
npm run build
```
✅ Debe completarse sin errores

### 2. Verificar páginas generadas
```bash
# Después del build, verificar que existen:
ls .next/server/app/en
ls .next/server/app/fr
ls .next/server/app/de
ls .next/server/app/it
ls .next/server/app/ru
ls .next/server/app/es
```

### 3. Verificar archivos públicos
```bash
# Verificar sitemap
cat public/sitemap.xml

# Verificar robots
cat public/robots.txt
```

---

## 🌐 Despliegue

### Opción 1: Vercel (Recomendado)

```bash
# Instalar Vercel CLI globalmente
npm install -g vercel

# Login
vercel login

# Desplegar a preview
vercel

# Desplegar a producción
vercel --prod
```

**Configuración en Vercel:**
- Framework Preset: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### Opción 2: Netlify

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Desplegar
netlify deploy --prod
```

**Configuración en Netlify:**
- Build command: `npm run build`
- Publish directory: `.next`

### Opción 3: Docker

```bash
# Crear Dockerfile (si no existe)
# Ver ejemplo abajo

# Build imagen
docker build -t houkmi-export .

# Ejecutar contenedor
docker run -p 3000:3000 houkmi-export
```

**Dockerfile de ejemplo:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

---

## 🧪 Testing y Validación

### Validar Schema Markup
```bash
# Usar curl para obtener HTML
curl https://houkmiexport.com/en > test.html

# Buscar schema
grep -A 20 "application/ld+json" test.html
```

### Validar Sitemap
```bash
# Descargar sitemap
curl https://houkmiexport.com/sitemap.xml > sitemap.xml

# Contar URLs
grep -c "<loc>" sitemap.xml
# Debe mostrar: 37
```

### Validar Robots.txt
```bash
curl https://houkmiexport.com/robots.txt
```

---

## 📊 Análisis y Monitoreo

### Ver logs de Next.js
```bash
# En desarrollo
npm run dev

# Los logs aparecerán en la consola
```

### Analizar bundle size
```bash
# Instalar analyzer
npm install --save-dev @next/bundle-analyzer

# Agregar a next.config.js:
# const withBundleAnalyzer = require('@next/bundle-analyzer')({
#   enabled: process.env.ANALYZE === 'true',
# })
# module.exports = withBundleAnalyzer(nextConfig)

# Ejecutar análisis
ANALYZE=true npm run build
```

---

## 🔧 Mantenimiento

### Actualizar dependencias
```bash
# Ver dependencias desactualizadas
npm outdated

# Actualizar todas las dependencias
npm update

# Actualizar Next.js específicamente
npm install next@latest react@latest react-dom@latest
```

### Limpiar caché
```bash
# Eliminar .next y node_modules
rm -rf .next node_modules

# Reinstalar
npm install

# Rebuild
npm run build
```

---

## 🌍 URLs de Producción

### Páginas Principales
```
https://houkmiexport.com/
https://houkmiexport.com/en
https://houkmiexport.com/fr
https://houkmiexport.com/de
https://houkmiexport.com/it
https://houkmiexport.com/ru
https://houkmiexport.com/es
```

### Páginas de Productos (Inglés)
```
https://houkmiexport.com/en/products
https://houkmiexport.com/en/products/tomatoes
https://houkmiexport.com/en/products/oranges
https://houkmiexport.com/en/products/peppers
https://houkmiexport.com/en/products/watermelons
```

### Páginas de Productos (Francés)
```
https://houkmiexport.com/fr/products
https://houkmiexport.com/fr/products/tomatoes
https://houkmiexport.com/fr/products/oranges
https://houkmiexport.com/fr/products/peppers
https://houkmiexport.com/fr/products/watermelons
```

### Archivos SEO
```
https://houkmiexport.com/sitemap.xml
https://houkmiexport.com/robots.txt
```

---

## 🔍 Herramientas de Validación Online

### SEO
- Google Search Console: https://search.google.com/search-console
- Yandex Webmaster: https://webmaster.yandex.com
- Bing Webmaster: https://www.bing.com/webmasters

### Schema Markup
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema.org Validator: https://validator.schema.org/

### Hreflang
- Hreflang Testing Tool: https://www.aleydasolis.com/english/international-seo-tools/hreflang-tags-generator/

### Performance
- PageSpeed Insights: https://pagespeed.web.dev/
- GTmetrix: https://gtmetrix.com/

### Mobile
- Mobile-Friendly Test: https://search.google.com/test/mobile-friendly

---

## 📝 Variables de Entorno

Si necesitas configurar variables de entorno, crea un archivo `.env.local`:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://houkmiexport.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_YANDEX_METRICA_ID=XXXXXXXX
```

**Nota:** No commitear `.env.local` al repositorio (ya está en `.gitignore`)

---

## 🐛 Troubleshooting

### Error: "Module not found"
```bash
# Limpiar e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Error: "Port 3000 already in use"
```bash
# Encontrar proceso usando el puerto
lsof -i :3000

# Matar proceso
kill -9 <PID>

# O usar otro puerto
PORT=3001 npm run dev
```

### Error de build
```bash
# Limpiar .next
rm -rf .next

# Rebuild
npm run build
```

---

## 📚 Recursos Adicionales

### Documentación
- Next.js: https://nextjs.org/docs
- React: https://react.dev/
- next-intl: https://next-intl-docs.vercel.app/

### SEO
- Google SEO Guide: https://developers.google.com/search/docs
- Yandex SEO: https://yandex.com/support/webmaster/
- Schema.org: https://schema.org/

---

## ✅ Quick Start Checklist

```bash
# 1. Clonar/descargar proyecto
cd houkmi-site

# 2. Instalar dependencias
npm install

# 3. Iniciar desarrollo
npm run dev

# 4. Abrir navegador
# http://localhost:3000/en

# 5. Verificar que funciona
# - Navegar entre idiomas
# - Ver páginas de productos
# - Verificar sitemap.xml
# - Verificar robots.txt

# 6. Build para producción
npm run build

# 7. Desplegar
vercel --prod
# o
netlify deploy --prod
```

---

**🚀 ¡Listo para desplegar!**
