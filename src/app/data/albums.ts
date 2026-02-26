export interface Track {
  title: string;
  artist: string;
  duration: string;
  audioUrl?: string;
}

export interface Album {
  id: string;
  title: string;
  creator: string;
  albumNote: string;
  coverImage?: string;
  vinylColor: string;
  labelColor: string;
  genre?: string;
  date?: string;
  tracks: Track[];
}

export const mockAlbums: Album[] = [
  {
    id: '1',
    title: 'Midnight Radio',
    creator: 'Alex Chen',
    albumNote: 'Late-night drives through empty highways. This collection captures the feeling of being alone but not lonely—when the world is asleep and the radio is your only companion. Every track here reminds me that solitude can be beautiful.',
    vinylColor: '#1a1a1a',
    labelColor: '#FF006E',
    genre: 'Electronic / Ambient',
    date: 'Feb 2026',
    tracks: [
      { title: 'Neon Glow', artist: 'Tycho', duration: '4:23' },
      { title: 'Late Night Tales', artist: 'Four Tet', duration: '5:17' },
      { title: 'Aqueous', artist: 'Jon Hopkins', duration: '6:45' },
      { title: 'Radio Silence', artist: 'Kiasmos', duration: '4:56' },
    ],
  },
  {
    id: '2',
    title: 'Sunday Mornings',
    creator: 'Maya Rodriguez',
    albumNote: 'Coffee. Sunlight. Quiet. These are the songs that make me feel like I have all the time in the world. No rush, no plans—just presence. This is what peace sounds like to me.',
    vinylColor: '#2a2a2a',
    labelColor: '#00D9FF',
    genre: 'Jazz / Soul',
    date: 'Feb 2026',
    tracks: [
      { title: 'Sunday Morning', artist: 'Maroon 5', duration: '4:04' },
      { title: 'Lazy Sunday', artist: 'Small Faces', duration: '3:56' },
      { title: 'Harvest Moon', artist: 'Neil Young', duration: '5:03' },
      { title: 'Easy Like Sunday Morning', artist: 'Lionel Richie', duration: '4:12' },
      { title: 'Sunday Candy', artist: 'Donnie Trumpet', duration: '4:20' },
    ],
  },
  {
    id: '3',
    title: 'Heartbreak Hotel',
    creator: 'Jordan Kim',
    albumNote: 'For everyone who ever needed to cry in the car. This isn\'t just sad—it\'s cathartic. It\'s the soundtrack to letting go, to feeling everything, to healing even when you don\'t think you will.',
    vinylColor: '#1f1f1f',
    labelColor: '#7209B7',
    genre: 'Indie / Alternative',
    date: 'Jan 2026',
    tracks: [
      { title: 'Someone Like You', artist: 'Adele', duration: '4:45' },
      { title: 'The Night We Met', artist: 'Lord Huron', duration: '3:28' },
      { title: 'Skinny Love', artist: 'Bon Iver', duration: '3:58' },
      { title: 'Liability', artist: 'Lorde', duration: '2:52' },
      { title: 'Motion Sickness', artist: 'Phoebe Bridgers', duration: '3:50' },
      { title: 'Black', artist: 'Pearl Jam', duration: '5:43' },
    ],
  },
  {
    id: '4',
    title: 'Dance Floor Therapy',
    creator: 'Sam Martinez',
    albumNote: 'When words aren\'t enough, we dance. This is my collection of pure, unapologetic joy. Every track here has made me forget my problems for at least four minutes. That\'s all we need sometimes.',
    vinylColor: '#252525',
    labelColor: '#FFBE0B',
    genre: 'House / Dance',
    date: 'Feb 2026',
    tracks: [
      { title: 'One More Time', artist: 'Daft Punk', duration: '5:20' },
      { title: 'Groovejet', artist: 'Spiller', duration: '3:42' },
      { title: 'Finally', artist: 'CeCe Peniston', duration: '4:03' },
      { title: 'Show Me Love', artist: 'Robin S.', duration: '7:32' },
    ],
  },
  {
    id: '5',
    title: 'Overthinking Hours',
    creator: 'River Thompson',
    albumNote: 'For the 3am thinkers, the what-if spirals, the replayed conversations. These songs understand that sometimes your brain won\'t shut up, and that\'s okay. Let the music think with you.',
    vinylColor: '#1c1c1c',
    labelColor: '#00F5D4',
    genre: 'Dream Pop / Shoegaze',
    date: 'Jan 2026',
    tracks: [
      { title: 'Space Song', artist: 'Beach House', duration: '5:19' },
      { title: 'Sometimes', artist: 'My Bloody Valentine', duration: '5:19' },
      { title: 'Cherry-coloured Funk', artist: 'Cocteau Twins', duration: '3:13' },
      { title: 'Alison', artist: 'Slowdive', duration: '4:19' },
      { title: 'When You Sleep', artist: 'My Bloody Valentine', duration: '4:11' },
    ],
  },
  {
    id: '6',
    title: 'Found Family',
    creator: 'Casey Brooks',
    albumNote: 'These are the songs my friends and I scream together in the car. The ones that play at 2am when we\'re all still awake, talking about everything and nothing. This collection is love in playlist form.',
    vinylColor: '#232323',
    labelColor: '#F72585',
    genre: 'Pop / Indie Pop',
    date: 'Feb 2026',
    tracks: [
      { title: 'Mr. Brightside', artist: 'The Killers', duration: '3:42' },
      { title: 'Don\'t Stop Believin\'', artist: 'Journey', duration: '4:10' },
      { title: 'Dancing On My Own', artist: 'Robyn', duration: '4:47' },
      { title: 'Since U Been Gone', artist: 'Kelly Clarkson', duration: '3:08' },
      { title: 'Teenage Dirtbag', artist: 'Wheatus', duration: '4:09' },
    ],
  },
];
