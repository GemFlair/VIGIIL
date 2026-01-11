
import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  BookOpenCheck, 
  ChevronRight, 
  AlertCircle, 
  TrendingUp, 
  Users, 
  Target, 
  Lock, 
  FileText, 
  Scale, 
  ShieldAlert, 
  AlertTriangle,
  Fingerprint,
  History,
  Brain,
  Globe,
  Activity,
  UserCheck
} from 'lucide-react';
import { DocumentWatermark, SectionHeader, DocCard, TechLabel, ClauseFrame, TechNote } from './DocHelpers';

export const WhitepaperContent = () => {
  const [activeSection, setActiveSection] = useState<string>("intro");

  const tableOfContents = [
    { id: "intro", label: "1. Introduction" },
    { id: "evolution", label: "2. The Evolution of Crypto Crime" },
    { id: "what-is-poison", label: "3. What Is a Poison Attack?" },
    { id: "real-world-workings", label: "4. Real World Mechanics" },
    { id: "differentiation", label: "5. Why Poisoning is Different" },
    { id: "observed-types", label: "6. Observed Attack Vectors" },
    { id: "human-factor", label: "7. The Human Factor" },
    { id: "global-scale", label: "8. Global Scam Losses" },
    { id: "measurable-losses", label: "9. Measurable Losses" },
    { id: "high-profile-incidents", label: "10. High-Profile Incidents" },
    { id: "underreporting", label: "11. Systematic Underreporting" },
    { id: "ux-failure", label: "12. Failure of UX Protections" },
    { id: "trust-impact", label: "13. Ecosystem Trust Impact" },
    { id: "inevitability", label: "14. Inevitability of Layer 0.5" },
    { id: "conclusion", label: "15. Redefining Security" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(`wp-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id.replace('wp-', '');
          setActiveSection(id);
        }
      });
    }, observerOptions);

    tableOfContents.forEach((item) => {
      const el = document.getElementById(`wp-${item.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="space-y-0 pb-40 max-w-6xl mx-auto selection:bg-blue-600/20 relative">
      <DocumentWatermark text="STRATEGIC WHITEPAPER" />
      
      <SectionHeader 
        id="WHITE-VG-2026.WP.01"
        category="Strategic Research Unit"
        title="Human-Layer Security."
        subtitle="Addressing the Deception Primitive in Modern Web3"
        colorClass="text-blue-500"
        bgGlow="bg-blue-600/10"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 px-2 md:px-12 relative z-10">
        
        {/* Sidebar ToC */}
        <aside className="lg:col-span-4 space-y-8 sticky top-24 h-fit hidden lg:block">
           <div className="p-8 bg-[#0a0a0a] border border-zinc-900 rounded-[2rem] space-y-6 shadow-2xl">
              <div className="flex items-center gap-3 border-b border-zinc-900 pb-4">
                 <BookOpenCheck className="w-4 h-4 text-blue-500" />
                 <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em]">Table of Contents</h4>
              </div>
              <nav className="flex flex-col gap-1.5 max-h-[60vh] overflow-y-auto no-scrollbar">
                 {tableOfContents.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <button 
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`text-left text-[11px] font-bold transition-all uppercase tracking-widest py-1.5 flex items-center gap-2 group ${
                          isActive ? 'text-white translate-x-2' : 'text-zinc-500 hover:text-zinc-300 hover:translate-x-1'
                        }`}
                      >
                        <ChevronRight className={`w-3 h-3 transition-colors ${
                          isActive ? 'text-blue-500' : 'text-zinc-800 group-hover:text-blue-500'
                        }`} />
                        {item.label}
                      </button>
                    );
                 })}
              </nav>
           </div>

           <div className="p-6 bg-red-600/5 border border-red-900/20 rounded-[1.5rem] space-y-4">
              <div className="flex items-center gap-2">
                 <ShieldAlert className="w-4 h-4 text-red-500" />
                 <h5 className="text-[10px] font-black text-red-500 uppercase tracking-widest">Risk Disclosure</h5>
              </div>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-relaxed">
                Security is probabilistic, not absolute. Use of VIGIL does not eliminate blockchain risk.
              </p>
           </div>

           <TechNote title="DOCUMENT INTEGRITY">
             This whitepaper is intended for institutional review. All data is verified against VIGIL Threat Intelligence logs as of Q1 2026.
           </TechNote>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-8 space-y-24 md:space-y-32">
          
          {/* 1. Introduction */}
          <section id="wp-intro" className="scroll-mt-32 space-y-10">
            <TechLabel text="SECTION 01" color="blue" />
            <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none">
              1. Introduction: The Hidden Cost of Crypto Adoption
            </h2>
            <DocCard border="zinc">
              <div className="space-y-6 text-zinc-400 text-lg md:text-xl leading-relaxed font-medium">
                <p>Cryptocurrency has matured from an experimental financial system into a global economic layer supporting trillions of dollars in assets, millions of users, and a rapidly expanding ecosystem of applications. Yet, alongside this growth, a less visible but deeply consequential problem has emerged: <b>the accelerating loss of user funds due not to failures in cryptography or blockchain protocols, but to attacks that exploit human behavior.</b></p>
                <p>For years, the crypto industry has focused its security narrative on smart contract exploits, consensus failures, and protocol vulnerabilities. While these risks remain real, they no longer represent the primary threat to most users. Today, the dominant losses occur at the moment a human interacts with the system — when copying an address, approving a transaction, or trusting a familiar interface.</p>
                <p className="border-l-4 border-blue-600/30 pl-8 text-white italic">This whitepaper examines one of the most damaging manifestations of this shift: address poisoning attacks, also known as poison attacks. These attacks are emblematic of a broader class of threats that operate not at the blockchain layer, but at what can be called the human layer — the space where users make irreversible decisions based on trust, habit, and interface cues.</p>
              </div>
            </DocCard>
          </section>

          {/* 2. Evolution */}
          <section id="wp-evolution" className="scroll-mt-32 space-y-10">
            <TechLabel text="SECTION 02" color="blue" />
            <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none">
              2. The Evolution of Crypto Crime: From Protocol Exploits to Human Attacks
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                 <p className="text-zinc-400 text-base leading-relaxed font-medium">
                   In the early years of crypto, the largest losses were driven by infrastructure failures. Exchanges were hacked, private keys were poorly managed, and smart contracts were deployed without sufficient auditing. Over time, these weaknesses became harder to exploit. <u>Wallet security improved, audits became standard, and institutional practices matured.</u>
                 </p>
              </div>
              <div className="px-4 py-8 md:p-8 bg-zinc-900/30 border border-zinc-800 rounded-3xl space-y-4">
                 <TrendingUp className="w-8 h-8 text-blue-500" />
                 <h4 className="text-white font-black uppercase tracking-tight italic">Attack Stack Migration</h4>
                 <p className="text-zinc-500 text-sm leading-relaxed">As systems harden, attackers move up the stack — from hardware, to software, to networks, and eventually to humans. Crypto is now firmly in this phase.</p>
              </div>
            </div>
            <p className="text-zinc-400 text-lg leading-relaxed font-medium">
              Address poisoning is a textbook example of this transition. It requires no zero-day vulnerability, no malware infection in many cases, and no breach of the blockchain itself. It succeeds by manipulating what users see, remember, and trust.
            </p>
          </section>

          {/* 3. What Is a Poison Attack */}
          <section id="wp-what-is-poison" className="scroll-mt-32 space-y-10">
            <TechLabel text="SECTION 03" color="red" />
            <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none">
              3. What Is a Poison Attack (Address Poisoning)?
            </h2>
            <DocCard border="red">
              <div className="space-y-8">
                <p className="text-zinc-300 text-xl md:text-2xl leading-relaxed font-black uppercase tracking-tight">
                  "A form of crypto scam in which an attacker deliberately injects a malicious wallet address into a user’s transaction history or workflow in order to trick the user into sending funds to the wrong destination."
                </p>
                <div className="h-[1px] w-full bg-red-900/20" />
                <p className="text-zinc-500 text-base leading-relaxed font-medium">
                  The attack exploits the fact that cryptocurrency addresses are long, non-human-readable strings and that most users rely on copy-paste, transaction history, or partial visual verification when sending funds. By creating an address that closely resembles a legitimate one and ensuring it appears in the user’s recent activity, the attacker increases the likelihood that the user will accidentally reuse it.
                </p>
                <TechNote title="CRITICAL DISTINCTION">
                  Address poisoning does not involve hacking wallets, breaking encryption, or compromising the blockchain. <b>The user authorizes the transaction themselves.</b> Once the transaction is confirmed, it is irreversible.
                </TechNote>
              </div>
            </DocCard>
          </section>

          {/* 4. Real World Mechanics */}
          <section id="wp-real-world-workings" className="scroll-mt-32 space-y-10">
            <TechLabel text="SECTION 04" color="blue" />
            <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none">
              4. How Poison Attacks Actually Work in the Real World
            </h2>
            <div className="space-y-8">
              <ClauseFrame id="WP-ARCH-01">
                <h5 className="text-white font-black uppercase tracking-widest flex items-center gap-3">
                  <Fingerprint className="w-4 h-4 text-blue-500" /> Phase A: Generation
                </h5>
                <p className="text-zinc-500 text-base leading-relaxed">The attacker generates a wallet address that shares the same leading and trailing characters as a target address the victim commonly interacts with. Because many wallet interfaces truncate addresses, these look-alike addresses can appear legitimate at a glance.</p>
              </ClauseFrame>
              <ClauseFrame id="WP-ARCH-02">
                <h5 className="text-white font-black uppercase tracking-widest flex items-center gap-3">
                  <History className="w-4 h-4 text-purple-500" /> Phase B: Positioning
                </h5>
                <p className="text-zinc-500 text-base leading-relaxed">The attacker sends a small transaction (dust) to or from the victim’s address. This transaction exists solely to place the attacker’s address into the victim’s transaction history.</p>
              </ClauseFrame>
              <ClauseFrame id="WP-ARCH-03">
                <h5 className="text-white font-black uppercase tracking-widest flex items-center gap-3">
                  <ShieldAlert className="w-4 h-4 text-red-500" /> Phase C: Execution
                </h5>
                <p className="text-zinc-500 text-base leading-relaxed">Weeks or months later, the victim intends to send funds, selects the poisoned address from history by mistake, and executes the transfer. There is often no immediate feedback loop or suspicious prompt at the moment of error.</p>
              </ClauseFrame>
            </div>
          </section>

          {/* 5. Differentiation */}
          <section id="wp-differentiation" className="scroll-mt-32 space-y-10">
            <TechLabel text="SECTION 05" color="blue" />
            <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none">
              5. Why Address Poisoning Is Different from Other Crypto Scams
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { t: "No Urgency", d: "Does not rely on fear or fake emails." },
                { t: "No External Links", d: "Operates entirely within legitimate blockchain activity." },
                { t: "No Protocol Exploit", d: "Requires no malicious smart contracts or zero-day hacks." }
              ].map((item, i) => (
                <div key={i} className="px-4 py-8 md:p-8 bg-[#0a0a0a] border border-zinc-900 rounded-2xl space-y-3">
                  <h4 className="text-white font-black uppercase tracking-widest text-[10px]">{item.t}</h4>
                  <p className="text-zinc-600 text-[11px] font-medium leading-relaxed uppercase">{item.d}</p>
                </div>
              ))}
            </div>
            <p className="text-zinc-400 text-lg leading-relaxed font-medium italic border-l-2 border-zinc-800 pl-8">
              The attacker’s advantage lies in patience and probability. They are betting that, over time, routine behavior will override vigilance. When the mistake happens, the loss is often large — because victims typically reuse addresses for meaningful transfers.
            </p>
          </section>

          {/* 6. Observed Types */}
          <section id="wp-observed-types" className="scroll-mt-32 space-y-10">
            <TechLabel text="SECTION 06" color="blue" />
            <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none">
              6. Types of Poison Attacks Observed in the Wild
            </h2>
            <DocCard border="zinc">
              <div className="space-y-6">
                <p className="text-zinc-400 text-lg leading-relaxed font-medium">Address poisoning manifests in several forms. The most common involves <b>transaction history poisoning</b>, where attackers rely on wallet UI behavior and user habits.</p>
                <div className="px-3 py-6 md:p-6 bg-zinc-950 border border-zinc-900 rounded-2xl space-y-4">
                  <h5 className="text-white font-black uppercase tracking-widest text-xs flex items-center gap-2">
                    <AlertTriangle className="w-3 h-3 text-orange-500" /> Clipboard Manipulation
                  </h5>
                  <p className="text-zinc-500 text-sm leading-relaxed">Another variant involves malware replacing copied addresses with attacker-controlled ones. Some attacks combine both techniques, increasing success rates.</p>
                </div>
                <p className="text-zinc-500 text-sm italic">Attackers also poison public explorers, chat logs, or documentation repositories with look-alike addresses, knowing users may copy from those sources later.</p>
              </div>
            </DocCard>
          </section>

          {/* 7. Human Factor */}
          <section id="wp-human-factor" className="scroll-mt-32 space-y-10">
            <TechLabel text="SECTION 07" color="emerald" />
            <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none">
              7. The Human Factor: Why Users Fall for Poison Attacks
            </h2>
            <div className="px-4 py-10 md:p-10 bg-emerald-600/5 border border-emerald-900/20 rounded-[2rem] space-y-8">
              <Brain className="w-10 h-10 text-emerald-500" />
              <p className="text-white text-2xl font-black italic uppercase tracking-tight leading-tight">
                "Humans are not designed to verify 42-character hexadecimal strings repeatedly."
              </p>
              <div className="space-y-4 text-zinc-400 text-lg leading-relaxed font-medium">
                <p>Cognitive science shows that people rely on pattern recognition, muscle memory, and trust in familiar interfaces. Crypto workflows violate these instincts by requiring perfect accuracy in hostile environments.</p>
                <p>As users gain experience, they paradoxically become more vulnerable. Repetition breeds confidence, and confidence reduces verification. Address poisoning exploits this exact moment — when users stop double-checking because they believe they are safe.</p>
              </div>
            </div>
          </section>

          {/* 8. Global Scale */}
          <section id="wp-global-scale" className="scroll-mt-32 space-y-10">
            <TechLabel text="SECTION 08" color="blue" />
            <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none">
              8. The Scale of the Problem: Global Crypto Scam Losses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-4 text-7xl font-black text-blue-500 italic tracking-tighter">
                $3–6B
              </div>
              <div className="md:col-span-8 space-y-4">
                <p className="text-zinc-400 text-lg leading-relaxed font-medium">Law enforcement and industry reports consistently place annual crypto scam losses in the range of $3–6 billion, with some years exceeding that figure depending on market conditions.</p>
                <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest leading-relaxed">Includes investment scams, phishing, impersonation, fake applications, rug pulls, and social engineering. <u>These figures are widely acknowledged to be underestimates.</u></p>
              </div>
            </div>
          </section>

          {/* 9. Measurable Losses */}
          <section id="wp-measurable-losses" className="scroll-mt-32 space-y-10">
            <TechLabel text="SECTION 09" color="blue" />
            <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none">
              9. Address Poisoning Losses: What We Can Measure
            </h2>
            <DocCard border="zinc">
              <div className="space-y-6">
                <p className="text-zinc-400 text-lg leading-relaxed font-medium">Unlike broader scam categories, address poisoning losses are harder to quantify because they blend into legitimate transaction flows. However, academic research and blockchain analytics have identified tens of millions of dollars in confirmed address poisoning losses.</p>
                <div className="flex items-center gap-12 px-4 py-8 md:p-8 bg-zinc-950 border border-zinc-900 rounded-3xl">
                  <div className="space-y-1">
                    <span className="text-4xl font-black text-white italic tracking-tighter">$100M</span>
                    <span className="block text-[8px] font-black text-zinc-600 uppercase tracking-widest">Cumulative Verified</span>
                  </div>
                  <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest leading-relaxed">
                    Conservative, on-chain–verifiable estimates place directly attributable address poisoning losses at approximately $80–100 million cumulatively. The true number is significantly higher.
                  </p>
                </div>
              </div>
            </DocCard>
          </section>

          {/* 10. High Profile Incidents */}
          <section id="wp-high-profile-incidents" className="scroll-mt-32 space-y-10">
            <TechLabel text="SECTION 10" color="red" />
            <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none">
              10. Largest Single Losses and Recent High-Profile Incidents
            </h2>
            <DocCard border="red">
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="px-3 py-1 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded">DECEMBER 2025</div>
                  <h4 className="text-white font-black uppercase tracking-widest text-lg">THE $50M USDT INCIDENT</h4>
                </div>
                <p className="text-zinc-400 text-xl leading-relaxed font-medium">In December 2025, a single address poisoning incident resulted in the loss of approximately $50 million USDT. The victim copied an address from transaction history, unknowingly selecting a poisoned look-alike address. The funds were transferred, laundered, and largely unrecovered.</p>
                <p className="text-red-500 text-sm font-black uppercase tracking-widest italic">This incident demonstrates the asymmetric nature of the risk: one small human error can result in catastrophic loss.</p>
              </div>
            </DocCard>
          </section>

          {/* 11. Underreporting */}
          <section id="wp-underreporting" className="scroll-mt-32 space-y-10">
            <TechLabel text="SECTION 11" color="blue" />
            <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none">
              11. Why Poison Attack Losses Are Systematically Underreported
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="px-4 py-8 md:p-8 border border-zinc-900 rounded-3xl space-y-4">
                  <Users className="w-6 h-6 text-zinc-700" />
                  <h5 className="text-white font-black uppercase tracking-widest text-xs">Victim Resilience</h5>
                  <p className="text-zinc-500 text-xs leading-relaxed font-medium">Victims often blame themselves and do not report the incident. From an on-chain perspective, the transaction appears valid and intentional. There is no exploit signature.</p>
               </div>
               <div className="px-4 py-8 md:p-8 border border-zinc-900 rounded-3xl space-y-4">
                  <ShieldAlert className="w-6 h-6 text-zinc-700" />
                  <h5 className="text-white font-black uppercase tracking-widest text-xs">Classification Bias</h5>
                  <p className="text-zinc-500 text-xs leading-relaxed font-medium">Address poisoning is frequently misclassified as “user error” rather than fraud, leading to exclusion from official statistics. This classification bias obscures the true scale of the problem.</p>
               </div>
            </div>
          </section>

          {/* 12. UX Failure */}
          <section id="wp-ux-failure" className="scroll-mt-32 space-y-10">
            <TechLabel text="SECTION 12" color="red" />
            <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none">
              12. Why Existing Wallet and UX Protections Are Failing
            </h2>
            <DocCard border="zinc">
              <div className="space-y-6 text-zinc-400 text-lg leading-relaxed font-medium">
                <p>Most wallets were designed for convenience, not adversarial human behavior. <u>Truncated addresses, minimal warnings, and reliance on user vigilance are insufficient defenses against poisoning.</u></p>
                <p className="text-zinc-500 text-sm leading-relaxed italic border-l-2 border-red-500/20 pl-6">
                  Warnings are ignored over time. Manual verification does not scale. Education helps, but it does not eliminate human error. As long as irreversible transactions depend on perfect user behavior, losses will continue.
                </p>
              </div>
            </DocCard>
          </section>

          {/* 13. Trust Impact */}
          <section id="wp-trust-impact" className="scroll-mt-32 space-y-10">
            <TechLabel text="SECTION 13" color="blue" />
            <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none">
              13. The Business and Trust Impact on the Crypto Ecosystem
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed font-medium">Each high-profile loss damages trust — not just in a wallet or protocol, but in crypto as a whole. For enterprises, this translates into higher support costs, legal exposure, and reputational risk. For users, it reinforces the perception that crypto is unsafe.</p>
            <p className="text-white text-xl font-black uppercase italic tracking-tighter underline decoration-blue-500/30 decoration-4 underline-offset-8">
              Address poisoning represents a structural risk to adoption.
            </p>
          </section>

          {/* 14. Inevitability */}
          <section id="wp-inevitability" className="scroll-mt-32 space-y-10">
            <TechLabel text="SECTION 14" color="emerald" />
            <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none">
              14. Why Human-Layer Security Is Inevitable
            </h2>
            <DocCard border="emerald">
              <div className="space-y-6">
                <p className="text-zinc-400 text-lg leading-relaxed font-medium">The industry cannot educate its way out of this problem. Nor can it rely on users to behave perfectly. The only viable path forward is to introduce security systems that operate at the <b>human decision layer</b>, detecting intent mismatches before transactions are finalized.</p>
                <div className="px-4 py-8 md:p-8 bg-emerald-950/20 border border-emerald-900/30 rounded-2xl flex items-center gap-6">
                   <Target className="w-8 h-8 text-emerald-500" />
                   <p className="text-[11px] text-zinc-300 font-black uppercase tracking-widest leading-relaxed">
                     Just as browsers added phishing protection and operating systems added memory safety, crypto must now add human-layer safeguards.
                   </p>
                </div>
              </div>
            </DocCard>
          </section>

          {/* 15. Conclusion */}
          <section id="wp-conclusion" className="scroll-mt-32 space-y-10">
            <TechLabel text="SECTION 15" color="blue" />
            <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none">
              15. Conclusion: Redefining Security Beyond the Blockchain
            </h2>
            <div className="space-y-10">
              <p className="text-zinc-400 text-lg md:text-xl leading-relaxed font-medium">Address poisoning is not a niche scam. It is a symptom of a deeper structural issue: crypto systems are secure by design, but fragile in use. As the ecosystem matures, security must evolve beyond code and cryptography to encompass the human layer. Address poisoning demonstrates what happens when it does not.</p>
              <div className="px-4 py-12 md:p-12 bg-white text-black rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                    <ShieldCheck className="w-32 h-32" />
                 </div>
                 <h3 className="text-4xl md:text-5xl font-black italic uppercase tracking-tight leading-none mb-6">Redefining Protection.</h3>
                 <p className="text-xl md:text-2xl font-black leading-tight">
                   "The next phase of crypto security will not be defined by stronger encryption, but by systems that understand how humans actually behave — and protect them accordingly."
                 </p>
              </div>
            </div>
          </section>

          <div className="pt-32 text-center space-y-10">
            <div className="h-[2px] w-32 bg-zinc-900 mx-auto" />
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-3">
                 <div className="w-12 h-12 bg-zinc-950 border border-zinc-900 rounded-2xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-zinc-700" />
                 </div>
                 <div className="w-12 h-12 bg-zinc-950 border border-zinc-900 rounded-2xl flex items-center justify-center">
                    <Scale className="w-6 h-6 text-zinc-700" />
                 </div>
                 <div className="w-12 h-12 bg-zinc-950 border border-zinc-900 rounded-2xl flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-zinc-700" />
                 </div>
              </div>
              <h3 className="text-4xl font-black text-white italic uppercase tracking-widest">End of Whitepaper</h3>
              <p className="text-[10px] font-black text-zinc-800 uppercase tracking-[0.6em]">VIGIL SECURITY SYSTEMS · GLOBAL RELEASE 2026</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
