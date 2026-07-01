// =============================================================================
// GoHighLevel API Client
// =============================================================================

const GHL_BASE_URL = 'https://services.leadconnectorhq.com';

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

async function ghlFetch<T = unknown>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = process.env.GHL_API_TOKEN;
  if (!token) {
    throw new Error('GHL_API_TOKEN environment variable is not set');
  }

  const res = await fetch(`${GHL_BASE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Version: '2021-07-28',
      ...options.headers,
    },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GHL API error ${res.status}: ${body}`);
  }

  return res.json() as Promise<T>;
}

// ---------------------------------------------------------------------------
// Contacts (upsert)
// ---------------------------------------------------------------------------

export interface CreateContactInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  source?: string;
  tags?: string[];
  customFields?: Array<{ key: string; value: string }>;
}

interface GHLContactResponse {
  contact: {
    id: string;
    [key: string]: unknown;
  };
}

/**
 * Create or update a contact in GoHighLevel.
 * Uses the upsert endpoint so duplicate emails are merged automatically.
 */
export async function createContact(data: CreateContactInput) {
  const locationId = process.env.GHL_LOCATION_ID;
  if (!locationId) {
    throw new Error('GHL_LOCATION_ID environment variable is not set');
  }

  const payload: Record<string, unknown> = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    locationId,
    source: data.source ?? 'Website',
  };

  if (data.tags?.length) {
    payload.tags = data.tags;
  }

  if (data.customFields?.length) {
    // GHL v2 /contacts/upsert matches a custom field by `key` (the Field Key set
    // up in GHL) and writes the value via `field_value`. Sending `{ id, value }`
    // silently drops every field. See docs/ghl-custom-fields-setup.md.
    payload.customFields = data.customFields.map((cf) => ({
      key: cf.key,
      field_value: cf.value,
    }));
  }

  const result = await ghlFetch<GHLContactResponse>('/contacts/upsert', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return result.contact;
}

// ---------------------------------------------------------------------------
// Opportunities
// ---------------------------------------------------------------------------

export interface CreateOpportunityInput {
  contactId: string;
  name: string;
  status?: string;
  monetaryValue?: number;
}

interface GHLOpportunityResponse {
  opportunity: {
    id: string;
    [key: string]: unknown;
  };
}

/**
 * Create a new opportunity (deal) in the configured pipeline.
 */
export async function createOpportunity(data: CreateOpportunityInput) {
  const locationId = process.env.GHL_LOCATION_ID;
  const pipelineId = process.env.GHL_PIPELINE_ID;
  const stageId = process.env.GHL_STAGE_NEW_LEAD;

  if (!locationId || !pipelineId || !stageId) {
    throw new Error(
      'Missing required GHL env vars: GHL_LOCATION_ID, GHL_PIPELINE_ID, GHL_STAGE_NEW_LEAD',
    );
  }

  const result = await ghlFetch<GHLOpportunityResponse>('/opportunities/', {
    method: 'POST',
    body: JSON.stringify({
      pipelineId,
      pipelineStageId: stageId,
      locationId,
      contactId: data.contactId,
      name: data.name,
      status: data.status ?? 'open',
      monetaryValue: data.monetaryValue,
    }),
  });

  return result.opportunity;
}
