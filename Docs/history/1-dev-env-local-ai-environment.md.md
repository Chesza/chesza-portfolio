# Autopsia técnica del proyecto: AI Dev Assistant / entorno agéntico local

## 0. Contexto inicial heredado de otro chat

Este chat comenzó con un resumen que venía de otro hilo anterior sobre un proyecto llamado:
Chat: Error WebView VS Code
```text
dev-env
Ruta: C:\Users\Administrator\proyectos\dev-env
Usuario Windows: Administrator
Sistema: Windows 11
```

El proyecto general era un **entorno de desarrollo agéntico local**, con la idea de configurar un asistente de IA gratuito/local para desarrollo usando:

```text
VS Code
Continue
Ollama
Qwen / modelos de código
Engram / memoria persistente
Backend local
Extensión propia de VS Code
```

El objetivo era construir una especie de asistente de desarrollo con memoria/contexto, capaz de analizar código, generar código, revisar código y conversar desde VS Code.

---

# 1. Arquitectura general detectada

La estructura conceptual del proyecto quedó así:

```text
dev-env
│
├── Backend local
│   ├── http://localhost:8000/analyze
│   ├── http://localhost:8000/generate
│   ├── http://localhost:8000/review
│   └── http://localhost:8000/chat
│
├── Extensión VS Code
│   ├── package.json
│   ├── tsconfig.json
│   └── src/extension.ts
│
└── UI en VS Code
    ├── Activity Bar icon
    ├── Sidebar container
    └── Webview View: aiChatView
```

---

# 2. Tecnologías involucradas

## Frontend / extensión

```text
VS Code Extension API
TypeScript
WebviewViewProvider
HTML embebido
JavaScript dentro del Webview
```

## Backend

```text
API local en http://localhost:8000
Endpoints POST:
- /analyze
- /generate
- /review
- /chat
```

## Build / configuración

```text
Node.js
npm
tsc / TypeScript Compiler
tsconfig.json
package.json de VS Code Extension
```

## Posibles tecnologías del proyecto global

Del resumen heredado:

```text
Ollama
Continue
Qwen
Engram
IA local
Memoria persistente
```

---

# 3. Fases del proyecto

## Fase 1 — Proyecto agéntico local

Se partió de un proyecto más grande llamado:

```text
C:\Users\Administrator\proyectos\dev-env
```

Objetivo:

```text
Crear un asistente de IA local para desarrollo de software.
```

Componentes principales:

```text
VS Code como entorno principal
Ollama como runtime local de modelos
Qwen como modelo de código
Engram como memoria persistente
Continue como apoyo de IA dentro de VS Code
```

---

## Fase 2 — Creación de extensión propia para VS Code

Se empezó a construir una extensión llamada:

```json
"name": "ai-dev-assistant-vscode",
"displayName": "AI Dev Assistant"
```

La extensión tenía comandos:

```text
AI: Analyze Code
AI: Generate Code
AI: Review Code
```

Declarados así:

```json
"commands": [
  "aiDev.analyze",
  "aiDev.generate",
  "aiDev.review"
]
```

---

## Fase 3 — Conexión con backend local

En `extension.ts` se definió:

```ts
const API_URL = "http://localhost:8000";
```

Y una función reutilizable:

```ts
async function callAPI(endpoint: string, data: any): Promise<string>
```

Esta función hacía:

```text
POST al backend
envía JSON
valida response.ok
convierte response.json()
soporta result o response
devuelve texto para VS Code
```

Respuesta esperada:

```ts
type ApiResponse = {
    result?: string;
    response?: string;
};
```

Acierto importante:

```text
Se contemplaron dos formatos posibles de respuesta:
- result
- response
```

Eso hace más flexible la integración con el backend.

---

## Fase 4 — Comandos funcionales

Se registraron tres comandos en `activate()`.

### 4.1 Analyze

```text
Comando: aiDev.analyze
```

Flujo:

```text
1. Toma selección actual del editor.
2. Si no hay selección, muestra warning.
3. Envía el código a /analyze.
4. Abre un documento markdown con el resultado.
```

Endpoint:

```text
POST http://localhost:8000/analyze
Body: { code: selection }
```

---

### 4.2 Generate

```text
Comando: aiDev.generate
```

Flujo:

