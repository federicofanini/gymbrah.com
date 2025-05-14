import {
  OpenPanelComponent,
  type PostEventPayload,
  useOpenPanel,
} from "@openpanel/nextjs";

const isProd = process.env.NODE_ENV === "production";

const Provider = () => (
  <OpenPanelComponent
    clientId={process.env.OPEN_PANEL_CLIENT_ID!}
    trackAttributes={true}
    trackScreenViews={isProd}
    trackOutgoingLinks={isProd}
  />
);

// Create a hook to get the track function
const useTrack = () => {
  const { track: openTrack } = useOpenPanel();

  return (options: { event: string } & PostEventPayload["properties"]) => {
    if (!isProd) {
      console.log("Track", options);
      return;
    }

    const { event, ...rest } = options;
    openTrack(event, rest);
  };
};

// Export a track function that uses the hook in components
const track = (options: { event: string } & PostEventPayload["properties"]) => {
  console.warn(
    "track() should only be called within React components. Use useTrack() hook instead."
  );
};

export { Provider, track, useTrack };
