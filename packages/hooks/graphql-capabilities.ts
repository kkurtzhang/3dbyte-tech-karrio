"use client";

import { useAuthenticatedQuery, useKarrio } from "./karrio";

type GraphQLField = {
  name: string;
};

type GraphQLCapabilitiesResponse = {
  __type?: {
    fields?: GraphQLField[] | null;
  } | null;
};

type CapabilityOptions = {
  enabled?: boolean;
};

const QUERY_FIELDS_INTROSPECTION = `
  query DashboardGraphQLCapabilities {
    __type(name: "Query") {
      fields {
        name
      }
    }
  }
`;

export function hasGraphQLFields(fields: string[], requiredFields: string[]) {
  return requiredFields.every((field) => fields.includes(field));
}

export function useGraphQLCapabilities({ enabled = true }: CapabilityOptions = {}) {
  const karrio = useKarrio();
  const query = useAuthenticatedQuery<GraphQLCapabilitiesResponse>({
    queryKey: ["graphql_capabilities"],
    queryFn: () =>
      karrio.graphql.request<GraphQLCapabilitiesResponse>(
        QUERY_FIELDS_INTROSPECTION,
      ),
    enabled,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
  const fields = (query.data?.__type?.fields || []).map(({ name }) => name);

  const appStore = hasGraphQLFields(fields, [
    "app_installations",
    "app_installation_by_app_id",
  ]);
  const oauthApps = hasGraphQLFields(fields, ["oauth_apps", "oauth_app"]);

  return {
    query,
    fields,
    appStore,
    oauthApps,
    appsManagement: appStore && oauthApps,
  };
}

export function useAdminGraphQLCapabilities({
  enabled = true,
}: CapabilityOptions = {}) {
  const karrio = useKarrio();
  const query = useAuthenticatedQuery<GraphQLCapabilitiesResponse>({
    queryKey: ["admin_graphql_capabilities"],
    queryFn: () =>
      karrio.admin.request<GraphQLCapabilitiesResponse>(
        QUERY_FIELDS_INTROSPECTION,
      ),
    enabled,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
  const fields = (query.data?.__type?.fields || []).map(({ name }) => name);

  return {
    query,
    fields,
    platform: hasGraphQLFields(fields, [
      "configs",
      "config_fieldsets",
      "config_schema",
    ]),
    staff: hasGraphQLFields(fields, ["users", "user", "permission_groups"]),
    carrierNetwork: hasGraphQLFields(fields, [
      "system_carrier_connections",
      "rate_sheets",
      "markups",
    ]),
  };
}
