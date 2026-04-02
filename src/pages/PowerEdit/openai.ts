// ─── Types ───────────────────────────────────────────────────────────────────

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export type PowerEditAction =
  | { type: 'bulk_edit_column'; col: string; value: string }
  | { type: 'sort_column'; col: string; direction: 'asc' | 'desc' }
  | { type: 'add_field'; fieldName: string }
  | { type: 'remove_column'; col: string }
  | { type: 'reset_column'; col: string }
  | { type: 'edit_cell'; employeeId: number; col: string; value: string }
  | { type: 'add_filter'; field: string; operator: string; value: string }
  | { type: 'set_edit_mode'; mode: 'new-row' | 'correction'; date: string };

export interface TableContext {
  columns: { key: string; label: string }[];
  employees: { id: number; data: Record<string, string> }[];
}

// ─── Tool definitions ─────────────────────────────────────────────────────────

const COL_ENUM = ['name', 'title', 'reportsTo', 'hireDate', 'salary', 'effectiveDate'];

const TOOLS = [
  {
    type: 'function',
    function: {
      name: 'bulk_edit_column',
      description: 'Set every cell in a column to the same value for all visible employees.',
      parameters: {
        type: 'object',
        properties: {
          col: { type: 'string', enum: COL_ENUM, description: 'Column key to edit' },
          value: { type: 'string', description: 'Value to set for every row in the column' },
        },
        required: ['col', 'value'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'sort_column',
      description: 'Sort the table rows by a specific column.',
      parameters: {
        type: 'object',
        properties: {
          col: { type: 'string', enum: COL_ENUM },
          direction: { type: 'string', enum: ['asc', 'desc'] },
        },
        required: ['col', 'direction'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'add_field',
      description:
        'Add a field/column to the table. Available fields: First Name, Last Name, Preferred Name, Job Title, Manager, Hire Date, Pay Rate.',
      parameters: {
        type: 'object',
        properties: {
          fieldName: {
            type: 'string',
            description: 'Must be one of the available field names listed in the description.',
          },
        },
        required: ['fieldName'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'remove_column',
      description: 'Remove a column from the table.',
      parameters: {
        type: 'object',
        properties: { col: { type: 'string', enum: COL_ENUM } },
        required: ['col'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'reset_column',
      description: 'Revert all edited cells in a column back to their original values.',
      parameters: {
        type: 'object',
        properties: { col: { type: 'string', enum: COL_ENUM } },
        required: ['col'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'edit_cell',
      description: 'Edit a single cell for a specific employee.',
      parameters: {
        type: 'object',
        properties: {
          employeeId: { type: 'number', description: 'The employee ID' },
          col: { type: 'string', enum: COL_ENUM },
          value: { type: 'string' },
        },
        required: ['employeeId', 'col', 'value'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'add_filter',
      description: 'Add a filter to narrow the employee list. For example, "show only Product department" or "filter to full-time employees".',
      parameters: {
        type: 'object',
        properties: {
          field: {
            type: 'string',
            enum: ['Department', 'Location', 'Division', 'Employment Type', 'Employment Status', 'Job Title', 'Gender', 'Ethnicity'],
            description: 'The field to filter on.',
          },
          operator: {
            type: 'string',
            enum: ['is', 'is not', 'includes', 'excludes'],
            description: 'The filter operator.',
          },
          value: {
            type: 'string',
            description: 'The value to filter by (e.g. "Product", "Full-Time", "Engineering").',
          },
        },
        required: ['field', 'operator', 'value'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'set_edit_mode',
      description: 'Switch the edit mode to "new-row" (adding a new effective-dated record) or "correction" (fixing an existing record at a specific point in time), and set the associated date.',
      parameters: {
        type: 'object',
        properties: {
          mode: {
            type: 'string',
            enum: ['new-row', 'correction'],
            description: '"new-row" for a new effective-dated record, "correction" for fixing an existing record.',
          },
          date: {
            type: 'string',
            description: 'The effective or correction date in YYYY-MM-DD format.',
          },
        },
        required: ['mode', 'date'],
      },
    },
  },
];

// ─── System prompt ────────────────────────────────────────────────────────────

function buildSystemPrompt(ctx: TableContext): string {
  const colList = ctx.columns.map((c) => `${c.key} (${c.label})`).join(', ');
  const empList = ctx.employees
    .map((e) => {
      const fields = Object.entries(e.data)
        .map(([k, v]) => `${k}: ${v}`)
        .join(', ');
      return `  ID ${e.id}: ${fields}`;
    })
    .join('\n');

  return `You are Power Edit Assistant, an AI embedded in BambooHR's Power Edit tool that helps HR admins make bulk edits to employee data.

Current table columns: ${colList}

Current employees in the table:
${empList}

You can take actions on the table using the provided tools. When the user asks you to make changes, call the appropriate tools to apply them, then confirm what you did in a brief, friendly response.

Column key reference:
- name → employee name
- title → job title
- reportsTo → manager / reports-to
- hireDate → hire date (use MM/DD/YYYY format, e.g. 01/15/2024)
- salary → salary (use formatted string, e.g. "$ 95,000.00")
- effectiveDate → effective date (use YYYY-MM-DD format)

Guidelines:
- Be concise — one or two sentences after applying changes is enough.
- If the user's request is ambiguous, ask a quick clarifying question before acting.
- If you need to edit multiple employees individually, call edit_cell for each one.
- Use add_filter to narrow the employee list when the user says things like "show only Product", "pull in everyone from Engineering", or "filter to full-time employees". The filter immediately updates which employees are visible in the table.
- Use set_edit_mode when the user wants to make a correction (e.g. "I need to correct data as of March 1st", "make a correction for last quarter") — set mode to "correction" and the relevant date. Use mode "new-row" when they want to add a new effective-dated record going forward.`;
}

// ─── API call ─────────────────────────────────────────────────────────────────

interface RawToolCall {
  id: string;
  type: 'function';
  function: { name: string; arguments: string };
}

interface RawMessage {
  role: string;
  content: string | null;
  tool_calls?: RawToolCall[];
}

export async function sendMessage(
  conversation: ChatMessage[],
  tableContext: TableContext,
): Promise<{ content: string; actions: PowerEditAction[] }> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY as string;
  const model = (import.meta.env.VITE_OPENAI_MODEL as string) ?? 'gpt-4.1-mini';

  if (!apiKey || apiKey === 'your_openai_api_key_here') {
    throw new Error('OpenAI API key is not configured. Add VITE_OPENAI_API_KEY to your .env file.');
  }

  const collectedActions: PowerEditAction[] = [];

  // Build initial message list from conversation
  type WireMsg = { role: string; content: string | null; tool_calls?: RawToolCall[]; tool_call_id?: string; name?: string };
  const wireMessages: WireMsg[] = conversation.map((m) => ({ role: m.role, content: m.content }));

  async function callAPI(msgs: WireMsg[]): Promise<string> {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'system', content: buildSystemPrompt(tableContext) }, ...msgs],
        tools: TOOLS,
        tool_choice: 'auto',
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`OpenAI error ${res.status}: ${body}`);
    }

    const data = await res.json();
    const choice = data.choices?.[0];
    const assistantMsg: RawMessage = choice?.message;

    // Handle tool calls
    if (assistantMsg.tool_calls?.length) {
      const toolResults: WireMsg[] = [
        { role: 'assistant', content: assistantMsg.content, tool_calls: assistantMsg.tool_calls },
      ];

      for (const tc of assistantMsg.tool_calls) {
        let result = 'done';
        try {
          const args = JSON.parse(tc.function.arguments);
          switch (tc.function.name) {
            case 'bulk_edit_column':
              collectedActions.push({ type: 'bulk_edit_column', col: args.col, value: args.value });
              result = `Set all ${args.col} values to "${args.value}"`;
              break;
            case 'sort_column':
              collectedActions.push({ type: 'sort_column', col: args.col, direction: args.direction });
              result = `Sorted by ${args.col} ${args.direction}`;
              break;
            case 'add_field':
              collectedActions.push({ type: 'add_field', fieldName: args.fieldName });
              result = `Added field: ${args.fieldName}`;
              break;
            case 'remove_column':
              collectedActions.push({ type: 'remove_column', col: args.col });
              result = `Removed column: ${args.col}`;
              break;
            case 'reset_column':
              collectedActions.push({ type: 'reset_column', col: args.col });
              result = `Reset column: ${args.col}`;
              break;
            case 'edit_cell':
              collectedActions.push({ type: 'edit_cell', employeeId: args.employeeId, col: args.col, value: args.value });
              result = `Updated ${args.col} for employee ${args.employeeId} to "${args.value}"`;
              break;
            case 'add_filter':
              collectedActions.push({ type: 'add_filter', field: args.field, operator: args.operator, value: args.value });
              result = `Added filter: ${args.field} ${args.operator} "${args.value}"`;
              break;
            case 'set_edit_mode':
              collectedActions.push({ type: 'set_edit_mode', mode: args.mode, date: args.date });
              result = `Set edit mode to "${args.mode}" with date ${args.date}`;
              break;
          }
        } catch {
          result = 'error processing tool call';
        }
        toolResults.push({ role: 'tool', content: result, tool_call_id: tc.id });
      }

      // Recurse with tool results to get final response
      return callAPI([...msgs, ...toolResults]);
    }

    return assistantMsg.content ?? '';
  }

  const content = await callAPI(wireMessages);
  return { content, actions: collectedActions };
}
