$(document).ready(function() {
	//Default text on login input fields
    $(".defaultText").focus(function(srcc) {
        if ($(this).val() == $(this)[0].value)
        {
 
            $(this).removeClass("defaultTextActive");
            $(this).val("");
        }
    });
    
    $(".defaultText").blur(function() {
        if ($(this).val() == "")
		{
            $(this).addClass("defaultTextActive");
            $(this).val($(this)[0].value);
        }
    });
    
    $(".defaultText").blur();        

    $("form").submit(function() {
		$(".defaultText").each(function() {
			if($(this).val() == this.value) 
			{
				$(this).val("");
			}
		});
	});

	$('#password-clear').show();
	$('#password-password').hide();
	 
	$('#password-clear').focus(function() {
	    $('#password-clear').hide();
	    $('#password-password').show();
	    $('#password-password').focus();
	});
	$('#password-password').blur(function() {
	    if($('#password-password').val() == '') {
	        $('#password-clear').show();
	        $('#password-password').hide();
	    }
	});


	//Show / hide

	$(function centerPopup(){
		$('.more-info-box').each(function(){
				$(this).css('left',($(window).width()-$(this).outerWidth())/ 2 + 'px');
				$(this).css('top',($(window).height()-$(this).outerHeight())/ 2 + 'px');
		});
	});
	$('.popup-btn-js').click(function(e){
		e.preventDefault();
		$('.more-info-box').hide();
		$('.command_forcebuild').removeClass('form-open');
		$(this).next().fadeIn('fast', function (){
			$('.command_forcebuild', this).addClass('form-open')

			validateForm();
			
		});

	});

	$(document, '.close-btn').click(function(e){
		if (!$(e.target).closest('.more-info-box, .popup-btn-js').length || $(e.target).closest('.close-btn').length ) {
			$('.command_forcebuild').removeClass('form-open');
			$('.more-info-box').fadeOut('fast');
		}
	}); 

	// class on selected menuitem
	$(function setCurrentItem(){
		var path = window.location.pathname.split("\/");
		
		 $('.top-menu a').each(function(index) {
		 	var thishref = this.href.split("\/");
	        if(thishref[thishref.length-1].trim().toLowerCase() == path[1].trim().toLowerCase())
	            $(this).parent().addClass("selected");
	    });
	});

	// check all in tables
	$(function selectAll() {
	    $('#selectall').click(function () {
	        $('#inputfields').find(':checkbox').prop('checked', this.checked);
	    });
	});

	// chrome font problem fix
	$(function chromeWin() {
		var is_chrome = /chrome/.test( navigator.userAgent.toLowerCase() );
		var isWindows = navigator.platform.toUpperCase().indexOf('WIN')!==-1;
		if(is_chrome && isWindows){
		  $('body').addClass('chrome win');

		}
	});

	// sort and filter tables
	$('.tablesorter').dataTable({
		"bPaginate": false,
		"bLengthChange": false,
		"bFilter": true,
		"bSort": true,
		"bInfo": false,
		"bAutoWidth": false,
		"bRetrieve": false,
		"asSorting": true,
		"bSearchable": true,
		"bSortable": true,
		//"oSearch": {"sSearch": " "}
		"aaSorting": [],
		"oLanguage": {
		 	"sSearch": "Filter"
		 },
		"bStateSave": true
	});

	// validate the form
	function validateForm() {
		var formEl = $('.form-open');
		var excludeFields = ':button, :hidden, :checkbox, :submit';
		$('.grey-btn', formEl).click(function(e) {

			var allInputs = $('input', formEl).not(excludeFields)
			var rev = allInputs.filter(function() {
				return this.name === "fmod_revision";
			});

			var emptyRev = rev.filter(function() {
				return this.value === "";
			});

			  if (emptyRev.length > 0 && emptyRev.length < rev.length) {
				
				rev.each(function(){
    				if ($(this).val() === "") {
						$(this).addClass('not-valid');
					} else {
						$(this).removeClass('not-valid');
					}
    			});
    			$('.form-message', formEl).hide();
    			if (!$('.error-input', formEl).length) {
    				$(formEl).prepend('<div class="error-input">Fill out the empty revisionfields or clear all before submitting</div>');
    			} 
				e.preventDefault();
			}

		});
		$(".clear-btn", formEl).click(function (e) {
			$('input[name="fmod_revision"]',formEl).val("").removeClass('not-valid');
			e.preventDefault();
		});
	}

		// parse url and make breadcrumb navigation

	var dict = {
	  "test" : "testing",
	  "test1" : "testing1",
	};
	
	var path = "";
	var href = document.location.href;
	var s = href.split("/");
	
	for (var i=2;i<(s.length-1);i++) {
	path+="<li><a HREF=\""+href.substring(0,href.indexOf("/"+s[i])+s[i].length+1)+"/\">"+s[i]+"</a></li>";
	}
	i=s.length-1;	
	path+= '<li>' + s[i] + '</li>';
	
		$('.breadcrumbs-nav').html(path)
});