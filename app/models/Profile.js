// defining a mongoose schema 
// including the module
var mongoose = require('mongoose');
// declare schema object.
var Schema = mongoose.Schema;

var profileSchema = new Schema({

	basicInfo 			: {
							name:{type:String,default:'',required:true},
							homeTown: {type:String,default:''},
							gender  : {type:String,default:'',required:true},
							birthday: {type:Date}
						},
	professionalDetails : {
							role: {type:String,default:''},
							company :{type:String,default:''}
						},
	
	followers	  			: {type:Number,default:''},
	

});


mongoose.model('Profile',profileSchema);