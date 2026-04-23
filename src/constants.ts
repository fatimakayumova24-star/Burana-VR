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

export const HISTORY_INFO = {
  lead: "The human-shaped stone sculptures found in many places around Central Asia are widely known as \"balbals\", \"kurgan stelae\" or even the \"father stones\". Balbal stone statues stand as timeless sentinels, echoing the rich history and cultural heritage of the region. They are anthropomorphic stone statues, images cut from the stone within or around old Central Asian cemeteries or burial mounds and their face was always pointing towards east towards the rising sun.",
  origins: [
    "In the Turkic (not Turkish) world, they are commonly known as Bulbul which translates as \"ancestor\" or \"grandfather\". They have a strong face shape and are believed to be first made by the Turkic tribes as a representation of slain enemies. These enigmatic monuments serve not only as impressive works of art but also as vital markers of identity, honoring the legacies of the ancestors.",
    "Historically, they were erected to commemorate fallen warriors and signify the strength and valor of a tribe. Each statue is unique, intricately carved to depict various features, from facial expressions to intricate clothing details. They were often placed along trade routes and burial sites, serving both as grave markers and as symbols of protection for the living."
  ],
  evolution: [
    "It has been also concluded that the balbals developed later into memorials to the ancestors that are described by detailed carvings of faces and hands. Balbals give us an insight into the clothes, jewelry, and weaponry of our ancestors. Archeologists believe that people carved swords on a statue describing a person who was a fighter or a man of power such as a tribe leader.",
    "A large portion of these statues are also carrying a dish as the people wanted to make sure that the deceased one would not need to suffer from hunger. Balbal statues are believed to have originated between the 6th and 10th centuries."
  ],
  quote: "Another belief tells that the stones next to these usually 0.5-2 m statues represent the amount of enemies killed by the person that the sculpture was erected for. It needs to be noted though that in 2022, a 3 meter tall balbal was discovered by a potato farmer in the Issyk Kul region of Kyrgyzstan so the size can vary.",
  spiritual: "The Balbal statues represent a fascinating intersection of art, spirituality, and social structure. Their presence in ancient burial sites speaks to the deep reverence for ancestors held by nomadic cultures. The sculptures were not just artistic expressions but also served as spiritual guardians, ensuring the safe passage of the deceased into the afterlife.",
  attributes: "Stone statues The face is masculine, some are feminine, modern, holomorphic. Several are wearing a three-horned headdress. There are pendant earrings. These balbals were found in the Shaymshi mountains of Shaymshi village, Alga village, Chui district. Most balbals have moon-shaped eyebrows, mendal-shaped eyes, long and inward noses, and prominent mouths. Most balbals have scissor hands and no claws. Some have heads drawn with lines. Mostly length 40-48, 21-28, and width 16-19, 21-23, 34-35, height 64-70, 94-110, 80-86."
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
