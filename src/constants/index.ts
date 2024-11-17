import { string } from "zod";

/////////////////////////////////////////
interface venues {
  title:string;
  image:string;
  description?:string;
}

export const venues :venues[]= [
  {
    title: "London",
    image: "/assets/user/home/venues/london.jpg",
    description:"London is the capital and largest city of England and the United Kingdom. It stands on the River Thames in south-east England at the head of a 50-mile (80 km) estuary down to the North Sea, and has been a major settlement for two millennia.The City of London, its ancient core and financial centre, was founded by the Romans as Londinium and retains boundaries close to its medieval ones.Since the 19th century,London has also referred to the metropolis around this core, historically split between the counties of Middlesex, Essex, Surrey, Kent, and Hertfordshire,which largely makes up Greater London,the region governed by the Greater London Authority.The City of Westminster, to the west of the City, has for centuries held the national government and parliament."
  },
  {
    title: "Berlin",
    image: "/assets/user/home/venues/berlin.jpg",
    description:`Berlin is the capital and largest city of Germany by both area and population.Its 3.7 million inhabitants make it the European Union's most populous city, according to population within city limits.One of Germany's sixteen constituent states, Berlin is surrounded by the State of Brandenburg and contiguous with Potsdam, Brandenburg's capital. Berlin's urban area, which has a population of around 4.5 million, is the second most populous urban area in Germany after the Ruhr.The Berlin-Brandenburg capital region has over six million inhabitants and is Germany's third-largest metropolitan region after the Rhine-Ruhr and Rhine-Main regions.` 
  },
  {
    title: "Egypt",
    image: "/assets/user/home/venues/egypt.jpg",
    description:`country located in the northeastern corner of Africa. Egypt’s heartland, the Nile River valley and delta, was the home of one of the principal civilizations of the ancient Middle East and, like Mesopotamia farther east, was the site of one of the world’s earliest urban and literate societies. Pharaonic Egypt thrived for some 3,000 years through a series of native dynasties that were interspersed with brief periods of foreign rule. After Alexander the Great conquered the region in 323 BCE, urban Egypt became an integral part of the Hellenistic world. Under the Greek Ptolemaic dynasty, an advanced literate society thrived in the city of Alexandria, but what is now Egypt was conquered by the Romans in 30 BCE. It remained part of the Roman Republic and Empire and then part of Rome’s successor state`
  },
  {
    title: "Dubai",
    image: "/assets/user/home/venues/dubai.jpg",
    description:`also spelled Dubayy, city and capital of the emirate of Dubai, one of the wealthiest of the seven emirates that constitute the federation of the United Arab Emirates, which was created in 1971 following independence from Great Britain. There are several theories about the origin of the name Dubai. One associates it with the daba—a type of locust that infests the area—while another holds that it refers to a market that existed near the city. In recent years Dubai has been compared to Singapore and Hong Kong and is often regarded as the Middle East’s premier entrepôt.`
  },
  {
    title: "Belgium",
    image: "/assets/user/home/venues/belgium.jpg",
    description:`country of northwestern Europe. It is one of the smallest and most densely populated European countries, and it has been, since its independence in 1830, a representative democracy headed by a hereditary constitutional monarch. Initially, Belgium had a unitary form of government. In the 1980s and ’90s, however, steps were taken to turn Belgium into a federal state with powers shared among the regions of Flanders, Wallonia, and the Brussels-Capital Region.`,
  },
  {
    title: "Paris",
    image: "/assets/user/home/venues/paris.jpg",
    description:`city and capital of France, situated in the north-central part of the country. People were living on the site of the present-day city, located along the Seine River some 233 miles (375 km) upstream from the river’s mouth on the English Channel (La Manche), by about 7600 BCE. The modern city has spread from the island (the Île de la Cité) and far beyond both banks of the Sein.`
  },
  {
    title: "Switzerland",
    image: "/assets/user/home/venues/switzerland.jpg",
    description:`Switzerland, officially the Swiss Confederation, is a landlocked country at the confluence of Western, Central and Southern Europe.[note 4][14] It is a federal republic composed of 26 cantons, with federal authorities based in Bern, spanning a total area of 41,285 km2 (15,940 sq mi) and land area of 39,997 km2 (15,443 sq mi). Although the Alps occupy the greater part of the territory, the Swiss population of approximately 8.5 million is concentrated mostly on the plateau, where the largest cities and economic centres are, among them Zürich, Geneva, Basel and Lausanne. These cities are home to several offices of international organisations such as the WTO, the WHO, the ILO, the seat of the International Olympic Committee, the headquarters of FIFA, the UN's second-largest office, as well as the main building of the Bank for International Settlements. The main international airports of Switzerland are also located in these cities.`
  },
  {
    title: "Turkey",
    image: "/assets/user/home/venues/turkey.jpg",
    description:`Turkey or Türkiye, officially the Republic of Türkiye, is a transcontinental country located mainly on the Anatolian Peninsula in Western Asia, with a small portion on the Balkan Peninsula in Southeast Europe.`
  },
  {
    title: "Roma",
    image: "/assets/user/home/venues/roma.jpg",
    description:`Rome, Italian Roma, historic city and capital of Roma provincia (province), of Lazio regione (region), and of the country of Italy. Rome is located in the central portion of the Italian peninsula, on the Tiber River about 15 miles (24 km) inland from the Tyrrhenian Sea.`,
  },
  {
    title: "Istanbul",
    image: "/assets/user/home/venues/Istanbul.jpg",
    description:`Istanbul, Turkish İstanbul, formerly Constantinople, ancient Byzantium, largest city and principal seaport of Turkey. It was the capital of both the Byzantine Empire and the Ottoman Empire.

The old walled city of Istanbul stands on a triangular peninsula between Europe and Asia. Sometimes as a bridge, sometimes as a barrier, Istanbul for more than 2,500 years has stood between conflicting surges of religion, culture, and imperial power. For most of those years it was one of the most coveted cities in the world.`
  },
  {
    title: "Sharm Al Sheikh",
    image: "/assets/user/home/venues/sharm_Al_Sheikh.jpg",
    description:`Sharm El Sheikh  is an Egyptian city on the southern tip of the Sinai Peninsula, on the coastal strip along the Red Sea. Its population is approximately 53,670 as of 2022. Sharm El Sheikh is the administrative hub of Egypt's South Sinai Governorate, which includes the smaller coastal towns of Dahab and Nuweiba as well as the mountainous interior, St. Catherine and Mount Sinai. The city and holiday resort is a significant centre for tourism in Egypt, while also attracting many international conferences and diplomatic meetings.`
  },
  {
    title: "Cairo",
    image: "/assets/user/home/venues/Cairo.jpg",
    description:`Cairo, Arabic Al-Qāhirah (“The Victorious”), city, capital of Egypt, and one of the largest cities in Africa. Cairo has stood for more than 1,000 years on the same site on the banks of the Nile, primarily on the eastern shore, some 500 miles (800 km) downstream from the Aswan High Dam. Located in the northeast of the country, Cairo is the gateway to the Nile delta, where the lower Nile separates into the Rosetta and Damietta branches.`,
  },
  {
    title: "Indonesia",
    image: "/assets/user/home/venues/Indonesia.jpg",
    description:`Indonesia , country located off the coast of mainland  Southeast Asia in the Indian and Pacific oceans. It is an archipelago that  lies across the Equator and spans a distance equivalent to one-eighth of Earth’s circumference. Its islands can be grouped into the Greater Sunda Islands of Sumatra (Sumatera), Java (Jawa), the southern extent of Borneo (Kalimantan), and Celebes (Sulawesi); the Lesser Sunda Islands (Nusa Tenggara) of Bali and a chain of islands that runs eastward through Timor; the Moluccas (Maluku) between Celebes and the island of New Guinea; and the western extent of New Guinea (generally known as Papua). The capital, Jakarta, is located near `
  },
  {
    title: "Amsterdam",
    image: "/assets/user/home/venues/Amsterdam.jpg",
    description:`Amsterdam, city and port, western Netherlands, located on the IJsselmeer and connected to the North Sea. It is the capital and the principal commercial and financial centre of the Netherlands.


To the scores of tourists who visit each year, Amsterdam is known for its historical attractions, for its collections of great art, and for the distinctive colour and flavour of its old sections, which have been so well preserved.`
  },
  {
    title: "Geneva",
    image: "/assets/user/home/venues/Geneva.jpg",
    description:`Bienvenue à Genève! Welcome to Geneva! Situated along the banks of Lake Geneva at the foot of the Alps, Geneva sparkles as one of Europe's most beautiful cities. Home to the European headquarters of the United Nations, Geneva has a long history of diversity and tolerance dating back to the Protestant Reformation. Today, the city of Geneva is a cultural center second to none featuring world class entertainment, top rated restaurants and unlimited opportunities `
  },
  {
    title: "Barcelona",
    image: "/assets/user/home/venues/barcelona.jpg",
    description:`, city, seaport, and capital of Barcelona provincia (province) and of Catalonia comunidad autónoma (autonomous community), northeastern Spain, located 90 miles (150 km) south of the French border. It is Spain’s major Mediterranean port and commercial centre and is famed for its individuality, cultural interest, and physical `
  },
  {
    title: "Kuala Lumpur",
    image: "/assets/user/home/venues/kuala_lumpur.jpg",
    description:`, city, seaport, and capital of Barcelona provincia (province) and of Catalonia comunidad autónoma (autonomous community), northeastern Spain, located 90 miles (150 km) south of the French border. It is Spain’s major Mediterranean port and commercial centre and is famed for its individuality, cultural interest, and physical `
  },
  {
    title: "Online",
    image: "/assets/user/home/venues/online.jpg",
    description:``
  },
];