```text
1. Abre input box.
2. Usuario describe el código deseado.
3. Envía prompt a /generate.
4. Inserta respuesta en la posición actual del editor.
```

Endpoint:

```text
POST http://localhost:8000/generate
Body: { prompt }
```

---

### 4.3 Review

```text
Comando: aiDev.review
```

Flujo:

```text
1. Toma selección actual.
2. Si no hay selección, muestra warning.
3. Envía código a /review.
4. Abre documento nuevo con resultado.
```

Endpoint:

```text
POST http://localhost:8000/review
Body: { code: selection }
```

Detalle discutible:

```ts
language: "csharp"
```

Posible fallo conceptual:

```text
El resultado de review probablemente debería abrirse como markdown,
no necesariamente como csharp.
```

---

# 5. Fase 5 — Chat lateral en VS Code

Se agregó un `ChatViewProvider`.

Objetivo:

```text
Crear una vista lateral tipo chat dentro de VS Code.
```

ID de vista:

```text
aiChatView
```

Clase:

```ts
export class ChatViewProvider implements vscode.WebviewViewProvider
```

Método central:

```ts
public resolveWebviewView(webviewView: vscode.WebviewView)
```

Dentro se configuraba:

```ts
webviewView.webview.options = {
    enableScripts: true
};
```

Luego se inyectaba HTML:

```ts
webviewView.webview.html = this.getHtml();
```

Y se escuchaban mensajes desde el Webview:

```ts
webviewView.webview.onDidReceiveMessage(async (msg) => {
    if (msg.type === "chat") {
        ...
    }
});
```

---

# 6. Flujo del chat

El HTML tenía:

```html
<h3>AI Chat</h3>
<div id="chat"></div>
<input id="input" />
<button onclick="send()">Send</button>
```

El script hacía:

```text
1. acquireVsCodeApi()
2. Usuario escribe mensaje
3. postMessage hacia la extensión
4. La extensión llama al backend
5. Backend responde
6. La extensión hace postMessage de vuelta al Webview
7. El HTML agrega respuesta al chat
```

Árbol del flujo:

```text
Usuario escribe en Webview
        │
        ▼
vscode.postMessage({ type: "chat", message })
        │
        ▼
ChatViewProvider.onDidReceiveMessage
        │
        ▼
fetch("http://localhost:8000/chat")
        │
        ▼
Backend local
        │
        ▼
{ response: "..." }
        │
        ▼
webview.postMessage({ type: "response", message })
        │
        ▼
HTML agrega mensaje AI al chat
```

---

# 7. Error principal investigado

El error visible en la nueva ventana de VS Code fue:

```text
There is no data provider registered that can provide view data.
```

Este error apareció al abrir la vista del sidebar.

Interpretación técnica:

```text
VS Code sí reconoce que existe una vista declarada,
pero no encuentra un provider activo registrado para entregarle datos.
```

En otras palabras:

```text
La vista aiChatView existe en package.json,
pero registerWebviewViewProvider("aiChatView", provider)
no está conectando en runtime.
```

---

# 8. Hipótesis revisadas durante el chat

## Hipótesis 1 — package.json incorrecto

Se pensó primero que faltaba declarar la vista en `package.json`.

Pero luego el usuario compartió el archivo y se confirmó que sí existía:

```json
"views": {
  "ai-chat": [
    {
      "id": "aiChatView",
      "name": "AI Chat"
    }
  ]
}
```

Y también:

```json
"activationEvents": [
  "onView:aiChatView",
  "onCommand:aiDev.analyze",
  "onCommand:aiDev.generate",
  "onCommand:aiDev.review"
]
```

Acierto:

```text
El id aiChatView sí coincidía entre package.json y extension.ts.
```

---

## Hipótesis 2 — problema con el ID del container

Se sugirió cambiar:

```json
"id": "ai-chat"
```

por:

```json
"id": "aiChat"
```

Motivo:

```text
Evitar posibles problemas de binding por guion en el ID del view container.
```

Esto fue una hipótesis, pero no quedó confirmado como la causa real, porque el error continuó.

---

## Hipótesis 3 — extensión no está ejecutando JS nuevo

Cuando el error persistió, la hipótesis más fuerte pasó a ser:

```text
VS Code está corriendo código viejo o no está ejecutando el activate().
```

Causas posibles:

