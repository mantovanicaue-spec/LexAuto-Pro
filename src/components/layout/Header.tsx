export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-[54px] bg-ink border-b-2 border-gold flex items-center justify-between px-6 z-50">
      <div className="font-playfair text-xl font-black text-gold tracking-wider flex items-center">
        Lex<span className="text-white font-normal">Auto</span>
        <sup className="text-[0.5rem] bg-gold text-white px-1 ml-1 rounded-[2px] tracking-widest font-mono align-super">
          PRO
        </sup>
      </div>
      <div className="text-[0.65rem] tracking-[0.1em] uppercase text-[#777] font-mono">
        Pronto
      </div>
    </header>
  );
}
