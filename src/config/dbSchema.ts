export interface Column {
  name: string;
  type: string;
  isPk: boolean;
  isFk: boolean;
  fkRef?: string;
  nullable: boolean;
  description: string;
}

export interface Table {
  name: string;
  description: string;
  engine: string;
  columns: Column[];
  relationships: {
    parents: string[];
    children: string[];
  };
}

export interface Bucket {
  name: string;
  type: string;
  service: string;
  project: string;
  description: string;
}

export interface EnumType {
  name: string;
  allowedValues: string[];
}

export const bucketsConfig: Bucket[] = [
  {
    name: "builder_templates",
    type: "Object Storage (bucket storage)",
    service: "GCS (Google Cloud Storage)",
    project: "qwintly",
    description: "Houses baseline boilerplate zip directories used to initialize site code structures in the build pipelines."
  },
  {
    name: "gen_project_snapshots",
    type: "Object Storage (bucket storage)",
    service: "GCS (Google Cloud Storage)",
    project: "generated-sites",
    description: "Contains compressed archive zip builds representing deployed revisions of customer-facing dynamic web applications."
  }
];

export const enumsConfig: EnumType[] = [
  {
    name: "roles",
    allowedValues: ["user", "model"]
  },
  {
    name: "tool_call_status",
    allowedValues: ["pending", "success", "failed"]
  },
  {
    name: "task_status",
    allowedValues: ["pending", "updated", "implemented", "implementing", "failed"]
  },
  {
    name: "msg_type",
    allowedValues: ["message", "plan", "questions"]
  },
  {
    name: "event_type",
    allowedValues: ["step_started", "step_finished", "step_error", "step_retry", "generation_completed", "generation_failed"]
  },
  {
    name: "gen_step",
    allowedValues: ["initiating", "building", "deploying", "completed"]
  },
  {
    name: "op_status",
    allowedValues: ["queued", "applied"]
  }
];

