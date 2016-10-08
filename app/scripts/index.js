var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var githubtoken = require('./gitapikeys.js');

if(githubtoken !== undefined){
 $.ajaxSetup({
   headers: {
     'Authorization': 'token ' + githubtoken.token
   }
 });
}

$.ajax('https://api.github.com/users/jchoi126').then(displayProfile);
function displayProfile(data){
 var profiledata = data;
 var $profileContainer = $('#profile-bar');
 var source = $('#profile-bar-template').html();
 var template = Handlebars.compile(source);
 console.log(template);
// be sure to know when to use append and prepend.
$profileContainer.prepend(template(profiledata));
 // _.each(profiledata, function(profilebar){
 //   $profileContainer.append(template(profilebar));
 // });
}

$.ajax('https://api.github.com/users/jchoi126').then(displayInfoProfile);
function displayInfoProfile(data){
 var $profileInfoContainer = $('#profile-info');
 var source = $('#profile-info-template').html();
 var template = Handlebars.compile(source);
$profileInfoContainer.prepend(template(data));
}

$.ajax('https://api.github.com/users/jchoi126/repos?sort=pushed').then(displayRepository);
function displayRepository(data){
 var repositoryData = data;
 var $repositoryContainer = $('#repositories');
 var source = $('#repositories-template').html();
 var template = Handlebars.compile(source);
// be sure to know when to use append and prepend.
 _.each(repositoryData, function(repositories){
   $repositoryContainer.append(template(repositories));
 });
}
