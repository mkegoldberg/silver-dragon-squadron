// Source of truth for the "Piece By Piece" portfolio.
// Content is hardcoded here (no CMS) per the project decision.
//
// Images are Cloudinary public IDs ("sds/<project-slug>/<filename>"), uploaded
// from the original WordPress files by scripts/migrate-images.ts and rendered
// with <NuxtImg> (Cloudinary provider). Originals are backed up on the
// external drive under images/cloudinary_migration/.
//
// Order in this array drives both the grid order and the prev/next nav on
// each project page (first item = newest/top-left, matching the live site).

export interface ProjectImage {
  /** Cloudinary public ID (Cloudinary resizes/crops at delivery time). */
  src: string
  /** Short caption / alt text. */
  alt?: string
  /** Caption shown beneath portrait-variant photos (e.g. Pilot in Command). */
  caption?: string
}

export interface ProjectVideo {
  /** YouTube video id (the part after /embed/ on the live site). */
  id: string
  /** Heading shown above the player on the live site. */
  title: string
}

/** Icon names mirror the Font Awesome glyphs the original tab bars use. */
export type ProjectTabIcon = 'camera' | 'plane' | 'rebel' | 'wrench' | 'video'

export interface ProjectTab {
  label: string
  icon: ProjectTabIcon
  /** Photos shown in this tab's gallery grid. */
  images?: ProjectImage[]
  /** YouTube videos in this tab (rendered by ProjectVideos as preview + lightbox). */
  videos?: ProjectVideo[]
}

export interface Project {
  slug: string
  title: string
  /** Grid cover image (rendered at 320x240 on the index). */
  cover: string
  /** Optional intro copy shown above the gallery. The live site has none today. */
  description?: string
  /** Portfolio filter categories this project belongs to (from the live filter bar). */
  categories: string[]
  /**
   * Gallery layout. 'grid' (default) = the standard responsive grid.
   * 'portraits' = round photo row with captions + Steve's quote (Pilot in Command).
   */
  variant?: 'grid' | 'portraits'
  /**
   * Tab groups, for the pages that split their gallery into tabs on the live
   * site (Wing Assembly, The Move, Canopy). When set, `gallery` is omitted.
   */
  tabs?: ProjectTab[]
  /**
   * Tab bar color scheme, matching the WPBakery vc_tta-color-* class of the
   * original page. Defaults to 'grey'; Canopy uses 'turquoise'.
   */
  tabColor?: 'grey' | 'turquoise'
  /** Gallery images shown on the project detail page. */
  gallery?: ProjectImage[]
  /**
   * Videos shown centered below the gallery, each with its title as a
   * heading (the Engine page's "first start" video on the live site).
   */
  videos?: ProjectVideo[]
}