```text
No se ejecutó npm run compile
La ventana abierta no es la Extension Development Host
El main apunta a ./out/extension.js pero ese archivo no está actualizado
registerWebviewViewProvider no está llegando a ejecutarse
```

---

## Hipótesis 4 — activationEvents no dispara a tiempo

Se propuso cambiar temporalmente:

```json
"activationEvents": [
  "onView:aiChatView",
  ...
]
```

por:

```json
"activationEvents": ["*"]
```

Objetivo:

```text
Forzar que la extensión se active desde el inicio,
antes de que VS Code intente renderizar el Webview.
```

Este sería un fix de diagnóstico, no necesariamente la solución final ideal.

---

# 9. package.json analizado

Archivo compartido:

```json
{
  "name": "ai-dev-assistant-vscode",
  "displayName": "AI Dev Assistant",
  "description": "Local AI assistant for development",
  "version": "0.0.1",
  "engines": {
    "vscode": "^1.110.0"
  },
  "activationEvents": [
    "onView:aiChatView",
    "onCommand:aiDev.analyze",
    "onCommand:aiDev.generate",
    "onCommand:aiDev.review"
  ],
  "main": "./out/extension.js"
}
```

Puntos correctos:

```text
main apunta a ./out/extension.js
activationEvents incluye onView:aiChatView
commands están declarados
viewsContainers existe
views existe
id de vista aiChatView existe
```

Punto sospechoso:

```json
"viewsContainers": {
  "activitybar": [
    {
      "id": "ai-chat"
    }
  ]
},
"views": {
  "ai-chat": [...]
}
```

No es necesariamente inválido, pero se marcó como posible factor de riesgo.

---

# 10. tsconfig.json analizado

Archivo compartido:

```json
{
  "compilerOptions": {
    "module": "Node16",
    "target": "ES2022",
    "outDir": "out",
    "lib": [
      "ES2022"
    ],
    "sourceMap": true,
    "rootDir": "src",
    "strict": true
  }
}
```

Puntos correctos:

```text
outDir = out
rootDir = src
target moderno
strict activo
```

Compatibilidad:

```text
package.json main = ./out/extension.js
tsconfig outDir = out
```

Eso está alineado.

Conclusión:

```text
El problema no parece estar en tsconfig.json.
```

---

# 11. Código de activate revisado

El activate mostrado tenía:

```ts
export function activate(context: vscode.ExtensionContext) {
    console.log("AI EXTENSION ACTIVATED 🚀");

    const provider = new ChatViewProvider();

    console.log("REGISTERING CHAT VIEW");

    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider("aiChatView", provider)
    );

    ...
}
```

Esto es conceptualmente correcto.

Punto importante:

```text
Si este bloque realmente se ejecuta,
VS Code debería tener provider para aiChatView.
```

Por eso el error apunta más a:

```text
build viejo
activate no disparado
extensión no cargada
Extension Development Host incorrecto
o main compilado no actualizado
```

---

# 12. Logs recomendados

Se recomendó insertar logs:

```ts
console.log("🔥 EXTENSION FILE LOADED");
```

Dentro de `activate`:

```ts
console.log("🔥 ACTIVATE RUNNING");
console.log("🔥 PROVIDER CREATED");
console.log("🔥 PROVIDER REGISTERED");
```

Dentro del provider:

```ts
console.log("🔥 VIEW RESOLVED");
```

Interpretación:

```text
Si no aparece EXTENSION FILE LOADED:
- VS Code no está cargando ese JS

Si aparece FILE LOADED pero no ACTIVATE:
- activationEvents no está disparando

Si aparece ACTIVATE pero no VIEW RESOLVED:
- el provider no está enlazando con la vista

Si aparece VIEW RESOLVED:
- el problema ya no es el provider, sería HTML/webview/backend
```

---

# 13. Fallos detectados

## Fallo 1 — Diagnóstico inicial incompleto

Al inicio se asumió que el problema estaba en `package.json`.

Luego el usuario mostró que el `package.json` estaba prácticamente correcto.

Autopsia:

```text
El diagnóstico inicial fue útil pero no suficiente.
Faltó pedir logs de activación desde el principio.
```

---

## Fallo 2 — Cambio de `ai-chat` a `aiChat` tratado como causa segura

Se sugirió que el guion en `ai-chat` era el bug real.

