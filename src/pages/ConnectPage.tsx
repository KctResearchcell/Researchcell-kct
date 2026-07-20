import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, Sparkles, Mail, Phone, MapPin, Globe, 
  Linkedin, Instagram, Youtube, Twitter, ChevronDown, 
  ChevronRight, Send, HelpCircle, CheckCircle, Clock
} from 'lucide-react';
import PageHeader from '../components/PageHeader';

interface FAQItem {
  id: string;
  q: string;
  a: string;
}

const FAQ_ITEMS: FAQItem[] = [
  { id: "faq-1", q: "How do I join Ré?", a: "You can join through our multiple structured pathways. Students can apply for KREST fellowships every semester, enroll in CORE courses through participating academic departments, or submit independent ideas directly to our Project Intake portal." },
  { id: "faq-2", q: "Who can participate?", a: "Ré is open to undergraduate and postgraduate students, faculty members, research scholars, alumni, and industry professionals. We encourage interdisciplinary exploration across all academic domains." },
  { id: "faq-3", q: "Do I need previous research experience?", a: "Absolutely not! Curiosity and commitment are the only prerequisites. Programs like CORE and KRIP are explicitly designed to introduce research methodology to beginners step-by-step." },
  { id: "faq-4", q: "How can institutions collaborate?", a: "Institutions can co-develop MoU agreements, adopt our academic toolkits, launch joint student projects, or coordinate joint conferences and faculty development programs." },
  { id: "faq-5", q: "How do I become a mentor?", a: "Faculty members, industry veterans, and clinicians can express interest in mentorship through our Connect portal. Approved mentors are matched with ongoing projects in relevant Research Circles." },
  { id: "faq-6", q: "How do I publish through Ré?", a: "Our research circles guide fellows through the entire academic writing process. High-quality investigations are submitted to peer-reviewed indexed journals and national conferences." },
  { id: "faq-7", q: "How do I start a Research Circle?", a: "Senior faculty members or industry experts can propose a new Research Circle by submitting a detailed domain vision statement, structural resource mapping, and target research themes." }
];