export const tablesConfig: Table[] = [
  {
    name: "users",
    description: "Core client user accounts representing registered engineers, developers, or model consumers.",
    engine: "PostgreSQL (Supabase)",
    columns: [
      { name: "id", type: "UUID", isPk: true, isFk: false, nullable: false, description: "Unique auto-generated identifier." },
      { name: "name", type: "TEXT", isPk: false, isFk: false, nullable: false, description: "Full display name of the user." },
      { name: "email", type: "TEXT", isPk: false, isFk: false, nullable: false, description: "Contact and login email address." },
      { name: "created_at", type: "TIMESTAMPTZ", isPk: false, isFk: false, nullable: false, description: "User registration timestamp." }
    ],
    relationships: {
      parents: [],
      children: ["chats", "user_api_keys", "usage_preferences", "usage_limits"]
    }
  },
  {
    name: "usage_preferences",
    description: "Personal preferences set by users mapping preferred model endpoints and BYOK (Bring Your Own Key) toggles.",
    engine: "PostgreSQL (Supabase)",
    columns: [
      { name: "id", type: "UUID", isPk: true, isFk: true, fkRef: "users.id", nullable: false, description: "Primary key referencing the owning user profile." },
      { name: "pref_model", type: "STRING", isPk: false, isFk: false, nullable: false, description: "Developer preference index for primary language model (e.g. 'claude-3-5-sonnet')." },
      { name: "pref_provider", type: "STRING", isPk: false, isFk: false, nullable: false, description: "Developer preference index for backend providers (e.g. 'anthropic', 'google')." },
      { name: "byok_enabled", type: "BOOLEAN", isPk: false, isFk: false, nullable: false, description: "Toggle mapping if model calls utilize users' personal API keys." }
    ],
    relationships: {
      parents: ["users"],
      children: []
    }
  },
  {
    name: "usage_limits",
    description: "Operational quota boundaries bounding generation volumes and docker deployments permitted per user.",
    engine: "PostgreSQL (Supabase)",
    columns: [
      { name: "id", type: "UUID", isPk: true, isFk: true, fkRef: "users.id", nullable: false, description: "Primary key linked back to target user account details." },
      { name: "gen_limit", type: "INT4", isPk: false, isFk: false, nullable: false, description: "Maximum permitted generation sessions limit count per billing cycle. Defaults to 1." },
      { name: "deploy_limit", type: "INT4", isPk: false, isFk: false, nullable: false, description: "Maximum permitted static site cloud deployments. Defaults to 2." },
      { name: "created_at", type: "TIMESTAMPTZ", isPk: false, isFk: false, nullable: false, description: "Initial limits assignment record." }
    ],
    relationships: {
      parents: ["users"],
      children: []
    }
  },
  {
    name: "chats",
    description: "The core chat conversation ledger storing individual generated site session metadata and configuration states.",
    engine: "PostgreSQL (Supabase)",
    columns: [
      { name: "id", type: "UUID", isPk: true, isFk: false, nullable: false, description: "Unique conversation session identifier." },
      { name: "created_at", type: "TIMESTAMPTZ", isPk: false, isFk: false, nullable: false, description: "Session creation record timestamp." },
      { name: "title", type: "TEXT", isPk: false, isFk: false, nullable: false, description: "Automatic conversation summary title generated by models." },
      { name: "user_id", type: "UUID", isPk: false, isFk: true, fkRef: "users.id", nullable: false, description: "References parent account identity inside users table." },
      { name: "updated_at", type: "TIMESTAMPTZ", isPk: false, isFk: false, nullable: false, description: "Last session update snapshot timestamp." },
      { name: "is_generating", type: "BOOLEAN", isPk: false, isFk: false, nullable: false, description: "Active generation state indicator flag." }
    ],
    relationships: {
      parents: ["users"],
      children: ["messages", "chat_tool_calls", "project_context", "project_questions", "project_tasks", "project_sites", "generation_events", "generation_sessions"]
    }
  },
  {
    name: "messages",
    description: "Chronological ledger cataloging individual text communications within conversation sessions.",
    engine: "PostgreSQL (Supabase)",
    columns: [
      { name: "id", type: "UUID", isPk: true, isFk: false, nullable: false, description: "Message unique key code identifier." },
      { name: "conv_id", type: "UUID", isPk: false, isFk: true, fkRef: "chats.id", nullable: false, description: "Backing link pointing to session parent." },
      { name: "seq", type: "INT4", isPk: false, isFk: false, nullable: false, description: "Incremental sequential sorting order index within conversation." },
      { name: "role", type: "roles (enum)", isPk: false, isFk: false, nullable: false, description: "Designation of sender role type." },
      { name: "content", type: "TEXT", isPk: false, isFk: false, nullable: false, description: "Raw textual message logs." },
      { name: "token_count", type: "INT4", isPk: false, isFk: false, nullable: false, description: "Total token footprints measured for context." },
      { name: "created_at", type: "TIMESTAMPTZ", isPk: false, isFk: false, nullable: false, description: "Message delivery completion timestamp." },
      { name: "msg_type", type: "msg_type (enum)", isPk: false, isFk: false, nullable: false, description: "Classification category designation." },
      { name: "summary", type: "TEXT", isPk: false, isFk: false, nullable: true, description: "Dynamic synopsis computed for workspace loads." }
    ],
    relationships: {
      parents: ["chats"],
      children: ["chat_tool_calls", "project_questions", "project_tasks", "generation_sessions"]
    }
  },
  {
    name: "chat_tool_calls",
    description: "In-depth record capturing execution timelines, parameters, outputs, and status checks of model actions.",
    engine: "PostgreSQL (Supabase)",
    columns: [
      { name: "id", type: "UUID", isPk: true, isFk: false, nullable: false, description: "Tool invocation slot identification index." },
      { name: "conv_id", type: "UUID", isPk: false, isFk: true, fkRef: "chats.id", nullable: false, description: "Target conversation scope." },
      { name: "message_id", type: "UUID", isPk: false, isFk: true, fkRef: "messages.id", nullable: false, description: "Associated text message trigger references." },
      { name: "created_at", type: "TIMESTAMPTZ", isPk: false, isFk: false, nullable: false, description: "Creation timing index record." },
      { name: "tool_name", type: "TEXT", isPk: false, isFk: false, nullable: false, description: "System name designation of triggered tool." },
      { name: "arguments", type: "JSONB", isPk: false, isFk: false, nullable: false, description: "Parsed arguments parameters map." },
      { name: "result", type: "JSONB", isPk: false, isFk: false, nullable: true, description: "Raw results outputs returned." },
      { name: "summary", type: "JSONB", isPk: false, isFk: false, nullable: true, description: "Simplified status recap metadata." },
      { name: "status", type: "tool_call_status (enum)", isPk: false, isFk: false, nullable: false, description: "Outcome state." }
    ],
    relationships: {
      parents: ["chats", "messages"],
      children: ["project_questions", "project_tasks"]
    }
  },
  {
    name: "project_context",
    description: "Aggregated workspace layouts, repository properties, and specific guidelines compiled for conversation flows.",
    engine: "PostgreSQL (Supabase)",
    columns: [
      { name: "id", type: "UUID", isPk: true, isFk: true, fkRef: "chats.id", nullable: false, description: "Shared primary and foreign link linking session parent." },
      { name: "collected_context", type: "JSONB", isPk: false, isFk: false, nullable: false, description: "Deep context scans and environment logs." },
      { name: "project_info", type: "JSONB", isPk: false, isFk: false, nullable: false, description: "Primary metadata detailing project types." },
      { name: "updated_at", type: "TIMESTAMPTZ", isPk: false, isFk: false, nullable: false, description: "Synchronization record update timestamp." }
    ],
    relationships: {
      parents: ["chats"],
      children: []
    }
  },
  {
    name: "user_api_keys",
    description: "Secure workspace holding client cloud API tokens and key parameters, encrypted in Transit and at Rest.",
    engine: "PostgreSQL (Supabase)",
    columns: [
      { name: "id", type: "UUID", isPk: true, isFk: false, nullable: false, description: "Credential slot identification id." },
      { name: "user_id", type: "UUID", isPk: false, isFk: true, fkRef: "users.id", nullable: false, description: "Owning customer credentials account link." },
      { name: "provider", type: "TEXT", isPk: false, isFk: false, nullable: false, description: "Service key target provider." },
      { name: "encrypted_key", type: "TEXT", isPk: false, isFk: false, nullable: false, description: "Vault-encrypted credentials block." },
      { name: "created_at", type: "TIMESTAMPTZ", isPk: false, isFk: false, nullable: false, description: "Creation timing record." },
      { name: "updated_at", type: "TIMESTAMPTZ", isPk: false, isFk: false, nullable: false, description: "Modification timing record." },
      { name: "key_version", type: "TEXT", isPk: false, isFk: false, nullable: false, description: "Target encryption model index pointer." }
    ],
    relationships: {
      parents: ["users"],
      children: []
    }
  },
  {
    name: "project_questions",
    description: "Clarifying question queues compiled programmatically to resolve development gaps dynamically.",
    engine: "PostgreSQL (Supabase)",
    columns: [
      { name: "id", type: "UUID", isPk: true, isFk: false, nullable: false, description: "Checklist queue tracking identifier." },
      { name: "conv_id", type: "UUID", isPk: false, isFk: true, fkRef: "chats.id", nullable: false, description: "Owning conversation session tracking." },
      { name: "message_id", type: "UUID", isPk: false, isFk: true, fkRef: "messages.id", nullable: false, description: "Associated text message trigger context." },
      { name: "questions", type: "JSONB", isPk: false, isFk: false, nullable: false, description: "Nested choices structures generated by model." },
      { name: "user_responses", type: "JSONB", isPk: false, isFk: false, nullable: true, description: "Direct inputs supplied by client." },
      { name: "created_at", type: "TIMESTAMPTZ", isPk: false, isFk: false, nullable: false, description: "Question generation timestamp." },
      { name: "tool_id", type: "UUID", isPk: false, isFk: true, fkRef: "chat_tool_calls.id", nullable: false, description: "Associated tool dispatcher thread." }
    ],
    relationships: {
      parents: ["chats", "messages", "chat_tool_calls"],
      children: []
    }
  },
  {
    name: "project_tasks",
    description: "Real-time task checklists generated during plans tracking step status.",
    engine: "PostgreSQL (Supabase)",
    columns: [
      { name: "id", type: "UUID", isPk: true, isFk: false, nullable: false, description: "Task row checklist identification index." },
      { name: "conv_id", type: "UUID", isPk: false, isFk: true, fkRef: "chats.id", nullable: false, description: "Parent session reference link." },
      { name: "message_id", type: "UUID", isPk: false, isFk: true, fkRef: "messages.id", nullable: false, description: "Message timeline index context." },
      { name: "content", type: "JSONB", isPk: false, isFk: false, nullable: false, description: "Task cards, checklists and labels structure." },
      { name: "status", type: "task_status (enum)", isPk: false, isFk: false, nullable: false, description: "Checklist execution state." },
      { name: "created_at", type: "TIMESTAMPTZ", isPk: false, isFk: false, nullable: false, description: "Initial plan initialization record." },
      { name: "tool_id", type: "UUID", isPk: false, isFk: true, fkRef: "chat_tool_calls.id", nullable: false, description: "Linked parent tool call sequence reference." }
    ],
    relationships: {
      parents: ["chats", "messages", "chat_tool_calls"],
      children: ["generation_sessions"]
    }
  },
  {
    name: "project_sites",
    description: "Public subdomains, revision indicators, and server instances hosting completed web applications.",
    engine: "PostgreSQL (Supabase)",
    columns: [
      { name: "id", type: "UUID", isPk: true, isFk: false, nullable: false, description: "Compiled site instance unique identifier." },
      { name: "conv_id", type: "UUID", isPk: false, isFk: true, fkRef: "chats.id", nullable: false, description: "Linked conversation session parent." },
      { name: "url", type: "TEXT", isPk: false, isFk: false, nullable: false, description: "Static public web deployment access address." },
      { name: "version", type: "INT4", isPk: false, isFk: false, nullable: false, description: "Incremental static revision index count." },
      { name: "last_modified", type: "TIMESTAMPTZ", isPk: false, isFk: false, nullable: false, description: "Publish completion timeline." },
      { name: "cloudrun_url", type: "TEXT", isPk: false, isFk: false, nullable: false, description: "Backing docker runtime routing address." },
      { name: "gen_id", type: "UUID", isPk: false, isFk: true, fkRef: "generation_sessions.id", nullable: false, description: "Parent compilation session reference." }
    ],
    relationships: {
      parents: ["chats", "generation_sessions"],
      children: []
    }
  },
  {
    name: "generation_sessions",
    description: "Active deployment pipeline orchestrating parsing, compilation, and file syncing routines.",
    engine: "PostgreSQL (Supabase)",
    columns: [
      { name: "id", type: "UUID", isPk: true, isFk: false, nullable: false, description: "Pipeline session tracker index." },
      { name: "conv_id", type: "UUID", isPk: false, isFk: true, fkRef: "chats.id", nullable: false, description: "Ecosystem conversation scope." },
      { name: "step", type: "gen_step (enum)", isPk: false, isFk: false, nullable: false, description: "Current execution phase index." },
      { name: "created_at", type: "TIMESTAMPTZ", isPk: false, isFk: false, nullable: false, description: "Pipeline run takeoff timestamp." },
      { name: "last_modified", type: "TIMESTAMPTZ", isPk: false, isFk: false, nullable: false, description: "Heartbeats log update timeline." },
      { name: "plan_id", type: "UUID", isPk: false, isFk: true, fkRef: "project_tasks.id", nullable: false, description: "References dynamically tracked dev task plan." },
      { name: "status", type: "task_status (enum)", isPk: false, isFk: false, nullable: false, description: "Success metrics checklist status indicator." },
      { name: "message_id", type: "UUID", isPk: false, isFk: true, fkRef: "messages.id", nullable: false, description: "Linked chat message triggering session." }
    ],
    relationships: {
      parents: ["chats", "messages", "project_tasks"],
      children: ["project_sites", "generation_events", "generation_snapshots", "gen_tool_calls", "project_operations", "gen_tokens_consumed"]
    }
  },
  {
    name: "generation_events",
    description: "High-volume stream database holding chronological debugging logs emitted by builders and compilers.",
    engine: "PostgreSQL (Supabase)",
    columns: [
      { name: "id", type: "UUID", isPk: true, isFk: false, nullable: false, description: "Diagnostic event sequential key log." },
      { name: "conv_id", type: "UUID", isPk: false, isFk: true, fkRef: "chats.id", nullable: false, description: "Active session monitoring links." },
      { name: "gen_id", type: "UUID", isPk: false, isFk: true, fkRef: "generation_sessions.id", nullable: false, description: "Linked generation pipeline tracker." },
      { name: "event_type", type: "event_type (enum)", isPk: false, isFk: false, nullable: false, description: "Event classification category label." },
      { name: "step", type: "gen_step (enum)", isPk: false, isFk: false, nullable: false, description: "Associated runtime stage category." },
      { name: "message", type: "TEXT", isPk: false, isFk: false, nullable: false, description: "Raw visual log string outputs." },
      { name: "created_at", type: "TIMESTAMPTZ", isPk: false, isFk: false, nullable: false, description: "Log emission event timestamp." },
      { name: "source", type: "TEXT", isPk: false, isFk: false, nullable: false, description: "Origin code module generating the logs." },
      { name: "seq_num", type: "INT4", isPk: false, isFk: false, nullable: false, description: "Order sequencing alignment." },
      { name: "last_modified", type: "TIMESTAMPTZ", isPk: false, isFk: false, nullable: false, description: "Log metadata mod record." },
      { name: "displayed_summary", type: "BOOLEAN", isPk: false, isFk: false, nullable: false, description: "Console sidebar highlighting indicator." }
    ],
    relationships: {
      parents: ["chats", "generation_sessions"],
      children: []
    }
  },
  {
    name: "generation_snapshots",
    description: "Complete file layouts, workspace configs, and target parameters compiled for dynamic deployment builds.",
    engine: "PostgreSQL (Supabase)",
    columns: [
      { name: "id", type: "UUID", isPk: true, isFk: true, fkRef: "generation_sessions.id", nullable: false, description: "Shared primary and foreign index mapped to active session." },
      { name: "created_at", type: "TIMESTAMPTZ", isPk: false, isFk: false, nullable: false, description: "Snapshot archive compilation timeline." },
      { name: "page_config", type: "JSONB", isPk: false, isFk: false, nullable: false, description: "Full layout templates parameters list config." },
      { name: "config_size", type: "INT", isPk: false, isFk: false, nullable: false, description: "Compiled variables size measured in bytes." }
    ],
    relationships: {
      parents: ["generation_sessions"],
      children: []
    }
  },
  {
    name: "gen_tool_calls",
    description: "Low-level diagnostic metrics tracking secondary sub-modules triggers inside pipelines.",
    engine: "PostgreSQL (Supabase)",
    columns: [
      { name: "id", type: "UUID", isPk: true, isFk: false, nullable: false, description: "Low-level tool invocation slot identification." },
      { name: "gen_id", type: "UUID", isPk: false, isFk: true, fkRef: "generation_sessions.id", nullable: false, description: "Linked compiler run tracker reference." },
      { name: "tool_call_name", type: "TEXT", isPk: false, isFk: false, nullable: false, description: "Internal script or function utility executed." },
      { name: "tool_params", type: "JSONB", isPk: false, isFk: false, nullable: false, description: "Supplied parameters parameters config." },
      { name: "tool_final_output", type: "JSONB", isPk: false, isFk: false, nullable: true, description: "Final execution outcome data packet." }
    ],
    relationships: {
      parents: ["generation_sessions"],
      children: []
    }
  },
  {
    name: "project_operations",
    description: "Sequential mutations, routing changes, and script updates queued to be applied to static pages.",
    engine: "PostgreSQL (Supabase)",
    columns: [
      { name: "id", type: "UUID", isPk: true, isFk: false, nullable: false, description: "Static change deployment queue index." },
      { name: "gen_id", type: "UUID", isPk: false, isFk: true, fkRef: "generation_sessions.id", nullable: false, description: "Linked builder session pointer reference." },
      { name: "route", type: "TEXT", isPk: false, isFk: false, nullable: false, description: "Public URL route segment endpoint path." },
      { name: "status", type: "op_status (enum)", isPk: false, isFk: false, nullable: false, description: "Sync state." },
      { name: "created_at", type: "TIMESTAMPTZ", isPk: false, isFk: false, nullable: false, description: "Queue scheduling timestamp." },
      { name: "operation", type: "JSONB", isPk: false, isFk: false, nullable: false, description: "Full structure of changes cataloged." }
    ],
    relationships: {
      parents: ["generation_sessions"],
      children: []
    }
  },
  {
    name: "gen_tokens_consumed",
    description: "Financial billing logs keeping track of language model queries, input weights, and computed costs.",
    engine: "PostgreSQL (Supabase)",
    columns: [
      { name: "id", type: "UUID", isPk: true, isFk: false, nullable: false, description: "Account ledger sequence id." },
      { name: "gen_id", type: "UUID", isPk: false, isFk: true, fkRef: "generation_sessions.id", nullable: false, description: "Linked generation pipeline tracker." },
      { name: "model_id", type: "UUID", isPk: false, isFk: true, fkRef: "models.id", nullable: false, description: "References backing language model registry row." },
      { name: "input_tokens", type: "INT4", isPk: false, isFk: false, nullable: false, description: "Prompts tokens consumed." },
      { name: "output_tokens", type: "INT4", isPk: false, isFk: false, nullable: false, description: "Generations tokens consumed." },
      { name: "input_cost", type: "NUMERIC(10,2)", isPk: false, isFk: false, nullable: false, description: "Computed prompt costs in USD." },
      { name: "output_cost", type: "NUMERIC(10,2)", isPk: false, isFk: false, nullable: false, description: "Computed generation costs in USD." }
    ],
    relationships: {
      parents: ["generation_sessions", "models"],
      children: []
    }
  },
  {
    name: "models",
    description: "Active catalog of integrated AI model endpoints and routing coefficients.",
    engine: "PostgreSQL (Supabase)",
    columns: [
      { name: "id", type: "UUID", isPk: true, isFk: false, nullable: false, description: "Model records identification index." },
      { name: "model_name", type: "TEXT", isPk: false, isFk: false, nullable: false, description: "Platform name of backing system (e.g. 'gpt-4o', 'claude-3-5')." },
      { name: "provider_id", type: "UUID", isPk: false, isFk: true, fkRef: "providers.id", nullable: false, description: "Linked service provider registry referer." },
      { name: "enabled", type: "BOOLEAN", isPk: false, isFk: false, nullable: false, description: "Availability boolean parameter." }
    ],
    relationships: {
      parents: ["providers"],
      children: ["gen_tokens_consumed", "models_pricing"]
    }
  },
  {
    name: "providers",
    description: "AI service provider registry handling API gateway routings inside pipelines.",
    engine: "PostgreSQL (Supabase)",
    columns: [
      { name: "id", type: "UUID", isPk: true, isFk: false, nullable: false, description: "Provider registry code." },
      { name: "provider", type: "TEXT", isPk: false, isFk: false, nullable: false, description: "Unique name index representation (e.g. 'anthropic', 'openai')." },
      { name: "enabled", type: "BOOLEAN", isPk: false, isFk: false, nullable: false, description: "Provider availability toggle." }
    ],
    relationships: {
      parents: [],
      children: ["models"]
    }
  },
  {
    name: "models_pricing",
    description: "System registry tracking model-by-model pricing variables for billing checks.",
    engine: "PostgreSQL (Supabase)",
    columns: [
      { name: "id", type: "UUID", isPk: true, isFk: true, fkRef: "models.id", nullable: false, description: "Shared primary and foreign link pointing back to model details." },
      { name: "input_cost", type: "NUMERIC(10,2)", isPk: false, isFk: false, nullable: false, description: "Pricing coefficient in dollars per million input tokens." },
      { name: "output_cost", type: "NUMERIC(10,2)", isPk: false, isFk: false, nullable: false, description: "Pricing coefficient in dollars per million output tokens." }
    ],
    relationships: {
      parents: ["models"],
      children: []
    }
  }
];