export const courseData = {
  code: '518389',
  venue: 'Istanbul',
  category: 'Management & Leadership',
  startDate: '2024-12-22',
  endDate: '2024-12-26',
  language: 'English',
  fee: '3000£',
};

////////////////////////////////////////

export interface category {
  id: number;
  title: string;
  image: string;
  description?:string;
  backgroundImage?:string;
}
export const categories: category[] = [
  {
     id: 1,
     title: "management And leadership",
     image: "/assets/user/home/categories/management-and-leadership.png",
     backgroundImage:'/assets/user/home/categories/Management.jpg',
     description:`Enhance your effectiveness and reach your full Leadership and Management potential.
                 Our York British academy portfolio of proven Leadership and Management training courses are specifically targeted to develop the key skills as an effective Manager and inspiring Leader.
                 Developed for a wide range of levels and needs from, Executive, Board Member, High Potential, Talent, Manager, Supervisor, leadership and runs throughout an organisation
                The courses are designed to enhance your self-development and emotional intelligence (EI), as well as specific capabilities including influencing and negotiation, high impact communications, time management, performance improvement, developing strategy, leading change, HR management and more.
                Delivered by world-leading experts in their fields, our exciting range of Leadership and Management courses feature innovative, world-class, leading-edge techniques to help you, your team and your organisation excel in today's challenging business environment.

Register today to boost your competitive advantage.`
  },
  {
     id: 2,
     title: "strategy",
     image: "/assets/user/home/categories/strategy.png",
     backgroundImage:'/assets/user/home/categories/Strategy.jpg',
      description:`Strategic planning is critical to business success. It provides the focal point of an organisation's growth and sustainability.
                  To develop strategic thinking, decision-making and planning to provide overall direction to your organisation and how the objectives will be achieved requires a number of leadership skills, understanding of behaviour and emotional intelligence, as well as excellent communication and interpersonal skills.
                  Our portfolio of Strategy and Strategic training courses explore the key topics in the formulation and implementation of the strategy for major goals and initiatives, analysing the operating environment, allocating resources to implement the plans, strategic decision-making, the role of mission verses mantra, creating the vision, and getting buy-in from key stakeholders and others.
                  Delivered by world-leading experts in the field of Strategy, our exciting range of Strategy and Strategic development courses feature innovative, world-class, leading-edge techniques to help you, your team and your organisation excel in today's challenging business environment.
                  Register today to boost your competitive advantage.`

    },
  {
     id: 3,
     title: "administration support",
     image: "/assets/user/home/categories/administration-support.png",
     backgroundImage:'/assets/user/home/categories/Strategy.jpg',
     description:'A contracts manager in the construction industry manages contracts relating to building projects. They study the legalities of contracts and help to negotiate terms and conditions with clients and third parties, before drawing up legal documents to outline terms of service and project deliverable.' 
       },
  {
     id: 4,
     title: "contracts management",
     image: "/assets/user/home/categories/contracts-management.png",
     backgroundImage:'/assets/user/home/categories/Contracts_Management.jpg',
      description:`A contracts manager in the construction industry manages contracts relating to building projects. They study the legalities of contracts and help to negotiate terms and conditions with clients and third parties, before drawing up legal documents to outline terms of service and project deliverable.`
    },
  {
     id: 5,
     title: "professional development",
     image: "/assets/user/home/categories/procurement-and-tenders.png",
     backgroundImage:'/assets/user/home/categories/Procurement_and_Tenders.jpg',
      description: `Whereas procurement involves the entire process from need identification to invoice payment, tendering itself is limited to the process of going to the external market with your need specification with the intent to collect, analyze and nominate bids.`
    },
  {
     id: 6,
     title: "aeronautics and aviation",
     image: "/assets/user/home/categories/aeronautics-and-aviation.png",
     backgroundImage:'/assets/user/home/categories/Aeronautics_and_Aviation.jpg',
      description:`Financial accounting is a specific branch of accounting involving a process of recording, summarizing, and reporting the myriad of transactions resulting from business operations over a period of time. These transactions are summarized in the preparation of financial statements, including the balance sheet, income statement and cash flow statement, that record the company's operating performance over a specified period

Work opportunities for a financial accountant can be found in both the public and private sectors. A financial accountant's duties may differ from those of a general accountant, who works for himself or herself rather than directly for a company or organization.`
    },
  {
     id: 7,
     title: "health safety & security",
     image: "/assets/user/home/categories/health-safety-&-security.png",
     backgroundImage:'/assets/user/home/categories/Health.jpg',
      description:'Safety, health and security in the workplace is important to workers and to the general morale of the employees of a company. Much of this is common sense, but there are government agencies and regulations that govern this aspect of running a business in order to ensure the health and safety of the workforce.'
    },
  {
     id: 8,
     title: "professional development",
     image: "/assets/user/home/categories/professional-development.png",
     backgroundImage:'/assets/user/home/categories/Professional_development.jpg',
      description:` learning to earn or maintain professional credentials such as academic degrees to formal coursework, attending conferences, and informal learning opportunities situated in practice. It has been described as intensive and collaborative, ideally incorporating an evaluative stage. There is a variety of approaches to professional development, including consultation, coaching, communities of practice, lesson study, mentoring, reflective supervision and technical assistance

`
    },
  {
     id: 9,
     title: "project management",
     image: "/assets/user/home/categories/project-management.png",
     backgroundImage:'/assets/user/home/categories/Project_management.jpg',
      description:`is the process of leading the work of a team to achieve all project goals within the given constraints.This information is usually described in project documentation, created at the beginning of the development process. The primary constraints are scope, time, and budget.The secondary challenge is to optimize the allocation of necessary inputs and apply them to meet pre-defined objectives.

The objective of project management is to produce a complete project which complies with the client's objectives. In many cases the objective of project management is also to shape or reform the client's brief to feasibly address the client's objectives. Once the client's objectives are clearly established they should influence all decisions made by other people involved in the project – for example project managers, designers, contractors and sub-contractors. Ill-defined or too tightly prescribed project management objectives are detrimental to decision making`
    },
  {
     id: 10,
     title: "audit and quality assurance",
     image: "/assets/user/home/categories/audit-and-quality-assurance.png",
   backgroundImage:'/assets/user/home/categories/Strategy.jpg',
      description:''
    },
  {
     id: 11,
     title: "human resource management",
     image: "/assets/user/home/categories/human-resource-management.png",
     backgroundImage:'/assets/user/home/categories/Human_Resource_Management.jpg  ',
      description:`Human resource management (HRM or HR) is the strategic approach to the effective and efficient management of people in a company or organization such that they help their business gain a competitive advantage. It is designed to maximize employee performance in service of an employer's strategic objectives. Human resource management is primarily concerned with the management of people within organizations, focusing on policies and systems.HR departments are responsible for overseeing employee-benefits design, employee recruitment, training and development, performance appraisal, and reward management, such as managing pay and employee-benefits systems.HR also concerns itself with organizational change and industrial relations, or the balancing of organizational practices with requirements arising from collective bargaining and governmental laws.`
    },

  {
     id: 12,
     title: "banking & investment",
     image: "/assets/user/home/categories/banking-&-investment.png",
     backgroundImage:'/assets/user/home/categories/Banking_Investment.jpg',
      description:`a financial services company or corporate division that engages in advisory-based financial transactions on behalf of individuals, corporations, and governments. Traditionally associated with corporate finance, such a bank might assist in raising financial capital by underwriting or acting as the client's agent in the issuance of securities. An investment bank may also assist companies involved in mergers and acquisitions (M&A) and provide ancillary services such as market making, trading of derivatives and equity securities, and FICC services (fixed income instruments, currencies, and commodities). Most investment banks maintain prime brokerage and asset management departments in conjunction with their investment research businesses. As an industry, it is broken up into the Bulge Bracket (upper tier), Middle Market (mid-level businesses), and boutique market (specialized businesses).`
    },

  {
     id: 13,
     title: "oil and gas",
     image: "/assets/user/home/categories/oil-and-gas.png",
   backgroundImage:'/assets/user/home/categories/Oil_and_Gas.jpg',
      description:`the course provides the student with a basic knowledge and understanding of the oil and gas industry, including its history, technical aspects, business model, and impact on society and the environment. The primary emphasis is on operations in exploration, production, transportation, refining, and marketing`
    },

  {
     id: 14,
     title: "information technology",
     image: "/assets/user/home/categories/information-technology.png",
   backgroundImage:'/assets/user/home/categories/information_technology.jpg',
      description:`The field of information technology, or IT, covers the support, administration, and design of telecommunications and computer systems. Some positions in this field include system analysts, software programmers, computer scientists, computer support specialists, and network and database administrators.`
    },
  {
     id: 15,
     title: "sales & marketing",
     image: "/assets/user/home/categories/sales-&-marketing.png",
   backgroundImage:'/assets/user/home/categories/Sales_Marketing.jpg',
      description:`the term, sales, refers to all activities that lead to the selling of goods and services. And marketing is the process of getting people interested in the goods and services being sold. ... Marketing departments are responsible for running campaigns to attract people to the business' brand, product, or service.`
    },

  {
     id: 16,
     title: "electrical engineer",
     image: "/assets/user/home/categories/electrical-engineer.png",
   backgroundImage:'/assets/user/home/categories/Strategy.jpg',
      description:''
    },

  {
     id: 17,
     title: "instrumentation & process controles",
     image: "/assets/user/home/categories/instrumentation-&-process-controles.png",
   backgroundImage:'/assets/user/home/categories/Instrumentation_Process_Control.jpg',
      description:`Instrumentation and control refer to the analysis, measurement, and control of industrial process variables using process control instruments and software tools such as temperature, pressure, flow, and level sensors, analyzers, electrical and mechanical actuators, Human-Machine Interfaces (HMI), Piping and Instrumentation Diagram (P&ID) systems, automated control systems and more`
    },

  {
     id: 18,
     title: "Quality And Knowledge For Public Relations",
     image: "/assets/user/home/categories/quality-and-knowledge.png",
   backgroundImage:'/assets/user/home/categories/Strategy.jpg',
      description:''
    },
];


