import React, { useEffect } from 'react';
import Component_1 from './components/Component_1';
import Component_2 from './components/Component_2';
import Component_3 from './components/Component_3';
import Component_4 from './components/Component_4';
import Component_5 from './components/Component_5';
import Component_6 from './components/Component_6';
import Component_7 from './components/Component_7';

function App() {
  useEffect(() => {
    const delayedScripts = document.querySelectorAll('script[type="text/delayed"]');
    delayedScripts.forEach((script) => {
      const newScript = document.createElement('script');

      if (script.dataset.src) {
        newScript.src = script.dataset.src;
        Array.from(script.attributes).forEach((attr) => {
          if (attr.name !== 'type' && attr.name !== 'data-src') {
            newScript.setAttribute(attr.name, attr.value);
          }
        });
      } else {
        newScript.textContent = script.textContent;
        Array.from(script.attributes).forEach((attr) => {
          if (attr.name !== 'type' && attr.name.startsWith('data-')) {
            newScript.setAttribute(attr.name, attr.value);
          }
        });
      }

      document.body.appendChild(newScript);
    });

    const delayedModules = document.querySelectorAll('script[type="text/delayed-module"]');
    delayedModules.forEach((script) => {
      const newScript = document.createElement('script');
      newScript.type = 'module';

      if (script.dataset.src) {
        newScript.src = script.dataset.src;
        Array.from(script.attributes).forEach((attr) => {
          if (attr.name !== 'type' && attr.name !== 'data-src') {
            newScript.setAttribute(attr.name, attr.value);
          }
        });
      } else {
        newScript.textContent = script.textContent;
        Array.from(script.attributes).forEach((attr) => {
          if (attr.name !== 'type' && attr.name.startsWith('data-')) {
            newScript.setAttribute(attr.name, attr.value);
          }
        });
      }

      document.body.appendChild(newScript);
    });
  }, []);

  return (
    <div className="bg-[#f0f6f9] text-[#181818] [font-family:Inter,Arial,sans-serif]">
      <main className="overflow-x-hidden">
        <section className="px-6 py-6">
          <Component_1 />
        </section>
        <section className="px-6 pb-8">
          <Component_2 />
        </section>
        <section className="px-6 pb-8">
          <Component_3 />
        </section>
        <section className="px-6 pb-8">
          <Component_4 />
        </section>
        <section className="px-6 pb-8">
          <Component_5 />
        </section>
        <section className="px-6 pb-8">
          <Component_6 />
        </section>
        <section className="px-6 pb-8">
          <Component_7 />
        </section>
      </main>
    </div>
  );
}

export default App;
