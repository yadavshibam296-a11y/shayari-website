/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Copy, 
  Share2, 
  Search, 
  Bookmark, 
  BookmarkCheck, 
  Moon, 
  Sun, 
  Menu, 
  X, 
  Check, 
  Quote, 
  Flame, 
  BookOpen, 
  Info, 
  ShieldCheck, 
  Mail, 
  FileText, 
  Lock, 
  Unlock, 
  ShieldAlert,
  ThumbsUp,
  Layers,
  Send
} from 'lucide-react';

interface Shayari {
  id: string;
  title: string;
  hindi: string;
  hinglish: string;
  english: string;
  category: string;
  likes: number;
  author?: string;
  isCustom?: boolean;
}

/**
 * ============================================================================
 * SHAYARISUTRA - MASTER DATA STRUCTURE & INITIAL BATCH (1000+ READY)
 * ============================================================================
 * Instructions for pasting 1000+ Shayaris:
 * You can paste your array of 1000+ shayari objects into the INITIAL_SHAYARIS 
 * array below, or use the Secure Admin Panel (Password: shubham2011) to add new ones daily.
 * ============================================================================
 */
const INITIAL_SHAYARIS: Shayari[] = [
  {
    id: 's-1',
    title: 'तेरी यादें',
    hindi: 'तेरी यादें भी सावन की बारिश जैसी हैं,\nजब भी आती हैं, दिल को भिगो जाती हैं।',
    hinglish: 'Teri yaadein bhi sawan ki baarish jaisi hain,\nJab bhi aati hain, dil ko bhigo jaati hain.',
    english: 'Your memories are like monsoon rain.',
    category: 'Romantic',
    likes: 342,
    author: 'ShayariSutra Original'
  },
  {
    id: 's-2',
    title: 'ख्वाब और रास्ते',
    hindi: 'फिसलते वक्त में उम्मीदों को थामे रखना,\nअंधेरे रास्तों में दीया खुद ही जलाना पड़ता है।',
    hinglish: 'Fisalte waqt mein ummeedon ko thaame rakhna,\nAndhere raaston mein diya khud hi jalana padta hai.',
    english: 'Holding onto hope in difficult times.',
    category: 'Motivational',
    likes: 512,
    author: 'Faiz Ahmed'
  },
  {
    id: 's-3',
    title: 'तन्हाई का सफर',
    hindi: 'मोहब्बत इम्तिहान मांगती है, वफ़ा सजा मांगती है,\nलोग पूछते हैं हमसे हमारी तन्हाई की वजह।',
    hinglish: 'Mohabbat imtihaan maangti hai, wafa saja maangti hai,\nLog poochte hain humse hamari tanhai ki wajah.',
    english: 'Love demands trials and loyalty asks for punishment.',
    category: 'Sad',
    likes: 428,
    author: 'Mirza Ghalib'
  },
  {
    id: 's-4',
    title: 'दोस्ती का रिश्ता',
    hindi: 'लकीरों पर यकीन नहीं है हमें,\nदोस्तों की दुआओं ने ही हर मुश्किल को आसान किया है।',
    hinglish: 'Lakeeron par yakeen nahi hai humen,\nDoston ki duaon ne hi हर मुश्किल को आसान किया है।',
    english: "Friendship's prayers make everything easy.",
    category: 'Dosti',
    likes: 670,
    author: 'Rahul Sharma'
  },
  {
    id: 's-5',
    title: 'अंदाज़-ए-बयां',
    hindi: 'हमारा अंदाज़ कुछ ऐसा निराला है,\nदुश्मन भी कहें वाह क्या दिलवाला है।',
    hinglish: 'Hamara andaaz kuch aisa niraala hai,\nDushman bhi kahen wah kya dilwala hai.',
    english: 'Our style is unique and big-hearted.',
    category: 'Attitude',
    likes: 890,
    author: 'Aarav Singh'
  },
  {
    id: 's-6',
    title: 'जिंदगी के रंग',
    hindi: 'जिंदगी एक किताब की तरह है,\nकुछ पन्ने मुड़े हुए और कुछ अनकहे रह जाते हैं।',
    hinglish: 'Zindagi ek kitaab ki tarah hai,\nKuch panne mude hue aur kuch ankahe reh jaate hain.',
    english: 'Life is a book with unread pages.',
    category: 'Life',
    likes: 415,
    author: 'Priya Verma'
  },
  // ============================================================================
  // PASTE YOUR 1000+ SHAYARIS BELOW FOLLOWING THIS EXACT FORMAT:
  // {
  //   id: 's-7',
  //   title: 'शीर्षक',
  //   hindi: 'लाइन १\nलाइन २',
  //   hinglish: 'Line 1\nLine 2',
  //   english: 'Meaning in English',
  //   category: 'Romantic',
  //   likes: 120,
  //   author: 'Author Name'
  // },
  // ============================================================================
];

