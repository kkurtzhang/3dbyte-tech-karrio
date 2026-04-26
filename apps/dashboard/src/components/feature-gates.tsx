"use client";

import {
  useAdminGraphQLCapabilities,
  useGraphQLCapabilities,
} from "@karrio/hooks/graphql-capabilities";
import { useAPIMetadata } from "@karrio/hooks/api-metadata";
import { FeatureUnavailable, Spinner } from "@karrio/ui/components";
import { useUser } from "@karrio/hooks/user";
import dynamic from "next/dynamic";

const AppStorePage = dynamic(() => import("@karrio/app-store/modules/Store"), {
  ssr: false,
});
const DeveloperAppsPage = dynamic(
  () => import("@karrio/developers/modules/apps"),
  { ssr: false },
);
const PlatformPage = dynamic(() => import("@karrio/admin/modules/platform"), {
  ssr: false,
});
const StaffPage = dynamic(() => import("@karrio/admin/modules/staff"), {
  ssr: false,
});
const CarrierNetworkPage = dynamic(
  () => import("@karrio/admin/modules/carriers"),
  { ssr: false },
);

export function AppStoreGate() {
  const { metadata } = useAPIMetadata();
  const capabilities = useGraphQLCapabilities({
    enabled: !!metadata?.APPS_MANAGEMENT,
  });

  if (!metadata) return <Spinner />;

  if (!metadata?.APPS_MANAGEMENT) {
    return (
      <FeatureUnavailable
        title="App Store is not available"
        description="This API instance does not advertise app management support."
      />
    );
  }

  if (capabilities.query.isLoading) return <Spinner />;

  if (!capabilities.appsManagement) {
    return (
      <FeatureUnavailable
        title="App Store is not available"
        description="This API schema does not expose the app installation and OAuth app fields required by the dashboard."
      />
    );
  }

  return <AppStorePage />;
}

export function DeveloperAppsGate() {
  const { metadata } = useAPIMetadata();
  const capabilities = useGraphQLCapabilities({
    enabled: !!metadata?.APPS_MANAGEMENT,
  });

  if (!metadata) return <Spinner />;

  if (!metadata?.APPS_MANAGEMENT) {
    return (
      <FeatureUnavailable
        title="Developer apps are not available"
        description="This API instance does not advertise app management support."
      />
    );
  }

  if (capabilities.query.isLoading) return <Spinner />;

  if (!capabilities.oauthApps) {
    return (
      <FeatureUnavailable
        title="Developer apps are not available"
        description="This API schema does not expose the OAuth app fields required by the dashboard."
      />
    );
  }

  return <DeveloperAppsPage />;
}

export function PlatformGate() {
  const { metadata } = useAPIMetadata();
  const {
    query: { data: { user } = {} },
  } = useUser();
  const capabilities = useAdminGraphQLCapabilities({
    enabled: !!(metadata?.ADMIN_DASHBOARD && user?.is_staff),
  });

  if (!metadata) return <Spinner />;

  if (!metadata?.ADMIN_DASHBOARD || !user?.is_staff) {
    return (
      <FeatureUnavailable
        title="Platform console is not available"
        description="This user or API instance does not advertise admin dashboard support."
      />
    );
  }

  if (capabilities.query.isLoading) return <Spinner />;

  if (!capabilities.platform) {
    return (
      <FeatureUnavailable
        title="Platform console is not available"
        description="This admin API schema does not expose the platform configuration fields required by the dashboard."
      />
    );
  }

  return <PlatformPage />;
}

export function StaffGate() {
  const { metadata } = useAPIMetadata();
  const {
    query: { data: { user } = {} },
  } = useUser();
  const capabilities = useAdminGraphQLCapabilities({
    enabled: !!(metadata?.ADMIN_DASHBOARD && user?.is_staff),
  });

  if (!metadata) return <Spinner />;

  if (!metadata?.ADMIN_DASHBOARD || !user?.is_staff) {
    return (
      <FeatureUnavailable
        title="Staff management is not available"
        description="This user or API instance does not advertise admin dashboard support."
      />
    );
  }

  if (capabilities.query.isLoading) return <Spinner />;

  if (!capabilities.staff) {
    return (
      <FeatureUnavailable
        title="Staff management is not available"
        description="This admin API schema does not expose the staff and permission fields required by the dashboard."
      />
    );
  }

  return <StaffPage />;
}

export function CarrierNetworkGate() {
  const { metadata } = useAPIMetadata();
  const {
    query: { data: { user } = {} },
  } = useUser();
  const capabilities = useAdminGraphQLCapabilities({
    enabled: !!(metadata?.ADMIN_DASHBOARD && user?.is_staff),
  });

  if (!metadata) return <Spinner />;

  if (!metadata?.ADMIN_DASHBOARD || !user?.is_staff) {
    return (
      <FeatureUnavailable
        title="Carrier network is not available"
        description="This user or API instance does not advertise admin dashboard support."
      />
    );
  }

  if (capabilities.query.isLoading) return <Spinner />;

  if (!capabilities.carrierNetwork) {
    return (
      <FeatureUnavailable
        title="Carrier network is not available"
        description="This admin API schema does not expose the system carrier, rate sheet, and markup fields required by the dashboard."
      />
    );
  }

  return <CarrierNetworkPage />;
}
