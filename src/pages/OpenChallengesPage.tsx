import React, { useState } from 'react';
import { CHALLENGES } from '../data';
import { Target, HelpCircle, Calendar, ShieldAlert, ArrowRight, MessageSquare, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import PageHeader from '../components/PageHeader';

const CHALLENGE_IMAGES: { [key: string]: string } = {
  'challenge-cotton-weed': 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=800&auto=format&fit=crop',
  'challenge-water-noyyal': 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=800&auto=format&fit=crop'
};

export default function OpenChallengesPage() {
  const [pitchName, setPitchName] = useState('');
  const [pitchEmail, setPitchEmail] = useState('');
  const [selectedChallengeId, setSelectedChallengeId] = useState(CHALLENGES[0].id);
  const [pitchContent, setPitchContent] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleSubmitPitch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pitchName || !pitchEmail || !pitchContent) return;
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setPitchName('');
      setPitchEmail('');
      setPitchContent('');
    }, 5000);
  };

  return (
    <div className="w-full font-sans text-[#202124]">
      {/* 1:1 Google Research Replica Editorial Title Header */}
      <PageHeader 
        category="SOCIETAL INTERPRETATIONS"
        title="Open Challenges"
        description="Regional enterprises and environment alliances release targeted Scientific Challenges seeking elegant solutions. Formulate proposals and partner with RÉ laboratories."
        accentColor="yellow"
        gradientTheme="yellow"
        images={[
          "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=500&auto=format&fit=crop"
        ]}
      />

      <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-20">

      {/* Main Grid: Challenges (Left) & Application Pitch (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Challenges cards list */}
        <div className="lg:col-span-7 space-y-6">
          {CHALLENGES.map((challenge) => (
            <div
              key={challenge.id}
              className="border border-[#DADCE0] rounded-2xl bg-[#FFFF] overflow-hidden hover:shadow-md transition-shadow flex flex-col"
              id={`challenge-card-${challenge.id}`}
            >
              {/* Challenge Top Card Banner */}
              <div className="h-[200px] w-full overflow-hidden border-b border-[#DADCE0] relative select-none bg-gray-50">
                <img 
                  src={CHALLENGE_IMAGES[challenge.id] || "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=500&auto=format&fit=crop"} 
                  alt={challenge.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6 md:p-8 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="inline-flex items-center space-x-1.5 bg-[#FBBC05]/10 text-yellow-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    <ShieldAlert className="h-3 w-3 text-[#FBBC05]" />
                    <span>Socio-Industrial Case</span>
                  </span>
                  
                  <span className="text-xs text-[#5F6368] font-semibold flex items-center space-x-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Deadline: {challenge.deadline}</span>
                  </span>
                </div>

                <h2 className="font-display text-[22px] md:text-[24px] font-semibold text-[#202124] tracking-tightLeading">
                  {challenge.title}
                </h2>

                <p className="text-[15px] md:text-[16px] text-[#5F6368] leading-relaxed">
                  {challenge.description}
                </p>

                <div className="pt-4 border-t border-[#DADCE0] grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px]">
                  <div className="space-y-1">
                    <span className="block text-gray-500 font-bold uppercase text-[11px] tracking-wider">Target Sector</span>
                    <p className="text-gray-900 font-semibold">{challenge.targetIndustry}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="block text-gray-500 font-bold uppercase text-[11px] tracking-wider">Technical Constraint</span>
                    <p className="text-gray-900 font-semibold">{challenge.scope}</p>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setSelectedChallengeId(challenge.id)}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#4285F4] uppercase hover:underline cursor-pointer"
                  >
                    <span>Select for My Proposal Pitch</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Right Column: Submission Proposal Pitch Form (Beautifully formatted) */}
        <div className="lg:col-span-5 bg-[#F8F9FA] rounded-2xl border border-[#DADCE0] p-6 md:p-8 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-[#4285F4] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="h-4 w-4" />
              <span>Pitch Your Solution</span>
            </div>
            <h3 className="font-display text-[22px] font-bold text-[#202124]">
              Abstract Submission Desk
            </h3>
            <p className="text-sm text-[#5F6368] leading-relaxed">
              Have concrete scientific outlines or material synthesis plans? Select the challenge above and submit a 300-word initial study summary to access mentoring support.
            </p>
          </div>

          <form onSubmit={handleSubmitPitch} className="space-y-4">
            {/* Challenge selection dropdown */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#5F6368] uppercase tracking-wider">Target Scientific Area</label>
              <select
                value={selectedChallengeId}
                onChange={(e) => setSelectedChallengeId(e.target.value)}
                className="w-full bg-white border border-[#DADCE0] rounded-xl px-3.5 py-3 text-[14px] font-medium text-gray-800 focus:outline-none focus:border-[#4285F4]"
              >
                {CHALLENGES.map((challenge) => (
                  <option key={challenge.id} value={challenge.id}>
                    {challenge.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Candidate identity field */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#5F6368] uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Ramesh Babu"
                  value={pitchName}
                  onChange={(e) => setPitchName(e.target.value)}
                  className="w-full bg-white border border-[#DADCE0] rounded-xl px-3.5 py-3 text-[14px] focus:outline-none focus:border-[#4285F4]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#5F6368] uppercase tracking-wider">Professional Email</label>
                <input
                  type="email"
                  required
                  placeholder="ramesh@institute.org"
                  value={pitchEmail}
                  onChange={(e) => setPitchEmail(e.target.value)}
                  className="w-full bg-white border border-[#DADCE0] rounded-xl px-3.5 py-3 text-[14px] focus:outline-none focus:border-[#4285F4]"
                />
              </div>
            </div>

            {/* Solutions summary field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#5F6368] uppercase tracking-wider font-sans">Outline Methodology Abstract</label>
              <textarea
                required
                rows={5}
                placeholder="Submit your structural model, expected physical cellulose composition, or neural algorithm scaling framework here..."
                value={pitchContent}
                onChange={(e) => setPitchContent(e.target.value)}
                className="w-full bg-white border border-[#DADCE0] rounded-xl px-3.5 py-3 text-[14px] leading-relaxed focus:outline-none focus:border-[#4285F4] resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#202124] hover:bg-black text-white py-3 rounded-xl text-sm font-semibold tracking-wide transition-all shadow-sm flex items-center justify-center space-x-2 cursor-pointer select-none"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Validate & Pitch Abstract</span>
            </button>
          </form>

          {/* Success Overlay with animation */}
          <AnimatePresence>
            {submittedMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-4 bg-[#34A853]/10 border border-[#34A853]/40 rounded-xl space-y-1.5"
              >
                <div className="flex items-center space-x-2 text-[#34A853] font-bold text-[14px]">
                  <Check className="h-4 w-4" />
                  <span>Proposal Pitch Registered</span>
                </div>
                <p className="text-xs text-[#5F6368] leading-normal">
                  Thank you, <strong>{pitchName}</strong>. Your research methodology abstract has been successfully queued in the RÉ core evaluation engine. An authorization code is dispatched to <strong>{pitchEmail}</strong>.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

    </div>
    </div>
  );
}
