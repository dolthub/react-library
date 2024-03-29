const commonWords = [
  "is",
  "a",
  "the",
  "we",
  "but",
  "and",
  "this",
  "that",
  "in",
  "to",
  "of",
  "have",
  "not",
  "with",
];
const fromWikipedia = [
  "accelerometer",
  "ADSL",
  "android",
  "archive",
  "ATX",
  "backup",
  "bandwidth",
  "benchmark",
  "barcode",
  "booting",
  "bios",
  "bitmap",
  "Bitcoin",
  "BitTorrent",
  "blacklist",
  "bluetooth",
  "binary",
  "backlink",
  "bloatware",
  "burn",
  "cache",
  "compression",
  "content",
  "CMOS",
  "cookie",
  "cybercrime",
  "cybersecurity",
  "daemon",
  "debug",
  "dock",
  "DOS",
  "driver",
  "device driver",
  "DPI",
  "DRM",
  "encryption",
  "emulator",
  "ethernet",
  "end user",
  "fat32",
  "framework",
  "freeware",
  "firewall",
  "FTP",
  "gif",
  "Git",
  "GPS",
  "GUI",
  "HTML",
  "https",
  "IEEE",
  "ISO",
  "IMEI",
  "ISP",
  "Java",
  "JavaScript",
  "jpeg",
  "kernel",
  "LAN",
  "LCD",
  "LED",
  "Macintosh",
  "mp3",
  "malware",
  "MMS",
  "MIDI",
  "newbie",
  "OEM",
  "OS",
  "OCR",
  "overclock",
  "pdf",
  "phishing",
  "Python",
  "plug-in",
  "qwerty",
  "remote access",
  "registry",
  "read-only",
  "RAID",
  "rooting",
  "Safe Mode",
  "SSID",
  "SEO",
  "service pack",
  "server",
  "source code",
  "spam",
  "search engine",
  "Swype",
  "trash",
  "underclock",
  "Unix",
  "virus",
  "VGA",
  "web",
  "wifi",
  "Wikipedia",
  "Windows",
  "wireless LAN",
  "World Wide Web",
  "WYSIWYG",
  "WPA",
  "wumpus",
  "zip",
];
const startupJargon = [
  "accelerator",
  "incubator",
  "accredited investor",
  "advertorials",
  "advertainment",
  "bleeding edge",
  "bootstrapping",
  "B2B",
  "B2C",
  "burn rate",
  "capital",
  "churn rate",
  "cliff",
  "pitch deck",
  "disrupt",
  "disruptive",
  "exit",
  "freemium",
  "gamify",
  "growth hacking",
  "growth hacker",
  "hockey stick",
  "IP",
  "iterate",
  "launch",
  "lean",
  "leverage",
  "loss leader",
  "market penetration",
  "monetize",
  "MVP",
  "pivot",
  "ramen",
  "responsive design",
  "ROI",
  "runway",
  "SAAS",
  "scaleable",
  "sweat equity",
  "term sheet",
  "traction",
  "valuation",
  "value prop",
  "vaporware",
  "VC",
  "venture",
];
const appsAndCompanies = [
  "Adobe",
  "Airbnb",
  "Amazon",
  "Apple",
  "Facebook",
  "Google",
  "Instagram",
  "Microsoft",
  "Netflix",
  "Oracle",
  "Salesforce",
  "Snapchat",
  "Telegram",
  "Twitter",
  "Uber",
  "WeChat",
  "WhatsApp",
];
const security = [
  "0-day",
  "exploit",
  "hacker",
  "virus",
  "vulnerability",
  "warez",
];
const dolthubWords = [
  "Dolt",
  "DoltHub",
  "database",
  "version control",
  "MySQL",
  "Git",
  "GitHub",
  "rollback",
  "collaborate",
  "clone",
  "branch",
  "merge",
  "commit",
  "repository",
  "pull request",
  "schema",
  "data",
  "command line",
  "diff",
  "commit log",
  "lineage",
  "time travel",
  "community",
  "data bounty",
  "open source",
  "query",
  "workflow",
  "script",
];
export default () => [
  ...commonWords,
  ...commonWords,
  ...commonWords,
  ...commonWords,
  ...commonWords,
  ...dolthubWords,
  ...fromWikipedia,
  ...startupJargon,
  ...appsAndCompanies,
  ...security,
];
