/**
 * Article model
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  hyperlink: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    contentType: String,
    data: Buffer,
    required: false
  },
  isRead: {
    type: Boolean,
    required: true
  },
  accountId: {
    type: String,
    required: true
  }
});

ArticleSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Article', ArticleSchema);
