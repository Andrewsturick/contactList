'use strict';
$(document).ready(init);

var listingArray = JSON.parse(localStorage.listings||"[]");

function init(){
      $('.submitter').on('click',addRow);
      $('body').on('change', '.checkbox', addStrikethrough);
      $('body').on('click', '.deleter',deleteRow)
      tableMaker(listingArray);
      $('body').on('click', '.editor' , editRow);
      $('body').on('click', '.editSubmit' , resubmitRow);
}


function resubmitRow(){
  $('.edit').toggleClass('hidden');
  var name = $('#editInputName').val();
  var email =  $('#editInputEmail').val();
  var address =  $('#editInputAddress').val();
  var phoneNumber =  $('#editInputNumber').val();

    var thisIndex = $('.editing-row-currently').closest('tr').index();
    console.log(thisIndex);
    if (name.length){
        var newObj = {};

        newObj['name']=name;
        newObj['email']=email;
        newObj['address']=address;
        newObj['phoneNumber']=phoneNumber;
        listingArray[thisIndex-1]=newObj;
        var stringified = JSON.stringify(listingArray);
        localStorage.listings = stringified;
        $('.dataContain').children('tbody').children('tr:not(:first)').remove()
        // $("tbody:not(:first)").remove()
        tableMaker(listingArray);
        // $('.dataContain').append($('<tr>').append($('<input type="button" class=" deleter btn" value="delete"></input><input type="button" class=" editor btn" value="edit"></input>')).append($('<td>').text(name)).append($('<td>').text(email)).append($('<td>').text(address)).append($('<td>').text(phoneNumber)));

  $('#inputName').val('');
  $('#inputEmail').val('');
  $('#inputAddress').val('');
  $('#inputNumner').val('');

  }
}


function editRow(){

  var thisIndex = $(this).closest('tr').index();
  $('.edit').toggleClass('hidden');
  $(this).closest('tr').children('td').toggleClass('editing-row-currently')

};

function addStrikethrough(){
  $(this).closest('tr').children('td').toggleClass('crossed-off');

}

function tableMaker (listings){
  for (var i=0; i<listingArray.length; i++){
      var thisListing= listingArray[i]

      $('.dataContain').append($('<tr>')
        .append($('<input type="button" class=" deleter btn" value="delete"></input><input type="button" class=" editor btn" value="edit"></input>'))
        .append($('<td>').text(thisListing[Object.keys(thisListing)[0]])).append($('<td>').text(thisListing[Object.keys(thisListing)[1]])).append($('<td>')
        .text(thisListing[Object.keys(thisListing)[2]])).append($('<td>')
        .text(thisListing[Object.keys(thisListing)[3]])));
  }
}



function addRow(){

  var name = $('#inputName').val();
  var email =  $('#inputEmail').val();
  var address =  $('#inputAddress').val();
  var phoneNumber =  $('#inputNumber').val();

  if (name.length){
      var newObj = {};
      
      newObj['name']=name;
      newObj['email']=email;
      newObj['address']=address;
      newObj['phoneNumber']=phoneNumber;



      listingArray.push(newObj);
      var stringified = JSON.stringify(listingArray);
      localStorage.listings = stringified;
      $('.dataContain').append($('<tr>')
      .append($('<input type="button" class=" deleter btn" value="delete"></input><input type="button" class=" editor btn" value="edit"></input>'))
      .append($('<td>')
      .text(name)).append($('<td>')
      .text(email)).append($('<td>').text(address))
      .append($('<td>').text(phoneNumber)));

      //clears values----------------//

      $('#inputName').val('');
      $('#inputEmail').val('');
      $('#inputAddress').val('');
      $('#inputNumber').val('');
}}



function deleteRow(){
    var thisIndex = $(this).closest('tr').index();
    listingArray.splice([thisIndex-1],1);
    var stringified = JSON.stringify(listingArray);
    localStorage.listings = stringified;
    $(this).closest('tr').remove();

}