export default function ConnectPage({ onNavigate }: { onNavigate: (hash: string) => void }) {
  const [inquiryType, setInquiryType] = useState("opportunities");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dept, setDept] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setEmail("");
      setDept("");
      setMessage("");
    }, 4000);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubmitted(true);
      setTimeout(() => {
        setNewsletterSubmitted(false);
        setNewsletterEmail("");
      }, 4000);
    }
  };

  return (
    <div className="w-full bg-white text-[#202124] font-sans selection:bg-[#4285F4]/15">
      
      {/* HERO */}
      <PageHeader
        category="CONNECT WITH RÉ"
        title="Let's Build the Future of Research Together"
        description="Whether you are a student exploring your first research opportunity, an educator inspiring future scholars, a researcher seeking collaboration, an institution building research culture, or an organisation looking to create meaningful partnerships, we would be delighted to connect with you. Every conversation is an opportunity to learn, collaborate, and create lasting impact."
        accentColor="green"
        gradientTheme="blue"
        hideImages={false}
        images={[
          "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=500&auto=format&fit=crop"
        ]}
      />

      {/* SECTION 1: HOW CAN WE HELP YOU - SMART DYNAMIC FORM */}
      <section className="py-24 border-b border-[#DADCE0]" id="connect-form">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left info column (cols 5) */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#1A73E8] uppercase block">DIRECT CHANNEL ENQUIRIES</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 leading-tight">
              Get in Touch
            </h2>
            <p className="text-sm text-gray-500 font-light leading-relaxed">
              Skip generic inboxes. Choose your primary inquiry objective below and our system will route you directly to the correct coordinator team.
            </p>

            <div className="space-y-2 border-l-2 border-gray-100 pl-6 py-2">
              <button 
                onClick={() => setInquiryType("opportunities")}
                className={`w-full text-left py-2 font-semibold text-xs tracking-wide transition-colors ${inquiryType === 'opportunities' ? 'text-[#1A73E8]' : 'text-gray-400 hover:text-gray-600'}`}
              >
                ↳ Explore Research Opportunities / Join Research Circle
              </button>
              <button 
                onClick={() => setInquiryType("programs")}
                className={`w-full text-left py-2 font-semibold text-xs tracking-wide transition-colors ${inquiryType === 'programs' ? 'text-[#1A73E8]' : 'text-gray-400 hover:text-gray-600'}`}
              >
                ↳ Apply for KREST Fellowship / CORE Curriculum
              </button>
              <button 
                onClick={() => setInquiryType("partnership")}
                className={`w-full text-left py-2 font-semibold text-xs tracking-wide transition-colors ${inquiryType === 'partnership' ? 'text-[#1A73E8]' : 'text-gray-400 hover:text-gray-600'}`}
              >
                ↳ Collaborate / Partner with Ré / Become a Mentor
              </button>
            </div>
          </div>

          {/* Right form column (cols 7) */}
          <div className="lg:col-span-7 bg-white border border-[#DADCE0] rounded-3xl p-8 shadow-xs">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-16 text-center space-y-4"
                >
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Enquiry Submitted Successfully</h3>
                  <p className="text-xs text-gray-500 font-light max-w-sm mx-auto leading-relaxed">
                    Thank you, {name}! Your enquiry concerning our {inquiryType} platform has been received. Our team will contact you at {email} within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleInquirySubmit}
                  className="space-y-6 text-left"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-widest block">Full Name</label>
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Katherine" 
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#1A73E8] focus:bg-white outline-none rounded-xl px-4 py-3 text-xs font-semibold text-gray-900"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-widest block">Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g., katherine@example.com" 
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#1A73E8] focus:bg-white outline-none rounded-xl px-4 py-3 text-xs font-semibold text-gray-900"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-widest block">Department / Institution</label>
                    <input 
                      type="text" 
                      required
                      value={dept}
                      onChange={(e) => setDept(e.target.value)}
                      placeholder="e.g., Kumaraguru Biotech Department" 
                      className="w-full bg-gray-50 border border-gray-200 focus:border-[#1A73E8] focus:bg-white outline-none rounded-xl px-4 py-3 text-xs font-semibold text-gray-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-widest block">Your Message</label>
                    <textarea 
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your research idea, proposed partnership, or questions..." 
                      className="w-full bg-gray-50 border border-gray-200 focus:border-[#1A73E8] focus:bg-white outline-none rounded-xl px-4 py-3 text-xs font-semibold text-gray-900 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gray-900 hover:bg-black text-white font-bold text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>Submit Enquiry</span>
                    <Send className="h-4.5 w-4.5" />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* SECTION 2: VISIT US & SOCIAL WALL */}
      <section className="py-24 border-b border-[#DADCE0] bg-gray-50/50">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left: Office details (cols 5) */}
          <div className="lg:col-span-5 bg-[#1C2E4A] rounded-3xl p-8 text-white flex flex-col justify-between">
            <div className="space-y-6">
              <span className="text-[10px] font-mono font-bold text-[#75D1B5] uppercase tracking-widest block">HEADQUARTERS</span>
              <h3 className="text-2xl font-black">Our doors are always open.</h3>
              <p className="text-xs text-gray-300 leading-relaxed font-light">
                Our doors are always open to conversations that inspire curiosity, collaboration, and meaningful research. Drop by our physical office space to meet mentors or run core experiments.
              </p>
            </div>

            <div className="space-y-4 pt-12 border-t border-white/10 mt-12 font-mono text-[11px] text-gray-300">
              <div className="flex items-center gap-3">
                <MapPin className="h-4.5 w-4.5 text-[#75D1B5]" />
                <span> Kumaraguru Campus, Coimbatore, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4.5 w-4.5 text-[#75D1B5]" />
                <span>Mon - Sat: 9:00 AM - 5:00 PM</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4.5 w-4.5 text-[#75D1B5]" />
                <span>research.cer@kct.ac.in</span>
              </div>
            </div>
          </div>

          {/* Right: Embedded Google Map representation (cols 7) */}
          <div className="lg:col-span-7 bg-white border border-[#DADCE0] rounded-3xl overflow-hidden relative min-h-[350px] flex items-center justify-center p-8 text-center select-none shadow-xs">
            <div className="absolute inset-0 bg-grid-pattern opacity-15" />
            <div className="space-y-4 relative z-10">
              <div className="h-12 w-12 rounded-full bg-blue-100 text-[#1A73E8] flex items-center justify-center mx-auto shadow-sm">
                <MapPin className="h-6 w-6 animate-bounce" />
              </div>
              <h4 className="font-bold text-gray-900 text-sm">Kumaraguru Institutions Campus Map</h4>
              <p className="text-xs text-gray-500 max-w-sm font-light">
                Located inside the core scientific Research block. Access via Gate 2 or main administration parking spaces.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: ROLE COORDINATORS CONTACT DIRECTORY */}
      <section className="py-24 border-b border-[#DADCE0]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20 text-center">
          <div className="max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#1A73E8] uppercase block">ROLE COORDINATION TEAM</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
              Connect With the Right Team
            </h2>
            <p className="text-sm text-gray-500 font-light leading-relaxed">
              Get in touch with specific research cells and administrators directly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              { title: "Admissions & Programmes", email: "admissions.cer@kct.ac.in", desc: "For admissions queries regarding KREST, KRIP fellowships, and CORE." },
              { title: "Research Support", email: "support.cer@kct.ac.in", desc: "For lab facility access, material tests, and equipment allocations." },
              { title: "Publications Support", email: "publications.cer@kct.ac.in", desc: "For formatting, plagiarism checks, and journal selections." },
              { title: "Partnerships & MoUs", email: "partner.cer@kct.ac.in", desc: "For institutional MoUs, state bodies, and joint ventures." }
            ].map((contact, i) => (
              <div key={i} className="bg-white border border-gray-200 p-6 rounded-2xl flex flex-col justify-between hover:border-gray-400 transition-all">
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-gray-900 leading-snug">{contact.title}</h3>
                  <p className="text-xs text-gray-500 font-light leading-relaxed">{contact.desc}</p>
                </div>
                <div className="pt-6 border-t border-gray-50 mt-4">
                  <a href={`mailto:${contact.email}`} className="text-xs font-bold text-[#1A73E8] hover:underline flex items-center gap-1.5">
                    <Mail className="h-4 w-4" />
                    <span>{contact.email}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: FREQUENTLY ASKED QUESTIONS */}
      <section className="py-24 border-b border-[#DADCE0] bg-gray-50/50">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#1A73E8] uppercase block">FAQs</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 leading-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-gray-500 font-light leading-relaxed">
              Find answers to common questions regarding applications, previous research experience requirements, and institutional alignments.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-3">
            {FAQ_ITEMS.map((item) => {
              const isExpanded = expandedFaqId === item.id;
              return (
                <div key={item.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs transition-all">
                  <button
                    onClick={() => setExpandedFaqId(isExpanded ? null : item.id)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-sm text-gray-900 hover:bg-gray-50 cursor-pointer focus:outline-none"
                  >
                    <span>{item.q}</span>
                    <ChevronDown className={`h-4.5 w-4.5 text-gray-400 transform transition-transform shrink-0 ${isExpanded ? 'rotate-180 text-blue-500' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 pt-0 border-t border-gray-100 text-xs text-gray-500 font-light leading-relaxed bg-gray-50/20">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 5: STAY CONNECTED NEWSLETTER */}
      <section className="py-20 bg-[#1C2E4A] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20 relative z-10 text-center space-y-8 max-w-3xl">
          <span className="text-[11px] font-mono font-bold tracking-widest text-[#75D1B5] uppercase block">NEWSLETTER NEWSFLASH</span>
          <h2 className="text-3xl font-extrabold tracking-tight">Stay Connected</h2>
          <p className="text-sm text-gray-300 font-light leading-relaxed">
            Receive monthly summaries indexing newly published papers, active prototyping milestones, and upcoming student conferences.
          </p>

          <AnimatePresence mode="wait">
            {newsletterSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-xs font-bold text-[#75D1B5] flex items-center justify-center gap-2"
              >
                <CheckCircle className="h-5 w-5" />
                <span>Subscription confirmed! Thank you for staying connected.</span>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleNewsletterSubmit}
                className="flex items-center bg-white/5 border border-white/10 rounded-full p-1 max-w-md mx-auto h-[48px] overflow-hidden"
              >
                <input 
                  type="email" 
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter email..." 
                  className="bg-transparent text-white outline-none text-xs px-4 py-2 w-full font-semibold"
                />
                <button
                  type="submit"
                  className="bg-[#75D1B5] hover:bg-[#64b59d] text-[#1C2E4A] font-bold text-xs tracking-wider px-6 h-full rounded-full transition-all shrink-0 cursor-pointer"
                >
                  Subscribe
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* SECTION 6: BEFORE YOU LEAVE */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <span className="text-[11px] font-mono font-bold tracking-widest text-[#1A73E8] uppercase block">BEFORE YOU LEAVE...</span>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-gray-900 tracking-tight leading-[1.2]">
            Every Great Collaboration Begins with a Conversation.
          </h2>
          <p className="text-sm sm:text-base text-gray-500 font-light leading-relaxed max-w-2xl mx-auto">
            Whether you have a question, an idea, a partnership proposal, or simply wish to learn more about Ré, we welcome the opportunity to connect. Curiosity has always been the beginning of meaningful discovery. Perhaps this conversation is yours.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <span className="font-sans text-xs font-black tracking-widest text-[#1C2E4A] uppercase">re</span>
            <div className="h-6 w-[1px] bg-gray-300" />
            <span className="font-sans text-xs font-bold text-gray-500">Curiosity, Engineered.</span>
          </div>
        </div>
      </section>

    </div>
  );
}