///////////////////////////////////////
export const images=[
  {
    image:'/assets/user/home/images/1.png'
  },
  {
    image:'/assets/user/home/images/1.png'
  },
  {
    image:'/assets/user/home/images/2.png'
  },
  {
    image:'/assets/user/home/images/3.png'
  },
  {
    image:'/assets/user/home/images/4.png'
  },
  {
    image:'/assets/user/home/images/5.png'
  },
  {
    image:'/assets/user/home/images/6.png'
  },
  {
    image:'/assets/user/home/images/7.png'
  },
  {
    image:'/assets/user/home/images/8.png'
  },
]

interface questions {
  question:string;
  answer:string;
}
export const questions = [
  {
    question:
      " Does your organization wish to be able to purchase examination vouchers?",
    answer:
      "Organizations that wish to obtain examination vouchers for their own staff or who are commercially licensed and comply with trademark use guidelines can purchase retail vouchers. Please contact customer-support  for further information.",
  },
  {
    question:
      " Due to the COVID-19 measures, we are not able to deliver our classroom training on-site. Does our accreditation allow a virtual delivery?",
    answer:
      "Classroom live (on-site) and virtual classrooms are considered the same type of instructor-led training with real-time interaction between the instructor and learners. It can easily be added at no cost to your conformance declaration. Please contact Customer-support to do so.",
  },
  {
    question:
      " Does your organization wish to include courses based on The York British Academy programs to its portfolio without having them accredited?",
    answer:
      "It is possible to deliver non-accredited courses however, your organization will not be able to use any of The  York British Academy trademarks in the course name (e.g. TOGAF® course is not allowed; Enterprise Architecture Training based on the TOGAF® framework would be allowed). Affiliation may also be a solution. Accredited Training Course providers with an affiliation relationship are listed on The  York British Academy registers. Please email us for further information.",
  },
  {
    question: "Is your organization a training company?",
    answer:
      "A Commercial license is necessary to be allowed to deliver training courses based on the Open Group trademarks. Please consult the About-Us page ",
  },
];

//////////////////////////////////////
interface contactUs{
  image:string;
  title:string;
  paragraph:string;
}

export const contactUs : contactUs[]=[
  {
    image:'/icons/smart-phone.svg',
    title:'call us',
    paragraph:'+442087209292 / +447520619292'
  },
  {
    image:'/icons/address-location.svg',
    title:'address',
    paragraph:'Old Gloucester Street, WC1N 3AX, London, United Kingdom'
  },
  {
    image:'/icons/email-full.svg',
    title:'call us',
    paragraph:'info@yorkbritishacademy.uk'
  },
]
