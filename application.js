//var NotekDetails = new NoteDetailsBuffer(); 

var Notekeeper = new Array();

function NoteDetailsBuffer(){
	this.Title = " ";
	this.Note = " ";
	this.Crt_Ts = " ";
	}
// JavaScript Document
$(function(){
	// define the application
	//var Notekeeper = {};
	(function(app){
		// variable definitions go here
		app.init = function(){
		// stuff in here runs first
			app.bindings();
			app.displayNotes();
		}
		
		app.bindings = function(){
			// set up binding for form
			$('#btnAddNote').on('click', function(e){
				//e.preventDefault();
				//alert($('#title').val());
				// save the note
				app.addNote(
					$('#title').val(),
					$('#note').val(),
					$('#date').val()
				);
			});
			
			$(document).on('click', '#notesList a', function(e){
				e.preventDefault();
				var href = $(this)[0].href.match(/\?.*$/)[0];
				var title = href.replace(/^\?title=/,'');
				app.loadNote(title);
			});
			
			$(document).on('click', '#btnDelete', function(e){
				e.preventDefault();
				var key = $(this).data('href');
				app.deleteNote(key);
			});
		
			$(document).on('click', '#btnBack', function(e){
				$.mobile.changePage('LiamNote.html', {transition:"slideup"});
			});
			
		}
		
		//app.init();
		
		app.addNote = function(title, note, date){
			
			var notes = localStorage['Notekeeper'];
			
			if (notes == undefined || notes == '') {
				var notesObj = {};
			} else {
				var notesObj = JSON.parse(notes)
			}
	
			var NotekDetails = new NoteDetailsBuffer();
			NotekDetails.Title = title;
			NotekDetails.Note = note;
			NotekDetails.Crt_Ts = date;
			notesObj[title.trim()] = NotekDetails;
			localStorage['Notekeeper'] = JSON.stringify(notesObj);

			//if (notes == undefined || notes == '') {
//				var list = [];
//			} else {
//				var list = JSON.parse(notes)
//			}
//	
//			var NotekDetails = new NoteDetailsBuffer();
//			NotekDetails.Title = title;
//			NotekDetails.Note = note;
//			NotekDetails.Crt_Ts = date;
//	
//			list.push(NotekDetails);
//			localStorage['Notekeeper'] = JSON.stringify(list);
			// clear the two form fields
			//$note.val('');
			//$title.val('');
			$('#title').val(' ');
			$('#note').val(' ');
			//update the listview
			app.displayNotes();
		}
		
		app.displayNotes = function(){
			var $ul = $('#notesList'),
			li = '<li><a href="#pgNotesDetail?title=LINK">ID</a></li>',
			notesHdr = '<li data-role="list-divider">Your Notes</li>',
			noNotes = '<li id="noNotes">You have no notes</li>';
			
			// create an empty string to contain html
			var notesObj = app.getNotes(),
			html = '',
			n; // make sure your iterators are properly scoped
			
			var v = app.getNotes();
			if ($.isEmptyObject(v))
				html = noNotes;
			else{
				// loop over notes
				for (n in notesObj) {
					html += li.replace(/ID/g,n.replace(/-/g,' ')).replace(/LINK/g,n);
				}
			}
			
			//alert(html);
			$('#notesList').html(notesHdr + html).listview('refresh');
		}
		
		app.getNotes = function(){
			// get notes
			var notes = localStorage['Notekeeper'];
			// convert notes from string to object
			return JSON.parse(notes);
		}
		
		app.loadNote = function(title){
			// get notes
			var notes = app.getNotes(),
			// lookup specific note
			note = notes[title];
			// define the "new page" template
			var page = ['<div data-role="page" data-url="details" data-add-backbtn="true">',
			'<div data-role="header">',
			'<h1>TITLE</h1>',
			'<a id="btnBack" href="" data-href="LiamNote.html" datarole="button" class="ui-btn-left">Back</a>',
			'<a id="btnDelete" href="" data-href="ID" datarole="button" class="ui-btn-right">Delete</a>',
			'</div>',
			'<div data-role="content"><h3>TITLE</h3><p>NOTE</p></div>',
			'</div>'].join('');
			var newPage = $(page);
			
			// append it to the page container
			newPage.html(function(index,old){
			return old
			.replace(/ID/g,note.Title)
			.replace(/TITLE/g,note.Title
			.replace(/-/g,' '))
			.replace(/NOTE/g,note.Note)
			}).appendTo($.mobile.pageContainer);
			
			$.mobile.changePage(newPage, {transition:"slide"}); 
			//fade, flip, pop, slide, slidedown, slideup.
		}
		
		app.deleteNote = function(key){
			// get the notes from localStorage
			var notesObj = app.getNotes();
			// delete selected note
			delete notesObj[key.trim()];
			// write it back to localStorage
			localStorage['Notekeeper'] = JSON.stringify(notesObj);
			// return to the list of notes
			$.mobile.changePage('LiamNote.html', {transition:"slide"});
			app.init();
		}
		app.init();
	})(Notekeeper);
	
	$("body").bind("tap", function(e) {
		$("#status").text("You just did a tap event!");
		$("#DatePicker").datepicker();
	});
	$("body").bind("taphold", function(e) {
		$("#status").text("You just did a tap hold event!");
	});
	
	$("body").bind("swipe", function(e) {
		$("#status").text("You just did a swipe event!");
	});
	
	$("body").bind("swipeleft", function(e) {
		$("#status").text("You just did a swipe left event!");
		
	});
	
	$("body").bind("swiperight", function(e) {
		$("#status").text("You just did a swipe right event!");
		$.mobile.changePage('LiamNote.html', {transition:"slideup"});
	});
	
	$("body").bind("scrollstart", function(e) {
		$("#status").text("You just did a scroll start event!");
	});
	
	$("body").bind("scrollstop", function(e) {
		$("#status").text("You just did a scroll stop event!");
	});
	
	$(window).bind("orientationchange", function(e,type) {
		$("#status").html("Orientation changed to "+e.orientation);
	});
});