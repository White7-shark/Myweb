/*
 * Every app the site advertises. Add an object here and the build makes its
 * page at /apps/<slug>, a card on the home page, and its entries in the
 * sitemap and structured data — nothing else to edit.
 *
 * Write for people, not for search engines: Google ranks a page on how well
 * it answers what someone searched for. `uses` are the everyday words people
 * type ("diary app with password", "expense tracker offline"), each answered
 * honestly in a sentence; `faq` answers the questions they ask. Never list
 * keywords the app does not live up to.
 *
 * Images go in public/apps/<slug>/: icon-512.png, icon-512.webp,
 * icon-256.webp, icon-192.png and og.jpg (1200×630, the picture shown when
 * the link is shared). Screenshots, if any, are listed in `screenshots`.
 */
export const APPS = [
  {
    slug: "personify",
    name: "Personify Life",
    shortName: "Personify",
    /** Shown under the name everywhere. */
    tagline: "Your whole life in one app — tasks, calendar, contacts, calls, notes, diary, files and money. Offline, private, no account.",
    /** The search-result description: about 150 characters. */
    metaDescription:
      "Personify Life is a free, offline Android app for tasks and reminders, calendar, contacts and calls, notes, a diary, documents, budgets and savings — private, no account.",
    status: "live", // "live" | "soon" | "development"
    platform: "Android",
    price: "Free",
    category: "ProductivityApplication",
    packageId: "com.sharkapps.personify",
    playUrl: "https://play.google.com/store/apps/details?id=com.sharkapps.personify",
    privacyUrl: "/privacy",
    version: "1.0.1",
    updated: "2026-10-13",
    languages: ["English", "Español", "Français", "Português", "Deutsch", "العربية", "हिन्दी", "Bahasa Indonesia", "Kiswahili"],
    languageCodes: ["en", "es", "fr", "pt", "de", "ar", "hi", "id", "sw"],
    intro: [
      "Personify Life holds the things most people scatter across a dozen apps and a drawer: tasks and reminders, your calendar, contacts and calls, notes, a daily diary, important documents, bills, budgets and savings. They live together, and where it helps they are connected — a task can call someone for you, a note can link to the people and events it is about.",
      "It works completely offline. There is no account to create and no server to sign in to: everything is stored in the app's own private storage on your phone. The parts that matter most can go into a Vault and be encrypted with a password only you know.",
    ],
    highlights: [
      { icon: "wifi-off", title: "Works with no internet", desc: "Every feature runs offline. Nothing to sign in to, nothing to go down." },
      { icon: "lock", title: "Encrypted Vault", desc: "Argon2id and AES-256-GCM, with a password that is never stored." },
      { icon: "bell", title: "Reminders that ring", desc: "Exact alarms that go off with the app closed." },
      { icon: "sparkles", title: "Lucid theme", desc: "Takes its colours from your wallpaper, a photo or a video, in liquid glass." },
      { icon: "globe", title: "Nine languages", desc: "English, Spanish, French, Portuguese, German, Arabic, Hindi, Indonesian, Swahili." },
    ],
    features: [
      {
        icon: "sparkles",
        title: "A home screen for your day",
        desc: "Open the app and see what matters today, with every section one tap away.",
        points: [
          "Today's focus: how many tasks are left, with a progress bar",
          "Counts that need acting on: tasks, events coming up, bills due",
          "Quick add for a task, event, note, journal entry or expense",
          "A floating glass navigation bar on every screen, above your phone's own buttons",
          "Reopens on the screen you left",
        ],
      },
      {
        icon: "check",
        title: "Tasks, to-do lists and reminders",
        desc: "A to-do list with alarms that actually ring, even when the app is closed.",
        points: [
          "Due dates, priorities, subtasks and checklists",
          "Repeating tasks: daily, weekly, monthly or your own pattern",
          "Tasks that start a call or a message to someone at the right time",
          "Postpone with one tap — and see which tasks you keep putting off",
          "Task history, so finished work is never lost",
        ],
      },
      {
        icon: "calendar",
        title: "Calendar, events and birthdays",
        desc: "Plan your days, weeks and months, and never miss a birthday.",
        points: [
          "Day, week and month views",
          "Recurring events, with single occurrences you can move on their own",
          "Reschedule, fulfil or cancel — your history keeps the difference",
          "Birthday reminders from your contacts",
        ],
      },
      {
        icon: "phone",
        title: "Contacts and a full phone app",
        desc: "Make Personify your phone app: dial pad, call screen, call blocking and more.",
        points: [
          "Dial pad with +, pause and wait; service codes like *124# run directly",
          "Speed dial, call recording, group calls and video calls",
          "Hush Mode: Do Not Disturb for chosen people, with a text reply",
          "Ghost or block numbers, and automatic call retries",
          "Caller info for unknown numbers, voicemail and Wi-Fi calling",
          "Quick messages by SMS or WhatsApp, ringtones and call screen backgrounds",
        ],
      },
      {
        icon: "chart",
        title: "Call insights",
        desc: "See who you really talk to, and who you are drifting away from.",
        points: [
          "Calls, talk time, pick-up rate and streaks",
          "Your inner circle, keep-in-touch goals and people you are drifting from",
          "Weekly trends and when you usually call",
          "Filter by day, week, month or year, and go back to any earlier period",
        ],
      },
      {
        icon: "book",
        title: "Notes, a diary and a journal you read like a book",
        desc: "A private diary app with mood, highlights and reflections — and an e-book reader for your own life.",
        points: [
          "Notes built from text, checklists, photos, voice notes, files and links",
          "Daily journal with mood, highlights, tags and a reflection",
          "Journal book: read entries as chapters with paper, sepia and night pages, bookmarks and page turns",
          "Lock any note or diary entry with a password",
        ],
      },
      {
        icon: "folder",
        title: "Documents and files",
        desc: "Keep IDs, receipts, certificates and photos in one organised place.",
        points: [
          "Import from your files, gallery, camera, Google Drive or WhatsApp",
          "Categories and folders, both at once",
          "Expiry reminders for passports and ID cards",
          "Encrypt any file, or move it into the Vault",
        ],
      },
      {
        icon: "wallet",
        title: "Money: expenses, bills, budgets and savings",
        desc: "An expense tracker and budget planner that needs no bank login.",
        points: [
          "Expenses and income with categories and filters",
          "Bills with due dates and repeats; paying one logs the expense",
          "Budgets, savings goals with projections, and assets",
          "Financial insights by day, week, month, quarter, half-year or year",
        ],
      },
      {
        icon: "sparkles",
        title: "Lucid: a theme made from your wallpaper",
        desc: "Personify takes on your wallpaper's light or dark, its colours and its accents, with liquid-glass cards laid over it.",
        points: [
          "Use your phone's wallpaper, or choose a photo or a short video (up to 7 MB)",
          "A light wallpaper gives a light app; a dark one, a dark app",
          "Every accent comes from the picture's own colours",
          "Text stays readable on any wallpaper, measured against its brightest and darkest parts",
          "A video background plays silently on a loop and pauses when you leave the app",
        ],
      },
      {
        icon: "shield",
        title: "Privacy, Vault and backup",
        desc: "Your data stays on your phone, and only you hold the key.",
        points: [
          "No account, no server, no tracking",
          "App Lock with PIN or fingerprint, per section",
          "Vault and encryption with Argon2id and AES-256-GCM",
          "Backup and restore to your own Google Drive, OneDrive, Dropbox or any cloud — password-protected if you like",
          "Universal search across everything you keep",
        ],
      },
    ],
    uses: [
      { title: "An offline to-do list and reminder app", desc: "Tasks with alarms that ring on time, with no internet and no sign-in." },
      { title: "A diary app with a password", desc: "Write a private journal and lock entries with real encryption, not just a PIN screen." },
      { title: "An expense tracker and budget planner without an account", desc: "Track spending, bills, budgets and savings without connecting a bank or creating a profile." },
      { title: "A document organiser for IDs and receipts", desc: "Keep passports, certificates and receipts together, with reminders before they expire." },
      { title: "A phone dialer and call blocker for Android", desc: "A dial pad, call screen, call recording, blocking and Do Not Disturb for chosen people." },
      { title: "A planner that matches your wallpaper", desc: "Lucid re-themes the whole app from your wallpaper, a photo or a video — in liquid glass." },
      { title: "A personal organiser that keeps data on your phone", desc: "One app instead of six, and none of it leaves your device unless you back it up yourself." },
    ],
    faq: [
      { q: "Is Personify Life free?", a: "Yes. Personify Life is free to download on Google Play, with no ads and no account." },
      { q: "Does Personify need the internet?", a: "No. Every feature works offline. The only things that use the internet are ones you start yourself, such as looking up an unknown caller or saving a backup to your own cloud." },
      { q: "Where is my data stored?", a: "In the app's own private storage on your phone. There is no Personify server, so nothing is uploaded, synced or shared." },
      { q: "Can I lock my diary, notes and files?", a: "Yes. Move them into the Vault, protected by your PIN or fingerprint, and encrypt them with a separate password using Argon2id and AES-256-GCM." },
      { q: "What happens if I forget my encryption password?", a: "It cannot be recovered, and neither can anything still encrypted with it. The password is never stored anywhere — that is what makes the encryption real." },
      { q: "Can I move my data to a new phone?", a: "Yes. Back up to one file in Google Drive, OneDrive, Dropbox or any cloud — by hand or automatically every day or week — and restore it on the new phone." },
      { q: "Can Personify replace my phone app?", a: "Yes. Make it your default phone app for its dial pad, call screen, call recording, blocking, Hush Mode, voicemail and call insights." },
      { q: "What is the Lucid theme?", a: "A see-through theme: your wallpaper shows behind the app, and Personify takes its light or dark, colours and accents from it, with liquid-glass cards on top. Text is kept readable whatever the wallpaper." },
      { q: "Can I use my own photo or video as the background?", a: "Yes. In Settings > Appearance, choose Lucid and then a photo or a video of up to 7 MB. The app takes its colours from it, and a video plays silently on a loop." },
      { q: "Which languages does Personify support?", a: "English, Spanish, French, Portuguese, German, Arabic, Hindi, Indonesian and Swahili." },
    ],
    tags: ["To-do list", "Reminders", "Calendar", "Diary", "Journal", "Notes", "Expense tracker", "Budget planner", "Document organiser", "Phone dialer", "Call blocker", "Offline", "Encrypted"],
    /** Screen previews, shown on the app page and in its structured data (720×1520 WebP). */
    screenshots: [
      { src: "/apps/personify/screens/home-dark.webp", alt: "Personify home screen in the dark theme", caption: "Home — your day at a glance" },
      { src: "/apps/personify/screens/home-light.webp", alt: "Personify home screen in the light theme", caption: "Home in the light theme" },
      { src: "/apps/personify/screens/apps-dark.webp", alt: "The Apps screen listing every section", caption: "Apps — every section" },
      { src: "/apps/personify/screens/tasks-light.webp", alt: "The task list with the navigation bar", caption: "Tasks, with the navigation bar" },
      { src: "/apps/personify/screens/onboarding-theme.webp", alt: "Choosing a look during setup: light, dark, automatic or Lucid", caption: "Pick your look" },
    ],
    /** The Lucid theme on different backgrounds. */
    lucidShots: [
      { src: "/apps/personify/screens/lucid-night.webp", alt: "Lucid theme on a night-sky wallpaper, dark blue", caption: "Night sky → deep blue" },
      { src: "/apps/personify/screens/lucid-beach.webp", alt: "Lucid theme on a beach photo, light", caption: "Beach → light and sandy" },
      { src: "/apps/personify/screens/lucid-sunset.webp", alt: "Lucid theme on a sunset photo, amber", caption: "Sunset → amber and red" },
      { src: "/apps/personify/screens/lucid-pastel.webp", alt: "Lucid theme on a pastel gradient, light", caption: "Pastel gradient → light" },
      { src: "/apps/personify/screens/lucid-purple.webp", alt: "Lucid theme on a purple gradient", caption: "Purple → purple and magenta" },
      { src: "/apps/personify/screens/lucid-flowers-apps.webp", alt: "Lucid theme on a flower photo, Apps screen", caption: "Flowers → gold and teal" },
      { src: "/apps/personify/screens/lucid-video.webp", alt: "Lucid theme over a looping video background", caption: "A video background" },
      { src: "/apps/personify/screens/lucid-settings.webp", alt: "Choosing the Lucid background: phone wallpaper, photo or video", caption: "Choose wallpaper, photo or video" },
    ],
  },
];
