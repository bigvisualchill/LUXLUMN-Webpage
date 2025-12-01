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
        id: 'sample-event',
        title: 'Sample Projection Event',
        description: 'A showcase of architectural projection mapping transforming buildings into living canvases.',
        thumbnail: '/gallery/projection-mapping/sample-event/IMG_0074.jpeg',
        images: [
          { id: 'pm-1', src: '/gallery/projection-mapping/sample-event/F46B17ED-5F68-476A-BFFD-CEB5CBFEC13D.jpg' },
          { id: 'pm-2', src: '/gallery/projection-mapping/sample-event/IMG_0074.jpeg' },
          { id: 'pm-3', src: '/gallery/projection-mapping/sample-event/IMG_0361.jpeg' },
          { id: 'pm-4', src: '/gallery/projection-mapping/sample-event/IMG_1226.jpeg' },
          { id: 'pm-5', src: '/gallery/projection-mapping/sample-event/IMG_1820.jpeg' },
          { id: 'pm-6', src: '/gallery/projection-mapping/sample-event/IMG_2038.jpg' },
          { id: 'pm-7', src: '/gallery/projection-mapping/sample-event/IMG_2594.jpeg' },
          { id: 'pm-8', src: '/gallery/projection-mapping/sample-event/IMG_2603.jpeg' },
          { id: 'pm-9', src: '/gallery/projection-mapping/sample-event/IMG_2610.jpeg' },
          { id: 'pm-10', src: '/gallery/projection-mapping/sample-event/IMG_2676.jpeg' },
          { id: 'pm-11', src: '/gallery/projection-mapping/sample-event/IMG_3287.jpeg' },
          { id: 'pm-12', src: '/gallery/projection-mapping/sample-event/IMG_3319.jpeg' },
          { id: 'pm-13', src: '/gallery/projection-mapping/sample-event/IMG_3320.jpeg' },
          { id: 'pm-14', src: '/gallery/projection-mapping/sample-event/IMG_4792.jpeg' },
          { id: 'pm-15', src: '/gallery/projection-mapping/sample-event/IMG_5080.jpeg' },
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
