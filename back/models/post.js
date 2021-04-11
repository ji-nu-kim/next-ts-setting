const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Post extends (
  Model
) {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        modelName: 'Post',
        tableName: 'posts',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', // 이모티콘 설정
        sequelize,
      }
    );
  }

  static associate(db) {
    // post.addRetweet, post.removeRetweet, post.setRetweet, post.getRetweet
    db.Post.belongsTo(db.Post, { as: 'Retweet' });
    db.Post.belongsTo(db.User);
    // post.addHashtags ...
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
    // post.addLikers ...
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' });
    db.Post.hasMany(db.Comment);
    // post.addImages ...
    db.Post.hasMany(db.Image);
  }
};
