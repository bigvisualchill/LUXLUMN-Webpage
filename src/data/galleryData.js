// Gallery data - manually maintained for public folder assets
// To add a new event:
// 1. Create folder: public/gallery/[section]/[event-name]/
// 2. Add meta.json with title and description
// 3. Add images to the folder
// 4. Add the event to this file

// Section configuration with events
export const galleryData = {
  'projection-mapping': {
    title: 'Projection Mapping',
    events: [
      {
        id: 'north-park-music-festival',
        title: 'North Park Music Festival',
        description: 'Created a dynamically evolving black and white mural and projected it on the side of the historic Observatory Theater for the North Park Music Festival.',
        thumbnail: '/gallery/projection-mapping/North Park Music Festival/IMG_1820.jpeg',
        images: [
          { id: 'npm-1', src: '/gallery/projection-mapping/North Park Music Festival/IMG_1820.jpeg' },
          { id: 'npm-2', src: '/gallery/projection-mapping/North Park Music Festival/IMG_3287.jpeg' },
          { id: 'npm-3', src: '/gallery/projection-mapping/North Park Music Festival/IMG_3319.jpeg' },
          { id: 'npm-4', src: '/gallery/projection-mapping/North Park Music Festival/IMG_3320.jpeg' },
        ]
      }
    ]
  },
  'performance-visuals': {
    title: 'Performance Visuals',
    events: [
      {
        id: 'live-concert-visuals',
        title: 'Live Concert Visuals',
        description: 'Real-time visual synthesis for live music performances, breathing with the rhythm.',
        thumbnail: '/gallery/performance-visuals/live-concert-visuals/IMG_2619.jpeg',
        images: [
          { id: 'pv-1', src: '/gallery/performance-visuals/live-concert-visuals/IMG_2619.jpeg' },
          { id: 'pv-2', src: '/gallery/performance-visuals/live-concert-visuals/IMG_2709.jpeg' },
          { id: 'pv-3', src: '/gallery/performance-visuals/live-concert-visuals/IMG_2946.jpeg' },
          { id: 'pv-4', src: '/gallery/performance-visuals/live-concert-visuals/IMG_2948.jpeg' },
        ]
      }
    ]
  },
  'installations': {
    title: 'Installations',
    events: [
      {
        id: 'light-sculpture-exhibit',
        title: 'Light Sculpture Exhibit',
        description: 'Interactive light installations responding to presence and movement in gallery spaces.',
        thumbnail: '/gallery/installations/light-sculpture-exhibit/IMG_4435.jpeg',
        images: [
          { id: 'inst-1', src: '/gallery/installations/light-sculpture-exhibit/IMG_4435.jpeg' },
          { id: 'inst-2', src: '/gallery/installations/light-sculpture-exhibit/IMG_4437.jpeg' },
        ]
      }
    ]
  },
  'logo-animation': {
    title: 'Logo Animation',
    events: []
  }
}

// Helper to get events for a section
export function getEventsForSection(sectionId) {
  return galleryData[sectionId]?.events || []
}

// Helper to get a specific event
export function getEvent(sectionId, eventId) {
  const events = getEventsForSection(sectionId)
  return events.find(e => e.id === eventId) || null
}
