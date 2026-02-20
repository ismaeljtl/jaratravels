# JaraTravels - Tours & Experiências

Una plataforma moderna de reservas de tours y experiencias construida con React, TypeScript, y Supabase.

## 🚀 Stack Tecnológico

- **Frontend:** React 18 + TypeScript + Vite
- **Backend:** Supabase (PostgreSQL + Funciones Edge con Deno)
- **Autenticación:** Supabase Auth
- **Base de datos:** PostgreSQL
- **UI Components:** Shadcn/ui + Radix UI
- **Estilos:** Tailwind CSS
- **Email:** Resend
- **CAPTCHA:** Cloudflare Turnstile
- **PWA:** Vite PWA Plugin

## 📋 Requisitos Previos

- Node.js 18+ (se recomienda usar [nvm](https://github.com/nvm-sh/nvm))
- npm o bun
- Cuenta de Supabase (gratuita en [supabase.com](https://supabase.com))
- Cuenta de Vercel (gratuita en [vercel.com](https://vercel.com))

## 🔧 Instalación Local

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/jaratravels.git
cd jaratravels
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno

Copia el archivo `.env.example` a `.env`:
```bash
cp .env.example .env
```

Luego rellena los valores en `.env`:
```dotenv
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=tu-anon-key
VITE_SUPABASE_PROJECT_ID=tu-project-id
VITE_TURNSTILE_SITE_KEY=tu-turnstile-key
```

### 4. Iniciar servidor de desarrollo
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🏗️ Estructura del Proyecto

```
jaratravels/
├── src/
│   ├── components/        # Componentes React reutilizables
│   ├── pages/            # Páginas principales
│   ├── hooks/            # Custom hooks
│   ├── i18n/             # Configuración de idiomas
│   ├── integrations/     # Integraciones (Supabase)
│   └── lib/              # Utilidades
├── supabase/
│   ├── functions/        # Funciones Serverless (Deno)
│   ├── migrations/       # Migraciones de base de datos
│   └── config.toml       # Configuración local
└── public/               # Archivos estáticos
```

## 🚀 Deploy en Vercel

### 1. Conectar repositorio a Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Crea una nueva cuenta o inicia sesión
3. Click en "New Project"
4. Selecciona "Import Git Repository"
5. Selecciona tu repositorio de GitHub

### 2. Configurar variables de entorno

En Vercel, durante la creación del proyecto o después en Settings → Environment Variables:

```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=tu-anon-key
VITE_SUPABASE_PROJECT_ID=tu-project-id
VITE_TURNSTILE_SITE_KEY=tu-turnstile-key
```

### 3. Deploy

Vercel desplegará automáticamente tu proyecto. Si haces push a `main`, se desplegará automáticamente.

## 💾 Configuración de Supabase

### Funciones Serverless

Las funciones Deno en `supabase/functions/` manejan:
- Envío de emails (contacto y reservas)
- Crear reservas
- Gestión de admin
- Control de rate limiting
- Traducción de textos

Para desplegar en Supabase:
```bash
# Instalar CLI de Supabase (si no lo tienes)
npm install -g supabase

# Deployar funciones
supabase functions deploy
```

### Base de datos

La estructura de la BD se define en las migraciones en `supabase/migrations/`. Supabase aplicará automáticamente las migraciones.

## 📧 Configuración de Email (Resend)

1. Crea una cuenta en [resend.com](https://resend.com)
2. Obtén tu API Key
3. En Supabase, ve a Project Settings → Secrets
4. Añade `RESEND_API_KEY` con tu key de Resend

Repite este proceso para:
- `TURNSTILE_SITE_KEY` y `TURNSTILE_SECRET_KEY` (Cloudflare)
- Credenciales de pago (BANK_IBAN, etc.)

## 🌍 Idiomas Soportados

La aplicación soporta:
- Português (PT)
- English (EN)
- Español (ES)
- Français (FR)

La configuración de idiomas se encuentra en `src/i18n/translations.ts`

## 📝 Comandos Disponibles

```bash
npm run dev          # Inicia servidor de desarrollo
npm run build        # Build para producción
npm run build:dev    # Build en modo desarrollo
npm run preview      # Preview del build
npm run lint         # Ejecutar ESLint
```

## 🔐 Seguridad

- La aplicación valida entrada en cliente y servidor
- Rate limiting en funciones críticas
- CAPTCHA en formularios públicos
- Autenticación requerida para panel admin
- Variables sensibles almacenadas en Supabase Secrets

## 📱 PWA

La aplicación es una Progressive Web App y puede instalarse en dispositivos móviles.

## 🤝 Contribuir

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

## 📞 Soporte

Para soporte, contacta a: jaratravels@hotmail.com

---

**Última actualización:** Febrero 2026
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/a1d5a7fb-2d13-4835-89fb-1a17143df9b2) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
