export interface Parameter {
  name: string;
  type: string;
  location: "query" | "body" | "header" | "path";
  required: boolean;
  description: string;
  defaultVal?: string;
}

export interface Endpoint {
  id: string;
  group: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  title: string;
  description: string;
  parameters: Parameter[];
  requestBody?: string;
  responseBody: string;
  isStreaming?: boolean;
}

export const apiEndpointsConfig: Endpoint[] = [
  // 1. Account Endpoints
  {
    id: "account-daily-messages",
    group: "1. Account Endpoints",
    method: "GET",
    path: "/api/account/daily-messages",
    title: "Fetch Daily Message Usage",
    description: "Retrieves the authenticated user's message usage count for the current day, mapping used, limits, and remaining scopes.",
    parameters: [
      { name: "Authorization", type: "string", location: "header", required: true, description: "Bearer <Supabase_JWT_Token>" }
    ],
    responseBody: `{
  "success": true,
  "data": {
    "used": 15,
    "limit": 100,
    "remaining": 85
  },
  "error": null
}`
  },

  // 2. Bring Your Own Key (BYOK) Endpoints
  {
    id: "byok-create-key",
    group: "2. BYOK Endpoints",
    method: "POST",
    path: "/api/byok/create-new-key",
    title: "Store API Provider Key",
    description: "Stores a new secret API provider key (e.g. OpenAI, Anthropic, Google) securely inside Supabase database vault.",
    parameters: [
      { name: "Authorization", type: "string", location: "header", required: true, description: "Bearer <Supabase_JWT_Token>" },
      { name: "provider", type: "string", location: "body", required: true, description: "The target LLM provider: 'openai' | 'anthropic' | 'google'." },
      { name: "apiKey", type: "string", location: "body", required: true, description: "Secret API key returned from the provider dashboard." }
    ],
    requestBody: `{
  "provider": "openai",
  "apiKey": "sk-proj-xxxxxxxxxxxxxxxxxxxxxxxx"
}`,
    responseBody: `{
  "success": true,
  "data": {
    "keyId": "key_uuid_12345",
    "provider": "openai",
    "createdAt": "2026-05-28T19:33:00.000Z"
  },
  "error": null
}`
  },
  {
    id: "byok-delete-key",
    group: "2. BYOK Endpoints",
    method: "POST",
    path: "/api/byok/delete-key",
    title: "Remove Stored LLM Key",
    description: "Removes a registered LLM credentials key by its unique database key identifier.",
    parameters: [
      { name: "Authorization", type: "string", location: "header", required: true, description: "Bearer <Supabase_JWT_Token>" },
      { name: "keyId", type: "string", location: "body", required: true, description: "The unique key identifier of the credentials to remove." }
    ],
    requestBody: `{
  "keyId": "key_uuid_12345"
}`,
    responseBody: `{
  "success": true,
  "data": {
    "success": true,
    "message": "API key successfully removed"
  },
  "error": null
}`
  },
  {
    id: "byok-get-key-details",
    group: "2. BYOK Endpoints",
    method: "GET",
    path: "/api/byok/get-key-details",
    title: "List Masked Credentials",
    description: "Lists all registered BYOK credentials for the authenticated user, displaying key IDs and masked endpoints.",
    parameters: [
      { name: "Authorization", type: "string", location: "header", required: true, description: "Bearer <Supabase_JWT_Token>" }
    ],
    responseBody: `{
  "success": true,
  "data": [
    {
      "keyId": "key_uuid_12345",
      "provider": "openai",
      "createdAt": "2026-05-28T14:03:00Z"
    }
  ],
  "error": null
}`
  },
  {
    id: "byok-get-models",
    group: "2. BYOK Endpoints",
    method: "GET",
    path: "/api/byok/get-models",
    title: "Fetch Available Models",
    description: "Fetches a list of LLM models available to the authenticated user based on their registered BYOK credentials.",
    parameters: [
      { name: "Authorization", type: "string", location: "header", required: true, description: "Bearer <Supabase_JWT_Token>" }
    ],
    responseBody: `{
  "success": true,
  "data": [
    {
      "id": "gpt-4o",
      "name": "GPT-4o",
      "provider": "openai"
    },
    {
      "id": "claude-3-5-sonnet",
      "name": "Claude 3.5 Sonnet",
      "provider": "anthropic"
    }
  ],
  "error": null
}`
  },
  {
    id: "byok-update-key",
    group: "2. BYOK Endpoints",
    method: "POST",
    path: "/api/byok/update-key",
    title: "Update Key Credentials",
    description: "Updates the API provider or credentials string for an existing registered key slot.",
    parameters: [
      { name: "Authorization", type: "string", location: "header", required: true, description: "Bearer <Supabase_JWT_Token>" },
      { name: "keyId", type: "string", location: "body", required: true, description: "The unique key identifier of the key to modify." },
      { name: "apiKey", type: "string", location: "body", required: true, description: "The new secret API key value." },
      { name: "provider", type: "string", location: "body", required: true, description: "The provider type label (e.g. 'openai')." }
    ],
    requestBody: `{
  "keyId": "key_uuid_12345",
  "apiKey": "sk-proj-new-key-value",
  "provider": "openai"
}`,
    responseBody: `{
  "success": true,
  "data": {
    "keyId": "key_uuid_12345",
    "provider": "openai",
    "updatedAt": "2026-05-28T19:33:00.000Z"
  },
  "error": null
}`
  },

  // 3. Chat Endpoints
  {
    id: "chat-create-chat",
    group: "3. Chat Endpoints",
    method: "POST",
    path: "/api/chat/create-new-chat",
    title: "Initialize Chat Thread",
    description: "Initializes a brand-new conversational chat thread session, recording database slots.",
    parameters: [
      { name: "Authorization", type: "string", location: "header", required: true, description: "Bearer <Supabase_JWT_Token>" },
      { name: "prompt", type: "string", location: "body", required: true, description: "The initial prompt or instruction to start the chat." }
    ],
    requestBody: `{
  "prompt": "Build me a clean portfolio site for a photographer"
}`,
    responseBody: `{
  "success": true,
  "data": {
    "id": "chat_uuid_98765"
  },
  "error": null
}`
  },
  {
    id: "chat-fetch-info",
    group: "3. Chat Endpoints",
    method: "GET",
    path: "/api/chat/fetch-chat-info",
    title: "Fetch Chat Metadata",
    description: "Retrieves structural metadata, active preview URLs, generated site URLs, onboarding status, and generation status for a specific chat.",
    parameters: [
      { name: "Authorization", type: "string", location: "header", required: true, description: "Bearer <Supabase_JWT_Token>" },
      { name: "chatId", type: "string", location: "query", required: true, description: "The unique identifier of the chat session." }
    ],
    responseBody: `{
  "success": true,
  "data": {
    "questionAnswers": [],
    "plans": [],
    "siteUrl": "https://example.com/site",
    "previewUrl": "https://example.com/preview",
    "isGenerating": false
  },
  "error": null
}`
  },
  {
    id: "chat-fetch-messages",
    group: "3. Chat Endpoints",
    method: "GET",
    path: "/api/chat/fetch-chat-messages",
    title: "Fetch Messages History",
    description: "Retrieves paginated history logs of text communications and plans inside a given chat session.",
    parameters: [
      { name: "Authorization", type: "string", location: "header", required: true, description: "Bearer <Supabase_JWT_Token>" },
      { name: "chatId", type: "string", location: "query", required: true, description: "The unique chat thread identifier." },
      { name: "limit", type: "number", location: "query", required: false, description: "Number of messages to retrieve (clamped 1 to 50).", defaultVal: "10" },
      { name: "cursor", type: "string", location: "query", required: false, description: "Cursor token for page pagination." }
    ],
    responseBody: `{
  "success": true,
  "data": {
    "messages": [
      {
        "id": "msg_01",
        "role": "user",
        "content": "Hello, build me a website",
        "createdAt": "2026-05-28T14:10:00Z"
      }
    ],
    "nextCursor": "cursor_token_abc123"
  },
  "error": null
}`
  },
  {
    id: "chat-fetch-user-chats",
    group: "3. Chat Endpoints",
    method: "GET",
    path: "/api/chat/fetch-user-chats",
    title: "Fetch User Chats Threads",
    description: "Retrieves paginated history threads lists generated by the authenticated user.",
    parameters: [
      { name: "Authorization", type: "string", location: "header", required: true, description: "Bearer <Supabase_JWT_Token>" },
      { name: "limit", type: "number", location: "query", required: false, description: "Number of chats to retrieve (clamped 1 to 50).", defaultVal: "10" },
      { name: "cursor", type: "string", location: "query", required: false, description: "Cursor token for page pagination." }
    ],
    responseBody: `{
  "success": true,
  "data": {
    "chats": [
      {
        "id": "chat_uuid_98765",
        "title": "Build me a portfolio",
        "createdAt": "2026-05-28T14:00:00Z"
      }
    ],
    "nextCursor": "cursor_token_xyz789"
  },
  "error": null
}`
  },
  {
    id: "chat-stream",
    group: "3. Chat Endpoints",
    method: "POST",
    path: "/api/chat/stream",
    title: "Stream Agent Query (SSE)",
    description: "Sends a query payload to the static compiler design agent, returning tokenized text deltas in real-time as Server-Sent Events (SSE).",
    isStreaming: true,
    parameters: [
      { name: "Authorization", type: "string", location: "header", required: true, description: "Bearer <Supabase_JWT_Token>" },
      { name: "chatId", type: "string", location: "body", required: true, description: "The ID of the active chat thread." },
      { name: "message", type: "string", location: "body", required: true, description: "The textual query or prompt input." }
    ],
    requestBody: `{
  "chatId": "chat_uuid_98765",
  "message": "Add a contact form to the landing page"
}`,
    responseBody: `event: message
data: {"type":"text","delta":"Indeed, let me start by..."}

event: message
data: {"type":"done","agentMessageId":"msg_agent_999","response":"Full response text","toolCall":null}`
  },
  {
    id: "chat-submit-answers",
    group: "3. Chat Endpoints",
    method: "POST",
    path: "/api/chat/submit-answers",
    title: "Submit Onboarding Answers (SSE)",
    description: "Submits selected multiple choice answers for design checklist questions, and streams the plan response.",
    isStreaming: true,
    parameters: [
      { name: "Authorization", type: "string", location: "header", required: true, description: "Bearer <Supabase_JWT_Token>" },
      { name: "chatId", type: "string", location: "body", required: true, description: "The unique chat identifier." },
      { name: "answers", type: "array", location: "body", required: true, description: "Array of chosen options." },
      { name: "questionSetId", type: "string", location: "body", required: false, description: "Optional set identifier." }
    ],
    requestBody: `{
  "chatId": "chat_uuid_98765",
  "answers": [
    {"questionId": "q1", "selected": ["option_a"]},
    {"questionId": "q2", "selected": ["option_c"]}
  ],
  "questionSetId": "set_123"
}`,
    responseBody: `event: message
data: {"type":"text","delta":"Parsing your input..."}

event: message
data: {"type":"done","agentMessageId":"msg_agent_001","response":"Full agent plan outline","toolCall":null,"status":"success","questionSetId":"set_123"}`
  },

  // 4. Generation & Deployment Endpoints
  {
    id: "generate-approve-plan",
    group: "4. Generation & Deployment",
    method: "POST",
    path: "/api/generate/approve-plan",
    title: "Approve Code Plan",
    description: "Approves a proposed code plan for a chat thread, immediately triggering the asynchronous Cloud Run generation job.",
    parameters: [
      { name: "Authorization", type: "string", location: "header", required: true, description: "Bearer <Supabase_JWT_Token>" },
      { name: "chatId", type: "string", location: "body", required: true, description: "The unique chat thread identifier." },
      { name: "planId", type: "string", location: "body", required: true, description: "The plan ID to trigger." }
    ],
    requestBody: `{
  "chatId": "chat_uuid_98765",
  "planId": "plan_uuid_1111"
}`,
    responseBody: `{
  "success": true,
  "data": {
    "success": true,
    "generationId": "gen_session_abcde",
    "status": "triggered"
  },
  "error": null
}`
  },
  {
    id: "generate-deploy-app",
    group: "4. Generation & Deployment",
    method: "POST",
    path: "/api/generate/deploy-app",
    title: "Deploy Compiled App",
    description: "Triggers the static cloud publisher pipeline (Cloud Run Job) to host the generated static application.",
    parameters: [
      { name: "Authorization", type: "string", location: "header", required: true, description: "Bearer <Supabase_JWT_Token>" },
      { name: "chatId", type: "string", location: "body", required: true, description: "The unique chat identifier." },
      { name: "sessionId", type: "string", location: "body", required: true, description: "The generation snapshot session ID to deploy." }
    ],
    requestBody: `{
  "chatId": "chat_uuid_98765",
  "sessionId": "gen_session_abcde"
}`,
    responseBody: `{
  "success": true,
  "data": {
    "deploymentId": "deploy_12345",
    "url": "https://qwintly.app/deployments/deploy_12345",
    "status": "initiating"
  },
  "error": null
}`
  },
  {
    id: "generate-fetch-summary",
    group: "4. Generation & Deployment",
    method: "GET",
    path: "/api/generate/fetch-gen-summary",
    title: "Fetch Generation Summary",
    description: "Fetches detailed summary parameters of files built, changes cataloged, and pages features compiled.",
    parameters: [
      { name: "Authorization", type: "string", location: "header", required: true, description: "Bearer <Supabase_JWT_Token>" },
      { name: "msgId", type: "string", location: "query", required: true, description: "The message ID associated with the build." }
    ],
    responseBody: `{
  "success": true,
  "data": {
    "summary": "This site contains a beautiful pricing page and integration guidelines...",
    "files": ["index.html", "style.css", "script.js"],
    "featuresAdded": ["Dark mode toggle", "Contact Form"]
  },
  "error": null
}`
  },
  {
    id: "generate-fetch-status",
    group: "4. Generation & Deployment",
    method: "GET",
    path: "/api/generate/fetch-status",
    title: "Stream Progress Logs (SSE)",
    description: "Dedicated real-time status tracker streaming pipeline step percentages, console logs, and execution phases.",
    isStreaming: true,
    parameters: [
      { name: "Authorization", type: "string", location: "header", required: true, description: "Bearer <Supabase_JWT_Token>" },
      { name: "chatId", type: "string", location: "query", required: true, description: "The unique chat thread identifier." },
      { name: "sessionId", type: "string", location: "query", required: true, description: "The specific session ID to filter." }
    ],
    responseBody: `event: message
data: {"status":"generating","percentage":45,"step":"Generating components...","logs":["Writing index.html","Creating main.css"]}`
  },
  {
    id: "generate-retry-deploy",
    group: "4. Generation & Deployment",
    method: "POST",
    path: "/api/generate/retry-deploy",
    title: "Retry Failed Site Deployment",
    description: "Attempts programmatically to re-deploy a failed deployment using its prior deployment metadata session.",
    parameters: [
      { name: "Authorization", type: "string", location: "header", required: true, description: "Bearer <Supabase_JWT_Token>" },
      { name: "chatId", type: "string", location: "body", required: true, description: "The unique chat identifier." },
      { name: "sessionId", type: "string", location: "body", required: true, description: "The failed deployment session ID." }
    ],
    requestBody: `{
  "chatId": "chat_uuid_98765",
  "sessionId": "deploy_12345"
}`,
    responseBody: `{
  "success": true,
  "data": {
    "deploymentId": "deploy_retry_67890",
    "status": "triggered"
  },
  "error": null
}`
  },
  {
    id: "generate-retry-generate",
    group: "4. Generation & Deployment",
    method: "POST",
    path: "/api/generate/retry-generate",
    title: "Retry Failed Code Generation",
    description: "Attempts programmatically to re-run a compiler build pipeline that failed during code generation.",
    parameters: [
      { name: "Authorization", type: "string", location: "header", required: true, description: "Bearer <Supabase_JWT_Token>" },
      { name: "chatId", type: "string", location: "body", required: true, description: "The unique chat identifier." },
      { name: "sessionId", type: "string", location: "body", required: true, description: "The failed generation session ID." }
    ],
    requestBody: `{
  "chatId": "chat_uuid_98765",
  "sessionId": "gen_session_abcde"
}`,
    responseBody: `{
  "success": true,
  "data": {
    "generationId": "gen_retry_78901",
    "status": "retrying"
  },
  "error": null
}`
  },
  {
    id: "generate-save-edits",
    group: "4. Generation & Deployment",
    method: "POST",
    path: "/api/generate/save-edits",
    title: "Save Manual Code Edits",
    description: "Saves manual code edits, changes, and layout patches supplied directly inside the editor panels.",
    parameters: [
      { name: "Authorization", type: "string", location: "header", required: true, description: "Bearer <Supabase_JWT_Token>" },
      { name: "route", type: "string", location: "body", required: true, description: "The file path targeted (e.g. '/index.html')." },
      { name: "operations", type: "array", location: "body", required: true, description: "patches arrays parameters list." },
      { name: "genId", type: "string", location: "body", required: false, description: "Optional snapshot ID pointer." }
    ],
    requestBody: `{
  "route": "/index.html",
  "operations": [
    {"type": "replace", "path": "/html/body/h1", "value": "Welcome to my portfolio"}
  ],
  "genId": "gen_session_abcde"
}`,
    responseBody: `{
  "success": true,
  "data": {
    "success": true,
    "updatedAt": "2026-05-28T19:33:00.000Z",
    "snapshotId": "snapshot_uuid_9999"
  },
  "error": null
}`
  },

  // 5. Preferences Endpoints
  {
    id: "pref-byok-get",
    group: "5. Preferences Endpoints",
    method: "GET",
    path: "/api/preferences/byok-toggle",
    title: "Set BYOK Toggle Status (URL)",
    description: "Sets and updates BYOK toggle states for the authenticated user using query arguments.",
    parameters: [
      { name: "Authorization", type: "string", location: "header", required: true, description: "Bearer <Supabase_JWT_Token>" },
      { name: "byokEnabled", type: "string", location: "query", required: true, description: "Enabled status: 'true' | 'false'." }
    ],
    responseBody: `{
  "success": true,
  "data": {
    "byokEnabled": true
  },
  "error": null
}`
  },
  {
    id: "pref-byok-post",
    group: "5. Preferences Endpoints",
    method: "POST",
    path: "/api/preferences/byok-toggle",
    title: "Set BYOK Toggle Status (JSON)",
    description: "Sets and updates BYOK toggle states for the authenticated user using a JSON request body.",
    parameters: [
      { name: "Authorization", type: "string", location: "header", required: true, description: "Bearer <Supabase_JWT_Token>" },
      { name: "byokEnabled", type: "boolean", location: "body", required: true, description: "Enabled boolean state value." }
    ],
    requestBody: `{
  "byokEnabled": true
}`,
    responseBody: `{
  "success": true,
  "data": {
    "byokEnabled": true
  },
  "error": null
}`
  },
  {
    id: "pref-get-preferences",
    group: "5. Preferences Endpoints",
    method: "GET",
    path: "/api/preferences/get-preferences",
    title: "Retrieve Workspace Preferences",
    description: "Retrieves all preferred workspace configuration states for the authenticated user.",
    parameters: [
      { name: "Authorization", type: "string", location: "header", required: true, description: "Bearer <Supabase_JWT_Token>" }
    ],
    responseBody: `{
  "success": true,
  "data": {
    "preferredModel": "claude-3-5-sonnet",
    "preferredProvider": "anthropic",
    "byokEnabled": true
  },
  "error": null
}`
  },
  {
    id: "pref-update-model",
    group: "5. Preferences Endpoints",
    method: "POST",
    path: "/api/preferences/update-model",
    title: "Update Preferred Model",
    description: "Modifies the default preferred language model used for the user's conversation triggers.",
    parameters: [
      { name: "Authorization", type: "string", location: "header", required: true, description: "Bearer <Supabase_JWT_Token>" },
      { name: "model", type: "string", location: "body", required: true, description: "Model system identifier (e.g. 'gpt-4o')." }
    ],
    requestBody: `{
  "model": "gpt-4o"
}`,
    responseBody: `{
  "success": true,
  "data": {
    "preferredModel": "gpt-4o"
  },
  "error": null
}`
  },
  {
    id: "pref-update-provider",
    group: "5. Preferences Endpoints",
    method: "POST",
    path: "/api/preferences/update-provider",
    title: "Update Preferred Provider",
    description: "Modifies the default preferred LLM provider choice for model invocations.",
    parameters: [
      { name: "Authorization", type: "string", location: "header", required: true, description: "Bearer <Supabase_JWT_Token>" },
      { name: "provider", type: "string", location: "body", required: true, description: "Provider identifier (e.g. 'openai')." }
    ],
    requestBody: `{
  "provider": "openai"
}`,
    responseBody: `{
  "success": true,
  "data": {
    "preferredProvider": "openai"
  },
  "error": null
}`
  }
];
