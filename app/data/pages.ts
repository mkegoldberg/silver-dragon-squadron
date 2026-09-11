// Verbatim copy from the live site for the three text pages.
// "Landlord" capitalization rules do not apply to this project.

export const aboutSteveKim = {
  title: 'Steven Kim',
  heading: 'Pilot & Builder ',
  // Profile photo (Cloudinary public ID; same asset as the Pilot in Command portrait).
  photo: 'sds/pilot-in-command/steve',
  // Life events, oldest first. `date` is a short scannable label for the
  // timeline rail; `text` is the verbatim copy from the live site, with a
  // pure leading-date prefix trimmed where the label already carries it.
  timeline: [
    { date: '1947', text: 'Born November 7, 1947.' },
    { date: 'June 1965', text: 'Novato High School, Novato, CA. Graduated in June 1965' },
    { date: '1966\u20131967', text: 'College of Marin, Kentfield, CA: 1966 -1967 General education studies, Drafting and Art courses.' },
    { date: 'Dec 1967', text: 'Drafted US Army, Air Traffic Control School, Biloxi, Mississippi.' },
    { date: 'Mar 1968', text: 'Republic of Viet Nam, special weapons technician. Participated in night operation tactics and weapons development program called \u201CPhantom.\u201D' },
    { date: 'Mar 1969', text: 'Honorable discharge, merits and awards \u2013 National Defense Ribbon, Viet Nam Service Award.' },
    { date: '1970\u20131972', text: 'College of Marin, transfer courses.' },
    { date: '1972\u20131976', text: 'California Polytechnic State University. Merits and awards \u2013 Dean of Architecture design recognition award.' },
    { date: 'Nov 1978', text: 'Private Pilot Certification, single engine land.' },
    { date: '1983\u20131999', text: 'Architectural License: C14262, September 1983 \u2013 December 1999: steven kim & associate ARCHITECT, Napa, CA.' },
    { date: '2000\u20132012', text: 'University of California Davis. Architectural and Engineering staff, Design Development and Construction Management.' },
    { date: '2012', text: 'Retired. Homebuilt aircraft project, American Falcon XP.' },
  ],
}

// Spec lines are presented as label/value rows. The copy is still the live
// site's, split at the value, with light normalization: label casing
// ("maximum gross weight" -> "Maximum gross weight", "weight" -> "Weight",
// "none" -> "None") and "with out fuel" -> "without fuel".
export interface PlaneSpecSection {
  heading: string
  /** Parenthetical shown under the heading. */
  note?: string
  rows: { label: string; value: string }[]
  /** Plain sentence shown under the rows (doesn't split into label/value). */
  postNote?: string
}

export const aboutThePlane: {
  title: string
  sections: PlaneSpecSection[]
  footnote: string
} = {
  title: 'About The Plane',
  sections: [
    {
      heading: 'Aircraft',
      rows: [{ label: 'Aircraft', value: 'Falcon-XP, 2-seat, tandem, land' }],
      postNote: 'Solo flight from front seat only.',
    },
    {
      heading: 'Empty XP Center of Gravity Location',
      note: '(inches aft of datum, \u201C0\u201D butt line canard Pin nose of fuselage)',
      rows: [
        { label: 'Empty XP maximum weight', value: '500lbs' },
        { label: 'Center of gravity location', value: '101.5 inches' },
      ],
    },
    {
      heading: 'Maximum Forward Center of Gravity',
      note: '(C of G location at gross max. wt. aircraft will maintain flight at minimum design IAS)',
      rows: [
        { label: 'Front pilot maximum weight', value: '200lbs' },
        { label: 'Rear crew member maximum weight', value: '210lbs' },
        { label: 'Fuel weight (at station 120)', value: '90lbs' },
        { label: 'XP empty weight maximum', value: '500lbs' },
        { label: 'Maximum gross weight', value: '1,000lbs' },
        { label: 'Center of gravity', value: '89.in (86.in without fuel)' },
      ],
    },
    {
      heading: 'Maximum Aft Center of Gravity',
      note: '(Main wing stall will not occur at any IAS within design flight envelope)',
      rows: [
        { label: 'Front pilot weight', value: '130lbs' },
        { label: 'Rear crew member', value: 'None' },
        { label: 'Fuel weight', value: '90lbs' },
        { label: 'XP empty weight', value: '500lbs' },
        { label: 'Weight', value: '720lbs' },
        { label: 'Center of gravity', value: '95.in' },
      ],
    },
  ],
  footnote:
    'Note: Main wind stall may occur at any IAS when center of gravity is more than 98 inches of datum',
}

export const whatThisProjectMeans = {
  title: 'What This Project Means to Steve',
  body: 'I, like many aviation enthusiasts, dreamed of flying and aircraft ownership. While very young I thought I would be seeking a career in aviation but it was during high school it became clear my talents lay elsewhere. Still holding on to the idea of flight I trained and received my private pilots certification and pursued this goal. But as we all know our lives are driven by external forces and life gets in the way of many of our goals. Marriage, starting a business, building a house, family etc., are priorities that require the very time and resources needed to realize your passion. But I was patient, stayed focused and am now within reach of puttering around California in the air. So enjoy this website and the documentation of this project, modest as it might be, as a small effort with a small plane realizing a big dream.',
}
