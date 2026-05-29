import React, { useEffect, useRef, useState } from 'react';

function App() {
  const mountRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;
    const appendedHeadNodes = [];

    const loadBundle = async () => {
      try {
        const response = await fetch('/superdesign/kore-ai/index.html', { cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`Failed to load SuperDesign bundle (${response.status})`);
        }

        const html = await response.text();
        if (isCancelled || !mountRef.current) return;

        // Guard against malformed exports (plain script/text dumps instead of HTML).
        const hasLikelyHtml = /<\s*(html|body|main|div|section)\b/i.test(html);
        if (!hasLikelyHtml) {
          throw new Error(
            'Invalid SuperDesign export format: received plain text/script dump. Re-export as HTML/React files.'
          );
        }

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Attach stylesheet/style nodes from export head.
        const headNodes = Array.from(doc.head.querySelectorAll('style, link[rel="stylesheet"]'));
        headNodes.forEach((node) => {
          const clone = node.cloneNode(true);
          document.head.appendChild(clone);
          appendedHeadNodes.push(clone);
        });

        const renderableNodes = Array.from(doc.body.childNodes).filter((node) => node.nodeType === Node.ELEMENT_NODE);
        if (renderableNodes.length === 0) {
          throw new Error('Invalid SuperDesign export format: no renderable HTML nodes found in body.');
        }

        mountRef.current.replaceChildren(...renderableNodes.map((node) => node.cloneNode(true)));

        // Reactivate scripts because innerHTML-inserted scripts don't execute.
        const inertScripts = Array.from(mountRef.current.querySelectorAll('script'));
        inertScripts.forEach((oldScript) => {
          const newScript = document.createElement('script');

          Array.from(oldScript.attributes).forEach((attr) => {
            if (attr.name === 'type' && attr.value === 'text/delayed') return;
            if (attr.name === 'type' && attr.value === 'text/delayed-module') return;
            if (attr.name === 'data-src') return;
            newScript.setAttribute(attr.name, attr.value);
          });

          if (oldScript.type === 'text/delayed-module') {
            newScript.type = 'module';
          }

          const dataSrc = oldScript.getAttribute('data-src');
          if (dataSrc) {
            newScript.src = dataSrc;
          } else {
            newScript.textContent = oldScript.textContent;
          }

          oldScript.replaceWith(newScript);
        });
      } catch (err) {
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : 'Unable to load SuperDesign bundle');
        }
      }
    };

    loadBundle();

    return () => {
      isCancelled = true;
      if (mountRef.current) {
        mountRef.current.innerHTML = '';
      }
      appendedHeadNodes.forEach((node) => node.remove());
    };
  }, []);

  if (error) {
    return (
      <div className="rounded-[12px] bg-[#f0f6f9] px-6 py-8 text-sm text-[#181818]">
        Failed to load interactive case study: {error}
      </div>
    );
  }

  return <div ref={mountRef} className="bg-[#f0f6f9] text-[#181818]" />;
}

export default App;