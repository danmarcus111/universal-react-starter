import About from '../client/components/About';
import React from 'react';

describe("About", () => {
  let props;
  let mountedAbout;
  let shallowRenderedAbout;
  
  const renderAbout = () => {
    if (!mountedAbout) {
      mountedAbout = mount(
        <About {...props} />
      );
    }
    return mountedAbout;
  }

  const shallowRenderAbout = () => {
    if (!shallowRenderedAbout) {
      shallowRenderedAbout = shallow(
        <About {...props} />
      );
    }
    return shallowRenderedAbout;
  }

  beforeEach(() => {
    props = {};
    mountedAbout = undefined;
    shallowRenderedAbout = undefined;
  });

  it("always shallow renders", ()=>{
    let shallowRenderedAbout = shallowRenderAbout();
    expect(shallowRenderedAbout).toBeDefined();
  });

  it("doesn't warn or send an error to console", ()=>{
    renderAbout();
    expect(console.warn).toHaveBeenCalledTimes(0);
    expect(console.error).toHaveBeenCalledTimes(0);
  });

  it("doesn't log to console", ()=>{
    renderAbout();
    expect(console.log).toHaveBeenCalledTimes(0);
  });

  it("always renders a paragraph", () => {
    const divs = shallowRenderAbout().find("p");
    expect(divs.length).toBeGreaterThan(0);
  });


});