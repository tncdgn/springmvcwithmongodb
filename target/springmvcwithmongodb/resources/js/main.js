jQuery(document).ready(function($){
	var $form_modal = $('.cd-user-modal'),
        $form_modal2=$('.cd-user-modal2'),
		$form_login = $form_modal.find('#cd-login'),
        $form_edit = $form_modal2.find('#cd-edit'),
		$form_signup = $form_modal.find('#cd-signup'),
		$form_forgot_password = $form_modal.find('#cd-reset-password'),
		$form_modal_tab = $('.cd-switcher'),
		$tab_login = $form_modal_tab.children('li').eq(0).children('a'),
		$tab_signup = $form_modal_tab.children('li').eq(1).children('a'),
		$forgot_password_link = $form_login.find('.cd-form-bottom-message a'),
		$back_to_login_link = $form_forgot_password.find('.cd-form-bottom-message a'),
		$main_nav = $('#add'),
        $edit =$("#edit");
    var personId="";
    var selectedName;
    var selectedSurname;
    var selectedAddress;
    var selectedTelephone;
	//open modal
    //get person value
    function getSelectedValue(){
        personId=$('input[name="personData"]:checked').val();
        selectedName=$("#personTable").find("tbody").find("#"+personId).find("#selectedName").text();
        selectedSurname=$("#personTable").find("tbody").find("#"+personId).find("#selectedSurname").text();
        selectedAddress=$("#personTable").find("tbody").find("#"+personId).find("#selectedAddress").text();
        selectedTelephone=$("#personTable").find("tbody").find("#"+personId).find("#selectedPhoneNumber").text();
    }
    //when radio button clicked,collect person data
    $('input[name="personData"]').on("click",function(event){
        getSelectedValue();

    })
        //when delete button clicked
    $("#delete").on("click",function(event){

        if(personId=="")
            swal({   title: "Warning!!!",   type:"warning",text: "Please Select a User",   timer: 2000,   showConfirmButton: false });
        else{

            removeOrcancelSelectedRow();

        }


    })

    function doAjax(){

        $.ajax({

            url:"users/delete",

            data:({id:personId}),


            success : function(data) {
                $("#"+personId).remove();
                swal("Deleted!", "Person has been deleted.", "success");
            },
            error:function(data){

            }
        })
    }
        function removeOrcancelSelectedRow(){
            swal({   title: "Are you sure?",
                    text: "You will not be able to recover this person data!",
                    type: "warning",   showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete it!",
                    cancelButtonText: "No, cancel it!",
                    closeOnConfirm: false,
                    closeOnCancel: false },
                function(isConfirm){
                    if (isConfirm) {
                        doAjax();

                    }
                    else {     swal("Cancelled", "Person data  is safe :)", "error");   } });
        }

    //when edit button clicked set chosen person data

    function setSelectedValue(){


        $("#edit-name").val(selectedName);
        $("#edit-surname").val(selectedSurname);
        $("#edit-address").val(selectedAddress);
        $("#edit-number").val(selectedTelephone);
        $("#edit-id").val(personId);
    }


	$main_nav.on('click', function(event){

        if( $(event.target).is($main_nav) ) {
            // on mobile open the submenu
            $(this).children('ul').toggleClass('is-visible');
        } else {

            // on mobile close submenu
            $main_nav.children('ul').removeClass('is-visible');
            //show modal layer
            $form_modal.addClass('is-visible');
            //show the selected form
            ( $(event.target).is('.cd-signup') ) ? signup_selected() : login_selected();
        }

    });
    $edit.on('click', function(event){

        if( $(event.target).is($edit) ) {
            // on mobile open the submenu
            $(this).children('ul').toggleClass('is-visible');
        } else {
            if(personId==""){
                swal({   title: "Warning!!!",  type:"warning", text: "Please Select a User",   timer: 2000,   showConfirmButton: false });
            }
            else{
                setSelectedValue();
                // on mobile close submenu
                $edit.children('ul').removeClass('is-visible');
                //show modal layer
                $form_modal2.addClass('is-visible');
                //show the selected form
                ( $(event.target).is('.cd-edit') ) ? signup_selected() : login_selected();
            }

        }

    });

	//close modal
	$('.cd-user-modal').on('click', function(event){
		if( $(event.target).is($form_modal) || $(event.target).is('.cd-close-form') ) {
			$form_modal.removeClass('is-visible');
		}	
	});
    $('.cd-user-modal2').on('click', function(event){
        if( $(event.target).is($form_modal2) || $(event.target).is('.cd-close-form') ) {
            $form_modal2.removeClass('is-visible');
        }
    });
	//close modal when clicking the esc keyboard button
	$(document).keyup(function(event){
    	if(event.which=='27'){
    		$form_modal.removeClass('is-visible');
            $form_modal2.removeClass('is-visible');
	    }
    });







	//back to login from the forgot-password form
	$back_to_login_link.on('click', function(event){
		event.preventDefault();
		login_selected();
	});

	function login_selected(){
		$form_login.addClass('is-selected');

		$tab_login.addClass('selected');
	}





//	REMOVE THIS - it's just to show error messages
	$form_login.find('input[type="submit"]').on('click', function(event){

        if($.trim($("#add-name").val())==""){
            event.preventDefault();
            $form_login.find("#add-name").toggleClass('has-error').next('span').toggleClass('is-visible');

        }
        else{
            $form_login.find("#add-name").toggleClass('has-error').next('span').removeClass('is-visible');
        }


         if($.trim($("#add-surname").val())==""){
            event.preventDefault();
            $form_login.find("#add-surname").toggleClass('has-error').next('span').toggleClass('is-visible');

        }
         else{
             $form_login.find("#add-surname").toggleClass('has-error').next('span').removeClass('is-visible');
         }
        if($.trim($("#add-address").val())==""){
            event.preventDefault();
            $form_login.find("#add-address").toggleClass('has-error').next('span').toggleClass('is-visible');

        }
        else{
            $form_login.find("#add-address").toggleClass('has-error').next('span').removeClass('is-visible');
        }
        if($.trim($("#add-number").val())==""){
            event.preventDefault();
            $form_login.find("#add-number").toggleClass('has-error').next('span').toggleClass('is-visible');

        }
        else{
            $form_login.find("#add-number").toggleClass('has-error').next('span').removeClass('is-visible');
        }





	});
    $form_edit.find('input[type="submit"]').on('click', function(event){

        if($.trim($("#edit-name").val())==""){
            event.preventDefault();
            $form_edit.find("#edit-name").toggleClass('has-error').next('span').toggleClass('is-visible');

        }
        else{
            $form_edit.find("#edit-name").toggleClass('has-error').next('span').removeClass('is-visible');
        }


        if($.trim($("#edit-surname").val())==""){
            event.preventDefault();
            $form_edit.find("#edit-surname").toggleClass('has-error').next('span').toggleClass('is-visible');

        }
        else{
            $form_edit.find("#edit-surname").toggleClass('has-error').next('span').removeClass('is-visible');
        }
        if($.trim($("#edit-address").val())==""){
            event.preventDefault();
            $form_edit.find("#edit-address").toggleClass('has-error').next('span').toggleClass('is-visible');

        }
        else{
            $form_edit.find("#edit-address").toggleClass('has-error').next('span').removeClass('is-visible');
        }
        if($.trim($("#edit-number").val())==""){
            event.preventDefault();
            $form_edit.find("#edit-number").toggleClass('has-error').next('span').toggleClass('is-visible');

        }
        else{
            $form_edit.find("#edit-number").toggleClass('has-error').next('span').removeClass('is-visible');
        }



    });
    /*
	$form_signup.find('input[type="submit"]').on('click', function(event){
		event.preventDefault();
		$form_signup.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
	});

*/
	//IE9 placeholder fallback
	//credits http://www.hagenburger.net/BLOG/HTML5-Input-Placeholder-Fix-With-jQuery.html
	if(!Modernizr.input.placeholder){
		$('[placeholder]').focus(function() {
			var input = $(this);
			if (input.val() == input.attr('placeholder')) {
				input.val('');
		  	}
		}).blur(function() {
		 	var input = $(this);
		  	if (input.val() == '' || input.val() == input.attr('placeholder')) {
				input.val(input.attr('placeholder'));
		  	}
		}).blur();
		$('[placeholder]').parents('form').submit(function() {
		  	$(this).find('[placeholder]').each(function() {
				var input = $(this);
				if (input.val() == input.attr('placeholder')) {
			 		input.val('');
				}
		  	})
		});
	}

});


//credits http://css-tricks.com/snippets/jquery/move-cursor-to-end-of-textarea-or-input/
jQuery.fn.putCursorAtEnd = function() {
	return this.each(function() {
    	// If this function exists...
    	if (this.setSelectionRange) {
      		// ... then use it (Doesn't work in IE)
      		// Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.
      		var len = $(this).val().length * 2;
      		this.setSelectionRange(len, len);
    	} else {
    		// ... otherwise replace the contents with itself
    		// (Doesn't work in Google Chrome)
      		$(this).val($(this).val());
    	}
	});
};