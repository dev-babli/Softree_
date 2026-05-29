import Component_1_1 from './Component_1_1';
import Component_1_2 from './Component_1_2';
import Component_1_3 from './Component_1_3';

function Component_1() {
  return (
    <div
      className="grow basis-[0%] caret-[#181818]"
      data-component-id="Component_1"
    >
      <div className="flex justify-start items-center gap-y-[31.062px] gap-x-[31.062px] caret-[#181818] px-[62.1239px]">
        <Component_1_1 />
        <Component_1_2 />
        <a
          href="https://marketplace.kore.ai/"
          className="text-[13.5896px] block caret-[#181818] hover:[outline-style:initial] hover:outline-0 hover:outline-[initial]"
        >
          Agent Marketplace
        </a>
        <Component_1_3 />
      </div>
    </div>
  );
}

export default Component_1;
