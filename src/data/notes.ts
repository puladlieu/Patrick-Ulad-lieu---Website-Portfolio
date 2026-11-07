// Notes / articles. Each one becomes its own page at /notes/<slug>/.
// Keep claims about Patrick's own work limited to facts already in profile.ts; general how-to advice is fine.

export type NoteBlock = { h?: string; p?: string; list?: string[] }
export type Note = {
  slug: string
  title: string
  description: string
  date: string // yyyy-mm-dd
  project?: string // related case study slug
  tags: string[]
  body: NoteBlock[]
}

export const NOTES: Note[] = [
  {
    slug: 'forecasting-hardware-refreshes-excel-vba',
    title: 'Forecasting hardware refreshes with Excel and VBA',
    description: 'A practical method for turning scattered warranty and asset records into a multi-year laptop refresh forecast, using tools most IT teams already have.',
    date: '2026-11-07',
    project: 'hardware-lifecycle-forecasting',
    tags: ['Forecasting', 'Excel / VBA', 'IT Asset Management'],
    body: [
      { p: 'Most organizations replace laptops when they break or when a warranty lapses and someone notices. That works until a large batch of devices ages out in the same year and the budget was never planned for it. A forecast fixes that by showing, years ahead, how many devices each department will need to replace and when.' },
      { p: 'You do not need a dedicated analytics platform to build one. Excel and a little VBA are enough, as long as the data underneath is clean.' },
      { h: 'Start with one clean row per device' },
      { p: 'Asset data usually lives in several places: a tracking system, purchase records, vendor warranty exports, and spreadsheets kept by individual teams. Before any forecasting, merge them into one table where each row is one device.' },
      { list: [
        'A unique key, usually the serial number, with duplicates removed.',
        'Department or cost center, using one agreed spelling for each.',
        'Model, purchase or in-service date, and warranty end date.',
        'Current status, so retired and disposed devices drop out of the count.',
      ] },
      { p: 'Standardizing names is the slow part and the most important one. Two spellings of the same department will quietly split its forecast in half.' },
      { h: 'Decide the replacement rule' },
      { p: 'A forecast is only as good as the rule that says when a device should be replaced. Common choices are warranty end date, a fixed age such as four or five years, or whichever comes first. Look at past replacements to see which rule matches what actually happened, then write it down so everyone reads the forecast the same way.' },
      { h: 'Roll it up by department and year' },
      { p: 'Once each device has a projected replacement year, a pivot table by department and year gives the core forecast. VBA is useful for the repeatable parts: refreshing the source data, re-applying the rule, rebuilding the summaries, and exporting a report for each department so nobody has to redo it by hand.' },
      { h: 'Flag the risk, not just the count' },
      { p: 'Leadership needs to know where an aging device would hurt most. Marking devices that are already past the replacement rule, and grouping them for critical departments such as public safety, turns a spreadsheet into a decision tool.' },
      { h: 'Using AI as a coding assistant' },
      { p: 'An AI assistant is good at drafting formula and VBA syntax quickly. It works best when you have already designed the logic and can check what it writes against data you understand. The rules and the validation still have to come from you.' },
      { p: 'For the real version of this, built for a city-wide fleet, see the case study below.' },
    ],
  },
  {
    slug: 'migrating-it-assets-from-spreadsheets',
    title: 'Moving IT asset tracking from spreadsheets to a platform: a checklist',
    description: 'What to settle before, during, and after importing tens of thousands of IT assets into an asset management platform, so the new system starts out accurate.',
    date: '2026-11-07',
    project: 'teamdynamix-asset-migration',
    tags: ['Data Migration', 'ETL', 'IT Asset Management'],
    body: [
      { p: 'Spreadsheets are where most IT asset tracking starts, and where it stops scaling. Moving to a proper platform brings live updates, history, and reporting, but only if the data that goes in is trustworthy. A migration copies every existing problem unless you deal with it first.' },
      { h: 'Before the import' },
      { list: [
        'Agree on naming conventions for devices, locations, and departments, and write them down.',
        'Map every spreadsheet column to a field in the platform, and decide what happens to columns with no match.',
        'Remove duplicates using a reliable key such as serial number.',
        'List required fields and find the rows that are missing them.',
      ] },
      { h: 'Check locations against the real world' },
      { p: 'Location fields drift: buildings get renamed, addresses are abbreviated differently, and some sites close. Checking them against public records and maps before import catches errors that would otherwise send technicians to the wrong place.' },
      { h: 'During the import' },
      { list: [
        'Import a small batch first and confirm it looks right in the platform.',
        'Reconcile counts after each batch: rows in, records created, rows rejected.',
        'Keep a log of every rejected row and why, then fix the source and re-import.',
      ] },
      { h: 'After the import' },
      { list: [
        'Set up the sync or integration that keeps the platform current, so it does not become a new stale spreadsheet.',
        'Add validation rules so new entries follow the same conventions.',
        'Measure accuracy and recurring entry errors before and after, so you can show the migration paid off.',
      ] },
      { p: 'For a real migration at city scale, including the before-and-after numbers, see the case study below.' },
    ],
  },
  {
    slug: 'windows-11-upgrade-readiness-report',
    title: 'Building a Windows 11 upgrade-readiness report leadership will actually use',
    description: 'How to check thousands of devices against Windows 11 requirements and turn the results into a weekly report that drives purchasing and deployment decisions.',
    date: '2026-11-07',
    project: 'windows-11-readiness-reporting',
    tags: ['Reporting Automation', 'VBA', 'Windows 11', 'IT Asset Management'],
    body: [
      { p: 'Windows 10 reached end of support in October 2025, so every organization has had to answer the same question: which devices can upgrade to Windows 11, and which have to be replaced? With a few hundred machines you can check by hand. With thousands, you need a repeatable report.' },
      { h: 'Know the hard requirements' },
      { p: 'Microsoft publishes a fixed set of minimum requirements. A device that misses any of them cannot take a supported upgrade, so each one becomes a column in your data:' },
      { list: [
        'A supported 64-bit processor (Microsoft keeps a list of approved CPU models).',
        'TPM 2.0 enabled.',
        'UEFI firmware with Secure Boot capability.',
        'At least 4 GB of RAM and 64 GB of storage.',
      ] },
      { p: 'Processor support is the one that rules out the most hardware, so match CPU models against Microsoft\'s list carefully. Small naming differences between inventory exports and the official list are easy to miss.' },
      { h: 'Start from inventory, then fill the gaps' },
      { p: 'Your asset or endpoint management system already holds most of this: model, CPU, RAM, disk size, and often TPM version. Export it into one table with one row per device. Where a field is missing, group those devices separately instead of guessing. "Unknown" is a real category that needs follow-up, and hiding it makes the report look better than the fleet is.' },
      { h: 'Sort every device into a few clear buckets' },
      { list: [
        'Ready: meets every requirement and can be scheduled.',
        'Fixable: fails only on a setting, such as TPM or Secure Boot turned off.',
        'Replace: fails on hardware, usually the processor.',
        'Unknown: missing data that someone has to check.',
      ] },
      { p: 'Leadership does not need the raw columns. They need these counts by department, and the list of devices behind each count when they ask.' },
      { h: 'Automate the weekly refresh' },
      { p: 'The numbers change every week as devices are upgraded, replaced, or added. A VBA macro that reloads the export, re-applies the rules, rebuilds the department summaries, and saves a dated copy turns an afternoon of manual work into a few minutes, and keeps each week comparable to the last.' },
      { h: 'Connect it to money and schedule' },
      { p: 'A readiness report becomes a decision tool once the Replace bucket is tied to purchasing and the Ready bucket is tied to a deployment schedule. That is what lets an IT director say how many devices to buy, for which departments, and in what order.' },
      { p: 'For the real version of this, built for 14,000+ City devices, see the case study below.' },
    ],
  },
]
