import React from 'react';

export default function ForegroundTrees() {
  return (
    <div className="foreground-tree">
      {/* Left tree - desktop only */}
      <div className="hidden md:block fixed left-[-50px] bottom-0 pointer-events-none z-[92]">
        <img src="/src/assets/tree-left.png" alt="Tree Left" className="max-h-[140vh] -translate-x-40 translate-y-20" />
      </div>

      {/* Right tree - desktop */}
      <div className="hidden md:block fixed right-0 bottom-0 pointer-events-none z-[92]">
        <img src="/src/assets/tree-right.png" alt="Tree Right" className="max-h-[125vh] translate-x-6 translate-y-30" />
      </div>

      {/* Right tree - mobile only (single tree to avoid blocking) */}
      {/* <div className="md:hidden fixed right-0 bottom-0 pointer-events-none z-[92] overflow-hidden">
        <img src="/src/assets/tree-right.png" alt="Tree Right Mobile" className=" w-[200vw]  h-[106vh] ml-auto translate-x-20 translate-y-30 object-right-bottom" />
      </div> */}
    </div>
  );
}