export const projects: Project[] = [
  {
    slug: 'pilot-in-command',
    title: 'Pilot in Command',
    cover: 'sds/pilot-in-command/emblem',
    categories: ['Acquired over the years'],
    variant: 'portraits',
    gallery: [
      { src: 'sds/pilot-in-command/steve', caption: 'Steve Kim, pilot & builder' },
      { src: 'sds/pilot-in-command/IMG_3585', caption: 'Call sign "Warthog"' },
      { src: 'sds/pilot-in-command/steveback', caption: 'Homage to Tigers in China' },
    ],
  },
  {
    slug: '90-complete',
    title: '90% Complete',
    cover: 'sds/90-complete/90-_cover',
    categories: ['2 cycle oil', 'Body', 'Brakes', 'Canopy', 'Engine', 'motor', 'Nose', 'Shell', 'Steering', 'Thrust', 'Wiring'],
    gallery: [
      { src: 'sds/90-complete/IMG_1504' },
      { src: 'sds/90-complete/IMG_1505' },
      { src: 'sds/90-complete/90-_cover' },
      { src: 'sds/90-complete/IMG_1012' },
      { src: 'sds/90-complete/IMG_1013' },
      { src: 'sds/90-complete/IMG_1014' },
      { src: 'sds/90-complete/IMG_1015' },
      { src: 'sds/90-complete/IMG_1054' },
      { src: 'sds/90-complete/IMG_1055' },
      { src: 'sds/90-complete/IMG_1056' },
      { src: 'sds/90-complete/IMG_1057' },
    ],
  },
  {
    slug: 'parachute',
    title: 'Parachute',
    cover: 'sds/parachute/cat-parachute',
    categories: ['Parachute'],
    gallery: [
      { src: 'sds/parachute/IMG_1294' },
      { src: 'sds/parachute/IMG_1295' },
      { src: 'sds/parachute/IMG_1297' },
      { src: 'sds/parachute/IMG_1299' },
      { src: 'sds/parachute/IMG_1317' },
      { src: 'sds/parachute/IMG_1319' },
      { src: 'sds/parachute/IMG_1321' },
      { src: 'sds/parachute/IMG_1322' },
      { src: 'sds/parachute/IMG_1323' },
      { src: 'sds/parachute/IMG_1524' },
      { src: 'sds/parachute/IMG_1525' },
      { src: 'sds/parachute/IMG_1522' },
      { src: 'sds/parachute/IMG_1523' },
    ],
  },
  {
    slug: 'custom-headsets',
    title: 'Custom Headsets',
    cover: 'sds/custom-headsets/headset_cover',
    categories: ['headset'],
    gallery: [
      { src: 'sds/custom-headsets/IMG_1500' },
      { src: 'sds/custom-headsets/IMG_1499' },
      { src: 'sds/custom-headsets/IMG_1201' },
      { src: 'sds/custom-headsets/IMG_1202' },
      { src: 'sds/custom-headsets/IMG_1190' },
      { src: 'sds/custom-headsets/IMG_1196' },
      { src: 'sds/custom-headsets/IMG_1197' },
      { src: 'sds/custom-headsets/IMG_1198' },
      { src: 'sds/custom-headsets/IMG_1200' },
    ],
  },
  {
    slug: 'instrument-panel',
    title: 'Instrument Panel',
    cover: 'sds/instrument-panel/instrument_panel_cover',
    categories: ['Gears', 'Housing', 'Instrument', 'Steering Column', 'Wiring'],
    gallery: [
      { src: 'sds/instrument-panel/IMG_1402' },
      { src: 'sds/instrument-panel/IMG_1386' },
      { src: 'sds/instrument-panel/IMG_1385' },
      { src: 'sds/instrument-panel/IMG_1383' },
      { src: 'sds/instrument-panel/IMG_1384' },
      { src: 'sds/instrument-panel/IMG_1382' },
      { src: 'sds/instrument-panel/IMG_1123' },
      { src: 'sds/instrument-panel/IMG_1380' },
      { src: 'sds/instrument-panel/IMG_1381' },
      { src: 'sds/instrument-panel/IMG_0871' },
      { src: 'sds/instrument-panel/IMG_1122' },
      { src: 'sds/instrument-panel/IMG_1124' },
      { src: 'sds/instrument-panel/IMG_1125' },
      { src: 'sds/instrument-panel/IMG_0876' },
      { src: 'sds/instrument-panel/IMG_0877' },
      { src: 'sds/instrument-panel/IMG_0875' },
    ],
  },
  {
    slug: 'wing-assembly',
    title: 'Wing Assembly',
    cover: 'sds/wing-assembly/wing_cover',
    categories: ['Wing'],
    tabs: [
      {
        label: 'Photos',
        icon: 'camera',
        images: [
          { src: 'sds/wing-assembly/wing_assbly_cover' },
          { src: 'sds/wing-assembly/IMG_0349' },
          { src: 'sds/wing-assembly/IMG_0352' },
          { src: 'sds/wing-assembly/IMG_0353' },
          { src: 'sds/wing-assembly/IMG_0354' },
          { src: 'sds/wing-assembly/IMG_0355' },
          { src: 'sds/wing-assembly/IMG_0356' },
          { src: 'sds/wing-assembly/IMG_0357' },
          { src: 'sds/wing-assembly/IMG_0388' },
          { src: 'sds/wing-assembly/IMG_0391' },
          { src: 'sds/wing-assembly/IMG_0392' },
          { src: 'sds/wing-assembly/IMG_0394' },
          { src: 'sds/wing-assembly/IMG_0397' },
          { src: 'sds/wing-assembly/IMG_0399' },
          { src: 'sds/wing-assembly/IMG_0468' },
          { src: 'sds/wing-assembly/IMG_0469' },
          { src: 'sds/wing-assembly/IMG_0470' },
          { src: 'sds/wing-assembly/IMG_0473' },
          { src: 'sds/wing-assembly/IMG_0474' },
          { src: 'sds/wing-assembly/IMG_0480' },
          { src: 'sds/wing-assembly/IMG_0486' },
          { src: 'sds/wing-assembly/IMG_0487' },
          { src: 'sds/wing-assembly/IMG_1245' },
          { src: 'sds/wing-assembly/IMG_1246' },
          { src: 'sds/wing-assembly/IMG_1249' },
          { src: 'sds/wing-assembly/IMG_1251' },
          { src: 'sds/wing-assembly/IMG_1253' },
          { src: 'sds/wing-assembly/IMG_1254' },
          { src: 'sds/wing-assembly/IMG_1256' },
          { src: 'sds/wing-assembly/IMG_1262' },
          { src: 'sds/wing-assembly/IMG_1263' },
          { src: 'sds/wing-assembly/IMG_1265' },
        ],
      },
      {
        // The live page repeats IMG_0294 in this tab; deduped here.
        label: 'Blended Winglet',
        icon: 'plane',
        images: [
          { src: 'sds/wing-assembly/IMG_0293' },
          { src: 'sds/wing-assembly/IMG_0294' },
          { src: 'sds/wing-assembly/IMG_0296' },
          { src: 'sds/wing-assembly/IMG_0297' },
          { src: 'sds/wing-assembly/IMG_0330' },
          { src: 'sds/wing-assembly/IMG_0331' },
          { src: 'sds/wing-assembly/IMG_0327' },
          { src: 'sds/wing-assembly/IMG_0424' },
          { src: 'sds/wing-assembly/IMG_0425' },
          { src: 'sds/wing-assembly/IMG_0426' },
          { src: 'sds/wing-assembly/IMG_0427' },
          { src: 'sds/wing-assembly/IMG_0428' },
          { src: 'sds/wing-assembly/IMG_0429' },
          { src: 'sds/wing-assembly/IMG_0430' },
          { src: 'sds/wing-assembly/IMG_0444' },
          { src: 'sds/wing-assembly/IMG_0445' },
        ],
      },
    ],
  },
  {
    slug: 'the-move',
    title: 'The Move',
    cover: 'sds/the-move/moving_thumb',
    categories: ['Transport'],
    tabs: [
      {
        label: 'Videos',
        icon: 'video',
        videos: [
          { id: '5TsIONLv1tE', title: 'Leaving the Garage' },
          { id: 'UJGew9m5xyA', title: 'Arriving' },
          { id: 'BqqJ4XeYW0c', title: 'Pulling Up' },
          { id: 'YcTd0r_4CjE', title: 'Off Loading' },
          { id: 'g1OuAdbie7M', title: 'New Home' },
        ],
      },
      {
        label: 'Photos',
        icon: 'camera',
        images: [
          { src: 'sds/the-move/IMG_0219' },
          { src: 'sds/the-move/IMG_0218' },
          { src: 'sds/the-move/IMG_0217' },
          { src: 'sds/the-move/IMG_0216' },
        ],
      },
    ],
  },
  {
    slug: 'canopy',
    title: 'Canopy',
    cover: 'sds/canopy/H3056-L91000842',
    categories: ['Canopy'],
    tabColor: 'turquoise',
    tabs: [
      {
        label: 'Passenger Canopy',
        icon: 'plane',
        images: [
          { src: 'sds/canopy/IMG_1048-1' },
          { src: 'sds/canopy/IMG_1049' },
          { src: 'sds/canopy/IMG_1050' },
          { src: 'sds/canopy/IMG_1054' },
          { src: 'sds/canopy/IMG_1055' },
        ],
      },
      {
        label: 'Pilot Canopy',
        icon: 'rebel',
        images: [
          { src: 'sds/canopy/IMG_1061' },
          { src: 'sds/canopy/IMG_1062' },
          { src: 'sds/canopy/IMG_1063' },
          { src: 'sds/canopy/IMG_1102' },
          { src: 'sds/canopy/IMG_1103' },
          { src: 'sds/canopy/IMG_1104' },
          { src: 'sds/canopy/IMG_1107' },
          { src: 'sds/canopy/IMG_1108' },
          { src: 'sds/canopy/IMG_2058' },
        ],
      },
      {
        // The live page repeats IMG_6637 in this tab; deduped here.
        label: 'Trim & Installation',
        icon: 'wrench',
        images: [
          { src: 'sds/canopy/IMG_2169' },
          { src: 'sds/canopy/IMG_2305' },
          { src: 'sds/canopy/IMG_2644' },
          { src: 'sds/canopy/IMG_2864' },
          { src: 'sds/canopy/IMG_3323' },
          { src: 'sds/canopy/IMG_3384' },
          { src: 'sds/canopy/IMG_3619' },
          { src: 'sds/canopy/IMG_5530' },
          { src: 'sds/canopy/IMG_5535' },
          { src: 'sds/canopy/IMG_5676' },
          { src: 'sds/canopy/IMG_6044' },
          { src: 'sds/canopy/IMG_6453' },
          { src: 'sds/canopy/IMG_6637' },
          { src: 'sds/canopy/IMG_6853' },
          { src: 'sds/canopy/IMG_7100' },
          { src: 'sds/canopy/IMG_7743' },
          { src: 'sds/canopy/IMG_8733' },
        ],
      },
    ],
  },
  {
    slug: 'oil-caddy',
    title: 'Oil Caddy',
    cover: 'sds/oil-caddy/IMG_4223',
    categories: ['2 cycle oil'],
    gallery: [
      { src: 'sds/oil-caddy/IMG_4219' },
      { src: 'sds/oil-caddy/IMG_4220' },
      { src: 'sds/oil-caddy/IMG_4221' },
      { src: 'sds/oil-caddy/IMG_4223' },
      { src: 'sds/oil-caddy/IMG_4224' },
      { src: 'sds/oil-caddy/IMG_4225' },
      { src: 'sds/oil-caddy/IMG_4230' },
      { src: 'sds/oil-caddy/IMG_4233' },
      { src: 'sds/oil-caddy/IMG_4236' },
      { src: 'sds/oil-caddy/IMG_4238' },
      { src: 'sds/oil-caddy/IMG_4239' },
      { src: 'sds/oil-caddy/IMG_4240' },
      { src: 'sds/oil-caddy/IMG_4241' },
    ],
  },
  {
    slug: 'nose-gear',
    title: 'Nose Gear',
    cover: 'sds/nose-gear/IMG_0560',
    categories: ['Gear', 'Nose'],
    gallery: [
      { src: 'sds/nose-gear/Falcon-Dash-nose-gear-a' },
      { src: 'sds/nose-gear/Falcon-Dash-nose-gear-b' },
      { src: 'sds/nose-gear/IMG_4097' },
      { src: 'sds/nose-gear/IMG_0560' },
      { src: 'sds/nose-gear/IMG_0526' },
      { src: 'sds/nose-gear/IMG_0530' },
      { src: 'sds/nose-gear/IMG_05491' },
      { src: 'sds/nose-gear/IMG_3466' },
    ],
  },
  {
    // Renamed from the legacy WordPress slug "example-project-4" (redirect in netlify.toml).
    slug: 'flight-controls',
    title: 'Flight Controls',
    cover: 'sds/flight-controls/Picture-029',
    categories: ['Steering', 'Steering Column'],
    gallery: [
      { src: 'sds/flight-controls/Picture-030' },
      { src: 'sds/flight-controls/Picture-029' },
      { src: 'sds/flight-controls/IMG_4139' },
      { src: 'sds/flight-controls/IMG_4137' },
      { src: 'sds/flight-controls/IMG_4136' },
    ],
  },
  {
    // Renamed from the legacy WordPress slug "example-project-3" (redirect in netlify.toml).
    slug: 'avionics',
    title: 'Avionics',
    cover: 'sds/avionics/Picture-025',
    categories: ['Brakes', 'Thrust', 'Wiring'],
    gallery: [], // No gallery images on the live WordPress page (example-project-3).
  },
  {
    slug: 'landing-gear',
    title: 'Main Landing Gear',
    cover: 'sds/landing-gear/falcondash_maingear',
    categories: ['Brakes', 'Gears', 'Suspension', 'Wheels'],
    gallery: [
      { src: 'sds/landing-gear/IMG_4197' },
      { src: 'sds/landing-gear/IMG_4196' },
      { src: 'sds/landing-gear/IMG_4195' },
      { src: 'sds/landing-gear/IMG_4193' },
      { src: 'sds/landing-gear/IMG_4189' },
      { src: 'sds/landing-gear/IMG_4199' },
      { src: 'sds/landing-gear/IMG_4198' },
      { src: 'sds/landing-gear/IMG_4187' },
      { src: 'sds/landing-gear/IMG_4184' },
      { src: 'sds/landing-gear/IMG_4181' },
      { src: 'sds/landing-gear/IMG_4180' },
      { src: 'sds/landing-gear/IMG_4176' },
      { src: 'sds/landing-gear/IMG_4173' },
      { src: 'sds/landing-gear/IMG_4141' },
      { src: 'sds/landing-gear/IMG_4146' },
      { src: 'sds/landing-gear/IMG_4148' },
      { src: 'sds/landing-gear/IMG_4143' },
      { src: 'sds/landing-gear/IMG_4163' },
      { src: 'sds/landing-gear/IMG_4164' },
      { src: 'sds/landing-gear/IMG_4210' },
      { src: 'sds/landing-gear/IMG_4209' },
      { src: 'sds/landing-gear/IMG_4212' },
      { src: 'sds/landing-gear/IMG_4213' },
      { src: 'sds/landing-gear/IMG_4216' },
    ],
  },
  {
    slug: 'engine',
    title: 'Engine',
    cover: 'sds/engine/Picture-005',
    categories: ['Engine', 'Horsepower', 'motor'],
    gallery: [
      { src: 'sds/engine/Picture-005' },
      { src: 'sds/engine/IMG_4250' },
      { src: 'sds/engine/IMG_4248' },
      { src: 'sds/engine/IMG_4247' },
      { src: 'sds/engine/IMG_4251' },
      { src: 'sds/engine/IMG_4249' },
      { src: 'sds/engine/IMG_4254' },
      { src: 'sds/engine/IMG_4253' },
      { src: 'sds/engine/IMG_1891' },
      { src: 'sds/engine/IMG_7100' },
    ],
    videos: [
      { id: 'EDXae3v5kg8', title: 'Check out the first start of the engine!' },
    ],
  },
  {
    // Renamed from the legacy WordPress slug "example_one" (redirect in netlify.toml).
    slug: 'fuselage',
    title: 'Fuselage',
    cover: 'sds/fuselage/IMG_3426',
    categories: ['Body', 'Housing', 'Shell'],
    gallery: [
      { src: 'sds/fuselage/IMG_4205' },
      { src: 'sds/fuselage/IMG_4203' },
      { src: 'sds/fuselage/IMG_4200' },
      { src: 'sds/fuselage/IMG_3432' },
      { src: 'sds/fuselage/IMG_3431' },
      { src: 'sds/fuselage/IMG_3428' },
      { src: 'sds/fuselage/IMG_3427' },
      { src: 'sds/fuselage/IMG_4126' },
      { src: 'sds/fuselage/IMG_4122' },
      { src: 'sds/landing-gear/IMG_4216' },
      { src: 'sds/fuselage/IMG_4206' },
      { src: 'sds/fuselage/IMG_4215' },
    ],
  },
]

/** All filter categories shown on the live "Piece By Piece" filter bar. */
export const projectCategories: string[] = [
  '2 cycle oil',
  'Acquired over the years',
  'Body',
  'Brakes',
  'Canopy',
  'Engine',
  'Gear',
  'Gears',
  'headset',
  'Horsepower',
  'Housing',
  'Instrument',
  'motor',
  'Nose',
  'Parachute',
  'Shell',
  'Steering',
  'Steering Column',
  'Suspension',
  'Thrust',
  'Transport',
  'Wheels',
  'Wing',
  'Wiring',
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getAdjacentProjects(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug)
  if (i === -1) return { prev: undefined, next: undefined }
  return {
    prev: i > 0 ? projects[i - 1] : projects[projects.length - 1],
    next: i < projects.length - 1 ? projects[i + 1] : projects[0],
  }
}
