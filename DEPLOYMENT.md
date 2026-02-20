# 📖 Guía de Deploy para Vercel

Este documento contiene instrucciones paso a paso para desplegar JaraTravels en Vercel y configurar Supabase.

## 📋 Tabla de contenidos

1. [Preparación inicial](#preparación-inicial)
2. [GitHub](#github)
3. [Vercel](#vercel)
4. [Supabase](#supabase)
5. [Integración de servicios externos](#integración-de-servicios-externos)
6. [Verificación final](#verificación-final)

---

## 🚀 Preparación inicial

### Requisitos previos

- [ ] Cuenta de GitHub
- [ ] Cuenta de Vercel (se puede crear desde GitHub)
- [ ] Cuenta de Supabase (gratuita)
- [ ] Cuenta de Resend (para emails)
- [ ] Cuenta de Cloudflare Turnstile (para CAPTCHA)

### Variables de entorno necesarias

Recopilar esta información antes de empezar:

```
Supabase:
- VITE_SUPABASE_URL
- VITE_SUPABASE_PUBLISHABLE_KEY
- VITE_SUPABASE_PROJECT_ID

Cloudflare Turnstile:
- VITE_TURNSTILE_SITE_KEY

Email (Resend):
- RESEND_API_KEY

Pago:
- BANK_IBAN
- BANK_HOLDER
- BANK_NAME
- MBWAY_PHONE
- PAYPAL_LINK
```

---

## 📚 GitHub

### Paso 1: Crear nuevo repositorio

1. Ve a [github.com](https://github.com) e inicia sesión
2. Click en el **+** → **New repository**
3. Configura:
   - **Repository name:** `jaratravels` (o el nombre que prefieras)
   - **Description:** Tu Tours & Experiências
   - **Visibility:** Public (si quieres que sea público) o Private
   - ✅ **Initialize this repository with:** (deja sin marcar, subiremos el código existente)

4. Click en **Create repository**

### Paso 2: Subir el código existente

En tu terminal local:

```bash
# Navega al directorio del proyecto
cd /Users/ismael/Documents/jaratravels

# Reinicializa el git (para vincular al nuevo repositorio)
git remote remove origin
git remote add origin https://github.com/TU_USUARIO/jaratravels.git
git branch -M main
git push -u origin main
```

**Nota:** Reemplaza `TU_USUARIO` con tu usuario de GitHub.

### Paso 3: Verificar en GitHub

1. Abre tu repositorio en GitHub
2. Verifica que todo el código está ahí
3. ✅ Confirma que NO hay archivos `.env` (solo `.env.example`)

---

## 🎯 Vercel

### Paso 1: Conectar repositorio

1. Ve a [vercel.com](https://vercel.com)
2. Inicia sesión con GitHub (si no tienes cuenta, créala)
3. Click en **Add New...** → **Project**
4. Selecciona tu repositorio `jaratravels`
5. Click en **Import**

### Paso 2: Configurar variables de entorno

En la pantalla de configuración del proyecto:

1. **Project Name** (mantén el sugerido o cámbialo)
2. **Framework Preset:** Vercel detectará Vite automáticamente
3. **Build Command:** Vercel usará el default (`npm run build`)
4. **Output Directory:** Vercel usará el default (`dist`)

Scroll hasta **Environment Variables** y añade:

```
VITE_SUPABASE_URL = https://tu-proyecto.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY = tu-anon-key-aqui
VITE_SUPABASE_PROJECT_ID = tu-project-id
VITE_TURNSTILE_SITE_KEY = tu-turnstile-site-key
```

**Nota:** Estas son variables públicas (anon keys), es seguro que estén en Vercel.

### Paso 3: Deploy

1. Click en **Deploy**
2. Espera a que termine (normalmente 2-3 minutos)
3. Una vez completado, verás la URL: `https://jaratravels-production.vercel.app`

### Paso 4: Configurar dominio personalizado (opcional)

Si quieres usar tu propio dominio:

1. Ve a **Settings** del proyecto en Vercel
2. Vete a **Domains**
3. Añade tu dominio
4. Sigue las instrucciones de DNS proporcionadas

---

## 💾 Supabase

### Paso 1: Crear proyecto

1. Ve a [supabase.com](https://supabase.com)
2. Click en **Create a new project**
3. Selecciona tu organización o crea una
4. Configura:
   - **Project name:** jaratravels
   - **Database Password:** (genera uno seguro)
   - **Region:** Selecciona la más cercana a ti
5. Click en **Create new project**

Espera unos minutos a que se cree.

### Paso 2: Obtener credenciales

1. Una vez creado, ve a **Settings** → **API**
2. Copia:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** → `VITE_SUPABASE_PUBLISHABLE_KEY`
   - **Project ID** (de la URL) → `VITE_SUPABASE_PROJECT_ID`

3. Actualiza estas variables en Vercel:
   - Ve a **Settings** → **Environment Variables**
   - Actualiza las tres variables
   - Los cambios se aplicarán en el próximo deploy

### Paso 3: Ejecutar migraciones de base de datos

1. Ve a **SQL Editor** (en el panel izquierdo de Supabase)
2. Crea una nueva query
3. Copia el contenido del archivo `supabase/migrations/20260101130554_a0fb563d-b8f6-40d3-bc2e-1c6036d99d4e.sql`
4. Ejecuta cada migración en orden

O usa la CLI de Supabase:

```bash
# Instala Supabase CLI
npm install -g supabase

# Inicializa Supabase localmente
supabase init

# Push migraciones a producción
supabase link --project-ref YOUR_PROJECT_ID
supabase db push
```

### Paso 4: Configurar secretos

Los secretos se usan en las funciones Deno. En Supabase:

1. Ve a **Settings** → **Secrets**
2. Crea nuevos secretos:

```
RESEND_API_KEY = tu-resend-key
ADMIN_EMAIL = tu-email@example.com
BANK_IBAN = tu-iban
BANK_HOLDER = titular
BANK_NAME = nombre-banco
MBWAY_PHONE = tu-numero
PAYPAL_LINK = tu-link-paypal
TURNSTILE_SITE_KEY = tu-turnstile-site-key
TURNSTILE_SECRET_KEY = tu-turnstile-secret-key
```

---

## 🔗 Integración de servicios externos

### Resend (para envío de emails)

1. Ve a [resend.com](https://resend.com)
2. Crea una cuenta
3. Ve a **API Keys**
4. Copia tu API key
5. En Supabase → **Settings** → **Secrets**
6. Añade `RESEND_API_KEY = tu-key-aqui`

**Nota:** Durante desarrollo, Resend envía desde `onboarding@resend.dev`. Para producción, necesitas verificar tu dominio.

### Cloudflare Turnstile (para CAPTCHA)

1. Ve a [cloudflare.com](https://cloudflare.com)
2. Inicia sesión o crea una cuenta
3. Ve a **Turnstile**
4. Click en **Create site**
5. Configura:
   - Domain: tu-dominio.com (o localhost para testing)
   - Mode: Managed
6. Copia:
   - **Site Key** → `VITE_TURNSTILE_SITE_KEY`
   - **Secret Key** → `TURNSTILE_SECRET_KEY` (en Supabase Secrets)

7. Actualiza las variables en Vercel

### PayPal (opcional, actualmente dummy)

1. Ve a [paypal.com/developers](https://paypal.com/developers)
2. Crea una cuenta de desarrollador
3. Obtén tu link/credenciales
4. En Supabase → **Settings** → **Secrets**
5. Añade `PAYPAL_LINK = tu-link-paypal`

---

## ✅ Verificación final

### Checklist de verificación

- [ ] El repositorio está en GitHub
- [ ] El proyecto está en Vercel con deploy exitoso
- [ ] Las variables de entorno están configuradas en Vercel
- [ ] Supabase proyecto creado y funcionando
- [ ] Migraciones ejecutadas en Supabase
- [ ] Secretos configurados en Supabase
- [ ] Funciones Deno desplegadas (si es necesario)
- [ ] Email de contacto funciona
- [ ] Sistema de reservas funciona

### Pruebas

1. Abre tu URL en Vercel
2. Prueba formulario de contacto:
   - Recibe email en admin
3. Prueba sistema de reservas:
   - Crea una reserva
   - Verifica que se guarda en BD
   - Recibe email de confirmación
4. Prueba panel admin:
   - Usa credenciales de Supabase Auth
   - Verifica que puedes gestionar reservas

---

## 🐛 Troubleshooting

### "VITE_SUPABASE_URL is not defined"
- Asegúrate que las variables de entorno están en Vercel
- Verifica los nombres: deben empezar con `VITE_`
- Trigger un nuevo deploy después de añadir variables

### "Cannot reach Supabase"
- Verifica que la URL es correcta
- Comprueba en Supabase Settings → API
- Revisa firewall/CORS si es necesario

### "Envío de emails no funciona"
- Verifica RESEND_API_KEY en Supabase Secrets
- Comprueba que el email admin es correcto
- En desarrollo, ve a Resend dashboard para ver logs

### "Turnstile no funciona"
- Verifica Site Key en Vercel (VITE_)
- Verifica Secret Key en Supabase Secrets
- Comprueba que el dominio coincide con lo registrado en Turnstile

---

## 📧 Próximos pasos

1. Personaliza la información del negocio en `src/components/Contact.tsx`
2. Actualiza precios y servicios en `src/pages/Booking.tsx`
3. Añade tus imágenes y partners en `src/assets/`
4. Configura dominio personalizado
5. Habilita HTTPS (Vercel lo hace automáticamente)

---

## 📞 Soporte

Para problemas:
1. Consulta el README.md
2. Revisa los logs en Vercel → **Functions** o Supabase → **Logs**
3. Contacta al soporte de cada servicio

---

**Última actualización:** Febrero 2026
