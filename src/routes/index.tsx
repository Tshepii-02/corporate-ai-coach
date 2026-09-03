import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Mail,
  FileText,
  CalendarDays,
  Search,
  MessageSquare,
  Copy,
  Check,
  Wand2,
  ShieldCheck,
  Lock,
  Eye,
  ClipboardList,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI-Powered Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Engineer professional AI prompts for emails, meeting summaries, task planning, research, and IT helpdesk support — built for students entering corporate workflows.",
      },
      { property: "og:title", content: "AI-Powered Workplace Productivity Assistant" },
      {
        property: "og:description",
        content:
          "Engineer professional AI prompts for emails, meeting summaries, task planning, research, and IT helpdesk support.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type TabId = "email" | "meeting" | "planner" | "research" | "helpdesk";

const TABS: { id: TabId; label: string; icon: typeof Mail; desc: string }[] = [
  { id: "email", label: "Email Generator", icon: Mail, desc: "Professional delay emails" },
  { id: "meeting", label: "Meeting Summarizer", icon: FileText, desc: "Transcripts to actions" },
  { id: "planner", label: "Task Planner", icon: CalendarDays, desc: "5-day sprint schedules" },
  { id: "research", label: "Research Assistant", icon: Search, desc: "Verified comparisons" },
  { id: "helpdesk", label: "Helpdesk Chatbot", icon: MessageSquare, desc: "IT diagnostics" },
];

const tint: Record<TabId, string> = {
  email: "bg-sky text-sky-foreground",
  meeting: "bg-rose text-rose-foreground",
  planner: "bg-sunshine text-sunshine-foreground",
  research: "bg-sky text-sky-foreground",
  helpdesk: "bg-rose text-rose-foreground",
};

function Field({
  label,
  placeholder,
  value,
  onChange,
  textarea,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-semibold text-foreground">{label}</Label>
      {textarea ? (
        <Textarea
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-44 resize-y bg-muted/40 text-sm"
        />
      ) : (
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-muted/40"
        />
      )}
    </div>
  );
}

function Index() {
  const [active, setActive] = useState<TabId>("email");
  const [navOpen, setNavOpen] = useState(false);

  const [client, setClient] = useState("");
  const [project, setProject] = useState("");
  const [reason, setReason] = useState("");

  const [transcript, setTranscript] = useState("");
  const [objective, setObjective] = useState("");
  const [platformA, setPlatformA] = useState("");
  const [platformB, setPlatformB] = useState("");
  const [issue, setIssue] = useState("");

  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const engineer = (fn: () => string) => {
    setOutput(fn());
    setCopied(false);
  };

  const generate = () => {
    if (active === "email") {
      engineer(
        () => `SYSTEM ROLE:
You are an expert corporate communications coach helping a junior professional write polished, high-empathy business emails.

TASK:
Draft a client-facing email explaining a project delay.

CONTEXT:
- Client Name: ${client || "[Client Name]"}
- Project Name: ${project || "[Project Name]"}
- Reason for Delay: ${reason || "[Reason for delay]"}

STRICT CONSTRAINTS:
1. Keep the entire email under 150 words.
2. Structure: (a) sincere opening acknowledgment, (b) clear honest explanation of the delay, (c) concrete recovery plan with a revised timeline, (d) warm professional closing.
3. Tone: empathetic, accountable, and solution-focused. Never defensive or vague.
4. Do not blame colleagues or external vendors. Own the delay professionally.
5. End with an offer to discuss on a short call.

OUTPUT: The email body only, followed by a one-line suggested subject line.`
      );
    } else if (active === "meeting") {
      engineer(
        () => `SYSTEM ROLE:
You are a precise executive meeting analyst.

TASK:
Analyze the meeting transcript below and produce a structured briefing.

TRANSCRIPT:
"""
${transcript || "[Paste your meeting transcript here]"}
"""

STRICT OUTPUT FORMAT:
1. SUMMARY — exactly 3 sentences covering the meeting's purpose, core discussion, and outcome.
2. KEY DECISIONS — a bulleted list of every decision explicitly agreed upon. If none, write "No formal decisions recorded."
3. ACTION ITEMS — a table with columns: Action | Owner | Due Date (if mentioned). Only include items with a clearly named owner.

CONSTRAINTS:
- Do not infer decisions or actions that were not stated.
- Do not add commentary beyond the three sections above.`
      );
    } else if (active === "planner") {
      engineer(
        () => `SYSTEM ROLE:
You are a senior project planner who builds realistic linear work schedules.

TASK:
Create a 5-day linear execution schedule for the following business objective:

OBJECTIVE:
${objective || "[Describe your main business objective]"}

STRICT OUTPUT FORMAT:
- Day 1 through Day 5, each with:
  • Focus (one line)
  • Tasks (2–4 concrete tasks, in dependency order)
  • Dependencies (what must be finished before these tasks can start)
  • Potential Blockers (one realistic risk) + mitigation
- End with a "Critical Path" line naming the sequence of tasks that cannot slip without moving the deadline.

CONSTRAINTS:
1. Tasks must be ordered logically; later days may only depend on earlier ones.
2. Flag every dependency explicitly — no hidden assumptions.
3. Keep scope realistic for one contributor.`
      );
    } else if (active === "research") {
      engineer(
        () => `SYSTEM ROLE:
You are a rigorous business research analyst with zero tolerance for hallucination.

TASK:
Produce a factual comparison of the following business platforms / competitor tools:

- Platform A: ${platformA || "[Platform or tool A]"}
- Platform B: ${platformB || "[Platform or tool B]"}

ANTI-HALLUCINATION CONSTRAINTS (HIGHEST PRIORITY):
1. Only state facts you can support with verifiable, well-known public information (official pricing pages, documentation, public feature lists).
2. If you are not confident a claim is verifiably true, output exactly: "Data Unavailable" for that field — never guess, estimate, or extrapolate.
3. Do not invent pricing, user counts, funding figures, or feature names.
4. Explicitly note when information may be outdated and recommend checking official sources.

OUTPUT FORMAT:
A comparison table with rows: Core Purpose | Key Features | Pricing Model | Best For | Known Limitations. Follow with a 2-sentence neutral verdict, or "Data Unavailable" if evidence is insufficient.`
      );
    } else {
      engineer(
        () => `SYSTEM ROLE:
You are an internal IT helpdesk agent for a corporate workspace. Your job is to diagnose before you fix.

USER'S REPORTED ISSUE:
"${issue || "[Describe the technical issue]"}"

STRICT BEHAVIOUR RULES:
1. NEVER propose a solution immediately. First, ask 3–5 targeted clarifying diagnostic questions (e.g., device, OS, error messages, when it started, what changed recently, who else is affected).
2. Ask questions one short batch at a time, in plain non-technical language.
3. Only after the user answers, form a hypothesis, state it plainly, and offer step-by-step troubleshooting from least to most invasive.
4. If the issue involves credentials, data loss, or security, instruct the user to contact the official IT security team instead of proceeding.
5. Keep every reply under 120 words, numbered steps where relevant.

BEGIN: Ask your first set of clarifying diagnostic questions now.`
      );
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(output);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = output;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const Active = TABS.find((t) => t.id === active)!;
  const filled =
    active === "email"
      ? client || project || reason
      : active === "meeting"
        ? transcript
        : active === "planner"
          ? objective
          : active === "research"
            ? platformA || platformB
            : issue;

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 shrink-0 flex-col bg-sidebar text-sidebar-foreground transition-transform lg:static lg:translate-x-0 ${
          navOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3 border-b border-sidebar-border px-6 py-6">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold leading-tight">Workplace Productivity</p>
            <p className="truncate text-xs opacity-70">AI Assistant Suite</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {TABS.map((t) => {
            const Icon = t.icon;
            const isActive = active === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setActive(t.id);
                  setNavOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "opacity-75 hover:bg-sidebar-accent/50 hover:opacity-100"
                }`}
              >
                <Icon className="h-4.5 w-4.5 shrink-0" />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold">{t.label}</span>
                  <span className="block truncate text-[11px] opacity-60">{t.desc}</span>
                </span>
                {isActive && <span className="ml-auto h-2 w-2 shrink-0 rounded-full bg-sidebar-primary" />}
              </button>
            );
          })}
        </nav>
        <div className="border-t border-sidebar-border px-6 py-4 text-[11px] opacity-60">
          Built for students entering corporate workflows.
        </div>
      </aside>
      {navOpen && (
        <button
          aria-label="Close menu"
          onClick={() => setNavOpen(false)}
          className="fixed inset-0 z-30 bg-foreground/40 lg:hidden"
        />
      )}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border bg-card px-4 py-4 sm:flex sm:justify-between sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={() => setNavOpen(true)}
              aria-label="Open menu"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border lg:hidden"
            >
              {navOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
            <div className="min-w-0">
              <h1 className="truncate text-lg font-extrabold tracking-tight sm:text-xl">
                AI-Powered Workplace Productivity Assistant
              </h1>
              <p className="truncate text-xs text-muted-foreground sm:text-sm">
                Engineer precise prompts. Work faster, communicate better.
              </p>
            </div>
          </div>
          <div className={`hidden items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold sm:flex ${tint[active]}`}>
            <Active.icon className="h-3.5 w-3.5" />
            {Active.label}
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-8 sm:py-8">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
            {/* Input card */}
            <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${tint[active]}`}>
                  <Active.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h2 className="truncate text-base font-bold">{Active.label}</h2>
                  <p className="truncate text-xs text-muted-foreground">{Active.desc}</p>
                </div>
              </div>

              <div className="space-y-4">
                {active === "email" && (
                  <>
                    <Field label="Client Name" placeholder="e.g. Ms. Thandi Nkosi, Acme Corp" value={client} onChange={setClient} />
                    <Field label="Project Name" placeholder="e.g. Q3 Website Redesign" value={project} onChange={setProject} />
                    <Field label="Reason for Delay" placeholder="e.g. Additional compliance review required" value={reason} onChange={setReason} />
                  </>
                )}
                {active === "meeting" && (
                  <Field
                    label="Meeting Transcript"
                    placeholder="Paste the full meeting transcript or raw notes here…"
                    value={transcript}
                    onChange={setTranscript}
                    textarea
                  />
                )}
                {active === "planner" && (
                  <Field
                    label="Main Business Objective"
                    placeholder="e.g. Launch the new client onboarding portal by Friday"
                    value={objective}
                    onChange={setObjective}
                    textarea
                  />
                )}
                {active === "research" && (
                  <>
                    <Field label="Platform / Tool A" placeholder="e.g. Notion" value={platformA} onChange={setPlatformA} />
                    <Field label="Platform / Tool B" placeholder="e.g. Confluence" value={platformB} onChange={setPlatformB} />
                  </>
                )}
                {active === "helpdesk" && (
                  <Field
                    label="Describe Your Technical Issue"
                    placeholder="e.g. My VPN disconnects every 10 minutes since this morning"
                    value={issue}
                    onChange={setIssue}
                    textarea
                  />
                )}
              </div>

              <Button
                onClick={generate}
                disabled={!filled}
                className="mt-6 w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                size="lg"
              >
                <Wand2 className="h-4 w-4" />
                Engineer Prompt
              </Button>
            </section>

            {/* Output card */}
            <section className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="truncate text-base font-bold">Engineered Prompt</h2>
                  <p className="truncate text-xs text-muted-foreground">
                    Paste this into any AI assistant to run it.
                  </p>
                </div>
                <Button
                  onClick={copy}
                  disabled={!output}
                  variant={copied ? "outline" : "default"}
                  className={`shrink-0 gap-2 ${copied ? "border-sky-foreground/30 text-sky-foreground" : "bg-primary text-primary-foreground"}`}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied!" : "Copy to Clipboard"}
                </Button>
              </div>
              {output ? (
                <pre className="prompt-scroll max-h-105 flex-1 overflow-auto whitespace-pre-wrap rounded-xl border border-border bg-muted/50 p-4 font-mono text-xs leading-relaxed text-foreground sm:text-[13px]">
                  {output}
                </pre>
              ) : (
                <div className="grid flex-1 place-items-center rounded-xl border border-dashed border-border bg-muted/30 p-10 text-center">
                  <div>
                    <ClipboardList className="mx-auto mb-3 h-8 w-8 text-muted-foreground/50" />
                    <p className="text-sm font-medium text-muted-foreground">
                      Fill in the fields and click "Engineer Prompt"
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground/70">
                      Your structured, professional prompt will appear here.
                    </p>
                  </div>
                </div>
              )}
            </section>
          </div>
        </main>

        {/* Guardrails footer */}
        <footer className="border-t border-border px-4 py-6 sm:px-8">
          <div className="mx-auto max-w-6xl rounded-2xl border border-border bg-primary p-6 text-primary-foreground sm:p-8">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 shrink-0 text-sunshine" />
              <h2 className="text-base font-bold sm:text-lg">
                🔒 Responsible AI Guardrails &amp; Ethical Policies
              </h2>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-sidebar-accent/60 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-bold">
                  <Lock className="h-4 w-4 shrink-0 text-sunshine" /> Data Privacy Protection
                </div>
                <ul className="list-disc space-y-1 pl-4 text-xs opacity-85">
                  <li>Never paste personal client records, IDs, or contact details into AI tools.</li>
                  <li>Anonymize names and sensitive figures before submitting data.</li>
                  <li>Follow your organization's data-handling policy at all times.</li>
                </ul>
              </div>
              <div className="rounded-xl bg-sidebar-accent/60 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-bold">
                  <Eye className="h-4 w-4 shrink-0 text-sunshine" /> Verification Protocols
                </div>
                <ul className="list-disc space-y-1 pl-4 text-xs opacity-85">
                  <li>Manually audit every summary and figure for hallucinations.</li>
                  <li>Cross-check facts against official sources before sharing.</li>
                  <li>Treat "Data Unavailable" as a signal to research further — not to guess.</li>
                </ul>
              </div>
              <div className="rounded-xl bg-sidebar-accent/60 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-bold">
                  <FileText className="h-4 w-4 shrink-0 text-sunshine" /> Output Transparency
                </div>
                <ul className="list-disc space-y-1 pl-4 text-xs opacity-85">
                  <li>Disclose AI assistance where company policy or clients require it.</li>
                  <li>You remain accountable for every message you send.</li>
                  <li>AI drafts; humans decide and take responsibility.</li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
