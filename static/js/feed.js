//Globals for hack purposes...
var clickendpoint= "/3085772195/web_click/_search",
	contactendpoint= "/3085772195/contact/_search",
	pageCount= 3,
	pulsInterval= 45000,
	prevSearchDate,
	intervalId;

function pulseActivities() {
	var now = new Date().getTime();
	var data = createFeedReqBody(now);
	prevSearchDate = now;
	
	var serializedData = JSON.stringify(data);
	
	$.ajax({
		type: 'POST',
		url: clickendpoint,
		contentType: 'application/json',
		data: serializedData,
		success: function(data) {
			if(data) {
				activitiesRes = JSON.parse(data);
				if(activitiesRes.hits.total > 0 )
					findContactsFromActivities( activitiesRes.hits.hits);
			}
		},
		error : function(e) {
			console.log(e);
			if(intervalId)
				clearInterval(intervalId);
		}
	});
}

function findContactsByIds(reqBody, activities, callback) {
	var serializedBody = JSON.stringify(reqBody);
	
	$.ajax({
		type: 'POST',
		url: contactendpoint,
		contentType: 'application/json',
		data: serializedBody,
		success: function(data) {
			if(data) {
				var contacts = JSON.parse(data);
				callback(contacts, activities);
			}
		},
		error: function(e) {
			console.log(e);
			if(intervalId)
				clearInterval(intervalId);
		}
	});
}
	
function createFeedReqBody(nowTime) {
	var reqBody;
	
	reqBody = {
		size : pageCount,
		query : {
			range : {
				timestamp : {
				}
			}
		},
		sort:[
			{
				timestamp : {
					order : "desc"
				}
			}
		]
	}

	reqBody.query.range.timestamp.lte = nowTime;
	if(prevSearchDate) {
		reqBody.query.range.timestamp.gt = prevSearchDate;
	}
	
	return reqBody;
}

function findContactsFromActivities( activities ) {
	var contactMap = {};
	for( var i=0; i<activities.length; i++) {
		var contactid = activities[i]._source.contactid;
		if(contactid) 
			contactMap[contactid] = true;
	}
	
	var reqBody = createContactReqObject( contactMap );
	
	if(reqBody) {
		findContactsByIds(reqBody, activities, updateFeed);
	}
}

function createContactReqObject( contactMap ) {
	var values = [];
	for( var prop in contactMap ){
		values.push(prop);
	}
	
	if( values.length > 0 ) {
		var reqObject = {
			filter : {
				ids : {
					values:values
				}
			}
		}
		
		return reqObject;
	}
	
	return null;
}

function createContactIdMap(contacts) {
	var contactMap = {};
	for( var i=0; i<contacts.length; i++) {
		if( contacts[i]._id )
			contactMap[contacts[i]._id] = contacts[i]._source;
	}
	
	return contactMap;
}

function updateFeed(contacts, activities) {
	feedHandle = $('#feedControl');
	
	var contactIdMap = null;
	if( contacts.hits.total > 0)
		contactIdMap= createContactIdMap(contacts.hits.hits);
	
	var appendHtml = '';
	
	if( contactIdMap) {
		var appendHtml = generateActivitiesHTML(contactIdMap, activities);
		feedHandle.append(appendHtml);
	}
}

function generateActivitiesHTML( contactMap, activities ) {
	var strBdr = [];
	
	for( var i= 0; i< activities.length; i++) {
		var activity = activities[i]._source,
			contactid = activity.contactid,
			contact = contactMap[contactid],
			timestamp = isNaN(activity.timestamp) ? new Date(activity.timestamp) : new Date( Number(activity.timestamp) );
			
		if(contact) {
			strBdr.push('<div class="feed-list-item">', 
						'<div class="row">',
						'<p>',
						'<img class="activity-click-icon" src="../img/icon-email-Clicks_active.png" width="40" height="40">',
						'<b>',
						'Contact Name: ' + contact.c_firstname + ' ' + contact.c_lastname,
						'</b>',
						'</p>',
						'<p>',
						'Activity time: ' + timestamp.toString(),
						'</p>',
						'<p>',
						'Base Url: ' + activity.baseurl,
						'</p>',
						'</div>',
						'</div>');
		}
	}
	
	return strBdr.join('');
}

$(document).ready(function() {
	intervalId = setInterval(pulseActivities, pulsInterval);
	pulseActivities();
});