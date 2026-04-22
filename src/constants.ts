// ==========================================
// BURANA MUSEUM CONTENT CONFIGURATION
// ==========================================
// You can easily update the text and photo URLs here. 
// The website will automatically update to reflect these changes.

export interface Artifact {
  id: string;
  title: string;
  category: string;
  period: string;
  description: string;
  imageUrl: string;
}

export const SITE_CONTENT = {
  museumName: "Burana VR",
  navTitle: "Burana",
  
  // Hero Section
  heroImage: "https://drive.google.com/file/d/1sxPAJnSQqQyCabp6xDG6E-0QIEdncyTn/view?usp=sharing", 
  heroSubtitle: "Virtual Access to the Historical Site of Burana Tower",
  heroTitleLine1: "The Legacy of",
  heroTitleLine2: "Balasagun",
  
  // About / Introduction Section
  welcomeMessage: "Welcome to the Open Air Burana Online Museum.",
  introductionText: "The Open Air Burana Online Museum is a web-based platform designed to provide users with virtual access to the historical site of Burana Tower. Explore the museum remotely, view historical information, and learn about cultural artifacts. Our goal is to make cultural heritage more accessible to students, tourists, and researchers through an interactive and user-friendly interface.",
  aboutImage: "https://drive.google.com/file/d/1_5gFauuybqP8kUztl8JaJmYMs6HmroNc/view?usp=sharing", 
};

export const ARTIFACTS: Artifact[] = [
  {
    id: '1',
    title: 'Guardian of Balasagun',
    category: 'Balbal (Stone Sculpture)',
    period: '6th - 10th Century',
    description: 'A prominent stone warrior featuring distinct facial carvings and traditional headgear. These balbals were erected by the ancient Turkic tribes to honor fallen ancestors and protect the sacred grounds of the Chuy Valley.',
    imageUrl: 'https://drive.google.com/file/d/1sxPAJnSQqQyCabp6xDG6E-0QIEdncyTn/view?usp=sharing',
  },
  {
    id: '2',
    title: 'The Elder Statesman',
    category: 'Balbal (Stone Sculpture)',
    period: '7th - 9th Century',
    description: 'This weathered sculpture depicts a figure of authority, characterized by its stoic expression and the classic posture of holding a ritual vessel. It serves as a testament to the complex social hierarchy of the nomadic steppe empires.',
    imageUrl: 'https://drive.google.com/file/d/1_5gFauuybqP8kUztl8JaJmYMs6HmroNc/view?usp=sharing',
  },
  {
    id: '3',
    title: 'Nomadic Chieftain',
    category: 'Balbal (Stone Sculpture)',
    period: '8th Century',
    description: 'Carved from a massive granite block, this balbal showcases intricate details of ancient Turkic weaponry and dress. The deep-set eyes and pronounced brow reflect the artistic stylings unique to the Karakhanid era.',
    imageUrl: 'https://drive.google.com/file/d/1XgFgpw3xb0jSGwu3WPgEfr0eWl7yGVhI/view?usp=sharing',
  },
  {
    id: '4',
    title: 'Silent Sentinel',
    category: 'Balbal (Stone Sculpture)',
    period: '6th - 8th Century',
    description: 'A striking example of early medieval steppe art. Despite centuries of exposure to the harsh Central Asian climate, the figure retains a powerful presence, standing as a silent witness to the Silk Road\'s bustling trade.',
    imageUrl: 'https://drive.google.com/file/d/1OA1fox_hjv3pORc6IayUZ00l_jtQFk4-/view?usp=sharing',
  },
  {
    id: '5',
    title: 'Warrior with Chalice',
    category: 'Balbal (Stone Sculpture)',
    period: '9th - 10th Century',
    description: 'This well-preserved artifact clearly depicts a warrior holding a ceremonial chalice or cup. In ancient Turkic tradition, this motif often symbolized participation in a sacred feast in the afterlife.',
    imageUrl: 'https://drive.google.com/file/d/14C78SGnl_kOg_bdkZbaeiJ3b7MaCO-1I/view?usp=sharing',
  },
];