Autopsia:

```text
Eso fue demasiado categórico.
El guion puede ser sospechoso, pero no era evidencia definitiva.
El error continuó, así que no era la causa única confirmada.
```

---

## Fallo 3 — Falta de validación runtime

El problema requería confirmar:

```text
¿Se ejecuta activate?
¿Se compila extension.ts?
¿VS Code carga ./out/extension.js actualizado?
¿Se abre Extension Development Host?
```

Eso debió validarse antes de declarar una causa final.

---

## Fallo 4 — Riesgo de código viejo

El síntoma encaja mucho con:

```text
npm run compile no ejecutado
out/extension.js viejo
F5 no abrió la extensión correcta
VS Code normal en vez de Extension Development Host
```

Este quedó como sospechoso principal.

---

# 14. Aciertos del proyecto

## Acierto 1 — Separación backend/frontend

La extensión no contiene la IA directamente.

```text
VS Code Extension → API local → modelo/agente
```

Esto es sano porque permite cambiar el backend sin reescribir la extensión.

---

## Acierto 2 — Endpoints separados

Se separaron responsabilidades:

```text
/analyze
/generate
/review
/chat
```

Eso permite evolucionar cada función por separado.

---

## Acierto 3 — Manejo de errores HTTP

El código valida:

```ts
if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
}
```

Eso evita aceptar respuestas fallidas como válidas.

---

## Acierto 4 — Uso correcto de WebviewViewProvider

La intención técnica es correcta:

```ts
vscode.window.registerWebviewViewProvider("aiChatView", provider)
```

y:

```ts
class ChatViewProvider implements vscode.WebviewViewProvider
```

---

## Acierto 5 — Contexto del archivo activo en chat

El chat manda al backend:

```ts
const code = editor?.document.getText();

body: JSON.stringify({
    message: msg.message,
    context: code || ""
})
```

Esto convierte el chat en un asistente contextual, no solo chatbot genérico.

---

# 15. Estado final del problema

Al final del chat, el error seguía apareciendo:

```text
There is no data provider registered that can provide view data.
```

Estado de diagnóstico:

```text
package.json parece correcto
tsconfig.json parece correcto
sidebar aparece
icono aparece
view declarada existe
pero provider no está disponible en runtime
```

Causa más probable:

```text
El activate() no se está ejecutando antes/de forma correcta,
o VS Code está ejecutando un out/extension.js viejo.
```

---

# 16. Checklist final para cerrar la autopsia

```text
1. Confirmar que se está editando src/extension.ts.
2. Ejecutar npm run compile.
3. Verificar que exista out/extension.js actualizado.
4. Abrir con F5 Extension Development Host.
5. Abrir Developer Tools en la ventana nueva.
6. Confirmar logs:
   - EXTENSION FILE LOADED
   - ACTIVATE RUNNING
   - PROVIDER CREATED
   - PROVIDER REGISTERED
   - VIEW RESOLVED
7. Si no activa con onView, probar temporalmente activationEvents: ["*"].
8. Si con "*" funciona, el problema era timing/activation.
9. Si ni con "*" funciona, revisar main, carpeta out, workspace abierto y launch config.
```

---

# 17. Árbol resumido de diagnóstico

```text
Error:
There is no data provider registered that can provide view data
│
├── package.json incorrecto
│   ├── views no existe
│   ├── id no coincide
│   └── activationEvents no incluye onView
│
├── activate() no corre
│   ├── activationEvents no dispara
│   ├── no se abrió Extension Development Host
│   └── extensión no cargó
│
├── JS compilado viejo
│   ├── npm run compile no ejecutado
│   ├── out/extension.js desactualizado
│   └── main apunta a archivo viejo
│
└── provider no conecta
    ├── registerWebviewViewProvider no se ejecuta
    ├── id distinto a aiChatView
    └── error antes de registrar provider
```

---

# 18. Conclusión técnica

El proyecto va bien encaminado. La arquitectura es correcta:

```text
VS Code Extension + Webview + API local + IA local
```

El fallo actual no parece ser del backend ni del HTML del chat.

El bloqueo está en la fase de **registro runtime del WebviewViewProvider**.

La autopsia apunta a:

```text
Problema de activación, compilación o ejecución de código viejo.
```

No a la lógica del chat.