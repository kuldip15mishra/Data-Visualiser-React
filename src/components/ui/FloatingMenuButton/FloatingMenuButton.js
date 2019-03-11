import React, { Fragment } from 'react';

const FloatingMenuButton = (props) => {

  function myTrendMenuShowHide() {

   
    if ($("#page-container").hasClass("tablet-menu")) {

      if ($("#page-container").hasClass("tab-sb-2-open") || $(".legend-area-tab").hasClass("open")) {
        $("#page-container").removeClass("tab-sb-2-open");
        $(".legend-area-tab").removeClass("open");
        $("#page-container").addClass("tab-sb-1-open");
        $(".white-overlay").toggle();
        $(".container-floating").removeClass("is-opened");
      }
      else {
        $("#page-container").toggleClass("tab-sb-1-open");
        $(".white-overlay").toggle();
        $(".container-floating").removeClass("is-opened");
      }

    }
    e.stopPropagation();
  }

  // tablet sb-2 open button

  function signalMenuShowHide() {
    props.handleOnClickAddSignal();
    if ($("#page-container").hasClass("tablet-menu")) {

      if ($("#page-container").hasClass("tab-sb-1-open") || $(".legend-area-tab").hasClass("open")) {
        $(".white-overlay, .dark-overlay").hide();
        $("#page-container").removeClass("tab-sb-1-open");
        $(".legend-area-tab").removeClass("open");
        $("#page-container").addClass("tab-sb-2-open");
        
        $(".container-floating").removeClass("is-opened");
      }
      else {
        $("#page-container").toggleClass("tab-sb-2-open");
        $(".white-overlay, .dark-overlay").hide();
        $(".container-floating").removeClass("is-opened");
      }
    }
  }
  function legendAreaShowHide() {

    if ($("#page-container").hasClass("tablet-menu")) {

      if ($("#page-container").hasClass("tab-sb-1-open") || $("#page-container").hasClass("tab-sb-2-open")) {
        $("#page-container").removeClass("tab-sb-1-open");
        $("#page-container").removeClass("tab-sb-2-open");
        
        $(".legend-area-tab").addClass("open");
        $(".white-overlay").toggle();
        $(".dark-overlay").toggle();
        $(".container-floating").removeClass("is-opened");
        $(".container-floating").hide();
      }
      else {
        $(".legend-area-tab").addClass("open");
        $(".white-overlay").toggle();
        $(".dark-overlay").toggle();
        $(".container-floating").removeClass("is-opened");
        $(".container-floating").hide();
      }
    }
  }

  function reset(){
    $(".dark-overlay").hide();
    $(".container-floating").removeClass("is-opened");
  $(".white-overlay").hide();
    props.resetExplorer();
  }
  return (

    <Fragment>
      <div className="container-floating">

        <div className="nd4 float-menu-item"><a href="javascript:;">
          <span className="float-menu-item-text">Explore</span> <span className="float-menu-item-icon" onClick={reset}><i onClick={reset} className="icon dd-search"></i></span>
        </a></div>
        <div className="nd3 float-menu-item">
          <a href="javascript:;" id="tab-sb-1-btn" onClick={myTrendMenuShowHide}>
            <span className="float-menu-item-text">My Trends</span> <span className="float-menu-item-icon"><i className="icon dd-trender"></i></span>
          </a></div>
        <div className="nd2 float-menu-item">
          <a href="javascript:;" onClick={legendAreaShowHide}>
            <span className="float-menu-item-text">Legend List</span> <span className="float-menu-item-icon"><i className="icon dd-trend"></i></span>
          </a></div>
        <div className="nd1 float-menu-item">
          <a href="javascript:;" onClick={signalMenuShowHide}>
            <span className="float-menu-item-text">Add Signal</span> <span className="float-menu-item-icon"><i className="icon dd-plus"></i></span>
          </a></div>

        <div className="floating-button">
          <i className="icon dd-trend"></i>
        </div>
      </div>
      <div className="white-overlay"></div>
    </Fragment>
  );
}

export default FloatingMenuButton;
