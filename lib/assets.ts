export type ResponsiveAsset = {
  desktop: string;
  mobile: string;
  alt: string;
};

const base = "/assets";

export const assets = {
  hero: {
    desktop: `${base}/hero/desktop/ember-dusk-hero-warm-front-3q.webp`,
    mobile: `${base}/hero/mobile/ember-dusk-hero-mobile.webp`,
    alt: "The Ember Dusk parked outside a warm modern residence at dusk.",
  },
  exterior: [
    {
      desktop: `${base}/exterior/main/desktop/ember-dusk-exterior-front-3q.webp`,
      mobile: `${base}/exterior/main/mobile/ember-dusk-exterior-front-3q.webp`,
      alt: "Front three-quarter view of the Ember Dusk with warm architectural reflections.",
    },
    {
      desktop: `${base}/exterior/main/desktop/ember-dusk-exterior-side-profile.webp`,
      mobile: `${base}/exterior/main/mobile/ember-dusk-exterior-side-profile.webp`,
      alt: "Side profile of the Ember Dusk showing its coupe-like SUV silhouette.",
    },
    {
      desktop: `${base}/exterior/main/desktop/Use_the_provided_Ember_Dusk_202605151902.webp`,
      mobile: `${base}/exterior/main/mobile/Use_the_provided_Ember_Dusk_202605151901.webp`,
      alt: "Elevated view of the Ember Dusk in a warm courtyard.",
    },
    {
      desktop: `${base}/exterior/main/desktop/Use_the_provided_Ember_Dusk_202605151904.webp`,
      mobile: `${base}/exterior/main/mobile/Use_the_provided_Ember_Dusk_202605151904%20%281%29.webp`,
      alt: "Rear three-quarter view of the Ember Dusk in a desert-modern setting.",
    },
    {
      desktop: `${base}/exterior/main/desktop/Use_the_provided_Ember_Dusk_202605151909.webp`,
      mobile: `${base}/exterior/main/mobile/Use_the_provided_Ember_Dusk_202605151908.webp`,
      alt: "Close exterior detail of the Ember Dusk surface and wheel.",
    },
    {
      desktop: `${base}/exterior/main/desktop/Use_the_provided_Ember_Dusk_202605151859.webp`,
      mobile: `${base}/exterior/main/mobile/Use_the_provided_Ember_Dusk_202605151859%20%281%29.webp`,
      alt: "Rear three-quarter view of the Ember Dusk in a warm modern courtyard.",
    },
  ] satisfies ResponsiveAsset[],
  interior: {
    main: {
      desktop: `${base}/interior/main/desktop/Use_the_provided_Ember_Dusk_202605151911.webp`,
      mobile: `${base}/interior/main/mobile/Use_the_provided_Ember_Dusk_202605151911%20%281%29.webp`,
      alt: "Warm Ember Dusk cabin with smoked glass displays and tactile materials.",
    },
    console: {
      desktop: `${base}/interior/main/desktop/ember_dusk_console_glass_detail_202605151925.webp`,
      mobile: `${base}/interior/main/mobile/ember_dusk_console_glass_detail_202605151923.webp`,
      alt: "Smoked glass console detail inside the Ember Dusk cabin.",
    },
    material: {
      desktop: `${base}/interior/main/desktop/ember_dusk_material_detail_seat_202605151931%20%281%29.webp`,
      mobile: `${base}/interior/main/mobile/ember_dusk_material_detail_seat_202605151931.webp`,
      alt: "Close material detail of the Ember Dusk interior seating.",
    },
    video: `${base}/interior/video/Ember_dusk_cabin_ui_glow_202605151919.mov`,
  },
  cta: {
    desktop: `${base}/cta/desktop/ember_private_test_drive_arrival_202605151938.webp`,
    mobile: `${base}/cta/mobile/ember_private_test_drive_arrival_202605151938%20%281%29.webp`,
    alt: "The Ember Dusk staged for a private test drive arrival.",
  },
  features: {
    details: [
      {
        desktop: `${base}/features/detail%20renders/desktop/ember_dusk_feature_detail_01_202605151932%20%281%29.webp`,
        mobile: `${base}/features/detail%20renders/mobile/ember_dusk_feature_detail_01_202605151932.webp`,
        alt: "Warm exterior wheel and body detail of the Ember Dusk.",
      },
      {
        desktop: `${base}/features/detail%20renders/desktop/ember_dusk_feature_detail_01_202605151936.webp`,
        mobile: `${base}/features/detail%20renders/mobile/ember_dusk_feature_detail_01_202605151936%20%281%29.webp`,
        alt: "Vertical detail render showing Ember Dusk luxury surface treatment.",
      },
    ] satisfies ResponsiveAsset[],
    icons: {
      range: `${base}/features/icons/long%20range%20electric%20driving.webp`,
      performance: `${base}/features/icons/silent%20performance.webp`,
      luxury: `${base}/features/icons/tactile%20luxury%20interior.webp`,
      technology: `${base}/features/icons/invisible%20integrated%20tech.webp`,
      drive: `${base}/features/icons/private%20test%20drive%20experience.webp`,
    },
  },
  footer: {
    texture: `${base}/footer/textures/ember_footer_warm_texture_Create_202605151942.webp`,
    detail: `${base}/footer/details/ember_dusk_surface_reflection_footer_202605151944.webp`,
  },
} as const;
