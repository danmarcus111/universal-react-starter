import Main from '../client/components/Main';
import React from 'react';

describe("Main", () => {
  let props;
  let mountedMain;
  let shallowRenderedMain;
  
  const renderMain = () => {
    if (!mountedMain) {
      mountedMain = mount(
        <Main {...props} />
      );
    }
    return mountedMain;
  }

  const shallowRenderMain = () => {
    if (!shallowRenderedMain) {
      shallowRenderedMain = shallow(
        <Main {...props} />
      );
    }
    return shallowRenderedMain;
  }

  beforeEach(() => {
    props = {};
    mountedMain = undefined;
    shallowRenderedMain = undefined;
  });
  
  it("always shallow renders", ()=>{
    let shallowRenderedMain = shallowRenderMain();
    expect(shallowRenderedMain).toBeDefined();
  });

  it("doesn't warn or send an error to console", ()=>{
    renderMain();
    expect(console.warn).toHaveBeenCalledTimes(0);
    expect(console.error).toHaveBeenCalledTimes(0);
  });

  it("doesn't log to console", ()=>{
    renderMain();
    expect(console.log).toHaveBeenCalledTimes(0);
  });

  it("always renders a div", () => {
    const divs = shallowRenderMain().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  describe("the rendered div", () => {
    it("contains everything else that gets rendered", () => {
      const divs = shallowRenderMain().find('div');
      const wrappingDiv = divs.first();

      expect(wrappingDiv.children()).toEqual(shallowRenderMain().children());
    });
  });

  it("always renders a single button", () => {
    expect(shallowRenderMain().find('button').length).toBe(1);
  });

});