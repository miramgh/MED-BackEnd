const graphql = require('graphql');
const Module = require('../models/moduleModel');
const User = require('../models/userModel');
const Courses = require('../models/courseModel')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const InstructorType = new GraphQLObjectType({
    name: 'Instructor',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        
    })
});
const CourseType = new GraphQLObjectType({
    name: 'Course',
    fields: ( ) => ({
        id: { type: GraphQLID },
        courseName: { type: GraphQLString },
        instructorId: { type: GraphQLID },
        chapters:{ type : new GraphQLList(GraphQLString)}
        
    })
});

const ModuleType = new GraphQLObjectType({
    name: 'Module',
    fields: ( ) => ({
        id: { type: GraphQLID },
        moduleTopic: { type: GraphQLString },
        content : {
            type: GraphQLString 
        },
        courseId:{
             type: CourseType ,
             resolve(parent, args){
                return Courses.findById(parent.courseId);
             }
            },
        descussionId: {
            type: GraphQLID,
            resolve(parent, args){
                // return Author.findById(parent.authorId);
            }
        
        },
        instructorId: {
            type: InstructorType,
            resolve(parent, args){
               return User.findById(parent.instructorId);
            }
        },
        modules: {
            type: new GraphQLList(ModuleType),
            resolve(parent, args){
                return Module.find({ "instructorId": parent.instructorId });
            }
        }

    })
});




const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        module: {
            type: ModuleType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Module.findById(args.id);
            }
        },
        instructor: {
            type: InstructorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return User.findById(args.id);
            }
        },
        modules: {
            type: new GraphQLList(ModuleType),
            resolve(parent, args){
                return Module.find({"instructorId" : parent.instructorId});
            }
        },
        courses: {
            type: new GraphQLList(CourseType),
            resolve(parent, args){
                return Courses.find({"instructorId":args.id});
            }
        }
    }
});

 /* 
 ,
 Error Expected undefined to be a GraphQL type.
        courses: {
            type: new GraphQLList(CourseType),
            resolve(parent, args){
                return Course.find({"instructorId":args.id});
            }
        }
 
 const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        }
    }
});
*/
module.exports = new GraphQLSchema({
    query: RootQuery

});