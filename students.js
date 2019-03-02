let express = require('express');
let bodyParser = require('body-parser');
const { ApolloServer, gql } = require('apollo-server-express');

const app = express();

const schema = gql`
  type Mutation {    
    createStudent(
      name: String!,
      email: String!,
      groupId: String!,
      birthday: String      
      ): NewUserResponse!,

    createCourse(
      description: String!,
      teacherName: String!    
      ): NewUserResponse!,

    updateCourse(
      courseId: ID!, 
      teacherName: String!, 
      description: String!,
      ): Course,   
  } 

  type NewUserResponse {
    success: Boolean!    
  }


  type Query {
    student(studentId: ID!): Student,
    students: [Student!]!,
    
    course(courseId: ID!): Course,
    courses: [Course!]!,

    gradesStudent(studentId: ID!): Grades,
    grades: [Grades!]!
  
  }

  type Student {
    studentId: ID!,
    name: String!,
    email: String!,
    groupId: String!,
    birthday: String
  }

  type Course {
    courseId: ID!,
    description: String!,
    teacherName: String!
  }

  type Grades {
    studentId: ID!,
    courseGrades: [CourseGrades!]
  }
  
  type CourseGrades {
    courseId: ID!,
    grade: String!
  }

`;

// students
let students = [
    {
        studentId: "1000",
        name: "Hans Werner",
        email: "h.werner@mail.com",
        groupId: "400", 
        birthday: "2003-05-03"
    },
    {
        studentId: "1001",
        name: "Carina Hofmeister",
        email: "carina_hofmeister@zmail.de",
        groupId: "500", 
        birthday: "1998-02-01"
    },
    {
        studentId: "1002",
        name: "Agatha Christie",
        email: "agachri@bookworm.net",
        groupId: "600", 
        birthday: "2001-06-07"
    }
]

// courses
let courses = [
  {
      courseId: "100",
      description: "Networking",
      teacherName: "Mag. Jakob Heinrich"
  },
  {
      courseId: "101",
      description: "Physics",
      teacherName: "Dr. Franz Helmut"
  }, 
  {
      courseId: "102",
      description: "Software Developing",
      teacherName: "DI Sabine Wagenreiter"
  },
  {
      courseId: "103",
      description: "Maths",
      teacherName: "Bertram Ruprecht"
  }
]

// grades
let grades = [
  {
      studentId: "1000",
      courseGrades: [
          {courseId: "100", grade: "2"},
          {courseId: "101", grade: "4"},
          {courseId: "102", grade: "1"},
          {courseId: "103", grade: "1"}
      ]
  },
  {
      studentId: "1001",
      courseGrades: [
        {courseId: "100", grade: "1"},
        {courseId: "101", grade: "2"},
        {courseId: "102", grade: "1"},
        {courseId: "103", grade: "1"}
    ]
  },
  {
      studentId: "1002",
      courseGrades: [
        {courseId: "100", grade: "4"},
        {courseId: "101", grade: "3"},
        {courseId: "102", grade: "3"},
        {courseId: "103", grade: "4"}
      ]
  }
]

const resolvers = {
  
  Query: {
    student: (parent, args, context, info) => {     
      return students.find(u => u.id === args.id);
    },
    students: (parents, args, context, info) => {
      return students;
    },

    course: (parent, args, context, info) => {   
      return courses.find(u => u.id === args.id);
    },
    courses: (parents, args, context, info) => {
      return courses;
    },

    gradesStudent: (parent, args, context, info) => { 
      return grades.find(u => u.studentId === args.studentId);
    },
    // TODO infos
    grades: (parents, args, context, info) => {
      return grades;
    },

  },

  Mutation: {
    createStudent: (parent, args, context, info) => { 
      console.log("tut");
      let newStudent = {
        studentId: ((students.length)+1000).toString(),
        name: args.name,
        email: args.email,
        groupId: args.groupId,
        birthday: args.birthday 
      }
      students.push(newStudent);
      return { success: true}
    },

    createCourse: (parent, args, context, info) => { 
      console.log("tut");
      let newCourse = {
        courseId: ((courses.length)+100).toString(),
        description: args.description,
        teacherName: args.teacherName
      }
      courses.push(newCourse);
      return { success: true}
    },

    updateCourse: (parent, args, context, info) => { 
      
      //Find index of specific object using findIndex method.    
      var objIndex = courses.findIndex((obj => obj.courseId == args.courseId));

      //Log object to Console.
      console.log("Before update: ", courses[objIndex])

      //Update object's name property.
      courses[objIndex].teacherName = args.teacherName;
      courses[objIndex].description = args.description;

      //Log object to console again.
      console.log("After update: ", courses[objIndex])
    }
  }
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  formatError: error => {
    console.log(error);
    return error;
  },
  formatResponse: response => {
    console.log(response);
    return response;
  },
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});