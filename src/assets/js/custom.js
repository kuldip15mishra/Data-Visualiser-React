import $ from 'jquery';



  $(document).on("click",".content-area",function () {
    $("#page-container").removeClass("tab-sb-1-open tab-sb-2-open ");
   
    // $(".settings-filter").removeClass("opened");
    
//     var elementClicked = false;
    
// $(".signal-menu").click(function(){
//    elementClicked = true;
// });
// if( elementClicked != true ) {
//     alert("element not clicked");
// }else{
//     alert("element clicked");
// }
    
 });

//  $(".sb-1").click(function(event) {
//   event.stopPropagation();
//   event.preventDefault();
//  });

function gridContainerHeight(){
  var contentArea=$('.content-area').height();
  var trenderArea=$('.trender-area').height();
  var seriesHeight=contentArea-trenderArea-85;
  // console.log("content-area:"+contentArea);
  // console.log("Trender-area:"+trenderArea);
  // console.log("Series-height:"+seriesHeight);
  $('.signal-grid-area').css('max-height', seriesHeight);
}



$(document).ready(function(){
gridContainerHeight();
$('.trender-chart-area').resize(function(){
  gridContainerHeight();
})
});

$(document).click(function(event) {
//   if ($(event.target).parents('.time-dropdown').length != 0) {

//     console.log("csdvsvefvevrecedced")
//     //someone has this class
// }
 
  if ( !$(event.target).hasClass('time-dropdown') && !$(event.target).hasClass('drop-down__button') && !$(event.target).hasClass('dd-pointer') &&($(event.target).parents('.time-dropdown').length == 0) ) {
  
    //$('.drop-down').removeClass('drop-down--active');
  }


  if ( ($(event.target).parents('.settings-filter').length == 0) && (!$(event.target).hasClass('settings-filter-toggle')) ) {
    $("div").removeClass("overlay");
    $(".settings-filter").removeClass("opened");
  }

 $(".mytrend-hide").click(function(){
  $(".dark-overlay").hide();
  $(".white-overlay").hide();
$("#page-container").removeClass("tab-sb-1-open");
 });

 $(".add-signal-hide").click(function(){
  $("#page-container").removeClass("tab-sb-2-open");
   });

   $(".mobile-setting-btn").click(function(){
   
    $(".mobile-setting-sidebar").addClass("open");
     });
     
     $(".settings-hide").click(function(){
   
      $(".mobile-setting-sidebar").removeClass("open");
       });
 
});

$(document).ready(function(){
  // $("#timeFilterDropDown").on("click", function(){
  //   alert("The paragraph was clicked.");
  //   $('.drop-down').toggleClass('drop-down--active');
  // });

  
  $('#timeFilterDropDown').click(function(){
    
    $('.drop-down').toggleClass('drop-down--active');
  });

  // $('.time-dropdown').click(function(){
  //   $('.drop-down').toggleClass('drop-down--active');
  // });

//   $('#timeFilterDropDown').outside('click', function() {
//     if ( !$(event.target).hasClass('time-dropdown') && ( !$(event.target).hasClass('date-range-picker-single') &&  !$(event.target).hasClass('time-filter-btn') &&  !$(event.target).hasClass('col-sm-4'))) {
//       console.log(event.target)
//            console.log("hellooooos")
//           $('.drop-down').removeClass('drop-down--active');
//          }
//          else{
//           console.log(event.target)
//          }
//     //$('.drop-down').removeClass('drop-down--active');
// });

$('.floating-button').click(function(){
  $(this).closest('.container-floating').toggleClass('is-opened');
  $('.nds').removeClass('is-opened');
  $(".white-overlay").toggle();

})

$('.nds').click(function(){
  $('.nds').not(this).removeClass('is-opened');
  $(this).toggleClass('is-opened');
})



$(document).on('click','.accor-btn',function(){
  $(this).next().next().slideToggle();
})



});

window.gridContainerHeight=gridContainerHeight;



