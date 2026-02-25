# Bruno Test Nimble - Fase 2 (API Layer)

Esta es la capa de consumo de APIs del proyecto bruno-test-nimble. Contiene toda la infraestructura necesaria para comunicarse con el backend, sin incluir componentes de UI o lógica de negocio específica.

## 📁 Estructura del Proyecto

```
src/
├── api/              # Configuración de Axios e interceptores
├── config/           # Configuración de variables de entorno
├── constants/        # Constantes de API y endpoints
├── models/           # Interfaces y tipos TypeScript
├── services/         # Servicios para consumo de APIs
├── utils/            # Utilidades (validadores, helpers)
└── main.ts           # Punto de entrada principal
```

## 🚀 Características

- ✅ **Configuración de Axios** con interceptores para autenticación y manejo de errores
- ✅ **Tipado completo** con TypeScript
- ✅ **Gestión de variables de entorno** con Vite
- ✅ **Servicios organizados** por dominio (Jobs, Candidates)
- ✅ **Validadores** para datos de entrada
- ✅ **Manejo de errores** centralizado

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Copiar archivo de variables de entorno
cp .env.example .env

# Configurar las variables de entorno en .env
```

## 📝 Configuración

Edita el archivo `.env` con tus variables de entorno:

```env
VITE_API_BASE_URL=https://tu-api.com
VITE_API_TIMEOUT=30000
VITE_AUTH_EMAIL=tu-email@example.com
```

## 🎯 Uso

### Importar y usar los servicios

```typescript
import { JobService } from "./services";
import { envConfig } from "./config";

// Obtener lista de trabajos
const jobs = await JobService.getJobsList();

// Autenticar candidato
const candidate = await JobService.getCandidateByEmail(envConfig.auth.email);

// Aplicar a un trabajo
const result = await JobService.applyToJob({
  uuid: "generated-uuid",
  jobId: "job-id",
  candidateId: "candidate-id",
  repoUrl: "https://github.com/user/repo",
});
```

### Usar el cliente API directamente

```typescript
import { apiClient } from "./api";

// Hacer una petición personalizada
const response = await apiClient.get("/custom-endpoint");
```

## 🔧 Scripts Disponibles

```bash
npm run dev         # Modo desarrollo
npm run build       # Compilar para producción
npm run lint        # Ejecutar ESLint
npm run type-check  # Verificar tipos TypeScript
```

## 📦 Dependencias Principales

- **axios**: Cliente HTTP para realizar peticiones a la API
- **typescript**: Tipado estático
- **vite**: Build tool y dev server

## 🏗️ Arquitectura

### API Client (`src/api/`)

Cliente Axios configurado con:

- Base URL desde variables de entorno
- Timeout configurable
- Interceptores de petición (autenticación)
- Interceptores de respuesta (manejo de errores)

### Servicios (`src/services/`)

Capa de abstracción sobre el cliente API:

- `JobService`: Gestión de trabajos y candidatos

### Modelos (`src/models/`)

Interfaces TypeScript para:

- Jobs
- Candidates
- DTOs (Data Transfer Objects)

### Utilidades (`src/utils/`)

- Validadores (URLs de GitHub)
- Helpers (formateo de datos)

## 🔒 Seguridad

- El token de autenticación se almacena en `localStorage`
- Los interceptores añaden automáticamente el token a las peticiones
- Manejo centralizado de errores 401, 403, 404, 500

## 📄 Licencia

Este proyecto es privado y de uso interno.