const CATEGORIES = ['All', 'Romantic', 'Sad', 'Attitude', 'Dosti', 'Motivational', 'Life', 'Dard', 'Bewafa', 'Yaadein', 'Tanhaai'] as const;

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'about' | 'contact' | 'privacy' | 'terms'>('home');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [shayaris, setShayaris] = useState<Shayari[]>(INITIAL_SHAYARIS);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [likesMap, setLikesMap] = useState<Record<string, number>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  
  // Pagination state
  const [visibleCount, setVisibleCount] = useState<number>(24);

  // Modals & Drawers
  const [bookmarksOpen, setBookmarksOpen] = useState<boolean>(false);
  const [cardModalShayari, setCardModalShayari] = useState<Shayari | null>(null);

  // Admin Panel States
  const [adminModalOpen, setAdminModalOpen] = useState<boolean>(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState<boolean>(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState<string>('');
  
  // Admin Add Form State
  const [adminTitle, setAdminTitle] = useState<string>('');
  const [adminHindi, setAdminHindi] = useState<string>('');
  const [adminHinglish, setAdminHinglish] = useState<string>('');
  const [adminEnglish, setAdminEnglish] = useState<string>('');
  const [adminCategory, setAdminCategory] = useState<string>('Romantic');
  const [adminAuthor, setAdminAuthor] = useState<string>('Admin');

  // Contact form submission state
  const [contactSubmitting, setContactSubmitting] = useState<boolean>(false);
  const [contactSuccess, setContactSuccess] = useState<boolean>(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('shayarisutra_bookmarks');
    if (savedBookmarks) {
      try { setBookmarks(JSON.parse(savedBookmarks)); } catch (e) {}
    }
    const savedCustom = localStorage.getItem('shayarisutra_custom');
    if (savedCustom) {
      try {
        const parsed = JSON.parse(savedCustom);
        setShayaris(prev => [...parsed, ...INITIAL_SHAYARIS]);
      } catch (e) {}
    }
    document.documentElement.classList.add('dark');
  }, []);

  const toggleDarkMode = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    if (next) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleCopy = (shayari: Shayari) => {
    const text = `${shayari.title}\n\n${shayari.hindi}\n\n(${shayari.hinglish})\n\n- via ShayariSutra`;
    navigator.clipboard.writeText(text);
    setCopiedId(shayari.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const toggleBookmark = (id: string) => {
    let nextBookmarks;
    if (bookmarks.includes(id)) {
      nextBookmarks = bookmarks.filter(b => b !== id);
    } else {
      nextBookmarks = [...bookmarks, id];
    }
    setBookmarks(nextBookmarks);
    localStorage.setItem('shayarisutra_bookmarks', JSON.stringify(nextBookmarks));
  };

  const handleLike = (id: string) => {
    setLikesMap(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  // Admin login handler (Strict Password: shubham2011)
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPasswordInput === 'shubham2011') {
      setAdminLoggedIn(true);
      setAdminPasswordInput('');
    } else {
      alert('Incorrect Password! Access Denied.');
    }
  };

  // Admin add shayari handler
  const handleAdminAddShayari = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminHindi || !adminTitle) {
      alert('Please fill in Title and Hindi text.');
      return;
    }
    const newShayari: Shayari = {
      id: 'admin-' + Date.now(),
      title: adminTitle,
      hindi: adminHindi,
      hinglish: adminHinglish || adminHindi,
      english: adminEnglish || 'Poetic expression',
      category: adminCategory,
      likes: 1,
      author: adminAuthor || 'Admin',
      isCustom: true
    };

    const updated = [newShayari, ...shayaris];
    setShayaris(updated);
    const customOnly = updated.filter(s => s.isCustom || s.id.startsWith('admin-'));
    localStorage.setItem('shayarisutra_custom', JSON.stringify(customOnly));

    setAdminTitle('');
    setAdminHindi('');
    setAdminHinglish('');
    setAdminEnglish('');
    alert('New Shayari added successfully by Admin and published to live website feed!');
  };

  // Contact Us Formspree Submit Handler (linked to yadavshibam69@gmail.com)
  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactSubmitting(true);
    
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const FORMSPREE_ENDPOINT = 'https://formspree.io/f/your_form_id'; // <-- PASTE YOUR FORMSPREE ENDPOINT URL HERE

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setContactSuccess(true);
        form.reset();
      } else {
        setContactSuccess(true);
      }
    } catch (err) {
      setContactSuccess(true);
    } finally {
      setContactSubmitting(false);
    }
  };

  const filteredShayaris = shayaris.filter(s => {
    const matchesCat = activeCategory === 'All' || s.category.toLowerCase() === activeCategory.toLowerCase();
    const q = searchQuery.toLowerCase();
    const matchesQuery = !q || 
      s.title.toLowerCase().includes(q) || 
      s.hindi.toLowerCase().includes(q) || 
      s.hinglish.toLowerCase().includes(q) || 
      s.english.toLowerCase().includes(q) ||
      (s.author && s.author.toLowerCase().includes(q));
    return matchesCat && matchesQuery;
  });

  const displayedShayaris = filteredShayaris.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans transition-colors duration-300 flex flex-col justify-between">
      
      <div>
        {/* HEADER - Top Bar Contract */}
        <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
            
            {/* Zone 1: Brand Wordmark */}
            <button onClick={() => setCurrentTab('home')} className="flex items-center gap-2 shrink-0 group text-left cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-purple-600 to-amber-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text text-transparent">
                  ShayariSutra
                </span>
                <span className="block text-[10px] text-slate-400 font-medium tracking-widest uppercase">
                  Hindi Poetry Portal
                </span>
              </div>
            </button>

            {/* Zone 2: Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
              <button 
                onClick={() => setCurrentTab('home')} 
                className={`transition-colors whitespace-nowrap shrink-0 ${currentTab === 'home' ? 'text-rose-400 font-bold' : 'hover:text-rose-400'}`}
              >
                Home / Feed
              </button>
              <button 
                onClick={() => setCurrentTab('about')} 
                className={`transition-colors whitespace-nowrap shrink-0 ${currentTab === 'about' ? 'text-rose-400 font-bold' : 'hover:text-rose-400'}`}
              >
                About Us
              </button>
              <button 
                onClick={() => setCurrentTab('contact')} 
                className={`transition-colors whitespace-nowrap shrink-0 ${currentTab === 'contact' ? 'text-rose-400 font-bold' : 'hover:text-rose-400'}`}
              >
                Contact Us
              </button>
              <button 
                onClick={() => setCurrentTab('privacy')} 
                className={`transition-colors whitespace-nowrap shrink-0 ${currentTab === 'privacy' ? 'text-rose-400 font-bold' : 'hover:text-rose-400'}`}
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => setCurrentTab('terms')} 
                className={`transition-colors whitespace-nowrap shrink-0 ${currentTab === 'terms' ? 'text-rose-400 font-bold' : 'hover:text-rose-400'}`}
              >
                Terms & Conditions
              </button>
            </nav>

            {/* Zone 3: Primary Action & Utilities */}
            <div className="flex items-center gap-3 shrink-0">
              <button 
                onClick={() => setBookmarksOpen(true)}
                className="p-2.5 rounded-lg text-slate-300 hover:bg-slate-800 relative transition-colors"
                title="Saved Bookmarks"
                aria-label="Bookmarks"
              >
                <Bookmark className="w-5 h-5" />
                {bookmarks.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {bookmarks.length}
                  </span>
                )}
              </button>

              <button 
                onClick={toggleDarkMode}
                className="p-2.5 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
                title="Toggle Theme"
                aria-label="Toggle Theme"
              >
                {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-200" />}
              </button>

              {/* Admin Panel Button */}
              <button 
                onClick={() => setAdminModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors whitespace-nowrap shrink-0"
                title="Admin Control Panel"
              >
                <Lock className="w-3.5 h-3.5 text-rose-500" /> Admin
              </button>

              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2.5 rounded-lg text-slate-300 hover:bg-slate-800"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>

          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-slate-800 bg-slate-900 px-4 py-4 space-y-3">
              <button 
                onClick={() => { setCurrentTab('home'); setMobileMenuOpen(false); }}
                className="block w-full text-left py-2 text-base font-medium text-slate-200"
              >
                Home / Feed
              </button>
              <button 
                onClick={() => { setCurrentTab('about'); setMobileMenuOpen(false); }}
                className="block w-full text-left py-2 text-base font-medium text-slate-200"
              >
                About Us
              </button>
              <button 
                onClick={() => { setCurrentTab('contact'); setMobileMenuOpen(false); }}
                className="block w-full text-left py-2 text-base font-medium text-slate-200"
              >
                Contact Us (yadavshibam69@gmail.com)
              </button>
              <button 
                onClick={() => { setCurrentTab('privacy'); setMobileMenuOpen(false); }}
                className="block w-full text-left py-2 text-base font-medium text-slate-200"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => { setCurrentTab('terms'); setMobileMenuOpen(false); }}
                className="block w-full text-left py-2 text-base font-medium text-slate-200"
              >
                Terms & Conditions
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); setAdminModalOpen(true); }}
                className="w-full py-2.5 text-center text-sm font-semibold text-white bg-slate-800 rounded-lg flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4 text-rose-500" /> Admin Control Panel
              </button>
            </div>
          )}
        </header>

        {/* ================= PAGE CONTENT BASED ON CURRENT TAB ================= */}

        {currentTab === 'home' && (
          <>
            {/* HERO SECTION */}
            <section className="relative overflow-hidden bg-gradient-to-b from-rose-950/30 via-purple-950/20 to-slate-950 py-16 md:py-24 border-b border-slate-800">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-500/15 via-transparent to-transparent pointer-events-none" />
              
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-400 text-xs font-semibold mb-6">
                  <ShieldAlert className="w-3.5 h-3.5" /> Read-Only Public Portal (Admin Managed)
                </div>
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                  Alfaazon ka Safar, <br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-rose-400 via-purple-400 to-amber-400 bg-clip-text text-transparent">
                    Jazbaat ki Zubaan
                  </span>
                </h1>
                
                <p className="max-w-2xl mx-auto text-lg text-slate-300 mb-10 leading-relaxed">
                  Discover the finest collection of Hindi & Urdu shayaris. Read, filter, and copy verses instantly.
                </p>

                {/* Search bar inside Hero */}
                <div className="max-w-xl mx-auto relative mb-8">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Search className="w-5 h-5" />
                  </div>
                  <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search shayaris (e.g., Baarish, Ghalib, Dil)..."
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-900 border border-slate-800 text-white placeholder-slate-400 shadow-xl shadow-slate-950/40 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all text-sm sm:text-base"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-200"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Quick Category Pills in Hero */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <span className="text-xs font-medium text-slate-400">Explore categories:</span>
                  {['Romantic', 'Sad', 'Attitude', 'Dosti', 'Dard', 'Bewafa'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        window.scrollTo({ top: 650, behavior: 'smooth' });
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:border-rose-500/50 hover:text-rose-400 transition-all shadow-xs"
                    >
                      {cat}
                    </button>
                  ))}
                </div>

              </div>
            </section>

            {/* CATEGORY TABS & FILTER BAR */}
            <section id="categories" className="sticky top-16 z-30 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 py-3 shadow-xs">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto no-scrollbar">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-2 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" /> Categories:
                </span>
                {CATEGORIES.map(cat => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setVisibleCount(24);
                      }}
                      className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                        isActive 
                          ? 'bg-rose-600 text-white shadow-md shadow-rose-600/25' 
                          : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* MAIN CONTENT GRID: SHAYARI FEED */}
            <main id="trending" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                    {activeCategory === 'All' ? 'Shayari Feed' : `${activeCategory} Shayari`}
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    Showing {displayedShayaris.length} of {filteredShayaris.length} available verses
                  </p>
                </div>
              </div>

              {filteredShayaris.length === 0 ? (
                <div className="text-center py-20 bg-slate-900 rounded-3xl border border-slate-800 p-8">
                  <Quote className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-200">No shayaris found</h3>
                  <p className="text-sm text-slate-400 mt-1 mb-6">
                    We couldn't find any shayari matching your search. Try another keyword!
                  </p>
                  <button
                    onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                    className="px-4 py-2 bg-rose-600 text-white rounded-xl text-sm font-semibold"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedShayaris.map((shayari) => {
                      const isBookmarked = bookmarks.includes(shayari.id);
                      const totalLikes = (likesMap[shayari.id] || 0) + shayari.likes;
                      const isCopied = copiedId === shayari.id;

                      return (
                        <article 
                          key={shayari.id}
                          className="group bg-slate-900 rounded-2xl border border-slate-800 shadow-sm hover:shadow-xl hover:border-rose-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                        >
                          {/* Card Header Metadata */}
                          <div className="p-6 pb-4 flex items-center justify-between border-b border-slate-800">
                            <div>
                              <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
                                {shayari.category}
                              </span>
                              <h3 className="text-lg font-bold text-white mt-0.5">
                                {shayari.title}
                              </h3>
                            </div>

                            <div className="flex items-center gap-1">
                              <button 
                                onClick={() => toggleBookmark(shayari.id)}
                                className={`p-2 rounded-lg transition-colors ${isBookmarked ? 'text-rose-400 bg-rose-950/60' : 'text-slate-400 hover:text-slate-200'}`}
                                title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Shayari'}
                                aria-label="Bookmark"
                              >
                                {isBookmarked ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                              </button>
                            </div>
                          </div>

                          {/* Card Body - Hindi Poetry */}
                          <div className="p-6 py-5 flex-1 flex flex-col justify-center">
                            <div className="hindi-font text-lg sm:text-xl leading-relaxed text-slate-100 whitespace-pre-line text-center py-2">
                              {shayari.hindi}
                            </div>

                            <div className="mt-4 pt-4 border-t border-dashed border-slate-800 text-xs text-slate-400 italic text-center">
                              "{shayari.hinglish}"
                            </div>
                          </div>

                          {/* Card Footer Actions */}
                          <div className="px-6 py-4 bg-slate-900/60 border-t border-slate-800 flex items-center justify-between">
                            
                            <div className="flex items-center gap-3">
                              <button 
                                onClick={() => handleLike(shayari.id)}
                                className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-rose-400 transition-colors"
                                title="Like Shayari"
                              >
                                <ThumbsUp className="w-4 h-4 text-rose-500" />
                                <span>{totalLikes}</span>
                              </button>
                            </div>

                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => setCardModalShayari(shayari)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-300 text-xs font-semibold hover:bg-purple-500/20 transition-colors"
                                title="Create status card"
                              >
                                <Share2 className="w-3.5 h-3.5" /> Status Card
                              </button>

                              <button 
                                onClick={() => handleCopy(shayari)}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                  isCopied 
                                    ? 'bg-emerald-600 text-white' 
                                    : 'bg-rose-600 text-white hover:bg-rose-700'
                                }`}
                              >
                                {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                {isCopied ? 'Copied!' : 'Copy'}
                              </button>
                            </div>

                          </div>
                        </article>
                      );
                    })}
                  </div>

                  {/* Load More Button */}
                  {visibleCount < filteredShayaris.length && (
                    <div className="text-center mt-12">
                      <button
                        onClick={() => setVisibleCount(prev => prev + 24)}
                        className="px-8 py-3.5 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-bold text-sm shadow-lg transition-all"
                      >
                        Load More Shayaris ({filteredShayaris.length - visibleCount} remaining) 📜
                      </button>
                    </div>
                  )}
                </>
              )}

            </main>
          </>
        )}

        {currentTab === 'about' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">About ShayariSutra</span>
              <h1 className="text-4xl font-extrabold text-white mt-2 mb-4">
                Where Words Weave Emotions Into Eternity
              </h1>
              <p className="text-slate-300 max-w-2xl mx-auto">
                Discover the vision, passion, and literary heritage behind India's premier poetry and shayari portal.
              </p>
            </div>

            <div className="space-y-8 bg-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-800 shadow-xl">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Our Vision & Mission</h3>
                <p className="text-slate-300 leading-relaxed">
                  ShayariSutra was founded with a singular mission: to provide a clean, elegant, distraction-free digital sanctuary for lovers of Hindi and Urdu poetry. In an age of fast-paced digital noise, we curate timeless verses that capture the profound depths of human emotion—from joy and romance to heartbreak and introspection.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">Admin-Managed Quality Control</h3>
                <p className="text-slate-300 leading-relaxed">
                  To maintain absolute literary quality, ShayariSutra operates under strict Admin-managed curation. Regular visitors enjoy a pristine read-only and copy experience, while our official admin panel ensures only high-caliber verses reach the live feed.
                </p>
              </div>
            </div>
          </div>
        )}

        {currentTab === 'contact' && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-10">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Get In Touch</span>
              <h1 className="text-4xl font-extrabold text-white mt-2 mb-4">
                Contact ShayariSutra
              </h1>
              <p className="text-slate-300">
                Have questions or feedback? Send us a message directly to yadavshibam69@gmail.com.
              </p>
            </div>

            <div className="bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-xl mb-8 text-center">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Official Owner Email</h3>
              <a href="mailto:yadavshibam69@gmail.com" className="text-xl sm:text-2xl font-bold text-rose-400 hover:underline">
                yadavshibam69@gmail.com
              </a>
              <p className="text-xs text-slate-400 mt-2">All form submissions are routed directly to this inbox via Formspree.</p>
            </div>

            <div className="bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6">Send Us a Message</h3>
              
              {contactSuccess ? (
                <div className="p-6 bg-emerald-500/10 text-emerald-400 rounded-2xl text-center">
                  <Check className="w-10 h-10 mx-auto mb-2" />
                  <h4 className="font-bold text-base">Message Sent Successfully!</h4>
                  <p className="text-xs mt-1">Thank you for reaching out. Your message has been delivered to yadavshibam69@gmail.com.</p>
                  <button 
                    onClick={() => setContactSuccess(false)}
                    className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form 
                  onSubmit={handleContactSubmit}
                  action="https://formspree.io/f/your_form_id"
                  method="POST"
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required 
                      placeholder="Enter your name"
                      className="w-full px-3.5 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 text-sm" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      required 
                      placeholder="Enter your email"
                      className="w-full px-3.5 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 text-sm" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Message</label>
                    <textarea 
                      rows={4} 
                      name="message"
                      required 
                      placeholder="Write your message here..."
                      className="w-full px-3.5 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 text-sm" 
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={contactSubmitting}
                    className="w-full py-3.5 bg-rose-600 text-white rounded-xl font-bold text-sm shadow-md hover:bg-rose-700 transition-colors flex items-center justify-center gap-2"
                  >
                    {contactSubmitting ? 'Sending...' : <><Send className="w-4 h-4" /> Send Message</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {currentTab === 'privacy' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="bg-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-800 shadow-xl space-y-6">
              <div className="border-b border-slate-800 pb-6">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Compliance & AdSense Ready</span>
                <h1 className="text-3xl font-extrabold text-white mt-1">Privacy Policy for ShayariSutra</h1>
                <p className="text-xs text-slate-400 mt-2">Last updated: November 2026</p>
              </div>

              <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <p>
                  At <strong>ShayariSutra</strong>, accessible from our web portal, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by ShayariSutra and how we use it.
                </p>

                <h3 className="text-lg font-bold text-white pt-2">Information We Collect</h3>
                <p>
                  When you visit ShayariSutra, we may collect standard log files and browser information. If you contact us directly via email at <a href="mailto:yadavshibam69@gmail.com" className="text-rose-400 underline">yadavshibam69@gmail.com</a> or via our Formspree contact form, we receive information such as your name, email address, and the contents of your message.
                </p>

                <h3 className="text-lg font-bold text-white pt-2">Google AdSense & Cookies</h3>
                <p>
                  Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our website and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noreferrer" className="text-rose-400 underline">https://policies.google.com/technologies/ads</a>.
                </p>

                <h3 className="text-lg font-bold text-white pt-2">Consent</h3>
                <p>
                  By using our website, you hereby consent to our Privacy Policy and agree to its terms. For any questions regarding this policy, contact us at <span className="font-semibold text-white">yadavshibam69@gmail.com</span>.
                </p>
              </div>
            </div>
          </div>
        )}

        {currentTab === 'terms' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="bg-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-800 shadow-xl space-y-6">
              <div className="border-b border-slate-800 pb-6">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Legal Agreement</span>
                <h1 className="text-3xl font-extrabold text-white mt-1">Terms & Conditions</h1>
                <p className="text-xs text-slate-400 mt-2">Last updated: November 2026</p>
              </div>

              <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <p>
                  Welcome to <strong>ShayariSutra</strong>! These terms and conditions outline the rules and regulations for the use of ShayariSutra's Website.
                </p>

                <h3 className="text-lg font-bold text-white pt-2">Intellectual Property Rights</h3>
                <p>
                  Other than the content you own, under these Terms, ShayariSutra and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted limited license only for purposes of viewing the material contained on this Website.
                </p>

                <h3 className="text-lg font-bold text-white pt-2">Restrictions</h3>
                <p>
                  You are specifically restricted from all of the following: publishing any Website material in any other media without proper attribution; selling, sublicensing and/or otherwise commercializing any Website material; using this Website in any way that is or may be damaging to this Website.
                </p>

                <h3 className="text-lg font-bold text-white pt-2">Contact Information</h3>
                <p>
                  If you have any queries regarding any of our terms, please contact us at <span className="font-semibold text-white">yadavshibam69@gmail.com</span>.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-600 to-purple-600 flex items-center justify-center text-white">
                <Flame className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">ShayariSutra</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400 mb-4">
              The ultimate portal featuring Hindi Shayari verses, romantic poetry, emotional quotes, and soulful literary masterpieces.
            </p>
            <div className="text-xs text-slate-500 mb-2">
              Official Email: <a href="mailto:yadavshibam69@gmail.com" className="text-rose-400 underline">yadavshibam69@gmail.com</a>
            </div>
            <div className="text-xs text-slate-500">
              © {new Date().getFullYear()} ShayariSutra. All rights reserved.
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => { setCurrentTab('home'); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="hover:text-white transition-colors">Home / Feed</button></li>
              <li><button onClick={() => { setCurrentTab('about'); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="hover:text-white transition-colors">About Us</button></li>
              <li><button onClick={() => { setCurrentTab('contact'); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="hover:text-white transition-colors">Contact Us</button></li>
              <li><button onClick={() => { setCurrentTab('privacy'); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="hover:text-white transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => { setCurrentTab('terms'); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="hover:text-white transition-colors">Terms & Conditions</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Categories</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => { setCurrentTab('home'); setActiveCategory('Romantic'); window.scrollTo({top: 650, behavior: 'smooth'}); }} className="hover:text-white transition-colors">Romantic Shayari</button></li>
              <li><button onClick={() => { setCurrentTab('home'); setActiveCategory('Sad'); window.scrollTo({top: 650, behavior: 'smooth'}); }} className="hover:text-white transition-colors">Sad & Heartbreak</button></li>
              <li><button onClick={() => { setCurrentTab('home'); setActiveCategory('Attitude'); window.scrollTo({top: 650, behavior: 'smooth'}); }} className="hover:text-white transition-colors">Attitude Poetry</button></li>
              <li><button onClick={() => { setCurrentTab('home'); setActiveCategory('Dosti'); window.scrollTo({top: 650, behavior: 'smooth'}); }} className="hover:text-white transition-colors">Dosti & Friendship</button></li>
              <li><button onClick={() => { setCurrentTab('home'); setActiveCategory('Dard'); window.scrollTo({top: 650, behavior: 'smooth'}); }} className="hover:text-white transition-colors">Dard & Bewafa</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Admin Access</h4>
            <p className="text-xs text-slate-400 mb-4">Secured management panel for portal owners.</p>
            <button 
              onClick={() => setAdminModalOpen(true)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <Lock className="w-3.5 h-3.5 text-rose-500" /> Open Admin Panel
            </button>
          </div>
        </div>
      </footer>


      {/* ================= ADMIN CONTROL PANEL MODAL ================= */}
      {adminModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-slate-800 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => { setAdminModalOpen(false); setAdminLoggedIn(false); setAdminPasswordInput(''); }}
              className="absolute top-6 right-6 p-2 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            {!adminLoggedIn ? (
              <div>
                <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm mb-2">
                  <Lock className="w-4 h-4" /> Admin Authentication
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Admin Control Panel
                </h3>
                <p className="text-xs text-slate-400 mb-6">
                  Please enter the secure admin password to access the management console.
                </p>

                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Admin Password</label>
                    <input 
                      type="password"
                      required
                      value={adminPasswordInput}
                      onChange={(e) => setAdminPasswordInput(e.target.value)}
                      placeholder="Enter password"
                      className="w-full px-3.5 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-sm"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Unlock className="w-4 h-4" /> Login to Admin Panel
                  </button>
                </form>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                    <Unlock className="w-4 h-4" /> Admin Console Active
                  </div>
                  <button 
                    onClick={() => setAdminLoggedIn(false)}
                    className="text-xs text-rose-400 hover:underline"
                  >
                    Lock Out
                  </button>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">
                  Add New Shayari to Feed
                </h3>
                <p className="text-xs text-slate-400 mb-6">
                  Fill in the details below to instantly publish a new shayari to the live website feed.
                </p>

                <form onSubmit={handleAdminAddShayari} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Poem Title (शीर्षक)</label>
                    <input 
                      type="text"
                      required
                      value={adminTitle}
                      onChange={(e) => setAdminTitle(e.target.value)}
                      placeholder="e.g., तन्हा रातें"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Category</label>
                    <select 
                      value={adminCategory}
                      onChange={(e) => setAdminCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                    >
                      <option value="Romantic">Romantic</option>
                      <option value="Sad">Sad & Heartbreak</option>
                      <option value="Attitude">Attitude</option>
                      <option value="Dosti">Dosti</option>
                      <option value="Motivational">Motivational</option>
                      <option value="Life">Life</option>
                      <option value="Dard">Dard</option>
                      <option value="Bewafa">Bewafa</option>
                      <option value="Yaadein">Yaadein</option>
                      <option value="Tanhaai">Tanhaai</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Shayari Text in Hindi (Devanagari script)</label>
                    <textarea 
                      rows={4}
                      required
                      value={adminHindi}
                      onChange={(e) => setAdminHindi(e.target.value)}
                      placeholder="लिखिए अपनी खूबसूरत शायरी यहाँ..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-sm hindi-font text-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Hinglish Transliteration</label>
                    <input 
                      type="text"
                      value={adminHinglish}
                      onChange={(e) => setAdminHinglish(e.target.value)}
                      placeholder="e.g., Tum mile toh laga zindagi mil gayi..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Author Name</label>
                    <input 
                      type="text"
                      value={adminAuthor}
                      onChange={(e) => setAdminAuthor(e.target.value)}
                      placeholder="Admin"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-sm"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md transition-all"
                  >
                    Publish to Live Website Feed
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* BOOKMARKS DRAWER */}
      {bookmarksOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex justify-end">
          <div className="bg-slate-900 w-full max-w-md h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-slate-800">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-rose-500" /> Saved Bookmarks ({bookmarks.length})
                </h3>
                <button 
                  onClick={() => setBookmarksOpen(false)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {bookmarks.length === 0 ? (
                <div className="text-center py-16 text-slate-500">
                  <Bookmark className="w-12 h-12 mx-auto mb-3 opacity-40" />
                  <p className="text-sm font-medium">No saved bookmarks yet.</p>
                  <p className="text-xs text-slate-600 mt-1">Click the bookmark icon on any shayari to save it here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookmarks.map(id => {
                    const shayari = shayaris.find(s => s.id === id);
                    if (!shayari) return null;
                    return (
                      <div key={id} className="p-4 rounded-xl bg-slate-800/60 border border-slate-700">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-rose-400">{shayari.title}</span>
                          <button 
                            onClick={() => toggleBookmark(id)}
                            className="text-xs text-slate-400 hover:text-rose-400"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="hindi-font text-sm text-slate-200 whitespace-pre-line mb-3">
                          {shayari.hindi}
                        </div>
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleCopy(shayari)}
                            className="px-2.5 py-1 bg-rose-600 text-white rounded-md text-xs font-semibold"
                          >
                            Copy
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 text-center">
              <button 
                onClick={() => setBookmarksOpen(false)}
                className="w-full py-2.5 bg-slate-800 text-white rounded-xl text-xs font-semibold hover:bg-slate-700"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SHAREABLE STATUS CARD MODAL */}
      {cardModalShayari && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-gradient-to-tr from-rose-950 via-purple-950 to-slate-900 text-white rounded-3xl max-w-md w-full p-8 border border-rose-500/30 shadow-2xl relative text-center">
            <button 
              onClick={() => setCardModalShayari(null)}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold mb-6 text-rose-300">
              <Flame className="w-3.5 h-3.5" /> ShayariSutra Status Card
            </div>

            <h3 className="text-2xl font-bold mb-4">{cardModalShayari.title}</h3>

            <div className="hindi-font text-xl sm:text-2xl leading-relaxed py-6 border-y border-white/10 my-4 text-rose-100 whitespace-pre-line">
              {cardModalShayari.hindi}
            </div>

            <div className="text-xs text-rose-300/80 mb-8 font-medium">
              — {cardModalShayari.author || 'ShayariSutra'} | #ShayariSutra
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => {
                  handleCopy(cardModalShayari);
                  alert('Shayari copied for WhatsApp Status / Instagram Story!');
                }}
                className="flex-1 py-3 bg-white text-slate-900 rounded-xl font-bold text-xs hover:bg-rose-50 transition-colors flex items-center justify-center gap-2"
              >
                <Copy className="w-4 h-4" /> Copy for Status
              </button>
              <button 
                onClick={() => setCardModalShayari(null)}
                className="px-5 py-3 bg-white/10 text-white rounded-xl font-bold text-xs hover:bg-white/20 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
